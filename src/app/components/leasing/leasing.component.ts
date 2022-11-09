import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.css'],
})
export class LeasingComponent implements OnInit {
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
      frecuencia_de_pago: new FormControl('', [Validators.required]),
      num_dias_por_año: new FormControl('', [Validators.required]),
      //...de los costes/gatos iniciales
      costes_notariales: new FormControl('', [Validators.required]),
      costes_registrales: new FormControl('', [Validators.required]),
      tasacion: new FormControl('', [Validators.required]),
      comision_de_estudio: new FormControl('', [Validators.required]),
      comision_activación: new FormControl('', [Validators.required]),
      //...de los costes/gastos periodicos
      comision_periodica: new FormControl('', [Validators.required]),
      portes: new FormControl('', [Validators.required]),
      gastos_de_administración: new FormControl('', [Validators.required]),
      porcentaje_de_seguro_desgravamen: new FormControl('', [
        Validators.required,
      ]),
      porcentaje_de_seguro_riesgo: new FormControl('', [Validators.required]),
      //...del costo de oportunidad
      tasa_de_descuento: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
}
