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
  constructor(private eq: ResultsEquationsService, private u: UtilsService) {}

  resultsGenerateData(
    results: Resultados,
    data: Datos,
    leasingTableArr: any[],
    resultGroup: FormGroup,
    leasingState: LeasingState
  ) {
    //Resultados Intereses
    results.Intereses = this.eq.Intereses({
      I: leasingTableArr.map((obj) => obj.I),
    });

    //Resultados Amortización_del_capital
    results.Amortización_del_capital = this.eq.Amortización_del_capital({
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
      COK: data.COK,
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

      this.u.updateValue(resultGroup, 'Intereses', this.u.roundValueWithNumDecimals(results.Intereses,2)  );  
      this.u.updateValue(resultGroup, 'Amortización_del_capital', this.u.roundValueWithNumDecimals(results.Amortización_del_capital,2));
      this.u.updateValue(resultGroup, 'Seguro_de_desgravamen', this.u.roundValueWithNumDecimals(results.Seguro_de_desgravamen,2));
      this.u.updateValue(resultGroup, 'Seguro_contra_todo_riesgo', this.u.roundValueWithNumDecimals(results.Seguro_contra_todo_riesgo,2));
      this.u.updateValue(resultGroup, 'Comisiones_periodicas', this.u.roundValueWithNumDecimals(results.Comisiones_periodicas,2));
      this.u.updateValue(resultGroup, 'Portes_o_Gastos_de_adm', this.u.roundValueWithNumDecimals(results.Portes_o_Gastos_de_adm,2));
      this.u.updateValue(resultGroup, 'COKi', this.u.roundValueWithNumDecimals(results.COKi * 100,5));
      this.u.updateValue(resultGroup, 'TIR', this.u.roundValueWithNumDecimals(TIR_Resultados * 100,5));
      this.u.updateValue(resultGroup, 'TCEA', this.u.roundValueWithNumDecimals(results.TCEA * 100,5));
      this.u.updateValue(resultGroup, 'VAN', this.u.roundValueWithNumDecimals(results.VAN,2));

    } else if (leasingState == LeasingState.Frances) {

      this.u.updateValue(resultGroup, 'InteresesFrances', this.u.roundValueWithNumDecimals(results.Intereses,2));
      this.u.updateValue(resultGroup, 'Amortización_del_capital_Frances', this.u.roundValueWithNumDecimals(results.Amortización_del_capital,2));
      this.u.updateValue(resultGroup, 'Seguro_de_desgravamen_Frances', this.u.roundValueWithNumDecimals(results.Seguro_de_desgravamen,2));
      this.u.updateValue(resultGroup, 'Seguro_contra_todo_riesgo_Frances', this.u.roundValueWithNumDecimals(results.Seguro_contra_todo_riesgo,2));
      this.u.updateValue(resultGroup, 'Comisiones_periodicas_Frances', this.u.roundValueWithNumDecimals(results.Comisiones_periodicas,2));
      this.u.updateValue(resultGroup, 'Portes_o_Gastos_de_adm_Frances', this.u.roundValueWithNumDecimals(results.Portes_o_Gastos_de_adm,2));
      this.u.updateValue(resultGroup, 'COKi_Frances', this.u.roundValueWithNumDecimals(results.COKi * 100,5));
      this.u.updateValue(resultGroup, 'TIR_Frances', this.u.roundValueWithNumDecimals(TIR_Resultados * 100,5));
      this.u.updateValue(resultGroup, 'TCEA_Frances', this.u.roundValueWithNumDecimals(results.TCEA * 100,5));
      this.u.updateValue(resultGroup, 'VAN_Frances', this.u.roundValueWithNumDecimals(results.VAN,2));

    } else if (leasingState == LeasingState.Americano) {
      this.u.updateValue(resultGroup, 'Intereses_Americano', this.u.roundValueWithNumDecimals(results.Intereses,2));
      this.u.updateValue(resultGroup, 'Amortización_del_capital_Americano', this.u.roundValueWithNumDecimals(results.Amortización_del_capital,2));
      this.u.updateValue(resultGroup, 'Seguro_de_desgravamenAmericano', this.u.roundValueWithNumDecimals(results.Seguro_de_desgravamen,2));
      this.u.updateValue(resultGroup, 'Seguro_contra_todo_riesgo_Americano', this.u.roundValueWithNumDecimals(results.Seguro_contra_todo_riesgo,2));
      this.u.updateValue(resultGroup, 'Comisiones_periodicas_Americano', this.u.roundValueWithNumDecimals(results.Comisiones_periodicas,2));
      this.u.updateValue(resultGroup, 'Portes_o_Gastos_de_adm_Americano', this.u.roundValueWithNumDecimals(results.Portes_o_Gastos_de_adm,2));
      this.u.updateValue(resultGroup, 'COKi_Americano', this.u.roundValueWithNumDecimals(results.COKi * 100,5));
      this.u.updateValue(resultGroup, 'TIR_Americano', this.u.roundValueWithNumDecimals(TIR_Resultados * 100,5));
      this.u.updateValue(resultGroup, 'TCEA_Americano', this.u.roundValueWithNumDecimals(results.TCEA * 100,5));
      this.u.updateValue(resultGroup, 'VAN_Americano', this.u.roundValueWithNumDecimals(results.VAN,2));
    }
  }
}
