export interface Datos {
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
