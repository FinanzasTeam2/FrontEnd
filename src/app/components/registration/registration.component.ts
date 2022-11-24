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
  userRegister: UserProfile;
  registerForm!: FormGroup;

  @ViewChild('user', { static: false })
  userRegisterForm!: NgForm;

  actionBtn: string = 'Register';

  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    this.userRegister = {} as UserProfile;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {}

  registerButton() {
    if (this.registerForm.valid) {
      this.registerUser(this.userRegister);
    } else {
      console.log('Invalid data');
    }
  }

  registerUser(value: UserProfile) {
    this.api.postUser(value).subscribe({
      next: (res) => {
        alert('User added successfully');
        this.registerForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
