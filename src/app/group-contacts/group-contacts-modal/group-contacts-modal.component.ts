import { Component, Inject, OnInit } from '@angular/core';
import { UniversityInterface } from '../../register/register';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StorageService } from '../../services/storage.service';
import { GroupContactsService } from '../../services/group_contacts/group-contacts.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TeamService } from '../../services/team/team.service';
// import { ELEMENT_DATA } from '../group-contacts.component';
import { ToastrService } from 'ngx-toastr';

interface GroupContactsModalInterface {
    name: string;
    description: string;
}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
  selector: 'app-group-contacts-modal',
  templateUrl: './group-contacts-modal.component.html',
  styleUrls: ['./group-contacts-modal.component.scss']
})
export class GroupContactsModalComponent implements OnInit {

    groupContactsModalForm: any;
    // universities: UniversityInterface[] = [
    //     {value: 'Addis Abeba', viewValue: 'Addis Abeba'},
    //     {value: 'Adama', viewValue: 'Adama'},
    //     {value: 'Bahirdar', viewValue: 'Bahirdar'},
    //     {value: 'Hawassa', viewValue: 'Hawassa'}
    // ];
    constructor(
        private formBuilder: FormBuilder,
        private storageService: StorageService,
        private teamService: TeamService,
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<GroupContactsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.groupContactsModalForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]],
        });
    }

    groupContactsModal(groupContactsModalInterface: GroupContactsModalInterface) {
        console.log(groupContactsModalInterface);
        // ELEMENT_DATA.push(groupContactsModalInterface)
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.teamService.create(groupContactsModalInterface, headers, '/team')
            .subscribe((res: {message: string}) => {
                this.dialogRef.close();
                this.toastr.success('new team added successfully', 'Team', {timeOut: 3000});
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error(httpErrorResponse.error.error, 'Error', {timeOut: 10000});
            })
    }

}
