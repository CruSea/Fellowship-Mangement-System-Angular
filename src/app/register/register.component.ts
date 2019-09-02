import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {RegisterInterface, UniversityInterface} from './register';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    su = false;
    un = false;
    hide = true;

    registerForm: any;
    // universities: UniversityInterface[] = [
    //     {value: 'Addis Abeba', viewValue: 'Addis Abeba'},
    //     {value: 'Adama', viewValue: 'Adama'},
    //     {value: 'Bahirdar', viewValue: 'Bahirdar'},
    //     {value: 'Hawassa', viewValue: 'Hawassa'}
    // ];


    constructor(
        private router: Router,
        private formBuilder: FormBuilder, 
        private authenticationService: AuthenticationService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            full_name: [null, [Validators.required]],
            // lastname: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            university_name: [null, [Validators.required]],
            university_city: [null, [Validators.required]],
            specific_place: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    register(registerInterface: RegisterInterface) {
        this.authenticationService.register(registerInterface)
            .subscribe(response => {
                console.log(response);
                this.su = true;
                this.un = false;
                this.toastr.success('successfully registered', 'successfully registered');
                this.router.navigateByUrl('/login').catch(error => console.log(error))
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse);
                this.su = false;
                this.un = true;
                // this.toastr.error(httpErrorResponse.error.message.email, 'Error Found');
                this.toastr.error(httpErrorResponse.error.error, 'Error Found');

            })
    }
}
