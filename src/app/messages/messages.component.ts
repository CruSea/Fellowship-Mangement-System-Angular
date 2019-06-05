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
    {position: 1, message: 'Yitages', sent_to: 'Abebe', campaign: '0912342421', status:'sent', created_by: 'Addis Ababa'},
    {position: 2, message: 'Meheret', sent_to: 'Eyob', campaign: '0911374382', status:'sent', created_by: 'Hawassa'},
    {position: 3, message: 'Samson', sent_to: 'Tesfaye', campaign: '0916454563', status:'sent', created_by: 'Addis Ababa'},
    {position: 4, message: 'Bereket', sent_to: 'Berhanu', campaign: '0926757473', status:'sent', created_by: 'Adama'},
    {position: 5, message: 'Derege', sent_to: 'Worku', campaign: '0945898763', status:'sent', created_by: 'Hawassa'},
    {position: 6, message: 'Hiwot', sent_to: 'Desalgn', campaign: '0911233453', status:'sent', created_by: 'Bahirdar'},
    {position: 7, message: 'Zubeda', sent_to: 'Getachew', campaign: '0935231345', status:'sent', created_by: 'Adama'},
    {position: 8, message: 'Tsion', sent_to: 'Shimeles', campaign: '0909231278', status:'sent', created_by: 'Bahirdar'},
    {position: 9, message: 'Meseret',  sent_to: 'Batu', campaign: '0912345645', status:'sent', created_by: 'Addis Ababa'}
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
