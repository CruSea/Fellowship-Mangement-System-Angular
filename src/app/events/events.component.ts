import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { EventsService } from '../services/events/events.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UpdateEventsComponent, UpdateEventsInterface } from './update-events/update-events.component';
import { EventsModalComponent } from './events-modal/events-modal.component';


export interface PeriodicElement {
  position?: number;
  events_name: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  action: string
}

const ELEMENT_DATA: any[] = [
    {position: 1, events_name: 'Charity Day', description: 'Charity is an event for all fellow members', created_by: 'yitages berhanu', created_at: '11/5/2010', updated_at: '5/6/2011'},
    {position: 2, events_name: 'Out-reach', description: 'Out-reach is an event for all fellow members', created_by: 'Eyosiyas desta', created_at: '11/5/2010', updated_at: '5/6/2011'},
    {position: 3, events_name: 'Worship Concert', description: 'Worship concert is an event hosted by worship and choire teams', created_by: 'yitages berhanu', created_at: '11/5/2010', updated_at: '5/6/2011'},
];

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

    animal: string;
    eventname: string;

    displayedColumns: string[] = ['position', 'events_name', 'description', 'created_by', 'created_at', 'updated_at', 'action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

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
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.eventsService.gets(headers, '/contacts')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(ELEMENT_DATA);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
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
