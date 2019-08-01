import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
// import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { SettingsComponent } from '../../settings/settings.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',          component: DashboardComponent },
    { path: 'user-profile',       loadChildren: '../../user-profile/user-profile.module#UserProfileModule' },
    { path: 'table-list',         component: TableListComponent },
    { path: 'typography',         component: TypographyComponent },
    { path: 'icons',              component: IconsComponent },
    // { path: 'notifications',   component: NotificationsComponent },
    { path: 'upgrade',            component: UpgradeComponent },
    { path: 'contacts',                       loadChildren: '../../contacts/contacts.module#ContactsModule' },
    { path: 'post-graduates',                 loadChildren: '../../post-graduates/post-graduates.module#PostGraduatesModule' },
    { path: 'post-graduates-groups',          loadChildren: '../../post-graduates-groups/post-graduates-groups.module#PostGraduatesGroupsModule' },
    // { path: 'grouped-contacts',               loadChildren: '../../grouped-contacts/grouped-contacts.module#GroupedContactsModule' },
    // { path: 'post-graduates-groups-detail',   loadChildren: '../../post-graduates-groups-detail/post-graduates-groups-detail.module#PostGraduatesGroupsDetailModule' },
    { path: 'settings',           loadChildren: '../../settings/settings.module#SettingsModule' },
    { path: 'users',              loadChildren: '../../users/users.module#UsersModule' },
    { path: 'campaigns',          loadChildren: '../../campaigns/campaigns.module#CampaignsModule' },
    { path: 'events',             loadChildren: '../../events/events.module#EventsModule' },
    { path: 'messages',           loadChildren: '../../messages/messages.module#MessagesModule' },
    { path: 'group-contacts',     loadChildren: '../../group-contacts/group-contacts.module#GroupContactsModule' },
    { path: 'received-messages',  loadChildren: '../../received-messages/received-messages.module#ReceivedMessagesModule' },
    { path: 'periodic-message',   loadChildren: '../../periodic-message/periodic-message.module#PeriodicMessageModule' },
    { path: 'scheduled-message',   loadChildren: '../../scheduled-message/scheduled-message.module#ScheduledMessageModule' },
    { path: 'group-messages',     loadChildren: '../../group-messages/group-messages.module#GroupMessagesModule' },
];
