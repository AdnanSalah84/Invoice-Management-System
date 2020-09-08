import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  {
    path: "persontest",
    loadChildren: () =>
      import("./persontest/persontest.module").then((m) => m.PersontestModule),
  },
  {
    path: "invoice",
    loadChildren: () =>
      import("./invoice/invoice.module").then((m) => m.InvoiceModule),
  },
  {
    path: "supplier",
    loadChildren: () =>
      import("./supplier/supplier.module").then((m) => m.SupplierModule),
  },
  {
    path: "order",
    loadChildren: () =>
      import("./order/order.module").then((m) => m.OrderModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
