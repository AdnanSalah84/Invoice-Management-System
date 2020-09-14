import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

import { InvoiceListRoutingModule } from "./invoice-list-routing.module";
import { InvoiceListComponent } from "./invoice-list.component";
import { InvoiceEditComponent } from "../invoice-edit/invoice-edit.component";

@NgModule({
  declarations: [InvoiceListComponent, InvoiceEditComponent],
  imports: [CommonModule, InvoiceListRoutingModule, TableModule, ButtonModule, ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    KeyFilterModule,
    InputTextareaModule,
    ButtonModule,
    InputTextModule],
})
export class InvoiceListModule { }
