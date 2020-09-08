import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: 'persontest', loadChildren: () => import('./persontest/persontest.module').then((m) => m.PersontestModule) },
  { path: "counter", component: CounterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
