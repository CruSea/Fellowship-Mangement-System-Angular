import { Component, OnInit } from '@angular/core';
import { PostGraduatesService } from '../services/post-graduates/post-graduates.service';
import { StorageService } from '../services/storage.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export interface PeriodicElement {
  id: number;
  full_name: string;
  gender: string;
  phone: string;
  acadamid_department: string;
  graduation_year: string;
  action?: string
}

// const ELEMENT_DATA: any[] = [
//     {id:1, full_name: 'Yitages Berhanu', gender: 'male', phone: '0926323292', acadamic_department: 'Computer Engineering', graduation_year: '6/11/2012'},
// {id:2, full_name: 'Henok Yene', gender: 'male', phone: '0926784933', acadamic_department: 'Computer Engineering', graduation_year: '6/11/2012'},
// {id:3, full_name: 'Zion shimeles', gender: 'female', phone: '0915674422', acadamic_department: 'Architecture', graduation_year: '6/11/2012'}
// ];

@Component({
  selector: 'app-post-graduates',
  templateUrl: './post-graduates.component.html',
  styleUrls: ['./post-graduates.component.scss']
})
export class PostGraduatesComponent implements OnInit {

  animal: string;
  firstname: string;

    displayedColumns: string[] = ['id', 'full_name', 'gender', 'phone', 'acadamic_department', 'graduation_year', 'created_at', 'updated_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private postGraduatesService: PostGraduatesService,
      private storageService: StorageService,
  ) { }


    // openCreate(): void {
    //     const dialogRef = this.matDialog.open(ContactsModalComponent, {
    //         width: '500px',
    //         data: {firstname: this.firstname, animal: this.animal}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.collectionOfcon();
    //         this.animal = result;
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
    //         this.collectionOfcon();
    //         this.animal = result;
    //     });
    // }
    //
    // openUpdate(data: UpdateContactInterface): void {
    //     console.log(data);
    //     const dialogRef = this.matDialog.open(UpdateContactComponent, {
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
    //
    // delete(uni: string) {
    //     console.log(uni);
    // }

  ngOnInit() {
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfcon() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.postGraduatesService.gets(headers, '/post-graduates')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.contacts);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
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
        return this.postGraduatesService.delete(`contact/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.collectionOfcon();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
