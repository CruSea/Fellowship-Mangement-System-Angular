import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostGraduatesGroupsComponent } from './post-graduates-groups.component';

const routes: Routes = [
  {
    path: '',
    component: PostGraduatesGroupsComponent
  },
    {
        path: ':post_graduates_groups_id',
        loadChildren: '../post-graduates-groups-detail/post-graduates-groups-detail.module#PostGraduatesGroupsDetailModule'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostGraduatesGroupsRoutingModule { }
