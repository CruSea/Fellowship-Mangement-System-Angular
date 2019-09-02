import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { RegistrationKeyService } from '../services/registration-key/registration-key.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface registrationKeyInterface {
    id: number;
    key: string;
    type: string;
    event: string;
    success_message: string;
    registration_end_date: string;
    created_by: string;
    created_at: string;
    
}

@Component({
  selector: 'app-registration-key',
  templateUrl: './registration-key.component.html',
  styleUrls: ['./registration-key.component.scss']
})
export class RegistrationKeyComponent implements OnInit {

  constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private activatedRoute: ActivatedRoute,
      private registrationKeyService: RegistrationKeyService,
      private toastr: ToastrService,
      private formBuilder: FormBuilder
    ) { this.page = 1}

	displayedColumns: string[] = ['id', 'key', 'type', 'event', 'success_message', 'registration_end_date', 'created_by', 'created_at', 'action'];
	dataSource: any;
	total: number;
	per_page: number;
	current_page: number = 1;
  page: number;
  loading: boolean;
  
  // registerForm
  registerForm: FormGroup;
  submitted = false;

  ngOnInit() {
  	this.registrationKeys(this.page);
    this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
  }

  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)')
    }
  registrationKeys(e) {
      this.loading = true;
      if(e) {
        this.page = e;
      }
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.registrationKeyService.gets(headers, '/registration-keys?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.dataSource = new MatTableDataSource(res.registration_key.data);
                this.dataSource = res.registration_key.data;
                this.total = res.registration_key.total;
                this.per_page = res.registration_key.per_page;
                this.current_page = res.registration_key.current_page;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    deleteRegistrationKey(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.registrationKeyService.delete(`registration-key/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.toastr.success('registration key successfully deleted', 'Deleted', {timeOut: 3000});
                this.registrationKeys(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
              this.toastr.error('Ooops! something went wrong, key is not deleted', 'Error', {timeOut: 3000});
            })
    }

}
