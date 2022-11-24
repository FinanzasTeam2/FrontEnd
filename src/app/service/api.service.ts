import { UserProfile } from './../model/user-profile.service';
import { LeasingData } from './../model/leasing-table.service';
import { Leasing_Results } from './../model/api/leasing_results.service';

import { Datos } from 'src/app/model/datos.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Leasing_Data } from '../model/api/leasing_data.service';
import { Resultados } from '../model/resultados.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  leasingResults?: Leasing_Results;

  basepath = 'https://localhost:7026/api/v1/';
  constructor(private http: HttpClient) {}

  //Register
  postUser(user: UserProfile) {
    return this.http.post<any>(this.basepath + 'user', user);
  }

  //Login
  getUserByEmailAndPassword(email: string, password: string) {
    return this.http.get<any>(
      this.basepath + `user?email=${email}&password=${password}`
    );
  }

  //LeasingData
  postLeasingData(data: Leasing_Data) {
    return this.http.post<any>(this.basepath + 'leasingdata', data);
  }

  //LeasingResult
  postLeasingResult(results: Resultados, leasingMethodId: number, leasingDataId:number) {
    this.leasingResults = {
      saldo_a_Financiar: results.Saldo,
      monto_del_Prestamo: results.Prestamo,
      numero_de_Cuotas_por_Anio: results.NCxA,
      numero_Total_de_Cuotas: results.N,
      porcentaje_de_Seguro_Desgravamen_Periodo: results.pSegDesPer,
      seguro_Riesgo: results.SegRiePer,
      intereses: results.Intereses,
      amortizacion_del_Capital: results.Amortizacion_del_capital,
      seguro_de_Desgravamen: results.Seguro_de_desgravamen,
      seguro_Contra_Todo_Riesgo: results.Seguro_contra_todo_riesgo,
      comisiones_Periodicas_Riesgo: results.Comisiones_periodicas,
      portes_Gastos_de_Administracion: results.Portes_o_Gastos_de_adm,
      tasa_de_Descuento: results.COKi,
      tiR_de_la_Operacion: results.TIR,
      tceA_de_la_Operacion: results.TCEA,
      vaN_Operacion: results.VAN,
      leasingDataId:leasingDataId,
      leasingMethodId: leasingMethodId,
    };

    return this.http.post<any>(
      this.basepath + 'leasingresult',
      this.leasingResults
    );
  }
}
