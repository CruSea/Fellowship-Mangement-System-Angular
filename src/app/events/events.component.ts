import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { EventsService } from '../services/events/events.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UpdateEventsComponent, UpdateEventsInterface } from './update-events/update-events.component';
import { EventsModalComponent } from './events-modal/events-modal.component';


export interface PeriodicElement {
  id: number;
  event_name: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  action: string
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

    animal: string;
    eventname: string;
    loading: boolean;

    displayedColumns: string[] = ['id', 'event_name', 'description', 'created_by', 'created_at', 'updated_at', 'action'];
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private eventsService: EventsService
  ) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(EventsModalComponent, {
            width: '500px',
            data: {eventname: this.eventname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.collectionOfevents();
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
    //         this.collectionOfevents();
    //         this.animal = result;
    //     });
    // }

    openUpdate(data: UpdateEventsInterface): void {
        console.log(data);
        const dialogRef = this.matDialog.open(UpdateEventsComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.collectionOfevents();
            this.animal = result;
        });
    }

    delete(uni: string) {
        console.log(uni);
    }

    ngOnInit() {
        this.collectionOfevents()
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfevents() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.eventsService.gets(headers, '/events')
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = new MatTableDataSource(res.events.data);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    deleteContact(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.eventsService.delete(`contact/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.collectionOfevents();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
