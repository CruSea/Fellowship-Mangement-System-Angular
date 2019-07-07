(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["group-messages-group-messages-module"],{

/***/ "./src/app/group-messages/group-messages-modal/group-messages-modal.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/group-messages/group-messages-modal/group-messages-modal.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--<button mat-button (click)=\"onNoClick()\">No Thanks</button>-->\r\n<!--<h1 mat-dialog-title>Hi {{data.name}}</h1>-->\r\n<!--<div mat-dialog-content>-->\r\n<!--<p>What's your favorite animal?</p>-->\r\n<!--<mat-form-field>-->\r\n<!--<input matInput [(ngModel)]=\"data.animal\">-->\r\n<!--</mat-form-field>-->\r\n<!--</div>-->\r\n\r\n<form [formGroup]=\"groupmessagesModalForm\" (ngSubmit)=\"groupmessagesModal(groupmessagesModalForm.value)\">\r\n\r\n  <mat-form-field>\r\n    <input matInput placeholder=\"Campaign\" type=\"text\" formControlName=\"campaign\">\r\n    <mat-error style=\"color: red\" *ngIf=\"groupmessagesModalForm.get('campaign').invalid && (groupmessagesModalForm.get('campaign').dirty ||\r\n      groupmessagesModalForm.get('campaign').touched) && groupmessagesModalForm.get('campaign').errors?.required\">\r\n      Please Campaign !\r\n    </mat-error>\r\n  </mat-form-field>\r\n\r\n  <!--<mat-form-field>-->\r\n  <!--<input matInput placeholder=\"Last Name\" type=\"text\" formControlName=\"lastname\">-->\r\n  <!--<mat-error style=\"color: red\" *ngIf=\"groupmessagesModalForm.get('lastname').invalid && (groupmessagesModalForm.get('lastname').dirty ||-->\r\n  <!--groupmessagesModalForm.get('lastname').touched) && !groupmessagesModalForm.get('lastname').errors?.minlength\">-->\r\n  <!--Please insert last name!-->\r\n  <!--</mat-error>-->\r\n  <!--</mat-form-field>-->\r\n\r\n  <mat-form-field>\r\n    <input matInput placeholder=\"Contact Group\" type=\"text\" formControlName=\"contact_group\">\r\n    <mat-error style=\"color: red\" *ngIf=\"groupmessagesModalForm.get('contact_group').invalid && (groupmessagesModalForm.get('contact_group').dirty ||\r\n      groupmessagesModalForm.get('contact_group').touched) && !groupmessagesModalForm.get('contact_group').errors?.minlength\">\r\n      Please select contact group!\r\n    </mat-error>\r\n  </mat-form-field>\r\n\r\n  <!--<mat-form-field>-->\r\n  <!--<mat-label>University</mat-label>-->\r\n  <!--<mat-select formControlName=\"university\">-->\r\n  <!--<mat-option *ngFor=\"let university of universities\" [value]=\"university.value\">-->\r\n  <!--{{university.viewValue}}-->\r\n  <!--</mat-option>-->\r\n  <!--</mat-select>-->\r\n  <!--</mat-form-field>-->\r\n  <mat-form-field>\r\n    <textarea matInput placeholder=\"write a message \" type=\"text\" formControlName=\"message\"></textarea>\r\n\r\n  </mat-form-field>\r\n\r\n  <!--<button mat-raised-button color=\"primary\" type=\"submit\" >Add contact</button>-->\r\n  <div mat-dialog-actions>\r\n    <button mat-button mat-raised-button color=\"primary\" type=\"submit\"  cdkFocusInitial >Send Group Message</button>\r\n    <button mat-button (click)=\"onNoClick()\">Cancel</button>\r\n  </div>\r\n</form>"

/***/ }),

/***/ "./src/app/group-messages/group-messages-modal/group-messages-modal.component.scss":
/*!*****************************************************************************************!*\
  !*** ./src/app/group-messages/group-messages-modal/group-messages-modal.component.scss ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/group-messages/group-messages-modal/group-messages-modal.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/group-messages/group-messages-modal/group-messages-modal.component.ts ***!
  \***************************************************************************************/
