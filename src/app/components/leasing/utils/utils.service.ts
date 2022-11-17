import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  updateValue(formGroup: FormGroup, parameter: string, data: any) {
    formGroup.patchValue({ [parameter]: data.toString() });
  }

  roundValueWithNumDecimals(value:number, numDecimals:number) {
    return Number(Math.round(( value+Number.EPSILON)*100000)/100000).toFixed(numDecimals);  
  }
}
