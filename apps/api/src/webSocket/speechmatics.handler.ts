import { WebSocketServer, WebSocket, RawData } from 'ws';
import { IncomingMessage } from 'http';
import { User } from '@repo/db';
import { log } from '@repo/logger';
import { createSpeechmaticsSocket } from './speechmatics.service';
import { SM_EVENTS, CLIENT_EVENTS } from './speechmatics.events';
import type { EnrolledSpeaker, SpeechmaticsMessage } from './speechmatics.types';
import { addTranscript } from './process/addTranscript.process';

type AliveWebSocket = WebSocket & { isAlive: boolean };

export const speechmaticsWss = new WebSocketServer({ noServer: true });

// BUG-6: 30s ping/pong heartbeat — terminates zombie connections whose
// clientWs.on("close") would never fire (silent network drop, NAT timeout).
const HEARTBEAT_MS = 30_000;
function heartbeat(this: AliveWebSocket) {
    this.isAlive = true;
}
const pingInterval = setInterval(() => {
    speechmaticsWss.clients.forEach(ws => {
        const w = ws as AliveWebSocket;
        if (!w.isAlive) {
            w.terminate();
            return;
        }
        w.isAlive = false;
        w.ping();
    });
}, HEARTBEAT_MS);
speechmaticsWss.on('close', () => clearInterval(pingInterval));

function getParam(req: IncomingMessage, key: string): string | null {
    try {
        const url = new URL(req.url ?? '', `http://${req.headers.host ?? 'localhost'}`);
        const val = url.searchParams.get(key);
        return val?.trim() || null;
    } catch {
        return null;
    }
}

function safeSend(ws: WebSocket, data: object): void {
    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
}

speechmaticsWss.on('connection', async (clientWs: WebSocket, req: IncomingMessage) => {
    const cws = clientWs as AliveWebSocket;
    cws.isAlive = true;
    cws.on('pong', heartbeat.bind(cws));

    const language = getParam(req, 'lang') ?? getParam(req, 'language') ?? 'en';

    // TODO: replace with the authenticated waiter's email once auth is wired up
    const email = 'techuz@yopmail.com';

    // Load enrolled speaker identifiers from the user record
    let enrolledSpeakers: EnrolledSpeaker[] = [];
    try {
        const user = await User.query().select('waiter_identifier').findOne({ email });
        if (user?.waiter_identifier) {
            const ids: string[] = Array.isArray(user.waiter_identifier)
                ? (user.waiter_identifier as string[])
                : (JSON.parse(user.waiter_identifier as string) as string[]);
            if (ids.length > 0) {
                enrolledSpeakers = [{ label: 'WAITER', speaker_identifiers: ids }];
                log.info(`[WSS] Loaded voice signature for ${email} (${ids.length} identifiers)`);
            }
        } else {
            log.warn(`[WSS] No voice signature found for ${email} — using plain diarization`);
        }
    } catch (err: unknown) {
        log.error('[WSS] Failed to load waiter_identifier:', (err as Error).message);
    }

    const smWs = createSpeechmaticsSocket(language, enrolledSpeakers);

    // BUG-3: notify client when Speechmatics drops so it doesn't stream into silence
    smWs.on('close', (code, reason) => {
        safeSend(clientWs, {
            message: CLIENT_EVENTS.SPEECHMATICS_DISCONNECTED,
            code,
            reason: reason?.toString() || 'Connection closed'
        });
    });

    // BUG-1: single handler owns ALL SM message types — no competing listener
    smWs.on('message', (data: RawData) => {
        try {
            const msg = JSON.parse(data.toString()) as SpeechmaticsMessage;

            if (msg.message === SM_EVENTS.RECOGNITION_STARTED) {
                log.info('[SM] Recognition started — ready for audio');
                return;
            }

            if (msg.message === SM_EVENTS.ERROR) {
                const reason = msg.reason ?? msg.error ?? JSON.stringify(msg);
                log.error(`[SM] Error: ${reason}`);
                const lower = reason.toLowerCase();
                const isQuota =
                    (lower.includes('audio') && ['exceed', 'quota', 'limit', 'usage', 'maximum', 'reached'].some(k => lower.includes(k))) ||
                    ['quota_exceeded', 'rate_limit'].some(k => lower.includes(k)) ||
                    msg.code === 'quota_exceeded' ||
                    msg.code === 'rate_limit_exceeded';

                safeSend(clientWs, {
                    message: CLIENT_EVENTS.SPEECHMATICS_ERROR,
                    error_type: isQuota ? 'audio_quota_exceeded' : 'general_error',
                    humanized_message: isQuota
                        ? 'Audio processing limit reached. Please try again tomorrow or contact support.'
                        : 'Transcription service error. Please try again in a moment.',
                    technical_details: reason,
                    code: msg.code ?? 'unknown'
                });
                return;
            }

            if (msg.message === SM_EVENTS.ADD_TRANSCRIPT) {
                if (msg.results?.length) {
                    addTranscript(msg.results);
                }
            }

            if (msg.message === SM_EVENTS.ADD_PARTIAL_TRANSCRIPT || msg.message === SM_EVENTS.ADD_TRANSCRIPT) {
                safeSend(clientWs, msg as unknown as object);
                return;
            }

        } catch (err: unknown) {
            log.error('[SM] Message parse error:', (err as Error).message);
        }       
    });

    // Audio pipe: client → Speechmatics
    clientWs.on('message', (audioChunk: RawData) => {
        if (smWs.readyState === WebSocket.OPEN) smWs.send(audioChunk);
    });

    clientWs.on('close', () => {
        log.info('[WSS] Client disconnected');
        if (smWs.readyState === WebSocket.OPEN) {
            smWs.send(JSON.stringify({ message: SM_EVENTS.END_OF_STREAM }));
        }
        smWs.close();
    });

    clientWs.on('error', err => log.error('[WSS] Client error:', err.message));
});
