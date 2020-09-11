import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceAddRoutingModule } from './invoice-add-routing.module';
import { InvoiceAddComponent } from './invoice-add.component';


@NgModule({
  declarations: [InvoiceAddComponent],
  imports: [
    CommonModule,
    InvoiceAddRoutingModule
  ]
})
export class InvoiceAddModule { }
