import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { EventsService } from '../../services/events/events.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export interface EventsModalInterface {
  events_name: string;
  description: string
}

export interface DialogData {
  animal: string;
  name: string
}

@Component({
  selector: 'app-events-modal',
  templateUrl: './events-modal.component.html',
  styleUrls: ['./events-modal.component.scss']
})
export class EventsModalComponent implements OnInit {

  eventsModalForm: any;

  constructor(
      private formBuilder: FormBuilder,
      private storageService: StorageService,
      private eventsService: EventsService,
      public dialogRef: MatDialogRef<EventsModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

      onNoClick(): void {
          this.dialogRef.close()
      }
  ngOnInit(): void {
      this.eventsModalForm = this.formBuilder.group({
          events_name: [null, [Validators.required]],
          // gender: [null, [Validators.required]],
          description: [null, [Validators.required]],
          // acadamic_department: [null, [Validators.required]],
      });
  }

    eventsModal(eventsModalInterface: EventsModalInterface) {
        console.log(eventsModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.eventsService.create(eventsModalInterface, headers, '/contact')
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
