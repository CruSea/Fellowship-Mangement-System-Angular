import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SettingService } from '../services/setting/setting.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

interface SettingInterface {
    name: string;
    value: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingForm: any;

  constructor(
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private settingService: SettingService,
  ) { }

  ngOnInit() {
      this.settingForm = this.formBuilder.group({
          name: [null],
          value: [null]
      });
  }

  setting(settingInterface: SettingInterface) {
      console.log(settingInterface);
      const headers = new HttpHeaders()
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'DELETE')
          .append('X-Requested-With', 'XMLHttpRequest')
          .append('Access-Control-Allow-Headers', 'Content-Type')
          .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      this.settingService.create(settingInterface, headers, '/setting')
          .subscribe((res: any) => { console.log(res)},
              (httpErrorResponse: HttpErrorResponse) => { console.log(httpErrorResponse)})
  }

}
