import { getTranslatedMessage } from '@repo/i18n';

export function sendResponse(
    res: any,
    statusCode: number,
    messageKey: string,
    data: any = {},
    language: string = 'en'
) {
    const success = statusCode >= 200 && statusCode < 400;
    const message = getTranslatedMessage(messageKey, language);

    const response: any = {
        success,
        statusCode,
        message,
    };

    if (data && Object.keys(data).length > 0) response.data = data;

    return res.status(statusCode).json(response);
};
