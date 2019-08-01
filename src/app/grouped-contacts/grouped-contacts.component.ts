import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { GroupedContactsService } from '../services/grouped_contacts/grouped-contacts.service';
// import { GroupContactsModalComponent } from '../group-contacts/group-contacts-modal/group-contacts-modal.component';
// import { UpdateContactInterface } from '../contacts/update-contact/update-contact.component';
// import { UpdateContactComponent } from '../group-contacts/update-contact/update-contact.component';
import { GroupedContactsModalComponent } from './grouped-contacts-modal/grouped-contacts-modal.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ImportContactComponent } from '../contacts/import-contact/import-contact.component';
import { UpdateGroupedContactsComponent } from './update-grouped-contacts/update-grouped-contacts.component';
import { AssignMembersComponent } from './assign-members/assign-members.component';
// import { UpdateContactComponent, UpdateContactInterface } from '../group-contacts/update-contact/update-contact.component';

// export interface PeriodicElement {
//     id: number;
//     full_name: string;
//     gender: string;
//     phone: string;
//     Acadamic_department: string;
//     // fellowship_id: number
//     // created_at: string;
//     // updated_at: string;
//     action?: string
//     groupedname: string;
//     animal: string;
// }


@Component({
  selector: 'app-grouped-contacts',
  templateUrl: './grouped-contacts.component.html',
  styleUrls: ['./grouped-contacts.component.scss']
})
export class GroupedContactsComponent implements OnInit {

    full_name: string;
    gender: string;
    id: string;
    phone: string;
    email: string;
    Acadamic_department: string;
    graduation_year: string;
    groupedname: string;
    animal: string;
    group_id: string;

    team_detail: any;


    displayedColumns: string[] = ['full_name', 'gender', 'phone', 'email', 'Acadamic_department', 'graduation_year', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;
    constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private activatedRoute: ActivatedRoute,
      private groupedContactsService: GroupedContactsService
  ) {
        this.group_id = activatedRoute.snapshot.params.id;
    }

    openCreate(): void {
        const dialogRef = this.matDialog.open(GroupedContactsModalComponent, {
            width: '500px',
            data: {groupname: this.groupedname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    assign(): void {
        const dialogRef = this.matDialog.open(AssignMembersComponent, {
            width: '500px',
            data: {gname: this.groupedname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
            this.getGroupsContactByGroupName(this.groupedname)
        });
    }

    openImportContact(): void {
        const dialogRef = this.matDialog.open(ImportContactComponent, {
            width: '1000px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    openUpdate(data: any): void {
        console.log(data);
        const dialogRef = this.matDialog.open(UpdateGroupedContactsComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    getGroupsById() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedContactsService.gets(headers, '/team/' + this.group_id)
            .subscribe((res: any) => {
                console.log(res);
                this.team_detail = res;
                // this.getGroupsContactByGroupName(this.groupedname);
                this.groupedname = res.team.name;
                this.getGroupsContactByGroupName(res.team.name)
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    getGroupsContactByGroupName(name: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedContactsService.gets(headers, '/team/members/' + name)
            .subscribe((res: any) => {
                console.log(res);
                this.dataSource = new MatTableDataSource(res.contacts.data);
                // this.team_detail = res;
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    deleteGroupedContact(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedContactsService.delete(`team/members/${this.team_detail.team.name}/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.getGroupsById();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

  ngOnInit() {
        this.getGroupsById()
  }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}

