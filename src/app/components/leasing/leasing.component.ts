import { SolutionService } from './solution/solution.service';
import { ResultsEquationsService } from './results/results-equations.service';
import { ResultsService } from './results/results.service';

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

import { LeasingTableService } from './leasing-table/leasing-table.serivce';
import { UtilsService } from './utils/utils.service';

export enum ButtonState {
  left,
  right,
  reset,
}

export enum LeasingState {
  Aleman,
  Frances,
  Americano,
}

interface Gracia {
  name: string;
  value: string;
}

@Component({
  selector: 'app-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.css'],
})
export class LeasingComponent implements OnInit {
  leasingState = {} as LeasingState;

  buttonState = ButtonState.left;

  indexTable: number;

  emptyData: Datos;
  emptyResults: Resultados;

  data: Datos = {
    TipoMoneda: 1, // Sol:1,Dollar:3.83,Euro:3.93
    PlazoDeGracia1: 6,
    PlazoDeGracia2: 6,
    UnidadDeTiempoPlazoDeGracia1: 'M',
    UnidadDeTiempoPlazoDeGracia2: 'M',
    TipoDeGracia1: 'T',
    TipoDeGracia2: 'P',
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

  dataSourceAleman = new MatTableDataSource<LeasingData>();
  dataSourceFrances = new MatTableDataSource<LeasingData>();
  dataSourceAmericano = new MatTableDataSource<LeasingData>();

  leasingTableAleman: LeasingData[];
  leasingTableFrances: LeasingData[];
  leasingTableAmericano: LeasingData[];

  leasingTableArr: any[];
  leasingTableArrFrances: any[];
  leasingTableArrAmericano: any[];

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
    'Comision',
    'Portes',
    'GasAdm',
    'SF',
    'Flujo',
  ];

  dataGroup!: FormGroup;
  resultGroup!: FormGroup;

