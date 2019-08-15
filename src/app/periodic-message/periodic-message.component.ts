import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { PeriodicMessageService } from '../services/periodic-message/periodic-message.service';
import { PeriodicMessageModalComponent } from './periodic-message-modal/periodic-message-modal.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PeriodicMessageContactsModalComponent } from './periodic-message-contacts-modal/periodic-message-contacts-modal.component';
import { PeriodicMessageEventModalComponent } from './periodic-message-event-modal/periodic-message-event-modal.component';

export interface PeriodicElement {
    position: number;
    port_name: string;
    // type: string;
    start_date: string;
    end_date: string;
    sent_time: string;
    periodic_message: string;
}


@Component({
  selector: 'app-periodic-message',
  templateUrl: './periodic-message.component.html',
  styleUrls: ['./periodic-message.component.scss', 'periodic-message-component.css']
})
export class PeriodicMessageComponent implements OnInit {

  animal: string;
  message: string;
  loading: boolean;
    panelOpenState: boolean;

  displayedColumns: string[] = ['id', 'message', 'sent_to', 'start_date', 'end_date', 'sent_time',
       'created_at', 'updated_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;


    constructor(
        private matDialog: MatDialog,
        private storageService: StorageService,
        private periodicMessageService: PeriodicMessageService
    ) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(PeriodicMessageModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.periodicMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    periodicContacts(): void {
        const dialogRef = this.matDialog.open(PeriodicMessageContactsModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.periodicMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    periodicEvent(): void {
        const dialogRef = this.matDialog.open(PeriodicMessageEventModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.periodicMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

  ngOnInit() {
        this.periodicMessage()
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    periodicMessage() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.periodicMessageService.gets(headers, '/scheduled-messages')
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = new MatTableDataSource(res.scheduled_messages.data);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    deletePeriodicMessage (id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.periodicMessageService.delete(`/scheduled-messages${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.periodicMessage();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
