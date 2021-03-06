import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { UpdateUsersComponent, UpdateUsersInterface } from './update-users/update-users.component';
// import { UserRoleInterface } from '../users/users';
import { UserService } from '../services/user/user.service';
import { StorageService } from '../services/storage.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


export interface PeriodicElement {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    password?: string;
    roles: string;
    created_at?: string;
    updated_at?: string;
    action?: string;
}


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

    animal: string;
    firstname: string;
    loading: boolean;

    per_page: number;
    total: number;
    page: number;


    // displayedColumns: string[] = ['position', 'firstname', 'lastname', 'user_role', 'phone', 'action'];
    displayedColumns: string[] = ['id', 'full_name', 'email', 'phone', 'created_at', 'roles', 'updated_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;

    constructor(
        private matDialog: MatDialog,
        private userService: UserService,
        private storageService: StorageService,
        private toastr: ToastrService
    ) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(UsersModalComponent, {
            width: '500px',
            data: {firstname: this.firstname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.collectionOfu(this.page);
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
        const dialogRef = this.matDialog.open(UpdateUsersComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.collectionOfu(this.page);
            this.animal = result;
        });
    }

    deleteUser(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userService.delete(`user/${id}`, headers)
            .subscribe((res: {message: string}) => {
                this.toastr.success('user deleted successfully', 'Deleted', {timeOut: 3000});
                this.collectionOfu(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse);
                this.toastr.error(httpErrorResponse.error.message, 'Error', {timeOut: 3000});
            })
    }

    ngOnInit() {
        this.collectionOfu(this.page)
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfu(e) {
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
        return this.userService.gets(headers, '/users?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.dataSource = new MatTableDataSource(res.users.data);
                this.dataSource = res.users.data;
                this.per_page = res.users.per_page;
                this.total = res.users.total;
                console.log(res);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}
