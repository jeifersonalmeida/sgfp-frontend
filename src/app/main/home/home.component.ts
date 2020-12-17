import { Observable, Subscription } from 'rxjs';

import { ComponentType } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Employee, ModalData } from '../../core/models';
import { EmployeeService } from '../../core/services/employee.service';
import {
    EmployeeActionsModalComponent
} from './employee-actions-modal/employee-actions-modal.component';
import {
    GeneratePayslipModalComponent
} from './generate-payslip-modal/generate-payslip-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'cpf',
    'name',
    'position',
    'salary',
    'actions',
  ];

  employees: Employee[];
  employessFiltered: Employee[];

  loading = false;

  private subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateSearchParam(event: Event) {
    if (this.employees?.length) {
      const searchParam = event.target['value'].toLowerCase();
      this.employessFiltered = this.employees.filter(employee => employee.name.toLowerCase().includes(searchParam)); 
    }
  }

  openModal<T>(componentType: ComponentType<T>, modalData?: ModalData<Employee>, callback?: (result: Employee) => void): void {
    const modalParams: any = {
      width: '350px',
    }
    if (modalData) {
      modalParams.data = modalData;
    }
    // const dialogRef = this.dialog.open(EmployeeActionsModalComponent, modalParams);
    const dialogRef = this.dialog.open(componentType, modalParams);
    if (callback) {
      dialogRef.afterClosed().subscribe(callback);
    }
  }

  findAll() {
    this.loading = true;
    this.employeeService.findAll()
      .subscribe(employees => {
        this.employees = employees;
        this.employessFiltered = employees;
        this.loading = false;
      });
  }

  newEmployee(): void {
    this.openModal(EmployeeActionsModalComponent, null, (employee: Employee) => {
      if (employee) {
        this.employeeService.save(employee).subscribe(() => this.findAll());
      }
    });
  }

  viewEmployee(employee): void {
    this.openModal(EmployeeActionsModalComponent, { readonly: true, data: employee });
  }

  editEmployee(employee, event: Event): void {
    event.stopPropagation();
    this.openModal(EmployeeActionsModalComponent, { data: employee }, (employee: Employee) => {
      if (employee) {
        this.employeeService.edit(employee).subscribe(() => this.findAll());
      }
    });
  }

  removeEmployee(employee: Employee, event: Event): void {
    event.stopPropagation();
    this.employeeService.delete(employee.id).subscribe(() => this.findAll());
  }

  generatePayslip(employee: Employee, event: Event): void {
    event.stopPropagation();
    this.openModal(GeneratePayslipModalComponent, { data: employee }, null);
  }

}
