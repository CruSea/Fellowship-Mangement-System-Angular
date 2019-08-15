import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SettingService } from '../services/setting/setting.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

interface SettingInterface {
    // name: string;
    value: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  settingForm: any;
  loading: boolean;
  isDisabled: boolean;

  constructor(
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private settingService: SettingService,
  ) { }

  ngOnInit() {
      this.getSetting();
      this.settingForm = this.formBuilder.group({
          // name: [null, [Validators.required]],
          value: [null, [Validators.required]]
      });
  }


  save(settingInterface: SettingInterface) {
      if (this.isDisabled) {
          this.settingForm.get('value').enable();
          this.isDisabled = false;
          return;
      }
      this.loading = true;
      console.log(settingInterface);
      const headers = new HttpHeaders()
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'POST')
          .append('X-Requested-With', 'XMLHttpRequest')
          .append('Access-Control-Allow-Headers', 'Content-Type')
          .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      this.settingService.create(settingInterface, headers, '/setting').subscribe((res: any) => {
          this.loading = false;
          console.log(res);
          this.isDisabled = true;
          this.settingForm.get('value').disable();
      }, (err: HttpErrorResponse) => {
          this.loading = false;
          console.log(err);
          this.isDisabled = false;
          this.settingForm.get('value').enable();
      })
  }

    getSetting() {
        this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.settingService.gets(headers, '/settings')
            .subscribe((res: any) => {
                this.loading = false;
                if (res.settings.value) {
                    this.isDisabled = true;
                    this.settingForm.get('value').disable()
                } else {
                    this.isDisabled = false;
                    this.settingForm.get('value').enable();
                }
                console.log(res);
                this.settingForm.get('value').setValue(res.settings.value);
                // this.fellowshipForm.get('university_city').setValue(res.fellowship.university_city);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
                this.isDisabled = false;
                this.settingForm.get('value').enable();
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
