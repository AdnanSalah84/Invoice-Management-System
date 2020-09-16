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

  constructor(private invoiceService: InvoiceService, public router: Router) {}

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
    });
  }

  InvoiceAdd() {
    this.router.navigate(["/invoice-add"]);
  }

  selectInvoice(invoice: Invoice) {
    console.log(invoice);
  }
}
