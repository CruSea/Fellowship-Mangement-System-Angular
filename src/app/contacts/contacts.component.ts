import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ContactsModalComponent, ContactsModalInterface } from './contacts-modal/contacts-modal.component';
import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
import { ImportContactComponent } from './import-contact/import-contact.component';
import { ContactsService } from './contacts.service';
import { ToastrService } from 'ngx-toastr';
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
    per_page: number;
    total: number;
    page: number;



    displayedColumns: string[] = ['id', 'full_name', 'gender', 'phone', 'email', 'Acadamic_department', 'graduation_year', 'status', 'updated_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private contactsService: ContactsService,
      private contactService: ContactService,
      private storageService: StorageService,
      private toastr: ToastrService
  ) { this.page = 1; }

    openCreate(): void {
        // this.loading = true;
        const dialogRef = this.matDialog.open(ContactsModalComponent, {
            width: '500px',
            data: {firstname: this.firstname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            // this.loading = false;
            // this.loading = false;
            this.collectionOfcon(this.page);
            this.animal = result;
        });
    }

    openImportContact(): void {
        const dialogRef = this.matDialog.open(ImportContactComponent, {
            width: '1000px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.animal = result;
        });
    }

    openUpdate(data: UpdateContactInterface): void {
        const dialogRef = this.matDialog.open(UpdateContactComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfcon(this.page);
            this.animal = result;
        });
    }

    delete(uni: string) {
    }

    ngOnInit() {
      this.collectionOfcon(this.page);
  }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
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
        return this.contactService.gets(headers, '/contacts?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                this.dataSource = res.contacts.data;
                this.total = res.contacts.total;
                this.per_page = res.contacts.per_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
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
                this.toastr.success('contact deleted successfully', 'Deleted', {timeOut: 3000});
                this.collectionOfcon(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error('Ooops! something went wrong, contact is not deleted', 'Error', {timeOut: 3000});
            })
    }
}
