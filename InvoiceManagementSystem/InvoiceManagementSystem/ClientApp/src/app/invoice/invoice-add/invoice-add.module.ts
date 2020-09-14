import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { InvoiceAddRoutingModule } from './invoice-add-routing.module';
import { InvoiceAddComponent } from './invoice-add.component';


@NgModule({
  declarations: [InvoiceAddComponent],
  imports: [
    CommonModule,
    InvoiceAddRoutingModule,
    ReactiveFormsModule, 
    DropdownModule,
    CalendarModule,
    KeyFilterModule,
    InputTextareaModule,
    ButtonModule,
    InputTextModule
  ]
})
export class InvoiceAddModule { }
