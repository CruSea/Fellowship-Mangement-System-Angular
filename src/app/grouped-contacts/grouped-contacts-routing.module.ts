import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupedContactsComponent } from './grouped-contacts.component';

const routes: Routes = [
  {
    path: '',
    component: GroupedContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupedContactsRoutingModule { }
