import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { UniversityInterface } from '../../register/register';

interface ContactsModalInterface {
    firstname: string;
    lastname: string;
    phone: string;
    university: string;
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
    universities: UniversityInterface[] = [
        {value: 'Addis Abeba', viewValue: 'Addis Abeba'},
        {value: 'Adama', viewValue: 'Adama'},
        {value: 'Bahirdar', viewValue: 'Bahirdar'},
        {value: 'Hawassa', viewValue: 'Hawassa'}
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
            firstname: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            university: [null, [Validators.required]],
        });
    }

    contactsModal(contactsModalInterface: ContactsModalInterface) {
        console.log(contactsModalInterface);
    }
    }