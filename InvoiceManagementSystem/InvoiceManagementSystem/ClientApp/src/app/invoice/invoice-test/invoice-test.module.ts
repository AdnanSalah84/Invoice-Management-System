import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoiceTestRoutingModule } from './invoice-test-routing.module';
import { InvoiceTestComponent } from './invoice-test.component';


@NgModule({
  declarations: [InvoiceTestComponent],
  imports: [
    CommonModule,
    InvoiceTestRoutingModule,
    ReactiveFormsModule,
    PdfViewerModule
  ]
})
export class InvoiceTestModule { }
