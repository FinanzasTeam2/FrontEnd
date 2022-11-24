import { FormGroup } from '@angular/forms';
import { ResultsEquationsService } from './../results/results-equations.service';
import { Resultados } from './../../../model/resultados.service';
import { Datos } from './../../../model/datos.service';

import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class SolutionService {
  constructor(
    private u: UtilsService,
    private resultsEquationsService: ResultsEquationsService
  ) {}

  //--------------------Solucion------------------------//
  Solucion(data: Datos, results: Resultados, resultGroup: FormGroup) {

    //----------------------------Resultados----------------------------//
    //-----------------------del financiemiento-----------------------
    results.Saldo = this.resultsEquationsService.Saldo(data.PV, data.pCI/100);
    this.u.updateValue(resultGroup, 'Saldo', this.u.roundValueWithNumDecimals(results.Saldo,2));

    var costes_gastos_iniciales = [
      data.CostesNotariales,
      data.CostesRegistrales,
      data.Tasacion,
      data.ComisionEstudio,
      data.ComisionActivacion,
    ];
    results.Prestamo = this.resultsEquationsService.Prestamo(
      results.Saldo,
      costes_gastos_iniciales
    );
    this.u.updateValue(resultGroup, 'Prestamo', this.u.roundValueWithNumDecimals(results.Prestamo,2));

    results.NCxA = this.resultsEquationsService.NCxA(data.NDxA, data.frec);
    this.u.updateValue(resultGroup, 'NCxA', results.NCxA);

    results.N = this.resultsEquationsService.N(results.NCxA, data.NA);
    this.u.updateValue(resultGroup, 'N', results.N);

    //-----------------------Costes / Gastos periodicos-----------------------
    results.pSegDesPer = this.resultsEquationsService.pSegDesPer(
      data.pSegDes/100,
      data.frec
    );
    this.u.updateValue(resultGroup, 'pSegDesPer', results.pSegDesPer * 100);

    results.SegRiePer = this.resultsEquationsService.SegRiePer(
      data.pSegRie/100,
      data.PV,
      results.NCxA
    );

    this.u.updateValue(resultGroup, 'SegRiePer', this.u.roundValueWithNumDecimals(results.SegRiePer,2));
  }
}
