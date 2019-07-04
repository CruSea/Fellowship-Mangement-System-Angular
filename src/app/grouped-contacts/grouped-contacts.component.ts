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

export interface PeriodicElement {
    id: number;
    full_name: string;
    gender: string;
    phone: string;
    Acadamic_department: string;
    // fellowship_id: number
    // created_at: string;
    // updated_at: string;
    action?: string
}


@Component({
  selector: 'app-grouped-contacts',
  templateUrl: './grouped-contacts.component.html',
  styleUrls: ['./grouped-contacts.component.scss']
})
export class GroupedContactsComponent implements OnInit {

    animal: string;
    groupedname: string;
    group_id: string;


    team_detail: any;


    displayedColumns: string[] = ['id', 'full_name', 'gender', 'phone', 'created_at', 'updated_at', 'action'];
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

    // openUpdate(data: UpdateContactInterface): void {
    //     console.log(data);
    //     const dialogRef = this.matDialog.open(UpdateContactComponent, {
    //         data: data,
    //         width: '500px'
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }

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
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

  ngOnInit() {
        this.getGroupsById()
  }

  refresh() {
        this.getGroupsById()
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}

