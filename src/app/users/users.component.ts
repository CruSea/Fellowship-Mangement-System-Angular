import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { UpdateUsersComponent, UpdateUsersInterface } from './update-users/update-users.component';
import { UserRoleInterface } from '../users/users';
import { UserService } from '../services/user/user.service';
import { StorageService } from '../services/storage.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';


export interface PeriodicElement {
    position: number;
    full_name: string;
    email: string;
    phone: string;
    password?: string;
    // user_role: string;
    created_date?: string;
    updated_date?: string;
    action?: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, full_name: 'Yitages', email: 'yitages12@gmail.com', phone: '0912342421', created_date: 'Addis Ababa', updated_date: '12/3/2011'},
    {position: 2, full_name: 'Meheret', email: 'meherett@gmail.com', phone: '0911374382', created_date: 'Hawassa', updated_date: '24/5/2011'}
];

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

    animal: string;
    firstname: string;


    // displayedColumns: string[] = ['position', 'firstname', 'lastname', 'user_role', 'phone', 'action'];
    displayedColumns: string[] = ['position', 'full_name', 'email', 'phone', 'created_date', 'updated_date', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

    constructor(
        private matDialog: MatDialog,
        private userService: UserService,
        private storageService: StorageService,
    ) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(UsersModalComponent, {
            width: '500px',
            data: {firstname: this.firstname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    // openImportUsers(): void {
    //     const dialogRef = this.matDialog.open(ImportUsersComponent, {
    //         width: '1000px'
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }

    openUpdate(data: UpdateUsersInterface): void {
        console.log(data);
        const dialogRef = this.matDialog.open(UpdateUsersComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    delete(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userService.delete(`user/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.collectionOfu();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    ngOnInit() {
        this.collectionOfu()
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfu() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userService.gets(headers, '/users')
            .subscribe((res: any) => {
                this.dataSource = new MatTableDataSource(res.users);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}
