import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { UpdateUsersComponent, UpdateUsersInterface } from './update-users/update-users.component';
import { UserRoleInterface } from '../users/users';
import { UsersService } from './users.service'


export interface PeriodicElement {
    position: number;
    full_name: string;
    email: string;
    phone: string;
    user_role: string;
    created_date: string;
    updated_date: string;
    action?: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, full_name: 'Yitages', email: 'yitages12@gmail.com', phone: '0912342421', user_role: 'Berhanu', created_date: 'Addis Ababa', updated_date: '12/3/2011'},
    {position: 2, full_name: 'Meheret', email: 'meherett@gmail.com', phone: '0911374382', user_role: 'Tesfaye', created_date: 'Hawassa', updated_date: '24/5/2011'}
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
    displayedColumns: string[] = ['position', 'full_name', 'email', 'phone', 'user_role', 'created_date', 'updated_date', 'action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    // dataSource: any;

    constructor(
        private matDialog: MatDialog,
        private usersService: UsersService
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
        console.log(id);
        this.usersService.delete(id).subscribe(res => {
            console.log(res);
        }, err => {
            console.log(err)
        })
    }

    ngOnInit() {
        this.collectionOfu()
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfu() {
        this.usersService.collectionOfUsers().subscribe((res: any) => {
            // console.log(res);
            // console.log(res.users.data);
            this.dataSource = new MatTableDataSource(res.users.data);
        }, err => {
            console.log(err);
        })
    }

}
