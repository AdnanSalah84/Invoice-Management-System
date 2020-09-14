import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

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

import { Invoice } from '../invoice';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
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
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute
  ) {
    this.statuses = [
      { label: 'Pending', value: 'Pending' },
      { label: 'Approved', value: 'Approved' },
      { label: 'Rejected', value: 'Rejected' },
      { label: 'Paid', value: 'Paid' }
    ]
  }

  ngOnInit() {

    const invoiceId = +this.route.snapshot.paramMap.get('id');

    this.invoiceService.getInvoice(invoiceId).subscribe((data: Invoice) => {
      this.invoiceForm = this.fb.group({
        invoiceId: data.invoiceId,
        invoiceReference: [data.invoiceReference, Validators.required],
        purchaseOrderId: [data.purchaseOrderId],
        supplierId: [data.supplierId, Validators.required],
        issueDate: ["09/15/2020", Validators.required],
        dueDate: ["09/15/2020", Validators.required],
        amountNet: [data.amountNet, Validators.required],
        amountTax: [data.amountTax, Validators.required],
        amountGross: [data.amountGross, Validators.required],
        status: [data.status, Validators.required],
        description: [data.description],
        nominalAccountId: [data.nominalAccountId, Validators.required],
      });
    })


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



