import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { StorageService } from '../services/storage.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SentMessagesService } from '../services/sent_messages/sent-messages.service';
import { SmsPortService } from '../services/sms-port/sms-port.service';
// import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
// import { ImportContactComponent } from './import-contact/import-contact.component';


export interface PeriodicElement {
    message: string;
    sent_to: string;
    is_sent: string;
    is_delivered: string;
    id: number;
    created_at?: string;
    // campaign: string;
    sms_port_id: string;
    action?: string
}

const ELEMENT_DATA: PeriodicElement[] = [
    // {position: 1, message: 'Hellow this is to inform you', sent_to: 'Abebe Petros', campaign: '0912342421', status: 'sent', created_by: 'Yitages Berhanu'},
    // {position: 2, message: 'Hey there this is to inform you that this week we will have a meeting ', sent_to: 'Eyob Bekele', campaign: '0911374382', status: 'sent', created_by: 'Meheret Tefaye'},
    // {position: 3, message: 'This month is a thanks giving month', sent_to: 'Tesfaye Gezahegn', campaign: '0916454563', status: 'sent', created_by: 'Tsion Shemeles'},
];

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    animal: string;
    message: string;


    displayedColumns: string[] = ['id', 'message', 'sent_to', 'is_sent', 'is_delivered', 'created_at', 'sms_port_id', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

    constructor(
        private matDialog: MatDialog,
        private storageService: StorageService,
        private sentMessagesService: SentMessagesService
    ) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(MessageModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.sentMessages();
            this.animal = result;
        });
    }

    // openImportContact(): void {
    //     const dialogRef = this.matDialog.open(ImportContactComponent, {
    //         width: '1000px'
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }

    // openUpdate(data: UpdateContactInterface): void {
    //     console.log(data);
    //     const dialogRef = this.matDialog.open(UpdateContactComponent, {
    //         data: data,
    //         width: '500px'
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }

    delete(uni: string) {
        console.log(uni);
    }

    ngOnInit() {
        this.sentMessages()
    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    sentMessages() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.sentMessagesService.gets(headers, '/messages')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.messages);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    deleteMessage (id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.sentMessagesService.delete(`message/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.sentMessages();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }


}
