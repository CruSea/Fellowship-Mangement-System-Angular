import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { GroupContactsService } from '../../services/group_contacts/group-contacts.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';


export interface UpdateContactInterface {
    id?: string;
    name: string;
    description: string;
    // phone: string;
    // university: string;
}

// export interface DialogData {
//     animal: string;
//     name: string;
// }

@Component({
    selector: 'app-update-contact',
    templateUrl: './update-contact.component.html',
    styleUrls: ['./update-contact.component.scss'],
    providers: [GroupContactsService]
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
        private  groupContactsService: GroupContactsService,
        private  storageService: StorageService,
        public dialogRef: MatDialogRef<UpdateContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UpdateContactInterface) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        console.log(this.data);
        this.updateContactForm = this.formBuilder.group({
            name: [this.data.name, [Validators.required]],
            description: [this.data.description, [Validators.required]],
            // phone: [this.data.phone, [Validators.required]],
            // university: [this.data.university, [Validators.required]],
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
        return this.groupContactsService.patch(`team/${this.data.id}`, contactsModalInterface, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}