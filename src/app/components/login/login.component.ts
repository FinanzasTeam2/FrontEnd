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
  passwordType: string = 'password';
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
        .subscribe({
          next: (res) => {
            
            this.loginForm.reset();
            alert('Bienvenido ' + res.nombre);
            this.router.navigate(['/leasing',res.resource.id]);
          },
          error: (err) => {
            console.log(err);
            this.loginForm.reset();
            alert('User or password incorrect');
          },
        });
    }else{
      alert('Please fill the form');
    }
  }

  public togglePassword(): void {
    if (this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = 'password';
    } else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }
}
