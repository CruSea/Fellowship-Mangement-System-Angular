import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { LoginInterface } from './login.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
// import { AuthService } from '../auth.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { LoginResponseInterface } from '../services/authentication/authentication.interface';
import { Router } from '@angular/router';
// import { AuthenticationService } from '../services/authentication/authentication.service';
// import { LoginResponseInterface } from '../services/authentication/authentication.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  loading: boolean;
  hide = true;
    // public loading = false;

  constructor(
      private router: Router,
      private httpClient: HttpClient,
      private authenticationService: AuthenticationService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  login(loginInterface: LoginInterface) {
      this.loading = true;
      this.authenticationService.login(loginInterface)
        .subscribe((loginResponseInterface: LoginResponseInterface) => {
            this.loading = false;
            this.toastr.success('Welcome to Fellowship Mangement System', 'Welcom!', {timeOut: 2000});
            this.router.navigateByUrl('/').catch(error => console.log(error))
        }, (httpErrorResponse: HttpErrorResponse) => {
            this.loading = false;
            this.toastr.error(httpErrorResponse.error.message, 'Login Error');
            this.loginForm.controls['email'].setValue('');
            this.loginForm.controls['password'].setValue('');
            // window.location.reload();
        })
  }
}
