import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsDetailComponent } from './events-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EventsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsDetailRoutingModule { }
