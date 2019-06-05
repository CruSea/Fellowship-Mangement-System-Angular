import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
    position?: number;
    message: string;
    sent_from: string
    sms_port: number;
    date_time: string
    // university: string;
    // phone: string;
}

export let ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, message: 'Tnx For your notice', sent_from: 'Yitages Berhanu', sms_port: 23, date_time: '12/4/2010'},
    {position: 2, message: 'Ok', sent_from: 'Meheret Tesfaye', sms_port: 234, date_time: '26/7/2010'},
    {position: 3, message: 'I will inform you thank you', sent_from: 'Tsion Shemeles', sms_port: 1256, date_time: '12/2/2011'},
    {position: 4, message: 'It is my privilege thank you sir', sent_from: 'Samson Worku', sms_port: 1092, date_time: '1/5/2011'},
    // {position: 5, groupname: 'Derege', description: 'Worku'},
    // {position: 6, groupname: 'Hiwot', description: 'Desalgn'},
    // {position: 7, groupname: 'Zubeda', description: 'Getachew'},
    // {position: 8, groupname: 'Tsion', description: 'Shimeles'},
    // {position: 9, groupname: 'Meseret',  description: 'Batu'}
];

@Component({
    selector: 'app-received-messages',
    templateUrl: './received-messages.component.html',
    styleUrls: ['./received-messages.component.scss']
})
export class ReceivedMessagesComponent implements OnInit {

    animal: string;
    groupname: string;


    displayedColumns: string[] = ['position', 'message', 'sent_from', 'sms_port', 'date_time'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    constructor(private matDialog: MatDialog) { }

    // openCreate(): void {
    //     const dialogRef = this.matDialog.open(GroupContactsModalComponent, {
    //         width: '500px',
    //         data: {groupname: this.groupname, animal: this.animal}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }
    //
    // openUpdate(data: ReceivedMessagesInterface): void {
    //     console.log(data);
    //     const dialogRef = this.matDialog.open(ReceivedMessagesComponent, {
    //         data: data,
    //         width: '500px'
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }
    //
    // delete(uni: string){
    //     console.log(uni);
    // }

    ngOnInit() {
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
