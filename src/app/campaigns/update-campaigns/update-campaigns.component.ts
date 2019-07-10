import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CampaignsService } from '../campaigns.service';
import { StorageService } from '../../services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { UpdateContactInterface } from '../../contacts/update-contact/update-contact.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SmsPortService } from '../../services/sms-port/sms-port.service';


export interface UpdateCampaignsInterface {
    id?: string;
    port_name: string
    port_type: string;
    negarit_campaign_id: string;
    negarit_sms_port_id: string
}

@Component({
  selector: 'app-update-campaigns',
  templateUrl: './update-campaigns.component.html',
  styleUrls: ['./update-campaigns.component.scss']
})
export class UpdateCampaignsComponent implements OnInit {

  updateCampaingsForm: any;

  constructor(
      private formBuilder: FormBuilder,
      private smsPortService: SmsPortService,
      // private campaignsService: CampaignsService,
      private storageService: StorageService,
      public dialogRef: MatDialogRef<UpdateCampaignsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: UpdateCampaignsInterface) { }

  ngOnInit(): void {
    console.log(this.data);
      this.updateCampaingsForm = this.formBuilder.group({
          port_name: [this.data.port_name, [Validators.required]],
          port_type: [this.data.port_type, [Validators.required]],
          negarit_campaign_id: [this.data.negarit_campaign_id, [Validators.required]],
          negarit_sms_port_id: [this.data.negarit_sms_port_id, [Validators.required]],
          // fellowship_id: [this.data.fellowship_id, [Validators.required]],
      });
  }

    updateCampaigns(campaignsModalInterface: UpdateCampaignsInterface) {
        console.log(campaignsModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.smsPortService.patch(`sms-port/${this.data.id}`, campaignsModalInterface, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
