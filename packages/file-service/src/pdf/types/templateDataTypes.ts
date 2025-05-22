export interface IInvoiceData {
  customerName: string;
  email: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}

export interface IReceiptData {
  receiptNumber: string;
  date: string;
  amountPaid: number;
}

// Mapping template key to corresponding data type
export interface ITemplateDataMap {
  INVOICE: IInvoiceData;
  RECEIPT: IReceiptData;
}

export type TemplateDataKey = keyof ITemplateDataMap;
