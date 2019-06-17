import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { ContactsModalComponent } from './contacts-modal/contacts-modal.component';
import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
import { ImportContactComponent } from './import-contact/import-contact.component';
import { ContactsService } from './contacts.service';


export interface PeriodicElement {
    id: number;
    full_name: string;
    gender: string
    phone: string;
    Academic_department: string;
    fellowship_id: string;
    created_at: string;
    updated_at: string;
    action?: string
}

const ELEMENT_DATA: PeriodicElement[] = [
    {id: 1, full_name: 'Yitages Berhanu', gender: 'male', phone: '0912342421', Academic_department: 'Computer Engineering', fellowship_id: '245', created_at: '12/4/2008', updated_at: '5/3/2011'},
    {id: 2, full_name: 'Meheret Tesfaye', gender: 'male', phone: '0911374382', Academic_department: 'Computer Science', fellowship_id: '825', created_at: '8/2/2009', updated_at: '5/3/2011'},
    {id: 3, full_name: 'Tsion Shimeles', gender: 'female', phone: '0916454563', Academic_department: 'Architecture', fellowship_id: '148', created_at: '23/6/2011', updated_at: '5/3/2011'},
];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    animal: string;
    firstname: string;


    displayedColumns: string[] = ['id', 'full_name', 'gender', 'phone', 'Academic_department', 'fellowship_id', 'created_at', 'updated_at', 'action'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    // dataSource: any;

  constructor(private matDialog: MatDialog,
              private contactsService: ContactsService
  ) { }

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
      this.collectionOfcon()
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    collectionOfcon() {
      this.contactsService.collectionofContacts().subscribe((res: any) => {
          // console.log(res.contacts.data);
          this.dataSource = new MatTableDataSource(res.contacts.data);
      }, err => {
          console.log(err);
      
      })
    }
    
}
