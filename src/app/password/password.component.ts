import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { FormBuilder } from '@angular/forms';
import { LoginResponseInterface } from '../services/authentication/authentication.interface';

export interface ResetPasswordInterface {

  email: string;

}

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss', 'password.css']
})
export class PasswordComponent implements OnInit {

    resetForm: any;
    // loading: boolean;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
      this.resetForm = this.formBuilder.group({
          email: [null],
      });
  }

    resetPass(resetPasswordInterface: any) {
        // this.loading = true;
        this.authenticationService.login(resetPasswordInterface)
            .subscribe((_resetPasswordInterface: any) => {
                // this.loading = false;
                console.log(_resetPasswordInterface);
                // this.router.navigateByUrl('/').catch(error => console.log(error))
            }, (httpErrorResponse: HttpErrorResponse) => {
                // this.loading = false;
                console.log(httpErrorResponse)
            })
    }

}
