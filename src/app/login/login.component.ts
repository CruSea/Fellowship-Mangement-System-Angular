import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { LoginInterface } from './login.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  constructor(
      private router: Router,
      private httpClient: HttpClient,
      private authenticationService: AuthenticationService,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null]
    });
  }

  login(loginInterface: LoginInterface) {
      this.loading = true;
      this.authenticationService.login(loginInterface)
        .subscribe((loginResponseInterface: LoginResponseInterface) => {
            this.loading = false;
            console.log(loginResponseInterface.message);
            this.router.navigateByUrl('/').catch(error => console.log(error))
        }, (httpErrorResponse: HttpErrorResponse) => {
            this.loading = false;
            console.log(httpErrorResponse)
        })
  }
}
