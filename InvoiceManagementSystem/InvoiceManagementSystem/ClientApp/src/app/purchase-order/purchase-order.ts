export interface PurchaseOrder {
  purchaseOrderId?: number | null;
  purchaseOrderNumber?: string;
  purchaseOrderAmountNet?: number;
  purchaseOrderAmountTax?: number;
  purchaseOrderAmountGross?: number;
  purchaseOrderDisabled?: string;
}
