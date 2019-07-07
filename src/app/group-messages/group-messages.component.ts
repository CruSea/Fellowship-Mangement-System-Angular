import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { GroupMessagesModalComponent } from './group-messages-modal/group-messages-modal.component';
import { StorageService } from '../services/storage.service';
import { GroupedMessageService } from '../services/group_message/grouped-message.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
// import { ImportContactComponent } from './import-contact/import-contact.component';


export interface PeriodicElement {
    position?: number;
    port_name: string;
    team: string;
    message: string;
    // sent_msg_count: string;
    date_time: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    // {position: 1, sent_message: 'Hey this is to inform you about your project', group_name: 'Main Leaders', campaign_name: '', date_time: '17/2/2012', sent_msg_count: '1'},
    // {position: 2, sent_message: 'Hello tomorrow we will have worship rehearsal', group_name: 'Worship', campaign_name: '', date_time: '5/3/2012', sent_msg_count: '3'},
    // {position: 3, sent_message: 'Hey friends next week we have NO program', group_name: 'Literature', campaign_name: '', date_time: '23/4/2012', sent_msg_count: '4'},
    // {position: 4, sent_message: 'ነገ ጥናት አለን እንዳትቀሩ' , group_name: 'Bible study', campaign_name: '', date_time: '12/7/2012', sent_msg_count: '4'},
];

@Component({
    selector: 'app-group-messages',
    templateUrl: './group-messages.component.html',
    styleUrls: ['./group-messages.component.scss']
})
export class GroupMessagesComponent implements OnInit {

    animal: string;
    message: string;


    displayedColumns: string[] = ['position', 'port_name', 'team', 'message', 'date_time'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

    constructor(private matDialog: MatDialog,
                private storageService: StorageService,
                private groupedMessageService: GroupedMessageService
        ) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(GroupMessagesModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.groupMessages();
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
    //
    // delete(uni: string){
    //     console.log(uni);
    // }

    // deleteGroupMessage(uni: string) {
    //     console.log(uni);
    // }

    ngOnInit() {
        this.groupMessages()
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    groupMessages() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedMessageService.gets(headers, '/team-message')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.messages);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    deleteGroupMessage (id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedMessageService.delete(`message/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.groupMessages();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
