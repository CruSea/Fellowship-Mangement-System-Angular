import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact/contact.service';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events/events.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateContactInterface } from '../../contacts/update-contact/update-contact.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export interface UpdateEventsInterface {
    events_name: string;
    description: string;
    created_by: string
}

@Component({
  selector: 'app-update-events',
  templateUrl: './update-events.component.html',
  styleUrls: ['./update-events.component.scss']
})
export class UpdateEventsComponent implements OnInit {

  updateEventsForm: any;

  constructor(
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private eventsService: EventsService,
      public dialogRef: MatDialogRef<UpdateEventsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: UpdateEventsInterface) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit(): void {
      console.log(this.data);
      this.updateEventsForm = this.formBuilder.group({
          events_name: [this.data.events_name, [Validators.required]],
          description: [this.data.description, [Validators.required]],
          created_by: [this.data.created_by, [Validators.required]],
          // acadamic_department: [this.data.Acadamic_department, [Validators.required]],
          // fellowship_id: [this.data.fellowship_id, [Validators.required]],
      });
  }

    updateEvent(eventsModalInterface: UpdateEventsInterface) {
        console.log(eventsModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.eventsService.patch(`contact/${this.data}`, eventsModalInterface, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
