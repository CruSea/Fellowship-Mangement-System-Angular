import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserProfileService } from '../services/user-profile/user-profile.service';


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

  constructor(
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private userProfileService: UserProfileService,
  ) { }

  ngOnInit() {
      this.settingForm = this.formBuilder.group({
          new_password: [null, [Validators.required, Validators.minLength(6)]],
          old_password: [null],
          confirm_password: [null, [Validators.required]]
      });
  }

    setting(userProfileInterface: UserProfileInterface) {
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
                console.log(httpErrorResponse);
                    this.passwordConfirmationError.show()
            })
    }


}
