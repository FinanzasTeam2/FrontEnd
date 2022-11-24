import { Router } from '@angular/router';
import { UserProfile } from './../../model/user-profile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;

  @ViewChild('user', { static: false })
  userRegisterForm!: NgForm;

  actionBtn: string = 'Register';

  constructor(private api: ApiService, private formBuilder: FormBuilder,private router:Router) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required,Validators.email]],
      contrasenia: ['', Validators.required],
    });
  }


  registerButton(user:UserProfile) {
    if (this.registerForm.valid) {
      console.log(user);
      this.registerUser(user);
    } else {
      console.log('Invalid data');
    }
  }

  registerUser(user: UserProfile) {
    this.api.postUser(user).subscribe({
      next: (res) => {
        alert('User added successfully');
        this.router.navigate(['/login']);
        this.registerForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  home(){
    this.router.navigate(['/login'])
  }
}
