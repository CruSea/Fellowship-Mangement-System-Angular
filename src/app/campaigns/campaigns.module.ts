import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { MaterialsModule } from '../utils/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { CampaignsModalComponent } from './campaigns-modal/campaigns-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsService } from './campaigns.service';

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
    providers: [CampaignsService],
    entryComponents: [ CampaignsModalComponent ]
})
export class CampaignsModule { }
