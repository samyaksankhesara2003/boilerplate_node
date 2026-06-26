import type { SpeechmaticsResult } from '../speechmatics.types';

/**
 * Speaker type as exposed to the client. Speechmatics gives us raw diarization
 * labels (the enrolled "WAITER" label, plus "S1", "S2", "UU"… for everyone
 * else). We collapse those into just two roles.
 */
export type SpeakerType = 'Waiter' | 'Customer';

export interface TranscriptBlock {
    speaker: SpeakerType;
    text: string;
}

// The label we enrol the waiter's voice signature under (see speechmatics.handler.ts).
const WAITER_LABEL = 'WAITER';

// Running, merged transcript. Held here so the handler only has to hand us the
// raw results — all the assembly logic lives in this file.
const transcript: TranscriptBlock[] = [];

/** Anything that isn't the enrolled waiter is treated as the customer. */
function resolveSpeakerType(speaker?: string): SpeakerType {
    return speaker?.toUpperCase() === WAITER_LABEL ? 'Waiter' : 'Customer';
}

/**
 * Fold a batch of Speechmatics ADD_TRANSCRIPT results into the running
 * transcript.
 *
 * Each result is a single token (word or punctuation). We append tokens to the
 * last transcript block as long as the speaker type stays the same, and only
 * open a new block when the speaker type changes — so consecutive turns from the
 * same role merge into one block:
 *
 *   Waiter:   Hello sir, welcome to our restaurant. Would you like to see the menu?
 *   Customer: Yes, please. Do you have any vegetarian options?
 *   Waiter:   Yes, we have several vegetarian dishes. I would recommend our Veg Pasta.
 *   Customer: That sounds good.
 *
 * Returns the current transcript (same array reference).
 */
export function addTranscript(results: SpeechmaticsResult[]): TranscriptBlock[] {
    for (const result of results) {
        const alternative = result.alternatives?.[0];
        const content = alternative?.content;
        if (!content) continue;

        const speaker = resolveSpeakerType(alternative?.speaker);
        const isPunctuation = result.type === 'punctuation';

        const last = transcript[transcript.length - 1];

        if (last && last.speaker === speaker) {
            // Same speaker: keep appending. Punctuation joins with no leading
            // space (", " not " ,"); words join with a single space.
            last.text += isPunctuation ? content : ` ${content}`;
        } else {
            // Speaker changed (or first token): start a fresh block.
            transcript.push({ speaker, text: content });
        }
    }

    return transcript;
}

/** Render the structured transcript into the canonical "Speaker: text" form. */
export function formatTranscript(): string {
    return transcript.map(block => `${block.speaker}: ${block.text}`).join('\n');
}

/** Clear the transcript — call when a conversation ends / a new one begins. */
export function resetTranscript(): void {
    transcript.length = 0;
}
