import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { PortInterface } from '../campaigns';
import { StorageService } from '../../services/storage.service';
import { SmsPortService } from '../../services/sms-port/sms-port.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

interface CampaignsModalInterface {
    port_name: string;
    port_type: string;
    negarit_campaign_id: number;
    negarit_sms_port_id: number
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-campaigns-modal',
    templateUrl: './campaigns-modal.component.html',
    styleUrls: ['./campaigns-modal.component.scss']
})
export class CampaignsModalComponent implements OnInit {

    campaignsModalForm: any;
    portsInterface: PortInterface[] = [
        {type: 'Both', name: 'both'},
        {type: 'only send', name: 'Only Send'},
        {type: 'only receive', name: 'Only Receive'},
    ];
    constructor(
        private formBuilder: FormBuilder,
        private storageService: StorageService,
        private  smsPortService: SmsPortService,
        public dialogRef: MatDialogRef<CampaignsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        this.campaignsModalForm = this.formBuilder.group({
            port_name: [null, [Validators.required, Validators.minLength(4)]],
            port_type: [null, [Validators.required]],
            negarit_campaign_id: [null, [Validators.required]],
            negarit_sms_port_id: [null, [Validators.required]],
        });
    }

    campaignsModal(campaignsModalInterface: CampaignsModalInterface) {
        console.log(campaignsModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.smsPortService.create(campaignsModalInterface, headers, '/sms-port')
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
                this.dialogRef.close();
            })
    }
}
