import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

const globalComponents = [
  HeaderComponent,
  FooterComponent,
];

@NgModule({
  declarations: [
    ...globalComponents,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...globalComponents,
  ],
})
export class CoreModule { }
