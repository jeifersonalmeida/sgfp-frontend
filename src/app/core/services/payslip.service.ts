import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Payslip } from '../models/payslip';

@Injectable({
  providedIn: 'root'
})
export class PayslipService {

  private readonly servicePath = environment.backUrl + '/folhaPagamento';
  private readonly calcServicePath = environment.backUrl + '/folhaPagamento/calcular';

  constructor(private httpClient: HttpClient) { }

  save(idFuncionario: string, payslip: Payslip): Observable<any> {
    return this.httpClient.post(this.servicePath, payslip, {
      params: {
        idFuncionario,
      },
    });
  }

  getPayslip(idFuncionario: string): Observable<number> {
    return this.httpClient.get<number>(this.calcServicePath, {
      params: {
        idFuncionario,
      }
    });
  }

}
