import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeasingTableEquationsService {
  constructor() {}

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

  //---------------------------------------Frances---------------------------------------//
  //--------------------Cuota (inc Seg Des) --------------------
  CuotaFrances({
    NC,
    N,
    PG,
    I,
    TEP,
    pSegDesPer,
    SII,
  }: {
    NC: number;
    N: number;
    PG: string;
    I: number;
    TEP: number;
    pSegDesPer: number;
    SII: number;
  }) {
    if (NC <= N) {
      if (PG == 'T') {
        return 0;
      } else {
        if (PG == 'P') {
          return I;
        } else {
          return this.PMT(TEP + pSegDesPer, N - NC + 1, SII);
        }
      }
    } else {
      return 0;
    }
  }

  PMT(rate: number, nper: number, pv: number) {
    //if (rate == 0) return -pv / nper;

    var pvif = Math.pow(1 + rate, nper);
    var pmt = (rate / (pvif - 1)) * -(pv * pvif);

    return pmt;
  }

  //--------------------Amortizacion--------------------
  AFrances({
    NC,
    N,
    PG,
    Cuota,
    I,
    SegDes,
  }: {
    NC: number;
    N: number;
    PG: string;
    Cuota: number;
    I: number;
    SegDes: number;
  }) {
    if (NC <= N) {
      if (PG == 'T' || PG == 'P') {
        return 0;
      } else {
        return Cuota - I - SegDes;
      }
    } else {
      return 0;
    }
  }

  //------------------------------------------------------------------------------//

  //---------------------------------------Aleman---------------------------------------//
  //--------------------Cuota (inc Seg Des) --------------------
  CuotaAleman({
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
        if (PG == 'P') {
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
  AAleman({
    NC,
    N,
    PG,
    SII,
  }: {
    NC: number;
    N: number;
    PG: string;
    SII: number;
  }) {
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
  //---------------------------------------Americano---------------------------------------//
  AAmericano({
    NC,
    N,
    PG,
    SII,
  }: {
    NC: number;
    N: number;
    PG: string;
    SII: number;
  }) {
    if (NC == N) {
      if (PG == 'T' || PG == 'P') {
        return 0;
      } else {
        return -SII;
      }
    } else {
      return 0;
    }
  }

  //------------------------------------------------------------------------------//

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
