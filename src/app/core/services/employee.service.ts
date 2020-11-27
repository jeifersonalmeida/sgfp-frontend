import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly employeesMockPath = 'assets/mocks/employees.json';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeesMockPath);
  }

  save(employee: Employee): Observable<any> {
    return this.httpClient.post('', employee);
  }

  edit(employee: Employee) {

  }

  delete(id: number) {
  }

}
