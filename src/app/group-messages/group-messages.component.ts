import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MatTableDataSource } from '@angular/material';
import { GroupMessagesModalComponent } from './group-messages-modal/group-messages-modal.component';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupedMessageService } from '../services/group_message/grouped-message.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PeriodicMessageContactsModalComponent } from '../periodic-message/periodic-message-contacts-modal/periodic-message-contacts-modal.component';
import { PeriodicMessageEventModalComponent } from '../periodic-message/periodic-message-event-modal/periodic-message-event-modal.component';
import { GroupMessageFellowshipModalComponent } from './group-message-fellowship-modal/group-message-fellowship-modal.component';
import { GroupMessageEventModalComponent } from './group-message-event-modal/group-message-event-modal.component';
import { GroupMessagePostgraduatesContactModalComponent } from './group-message-postgraduates-contact-modal/group-message-postgraduates-contact-modal.component';
import { GroupMessagePostgraduatesModalComponent } from './group-message-postgraduates-modal/group-message-postgraduates-modal.component';
// import { UpdateContactComponent, UpdateContactInterface } from './update-contact/update-contact.component';
// import { ImportContactComponent } from './import-contact/import-contact.component';
import { GroupMessageService } from './group-message.service';

export interface PeriodicElement {
    id?: number;
    // port_name: string;
    // team: string;
    sent_by: string;
    team_id: string;
    message: string;
    // sent_msg_count: string;
    created_at: string;
}

export interface Food {
  value: string;
  viewValue: string;
}
export interface Car {
  value: string;
  viewValue: string;
}


@Component({
    selector: 'app-group-messages',
    templateUrl: './group-messages.component.html',
    styleUrls: ['./group-messages.component.scss']
})
export class GroupMessagesComponent implements OnInit {

    foods: Food[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
      ];

    cars: Car[] = [
        {value: 'volvo', viewValue: 'Volvo'},
        {value: 'saab', viewValue: 'Saab'},
        {value: 'mercedes', viewValue: 'Mercedes'}
      ];
    animal: string;
    message: string;
    loading: boolean;
    panelOpenState: boolean;
    panelOpenPosr: boolean;

    per_page: number;
    total: number;
    page: number;

    displayedColumns: string[] = ['id', 'message', 'sent_by', 'team_id', 'created_at', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    dataSource: any;
    groupmessagesModalForm: any;
    fellowshipMessageModalForm: any;
    postGraduateGroupmessagesModalForm: any;
    smsPorts: any;
    groupNames: any;

    constructor(
                private formBuilder: FormBuilder,
                private matDialog: MatDialog,
                private storageService: StorageService,
                private groupedMessageService: GroupedMessageService,
                private toastr: ToastrService,
                private groupMessageService: GroupMessageService
        ) { this.page = 1; }

    openForGroup(): void {
        const dialogRef = this.matDialog.open(GroupMessagesModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.groupMessages(this.page);
            this.panelOpenState = false;
            this.panelOpenPosr = false;
            this.animal = result;
        });
    }

    openForFellowship(): void {
        const dialogRef = this.matDialog.open(GroupMessageFellowshipModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.groupMessages(this.page);
            this.panelOpenState = false;
            this.panelOpenPosr = false;
            this.animal = result;
        });
    }

    forevent(): void {
        const dialogRef = this.matDialog.open(GroupMessageEventModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.groupMessages(this.page);
            this.animal = result;
        });
    }

    openForPostContacts(): void {
        const dialogRef = this.matDialog.open(GroupMessagePostgraduatesContactModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.groupMessages(this.page);
            this.panelOpenPosr = false;
            this.panelOpenState = false;
            this.animal = result;
        });
    }

    openForPostTeam(): void {
        const dialogRef = this.matDialog.open(GroupMessagePostgraduatesModalComponent, {
            width: '500px',
            data: {message: this.message, animal: this.animal}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.groupMessages(this.page);
            this.panelOpenPosr = false;
            this.panelOpenState = false;
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

    // deleteGroupMessage(uni: string) {
    //     console.log(uni);
    // }

    ngOnInit() {
        this.groupMessages(this.page);
        this.getSmsPorts();
        this.getGroupName();
        this.groupmessagesModalForm = this.formBuilder.group({
            port_name: [null, [Validators.required]],
            team: [null, [Validators.required]],
            message: [null, [Validators.required]],
        });
        this.fellowshipMessageModalForm = this.formBuilder.group({
              port_name: [null, [Validators.required]],
              message: [null, [Validators.required]],
          });
        this.postGraduateGroupmessagesModalForm = this.formBuilder.group({
            port_name: [null, [Validators.required]],
            team: [null, [Validators.required]],
            message: [null, [Validators.required]],
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    groupMessages(e) {
        this.loading = true;
        if(e) {
            this.page = e;
        }
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedMessageService.gets(headers, '/team-messages?page='+this.page)
            .subscribe((res: any) => {
                this.loading = false;
                // this.dataSource = new MatTableDataSource(res.team_message.data);
                this.dataSource = res.team_message.data;
                this.per_page = res.team_message.per_page;
                this.total = res.team_message.total;
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.loading = false;
            })
    }

    removeGroupMessage (id: string) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'DELETE')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedMessageService.delete(`team-message/${id}`, headers)
            .subscribe((res: {message: string}) => {
                this.toastr.success('team message removed successfully', 'Removed');
                this.groupMessages(this.page);
            }, (httpErrorResponse: HttpErrorResponse) => {
                this.toastr.error('Ooops! something went wrong, team message is not removed', 'Error');
            })
    }

    getSmsPorts() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedMessageService.gets(headers, '/sms-ports')
            .subscribe((res: any) => {
                this.smsPorts = res.sms_ports.data;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    getGroupName() {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.groupedMessageService.gets(headers, '/teams')
            .subscribe((res: any) => {
                this.groupNames = res.teams.data;
            }, (httpErrorResponse: HttpErrorResponse) => {
            })
    }

    submitPostGraduateTeamMessage(form: NgForm) {
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);

        return this.groupMessageService.postGraduateTeamMessage(form.value.port_name, form.value.team, form.value.message)
            .subscribe(
                response => console.log(response),
                error => console.log(error),
            )
    }

}
