import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { GroupedContactsService } from '../services/grouped_contacts/grouped-contacts.service';
import { GroupContactsModalComponent } from '../group-contacts/group-contacts-modal/group-contacts-modal.component';
import { UpdateContactInterface } from '../contacts/update-contact/update-contact.component';
import { UpdateContactComponent } from '../group-contacts/update-contact/update-contact.component';
import { GroupedContactsModalComponent } from './grouped-contacts-modal/grouped-contacts-modal.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
    id: number;
    full_name: string;
    gender: string;
    phone: string;
    Acadamic_department: string;
    fellowship_id: number
    created_at: string;
    updated_at: string;
    action?: string
}

const ELEMENT_DATA: any[] = [
    {id: 1, full_name: 'Yitages Berhanu', gender: 'male', phone: '0912342421', Acadamic_department: 'Computer Engineering', fellowship_id: 245, created_at: '12/4/2008', updated_at: '5/3/2011'},
    {id: 2, full_name: 'Meheret Tesfaye', gender: 'male', phone: '0911374382', Acadamic_department: 'Computer Science', fellowship_id: 25, created_at: '8/2/2009', updated_at: '5/3/2011'},
    {id: 3, full_name: 'Tsion Shimeles', gender: 'female', phone: '0916454563', Acadamic_department: 'Architecture', fellowship_id: 148, created_at: '23/6/2011', updated_at: '5/3/2011'},
];

@Component({
  selector: 'app-grouped-contacts',
  templateUrl: './grouped-contacts.component.html',
  styleUrls: ['./grouped-contacts.component.scss']
})
export class GroupedContactsComponent implements OnInit {

    animal: string;
    groupedname: string;


    displayedColumns: string[] = ['id', 'full_name', 'gender', 'phone', 'Acadamic_department', 'fellowship_id', 'created_at', 'updated_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;
    constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private groupedContactsService: GroupedContactsService
  ) { }

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

    collectionOfcon() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedContactsService.gets(headers, '/team/members')
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

  refresh() {
        this.collectionOfcon()
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}

