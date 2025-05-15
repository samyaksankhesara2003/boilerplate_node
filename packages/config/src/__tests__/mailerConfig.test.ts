import { describe, it, expect } from "@jest/globals";
import { mailerConfig } from "../mailer";

describe("mailerConfig", () => {
    it("loads mailer environment variables", () => {
        expect(mailerConfig.smtpSendgridUsername).toEqual(process.env.SMTP_SENDGRID_USERNAME);
        expect(mailerConfig.smtpSendgridApiKey).toEqual(process.env.SMTP_SENDGRID_API_KEY);
    });
});
