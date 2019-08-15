import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { ScheduledMessageService } from '../services/scheduled-message/scheduled-message.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ScheduledMessageModalComponent } from './scheduled-message-modal/scheduled-message-modal.component';
import { PeriodicMessageModalComponent } from '../periodic-message/periodic-message-modal/periodic-message-modal.component';
import { PeriodicMessageContactsModalComponent } from '../periodic-message/periodic-message-contacts-modal/periodic-message-contacts-modal.component';
import { PeriodicMessageEventModalComponent } from '../periodic-message/periodic-message-event-modal/periodic-message-event-modal.component';
import { ScheduledMessageContactModalComponent } from './scheduled-message-contact-modal/scheduled-message-contact-modal.component';
import { ScheduledMessageEventModalComponent } from './scheduled-message-event-modal/scheduled-message-event-modal.component';
import { ScheduledMessageFellowshipModalComponent } from './scheduled-message-fellowship-modal/scheduled-message-fellowship-modal.component';


export interface PeriodicElement {
    id: number,
  // port_name: string;
  sent_by: string;
  // sent_to: string;
  send_date: string;
  send_time: string;
  message: string
}

@Component({
  selector: 'app-scheduled-message',
  templateUrl: './scheduled-message.component.html',
  styleUrls: ['./scheduled-message.component.scss']
})
export class ScheduledMessageComponent implements OnInit {

  animal: string;
  message: string;
  loading: boolean;
    panelOpenState: boolean;

  displayedColumns: string[] = ['id', 'sent_by', 'sent_to', 'send_date', 'send_time', 'message', 'action'];
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private scheduledMessageService: ScheduledMessageService
  ) { }

    scheduledGroup(): void {
        const dialogRef = this.matDialog.open(ScheduledMessageComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.scheduledMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    scheduledContact(): void {
        const dialogRef = this.matDialog.open(ScheduledMessageContactModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.scheduledMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    scheduledEvent(): void {
        const dialogRef = this.matDialog.open(ScheduledMessageEventModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.scheduledMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }
    scheduledFellowship(): void {
        const dialogRef = this.matDialog.open(ScheduledMessageFellowshipModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.scheduledMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    ngOnInit() {
        this.scheduledMessage()
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    scheduledMessage() {
      this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.scheduledMessageService.gets(headers, '/alarm-messages')
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

    deleteScheduledMessage (id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.scheduledMessageService.delete(`/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.scheduledMessage();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
