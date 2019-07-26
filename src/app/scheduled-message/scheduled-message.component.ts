import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { ScheduledMessageService } from '../services/scheduled-message/scheduled-message.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ScheduledMessageModalComponent } from './scheduled-message-modal/scheduled-message-modal.component';


export interface PeriodicElement {
  position: number,
  port_name: string;
  date: string;
  time: string;
  scheduled_message: string
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, port_name: 'sms-port', date: '12/6/2020', time: '12:30 am', scheduled_message: 'This is to remind you tomorrows program'},
    {position: 3, port_name: 'fellow-port', date: '3/8/2018', time: '12:30 am', scheduled_message: 'This is to remind you tomorrows program'},
    {position: 2, port_name: 'sms-port', date: '12/6/2019', time: '12:30 am', scheduled_message: 'Today is Worship day'}

];

@Component({
  selector: 'app-scheduled-message',
  templateUrl: './scheduled-message.component.html',
  styleUrls: ['./scheduled-message.component.scss']
})
export class ScheduledMessageComponent implements OnInit {

  animal: string;
  message: string;

  displayedColumns: string[] = ['position', 'port_name', 'date', 'time', 'scheduled_message', 'action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

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
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.scheduledMessageService.gets(headers, '/')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.messages);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
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
