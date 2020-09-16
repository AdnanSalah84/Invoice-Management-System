import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { CounterComponent } from "./counter/counter.component";
import { AuthorizeGuard } from "../api-authorization/authorize.guard";
import { InvoiceListComponent } from "./invoice/invoice-list/invoice-list.component";
import { InvoiceAddComponent } from "./invoice/invoice-add/invoice-add.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./authentication/auth.guard";
import { Role } from "./user/role.enum";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  { path: "invoice-list", component: InvoiceListComponent },
  { path: "invoice-add", component: InvoiceAddComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  { path: "login", component: LoginComponent },
  // {
  //   path: 'invoice-list',
  //   loadChildren: () => import('./invoice/invoice-list/invoice-list.module').then((m) => m.InvoiceListModule),
  // },
  {
    path: "invoice-add",
    loadChildren: () =>
      import("./invoice/invoice-add/invoice-add.module").then(
        (m) => m.InvoiceAddModule
      ),
  },
  {
    path: "invoice-test",
    loadChildren: () =>
      import("./invoice/invoice-test/invoice-test.module").then(
        (m) => m.InvoiceTestModule
      ),
  },
  { path: "counter", component: CounterComponent },
  {
    path: "fetch-data",
    component: FetchDataComponent,
    canActivate: [AuthorizeGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
