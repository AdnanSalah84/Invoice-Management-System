import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CounterComponent } from './counter/counter.component';
import { AuthorizeGuard } from '../api-authorization/authorize.guard';



const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'invoice-list',
    loadChildren: () => import('./invoice/invoice-list/invoice-list.module').then((m) => m.InvoiceListModule),
  },
  {
    path: 'invoice-add',
    loadChildren: () => import('./invoice/invoice-add/invoice-add.module').then((m) => m.InvoiceAddModule),
  },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
