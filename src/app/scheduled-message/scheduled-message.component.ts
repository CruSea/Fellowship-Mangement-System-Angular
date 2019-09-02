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
import { ToastrService } from 'ngx-toastr';


export interface PeriodicElement {
    id: number;
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

  per_page: number;
  total: number;
  page: number;

  displayedColumns: string[] = ['id', 'sent_by', 'sent_to', 'send_date', 'send_time', 'message', 'action'];
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private scheduledMessageService: ScheduledMessageService,
      private toastr: ToastrService
  ) { this.page = 1;}

    scheduledGroup(): void {
        const dialogRef = this.matDialog.open(ScheduledMessageComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.scheduledMessage(this.page);
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
            this.scheduledMessage(this.page);
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
            this.scheduledMessage(this.page);
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
            this.scheduledMessage(this.page);
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    ngOnInit() {
        this.scheduledMessage(this.page)
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    scheduledMessage(e) {
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
        return this.scheduledMessageService.gets(headers, '/alarm-messages?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.dataSource = new MatTableDataSource(res.scheduled_messages.data);
                this.dataSource = res.scheduled_messages.data;
                this.per_page = res.scheduled_messages.per_page;
                this.total = res.scheduled_messages.total;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
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
        return this.scheduledMessageService.delete(`alarm-message/${id}`, headers)
            .subscribe((res: {message: string}) => {
                this.toastr.success('scheduled message deleted successfully', 'Deleted', {timeOut: 3000});
                this.scheduledMessage(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error('Ooops! something went wrong, scheduled message is not deleted', 'Error', {timeOut: 3000});
            })
    }

}
