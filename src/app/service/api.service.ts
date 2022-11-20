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

  leasingData?: Leasing_Data;
  leasingResults?:Leasing_Results;

  basepath = 'https://localhost:7026/api/v1/';
  constructor(private http: HttpClient) {}

  //Register
  postUser(data: any) {
    return this.http.post<any>(this.basepath + 'user', data);
  }

  //Login
  getUserByEmailAndPassword(email: string, password: string) {
    return this.http.get<any>(
      this.basepath + `user?email=${email}&password=${password}`
    );
  }

  //LeasingData
  postLeasingData(data:Datos,id:number){

    this.leasingData={
      Porcentaje_Primera_Tasa_Efectiva:data.Porcentaje_tasa_efectiva1,
      Duracion_Primera_Tasa_Efectiva:data.Duracion_Tasa_Efectiva1,
      Porcentaje_Segunda_Tasa_Efectiva:data.Porcentaje_tasa_efectiva2,
      Precio_de_Venta_del_Activo:data.PV,
      Porcentaje_Cuota_Inicial:data.pCI,
      Numero_de_Años_a_Pagar:data.NA,
      Frecuencia_de_Pago_en_Dias:data.frec,
      Numero_de_Dias_por_Año:data.NDxA,
      Primer_Plazo_de_Gracia_Meses:data.PlazoDeGracia1,
      Primer_Tipo_de_Gracia:data.TipoDeGracia1,
      Segundo_Plazo_de_Gracia_Meses:data.PlazoDeGracia2,
      Segundo_Tipo_de_Gracia:data.TipoDeGracia2,
      Costes_Notariales:data.CostesNotariales,
      Costes_Registrales:data.CostesRegistrales,
      Tasacion:data.Tasacion,
      Comision_de_Estudio:data.ComisionEstudio,
      Comision_de_Activacion:data.ComisionActivacion,
      Comision_Periodica:data.ComPer,
      Portes:data.PortesPer,
      Gastos_de_Administracion:data.GasAdmPer,
      Porcentaje_de_Seguro_de_Desgravamen:data.pSegDes,
      Porcentaje_de_Seguro_de_Riesgo:data.pSegRie,
      Costo_de_Oportunidad:data.COK,
      CurrencyTypeId:0,
      UserId:id
    };

    /* SolesId = 1; DollarId = 2; Euro = 3 */
    if(data.TipoMoneda ==1){
      this.leasingData.CurrencyTypeId=1;
    }else if(data.TipoMoneda==3.83){
      this.leasingData.CurrencyTypeId=2;
    }else if(data.TipoMoneda==3.98){
      this.leasingData.CurrencyTypeId=3;
    }

    return this.http.post<any>(this.basepath+'leasingdata',this.leasingData);
  }

  //LeasingResult
  postLeasingResult(results:Resultados,leasingMethodId:number){
    this.leasingResults={
      Saldo_a_Financiar:results.Saldo,
      Monto_del_Prestamo:results.Prestamo,
      Numero_de_Cuotas_por_Año:results.NCxA,
      Numero_Total_de_Cuotas:results.N,
      Porcentaje_de_Seguro_Desgravamen_Periodo:results.pSegDesPer,
      Seguro_Riesgo:results.SegRiePer,
      Intereses:results.Intereses,
      Amortizacion_del_Capital :results.Amortización_del_capital,
      Seguro_de_Desgravamen:results.Seguro_de_desgravamen,
      Seguro_Contra_Todo_Riesgo:results.Seguro_contra_todo_riesgo,
      Comisiones_Periodicas_Riesgo:results.Comisiones_periodicas,
      Portes_Gastos_de_Administración:results.Portes_o_Gastos_de_adm,
      Tasa_de_Descuento:results.COKi,
      TIR_de_la_Operación:results.TIR,
      TCEA_de_la_Operación:results.TCEA,
      VAN_Operación:results.VAN,
      LeasingMethodId:leasingMethodId,
    }

    return this.http.post<any>(this.basepath+'leasingresult',this.leasingResults);
  }
}
