import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceListRoutingModule } from './invoice-list-routing.module';
import { InvoiceListComponent } from './invoice-list.component';



@NgModule({
  declarations: [InvoiceListComponent ],
  imports: [
    CommonModule,
    InvoiceListRoutingModule
  ]
})
export class InvoiceListModule { }
