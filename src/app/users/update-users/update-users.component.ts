import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user/user.service';
// import { UserRoleInterface } from '../../register/register';

export interface UpdateUsersInterface {
    // position?: string;
    id: string;
    full_name: string;
    phone: string;
    role: string;
    email: string;
    // university: string;
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-update-users',
    templateUrl: './update-users.component.html',
    styleUrls: ['./update-users.component.scss']
})
export class UpdateUsersComponent implements OnInit {

    updateUsersForm: any;

    constructor(
        private formBuilder: FormBuilder,
        private storageService: StorageService,
        private userService: UserService,
        public dialogRef: MatDialogRef<UpdateUsersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UpdateUsersInterface) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        console.log(this.data);
        this.updateUsersForm = this.formBuilder.group({
            full_name: [this.data.full_name, [Validators.required]],
            phone: [this.data.phone, [Validators.required]],
            email: [this.data.email, [Validators.required]],
            role: [this.data.role, [Validators.required]],
        });
    }

    updateUsers(updateUsersInterface: UpdateUsersInterface) {
        console.log(updateUsersInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userService.patch(`user/${this.data.id}`, updateUsersInterface, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}