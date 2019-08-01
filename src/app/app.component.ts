import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    screenWidth: string;
    screenHeight: string;

    constructor() {
      this.getScreenSize()
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        this.screenHeight = window.innerHeight.toString() + 'px';
        this.screenWidth = '100%';
        // this.screenWidth = window.innerWidth.toString() + 'px';
    }
}
