import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceEditRoutingModule } from './invoice-edit-routing.module';
import { InvoiceEditComponent } from './invoice-edit.component';


@NgModule({
  declarations: [InvoiceEditComponent],
  imports: [
    CommonModule,
    InvoiceEditRoutingModule,
  ]
})
export class InvoiceEditModule { }
