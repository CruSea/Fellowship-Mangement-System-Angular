import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { ContactsModalComponent } from './contacts-modal/contacts-modal.component';
import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
import { ImportContactComponent } from './import-contact/import-contact.component';


export interface PeriodicElement {
    firstname: string;
    lastname: string
    position: number;
    university: string;
    phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, firstname: 'Yitages', lastname: 'Abebe', phone: '0912342421', university: 'Addis Ababa'},
    {position: 2, firstname: 'Meheret', lastname: 'Eyob', phone: '0911374382', university: 'Hawassa'},
    {position: 3, firstname: 'Samson', lastname: 'Tesfaye', phone: '0916454563', university: 'Addis Ababa'},
    {position: 4, firstname: 'Bereket', lastname: 'Berhanu', phone: '0926757473', university: 'Adama'},
    {position: 5, firstname: 'Derege', lastname: 'Worku', phone: '0945898763', university: 'Hawassa'},
    {position: 6, firstname: 'Hiwot', lastname: 'Desalgn', phone: '0911233453', university: 'Bahirdar'},
    {position: 7, firstname: 'Zubeda', lastname: 'Getachew', phone: '0935231345', university: 'Adama'},
    {position: 8, firstname: 'Tsion', lastname: 'Shimeles', phone: '0909231278', university: 'Bahirdar'},
    {position: 9, firstname: 'Meseret',  lastname: 'Batu', phone: '0912345645', university: 'Addis Ababa'}
];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    animal: string;
    firstname: string;


    displayedColumns: string[] = ['position', 'firstname', 'lastname', 'university', 'phone', 'action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private matDialog: MatDialog) { }

    openCreate(): void {
        const dialogRef = this.matDialog.open(ContactsModalComponent, {
            width: '500px',
            data: {firstname: this.firstname, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    openImportContact(): void {
        const dialogRef = this.matDialog.open(ImportContactComponent, {
            width: '1000px'
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
