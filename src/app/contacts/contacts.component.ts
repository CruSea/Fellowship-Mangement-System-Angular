import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ContactsModalComponent, ContactsModalInterface } from './contacts-modal/contacts-modal.component';
import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
import { ImportContactComponent } from './import-contact/import-contact.component';
import { ContactsService } from './contacts.service';
import { ContactService } from '../services/contact/contact.service';
import { StorageService } from '../services/storage.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';


export interface PeriodicElement {
    id: number;
    full_name: string;
    gender: string;
    phone: string;
    email: string;
    Acadamic_department: string;
    status: string;
    // fellowship_id: number;
    // created_by: string;
    // created_at: string;
    // updated_at: string;
    action?: string
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    animal: string;
    firstname: string;
    loading: boolean;

    current_page: string;
    _form: string;
    last_page: string;
    next_page_url: string;
    per_page: string;
    prev_page_url: string;
    _to: string;
    total: string;


    displayedColumns: string[] = ['id', 'full_name', 'gender', 'phone', 'email', 'Acadamic_department', 'graduation_year', 'status', 'updated_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private contactsService: ContactsService,
      private contactService: ContactService,
      private storageService: StorageService,
  ) { }

    openCreate(): void {
        // this.loading = true;
        const dialogRef = this.matDialog.open(ContactsModalComponent, {
            width: '500px',
            data: {firstname: this.firstname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            // this.loading = false;
            console.log('The dialog was closed');
            // this.loading = false;
            this.collectionOfcon();
            this.animal = result;
        });
    }

    openImportContact(): void {
        const dialogRef = this.matDialog.open(ImportContactComponent, {
            width: '1000px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.collectionOfcon();
            this.animal = result;
        });
    }

    openUpdate(data: UpdateContactInterface): void {
        console.log(data);
        const dialogRef = this.matDialog.open(UpdateContactComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.collectionOfcon();
            this.animal = result;
        });
    }

    delete(uni: string) {
      console.log(uni);
    }

    ngOnInit() {
      this.collectionOfcon();
  }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfcon() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.contactService.gets(headers, '/contacts')
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = new MatTableDataSource(res.contacts.data);
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
        return this.contactService.delete(`contact/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.collectionOfcon();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}
