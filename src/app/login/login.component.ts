import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { LoginInterface } from './login.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { LoginResponseInterface } from '../services/authentication/authentication.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  github_users: any[];

  constructor(
      private httpClient: HttpClient,
      private authService: AuthService,
      private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.getEvent();
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login(loginInterface: LoginInterface) {
    console.log(loginInterface);
    // this.authService.signin(loginInterface)
    //     .subscribe(response => {
    //       console.log(response);
    //         }
    //     )
      this.authenticationService.login(loginInterface).subscribe(
          (loginResponseInterface: LoginResponseInterface) => {
            console.log(loginResponseInterface.message)
          }, (httpErrorResponse: HttpErrorResponse) => {
            console.log(`${httpErrorResponse.message} and...........`)
            console.log(httpErrorResponse)
          })
  }
}
