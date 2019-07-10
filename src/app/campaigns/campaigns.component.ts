import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { CampaignsModalComponent } from './campaigns-modal/campaigns-modal.component';
import { CampaignsService } from './campaigns.service';
import { StorageService } from '../services/storage.service';
import { SmsPortService } from '../services/sms-port/sms-port.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UpdateCampaignsComponent, UpdateCampaignsInterface } from './update-campaigns/update-campaigns.component';


export interface PeriodicElement {
    id: number;
    port_name: string
    port_type: string;
    negarit_campaign_id: string;
    negarit_sms_port_id: string;
    created_at: string;
    updated_at: string;
    action?: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
    
];

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.scss'],
})
export class CampaignsComponent implements OnInit {

    animal: string;
    firstname: string;


    // displayedColumns: string[] = ['position', 'firstname', 'lastname', 'negarit_campaign_id', 'port_type', 'action'];
    displayedColumns: string[] = ['id', 'port_name', 'port_type', 'negarit_campaign_id', 'negarit_sms_port_id', 'created_at', 'updated_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

    constructor(
        private matDialog: MatDialog,
        private storageService: StorageService,
        private smsPortService: SmsPortService,
    ) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(CampaignsModalComponent, {
            width: '500px',
            data: {firstname: this.firstname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.collectionOfcampaign();
            this.animal = result;
        });
    }

    openUpdate(data: UpdateCampaignsInterface): void {
        console.log(data);
        const dialogRef = this.matDialog.open(UpdateCampaignsComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.collectionOfcampaign();
            this.animal = result;
        });
    }

    // delete(id: string) {
    //     console.log(id);
    //     this.usersService.delete(id).subscribe(res => {
    //         console.log(res);
    //     }, err => {
    //         console.log(err)
    //     })
    // }

    ngOnInit() {
        this.collectionOfcampaign()
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfcampaign() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.smsPortService.gets(headers, '/sms-ports')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.sms_ports);
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    deleteCampaign(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.smsPortService.delete(`sms-port/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.collectionOfcampaign();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
