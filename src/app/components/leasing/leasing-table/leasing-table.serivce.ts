import { UtilsService } from './../utils/utils.service';
import { LeasingState } from './../leasing.component';
import { LeasingTableEquationsService } from './leasing-table-equations.service';
import { Injectable } from '@angular/core';
import { LeasingData } from 'src/app/model/leasing-table.service';
import { Resultados } from 'src/app/model/resultados.service';
import { Datos } from 'src/app/model/datos.service';

@Injectable({
  providedIn: 'root',
})
export class LeasingTableService {
  constructor(private eq: LeasingTableEquationsService,private u:UtilsService) {
    u={}as UtilsService;
  }

  leasingTableGenerateData(
    leasingTable: LeasingData[],
    indexTable: number,
    data: Datos,
    results: Resultados,
    leasingState: LeasingState
  ) {
    //Leasing

    //--------------------NC - TEA --------------------
    //5años -> 5*12 = 60
    for (let i = 0; i <= data.Duracion_Tasa_Efectiva1*12 ; i++) {
      leasingTable.push(
        CreateLeasingData({ _NC: indexTable++, _TEA: data.Porcentaje_tasa_efectiva1/100})
      );
    }

    //10años -> 10*10 =120
    for (let i = 0; i < data.NA *12 - data.Duracion_Tasa_Efectiva1*12; i++) {
      leasingTable.push(
        CreateLeasingData({ _NC: indexTable++, _TEA: data.Porcentaje_tasa_efectiva2 / 100 })
      );
    }

    //10años -> 10*10 =120
    /*
    for (let i = 0; i < 120; i++) {
      leasingTable.push(
        CreateLeasingData({ _NC: indexTable++, _TEA: 0 / 100 })
      );
    }
*/
    //--------------------TEP --------------------
    for (let i = 1; i <= data.NA * 12; i++) {
      leasingTable[i].TEP = this.eq.TEP({
        NC: i,
        N: results.N,
        TEA: leasingTable[i].TEA,
        frec: data.frec,
        NDxA: data.NDxA,
      });
    }

    //--------------------IA --------------------
    //tiene 0

    //--------------------IP --------------------
    //tiene 0 -> PERO HAY Q IMPLEMENTAR LA FORMULA XD

    //--------------------P.G. --------------------
    //5años -> 5*12 = 60
    for (let i = 1; i <= data.PlazoDeGracia1; i++) {
      leasingTable[i].PG = data.TipoDeGracia1;
    }

    //10años -> 10*10 =120
    for (let i = data.PlazoDeGracia1 + 1; i <= data.PlazoDeGracia1 + data.PlazoDeGracia2; i++) {
      leasingTable[i].PG = data.TipoDeGracia2;
    }

    //10años -> 10*10 =120
    for (let i = data.PlazoDeGracia1 + data.PlazoDeGracia2 + 1; i <= data.NA*12; i++) {
      leasingTable[i].PG = 'S';
    }

    //Flujo valor inicial
    leasingTable[0].Flujo = results.Prestamo;

    //--------------------Saldo Inicial --------------------
    for (let i = 1; i <= data.NA * 12; i++) {
      leasingTable[i].SI = this.eq.SI({
        NC: leasingTable[i].NC,
        Prestamo: results.Prestamo,
        N: results.N,
        SaldoFinal: leasingTable[i - 1].SF,
      });

      //--------------------Saldo Inicial Indexado --------------------
      leasingTable[i].SII = this.eq.SII({
        SI: leasingTable[i].SI,
        IP: leasingTable[i].IP,
      });

      //--------------------Interes --------------------
      leasingTable[i].I = this.eq.I({
        SII: leasingTable[i].SII,
        TEP: leasingTable[i].TEP,
      });

      //--------------------Seguro Desgravamen --------------------
      leasingTable[i].SegDes = this.eq.SegDes({
        SII: leasingTable[i].SII,
        pSegDesPer: results.pSegDesPer,
      });

      //-------------------------------------------------ALEMAN-------------------------------------------------//
      if (leasingState == LeasingState.Aleman) {
        //--------------------Amortizacion--------------------
        leasingTable[i].A = this.eq.AAleman({
          NC: leasingTable[i].NC,
          N: results.N,
          PG: leasingTable[i].PG,
          SII: leasingTable[i].SII,
        });

        //--------------------Cuota (inc Seg Des) --------------------
        leasingTable[i].Cuota = this.eq.CuotaAleman({
          NC: leasingTable[i].NC,
          N: results.N,
          PG: leasingTable[i].PG,
          I: leasingTable[i].I,
          A: leasingTable[i].A,
          SegDes: leasingTable[i].SegDes,
        });

        //-------------------------------------------------Frances-------------------------------------------------//
      } else if (leasingState == LeasingState.Frances) {
        //--------------------Amortizacion--------------------
        leasingTable[i].Cuota = this.eq.CuotaFrances({
          NC: leasingTable[i].NC,
          N: results.N,
          PG: leasingTable[i].PG,
          I: leasingTable[i].I,
          TEP: leasingTable[i].TEP,
          pSegDesPer: results.pSegDesPer,
          SII: leasingTable[i].SII,
        });

        //--------------------Cuota (inc Seg Des) --------------------
        leasingTable[i].A = this.eq.AFrances({
          NC: leasingTable[i].NC,
          N: results.N,
          PG: leasingTable[i].PG,
          Cuota: leasingTable[i].Cuota,
          I: leasingTable[i].I,
          SegDes: leasingTable[i].SegDes,
        });

        //-------------------------------------------------Americano-------------------------------------------------//
      } else if (leasingState == LeasingState.Americano) {
        //--------------------Amortizacion--------------------
        leasingTable[i].A = this.eq.AAmericano({
          NC: leasingTable[i].NC,
          N: results.N,
          PG: leasingTable[i].PG,
          SII: leasingTable[i].SII,
        });

        //--------------------Cuota (inc Seg Des) --------------------
        leasingTable[i].Cuota = this.eq.CuotaAleman({
          NC: leasingTable[i].NC,
          N: results.N,
          PG: leasingTable[i].PG,
          I: leasingTable[i].I,
          A: leasingTable[i].A,
          SegDes: leasingTable[i].SegDes,
        });
      }
      //Prepago no hay

      //--------------------Seguro riesgo--------------------
      leasingTable[i].SegRie = this.eq.SegRie({
        NC: leasingTable[i].NC,
        N: results.N,
        SegRiePer: results.SegRiePer,
      });

      //--------------------Comision --------------------
      leasingTable[i].Comision = this.eq.Comision({
        NC: leasingTable[i].NC,
        N: results.N,
        ComPer: data.ComPer,
      });

      //--------------------Portes --------------------
      leasingTable[i].Portes = this.eq.Portes({
        NC: leasingTable[i].NC,
        N: results.N,
        PortesPer: data.PortesPer,
      });

      //--------------------Gastos Adm. --------------------
      leasingTable[i].GasAdm = this.eq.GasAdm({
        NC: leasingTable[i].NC,
        N: results.N,
        GasAdmPer: data.GasAdmPer,
      });

      //--------------------Saldo Final --------------------
      leasingTable[i].SF = this.eq.SF({
        PG: leasingTable[i].PG,
        SII: leasingTable[i].SII,
        I: leasingTable[i].I,
        A: leasingTable[i].A,
        PP: leasingTable[i].PP,
      });

      //--------------------Flujo --------------------
      leasingTable[i].Flujo = this.eq.Flujo({
        Cuota: leasingTable[i].Cuota,
        PP: leasingTable[i].PP,
        SegRie: leasingTable[i].SegRie,
        Comision: leasingTable[i].Comision,
        Portes: leasingTable[i].Portes,
        GasAdm: leasingTable[i].GasAdm,
        PG: leasingTable[i].PG,
        SegDes: leasingTable[i].SegDes,
      });
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
  _Comision = 0,
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
  _Comision?: number;
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
    Comision: _Comision,
    Portes: _Portes,
    GasAdm: _GasAdm,
    SF: _SF,
    Flujo: _Flujo,
  };

  return data;
}
