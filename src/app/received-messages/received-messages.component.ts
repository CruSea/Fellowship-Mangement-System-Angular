import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { ReceivedMessagesService } from '../services/received-messages/received-messages.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
    position?: number;
    message: string;
    sent_from: string
    sms_port: number;
    date_time: string
    // university: string;
    // phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    // {position: 1, message: 'Tnx For your notice', sent_from: 'Yitages Berhanu', sms_port: 23, date_time: '12/4/2010'},
    // {position: 2, message: 'Ok', sent_from: 'Meheret Tesfaye', sms_port: 234, date_time: '26/7/2010'},
    // {position: 3, message: 'I will inform you thank you', sent_from: 'Tsion Shemeles', sms_port: 1256, date_time: '12/2/2011'},
    // {position: 4, message: 'It is my privilege thank you sir', sent_from: 'Samson Worku', sms_port: 1092, date_time: '1/5/2011'},
];

@Component({
    selector: 'app-received-messages',
    templateUrl: './received-messages.component.html',
    styleUrls: ['./received-messages.component.scss']
})
export class ReceivedMessagesComponent implements OnInit {

    animal: string;
    message: string;


    displayedColumns: string[] = ['position', 'message', 'sent_from', 'sms_port', 'date_time'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

    constructor(
        private matDialog: MatDialog,
        private storageService: StorageService,
        private receivedMessagesService: ReceivedMessagesService,
    ) { }

    delete(uni: string) {
        console.log(uni);
    }

    ngOnInit() {
        this.receivedMessages()
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    receivedMessages() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.receivedMessagesService.gets(headers, '/respond-messages')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.messages);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
