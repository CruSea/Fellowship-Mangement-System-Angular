import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialsModule } from '../utils/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { UserService } from '../services/user/user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialsModule,
        HttpClientModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        UsersRoutingModule
    ],
    declarations: [UsersComponent, UsersModalComponent, UpdateUsersComponent],
    providers: [UserService],
    entryComponents: [ UsersModalComponent, UpdateUsersComponent, UsersComponent ]
})
export class UsersModule { }
