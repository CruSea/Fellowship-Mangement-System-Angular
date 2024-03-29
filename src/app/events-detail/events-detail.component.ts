import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupedContactsService } from '../services/grouped_contacts/grouped-contacts.service';
import { EventsService } from '../services/events/events.service';
import { GroupedContactsModalComponent } from '../grouped-contacts/grouped-contacts-modal/grouped-contacts-modal.component';
import { AssignMembersComponent } from '../grouped-contacts/assign-members/assign-members.component';
import { ImportContactComponent } from '../contacts/import-contact/import-contact.component';
import { UpdateGroupedContactsComponent } from '../grouped-contacts/update-grouped-contacts/update-grouped-contacts.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.scss']
})
export class EventsDetailComponent implements OnInit {

  full_name: string;
  gender: string;
  phone: string;
  email: string;
  Acadamic_department: string;
  graduation_year: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  loading: boolean;

  eventName: string;

  event_detail: any;
  event_id: string;

  per_page: number;
  total: number;
  page: number;




    displayedColumns: string[] = ['full_name', 'gender', 'phone', 'email', 'Acadamic_department',
        'graduation_year',  'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private activatedRoute: ActivatedRoute,
      private eventsService: EventsService,
      private toastr: ToastrService
  ) {
      this.event_id = activatedRoute.snapshot.params.event_id;
  }

    ngOnInit() {
        this.getEventById();
    }
       // getGroupsById() {
    //     const headers = new HttpHeaders()
    //         .append('Access-Control-Allow-Origin', '*')
    //         .append('Access-Control-Allow-Methods', 'GET')
    //         .append('X-Requested-With', 'XMLHttpRequest')
    //         .append('Access-Control-Allow-Headers', 'Content-Type')
    //         .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
    //     // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
    //     return this.eventsService.gets(headers, '/team/' + this.group_id)
    //         .subscribe((res: any) => {
    //             console.log(res);
    //             this.team_detail = res;
    //             // this.getGroupsContactByGroupName(this.groupedname);
    //             this.groupedname = res.team.name;
    //             this.getGroupsContactByGroupName(res.team.name)
    //         }, (httpErrorResponse: HttpErrorResponse) => {
    //             console.log(httpErrorResponse.status);
    //             console.log(httpErrorResponse);
    //         })
    // }

    getEventById() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        return this.eventsService.gets(headers, '/event/' + this.event_id)
            .subscribe((res: any) => {
                this.event_detail = res;
                this.eventName = res.event.event_name;
                this.EventMembers(res.event.event_name, this.page)
            }, (httpErrorResponse: HttpErrorResponse) => {
        })
    }

    EventMembers(name: string, e) {
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
        return this.eventsService.gets(headers, '/event/members/' + name +'?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.dataSource = new MatTableDataSource(res.contacts.data);
                this.dataSource = res.contacts.data;
                this.total = res.contacts.total;
                this.per_page = res.contacts.per_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    deleteEventContact(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.eventsService.delete(`event/members/${this.event_detail.event.event_name}/${id}`, headers)
            .subscribe((res: {message: string}) => {
                this.toastr.success('contact deleted successfully', 'Deleted', {timeOut: 3000});
                this.getEventById();
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error('Ooops! something went wrong, contact is not deleted', 'Error', {timeOut: 3000});
            })
    }
    // openCreate(): void {
    //     const dialogRef = this.matDialog.open(GroupedContactsModalComponent, {
    //         width: '500px',
    //         data: {groupname: this.groupedname, animal: this.animal}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }
    //
    // assign(): void {
    //     const dialogRef = this.matDialog.open(AssignMembersComponent, {
    //         width: '500px',
    //         data: {gname: this.groupedname, animal: this.animal}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //         this.getGroupsContactByGroupName(this.groupedname)
    //     });
    // }
    //
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
    //
    // openUpdate(data: any): void {
    //     console.log(data);
    //     const dialogRef = this.matDialog.open(UpdateGroupedContactsComponent, {
    //         data: data,
    //         width: '500px'
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }

 

    // getGroupsContactByGroupName(name: string) {
    //     const headers = new HttpHeaders()
    //         .append('Access-Control-Allow-Origin', '*')
    //         .append('Access-Control-Allow-Methods', 'GET')
    //         .append('X-Requested-With', 'XMLHttpRequest')
    //         .append('Access-Control-Allow-Headers', 'Content-Type')
    //         .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
    //     // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
    //     return this.eventsService.gets(headers, '/team/members/' + name)
    //         .subscribe((res: any) => {
    //             console.log(res);
    //             this.dataSource = new MatTableDataSource(res.contacts.data);
    //             // this.team_detail = res;
    //         }, (httpErrorResponse: HttpErrorResponse) => {
    //             console.log(httpErrorResponse.status);
    //             console.log(httpErrorResponse);
    //         })
    // }


}
