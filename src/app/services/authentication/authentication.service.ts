import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';

import { LoginResponseInterface, TokenInterface } from './authentication.interface';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { RegisterService } from '../register/register.service';
import { LoginInterface } from '../../login/login.interface';
import { RegisterInterface } from '../../register/register';

@Injectable()
export class AuthenticationService implements AuthService, OnInit {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private loginService: LoginService,
    private registerService: RegisterService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
  }

  public isAuthorized(): Observable <boolean> {
    return this.storageService.getAccessToken()
      .pipe(map((access_token: string) => !! access_token));
  }

  public getAccessToken(): Observable <string> {
    return this.storageService.getAccessToken();
  }

  public refreshToken(): Observable <TokenInterface> {
    return;
    // return this.storageService.getRefreshToken()
    //   .pipe(switchMap((refresh_token: string) =>
    //       this.httpClient.post(`http://localhost:3000/auth/refresh`, { refresh_token: refresh_token })
    //     ), tap((tokenInterface: TokenInterface) => this.saveToken(tokenInterface)),
    //     catchError((httpErrorResponse: HttpErrorResponse) => {
    //       this.logout(); return throwError(httpErrorResponse)})
    //   );
  }

  public refreshShouldHappen(httpErrorResponse: HttpErrorResponse): boolean {
    return httpErrorResponse.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  public login(loginInterface: LoginInterface): Observable<any> {
    const headers = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Methods', 'POST')
      .append('Access-Control-Allow-Headers', 'Content-Type');
    console.log(loginInterface);
    return this.loginService.create(loginInterface, headers, 'http://localhost:3232/api/signin')
      .pipe(tap((loginResponseInterface: any) => {
        console.log(JSON.parse(loginResponseInterface));
        this.storageService.setAccessToken(loginResponseInterface.token)
      }));
  }

  public register(registerInterface: RegisterInterface): Observable<any> {
    const headers = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Methods', 'POST')
      .append('Access-Control-Allow-Headers', 'Content-Type');
    return this.registerService.create(registerInterface, headers, '/signup');
  }

  public logout() {
    this.storageService.clear();
    return window.location.reload()
  }
}
