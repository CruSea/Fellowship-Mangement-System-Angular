import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { MessageModalComponent } from './message-modal/message-modal.component';
// import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
// import { ImportContactComponent } from './import-contact/import-contact.component';


export interface PeriodicElement {
    message: string;
    sent_to: string;
    status: string;
    position: number;
    created_by: string;
    campaign: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, message: 'Hellow this is to inform you', sent_to: 'Abebe Petros', campaign: '0912342421', status: 'sent', created_by: 'Yitages Berhanu'},
    {position: 2, message: 'Hey there this is to inform you that this week we will have a meeting ', sent_to: 'Eyob Bekele', campaign: '0911374382', status: 'sent', created_by: 'Meheret Tefaye'},
    {position: 3, message: 'This month is a thanks giving month', sent_to: 'Tesfaye Gezahegn', campaign: '0916454563', status: 'sent', created_by: 'Tsion Shemeles'},
];

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    animal: string;
    message: string;


    displayedColumns: string[] = ['position', 'message', 'sent_to', 'created_by', 'campaign', 'status'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    constructor(private matDialog: MatDialog) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(MessageModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    // openImportContact(): void {
    //     const dialogRef = this.matDialog.open(ImportContactComponent, {
    //         width: '1000px'
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.animal = result;
    //     });
    // }

    // openUpdate(data: UpdateContactInterface): void {
    //     console.log(data);
    //     const dialogRef = this.matDialog.open(UpdateContactComponent, {
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
