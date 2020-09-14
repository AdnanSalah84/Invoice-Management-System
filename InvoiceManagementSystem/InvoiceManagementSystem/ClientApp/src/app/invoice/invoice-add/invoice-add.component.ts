import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { SupplierService } from "../../supplier/supplier.service";
import { PurchaseOrderService } from "../../purchase-order/purchase-order.service";
import { NominalAccountService } from "../../nominal-account/nominal-account.service";

import { SelectItem } from "primeng/components/common/selectitem";
import { PurchaseOrder } from "../../purchase-order/purchase-order";
import { Supplier } from "../../supplier/supplier";
import { NominalAccount } from "../../nominal-account/nominal-account";
import { InvoiceService } from "../invoice.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-invoice-add",
  templateUrl: "./invoice-add.component.html",
  styleUrls: ["./invoice-add.component.css"],
})
export class InvoiceAddComponent implements OnInit {
  invoiceForm: FormGroup;
  purchaseOrders: SelectItem[] = [];
  suppliers: SelectItem[] = [];
  nominalAccounts: SelectItem[] = [];
  statuses: SelectItem[];

  constructor(
    private invoiceService: InvoiceService,
    private supplierService: SupplierService,
    private purchaseOrderService: PurchaseOrderService,
    private nominalAccountService: NominalAccountService,
    private fb: FormBuilder, private router: Router
  ) {
    this.statuses = [
      { label: 'Pending', value: 'Pending' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Rejected', value: 'Rejected' },
      { label: 'Paid', value: 'Paid' }
    ]
  }

  ngOnInit() {
    this.invoiceForm = this.fb.group({
      invoiceReference: ["", Validators.required],
      purchaseOrderId: [null],
      supplierId: ["", Validators.required],
      issueDate: ["", Validators.required],
      dueDate: ["", Validators.required],
      amountNet: [null, Validators.required],
      amountTax: [null, Validators.required],
      amountGross: [null, Validators.required],
      status: ["", Validators.required],
      description: [""],
      nominalAccountId: ["", Validators.required],
    });

    // Supplier
    this.supplierService.getSuppliers().subscribe((supliers: Supplier[]) => {
      supliers.map(data => {
        this.suppliers.push({ label: data.supplierName, value: data.supplierId })
      })
    });

    // Purchase Order
    this.purchaseOrderService.getPurchaseOrders().subscribe((purchaseOrders: PurchaseOrder[]) => {
      purchaseOrders.map(data => {
        this.purchaseOrders.push({ label: data.purchaseOrderNumber, value: data.purchaseOrderId })
      })
    });

    // Nominal Account
    this.nominalAccountService.getNominalAccounts().subscribe((nominalAccounts: NominalAccount[]) => {
      nominalAccounts.map(data => {
        this.nominalAccounts.push({ label: data.nominalAccountCode, value: data.nominalAccountId })
      })
    });
  }


  saveInvoice() {
    this.invoiceService.saveInvoice(this.invoiceForm.value).subscribe(() => {
      this.onSaveComplete();
    })
  }

  onSaveComplete(): void {
    // Reset back to pristine
    this.invoiceForm.reset(this.invoiceForm.value);

    // Navigate back to the product list
    this.router.navigate(['/invoice-list']);
  }
}
