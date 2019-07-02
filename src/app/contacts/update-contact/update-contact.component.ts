import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactsModalInterface } from '../contacts-modal/contacts-modal.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ContactService } from '../../services/contact/contact.service';
import { StorageService } from '../../services/storage.service';

export interface UpdateContactInterface {
    id: string;
    full_name: string;
    gender: string;
    phone: string;
    acadamic_department: string;
    Acadamic_department?: string;
    created_at?: string;
    updated_at?: string
}

// export interface DialogData {
//     animal: string;
//     name: string;
// }

@Component({
    selector: 'app-update-contact',
    templateUrl: './update-contact.component.html',
    styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent implements OnInit {

    updateContactForm: any;
    // universities: UniversityInterface[] = [
    //     {value: 'Addis Ababa', viewValue: 'Addis Ababa'},
    //     {value: 'Adama', viewValue: 'Adama'},
    //     {value: 'Bahirdar', viewValue: 'Bahirdar'},
    //     {value: 'Hawassa', viewValue: 'Hawassa'}
    // ];
    constructor(
        private formBuilder: FormBuilder,
        private contactService: ContactService,
        private storageService: StorageService,
        public dialogRef: MatDialogRef<UpdateContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UpdateContactInterface) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        console.log(this.data);
        this.updateContactForm = this.formBuilder.group({
            full_name: [this.data.full_name, [Validators.required]],
            gender: [this.data.gender, [Validators.required]],
            phone: [this.data.phone, [Validators.required]],
            acadamic_department: [this.data.Acadamic_department, [Validators.required]],
            fellowship_id: [this.data.fellowship_id, [Validators.required]],
        });
    }

    updateContact(contactsModalInterface: UpdateContactInterface) {
        console.log(contactsModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.contactService.patch(`contact/${this.data.id}`, contactsModalInterface, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}
