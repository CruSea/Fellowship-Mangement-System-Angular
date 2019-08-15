import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { GroupMessagesModalComponent } from './group-messages-modal/group-messages-modal.component';
import { StorageService } from '../services/storage.service';
import { GroupedMessageService } from '../services/group_message/grouped-message.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PeriodicMessageContactsModalComponent } from '../periodic-message/periodic-message-contacts-modal/periodic-message-contacts-modal.component';
import { PeriodicMessageEventModalComponent } from '../periodic-message/periodic-message-event-modal/periodic-message-event-modal.component';
import { GroupMessageFellowshipModalComponent } from './group-message-fellowship-modal/group-message-fellowship-modal.component';
import { GroupMessageEventModalComponent } from './group-message-event-modal/group-message-event-modal.component';
import { GroupMessagePostgraduatesContactModalComponent } from './group-message-postgraduates-contact-modal/group-message-postgraduates-contact-modal.component';
import { GroupMessagePostgraduatesModalComponent } from './group-message-postgraduates-modal/group-message-postgraduates-modal.component';
// import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
// import { ImportContactComponent } from './import-contact/import-contact.component';


export interface PeriodicElement {
    id?: number;
    // port_name: string;
    // team: string;
    sent_by: string;
    team_id: string;
    message: string;
    // sent_msg_count: string;
    created_at: string;
}

@Component({
    selector: 'app-group-messages',
    templateUrl: './group-messages.component.html',
    styleUrls: ['./group-messages.component.scss']
})
export class GroupMessagesComponent implements OnInit {

    animal: string;
    message: string;
    loading: boolean;
    panelOpenState: boolean;
    panelOpenPosr: boolean;


    displayedColumns: string[] = ['id', 'message', 'sent_by', 'team_id', 'created_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

    constructor(private matDialog: MatDialog,
                private storageService: StorageService,
                private groupedMessageService: GroupedMessageService
        ) { }

    openForGroup(): void {
        const dialogRef = this.matDialog.open(GroupMessagesModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.groupMessages();
            this.panelOpenState = false;
            this.panelOpenPosr = false;
            this.animal = result;
        });
    }

    openForFellowship(): void {
        const dialogRef = this.matDialog.open(GroupMessageFellowshipModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.groupMessages();
            this.panelOpenState = false;
            this.panelOpenPosr = false;
            this.animal = result;
        });
    }

    forevent(): void {
        const dialogRef = this.matDialog.open(GroupMessageEventModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.groupMessages();
            this.animal = result;
        });
    }

    openForPostContacts(): void {
        const dialogRef = this.matDialog.open(GroupMessagePostgraduatesContactModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.groupMessages();
            this.panelOpenPosr = false;
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    openForPostTeam(): void {
        const dialogRef = this.matDialog.open(GroupMessagePostgraduatesModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.groupMessages();
            this.panelOpenPosr = false;
            this.panelOpenState = false;
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
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedMessageService.gets(headers, '/team-messages')
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = new MatTableDataSource(res.team_message.data);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
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
        return this.groupedMessageService.delete(`team-message/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.groupMessages();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
