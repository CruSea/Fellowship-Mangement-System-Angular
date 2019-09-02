import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { GroupedContactsService } from '../services/grouped_contacts/grouped-contacts.service';
import { ToastrService } from 'ngx-toastr';
import { GroupedContactsModalComponent } from './grouped-contacts-modal/grouped-contacts-modal.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ImportContactComponent } from '../contacts/import-contact/import-contact.component';
import { UpdateGroupedContactsComponent } from './update-grouped-contacts/update-grouped-contacts.component';
import { AssignMembersComponent } from './assign-members/assign-members.component';


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
    loading: boolean;

    per_page: number;
    total: number;
    page: number;


    displayedColumns: string[] = ['full_name', 'gender', 'phone', 'email', 'Acadamic_department', 'graduation_year', 'action'];
    dataSource: any;
    constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private activatedRoute: ActivatedRoute,
      private groupedContactsService: GroupedContactsService,
      private toastr: ToastrService
  ) {
        this.group_id = activatedRoute.snapshot.params.id;
        this.page = 1;
    }

    openCreate(): void {
        const dialogRef = this.matDialog.open(GroupedContactsModalComponent, {
            width: '500px',
            data: {groupname: this.groupedname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.animal = result;
        });
    }

    assign(): void {
        const dialogRef = this.matDialog.open(AssignMembersComponent, {
            width: '500px',
            data: {gname: this.groupedname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.animal = result;
            this.getGroupsContactByGroupName(this.groupedname, this.page)
        });
    }

    openImportContact(): void {
        const dialogRef = this.matDialog.open(ImportContactComponent, {
            width: '1000px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.animal = result;
        });
    }

    openUpdate(data: any): void {
        const dialogRef = this.matDialog.open(UpdateGroupedContactsComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
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
                this.team_detail = res;
                this.groupedname = res.team.name;
                this.getGroupsContactByGroupName(res.team.name, this.page)
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    getGroupsContactByGroupName(name: string, e) {
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
        return this.groupedContactsService.gets(headers, '/team/members/' + name +'?page='+ this.page)
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = res.contacts.data;
                this.per_page = res.contacts.per_page;
                this.total = res.contacts.total;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
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
                this.toastr.success('contact deleted successfully', 'Deleted', {timeOut: 3000});
                this.getGroupsById();
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error('Ooops! something went wrong, contact is not deleted', 'Error', {timeOut: 3000});
            })
    }

  ngOnInit() {
        this.getGroupsById()
  }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}

