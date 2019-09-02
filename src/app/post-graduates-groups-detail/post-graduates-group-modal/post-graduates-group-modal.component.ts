import { Component, Inject, OnInit } from '@angular/core';
import { UniversityInterface } from '../../register/register';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StorageService } from '../../services/storage.service';
import { GroupContactsService } from '../../services/group_contacts/group-contacts.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PostGraduatesGroupsService } from '../../services/post-graduates-groups/post-graduates-groups.service';
// import { TeamService } from '../../services/team/team.service';
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
  selector: 'app-post-graduates-group-modal',
  templateUrl: './post-graduates-group-modal.component.html',
  styleUrls: ['./post-graduates-group-modal.component.scss']
})
export class PostGraduatesGroupModalComponent implements OnInit {

	groupContactsModalForm: any;
  constructor(
  		private formBuilder: FormBuilder,
        private storageService: StorageService,
        private postGraduatesGroupsService: PostGraduatesGroupsService,
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<PostGraduatesGroupModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
		
	onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit() {
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
        return this.postGraduatesGroupsService.create(groupContactsModalInterface, headers, '/team')
            .subscribe((res: {message: string}) => {
                this.dialogRef.close();
                this.toastr.success('new team added successfully', 'Team', {timeOut: 3000});
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error(httpErrorResponse.error.error, 'Error', {timeOut: 10000});
            })
    }

}
