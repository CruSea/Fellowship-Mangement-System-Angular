import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { UniversityInterface } from '../../register/register';

export interface UpdateContactInterface {
    position?: string;
    full_name: string;
    gender: string;
    phone: string;
    Academic_department: string;
    fellowship_id: string;
    created_at: string;
    updated_at: string
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
            Academic_department: [this.data.Academic_department, [Validators.required]],
            fellowship_id: [this.data.fellowship_id, [Validators.required]],
            created_at: [this.data.created_at, [Validators.required]],
            updated_at: [this.data.updated_at, [Validators.required]],
        });
    }

    updateContact(updateContactInterface: UpdateContactInterface) {
        console.log(updateContactInterface);
    }
}