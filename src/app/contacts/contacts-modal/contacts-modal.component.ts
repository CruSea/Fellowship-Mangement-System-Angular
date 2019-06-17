import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { GenderInterface } from '../contacts';

interface ContactsModalInterface {
    full_name: string;
    gender: string;
    phone: string;
    Academic_department: string;
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
            Academic_department: [null, [Validators.required]],
            fellowship_id: [null, [Validators.required]],
        });
    }

    contactsModal(contactsModalInterface: ContactsModalInterface) {
        console.log(contactsModalInterface);
    }
    }