import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { DialogData } from '../contacts-modal/contacts-modal.component';

@Component({
  selector: 'app-import-contact',
  templateUrl: './import-contact.component.html',
  styleUrls: ['./import-contact.component.scss']
})
export class ImportContactComponent implements OnInit {


  constructor(
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<ImportContactComponent>
  ) { }

    onNoClick() {
        this.dialogRef.close();
    }

  ngOnInit() {
    // this.getEvent();
    // this. = this.formBuilder.group({
  }

  // importContact(importContactInterface) {
  //     console.log(importContactInterface);
  // }
}
