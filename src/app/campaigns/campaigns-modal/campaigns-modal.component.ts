import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { PortInterface } from '../campaigns';
interface CampaignsModalInterface {
    campaign_name: string;
    sms_port: string;
    description: string
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
    port: PortInterface[] = [
        {type: '', name: ''},
        {type: '', name: ''}
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
            campaign_name: [null, [Validators.required]],
            sms_port: [null, [Validators.required]],
            description: [null, [Validators.required]]
        });
    }

    campaignsModal(campaignsModalInterface: CampaignsModalInterface) {
        console.log(campaignsModalInterface);
    }
}
