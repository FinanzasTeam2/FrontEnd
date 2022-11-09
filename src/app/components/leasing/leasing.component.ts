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
}
