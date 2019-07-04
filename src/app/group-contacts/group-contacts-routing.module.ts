import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupContactsComponent } from './group-contacts.component';

const routes: Routes = [
  {
    path: '',
    component: GroupContactsComponent
  },
    {
        path: ':id',
        loadChildren: '../grouped-contacts/grouped-contacts.module#GroupedContactsModule'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupContactsRoutingModule { }
