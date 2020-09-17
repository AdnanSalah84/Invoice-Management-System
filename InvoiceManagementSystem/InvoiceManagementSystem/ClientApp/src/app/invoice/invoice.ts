export interface Invoice {
  invoiceId: number | null;
  invoiceReference: string;
  issueDate: Date;
  dueDate: Date;
  amountNet: number;
  amountTax: number;
  amountGross: number;
  status: string;
  description: string;
  modifiedBy: string;
  modifiedDate: Date;
  purchaseOrderId?: number; 
  supplierId?: number; 
  nominalAccountId?: number;
  fileName?: string;
  data?: any;
  contentType?: string;
}
