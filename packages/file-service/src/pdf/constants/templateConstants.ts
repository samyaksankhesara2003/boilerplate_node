export const TemplateNames = {
  INVOICE: 'INVOICE',
  RECEIPT: 'RECEIPT',
} as const;

export type TemplateKey = keyof typeof TemplateNames;

export const TemplateFileMap: Record<TemplateKey, string> = {
  INVOICE: 'invoice.ejs',
  RECEIPT: 'receipt.ejs',
};
