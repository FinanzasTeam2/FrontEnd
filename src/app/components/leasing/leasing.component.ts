import { LeasingData } from './../../model/leasing-table.service';
import { Datos } from './../../model/datos.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Resultados } from 'src/app/model/resultados.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.css'],
})
export class LeasingComponent implements OnInit {
  indexTable: number;
  data: Datos = {
    PV: 125000,
    pCI: 20 / 100,
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
    pSegDes: 0.05 / 100,
    pSegRie: 0.3 / 100,
    COK: 25.0 / 100,
  };
  results: Resultados;
  leasingData: LeasingData;

  dataSource = new MatTableDataSource<LeasingData>();
  leasingTable: LeasingData[];
  displayedColumns: string[] = [
    'NC',
    'TEA',
    'i',
    'IA',
    'IP',
    'PG',
    'SI',
    'SII',
    'I',
    'Cuota',
    'A',
    'PP',
    'SegDes',
    'SegRie',
    'Portes',
    'GasAdm',
    'SF',
    'Flujo',
  ];

  formGroup!: FormGroup;
  resultGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.indexTable = 0;
    this.results = {} as Resultados;
    this.leasingData = {} as LeasingData;

    this.leasingTable = [] as LeasingData[];

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

    this.resultGroup = this.formBuilder.group({
      //Del financiamiento
      Saldo: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //Saldo a financiar
      Prestamo: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //Monto del prestamo
      NCxA: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //Nº Cuotas por Año
      N: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //Nº Total de Cuotas
      //de los costes/gastos periodicos
      pSegDesPer: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //% de Seguro desgrav. per.
      SegRiePer: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //Seguro de riesgo
      //totales por
      Intereses: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]),
      Amortización_del_capital: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Seguro_de_desgravamen: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Seguro_contra_todo_riesgo: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Comisiones_periodicas: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Portes_o_Gastos_de_adm: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      //de indicadores de Rentabilidad
      COKi: new FormControl('', [Validators.pattern('^[0-9]*$')]), //Tasa de descuento
      TIR: new FormControl('', [Validators.pattern('^[0-9]*$')]), //TIR de la operacion
      TCEA: new FormControl('', [Validators.pattern('^[0-9]*$')]), //TCEA de la operacion
      VAN: new FormControl('', [Validators.pattern('^[0-9]*$')]), //VAN operacion
    });
  }

  ngOnInit(): void {}

  Submit() {
    if (this.formGroup.valid) {
      this.data = this.formGroup.value;
      console.log(this.data);
    } else {
      console.log(this.data);
      //----------------------------Resultados----------------------------//
      //-----------------------del financiemiento-----------------------
      this.results.Saldo = this.Saldo(this.data.PV, this.data.pCI);
      this.updateValue('Saldo', this.results.Saldo);
      var costes_gastos_iniciales = [
        this.data.CostesNotariales,
        this.data.CostesRegistrales,
        this.data.Tasacion,
        this.data.ComisionEstudio,
        this.data.ComisionActivacion,
      ];

      this.results.Prestamo = this.Prestamo(
        this.results.Saldo,
        costes_gastos_iniciales
      );
      this.updateValue('Prestamo', this.results.Prestamo);

      this.results.NCxA = this.NCxA(this.data.NDxA, this.data.frec);
      this.updateValue('NCxA', this.results.NCxA);

      this.results.N = this.N(this.results.NCxA, this.data.NA);
      this.updateValue('N', this.results.N);

      //-----------------------Costes / Gastos periodicos-----------------------
      this.results.pSegDesPer = this.pSegDesPer(
        this.data.pSegDes,
        this.data.frec
      );
      this.updateValue('pSegDesPer', this.results.pSegDesPer);

      this.results.SegRiePer = this.SegRiePer(
        this.data.pSegRie,
        this.data.PV,
        this.results.NCxA
      );
      this.updateValue('SegRiePer', this.results.SegRiePer);

      //----------------------------LeasingTable----------------------------//

      //--------------------NC - TEA --------------------
      //5años -> 5*12 = 60
      for (let i = 0; i < 60 + 1; i++) {
        this.leasingTable.push(
          CreateLeasingData({ _NC: this.indexTable++, _TEA: 10 / 100 })
        );
      }

      //10años -> 10*10 =120
      for (let i = 0; i < 120; i++) {
        this.leasingTable.push(
          CreateLeasingData({ _NC: this.indexTable++, _TEA: 12 / 100 })
        );
      }

      //10años -> 10*10 =120
      for (let i = 0; i < 120; i++) {
        this.leasingTable.push(
          CreateLeasingData({ _NC: this.indexTable++, _TEA: 0 / 100 })
        );
      }

      //--------------------TEP --------------------
      for (let i = 1; i < 300; i++) {
        this.leasingTable[i].TEP = this.TEP({
          NC: i,
          N: this.results.N,
          TEA: this.leasingTable[i].TEA,
          frec: this.data.frec,
          NDxA: this.data.NDxA,
        });
      }

      //--------------------IA --------------------
      //tiene 0

      //--------------------IP --------------------
      //tiene 0 -> PERO HAY Q IMPLEMENTAR LA FORMULA XD

      //--------------------P.G. --------------------
      //5años -> 5*12 = 60
      for (let i = 1; i <= 6; i++) {
        this.leasingTable[i].PG = 'T';
      }

      //10años -> 10*10 =120
      for (let i = 7; i <= 12; i++) {
        this.leasingTable[i].PG = 'P';
      }

      //10años -> 10*10 =120
      for (let i = 13; i <= 300; i++) {
        this.leasingTable[i].PG = 'S';
      }

      //--------------------Saldo Inicial --------------------
      //--------------------Saldo Inicial Indexado --------------------
      //--------------------Interes --------------------
      //--------------------Cuota (inc Seg Des) --------------------
      //--------------------Amortizacion--------------------
      //--------------------Prepago --------------------
      //No tiene formula
      //--------------------Seguro Desgravamen --------------------
      //--------------------Seguro riesgo--------------------
      //--------------------Comision --------------------
      //--------------------Portes --------------------
      //--------------------Gastos Adm. --------------------
      //--------------------Saldo Final --------------------
      //--------------------Flujo --------------------

      //...
      this.dataSource = new MatTableDataSource(this.leasingTable);
      console.log(this.leasingTable);
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

  updateValue(parameter: string, data: number) {
    this.resultGroup.patchValue({ [parameter]: data.toString() });
  }

  //-----------------------------LeasingTable-----------------------------//
  TEP({
    NC,
    N,
    TEA,
    frec,
    NDxA,
  }: {
    NC: number;
    N: number;
    TEA: number;
    frec: number;
    NDxA: number;
  }) {
    console.log('ESTO', NC, N, TEA, frec, NDxA);
    if (NC <= N) {
      return Math.pow(1 + TEA, frec / NDxA) - 1;
    } else {
      return 0;
    }
  }

  //--------------------Saldo Inicial --------------------
  SI({
    NC,
    Prestamo,
    N,
    SaldoFinal,
  }: {
    NC: number;
    Prestamo: number;
    N: number;
    SaldoFinal: number;
  }) {
    if (NC == 1) {
      return Prestamo;
    } else if (NC <= N) {
      return SaldoFinal;
    } else {
      return 0;
    }
  }

  //--------------------Saldo Inicial Indexado --------------------
  SII({ SI, IP }: { SI: number; IP: number }) {
    return SI + SI * IP;
  }

  //--------------------Interes --------------------
  I({ SII, TEP }: { SII: number; TEP: number }) {
    return -SII * TEP;
  }

  //--------------------Cuota (inc Seg Des) --------------------
  Cuota({
    NC,
    N,
    PG,
    I,
    A,
    SegDes,
  }: {
    NC: number;
    N: number;
    PG: string;
    I: number;
    A: number;
    SegDes: number;
  }) {
    if (NC <= N) {
      if (PG == 'T') {
        return 0;
      } else {
        if ((PG = 'P')) {
          return I;
        } else {
          return I + A + SegDes;
        }
      }
    } else {
      return 0;
    }
  }

  //--------------------Amortizacion--------------------
  A({ NC, N, PG, SII }: { NC: number; N: number; PG: string; SII: number }) {
    if (NC <= N) {
      if (PG == 'T' || PG == 'P') {
        return 0;
      } else {
        return -SII / (N - NC + 1);
      }
    } else {
      return 0;
    }
  }

  //--------------------Prepago --------------------
  //PP({}: {}) {}
  //--------------------Seguro Desgravamen --------------------
  SegDes({ SII, pSegDesPer }: { SII: number; pSegDesPer: number }) {
    return -SII * pSegDesPer;
  }

  //--------------------Seguro riesgo--------------------
  SegRie({ NC, N, SegRiePer }: { NC: number; N: number; SegRiePer: number }) {
    if (NC <= N) {
      return -SegRiePer;
    } else {
      return 0;
    }
  }

  //--------------------Comision --------------------
  Comision({ NC, N, ComPer }: { NC: number; N: number; ComPer: number }) {
    if (NC <= N) {
      return -ComPer;
    } else {
      return 0;
    }
  }

  //--------------------Portes --------------------
  Portes({ NC, N, PortesPer }: { NC: number; N: number; PortesPer: number }) {
    if (NC <= N) {
      return -PortesPer;
    } else {
      return 0;
    }
  }

  //--------------------Gastos Adm. --------------------
  GasAdm({ NC, N, GasAdmPer }: { NC: number; N: number; GasAdmPer: number }) {
    if (NC <= N) {
      return -GasAdmPer;
    } else {
      return 0;
    }
  }
  //--------------------Saldo Final --------------------
  SF({
    PG,
    SII,
    I,
    A,
    PP,
  }: {
    PG: string;
    SII: number;
    I: number;
    A: number;
    PP: number;
  }) {
    if (PG == 'T') {
      return SII - I;
    } else {
      return SII + A + PP;
    }
  }
  //--------------------Flujo --------------------
  Flujo({
    Cuota,
    PP,
    SegRie,
    Comision,
    Portes,
    GasAdm,
    PG,
    SegDes,
  }: {
    Cuota: number;
    PP: number;
    SegRie: number;
    Comision: number;
    Portes: number;
    GasAdm: number;
    PG: string;
    SegDes: number;
  }) {
    if (PG == 'T' || PG == 'P') {
      return Cuota + PP + SegRie + Comision + Portes + GasAdm + SegDes;
    } else {
      return Cuota + PP + SegRie + Comision + Portes + GasAdm;
    }
  }
}

function CreateLeasingData({
  _NC = 0,
  _TEA = 0,
  _TEP = 0,
  _IA = 0,
  _IP = 0,
  _PG = '',
  _SI = 0,
  _SII = 0,
  _I = 0,
  _Cuota = 0,
  _A = 0,
  _PP = 0,
  _SegDes = 0,
  _SegRie = 0,
  _Portes = 0,
  _GasAdm = 0,
  _SF = 0,
  _Flujo = 0,
}: {
  _NC?: number;
  _TEA?: number;
  _TEP?: number;
  _IA?: number;
  _IP?: number;
  _PG?: string;
  _SI?: number;
  _SII?: number;
  _I?: number;
  _Cuota?: number;
  _A?: number;
  _PP?: number;
  _SegDes?: number;
  _SegRie?: number;
  _Portes?: number;
  _GasAdm?: number;
  _SF?: number;
  _Flujo?: number;
}) {
  var data: LeasingData = {
    NC: _NC,
    TEA: _TEA,
    TEP: _TEP,
    IA: _IA,
    IP: _IP,
    PG: _PG,
    SI: _SI,
    SII: _SII,
    I: _I,
    Cuota: _Cuota,
    A: _A,
    PP: _PP,
    SegDes: _SegDes,
    SegRie: _SegRie,
    Portes: _Portes,
    GasAdm: _GasAdm,
    SF: _SF,
    Flujo: _Flujo,
  };

  return data;
}