/*! exports provided: GroupMessagesModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupMessagesModalComponent", function() { return GroupMessagesModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var GroupMessagesModalComponent = /** @class */ (function () {
    // universities: UniversityInterface[] = [
    //     {value: 'Addis Abeba', viewValue: 'Addis Abeba'},
    //     {value: 'Adama', viewValue: 'Adama'},
    //     {value: 'Bahirdar', viewValue: 'Bahirdar'},
    //     {value: 'Hawassa', viewValue: 'Hawassa'}
    // ];
    function GroupMessagesModalComponent(formBuilder, dialogRef, data) {
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    GroupMessagesModalComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    GroupMessagesModalComponent.prototype.ngOnInit = function () {
        // this.getEvent();
        this.groupmessagesModalForm = this.formBuilder.group({
            campaign: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            contact_group: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            message: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
        });
    };
    GroupMessagesModalComponent.prototype.groupmessagesModal = function (groupmessagesModalInterface) {
        console.log(groupmessagesModalInterface);
    };
    GroupMessagesModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-group-messages-modal',
            template: __webpack_require__(/*! ./group-messages-modal.component.html */ "./src/app/group-messages/group-messages-modal/group-messages-modal.component.html"),
            styles: [__webpack_require__(/*! ./group-messages-modal.component.scss */ "./src/app/group-messages/group-messages-modal/group-messages-modal.component.scss")]
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], GroupMessagesModalComponent);
    return GroupMessagesModalComponent;
}());



/***/ }),

/***/ "./src/app/group-messages/group-messages-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/group-messages/group-messages-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: GroupMessagesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupMessagesRoutingModule", function() { return GroupMessagesRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _group_messages_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./group-messages.component */ "./src/app/group-messages/group-messages.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _group_messages_component__WEBPACK_IMPORTED_MODULE_2__["GroupMessagesComponent"]
    }
];
var GroupMessagesRoutingModule = /** @class */ (function () {
    function GroupMessagesRoutingModule() {
    }
    GroupMessagesRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], GroupMessagesRoutingModule);
    return GroupMessagesRoutingModule;
}());



/***/ }),

/***/ "./src/app/group-messages/group-messages.component.html":
/*!**************************************************************!*\
  !*** ./src/app/group-messages/group-messages.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p style=\"font-weight: bolder; font-size: x-large\"> Group Messages </p>\r\n<!--<ol>-->\r\n<!--<li>-->\r\n<!--<mat-form-field>-->\r\n<!--<input matInput [(ngModel)]=\"name\" placeholder=\"What's your name?\">-->\r\n<!--</mat-form-field>-->\r\n<!--</li>-->\r\n<!--<div class=\"create\" style=\"color: yellow; width: 100%\">-->\r\n<!--<li>-->\r\n<!--<button class=\"l1\" mat-raised-button (click)=\"openDialog()\">Create</button>-->\r\n<button style=\"margin-top: 61px; left: 15px; \" mat-raised-button (click)=\"openCreate()\"> New Group Message</button>\r\n<!--<button mat-button color=\"primary\" style=\"margin-top: 61px; left: 50px\" mat-raised-button (click)=\"openImportContact()\"> Import Contact  </button>-->\r\n<!--</li>-->\r\n<!--<li *ngIf=\"animal\">-->\r\n<!--You chose: <i>{{animal}}</i>-->\r\n<!--</li>-->\r\n<!--&lt;!&ndash;</ol>&ndash;&gt;-->\r\n<!--</div>-->\r\n\r\n<div class=\"container\">\r\n  <mat-form-field>\r\n    <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Search\">\r\n  </mat-form-field>\r\n\r\n  <table style=\"width: 100%\" mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\r\n\r\n    <!-- Position Column -->\r\n    <ng-container matColumnDef=\"position\">\r\n      <th mat-header-cell *matHeaderCellDef style=\"font-weight: bold\"> No. </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.position}} </td>\r\n    </ng-container>\r\n\r\n    <!-- Name Column -->\r\n    <ng-container matColumnDef=\"sent_message\">\r\n      <th mat-header-cell *matHeaderCellDef style=\"font-weight: bold\">Sent Message </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.sent_message}} </td>\r\n    </ng-container>\r\n\r\n    <!-- Name Column -->\r\n    <ng-container matColumnDef=\"group_name\">\r\n      <th mat-header-cell *matHeaderCellDef style=\"font-weight: bold\">Group Name </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.group_name}} </td>\r\n    </ng-container>\r\n\r\n    <!-- Weight Column -->\r\n    <ng-container matColumnDef=\"campaign_name\">\r\n      <th mat-header-cell *matHeaderCellDef style=\"font-weight: bold\"> Campaign Name </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.campaign_name}} </td>\r\n    </ng-container>\r\n\r\n    <!-- Symbol Column -->\r\n    <ng-container matColumnDef=\"sent_msg_count\">\r\n      <th mat-header-cell *matHeaderCellDef style=\"font-weight: bold\"> Sent Msg Count </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.sent_msg_count}} </td>\r\n    </ng-container>\r\n\r\n    <!-- Symbol Column -->\r\n    <ng-container matColumnDef=\"date_time\">\r\n      <th mat-header-cell *matHeaderCellDef style=\"font-weight: bold\"> Date Time </th>\r\n      <td mat-cell *matCellDef=\"let element\"> {{element.date_time}}\r\n        <!--<button mat-button=\"\">-->\r\n        <!--<mat-icon  mat-raised-button (click)=\"openUpdate(element)\">edit</mat-icon></button>-->\r\n        <!--<button mat-button=\"\">-->\r\n        <!--<mat-icon style=\"color: red;\" mat-raised-button-->\r\n        <!--(click)=\"delete(element.created_by)\">delete_outline</mat-icon></button>-->\r\n      </td>\r\n    </ng-container>\r\n\r\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n  </table>\r\n</div>"

/***/ }),

