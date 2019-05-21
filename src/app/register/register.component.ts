import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {RegisterInterface, UniversityInterface} from './register';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    registerForm: any;
    universities: UniversityInterface[] = [
        {value: 'Addis Abeba', viewValue: 'Addis Abeba'},
        {value: 'Adama', viewValue: 'Adama'},
        {value: 'Bahirdar', viewValue: 'Bahirdar'},
        {value: 'Hawassa', viewValue: 'Hawassa'}
    ];

    constructor(
        private formBuilder: FormBuilder, private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            phonenumber: [null, [Validators.required]],
            university: [null, [Validators.required]],
            email: [null, [Validators.required]],
            password: [null, [Validators.required, Validators.minLength(8)]]
        });
    }

    register(registerInterface: RegisterInterface) {
        console.log(registerInterface);
    }
}
