export const SM_EVENTS = {
    RECOGNITION_STARTED: 'RecognitionStarted',
    ADD_PARTIAL_TRANSCRIPT: 'AddPartialTranscript',
    ADD_TRANSCRIPT: 'AddTranscript',
    END_OF_TRANSCRIPT: 'EndOfTranscript',
    ERROR: 'Error',
    START_RECOGNITION: 'StartRecognition',
    END_OF_STREAM: 'EndOfStream'
} as const;

export const CLIENT_EVENTS = {
    SPEECHMATICS_ERROR: 'SpeechmaticsError',
    SPEECHMATICS_DISCONNECTED: 'SpeechmaticsDisconnected'
} as const;
