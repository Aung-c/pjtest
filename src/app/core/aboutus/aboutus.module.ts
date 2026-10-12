import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AboutUsRoutingModule } from './aboutus-routing.module';
import { AboutUsComponent } from './aboutus/aboutus.component';

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AboutUsRoutingModule
  ],
  exports: [ AboutUsComponent ]
})
export class AboutUsModule { }