import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard';
import { AboutUsModule } from '../core/aboutus/aboutus.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AboutUsModule
  ]
})
export class DashboardModule { }