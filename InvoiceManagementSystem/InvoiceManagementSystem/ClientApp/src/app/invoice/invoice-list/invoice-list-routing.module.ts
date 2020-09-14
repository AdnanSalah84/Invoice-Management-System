import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from './invoice-list.component';
import { InvoiceEditComponent } from '../invoice-edit/invoice-edit.component';


const routes: Routes = [{ path: '', component: InvoiceListComponent }, { path: ':id/invoice-edit', component: InvoiceEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceListRoutingModule { }
