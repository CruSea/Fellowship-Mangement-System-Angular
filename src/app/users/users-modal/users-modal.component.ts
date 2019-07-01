import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRoleInterface } from '../users';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

interface UsersModalInterface {
    full_name: string;
    email_address: string;
    phone: string;
    role: string;
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-users-modal',
    templateUrl: './users-modal.component.html',
    styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent implements OnInit {

    usersModalForm: any;
    roles: UserRoleInterface[] = [
        {type: 'owner', name: 'Owner'},
        {type: 'admin', name: 'Admin'},
        {type: 'editor', name: 'Editor'},
        {type: 'viewer', name: 'Viewer'}
    ];
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private storageService: StorageService,
        public dialogRef: MatDialogRef<UsersModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        this.usersModalForm = this.formBuilder.group({
            full_name: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            email: [null, [Validators.required]],
            role: [null, [Validators.required]],
        });
    }

    usersModal(usersModalInterface: UsersModalInterface) {
        console.log(usersModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userService.create(usersModalInterface, headers, '/user')
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}
