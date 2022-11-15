import { FormGroup } from '@angular/forms';
import { ResultsEquationsService } from './../results/results-equations.service';
import { UtilsService } from './../utils/utils.service';
import { Resultados } from './../../../model/resultados.service';
import { Datos } from './../../../model/datos.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SolutionService {
  constructor(
    private utils: UtilsService,
    private resultsEquationsService: ResultsEquationsService
  ) {}

  //--------------------Solucion------------------------//
  Solucion(data: Datos, results: Resultados, resultGroup: FormGroup) {
    //----------------------------Resultados----------------------------//
    //-----------------------del financiemiento-----------------------
    results.Saldo = this.resultsEquationsService.Saldo(data.PV, data.pCI);
    this.utils.updateValue(resultGroup, 'Saldo', results.Saldo);

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
    this.utils.updateValue(resultGroup, 'Prestamo', results.Prestamo);

    results.NCxA = this.resultsEquationsService.NCxA(data.NDxA, data.frec);
    this.utils.updateValue(resultGroup, 'NCxA', results.NCxA);

    results.N = this.resultsEquationsService.N(results.NCxA, data.NA);
    this.utils.updateValue(resultGroup, 'N', results.N);

    //-----------------------Costes / Gastos periodicos-----------------------
    results.pSegDesPer = this.resultsEquationsService.pSegDesPer(
      data.pSegDes,
      data.frec
    );
    this.utils.updateValue(resultGroup, 'pSegDesPer', results.pSegDesPer);

    results.SegRiePer = this.resultsEquationsService.SegRiePer(
      data.pSegRie,
      data.PV,
      results.NCxA
    );

    this.utils.updateValue(resultGroup, 'SegRiePer', results.SegRiePer);

    console.log(results);
  }
}
