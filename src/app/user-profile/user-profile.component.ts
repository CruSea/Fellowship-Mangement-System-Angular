import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { MatTableDataSource } from '@angular/material';


interface UserProfileInterface {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    @ViewChild('password_reset') private passwordReset: SwalComponent;
    @ViewChild('password_reset_error') private passwordResetError: SwalComponent;
    @ViewChild('password_confirmation_error') private passwordConfirmationError: SwalComponent;

    settingForm: any;
    fellowshipForm: any;
    loading = true;

  constructor(
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private userProfileService: UserProfileService,
  ) { }

  submit(newFellowshipForm: any) {
      this.loading = true;
      console.log(newFellowshipForm);
      // if (this.settingForm.get('confirm_password').invalid) { return; }
      // delete settingInterface.confirm_password;
      const headers = new HttpHeaders()
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'PATCH')
          .append('X-Requested-With', 'XMLHttpRequest')
          .append('Access-Control-Allow-Headers', 'Content-Type')
          .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      this.httpClient.patch('http://localhost:3232/api/fellowship', newFellowshipForm,
          { headers: headers })
          .subscribe((res: any) => {
                  this.loading = false;
                  console.log(res);
              },
              (httpErrorResponse: HttpErrorResponse) => {
                  this.loading = false;
                  console.log(httpErrorResponse);
              })
  }

  ngOnInit() {
      this.getFellowship();
      this.settingForm = this.formBuilder.group({
          new_password: [null, [Validators.required, Validators.minLength(6)]],
          old_password: [null],
          confirm_password: [null, [Validators.required]]
      });
      this.fellowshipForm = this.formBuilder.group({
          university_name: [null, [Validators.required, Validators.minLength(6)]],
          university_city: [null],
          specific_place: [null, [Validators.required]]
      });
  }

    getFellowship() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/fellowship')
            .subscribe((res: any) => {
                this.loading = false;
                console.log(res)
                this.fellowshipForm.get('university_name').setValue(res.fellowship.university_name);
                this.fellowshipForm.get('university_city').setValue(res.fellowship.university_city);
                this.fellowshipForm.get('specific_place').setValue(res.fellowship.specific_place);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }


    setting(userProfileInterface: UserProfileInterface) {
      this.loading = true;
        console.log(userProfileInterface);
        // if (this.settingForm.get('confirm_password').invalid) { return; }
        // delete settingInterface.confirm_password;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'PATCH')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        this.httpClient.patch('http://localhost:3232/api/user/editPassword', userProfileInterface,
            { headers: headers })
            .subscribe((res: any) => {
                    this.loading = false;
                    console.log(res);
                    if (res.error) {
                        this.passwordResetError.show();
                    } else {
                        this.passwordReset.show();
                        this.settingForm.get('new_password').setValue('');
                        this.settingForm.get('old_password').setValue('');
                        this.settingForm.get('confirm_password').setValue('');
                    }
                },
                (httpErrorResponse: HttpErrorResponse) => {
                    this.loading = false;
                console.log(httpErrorResponse);
                    this.passwordConfirmationError.show()
            })
    }


}
