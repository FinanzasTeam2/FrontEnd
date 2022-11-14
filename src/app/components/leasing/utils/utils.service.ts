import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  updateValue(formGroup: FormGroup, parameter: string, data: number) {
    formGroup.patchValue({ [parameter]: data.toString() });
  }
}