  tipoGracia: Gracia[] = [
    { name: 'Sin Gracia', value: 'S' },
    { name: 'Parcial', value: 'P' },
    { name: 'Total', value: 'T' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private leasingTableService: LeasingTableService,
    private resultsService: ResultsService,
    private utils: UtilsService,
    private solutionService: SolutionService
  ) {
    utils = {} as UtilsService;
    solutionService = {} as SolutionService;

    this.emptyData = {} as Datos;
    this.emptyResults = {} as Resultados;

    leasingTableService = {} as LeasingTableService;
    resultsService = {} as ResultsService;

    this.indexTable = 0;
    this.results = {} as Resultados;
    this.leasingData = {} as LeasingData;

    this.leasingTableAleman = [] as LeasingData[];
    this.leasingTableFrances = [] as LeasingData[];
    this.leasingTableAmericano = [] as LeasingData[];

    this.leasingTableArr = [] as any[];
    this.leasingTableArrFrances = [] as any[];
    this.leasingTableArrAmericano = [] as any[];

    this.dataGroup = this.formBuilder.group({
      //------------------Implementado------------------------//
      /*----------FALTA HACER QUE MIS VARIABLES SEAN RECIBIDAS EN LA FORMULA
      --------------DE LA TABLA, CREO Q SOLO ES LA PRIMERA PARTE-----*/

      //-----------------Ultimo Sprint-----------------//
      porcentaje_tasa_efectiva1:new FormControl('', Validators.required),
      porcentaje_tasa_efectiva2:new FormControl('', Validators.required),

      plazo_tasa_efectiva1:new FormControl(null, Validators.required),
      plazo_tasa_efectiva2:new FormControl(null, Validators.required),



      tipo_de_moneda: new FormControl('', Validators.required),

      //Tipo de gracia
      plazo_de_Gracia1: new FormControl('', Validators.required),
      plazo_de_Gracia2: new FormControl('', Validators.required),

      //Tipo de gracia
      unidad_de_tiempo_plazo_de_gracia1: new FormControl(
        '',
        Validators.required
      ),
      unidad_de_tiempo_plazo_de_gracia2: new FormControl(
        null,
        Validators.required
      ),

      //Tipo de gracia
      tipo_de_Gracia1: new FormControl(null, Validators.required),
      tipo_de_Gracia2: new FormControl(null, Validators.required),
      //-------------------------------------------------//

      //...del prestamo
      precio_de_venta_del_activo: new FormControl([
        Validators.required,
        Validators.pattern('[0-9]+(?:.[0-9]{0,2})?'),
      ]),
      porcentaje_de_cuota_inicial: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d*)?$'),
      ]),
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
        Validators.pattern('^-?[0-9]\\d*(\\.\\d*)?$'),
      ]),
      gastos_de_administración: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      porcentaje_de_seguro_desgravamen: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d*)?$'),
      ]),
      porcentaje_de_seguro_riesgo: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d*)?$'),
      ]),
      //...del costo de oportunidad
      tasa_de_descuento: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d*)?$'),
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

      //-----------------------------Aleman-----------------------------//
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
      COKi: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //Tasa de descuento
      TIR: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //TIR de la operacion
      TCEA: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //TCEA de la operacion
      VAN: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //VAN operacion

      //-----------------------------Frances-----------------------------//
      //totales por
      InteresesFrances: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Amortización_del_capital_Frances: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Seguro_de_desgravamen_Frances: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Seguro_contra_todo_riesgo_Frances: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Comisiones_periodicas_Frances: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Portes_o_Gastos_de_adm_Frances: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      //de indicadores de Rentabilidad
      COKi_Frances: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //Tasa de descuento
      TIR_Frances: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //TIR de la operacion
      TCEA_Frances: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //TCEA de la operacion
      VAN_Frances: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //VAN operacion

      //-----------------------------Americano-----------------------------//
      //totales por
      Intereses_Americano: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Amortización_del_capital_Americano: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Seguro_de_desgravamenAmericano: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Seguro_contra_todo_riesgo_Americano: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Comisiones_periodicas_Americano: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      Portes_o_Gastos_de_adm_Americano: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]),
      //de indicadores de Rentabilidad
      COKi_Americano: new FormControl('0.00', [
        Validators.pattern('^[0-9]*$'),
      ]), //Tasa de descuento
      TIR_Americano: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //TIR de la operacion
      TCEA_Americano: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //TCEA de la operacion
      VAN_Americano: new FormControl('0.00', [Validators.pattern('^[0-9]*$')]), //VAN operacion
    });
  }

  ngOnInit(): void {}

  public Calcular() {
    return (this.buttonState = ButtonState.left);
  }
  public Llenar_y_Calcular() {
    return (this.buttonState = ButtonState.right);
  }
  public Reset() {
    this.dataGroup.reset();
  }

  Submit() {
    if (this.buttonState == ButtonState.left) {
      if (this.dataGroup.valid) {

        this.emptyData.TipoMoneda= this.dataGroup.value.tipo_de_moneda * 1;

        this.emptyData.PlazoDeGracia1 = this.dataGroup.value.plazo_de_Gracia1 * 1;

        this.emptyData.PlazoDeGracia2 = this.dataGroup.value.plazo_de_Gracia2 * 1;
        
        this.emptyData.UnidadDeTiempoPlazoDeGracia1 = this.dataGroup.value.unidad_de_tiempo_plazo_de_gracia1 ;
        
        this.emptyData.UnidadDeTiempoPlazoDeGracia2 = this.dataGroup.value.unidad_de_tiempo_plazo_de_gracia2 ;
        
        this.emptyData.TipoDeGracia1 = this.dataGroup.value.tipo_de_Gracia1 ;
        
        this.emptyData.TipoDeGracia2 = this.dataGroup.value.tipo_de_Gracia2 ;

        this.emptyData.PV = this.dataGroup.value.precio_de_venta_del_activo * 1 * this.emptyData.TipoMoneda;

        this.emptyData.pCI = this.dataGroup.value.porcentaje_de_cuota_inicial * 1;

        this.emptyData.NA = this.dataGroup.value.num_de_años * 1;

        this.emptyData.frec = this.dataGroup.value.frecuencia_de_pago * 1;

        this.emptyData.NDxA = this.dataGroup.value.num_dias_por_año * 1;

        this.emptyData.CostesNotariales = this.dataGroup.value.costes_notariales * 1 * this.emptyData.TipoMoneda;

        this.emptyData.CostesRegistrales = this.dataGroup.value.costes_registrales * 1 * this.emptyData.TipoMoneda;

        this.emptyData.Tasacion = this.dataGroup.value.tasacion * 1 * this.emptyData.TipoMoneda;

        this.emptyData.ComisionEstudio = this.dataGroup.value.comision_de_estudio * 1 * this.emptyData.TipoMoneda;

        this.emptyData.ComisionActivacion = this.dataGroup.value.comision_activación * 1 * this.emptyData.TipoMoneda;

        this.emptyData.ComPer = this.dataGroup.value.comision_periodica * 1 * this.emptyData.TipoMoneda;

        this.emptyData.PortesPer = this.dataGroup.value.portes * 1 * this.emptyData.TipoMoneda;

        this.emptyData.GasAdmPer = this.dataGroup.value.gastos_de_administración * 1 * this.emptyData.TipoMoneda;

        this.emptyData.pSegDes = this.dataGroup.value.porcentaje_de_seguro_desgravamen * 1;

        this.emptyData.pSegRie = this.dataGroup.value.porcentaje_de_seguro_riesgo * 1;

        this.emptyData.COK = this.dataGroup.value.tasa_de_descuento * 1;

        console.log(this.emptyData);
        this.btnCalcularDatos(this.emptyData);
      }
    }

    if (this.buttonState == ButtonState.right) {
      this.btnLLenar_y_Calcular();
    }
  }

  RefreshArrays() {
    this.leasingTableAleman = [];
    this.leasingTableFrances = [];
    this.leasingTableAmericano = [];

    this.leasingTableArr = [];
    this.leasingTableArrFrances = [];
    this.leasingTableArrAmericano = [];
  }

  btnCalcularDatos(emptyData: Datos) {
    this.RefreshArrays();

    this.solutionService.Solucion(
      emptyData,
      this.emptyResults,
      this.resultGroup
    );
    //----------------------------LeasingTable----------------------------//
    this.leasingTableService.leasingTableGenerateData(
      this.leasingTableAleman,
      this.indexTable,
      emptyData,
      this.emptyResults,
      LeasingState.Aleman
    );

    this.leasingTableService.leasingTableGenerateData(
      this.leasingTableFrances,
      this.indexTable,
      emptyData,
      this.emptyResults,
      LeasingState.Frances
    );

    this.leasingTableService.leasingTableGenerateData(
      this.leasingTableAmericano,
      this.indexTable,
      emptyData,
      this.emptyResults,
      LeasingState.Americano
    );

    //Resultados
    this.leasingTableArr = this.leasingTableAleman.map((value) => ({
      NC: value.NC,
      TEA: value.TEA,
      TEP: value.TEP,
      IA: value.IA,
      IP: value.IP,
      PG: value.PG,
      SI: value.SI,
      SII: value.SII,
      I: value.I,
      Cuota: value.Cuota,
      A: value.A,
      PP: value.PP,
      SegDes: value.SegDes,
      SegRie: value.SegRie,
      Comision: value.Comision,
      Portes: value.Portes,
      GasAdm: value.GasAdm,
      SF: value.SF,
      Flujo: value.Flujo,
    }));

    //Resultados
    this.leasingTableArrFrances = this.leasingTableFrances.map((value) => ({
      NC: value.NC,
      TEA: value.TEA,
      TEP: value.TEP,
      IA: value.IA,
      IP: value.IP,
      PG: value.PG,
      SI: value.SI,
      SII: value.SII,
      I: value.I,
      Cuota: value.Cuota,
      A: value.A,
      PP: value.PP,
      SegDes: value.SegDes,
      SegRie: value.SegRie,
      Comision: value.Comision,
      Portes: value.Portes,
      GasAdm: value.GasAdm,
      SF: value.SF,
      Flujo: value.Flujo,
    }));

    //Resultados
    this.leasingTableArrAmericano = this.leasingTableAmericano.map((value) => ({
      NC: value.NC,
      TEA: value.TEA,
      TEP: value.TEP,
      IA: value.IA,
      IP: value.IP,
      PG: value.PG,
      SI: value.SI,
      SII: value.SII,
      I: value.I,
      Cuota: value.Cuota,
      A: value.A,
      PP: value.PP,
      SegDes: value.SegDes,
      SegRie: value.SegRie,
      Comision: value.Comision,
      Portes: value.Portes,
      GasAdm: value.GasAdm,
      SF: value.SF,
      Flujo: value.Flujo,
    }));

    //-----------------------------Results-----------------------------
    this.resultsService.resultsGenerateData(
      this.emptyResults,
      emptyData,
      this.leasingTableArr,
      this.resultGroup,
      LeasingState.Aleman
    );
    this.resultsService.resultsGenerateData(
      this.emptyResults,
      emptyData,
      this.leasingTableArrFrances,
      this.resultGroup,
      LeasingState.Frances
    );
    this.resultsService.resultsGenerateData(
      this.emptyResults,
      emptyData,
      this.leasingTableArrAmericano,
      this.resultGroup,
      LeasingState.Americano
    );

    //...
    this.dataSourceAleman = new MatTableDataSource(this.leasingTableArr);
    //...
    this.dataSourceFrances = new MatTableDataSource(
      this.leasingTableArrFrances
    );
    //...
    this.dataSourceAmericano = new MatTableDataSource(
      this.leasingTableArrAmericano
    );
  }

  btnLLenar_y_Calcular() {
    this.RefreshArrays();
    //-----------------------------Implementando-----------------------------//
    this.utils.updateValue(
      this.dataGroup,
      'tipo_de_moneda',
      this.data.TipoMoneda
    );

    this.utils.updateValue(
      this.dataGroup,
      'plazo_de_Gracia1',
      this.data.PlazoDeGracia1
    );
    this.utils.updateValue(
      this.dataGroup,
      'plazo_de_Gracia2',
      this.data.PlazoDeGracia2
    );

    this.utils.updateValue(
      this.dataGroup,
      'unidad_de_tiempo_plazo_de_gracia1',
      this.data.UnidadDeTiempoPlazoDeGracia1
    );
    this.utils.updateValue(
      this.dataGroup,
      'unidad_de_tiempo_plazo_de_gracia2',
      this.data.UnidadDeTiempoPlazoDeGracia2
    );

    this.utils.updateValue(
      this.dataGroup,
      'tipo_de_Gracia1',
      this.data.TipoDeGracia1
    );
    this.utils.updateValue(
      this.dataGroup,
      'tipo_de_Gracia2',
      this.data.TipoDeGracia2
    );

    //----------------------------------------------------------//
    this.utils.updateValue(
      this.dataGroup,
      'precio_de_venta_del_activo',
      this.data.PV
    );
    this.utils.updateValue(
      this.dataGroup,
      'porcentaje_de_cuota_inicial',
      this.data.pCI
    );
    this.utils.updateValue(this.dataGroup, 'num_de_años', this.data.NA);
    this.utils.updateValue(
      this.dataGroup,
      'frecuencia_de_pago',
      this.data.frec
    );
    this.utils.updateValue(this.dataGroup, 'num_dias_por_año', this.data.NDxA);
    this.utils.updateValue(
      this.dataGroup,
      'costes_notariales',
      this.data.CostesNotariales
    );
    this.utils.updateValue(
      this.dataGroup,
      'costes_registrales',
      this.data.CostesRegistrales
    );
    this.utils.updateValue(this.dataGroup, 'tasacion', this.data.Tasacion);
    this.utils.updateValue(
      this.dataGroup,
      'comision_de_estudio',
      this.data.ComisionEstudio
    );
    this.utils.updateValue(
      this.dataGroup,
      'comision_activación',
      this.data.ComisionActivacion
    );
    this.utils.updateValue(
      this.dataGroup,
      'comision_periodica',
      this.data.ComPer
    );
    this.utils.updateValue(this.dataGroup, 'portes', this.data.PortesPer);
    this.utils.updateValue(
      this.dataGroup,
      'gastos_de_administración',
      this.data.GasAdmPer
    );
    this.utils.updateValue(
      this.dataGroup,
      'porcentaje_de_seguro_desgravamen',
      this.data.pSegDes 
    );
    this.utils.updateValue(
      this.dataGroup,
      'porcentaje_de_seguro_riesgo',
      this.data.pSegRie
    );
    this.utils.updateValue(this.dataGroup, 'tasa_de_descuento', this.data.COK);
    console.log(this.data);

    //----------------------------Solution----------------------------//

    this.solutionService.Solucion(this.data, this.results, this.resultGroup);

    //----------------------------LeasingTable----------------------------//
    this.leasingTableService.leasingTableGenerateData(
      this.leasingTableAleman,
      this.indexTable,
      this.data,
      this.results,
      LeasingState.Aleman
    );

    this.leasingTableService.leasingTableGenerateData(
      this.leasingTableFrances,
      this.indexTable,
      this.data,
      this.results,
      LeasingState.Frances
    );

    this.leasingTableService.leasingTableGenerateData(
      this.leasingTableAmericano,
      this.indexTable,
      this.data,
      this.results,
      LeasingState.Americano
    );

    //Resultados
    this.leasingTableArr = this.leasingTableAleman.map((value) => ({
      NC: value.NC,
      TEA: value.TEA,
      TEP: value.TEP,
      IA: value.IA,
      IP: value.IP,
      PG: value.PG,
      SI: value.SI,
      SII: value.SII,
      I: value.I,
      Cuota: value.Cuota,
      A: value.A,
      PP: value.PP,
      SegDes: value.SegDes,
      SegRie: value.SegRie,
      Comision: value.Comision,
      Portes: value.Portes,
      GasAdm: value.GasAdm,
      SF: value.SF,
      Flujo: value.Flujo,
    }));

    //Resultados
    this.leasingTableArrFrances = this.leasingTableFrances.map((value) => ({
      NC: value.NC,
      TEA: value.TEA,
      TEP: value.TEP,
      IA: value.IA,
      IP: value.IP,
      PG: value.PG,
      SI: value.SI,
      SII: value.SII,
      I: value.I,
      Cuota: value.Cuota,
      A: value.A,
      PP: value.PP,
      SegDes: value.SegDes,
      SegRie: value.SegRie,
      Comision: value.Comision,
      Portes: value.Portes,
      GasAdm: value.GasAdm,
      SF: value.SF,
      Flujo: value.Flujo,
    }));

    //Resultados
    this.leasingTableArrAmericano = this.leasingTableAmericano.map((value) => ({
      NC: value.NC,
      TEA: value.TEA,
      TEP: value.TEP,
      IA: value.IA,
      IP: value.IP,
      PG: value.PG,
      SI: value.SI,
      SII: value.SII,
      I: value.I,
      Cuota: value.Cuota,
      A: value.A,
      PP: value.PP,
      SegDes: value.SegDes,
      SegRie: value.SegRie,
      Comision: value.Comision,
      Portes: value.Portes,
      GasAdm: value.GasAdm,
      SF: value.SF,
      Flujo: value.Flujo,
    }));

    //-----------------------------Results-----------------------------
    this.resultsService.resultsGenerateData(
      this.results,
      this.data,
      this.leasingTableArr,
      this.resultGroup,
      LeasingState.Aleman
    );
    this.resultsService.resultsGenerateData(
      this.results,
      this.data,
      this.leasingTableArrFrances,
      this.resultGroup,
      LeasingState.Frances
    );
    this.resultsService.resultsGenerateData(
      this.results,
      this.data,
      this.leasingTableArrAmericano,
      this.resultGroup,
      LeasingState.Americano
    );

    //...
    this.dataSourceAleman = new MatTableDataSource(this.leasingTableArr);
    //...
    this.dataSourceFrances = new MatTableDataSource(
      this.leasingTableArrFrances
    );
    //...
    this.dataSourceAmericano = new MatTableDataSource(
      this.leasingTableArrAmericano
    );
  }
}
