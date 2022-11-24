export interface Leasing_Data {
  porcentaje_Primera_Tasa_Efectiva:number,
  duracion_Primera_Tasa_Efectiva:number,
  porcentaje_Segunda_Tasa_Efectiva:number,
  precio_de_Venta_del_Activo:number;
  porcentaje_Cuota_Inicial:number;
  numero_de_Anios_a_Pagar:number;
  frecuencia_de_Pago_en_Dias:number;
  numero_de_Dias_por_Anio:number;
  primer_Plazo_de_Gracia_Meses:number;
  primer_Tipo_de_Gracia:string
  segundo_Plazo_de_Gracia_Meses:number;
  segundo_Tipo_de_Gracia:string
  costes_Notariales:number;
  costes_Registrales:number;
  tasacion:number;
  comision_de_Estudio:number;
  comision_de_Activacion:number;
  comision_Periodica:number;
  portes:number;
  gastos_de_Administracion:number;
  porcentaje_de_Seguro_de_Desgravamen:number;
  porcentaje_de_Seguro_de_Riesgo:number;
  costo_de_Oportunidad:number;
  currencyTypeId:number;
  userId:number;
  }
  