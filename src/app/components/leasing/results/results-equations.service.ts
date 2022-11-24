import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { irr } from 'node-irr';

@Injectable({
  providedIn: 'root',
})
export class ResultsEquationsService {
  constructor() {}

  //-----------------------------Resultados-----------------------------//
  //-----------------------...del financiamiento-----------------------
  //Saldo a financiar
  Saldo(PV: number, pCI: number) {
    return PV - PV * pCI;
  }
  //Monto del prestamo
  Prestamo(Saldo: number, costes_gastos_iniciales: number[]) {
    return (
      Saldo +
      costes_gastos_iniciales.reduce(
        (accumulated, current) => accumulated + current
      )
    );
  }
  //Nº Cuotas por Año
  NCxA(NDxA: number, frec: number) {
    return NDxA / frec;
  }
  //Nº Total de Cuotas
  N(NCxA: number, NA: number) {
    return NCxA * NA;
  }
  //-----------------------de los costes/gastos periodicos-----------------------
  //% de Seguro desgrav. per.
  pSegDesPer(pSegDes: number, frec: number) {
    return (pSegDes * frec) / 30;
  }
  //Seguro de riesgo
  SegRiePer(pSegRie: number, PV: number, NCxA: number) {
    return (pSegRie * PV) / NCxA;
  }
  //-----------------------...totales por...-----------------------
  Intereses({ I }: { I: number[] }) {
    return -I.reduce((accumulated, current) => accumulated + current);
  }
  Amortización_del_capital({ A, PP }: { A: number[]; PP: number[] }) {
    return -(
      A.reduce((accumulated, current) => accumulated + current) +
      PP.reduce((accumulated, current) => accumulated + current)
    );
  }
  Seguro_de_desgravamen({ SegDes }: { SegDes: number[] }) {
    return -SegDes.reduce((accumulated, current) => accumulated + current);
  }
  Seguro_contra_todo_riesgo({ SegRie }: { SegRie: number[] }) {
    return -SegRie.reduce((accumulated, current) => accumulated + current);
  }
  Comisiones_periodicas({ Comision }: { Comision: number[] }) {
    return -Comision.reduce((accumulated, current) => accumulated + current);
  }
  Portes_o_Gastos_de_adm({
    Portes,
    GasAdm,
  }: {
    Portes: number[];
    GasAdm: number[];
  }) {
    return -(
      Portes.reduce((accumulated, current) => accumulated + current) +
      GasAdm.reduce((accumulated, current) => accumulated + current)
    );
  }
  //-----------------------...de indicadores de Rentabilidad-----------------------
  //Tasa de descuento
  COKi({ COK, frec, NDxA }: { COK: number; frec: number; NDxA: number }) {
    return Math.pow(1 + COK, frec / NDxA) - 1;
  }

  //TIR de la operacion
  TIR_Operacion(Flujo: number[]) {
    return Math.abs(irr(Flujo)); //0.1 -> usamos 10 por problemas de performance
  }

  //TIR_RESULTADOS
  TIR_Resultados(Flujo: number[]) {
    var flujoOperation: number[] = [];
    flujoOperation.push(-Flujo[0]);
    //Para la formula el primer elemento se opera en negativo y el resto positivo
    for (let i = 1; i < Flujo.length; i++) {
      flujoOperation.push(-Flujo[i]); //use i instead of 0
    }
    return Math.abs(irr(flujoOperation));
  }

  //TCEA de la operacion
  TCEA(TIR_de_la_operacion: number, Numero_de_cuotas_por_año: number) {
    return Math.pow(1 + TIR_de_la_operacion, Numero_de_cuotas_por_año) - 1;
  }
  //VAN operacion
  VAN(Tasa_de_descuento: number, Flujo: number[]) {
    var NPV: number = 0;
    NPV += Flujo[0];

    for (let i = 1; i < Flujo.length; i++) {
      NPV += Flujo[i] / Math.pow(1 + Tasa_de_descuento, i);
    }

    return NPV;
  }
}
