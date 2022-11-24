export interface Resultados {
  //Del financiamiento
  Saldo: number; //Saldo a financiar
  Prestamo: number; //Monto del prestamo
  NCxA: number; //Nº Cuotas por Año
  N: number; //Nº Total de Cuotas
  //de los costes/gastos periodicos
  pSegDesPer: number; //% de Seguro desgravamen periodo
  SegRiePer: number; //Seguro de riesgo
  //totales por
  Intereses: number;
  Amortizacion_del_capital: number;
  Seguro_de_desgravamen: number;
  Seguro_contra_todo_riesgo: number;
  Comisiones_periodicas: number;
  Portes_o_Gastos_de_adm: number;
  //de indicadores de Rentabilidad
  COKi: number; //Tasa de descuento
  TIR: number; //TIR de la operacion
  TCEA: number; //TCEA de la operacion
  VAN: number; //VAN operacion
  //Metodo
  MetodoId:number;
}
