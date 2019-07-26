import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { GroupContactsService } from '../../services/group_contacts/group-contacts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateContactInterface } from '../../contacts/update-contact/update-contact.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TeamService } from '../../services/team/team.service';

export interface UpdateGroupContactsInterface {
    id: string;
    name: string;
    description: string;
}

@Component({
  selector: 'app-update-group-contacts',
  templateUrl: './update-group-contacts.component.html',
  styleUrls: ['./update-group-contacts.component.scss']
})
export class UpdateGroupContactsComponent implements OnInit {

  updateGroupContactsForm: any;

  constructor(
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private teamService: TeamService,
      public dialogRef: MatDialogRef<UpdateGroupContactsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: UpdateGroupContactsInterface
  ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit(): void {
    console.log(this.data);
    this.updateGroupContactsForm = this.formBuilder.group({
        name: [this.data.name, [Validators.required]],
        description: [this.data.description, [Validators.required]]
    });
  }

    updateGroupContacts(groupContactsModalInterface: UpdateGroupContactsInterface) {
        console.log(groupContactsModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.teamService.patch(`team/${this.data.id}`, groupContactsModalInterface, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
