import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { GroupedMessageService } from '../services/group_message/grouped-message.service';
import { RegisterationMessageService } from '../services/registeration-message/registeration-message.service';
import { GroupMessagesModalComponent } from '../group-messages/group-messages-modal/group-messages-modal.component';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RegistrationMessageGroupModalComponent } from './registration-message-group-modal/registration-message-group-modal.component';
import { RegistrationMessageContactModalComponent } from './registration-message-contact-modal/registration-message-contact-modal.component';
import { RegistrationMessageEventModalComponent } from './registration-message-event-modal/registration-message-event-modal.component';
import { RegistrationMessageFellowModalComponent } from './registration-message-fellow-modal/registration-message-fellow-modal.component';


export interface PeriodicElement {
    id?: string;
    sent_by: string;
    team_id: string;
    message: string;
    created_at: string;
}

@Component({
  selector: 'app-registeration-message',
  templateUrl: './registeration-message.component.html',
  styleUrls: ['./registeration-message.component.scss']
})
export class RegisterationMessageComponent implements OnInit {

  animal: string;
  message: string;
    panelOpenState: boolean;

    displayedColumns: string[] = ['id', 'message', 'sent_by', 'team_id', 'created_at', 'action'];
    dataSource: any;

  constructor(
      private matDialog: MatDialog,
      private storageService: StorageService,
      private registerationMessageService: RegisterationMessageService
  ) { }

    forGroup(): void {
        const dialogRef = this.matDialog.open(RegistrationMessageGroupModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getRegisterationMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    forContact(): void {
        const dialogRef = this.matDialog.open(RegistrationMessageContactModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getRegisterationMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    forEvent(): void {
        const dialogRef = this.matDialog.open(RegistrationMessageEventModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getRegisterationMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    forFellowship(): void {
        const dialogRef = this.matDialog.open(RegistrationMessageFellowModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getRegisterationMessage();
            this.panelOpenState = false;
            this.animal = result;
        });
    }

  ngOnInit() {
    this.getRegisterationMessage()
  }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getRegisterationMessage() {
        // this.loading = true;
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.registerationMessageService.gets(headers, '/send-registration-messages')
            .subscribe((res: any) => {
                // this.loading = false;
                this.dataSource = new MatTableDataSource(res.registration_message.data);
                console.log(res)
            }, (httpErrorResponse: HttpErrorResponse) => {
                // this.loading = false;
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

    deleteRegistrationMessage (id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.registerationMessageService.delete(`send-registration-messages/${id}`, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.getRegisterationMessage();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }

}
