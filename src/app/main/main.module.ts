import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { HomeModule } from './home/home.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MainRoutingModule,
    HomeModule,
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule { }
