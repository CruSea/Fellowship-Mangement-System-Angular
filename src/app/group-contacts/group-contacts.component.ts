import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { GroupContactsModalComponent } from './group-contacts-modal/group-contacts-modal.component';
import { UpdateContactInterface } from '../contacts/update-contact/update-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';

export interface PeriodicElement {
    groupname: string;
    description: string
    position?: number;
    number_of_contacts?: number
    updated_by?: string;
    action?: string
    // university: string;
    // phone: string;
}

export let ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, groupname: 'Worship Group', description: 'it is a group where members train and lead worship in the fellowship', number_of_contacts: 20, updated_by: 'Yitages Berhanu'},
    {position: 2, groupname: 'Prayers Group', description: '', number_of_contacts: 150, updated_by: 'Zion Shimeles'},
    {position: 3, groupname: 'Bible Study Group', description: 'Bible study group is a group to learn and share bible teachings', number_of_contacts: 60, updated_by: 'Meheret Tesfaye'},
    {position: 4, groupname: 'Natanim Group', description: 'Natanim group goal is to clean the house of God', number_of_contacts: 30, updated_by: 'Yitages Berhanu'},
];

@Component({
  selector: 'app-group-contacts',
  templateUrl: './group-contacts.component.html',
  styleUrls: ['./group-contacts.component.scss']
})
export class GroupContactsComponent implements OnInit {

    animal: string;
    groupname: string;


    displayedColumns: string[] = ['position', 'groupname', 'description', 'number_of_contacts', 'updated_by', 'action'];
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
