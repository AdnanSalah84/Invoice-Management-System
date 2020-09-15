import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceTestComponent } from './invoice-test.component';


const routes: Routes = [{ path: '', component: InvoiceTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceTestRoutingModule { }
