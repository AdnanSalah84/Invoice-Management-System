import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { PDFAnnotationData } from 'pdfjs-dist';

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

  // screen DPI / PDF DPI
  readonly dpiRatio = 96 / 72;
  pdfSrc = "../../../assets/pdf-test.pdf";


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


  private createInput(annotation: PDFAnnotationData, rect: number[] = null) {
    let formControl = new FormControl(annotation['buttonValue'] || '');

    const input = new Input();
    input.name = annotation['fieldName'];

    if (annotation['fieldType'] === 'Tx') {
      input.type = 'text';
      input.value = annotation['buttonValue'] || '';
    }

    // Calculate all the positions and sizes
    if (rect) {
      input.top = rect[1] - (rect[1] - rect[3]);
      input.left = rect[0];
      input.height = (rect[1] - rect[3]);
      input.width = (rect[2] - rect[0]);
    }

    //this.inputList.push(input);
    return formControl;
  }

  private addInput(annotation: PDFAnnotationData, rect: number[] = null): void {
    // add input to page

    this.invoiceForm.addControl(annotation['fieldName'], this.createInput(annotation, rect));
    console.log(annotation);
  }

  loadComplete(pdf: PDFDocumentProxy): void {
    for (let i = 1; i <= pdf.numPages; i++) {

      // track the current page
      let currentPage = null;
      pdf.getPage(i).then(p => {
        currentPage = p;

        // get the annotations of the current page
        return p.getAnnotations();
      }).then(ann => {

        // ugly cast due to missing typescript definitions
        // please contribute to complete @types/pdfjs-dist
        const annotations = (<any>ann) as PDFAnnotationData[];

        annotations
          .filter(a => a.subtype === 'Widget') // get the form field annotation only
          .forEach(a => {

            // get the rectangle that represent the single field
            // and resize it according to the current DPI
            const fieldRect = currentPage.getViewport(this.dpiRatio)
              .convertToViewportRectangle(a.rect);

            // add the corresponding input
            this.addInput(a, fieldRect);
          });
      });
    }
  }

}



