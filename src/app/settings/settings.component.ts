import { Component, OnInit } from '@angular/core';

export interface Api {
    name: string;
    api: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'api'];

  constructor() { }

  ngOnInit() {
  }

}
