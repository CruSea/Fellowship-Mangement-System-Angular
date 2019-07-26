import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduledMessageComponent } from './scheduled-message.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduledMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledMessageRoutingModule { }
