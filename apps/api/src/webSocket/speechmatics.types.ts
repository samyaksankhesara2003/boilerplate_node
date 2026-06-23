export interface EnrolledSpeaker {
    label: string;
    speaker_identifiers: string[];
}

export interface SpeechmaticsResultAlternative {
    content?: string;
    speaker?: string;
    confidence?: number;
}

export interface SpeechmaticsResult {
    alternatives?: SpeechmaticsResultAlternative[];
    type?: string;
}

export interface SpeechmaticsMessage {
    message: string;
    results?: SpeechmaticsResult[];
    reason?: string;
    error?: string;
    code?: string;
}
