import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { UniversityInterface } from '../../register/register';

interface MessageModalInterface {
    campaign: string;
    phone: string;
    message: string;
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-message-modal',
    templateUrl: './message-modal.component.html',
    styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

    messageModalForm: any;
    // universities: UniversityInterface[] = [
    //     {value: 'Addis Abeba', viewValue: 'Addis Abeba'},
    //     {value: 'Adama', viewValue: 'Adama'},
    //     {value: 'Bahirdar', viewValue: 'Bahirdar'},
    //     {value: 'Hawassa', viewValue: 'Hawassa'}
    // ];
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<MessageModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        this.messageModalForm = this.formBuilder.group({
            campaign: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            message: [null, [Validators.required]],
        });
    }

    messageModal(messageModalInterface: MessageModalInterface) {
        console.log(messageModalInterface);
    }
}
