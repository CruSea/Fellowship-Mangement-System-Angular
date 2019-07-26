import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SettingService } from '../services/setting/setting.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

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
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private settingService: SettingService,
  ) { }

  ngOnInit() {
      this.settingForm = this.formBuilder.group({
          name: [null, [Validators.required]],
          value: [null, [Validators.required]]
      });
  }


  save(settingInterface: SettingInterface) {
      console.log(settingInterface);
      const headers = new HttpHeaders()
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'POST')
          .append('X-Requested-With', 'XMLHttpRequest')
          .append('Access-Control-Allow-Headers', 'Content-Type')
          .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      this.settingService.create(settingInterface, headers, '/setting').subscribe((res: any) => {
          console.log(res);
      }, (err: HttpErrorResponse) => {
          console.log(err);
      })
  }

}
