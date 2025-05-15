import sgMail from '@sendgrid/mail';
import { mailerConfig } from '@repo/config';

sgMail.setApiKey(mailerConfig.smtpSendgridApiKey!);

export const transporter = sgMail;
