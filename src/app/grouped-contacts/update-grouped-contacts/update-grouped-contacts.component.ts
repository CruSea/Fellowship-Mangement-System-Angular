import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
// import { GroupContactsService } from '../../services/group_contacts/group-contacts.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TeamService } from '../../services/team/team.service';


export interface UpdateContactInterface {
    id: string;
    full_name: string;
    gender: string;
    phone: string;
    email: string;
    graduation_year: number;
    Acadamic_department: string;
    created_at?: string;
    updated_at?: string
}

// export interface DialogData {
//     animal: string;
//     name: string;
// }

@Component({
    selector: 'app-update-grouped-contacts',
    templateUrl: './update-grouped-contacts.component.html',
    styleUrls: ['./update-grouped-contacts.component.scss'],
    // providers: [GroupContactsService]
})
export class UpdateGroupedContactsComponent implements OnInit {

    updateGroupContactForm: any;
    // universities: UniversityInterface[] = [
    //     {value: 'Addis Ababa', viewValue: 'Addis Ababa'},
    //     {value: 'Adama', viewValue: 'Adama'},
    //     {value: 'Bahirdar', viewValue: 'Bahirdar'},
    //     {value: 'Hawassa', viewValue: 'Hawassa'}
    // ];
    constructor(
        private formBuilder: FormBuilder,
        private  teamService: TeamService,
        private  storageService: StorageService,
        public dialogRef: MatDialogRef<UpdateGroupedContactsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UpdateContactInterface) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        // this.getEvent();
        console.log(this.data);
        this.updateGroupContactForm = this.formBuilder.group({
            full_name: [this.data.full_name, [Validators.required]],
            gender: [this.data.gender, [Validators.required]],
            phone: [this.data.phone, [Validators.required]],
            Acadamic_department: [this.data.Acadamic_department, [Validators.required]],
            email: [this.data.email, [Validators.required]],
            graduation_year: [this.data.graduation_year, [Validators.required]],
            // phone: [this.data.phone, [Validators.required]],
            // university: [this.data.university, [Validators.required]],
        });
    }

    updateGroupContact(contactsModalInterface: UpdateContactInterface) {
        console.log(contactsModalInterface);
        const headers = new HttpHeaders()
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'POST')
            .append('X-Requested-With', 'XMLHttpRequest')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Authorization', `Bearer ${this.storageService.getStorage('accessToken')}`);
        // .append('Authorization', 'Bearer ' + this.storageService.getStorage('accessToken'));
        return this.teamService.patch(`contact/${this.data.id}`, contactsModalInterface, headers)
            .subscribe((res: {message: string}) => {
                console.log(res.message);
                this.dialogRef.close();
            }, (httpErrorResponse: HttpErrorResponse) => {
                console.log(httpErrorResponse.status);
                console.log(httpErrorResponse);
            })
    }
}