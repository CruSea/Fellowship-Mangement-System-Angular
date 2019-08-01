import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {RegisterInterface, UniversityInterface} from './register';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication/authentication.service';

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
        private formBuilder: FormBuilder, private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            full_name: [null, [Validators.required]],
            // lastname: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            university_name: [null, [Validators.required]],
            university_city: [null, [Validators.required]],
            specific_place: [null, [Validators.required]],
            email: [null, [Validators.required]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    register(registerInterface: RegisterInterface) {
        this.authenticationService.register(registerInterface)
            .subscribe(response => {
                console.log(response);
                this.su = true;
                this.un = false;
            }, (error: HttpErrorResponse) => {
                console.log(error);
                this.su = false;
                this.un = true;
            })
    }
}
