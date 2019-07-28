import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact/contact.service';
import { StorageService } from '../../services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ContactsModalInterface } from '../grouped-contacts-modal/grouped-contacts-modal.component';
import { GroupedContactsService } from '../../services/grouped_contacts/grouped-contacts.service';


export interface AssignInterface {
    sent_to: string;
}

export interface DialogData {
    animal: string;
    gname: string;
}

@Component({
  selector: 'app-assign-members',
  templateUrl: './assign-members.component.html',
  styleUrls: ['./assign-members.component.scss']
})
export class AssignMembersComponent implements OnInit {

    assignModalForm: any;

  constructor(private formBuilder: FormBuilder,
              private groupedContactsService: GroupedContactsService,
              private storageService: StorageService,
              public dialogRef: MatDialogRef<AssignMembersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.assignModalForm = this.formBuilder.group({
        sent_to: [null, Validators.required]
    });
  }

    assingMembers(assignInterface: AssignInterface) {
        console.log(assignInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedContactsService.create(assignInterface, headers, '/team/members/' + this.data.gname.toString())
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
