import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { UniversityInterface } from '../../register/register';

interface GroupMessagesModalInterface {
    campaign: string;
    contact_group: string;
    message: string;
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-group-messages-modal',
    templateUrl: './group-messages-modal.component.html',
    styleUrls: ['./group-messages-modal.component.scss']
})
export class GroupMessagesModalComponent implements OnInit {

    groupmessagesModalForm: any;
    // universities: UniversityInterface[] = [
    //     {value: 'Addis Abeba', viewValue: 'Addis Abeba'},
    //     {value: 'Adama', viewValue: 'Adama'},
    //     {value: 'Bahirdar', viewValue: 'Bahirdar'},
    //     {value: 'Hawassa', viewValue: 'Hawassa'}
    // ];
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<GroupMessagesModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        this.groupmessagesModalForm = this.formBuilder.group({
            campaign: [null, [Validators.required]],
            contact_group: [null, [Validators.required]],
            message: [null, [Validators.required]],
        });
    }

    groupmessagesModal(groupmessagesModalInterface: GroupMessagesModalInterface) {
        console.log(groupmessagesModalInterface);
    }
}
