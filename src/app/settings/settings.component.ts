import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SettingService } from '../services/setting/setting.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { SmsPortService } from '../services/sms-port/sms-port.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';

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

  settingValue: string;
  dataSource: any;
  per_page: number;
  total: number;
  page: number;

  constructor(
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private settingService: SettingService,
      private smsPortService: SmsPortService,
      private toastr: ToastrService
  ) { this.page = 1;}

  ngOnInit() {
      this.getSetting();
      this.collectionOfSmsPorts(this.page);
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
      const headers = new HttpHeaders()
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Methods', 'POST')
          .append('X-Requested-With', 'XMLHttpRequest')
          .append('Access-Control-Allow-Headers', 'Content-Type')
          .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
      this.settingService.create(settingInterface, headers, '/setting').subscribe((res: any) => {
          this.loading = false;
          this.isDisabled = true;
          this.settingForm.get('value').disable();
      }, (err: HttpErrorResponse) => {
          this.loading = false;
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
                if (res.settings) {
                    
                    this.isDisabled = true;
                    this.settingForm.get('value').disable();
                    this.settingForm.get('value').setValue(res.settings[0].value);
                    console.log('mame' + res.settings[0].value);
                } else {
                    this.isDisabled = false;
                    this.settingForm.get('value').enable();
                }
                this.settingForm.get('value').setValue(res.settings.value);
                // this.fellowshipForm.get('university_city').setValue(res.fellowship.university_city);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
                this.isDisabled = false;
                this.settingForm.get('value').enable();
            })
    }

    collectionOfSmsPorts(e) {
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
        return this.smsPortService.gets(headers, '/sms-ports?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.dataSource = new MatTableDataSource(res.sms_ports.data);
                this.dataSource = res.sms_ports.data;
                this.per_page = res.sms_ports.per_page;
                this.total = this.total;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    deleteCampaign(id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.smsPortService.delete(`sms-port/${id}`, headers)
            .subscribe((res: {message: string}) => {
                this.toastr.success('sms port deleted successfully', 'Deleted', {timeOut: 3000});
                this.collectionOfSmsPorts(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
              this.toastr.error('Ooops! something went wrong, sms port is not deleted', 'Error', {timeOut: 3000});
            })
    }

}
