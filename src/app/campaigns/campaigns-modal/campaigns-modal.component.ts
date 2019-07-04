import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { PortInterface } from '../campaigns';

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
        {type: 'both', name: 'Both'},
        {type: 'only_send', name: 'Only Send'},
        {type: 'only_received', name: 'Only Received'},
    ];
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CampaignsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        this.campaignsModalForm = this.formBuilder.group({
            port_name: [null, [Validators.required]],
            port_type: [null, [Validators.required]],
            negarit_campaign_id: [null, [Validators.required]],
            negarit_sms_port_id: [null, [Validators.required]],
        });
    }

    campaignsModal(campaignsModalInterface: CampaignsModalInterface) {
        console.log(campaignsModalInterface);
    }
}
