import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordShow: boolean = false;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitButton() {
    if (this.loginForm.valid) {
      this.api
        .getUserByEmailAndPassword(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .subscribe(
          (data: any) => {
            localStorage.setItem('addUsuario', JSON.stringify(data));
            this.loginForm.reset();
            alert('Bienvenido');
            this.router.navigate(['/home']);
          },
          (error: any) => {
            alert('User or password incorrect');
          }
        );
    }
  }
}
