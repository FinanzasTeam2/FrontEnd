export interface Datos {
  //--Falta Implementar--//
  Porcentaje_tasa_efectiva1:number,
  Duracion_Tasa_Efectiva1:number,
  Porcentaje_tasa_efectiva2:number,
  //------Extras-------/
  TipoMoneda: number;
  PlazoDeGracia1: number;
  PlazoDeGracia2: number;

  TipoDeGracia1: string;
  TipoDeGracia2: string;
  //Prestamo
  PV: number;
  pCI: number;
  NA: number;
  frec: number;
  NDxA: number;
  //Costes/Gastos iniciales
  CostesNotariales: number;
  CostesRegistrales: number;
  Tasacion: number;
  ComisionEstudio: number;
  ComisionActivacion: number;
  //Costes/Gastos periodicos
  ComPer: number;
  PortesPer: number;
  GasAdmPer: number;
  pSegDes: number;
  pSegRie: number;
  //Costo de oportunidad
  COK: number;
}
