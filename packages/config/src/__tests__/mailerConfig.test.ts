import { describe, it, expect } from "@jest/globals";
import { mailerConfig } from "../mailer";

describe("mailerConfig", () => {
    it("loads mailer environment variables", () => {
        expect(mailerConfig.fromEmail).toEqual(process.env.FROM_EMAIL);
        expect(mailerConfig.smtpHost).toEqual(process.env.SMTP_HOST);
        expect(mailerConfig.smtpPort).toEqual(Number(process.env.SMTP_PORT));
        expect(mailerConfig.smtpUser).toEqual(process.env.SMTP_USER);
        expect(mailerConfig.smtpPass).toEqual(process.env.SMTP_PASS);
        expect(mailerConfig.smtpSecure).toEqual(process.env.SMTP_SECURE === 'true' || false);
    });
});
