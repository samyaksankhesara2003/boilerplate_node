import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { appConfig, mailerConfig } from '@repo/config';
import { sendMail } from '../sendMail';
import { transporter } from '../transporter';
import { renderTemplate } from '../templateRenderer';
import { TEMPLATES, TemplateName } from '../templateConstants';

// Mock the transporter and renderTemplate with explicit types
jest.mock('../transporter', () => ({
  transporter: {
    sendMail: jest.fn(),
  },
}));

// Explicitly type the renderTemplate mock
jest.mock('../templateRenderer', () => ({
  renderTemplate: jest.fn() as jest.MockedFunction<(templateName: TemplateName, context: any) => Promise<string>>,
}));

describe('sendMail', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('should send an email with valid template', async () => {
    const mockTemplateName: TemplateName = TEMPLATES.FORGOT_PASSWORD; // Valid template name from TEMPLATES
    const mockContext = { name: 'John', resetLink: 'https://example.com/reset' };
    const mockSubject = 'Password Reset Request';
    const mockTo = 'user@yopmail.com';

    // Mock renderTemplate to return mocked HTML
    (renderTemplate as jest.MockedFunction<typeof renderTemplate>).mockResolvedValue('<html><body>Mocked HTML</body></html>');

    // Call the sendMail function
    await sendMail(mockTo, mockSubject, mockTemplateName, mockContext);

    // Check if renderTemplate was called with correct arguments
    expect(renderTemplate).toHaveBeenCalledWith(mockTemplateName, mockContext);

    // Check if transporter.sendMail was called with correct arguments
    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: `${appConfig.appName} <${mailerConfig.fromEmail}>`,
      to: mockTo,
      subject: mockSubject,
      html: '<html><body>Mocked HTML</body></html>',
    });
  });

  it('should throw an error for an invalid template', async () => {
    const invalidTemplateName = 'invalidTemplate' as TemplateName;  // Invalid template
    const mockContext = { name: 'John' };
    const mockSubject = 'Test Subject';
    const mockTo = 'user@example.com';

    // Expect sendMail to throw an error for an invalid template name
    await expect(sendMail(mockTo, mockSubject, invalidTemplateName, mockContext))
      .rejects
      .toThrowError(`Template ${invalidTemplateName} not found in TEMPLATES.`);
  });
});
