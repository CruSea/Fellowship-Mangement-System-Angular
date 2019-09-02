import { Component, Inject, OnInit } from '@angular/core';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MAT_DIALOG_DATA,
    MatDatepicker,
    MatDialogRef
} from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { MY_FORMATS } from '../../contacts/contacts-modal/contacts-modal.component';
import { GenderInterface } from '../../contacts/contacts';
// import { GenderInterface } from '../../contacts';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { StorageService } from '../../services/storage.service';
import { PostGraduatesService } from '../../services/post-graduates/post-graduates.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const moment = _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY',
    },
    display: {
        dateInput: 'YYYY'
    },
};


export interface PostGraduatesModalInterface {
    full_name: string;
    phone: string;
    gender: string;
    email: string;
    team: string;
    graduation_year: string;
    acadamic_department: string;

}

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
  selector: 'app-post-graduates-modal',
  templateUrl: './post-graduates-modal.component.html',
  styleUrls: ['./post-graduates-modal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class PostGraduatesModalComponent implements OnInit {

    groupNames: any;
    postGraduatesModalForm: any;
    genders: GenderInterface[] = [
        {type: 'male', name: 'Male'},
        {type: 'female', name: 'Female'},
    ];

    date = new FormControl(moment());
    chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
        datepicker.close();
    }

  constructor(
      private formBuilder: FormBuilder,
      private postGraduatesService: PostGraduatesService,
      private storageService: StorageService,
      private toastr: ToastrService,
      public dialogRef: MatDialogRef<PostGraduatesModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit(): void {
      this.getGroupName();
      this.postGraduatesModalForm = this.formBuilder.group({
          full_name: [null, [Validators.required]],
          gender: [null, [Validators.required]],
          phone: [null, [Validators.required]],
          team: [null, []],
          acadamic_department: [null, [Validators.required]],
          email: [null, []],
          graduation_year: [null, [Validators.required]],
      });
  }

    postGraduatesModal(postGraduatesModalInterface: PostGraduatesModalInterface) {
        postGraduatesModalInterface['graduation_year'] = moment(this.date.value.toString()).year().toString();
        console.log(postGraduatesModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.postGraduatesService.create(postGraduatesModalInterface, headers, '/post-graduate')
            .subscribe((res: {message: string}) => {
                this.dialogRef.close();
                this.toastr.success('new post graduate member added successfully', 'Contact', {timeOut: 3000});
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error(httpErrorResponse.error.error, 'Error', {timeOut: 10000});
            })
    }

    getGroupName() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.postGraduatesService.gets(headers, '/teams')
            .subscribe((res: any) => {
                console.log(res);
                this.groupNames = res
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
