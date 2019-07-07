import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { UniversityInterface } from '../../register/register';
import { StorageService } from '../../services/storage.service';
import { GroupedMessageService } from '../../services/group_message/grouped-message.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

interface GroupMessagesModalInterface {
    port_name: string;
    team: string;
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
        private storageService: StorageService,
        private groupedMessageService: GroupedMessageService,
        public dialogRef: MatDialogRef<GroupMessagesModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        this.groupmessagesModalForm = this.formBuilder.group({
            port_name: [null, [Validators.required]],
            team: [null, [Validators.required]],
            message: [null, [Validators.required]],
        });
    }

    groupmessagesModal(groupmessagesModalInterface: GroupMessagesModalInterface) {
        console.log(groupmessagesModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedMessageService.create(groupmessagesModalInterface, headers, '/team-message')
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}
