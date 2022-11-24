import { Leasing_Data } from './../../../model/api/leasing_data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { LeasingState } from './../leasing.component';
import { LeasingData } from './../../../model/leasing-table.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { Datos } from './../../../model/datos.service';
import { Injectable } from '@angular/core';
import { Resultados } from 'src/app/model/resultados.service';
import { ResultsEquationsService } from './results-equations.service';
import { UtilsService } from '../utils/utils.service';


@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  constructor(
    private eq: ResultsEquationsService,
    private u: UtilsService,
    private api: ApiService,
    private activeRouter: ActivatedRoute
  ) {
    
  }

  resultsGenerateData(
    results: Resultados,
    data: Datos,
    leasingTableArr: any[],
    resultGroup: FormGroup,
    leasingState: LeasingState,
    id:number, 
    leasingData: Leasing_Data
  ) {
    //Resultados Intereses
    results.Intereses = this.eq.Intereses({
      I: leasingTableArr.map((obj) => obj.I),
    });

    //Resultados Amortización_del_capital
    results.Amortizacion_del_capital = this.eq.Amortización_del_capital({
      A: leasingTableArr.map((obj) => obj.A),
      PP: leasingTableArr.map((obj) => obj.PP),
    });

    //Resultados Seguro_de_desgravamen
    results.Seguro_de_desgravamen = this.eq.Seguro_de_desgravamen({
      SegDes: leasingTableArr.map((obj) => obj.SegDes),
    });

    //Resultados Seguro_contra_todo_riesgo
    results.Seguro_contra_todo_riesgo = this.eq.Seguro_contra_todo_riesgo({
      SegRie: leasingTableArr.map((obj) => obj.SegRie),
    });

    //Resultados Comisiones_periodicas
    results.Comisiones_periodicas = this.eq.Comisiones_periodicas({
      Comision: leasingTableArr.map((obj) => obj.Comision),
    });

    //Resultados Portes_o_Gastos_de_adm
    results.Portes_o_Gastos_de_adm = this.eq.Portes_o_Gastos_de_adm({
      Portes: leasingTableArr.map((obj) => obj.Portes),
      GasAdm: leasingTableArr.map((obj) => obj.GasAdm),
    });

    //Indicadores de rentabilidad
    //Tasa de decuento
    results.COKi = this.eq.COKi({
      COK: data.COK / 100,
      frec: data.frec,
      NDxA: data.NDxA,
    });

    //TIR de la operacion
    results.TIR = this.eq.TIR_Operacion(
      leasingTableArr.map((obj) => obj.Flujo)
    );

    var TIR_Resultados = this.eq.TIR_Resultados(
      leasingTableArr.map((obj) => obj.Flujo)
    );

    //TCEA de la operacion
    results.TCEA = this.eq.TCEA(TIR_Resultados, results.NCxA);

    //VAN operacion
    results.VAN = this.eq.VAN(
      results.COKi,
      leasingTableArr.map((obj) => obj.Flujo)
    );

    //------------------------------------Leasing-Results-------------------------------------

    if (leasingState == LeasingState.Aleman) {
      this.u.updateValue(
        resultGroup,
        'Intereses',
        this.u.roundValueWithNumDecimals(results.Intereses, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Amortización_del_capital',
        this.u.roundValueWithNumDecimals(results.Amortizacion_del_capital, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Seguro_de_desgravamen',
        this.u.roundValueWithNumDecimals(results.Seguro_de_desgravamen, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Seguro_contra_todo_riesgo',
        this.u.roundValueWithNumDecimals(results.Seguro_contra_todo_riesgo, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Comisiones_periodicas',
        this.u.roundValueWithNumDecimals(results.Comisiones_periodicas, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Portes_o_Gastos_de_adm',
        this.u.roundValueWithNumDecimals(results.Portes_o_Gastos_de_adm, 2)
      );
      this.u.updateValue(
        resultGroup,
        'COKi',
        this.u.roundValueWithNumDecimals(results.COKi * 100, 5)
      );
      this.u.updateValue(
        resultGroup,
        'TIR',
        this.u.roundValueWithNumDecimals(TIR_Resultados * 100, 5)
      );
      this.u.updateValue(
        resultGroup,
        'TCEA',
        this.u.roundValueWithNumDecimals(results.TCEA * 100, 5)
      );
      this.u.updateValue(
        resultGroup,
        'VAN',
        this.u.roundValueWithNumDecimals(results.VAN, 2)
      );


      //console.log(leasingData,"Datos enviados");

      this.api.postLeasingData(this.dataAssignment(leasingData,data,id)).subscribe({
        next:(res)=>{

          alert('LeasingData added succesfully');
          this.api.postLeasingResult(results,1,res.id).subscribe(
            {
             next:(res)=>{ alert('Leasing result added succesfully');},
             error:(err)=>{ alert('Error Leasing Result')}
            }
          )
        },
        error:(erro)=>{
          console.log(erro);
        }
    });




    } else if (leasingState == LeasingState.Frances) {
      this.u.updateValue(
        resultGroup,
        'InteresesFrances',
        this.u.roundValueWithNumDecimals(results.Intereses, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Amortización_del_capital_Frances',
        this.u.roundValueWithNumDecimals(results.Amortizacion_del_capital, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Seguro_de_desgravamen_Frances',
        this.u.roundValueWithNumDecimals(results.Seguro_de_desgravamen, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Seguro_contra_todo_riesgo_Frances',
        this.u.roundValueWithNumDecimals(results.Seguro_contra_todo_riesgo, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Comisiones_periodicas_Frances',
        this.u.roundValueWithNumDecimals(results.Comisiones_periodicas, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Portes_o_Gastos_de_adm_Frances',
        this.u.roundValueWithNumDecimals(results.Portes_o_Gastos_de_adm, 2)
      );
      this.u.updateValue(
        resultGroup,
        'COKi_Frances',
        this.u.roundValueWithNumDecimals(results.COKi * 100, 5)
      );
      this.u.updateValue(
        resultGroup,
        'TIR_Frances',
        this.u.roundValueWithNumDecimals(TIR_Resultados * 100, 5)
      );
      this.u.updateValue(
        resultGroup,
        'TCEA_Frances',
        this.u.roundValueWithNumDecimals(results.TCEA * 100, 5)
      );
      this.u.updateValue(
        resultGroup,
        'VAN_Frances',
        this.u.roundValueWithNumDecimals(results.VAN, 2)
      );

     console.log(this.dataAssignment(leasingData,data,id), "datos enviados")


      this.api.postLeasingData(this.dataAssignment(leasingData,data,id)).subscribe({
        next:(res)=>{

          //this.data(leasingData,data,id);

          alert('LeasingData added succesfully');
          this.api.postLeasingResult(results,2,res.id).subscribe(
            {
             next:(res)=>{ alert('Leasing result added succesfully');},
             error:(err)=>{ alert('Error Leasing Result')}
            }
          )
        },
        error:(erro)=>{
          console.log(erro);
        }
    });


    
    } else if (leasingState == LeasingState.Americano) {
      this.u.updateValue(
        resultGroup,
        'Intereses_Americano',
        this.u.roundValueWithNumDecimals(results.Intereses, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Amortización_del_capital_Americano',
        this.u.roundValueWithNumDecimals(results.Amortizacion_del_capital, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Seguro_de_desgravamenAmericano',
        this.u.roundValueWithNumDecimals(results.Seguro_de_desgravamen, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Seguro_contra_todo_riesgo_Americano',
        this.u.roundValueWithNumDecimals(results.Seguro_contra_todo_riesgo, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Comisiones_periodicas_Americano',
        this.u.roundValueWithNumDecimals(results.Comisiones_periodicas, 2)
      );
      this.u.updateValue(
        resultGroup,
        'Portes_o_Gastos_de_adm_Americano',
        this.u.roundValueWithNumDecimals(results.Portes_o_Gastos_de_adm, 2)
      );
      this.u.updateValue(
        resultGroup,
        'COKi_Americano',
        this.u.roundValueWithNumDecimals(results.COKi * 100, 5)
      );
      this.u.updateValue(
        resultGroup,
        'TIR_Americano',
        this.u.roundValueWithNumDecimals(TIR_Resultados * 100, 5)
      );
      this.u.updateValue(
        resultGroup,
        'TCEA_Americano',
        this.u.roundValueWithNumDecimals(results.TCEA * 100, 5)
      );
      this.u.updateValue(
        resultGroup,
        'VAN_Americano',
        this.u.roundValueWithNumDecimals(results.VAN, 2)
      );

      this.api.postLeasingData(this.dataAssignment(leasingData,data,id)).subscribe({
        next:(res)=>{

          //this.data(leasingData,data,id);

          alert('LeasingData added succesfully');
          this.api.postLeasingResult(results,3,res.id).subscribe(
            {
             next:(res)=>{ alert('Leasing result added succesfully');},
             error:(err)=>{ alert('Error Leasing Result')}
            }
          )
        },
        error:(erro)=>{
          console.log(erro);
        }
    });
    }
  }

  dataAssignment(leasingData:Leasing_Data,data:Datos,userId:any){

    leasingData = {
      porcentaje_Primera_Tasa_Efectiva: data.Porcentaje_tasa_efectiva1,
      duracion_Primera_Tasa_Efectiva: data.Duracion_Tasa_Efectiva1,
      porcentaje_Segunda_Tasa_Efectiva: data.Porcentaje_tasa_efectiva2,
      precio_de_Venta_del_Activo: data.PV,
      porcentaje_Cuota_Inicial: data.pCI,
      numero_de_Anios_a_Pagar: data.NA,
      frecuencia_de_Pago_en_Dias: data.frec,
      numero_de_Dias_por_Anio: data.NDxA,
      primer_Plazo_de_Gracia_Meses: data.PlazoDeGracia1,
      primer_Tipo_de_Gracia: data.TipoDeGracia1,
      segundo_Plazo_de_Gracia_Meses: data.PlazoDeGracia2,
      segundo_Tipo_de_Gracia: data.TipoDeGracia2,
      costes_Notariales: data.CostesNotariales,
      costes_Registrales: data.CostesRegistrales,
      tasacion: data.Tasacion,
      comision_de_Estudio: data.ComisionEstudio,
      comision_de_Activacion: data.ComisionActivacion,
      comision_Periodica: data.ComPer,
      portes: data.PortesPer,
      gastos_de_Administracion: data.GasAdmPer,
      porcentaje_de_Seguro_de_Desgravamen: data.pSegDes,
      porcentaje_de_Seguro_de_Riesgo: data.pSegRie,
      costo_de_Oportunidad: data.COK,
      currencyTypeId: 0,
      userId: userId*1,
    };

    /* SolesId = 1; DollarId = 2; Euro = 3 */
    if (data.TipoMoneda == 1) {
      leasingData.currencyTypeId = 1;
    } else if (data.TipoMoneda == 3.83) {
      leasingData.currencyTypeId = 2;
    } else if (data.TipoMoneda == 3.98) {
      leasingData.currencyTypeId = 3;
    }

    return leasingData;
  }

}


