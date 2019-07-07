import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './campaigns.component';
import { MaterialsModule } from '../utils/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { CampaignsModalComponent } from './campaigns-modal/campaigns-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { CampaignsRoutingModule } from './campaigns-routing.module';
// import { CampaignsService } from './campaigns.service';
import { StorageService } from '../services/storage.service';
import { SmsPortService } from '../services/sms-port/sms-port.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialsModule,
        HttpClientModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        CampaignsRoutingModule
    ],
    declarations: [CampaignsComponent, CampaignsModalComponent ],
    providers: [StorageService, SmsPortService],
    entryComponents: [ CampaignsModalComponent ]
})
export class CampaignsModule { }
