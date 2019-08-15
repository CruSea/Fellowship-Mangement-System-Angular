import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupedContactsService } from '../../services/grouped_contacts/grouped-contacts.service';
import { StorageService } from '../../services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PostGraduatesGroupsService } from '../../services/post-graduates-groups/post-graduates-groups.service';

export interface AssignInterface {
   sent_to: string;
}

export interface DialogData {
    animal: string;
    gname: string;
}

@Component({
  selector: 'app-assing-post-graduates',
  templateUrl: './assing-post-graduates.component.html',
  styleUrls: ['./assing-post-graduates.component.scss']
})
export class AssingPostGraduatesComponent implements OnInit {

    assignModalForm: any;

  constructor(
      private formBuilder: FormBuilder,
      private postGraduatesGroupsService: PostGraduatesGroupsService,
      private storageService: StorageService,
      public dialogRef: MatDialogRef<AssingPostGraduatesComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

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
        return this.postGraduatesGroupsService.create(assignInterface, headers, '/team/members/' + this.data.gname.toString())
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
