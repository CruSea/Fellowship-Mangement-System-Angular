import { Component, Inject, OnInit } from '@angular/core';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MAT_DIALOG_DATA,
    MatDatepicker,
    MatDialogRef
} from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { GenderInterface } from '../../contacts/contacts';
import { ContactService } from '../../services/contact/contact.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const moment = _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY',
    },
    display: {
        dateInput: 'YYYY'
    },
};

export interface ContactsModalInterface {
    full_name: string;
    gender: string;
    phone: string;
    email: string;
    graduation_year: string;
    acadamic_department: string;
    fellowship_id: string;
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-grouped-contacts-modal',
    templateUrl: './grouped-contacts-modal.component.html',
    styleUrls: ['./grouped-contacts-modal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class GroupedContactsModalComponent implements OnInit {

    contactsModalForm: any;
    genders: GenderInterface[] = [
        {type: 'male', name: 'Male'},
        {type: 'female', name: 'Female'},
    ];

    date = new FormControl(moment());

    chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
        datepicker.close();
    }

    constructor(
        private formBuilder: FormBuilder,
        private contactService: ContactService,
        private storageService: StorageService,
        public dialogRef: MatDialogRef<GroupedContactsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        this.contactsModalForm = this.formBuilder.group({
            full_name: [null, [Validators.required]],
            gender: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            acadamic_department: [null, [Validators.required]],
            fellowship_id: [null, [Validators.required]],
            email: [null, []],
            graduation_year: [null, [Validators.required]],
        });
    }

    contactsModal(contactsModalInterface: ContactsModalInterface) {
        console.log(contactsModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.contactService.create(contactsModalInterface, headers, '/team/addMember/prayer')
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}