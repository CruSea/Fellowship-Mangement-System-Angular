import { Component, Inject, OnInit } from '@angular/core';
import { UniversityInterface } from '../../register/register';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StorageService } from '../../services/storage.service';
import { GroupContactsService } from '../../services/group_contacts/group-contacts.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TeamService } from '../../services/team/team.service';
// import { ELEMENT_DATA } from '../group-contacts.component';

interface GroupContactsModalInterface {
    name: string;
    description: string;
    // phone: string;
    // university: string;
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
        public dialogRef: MatDialogRef<GroupContactsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        this.groupContactsModalForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]],
            // phone: [null, [Validators.required]],
            // university: [null, [Validators.required]],
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
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
