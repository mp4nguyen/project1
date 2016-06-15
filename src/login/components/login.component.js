"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var router_2 = require('angular2/router');
var browser_1 = require('angular2/platform/browser');
var LoginComponent = (function () {
    function LoginComponent(_router, _dom) {
        this._router = _router;
        this._dom = _dom;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this._dom.addClass(this._dom.query("body"), "login");
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this._dom.removeClass(this._dom.query("body"), "login");
        this._dom.addClass(this._dom.query("body"), "page-container-bg-solid");
        this._dom.addClass(this._dom.query("body"), "page-boxed");
    };
    LoginComponent.prototype.login = function () {
        console.log("login into the system...");
        this._router.navigate(['Home']);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login/components/login.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_2.Router, browser_1.BrowserDomAdapter])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map