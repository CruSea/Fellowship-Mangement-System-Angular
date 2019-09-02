import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { PeriodicMessageService } from '../services/periodic-message/periodic-message.service';
import { PeriodicMessageModalComponent } from './periodic-message-modal/periodic-message-modal.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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

  per_page: number;
  total: number;
  page: number;

  displayedColumns: string[] = ['id', 'message', 'sent_to', 'start_date', 'end_date', 'sent_time',
       'created_at', 'updated_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;


    constructor(
        private matDialog: MatDialog,
        private storageService: StorageService,
        private periodicMessageService: PeriodicMessageService,
        private toastr: ToastrService
    ) { this.page = 1; }

    openCreate(): void {
        const dialogRef = this.matDialog.open(PeriodicMessageModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.periodicMessage(this.page);
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
            this.periodicMessage(this.page);
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
            this.periodicMessage(this.page);
            this.panelOpenState = false;
            this.animal = result;
        });
    }

  ngOnInit() {
        this.periodicMessage(this.page)
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    periodicMessage(e) {
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
        return this.periodicMessageService.gets(headers, '/scheduled-messages?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.dataSource = new MatTableDataSource(res.scheduled_messages.data);
                this.dataSource = res.scheduled_messages.data;
                this.per_page = res.scheduled_messages.per_page;
                this.total = res.scheduled_messages.total;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;;
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
        return this.periodicMessageService.delete(`scheduled-message/${id}`, headers)
            .subscribe((res: {message: string}) => {
                this.toastr.success('periodic message deleted successfully', 'Deleted', {timeOut: 3000});
                this.periodicMessage(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error('Ooops! something went wrong, periodic message is not deleted', 'Error', {timeOut: 3000});
            })
    }

}
