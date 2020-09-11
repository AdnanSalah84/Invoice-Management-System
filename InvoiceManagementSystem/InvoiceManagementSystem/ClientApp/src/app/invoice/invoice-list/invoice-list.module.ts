import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

import { InvoiceListRoutingModule } from "./invoice-list-routing.module";
import { InvoiceListComponent } from "./invoice-list.component";

@NgModule({
  declarations: [InvoiceListComponent],
  imports: [CommonModule, InvoiceListRoutingModule, TableModule, ButtonModule],
})
export class InvoiceListModule {}
