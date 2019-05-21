import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { LoginInterface } from './login.interface';
import {HttpClient} from '@angular/common/http';

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

    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.getEvent();
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login(loginInterface: LoginInterface) {
    console.log(loginInterface);
  }

  getEvent() {
      this.httpClient.get('https://api.github.com/users?since=135').subscribe((data: any) => {
          console.log(data)
          this.github_users = data;
      }, err => {
          console.log(err)
      })
  }
}