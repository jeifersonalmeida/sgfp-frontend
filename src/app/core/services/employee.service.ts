import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly servicePath = environment.backUrl + '/funcionario';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.servicePath);
  }

  save(employee: Employee): Observable<any> {
    return this.httpClient.post(this.servicePath, employee);
  }

  edit(employee: Employee) {
    return this.httpClient.patch(this.servicePath, employee, { params: { id: employee.id } });
  }

  delete(id: string) {
    return this.httpClient.delete(this.servicePath, { params: { id } });
  }

}
