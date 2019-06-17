import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable} from 'rxjs';
import { RegisterInterface } from './register/register';
import { LoginInterface} from './login/login.interface';
import * as url from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) {

  }
  signup(registerInterface: RegisterInterface) {
    return this.http.post('http://127.0.0.1:3232/api/signup',
    registerInterface,
        {headers: new Headers({'Content-Type' : 'application/json'})
        });
  }

  signin(loginInterface: LoginInterface) {
      return this.http.post('http://127.0.0.1:3232/api/signin',
          loginInterface,
          {
              headers: new Headers({'Content-Type': 'application/json'})
          });
  }
}
