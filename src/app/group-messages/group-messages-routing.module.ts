import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupMessagesComponent } from './group-messages.component';

const routes: Routes = [
  {
    path: '',
    component: GroupMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupMessagesRoutingModule { }
