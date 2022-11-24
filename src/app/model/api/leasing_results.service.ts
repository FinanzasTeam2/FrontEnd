export interface Leasing_Results {
  //id: number;
  saldo_a_Financiar: number;
  monto_del_Prestamo: number;
  numero_de_Cuotas_por_Anio: number;
  numero_Total_de_Cuotas: number;
  porcentaje_de_Seguro_Desgravamen_Periodo: number;
  seguro_Riesgo: number;
  intereses: number;
  amortizacion_del_Capital: number;
  seguro_de_Desgravamen: number;
  seguro_Contra_Todo_Riesgo: number;
  comisiones_Periodicas_Riesgo: number;
  portes_Gastos_de_Administracion: number;
  tasa_de_Descuento: number;
  tiR_de_la_Operacion: number;
  tceA_de_la_Operacion: number;
  vaN_Operacion: number;
  leasingDataId:number;
  leasingMethodId: number;
}