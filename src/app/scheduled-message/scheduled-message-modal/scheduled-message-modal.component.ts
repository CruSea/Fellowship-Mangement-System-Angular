import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { SmsPortService } from '../../services/sms-port/sms-port.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ScheduledMessageService } from '../../services/scheduled-message/scheduled-message.service';
import * as moment from 'moment';

interface ScheduledMessageModalInterface {
    port_name: string;
    send_date: string;
    sent_time: string;
    team: string;
    message: string
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
  selector: 'app-scheduled-message-modal',
  templateUrl: './scheduled-message-modal.component.html',
  styleUrls: ['./scheduled-message-modal.component.scss']
})
export class ScheduledMessageModalComponent implements OnInit {

  scheduledMessageModalForm: any;
  smsPorts: any;
  groupNames: any;

  constructor(
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private smsPortService: SmsPortService,
      private scheduledMessageService: ScheduledMessageService,
      public dialogRef: MatDialogRef<ScheduledMessageModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {
        this.scheduledMessageModalForm = this.formBuilder.group({
            port_name: [null, [Validators.required]],
            send_date: [null, [Validators.required]],
            sent_time: [null, [Validators.required]],
            team: [null, [Validators.required]],
            message: [null, [Validators.required]]
        });
        this.getSmsPorts();
        this.getGroupName();
    }

    scheduledmessageModal(scheduledMessageModalInterface: ScheduledMessageModalInterface) {
        scheduledMessageModalInterface['send_date'] =
            moment(scheduledMessageModalInterface.send_date).format('YYYY-MM-DD').toString();
        console.log(scheduledMessageModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.scheduledMessageService.create(scheduledMessageModalInterface, headers, '/alarm-message/team')
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
        return this.smsPortService.gets(headers, '/sms-ports')
            .subscribe((res: any) => {
                console.log(res);
                this.smsPorts = res
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    getGroupName() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.scheduledMessageService.gets(headers, '/teams')
            .subscribe((res: any) => {
                console.log(res);
                this.groupNames = res
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
