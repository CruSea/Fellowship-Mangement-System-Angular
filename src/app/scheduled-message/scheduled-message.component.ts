import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { ScheduledMessageService } from '../services/scheduled-message/scheduled-message.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ScheduledMessageModalComponent } from './scheduled-message-modal/scheduled-message-modal.component';


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

  displayedColumns: string[] = ['id', 'sent_by', 'sent_to', 'send_date', 'send_time', 'message', 'action'];
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private scheduledMessageService: ScheduledMessageService
  ) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(ScheduledMessageModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.scheduledMessage();
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
