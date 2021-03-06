import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Employee, ModalData } from '../../../core/models';

@Component({
  selector: 'app-employee-actions-modal',
  templateUrl: './employee-actions-modal.component.html',
  styleUrls: ['./employee-actions-modal.component.scss']
})
export class EmployeeActionsModalComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, [Validators.required]),
    rg: new FormControl(null, [Validators.required]),
    cpf: new FormControl(null, [Validators.required]),
    position: new FormControl(null, [Validators.required]),
    salary: new FormControl(null, [Validators.required]),
    overtimeValue: new FormControl(null, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<EmployeeActionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData?: ModalData<Employee>,
  ) { }

  ngOnInit(): void {
    if (this.modalData?.data) {
      this.form.patchValue(this.modalData.data);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const form = this.form.value;
    const employee: Employee = {
      id: form.id,
      name: form.name,
      rg: form.rg,
      cpf: form.cpf,
      position: form.position,
      salary: +form.salary,
      overtimeValue: +form.overtimeValue,
    }
    this.dialogRef.close(employee);
  }

}
