import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { PostGraduatesGroupsService } from '../services/post-graduates-groups/post-graduates-groups.service';
import { StorageService } from '../services/storage.service';
import { GroupContactsModalComponent } from '../group-contacts/group-contacts-modal/group-contacts-modal.component';
import {
    UpdateGroupContactsComponent,
    UpdateGroupContactsInterface
} from '../group-contacts/update-group-contacts/update-group-contacts.component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PostGraduatesGroupsModalComponent } from './post-graduates-groups-modal/post-graduates-groups-modal.component';


export interface PeriodicElement {
  id: number;
  name: string;
  description: string;
  created_by?: string;
  updated_at?: string;
  action: string
}

@Component({
  selector: 'app-post-graduates-groups',
  templateUrl: './post-graduates-groups.component.html',
  styleUrls: ['./post-graduates-groups.component.scss']
})
export class PostGraduatesGroupsComponent implements OnInit {

  animal: string;
  groupname: string;
  loading: boolean;

  per_page: number;
  total: number;
  page: number;

    displayedColumns: string[] = ['id', 'name', 'description', 'created_by', 'updated_at', 'action'];
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private postGraduatesGroupsService: PostGraduatesGroupsService,
      private storageService: StorageService,
      private toastr: ToastrService
  ) { this.page = 1;}

    openCreate(): void {
        const dialogRef = this.matDialog.open(PostGraduatesGroupsModalComponent, {
            width: '500px',
            data: {groupname: this.groupname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.animal = result;
        });
    }
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
    //         this.collectionOfcon(this.page);
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
        return this.postGraduatesGroupsService.gets(headers, '/teams?page='+this.page)
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
