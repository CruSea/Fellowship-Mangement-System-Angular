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
import { UpdateCampaignsComponent } from './update-campaigns/update-campaigns.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialsModule,
        HttpClientModule,
        NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle}),
        ConfirmationPopoverModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        CampaignsRoutingModule
    ],
    declarations: [CampaignsComponent, CampaignsModalComponent, UpdateCampaignsComponent ],
    providers: [StorageService, SmsPortService],
    entryComponents: [ CampaignsModalComponent, UpdateCampaignsComponent ]
})
export class CampaignsModule { }
