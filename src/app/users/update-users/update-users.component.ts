import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
// import { UserRoleInterface } from '../../register/register';

export interface UpdateUsersInterface {
    position?: string;
    firstname: string;
    user_role: string;
    lastname: string;
    phone: string;
    university: string;
}

// export interface DialogData {
//     animal: string;
//     name: string;
// }

@Component({
    selector: 'app-update-users',
    templateUrl: './update-users.component.html',
    styleUrls: ['./update-users.component.scss']
})
export class UpdateUsersComponent implements OnInit {

    updateUsersForm: any;
    // user_role: UserRoleInterface[] = [
    //     {value: 'Addis Ababa', viewValue: 'Addis Ababa'},
    //     {value: 'Adama', viewValue: 'Adama'},
    //     {value: 'Bahirdar', viewValue: 'Bahirdar'},
    //     {value: 'Hawassa', viewValue: 'Hawassa'}
    // ];
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<UpdateUsersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UpdateUsersInterface) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        console.log(this.data);
        this.updateUsersForm = this.formBuilder.group({
            firstname: [this.data.firstname, [Validators.required]],
            lastname: [this.data.lastname, [Validators.required]],
            phone: [this.data.phone, [Validators.required]],
            user_role: [this.data.user_role, [Validators.required]],
        });
    }

    updateUsers(updateUsersInterface: UpdateUsersInterface) {
        console.log(updateUsersInterface);
    }
}