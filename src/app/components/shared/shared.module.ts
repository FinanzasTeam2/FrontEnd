import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule} from '@angular/material/input';
import { MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatToolbarModule
  ],
  exports: [
    MatInputModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
