import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { GroupedMessageService } from '../../services/group_message/grouped-message.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

interface GroupMessagesModalInterface {
    port_name: string;
    message: string;
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
  selector: 'app-group-message-fellowship-modal',
  templateUrl: './group-message-fellowship-modal.component.html',
  styleUrls: ['./group-message-fellowship-modal.component.scss']
})
export class GroupMessageFellowshipModalComponent implements OnInit {

    groupmessagesModalForm: any;
    smsPorts: any;

  constructor(
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private groupedMessageService: GroupedMessageService,
      public dialogRef: MatDialogRef<GroupMessageFellowshipModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit(): void {
      this.getSmsPorts();
      this.groupmessagesModalForm = this.formBuilder.group({
          port_name: [null, [Validators.required]],
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
        return this.groupedMessageService.create(groupmessagesModalInterface, headers, '/fellowship-message')
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
                this.dialogRef.close();
            })
    }

    getSmsPorts() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedMessageService.gets(headers, '/sms-ports')
            .subscribe((res: any) => {
                console.log(res);
                this.smsPorts = res
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
