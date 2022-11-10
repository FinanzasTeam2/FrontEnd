import { Datos } from './../../model/datos.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.css'],
})
export class LeasingComponent implements OnInit {
  data: Datos = {
    PV: 125000,
    pCI: 20000,
    NA: 15,
    frec: 30,
    NDxA: 360,
    CostesNotariales: 150,
    CostesRegistrales: 250,
    Tasacion: 80,
    ComisionEstudio: 50,
    ComisionActivacion: 0,
    ComPer: 0,
    PortesPer: 3.5,
    GasAdmPer: 0,
    pSegDes: 0.05,
    pSegRie: 0.3,
    COK: 25.0,
  };
  leasingTable: any = [325];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      //...del prestamo
      precio_de_venta_del_activo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      porcentaje_de_cuota_inicial: new FormControl('', [Validators.required]),
      num_de_años: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      frecuencia_de_pago: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      num_dias_por_año: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      //...de los costes/gatos iniciales
      costes_notariales: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      costes_registrales: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      tasacion: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      comision_de_estudio: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      comision_activación: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      //...de los costes/gastos periodicos
      comision_periodica: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      portes: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      gastos_de_administración: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      porcentaje_de_seguro_desgravamen: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      porcentaje_de_seguro_riesgo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      //...del costo de oportunidad
      tasa_de_descuento: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  ngOnInit(): void {}

  Submit() {
    if (this.formGroup.valid) {
      this.data = this.formGroup.value;
      console.log(this.data);
    } else {
      console.log(this.data);
    }
  }

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
  Intereses(I: number[]) {
    return -I.reduce((accumulated, current) => accumulated + current);
  }
  Amortización_del_capital(A: number[], PP: number[]) {
    return -(
      A.reduce((accumulated, current) => accumulated + current) +
      PP.reduce((accumulated, current) => accumulated + current)
    );
  }
  Seguro_de_desgravamen(SegDes: number[]) {
    return -SegDes.reduce((accumulated, current) => accumulated + current);
  }
  Seguro_contra_todo_riesgo(SegRie: number[]) {
    return -SegRie.reduce((accumulated, current) => accumulated + current);
  }
  Comisiones_periodicas(Comision: number[]) {
    return -Comision.reduce((accumulated, current) => accumulated + current);
  }
  Portes_o_Gastos_de_adm(Portes: number[], GasAdm: number[]) {
    return -(
      Portes.reduce((accumulated, current) => accumulated) +
      GasAdm.reduce((accumulated, current) => accumulated + current)
    );
  }
  //-----------------------...de indicadores de Rentabilidad-----------------------
  //Tasa de descuento
  COKi(COK: number, frec: number, NDxA: number) {
    return Math.pow(1 + COK, frec / NDxA) - 1;
  }
  /*
  //TIR de la operacion
  TIR_Operacion(Flujo:number[]) {
    return this.TIR(Flujo.reduce((accumulated,current)=>accumulated+current),1);
  }
  TIR(arr:number,porcentaje:number)
  {
    return 0;//Falta implementar
  }
  //TCEA de la operacion
  TCEA(:number) {
    return Math.pow(1+,)-1;
  }
  //VAN operacion
  VAN(:number) {
    return;
  }
  */
}
