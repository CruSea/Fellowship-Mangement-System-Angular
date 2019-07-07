import { Component, OnInit } from '@angular/core';

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
    { path: '/user-profile', title: 'My Profile',  icon: 'person', class: '' },
    { path: '/settings', title: 'Settings', icon: 'settings', class: '' },
    { path: '', title: 'Contacts',  icon: 'contacts', class: '' },
    { path: '', title: 'Messages',  icon: 'message', class: '' },
    { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    // { path: '/dashboard/typography', title: 'Typography',  icon: 'library_books', class: '' },
    // { path: '/dashboard/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },
    { path: '/campaigns', title: 'SMS Port',  icon: 'textsms', class: '' },
    { path: '/users', title: 'User',  icon: 'account_circle', class: '' },
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

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
