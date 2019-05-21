import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) {

  }
  signup(firstname: string, lastname: string, phone: string, university: string, email: string, password: string ) {
    return this.http.post('http://localhost:3232/signup',
        {firstname: firstname, lastname: lastname, phone: phone, university: university, email: email, password: password},
        {headers: new Headers({'Content-Type' : 'application/json'})
        });
  }
}