/***/ "./src/app/group-messages/group-messages.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/group-messages/group-messages.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/group-messages/group-messages.component.ts":
/*!************************************************************!*\
  !*** ./src/app/group-messages/group-messages.component.ts ***!
  \************************************************************/
/*! exports provided: GroupMessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupMessagesComponent", function() { return GroupMessagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _group_messages_modal_group_messages_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./group-messages-modal/group-messages-modal.component */ "./src/app/group-messages/group-messages-modal/group-messages-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ELEMENT_DATA = [
    { position: 1, sent_message: 'Hey this is to inform you about your project', group_name: 'Main Leaders', campaign_name: '', date_time: '17/2/2012', sent_msg_count: '1' },
    { position: 2, sent_message: 'Hello tomorrow we will have worship rehearsal', group_name: 'Worship', campaign_name: '', date_time: '5/3/2012', sent_msg_count: '3' },
    { position: 3, sent_message: 'Hey friends next week we have NO program', group_name: 'Literature', campaign_name: '', date_time: '23/4/2012', sent_msg_count: '4' },
    { position: 4, sent_message: 'ነገ ጥናት አለን እንዳትቀሩ', group_name: 'Bible study', campaign_name: '', date_time: '12/7/2012', sent_msg_count: '4' },
];
var GroupMessagesComponent = /** @class */ (function () {
    function GroupMessagesComponent(matDialog) {
        this.matDialog = matDialog;
        this.displayedColumns = ['position', 'sent_message', 'group_name', 'campaign_name', 'sent_msg_count', 'date_time'];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
    }
    GroupMessagesComponent.prototype.openCreate = function () {
        var _this = this;
        var dialogRef = this.matDialog.open(_group_messages_modal_group_messages_modal_component__WEBPACK_IMPORTED_MODULE_2__["GroupMessagesModalComponent"], {
            width: '500px',
            data: { message: this.message, animal: this.animal }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            _this.animal = result;
        });
    };
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
    GroupMessagesComponent.prototype.ngOnInit = function () {
    };
    GroupMessagesComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    GroupMessagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-group-messages',
            template: __webpack_require__(/*! ./group-messages.component.html */ "./src/app/group-messages/group-messages.component.html"),
            styles: [__webpack_require__(/*! ./group-messages.component.scss */ "./src/app/group-messages/group-messages.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], GroupMessagesComponent);
    return GroupMessagesComponent;
}());



/***/ }),

/***/ "./src/app/group-messages/group-messages.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/group-messages/group-messages.module.ts ***!
  \*********************************************************/
/*! exports provided: GroupMessagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupMessagesModule", function() { return GroupMessagesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _utils_materials_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/materials.module */ "./src/app/utils/materials.module.ts");
/* harmony import */ var ngx_smart_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-smart-table */ "./node_modules/ngx-smart-table/index.js");
/* harmony import */ var _group_messages_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./group-messages.component */ "./src/app/group-messages/group-messages.component.ts");
/* harmony import */ var _group_messages_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./group-messages-routing.module */ "./src/app/group-messages/group-messages-routing.module.ts");
/* harmony import */ var _group_messages_modal_group_messages_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./group-messages-modal/group-messages-modal.component */ "./src/app/group-messages/group-messages-modal/group-messages-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var GroupMessagesModule = /** @class */ (function () {
    function GroupMessagesModule() {
    }
    GroupMessagesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _utils_materials_module__WEBPACK_IMPORTED_MODULE_3__["MaterialsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _group_messages_routing_module__WEBPACK_IMPORTED_MODULE_6__["GroupMessagesRoutingModule"],
                ngx_smart_table__WEBPACK_IMPORTED_MODULE_4__["Ng2SmartTableModule"]
            ],
            declarations: [_group_messages_component__WEBPACK_IMPORTED_MODULE_5__["GroupMessagesComponent"], _group_messages_modal_group_messages_modal_component__WEBPACK_IMPORTED_MODULE_7__["GroupMessagesModalComponent"]],
            entryComponents: [_group_messages_modal_group_messages_modal_component__WEBPACK_IMPORTED_MODULE_7__["GroupMessagesModalComponent"]]
        })
    ], GroupMessagesModule);
    return GroupMessagesModule;
}());



/***/ })

}]);
//# sourceMappingURL=group-messages-group-messages-module.js.map