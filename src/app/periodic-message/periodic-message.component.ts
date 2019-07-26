import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { PeriodicMessageService } from '../services/periodic-message/periodic-message.service';
import { PeriodicMessageModalComponent } from './periodic-message-modal/periodic-message-modal.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
    position: number;
    port_name: string;
    type: string;
    start_date: string;
    end_date: string;
    sent_time: string;
    periodic_message: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, port_name: 'sms-port', type: 'weekly', start_date: '12/4/2012', end_date: '3/6/2012', sent_time: '8:00', periodic_message: 'Today is BS day'},
    {position: 2, port_name: 'sms-port', type: 'daily', start_date: '12/4/2012', end_date: '3/6/2012', sent_time: '12:00', periodic_message: 'Today is BS day'},
    {position: 3, port_name: 'sms-port', type: 'weekly', start_date: '12/4/2012', end_date: '3/6/2012', sent_time: '9:00', periodic_message: 'Today is BS day'},
];

@Component({
  selector: 'app-periodic-message',
  templateUrl: './periodic-message.component.html',
  styleUrls: ['./periodic-message.component.scss']
})
export class PeriodicMessageComponent implements OnInit {

  animal: string;
  message: string;

  displayedColumns: string[] = ['position', 'port_name', 'type', 'start_date', 'end_date', 'sent_time', 'periodic_message', 'action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);


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
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.periodicMessageService.gets(headers, '/')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.messages);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
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
        return this.periodicMessageService.delete(`/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.periodicMessage();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
