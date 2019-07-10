import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SettingService } from '../services/setting/setting.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

interface SettingInterface {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    @ViewChild('password_reset') private passwordReset: SwalComponent;
    @ViewChild('password_reset_error') private passwordResetError: SwalComponent;

  settingForm: any;

  constructor(
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private settingService: SettingService,
  ) { }

    // confirmPassword: any = (formControl: FormControl): { [str: string]: boolean } => {
    //   if (!formControl.value) {
    //       return { required: true }
    //   } else if (formControl.value !== this.settingForm.controls.new_password.value) {
    //       return { confirm_password: true, error: true };
    //   }
    // }

  ngOnInit() {
      this.settingForm = this.formBuilder.group({
          new_password: [null, [Validators.required, Validators.minLength(6)]],
          old_password: [null],
          confirm_password: [null, [Validators.required]]
      });
  }


  setting(settingInterface: SettingInterface) {
      console.log(settingInterface);
      // if (this.settingForm.get('confirm_password').invalid) { return; }
      // delete settingInterface.confirm_password;
      const headers = new HttpHeaders()
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'PATCH')
          .append('X-Requested-With', 'XMLHttpRequest')
          .append('Access-Control-Allow-Headers', 'Content-Type')
          .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      this.httpClient.patch('http://localhost:3232/api/user/editPassword', settingInterface,
          { headers: headers })
          .subscribe((res: any) => {
              console.log(res);
              if (res.error) {
                  this.passwordResetError.show()
              } else {
                  this.passwordReset.show();
              }
              },
              (httpErrorResponse: HttpErrorResponse) => { console.log(httpErrorResponse)})
  }

}
