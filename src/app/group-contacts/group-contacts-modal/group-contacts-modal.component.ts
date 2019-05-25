import { Component, Inject, OnInit } from '@angular/core';
import { UniversityInterface } from '../../register/register';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
  selector: 'app-group-contacts-modal',
  templateUrl: './group-contacts-modal.component.html',
  styleUrls: ['./group-contacts-modal.component.scss']
})
export class GroupContactsModalComponent implements OnInit {

    groupContactsModalForm: any;
    universities: UniversityInterface[] = [
        {value: 'Addis Abeba', viewValue: 'Addis Abeba'},
        {value: 'Adama', viewValue: 'Adama'},
        {value: 'Bahirdar', viewValue: 'Bahirdar'},
        {value: 'Hawassa', viewValue: 'Hawassa'}
    ];
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<GroupContactsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        this.groupContactsModalForm = this.formBuilder.group({
            firstname: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            university: [null, [Validators.required]],
        });
    }

    groupContactsModal(groupContactsModalInterface: ContactsModalInterface) {
        console.log(groupContactsModalInterface);
    }

}
