import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import {
    EmployeeActionsModalComponent
} from './employee-actions-modal/employee-actions-modal.component';
import {
    GeneratePayslipModalComponent
} from './generate-payslip-modal/generate-payslip-modal.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    EmployeeActionsModalComponent,
    GeneratePayslipModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forChild(),
  ]
})
export class HomeModule { }
