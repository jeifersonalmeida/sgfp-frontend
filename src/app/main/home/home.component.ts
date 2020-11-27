import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Employee, ModalData } from '../../core/models';
import { EmployeeService } from '../../core/services/employee.service';
import {
    EmployeeActionsModalComponent
} from './employee-actions-modal/employee-actions-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = [
    'cpf',
    'name',
    'position',
    'salary',
    'actions',
  ];

  employees: Employee[];
  employessFiltered: Employee[];

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.employeeService.findAll().subscribe(employees => this.employees = this.employessFiltered = employees);
  }

  updateSearchParam(event: Event) {
    if (this.employees?.length) {
      const searchParam = event.target['value'].toLowerCase();
      this.employessFiltered = this.employees.filter(employee => employee.name.toLowerCase().includes(searchParam)); 
    }
  }

  generatePayslip(employee): void {

  }

  openModal(modalData?: ModalData<Employee>, callback?: (result: Employee) => void): void {
    const modalParams: any = {
      width: '350px',
    }
    if (modalData) {
      modalParams.data = modalData;
    }
    const dialogRef = this.dialog.open(EmployeeActionsModalComponent, modalParams);
    if (callback) {
      dialogRef.afterClosed().subscribe(callback);
    }
  }

  newEmployee(): void {
    this.openModal(null, result => {
      this.employeeService.save(result);
    });
  }

  viewEmployee(employee): void {
    this.openModal({ readonly: true, data: employee });
  }

  editEmployee(employee, event: Event): void {
    event.stopPropagation();
    this.openModal({ data: employee }, result => {
      console.log(result);
    });
  }

  removeEmployee(employee: Employee, event: Event): void {
    event.stopPropagation();
    this.employeeService.delete(employee.id);
  }

}
