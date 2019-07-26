import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { SmsPortService } from '../../services/sms-port/sms-port.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ScheduledMessageService } from '../../services/scheduled-message/scheduled-message.service';

interface ScheduledMessageModalInterface {
    port_name: string;
    date: string;
    time: string;
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
            date: [null, [Validators.required]],
            time: [null, [Validators.required]],
            message: [null, [Validators.required]]
        });
        this.getSmsPorts()
    }

    scheduledmessageModal(scheduledMessageModalInterface: ScheduledMessageModalInterface) {
        scheduledMessageModalInterface['date'] = scheduledMessageModalInterface.date.toString();
        console.log(scheduledMessageModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.scheduledMessageService.create(scheduledMessageModalInterface, headers, '/message')
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

}
