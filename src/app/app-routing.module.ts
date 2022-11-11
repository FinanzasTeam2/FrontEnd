import { NotFoundComponent } from './components/not-found/not-found.component';
<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LeasingComponent } from './components/leasing/leasing.component';
=======
import { RegistrationComponent } from './components/registration/registration.component';
import { LeasingComponent } from './components/leasing/leasing.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

>>>>>>> 2f6a7ab0fd4a635bad260e44eb74c0159e1906de
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'leasing', component: LeasingComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
