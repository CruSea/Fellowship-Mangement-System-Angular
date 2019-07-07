(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./src/app/login/login-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/*! exports provided: LoginRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function() { return LoginRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
    }
];
var LoginRoutingModule = /** @class */ (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#login-main {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 60%;\r\n  z-index: 1;\r\n  width: 400px;\r\n  height: auto;\r\n  padding: 32px;\r\n  border-radius: 5px;\r\n  background-color: whitesmoke;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n}\r\n.card-title{\r\n  font-family: CaptainMarvel, sans-serif;\r\n  margin-top: 0;\r\n  text-align: center;\r\n  font-weight: bold;\r\n  margin-bottom: 8px;\r\n}\r\n.container{\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.background {\r\n  height: 100%;\r\n  width: 100%;\r\n  left: 0;\r\n  top: 0;\r\n  background: url('background-connection-contemporary-303383.jpg');\r\n  /*padding: 500px;*/\r\n  position: absolute;\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n  background-position: center center;\r\n}\r\n#login-name {\r\n  font-family: CaptainMarvel, sans-serif;\r\n  margin-top: 0;\r\n  text-align: center;\r\n  font-weight: bold;\r\n  margin-bottom: 8px;\r\n}\r\nform {\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\nmat-form-field {\r\n  width: 100%;\r\n}\r\nbutton {\r\n  margin-top: 8px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"background\">\r\n  <div class=\"container\">\r\n    <div id=\"login-main\">\r\n      <h1 id=\"login-name\">Login</h1>\r\n      <form [formGroup]=\"loginForm\" (ngSubmit)=\"login(loginForm.value)\">\r\n\r\n        <div class=\"sidebar-background\" style=\"background-image: url(../../assets/img/sidebar-4.jpg)\"></div>\r\n        <mat-form-field>\r\n          <input matInput placeholder=\"Email\" type=\"text\" formControlName=\"email\">\r\n          <mat-error style=\"color: red\" *ngIf=\"loginForm.get('email').invalid && (loginForm.get('email').dirty ||\r\n          loginForm.get('email').touched) && loginForm.get('email').errors?.required\">\r\n            Please insert email!\r\n          </mat-error>\r\n        </mat-form-field>\r\n\r\n        <mat-form-field>\r\n          <input matInput placeholder=\"Password\" type=\"password\" formControlName=\"password\">\r\n          <mat-error style=\"color: red\" *ngIf=\"loginForm.get('password').invalid && (loginForm.get('password').dirty ||\r\n          loginForm.get('password').touched) && loginForm.get('password').errors?.minlength\">\r\n            Please insert password!\r\n          </mat-error>\r\n        </mat-form-field>\r\n\r\n\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"loginForm.invalid\">Login</button>\r\n        <button mat-button=\"\"  routerLink=\"/register\">register</button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--<div *ngIf=\"github_users\">-->\r\n  <!--<div *ngFor=\"let github_user of github_users\">-->\r\n\r\n    <!--<div style=\"display: flex; flex-flow: row\">-->\r\n      <!--<div style=\"width: 150px; height: auto\">-->\r\n        <!--<img [src]=\"github_user.avatar_url\" style=\"width: 100%; height: 100%\">-->\r\n      <!--</div>-->\r\n      <!--<p style=\"margin: 8px 16px\">{{github_user.login}}</p>-->\r\n    <!--</div>-->\r\n\r\n\r\n  <!--</div>-->\r\n<!--</div>-->\r\n\r\n\r\n\r\n<!--<div class=\"background\" style=\"position: absolute; width: 100%; height: auto; z-index: 0\">-->\r\n  <!--&lt;!&ndash;<img src=\"../image/casual-cellphone-chat-1798852.jpg\" style=\"width: 100%; height: 100%\">&ndash;&gt;-->\r\n<!--</div>-->\r\n<!--<div id=\"login-main\">-->\r\n  <!--<h1 id=\"login-name\">Login</h1>-->\r\n  <!--<form [formGroup]=\"loginForm\" (ngSubmit)=\"login(loginForm.value)\">-->\r\n\r\n    <!--&lt;!&ndash;<div class=\"sidebar-background\" style=\"background-image: url(../../assets/img/sidebar-4.jpg)\"></div>&ndash;&gt;-->\r\n    <!--<mat-form-field>-->\r\n      <!--<input matInput placeholder=\"Username\" type=\"text\" formControlName=\"email\">-->\r\n      <!--<mat-error style=\"color: red\" *ngIf=\"loginForm.get('email').invalid && (loginForm.get('email').dirty ||-->\r\n    <!--loginForm.get('email').touched) && loginForm.get('email').errors?.required\">-->\r\n        <!--Please insert email!-->\r\n      <!--</mat-error>-->\r\n    <!--</mat-form-field>-->\r\n\r\n    <!--<mat-form-field>-->\r\n      <!--<input matInput placeholder=\"Password\" type=\"password\" formControlName=\"password\">-->\r\n      <!--<mat-error style=\"color: red\" *ngIf=\"loginForm.get('password').invalid && (loginForm.get('password').dirty ||-->\r\n    <!--loginForm.get('password').touched) && loginForm.get('password').errors?.minlength\">-->\r\n        <!--Please insert password!-->\r\n      <!--</mat-error>-->\r\n    <!--</mat-form-field>-->\r\n\r\n\r\n    <!--<button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"loginForm.invalid\">Login</button>-->\r\n    <!--<button mat-button=\"\"  routerLink=\"/register\">register</button>-->\r\n  <!--</form>-->\r\n  <!--&lt;!&ndash;</div>&ndash;&gt;</div></div>-->"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(httpClient, authenticationService, formBuilder) {
        this.httpClient = httpClient;
        this.authenticationService = authenticationService;
        this.formBuilder = formBuilder;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.getEvent();
        this.loginForm = this.formBuilder.group({
            email: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            password: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]]
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/login/login-routing.module.ts");
/* harmony import */ var _utils_materials_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/materials.module */ "./src/app/utils/materials.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// import { AuthenticationService } from '../services/authentication/authentication.service';
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _utils_materials_module__WEBPACK_IMPORTED_MODULE_4__["MaterialsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _login_routing_module__WEBPACK_IMPORTED_MODULE_3__["LoginRoutingModule"]
            ],
            providers: [_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"]]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map