import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { GenderInterface } from '../contacts';
import { ContactService } from '../../services/contact/contact.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';


export interface ContactsModalInterface {
    full_name: string;
    gender: string;
    phone: string;
    acadamic_department: string;
    fellowship_id: string;
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
  selector: 'app-contacts-modal',
  templateUrl: './contacts-modal.component.html',
  styleUrls: ['./contacts-modal.component.scss']
})
export class ContactsModalComponent implements OnInit {

    contactsModalForm: any;
    genders: GenderInterface[] = [
        {type: 'male', name: 'Male'},
        {type: 'female', name: 'Female'},
    ];
    constructor(
        private formBuilder: FormBuilder,
        private contactService: ContactService,
        private storageService: StorageService,
        public dialogRef: MatDialogRef<ContactsModalComponent>,
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
        return this.contactService.create(contactsModalInterface, headers, '/contact')
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}