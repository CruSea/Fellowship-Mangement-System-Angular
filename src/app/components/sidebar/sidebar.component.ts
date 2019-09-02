import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { StorageService } from '../../services/storage.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/login', title: 'Login',  icon: 'how_to_reg', class: '' },
    // { path: '/register', title: 'Register',  icon: 'add', class: '' },
    { path: '/user-profile', title: 'Fellowship Profile',  icon: 'add', class: '' },
    { path: '/settings', title: 'Settings', icon: 'settings', class: '' },
    { path: '', title: 'Contacts',  icon: 'contacts', class: '' },
    { path: '', title: 'Post Graduates',  icon: 'school', class: '' },
    { path: '', title: 'Messages',  icon: 'message', class: '' },
    // { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    // { path: '/dashboard/typography', title: 'Typography',  icon: 'library_books', class: '' },
    // { path: '/dashboard/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    // { path: '/campaigns', title: 'SMS Port',  icon: 'textsms', class: '' },
    { path: '', title: 'Events',  icon: 'event_note', class: '' },
    { path: '/users', title: 'Users',  icon: 'contacts', class: '' },
    { path: '/accounts', title: 'Accounts', icon: 'account_circle', class: ''},
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  show = true;
  user: string;

  constructor(private userProfileService: UserProfileService,
              private storageService: StorageService,
        ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getUser();
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  getUser() {
      // this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.userProfileService.gets(headers, '/user')
            .subscribe((res: any) => {
                // this.loading = false;
                this.user = res.user.full_name;
            }, (httpErrorResponse: HttpErrorResponse) => {
                // this.loading = false;
            })
    }
}
