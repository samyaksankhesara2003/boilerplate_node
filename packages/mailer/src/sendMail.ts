import { appConfig, mailerConfig } from '@repo/config';
import { transporter } from './transporter';
import { renderTemplate } from './templateRenderer';
import { TEMPLATES, TemplateName } from './templateConstants';

export async function sendMail(
    to: string,
    subject: string,
    templateName: TemplateName,  // templateName is now typed as a valid template from TEMPLATES
    context: any
) {
    // Ensure the templateName is a valid template constant
    if (!Object.values(TEMPLATES).includes(templateName)) throw new Error(`Template ${templateName} not found in TEMPLATES.`);

    // Render the email template based on the selected template
    const html = await renderTemplate(templateName, context);

    // Send the email using the configured transporter
    await transporter.sendMail({
        from: `${appConfig.appName} <${mailerConfig.fromEmail}>`,
        to,
        subject,
        html,
    });
};
