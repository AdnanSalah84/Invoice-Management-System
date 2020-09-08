import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { PersontestRoutingModule } from './persontest-routing.module';
import { PersontestComponent } from './persontest.component';


@NgModule({
  declarations: [PersontestComponent],
  imports: [
    CommonModule,
    PersontestRoutingModule,
    ButtonModule,
    DialogModule
  ]
})
export class PersontestModule { }
