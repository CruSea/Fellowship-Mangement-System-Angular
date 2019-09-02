import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SentMessagesService } from '../services/sent_messages/sent-messages.service';
import { SmsPortService } from '../services/sms-port/sms-port.service';
import { FormBuilder, Validators } from '@angular/forms';
// import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
// import { ImportContactComponent } from './import-contact/import-contact.component';

interface MessageModalInterface {
    port_name: string;
    sent_to: string;
    message: string;
}

export interface PeriodicElement {
    message: string;
    sent_to: string;
    is_sent: string;
    is_delivered: string;
    id: number;
    sent_by: string;
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
    loading: boolean;
    per_page: number;
    total: number;
    page: number;

    errorResponse: string;

    messageModalForm: any;
    smsPorts: any;

    displayedColumns: string[] = ['id', 'message', 'sent_to', 'sent_by', 'is_sent', 'is_delivered', 'created_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

    constructor(
        private formBuilder: FormBuilder,
        private matDialog: MatDialog,
        private storageService: StorageService,
        private sentMessagesService: SentMessagesService,
        private smsPortService: SmsPortService,
        private toastr: ToastrService
    ) { this.page = 1; }

    openCreate(): void {
        const dialogRef = this.matDialog.open(MessageModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.sentMessages(this.page);
            this.animal = result;
        });
    }

    delete(uni: string) {
    }

    ngOnInit() {
        this.messageModalForm = this.formBuilder.group({
            port_name: [null, [Validators.required]],
            sent_to: [null, [Validators.required]],
            message: [null, [Validators.required]],
        });
        this.sentMessages(this.page)
        this.getSmsPorts();
    }

    sendMessage(messageModalInterface: MessageModalInterface) {
        console.log(messageModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.sentMessagesService.create(messageModalInterface, headers, '/message')
            .subscribe((res: {message: string}) => {
                console.log(res);
                this.toastr.success('message sent successfully', 'Sent', {timeOut: 3000});
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
                this.errorResponse = httpErrorResponse.error.response;
                // if(httpErrorResponse.error.error.port_name != null) {
                //     this.errorResponse = httpErrorResponse.error.error.port_name;
                // }
                this.toastr.error(this.errorResponse, 'Error', {timeOut: 10000});
            })
    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    sentMessages(e) {
        this.loading = true;
        if(e) {
            this.page = e;
        }
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.sentMessagesService.gets(headers, '/messages?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.dataSource = new MatTableDataSource(res.messages.data);
                this.dataSource = res.messages.data;
                this.total = res.messages.total;
                this.per_page = res.messages.per_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
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
                this.smsPorts = res.sms_ports.data;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    removeMessage(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.sentMessagesService.delete(`message/${id}`, headers)
            .subscribe((res: {message: string}) => {
                this.toastr.success('message removed successfully', 'Removed', {timeOut: 3000});
                this.sentMessages(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error('Ooops! something went wrong, message is not removed', 'Error', {timeOut: 3000});
            })
    }


}
