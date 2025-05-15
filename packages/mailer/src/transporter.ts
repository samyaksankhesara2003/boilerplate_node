import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { mailerConfig } from '@repo/config';

export const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: mailerConfig.smtpSendgridApiKey!
    })
);
