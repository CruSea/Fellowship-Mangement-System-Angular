import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { UniversityInterface } from '../../register/register';

export interface UpdateContactInterface {
    position?: string;
    firstname: string;
    lastname: string;
    phone: string;
    university: string;
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
    universities: UniversityInterface[] = [
        {value: 'Addis Ababa', viewValue: 'Addis Ababa'},
        {value: 'Adama', viewValue: 'Adama'},
        {value: 'Bahirdar', viewValue: 'Bahirdar'},
        {value: 'Hawassa', viewValue: 'Hawassa'}
    ];
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<UpdateContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UpdateContactInterface) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        console.log(this.data);
        this.updateContactForm = this.formBuilder.group({
            firstname: [this.data.firstname, [Validators.required]],
            lastname: [this.data.lastname, [Validators.required]],
            phone: [this.data.phone, [Validators.required]],
            university: [this.data.university, [Validators.required]],
        });
    }

    updateContact(updateContactInterface: UpdateContactInterface) {
        console.log(updateContactInterface);
    }
}