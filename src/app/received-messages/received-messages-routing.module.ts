import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceivedMessagesComponent } from './received-messages.component';

const routes: Routes = [
  {
    path: '',
    component: ReceivedMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivedMessagesRoutingModule { }
