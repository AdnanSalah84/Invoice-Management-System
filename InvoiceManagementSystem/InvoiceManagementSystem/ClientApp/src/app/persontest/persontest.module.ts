import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersontestRoutingModule } from './persontest-routing.module';
import { PersontestComponent } from './persontest.component';


@NgModule({
  declarations: [PersontestComponent],
  imports: [
    CommonModule,
    PersontestRoutingModule,

  ]
})
export class PersontestModule { }
