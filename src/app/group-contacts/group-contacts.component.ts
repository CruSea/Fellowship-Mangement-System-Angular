import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { GroupContactsModalComponent } from './group-contacts-modal/group-contacts-modal.component';
import { UpdateContactInterface } from '../contacts/update-contact/update-contact.component';
import { StorageService } from '../services/storage.service';
import { TeamService } from '../services/team/team.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UpdateGroupContactsComponent, UpdateGroupContactsInterface } from './update-group-contacts/update-group-contacts.component';

export interface PeriodicElement {
    id: number;
    name: string;
    // description: string
    // number_of_contacts?: number;
    // fellowship_id: number;
    created_by: string;
    updated_by?: string;
    action?: string
    // university: string;
    // phone: string;
}


@Component({
  selector: 'app-group-contacts',
  templateUrl: './group-contacts.component.html',
  styleUrls: ['./group-contacts.component.scss']
})
export class GroupContactsComponent implements OnInit {

    animal: string;
    groupname: string;
    loading: boolean;

    per_page: number;
    total: number;
    page: number;


    displayedColumns: string[] = ['id', 'name', 'description','created_by', 'created_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

    constructor(
        private matDialog: MatDialog,
        private teamService: TeamService,
        private storageService: StorageService,
        private toastr: ToastrService
    ) { this.page = 1;}

    openCreate(): void {
        const dialogRef = this.matDialog.open(GroupContactsModalComponent, {
            width: '500px',
            data: {groupname: this.groupname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.animal = result;
        });
    }

    openUpdate(data: UpdateGroupContactsInterface): void {
        const dialogRef = this.matDialog.open(UpdateGroupContactsComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.animal = result;
        });
    }

    deleteContact(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.teamService.delete(`team/${id}`, headers)
            .subscribe((res: {message: string}) => {
                this.toastr.success('team deleted successfully', 'Deleted', {timeOut: 3000});
                this.collectionOfcon(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error('Ooops! something went wrong, team is not deleted', 'Error', {timeOut: 3000});
            })
    }

    collectionOfcon(e) {
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
        return this.teamService.gets(headers, '/teams?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.dataSource = new MatTableDataSource(res.teams.data);
                this.dataSource = res.teams.data;
                this.per_page = res.teams.per_page;
                this.total = res.teams.total;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    ngOnInit() {
        this.collectionOfcon(this.page)
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
