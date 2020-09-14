import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InvoiceService } from "../invoice.service";
import { Invoice } from "../invoice";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.css"],
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[];

  cols: any[];

  constructor(private invoiceService: InvoiceService, public router: Router) {

    this.cols = [
      { field: "invoiceId", header: "Invoice Number" },
      { field: "invoiceReference", header: "Invoice Reference" },
      {
        field: "purchaseOrder",
        subfield: "purchaseOrderNumber",
        header: "PO Number",
      },
      { field: "supplier", subfield: "supplierName", header: "Supplier Name" },
      { field: "issueDate", header: "Issue Date" },
      { field: "dueDate", header: "Due Date" },
      { field: "amountNet", header: "Amount(NET)" },
      { field: "amountTax", header: "Amount(TAX)" },
      { field: "amountGross", header: "Amount(Gross)" },
      { field: "status", header: "Status" },
    ];
  }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
    });
  }

  InvoiceAdd() {
    this.router.navigate(["/invoice-add"]);
  }

  selectInvoice(invoice: Invoice) {

    console.log(invoice)
  }
}
