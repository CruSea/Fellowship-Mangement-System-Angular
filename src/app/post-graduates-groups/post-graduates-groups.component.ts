import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { PostGraduatesGroupsService } from '../services/post-graduates-groups/post-graduates-groups.service';
import { StorageService } from '../services/storage.service';
import { GroupContactsModalComponent } from '../group-contacts/group-contacts-modal/group-contacts-modal.component';
import {
    UpdateGroupContactsComponent,
    UpdateGroupContactsInterface
} from '../group-contacts/update-group-contacts/update-group-contacts.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';


export interface PeriodicElement {
  id: number;
  name: string;
  description: string;
  created_by?: string;
  updated_at?: string;
  action: string
}

const ELEMENT_DATA: any[] = [
    {id: 1, name: 'WORSHIP', description: 'this is worship team for post graduates', created_by: 'Yitages Berhanu'},
    {id: 1, name: 'PRAYER', description: 'this is prayer team for post graduates', created_by: 'Yitages Berhanu'}
];

@Component({
  selector: 'app-post-graduates-groups',
  templateUrl: './post-graduates-groups.component.html',
  styleUrls: ['./post-graduates-groups.component.scss']
})
export class PostGraduatesGroupsComponent implements OnInit {

  animal: string;
  groupname: string;

    displayedColumns: string[] = ['id', 'name', 'description', 'created_by', 'updated_at', 'action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
      private matDialog: MatDialog,
      private postGraduatesGroupsService: PostGraduatesGroupsService,
      private storageService: StorageService
  ) { }

    // openCreate(): void {
    //     const dialogRef = this.matDialog.open(GroupContactsModalComponent, {
    //         width: '500px',
    //         data: {groupname: this.groupname, animal: this.animal}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.collectionOfcon();
    //         this.animal = result;
    //     });
    // }
    //
    // openUpdate(data: UpdateGroupContactsInterface): void {
    //     console.log(data);
    //     const dialogRef = this.matDialog.open(UpdateGroupContactsComponent, {
    //         data: data,
    //         width: '500px'
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.collectionOfcon();
    //         this.animal = result;
    //     });
    // }


    deleteContact(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.postGraduatesGroupsService.delete(`team/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.collectionOfcon();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    collectionOfcon() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.postGraduatesGroupsService.gets(headers, '/teams')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.teams);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

  ngOnInit() {
      this.collectionOfcon()
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
