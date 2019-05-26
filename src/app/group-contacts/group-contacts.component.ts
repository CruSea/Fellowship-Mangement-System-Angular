import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { GroupContactsModalComponent } from './group-contacts-modal/group-contacts-modal.component';
import { UpdateContactInterface } from '../contacts/update-contact/update-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';

export interface PeriodicElement {
    groupname: string;
    description: string
    position?: number;
    // university: string;
    // phone: string;
}

export let ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, groupname: 'Worship Group', description: 'it is a group where members train and lead worship in the fellowship'},
    {position: 2, groupname: 'Prayers Group', description: ''},
    {position: 3, groupname: 'Bible Study Group', description: 'Bible study group is a group to learn and share bible teachings'},
    {position: 4, groupname: 'Natanim Group', description: 'Natanim group goal is to clean the house of God'},
    // {position: 5, groupname: 'Derege', description: 'Worku'},
    // {position: 6, groupname: 'Hiwot', description: 'Desalgn'},
    // {position: 7, groupname: 'Zubeda', description: 'Getachew'},
    // {position: 8, groupname: 'Tsion', description: 'Shimeles'},
    // {position: 9, groupname: 'Meseret',  description: 'Batu'}
];

@Component({
  selector: 'app-group-contacts',
  templateUrl: './group-contacts.component.html',
  styleUrls: ['./group-contacts.component.scss']
})
export class GroupContactsComponent implements OnInit {

    animal: string;
    groupname: string;


    displayedColumns: string[] = ['position', 'groupname', 'description', 'action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    constructor(private matDialog: MatDialog) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(GroupContactsModalComponent, {
            width: '500px',
            data: {groupname: this.groupname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    openUpdate(data: UpdateContactInterface): void {
        console.log(data);
        const dialogRef = this.matDialog.open(UpdateContactComponent, {
            data: data,
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    delete(uni: string){
        console.log(uni);
    }

    ngOnInit() {
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
