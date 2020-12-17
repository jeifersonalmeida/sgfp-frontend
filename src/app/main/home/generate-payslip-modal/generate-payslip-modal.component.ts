import { jsPDF } from 'jspdf';
import { switchMap } from 'rxjs/operators';
import { Employee, ModalData } from 'src/app/core/models';
import { Payslip } from 'src/app/core/models/payslip';

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PayslipService } from '../../../core/services/payslip.service';

@Component({
  selector: 'app-generate-payslip-modal',
  templateUrl: './generate-payslip-modal.component.html',
  styleUrls: ['./generate-payslip-modal.component.scss']
})
export class GeneratePayslipModalComponent implements OnInit {

  step = 0;
  loading = false;

  form: FormGroup = new FormGroup({
    workedDays: new FormControl(null, [Validators.required]),
    overtime: new FormControl(null, [Validators.required]),
    absence: new FormControl(null, [Validators.required]),
  });

  pdf: jsPDF;

  constructor(
    private readonly payslipService: PayslipService,
    public dialogRef: MatDialogRef<GeneratePayslipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData?: ModalData<Employee>,
  ) { }

  ngOnInit(): void {
    console.log(this.modalData);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onNext() {
    const form = this.form.value;
    const payslip: Payslip = {
      workedDays: +form.workedDays,
      overtime: +form.overtime,
      absence: +form.absence,
    }

    this.loading = true;

    const idFuncionario = this.modalData.data.id;

    this.payslipService.save(idFuncionario, payslip).pipe(
      switchMap(() => this.payslipService.getPayslip(idFuncionario)),
    ).subscribe(response => {
      const employee = this.modalData.data;
      this.pdf = this.generatePDF(employee, response);

      this.loading = false;
      this.step++;
    });
  }

  generatePDF(employee: Employee, salary: number) {
    const doc = new jsPDF();
    doc.line(20, 20, 190, 20);
    doc.text('Recibo de Pagamento de Salário', 22, 27);
    doc.line(20, 30, 190, 30);
    doc.setFontSize(12);
    doc.text(`Nome: ${employee.name}`, 22, 37);
    doc.line(20, 40, 190, 40);
    doc.text(`RG: ${employee.rg}`, 22, 47);
    doc.line(70, 40, 70, 50);
    doc.line(20, 50, 190, 50);
    doc.text(`CPF: ${employee.cpf}`, 73, 47);
    doc.line(120, 40, 120, 50);
    doc.text(`Cargo: ${employee.position}`, 123, 47);
    doc.text(`Salário: R$ ${employee.salary}`, 22, 57);
    doc.line(20, 60, 190, 60);
    doc.line(90, 50, 90, 60);
    doc.text(`Hora Extra: R$ ${employee.overtimeValue}`, 93, 57);
    doc.text(`Salário: R$ ${salary}`, 22, 100);
    doc.line(20, 92, 190, 92);
    doc.line(135, 100, 185, 100);
    doc.setFontSize(10);
    doc.text('Assinatura', 152, 104);
    doc.line(20, 20, 20, 105);
    doc.line(190, 20, 190, 105);
    doc.line(20, 105, 190, 105);

    return doc;
  }

  onDownload() {
    this.pdf.save('holerite.pdf');
    this.dialogRef.close();
  }

}
