import WebSocket from 'ws';
import { speechmaticsConfig } from '@repo/config';
import { log } from '@repo/logger';
import { SM_EVENTS } from './speechmatics.events';
import type { EnrolledSpeaker } from './speechmatics.types';

export function createSpeechmaticsSocket(language = 'en', enrolledSpeakers: EnrolledSpeaker[] = []): WebSocket {
    const lang = ['en', 'es'].includes(language) ? language : 'en';

    const smWs = new WebSocket(speechmaticsConfig.url, {
        headers: { Authorization: `Bearer ${speechmaticsConfig.apiKey}` }
    });
    
    smWs.on('open', () => {
        log.info(`[SM] Connected (lang: ${lang}, enrolled: ${enrolledSpeakers.length})`);
        smWs.send(
            JSON.stringify({
                message: SM_EVENTS.START_RECOGNITION,
                audio_format: { type: 'raw', encoding: 'pcm_s16le', sample_rate: 16000 },
                transcription_config: {
                    language: lang,
                    diarization: 'speaker',
                    operating_point: 'enhanced',
                    max_delay_mode: 'fixed',
                    max_delay: 10,
                    enable_partials: true,
                    enable_entities: true,
                    speaker_diarization_config: {
                        max_speakers: 5,
                        speaker_sensitivity: 0.8,
                        ...(enrolledSpeakers.length > 0 && { speakers: enrolledSpeakers })
                    }
                }
            })
        );
    });

    smWs.on('close', (code, reason) => {
        log.info(`[SM] Disconnected — code: ${code}, reason: ${reason.toString() || '(none)'}`);
    });

    smWs.on('error', err => log.error('[SM] WebSocket error:', err.message));

    return smWs;
}
