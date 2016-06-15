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
var home_component_1 = require('../../home/components/home.component');
var login_component_1 = require('../../login/components/login.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'sd-app',
            templateUrl: './app/components/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, login_component_1.LoginComponent, home_component_1.HomeComponent]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'Login', component: login_component_1.LoginComponent, useAsDefault: true },
            { path: '/Home/...', name: 'Home', component: home_component_1.HomeComponent },
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL2FwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx1QkFBNkMsaUJBQWlCLENBQUMsQ0FBQTtBQUMvRCwrQkFBNEIsc0NBQXNDLENBQUMsQ0FBQTtBQUNuRSxnQ0FBNkIsd0NBQXdDLENBQUMsQ0FBQTtBQWF0RTtJQUFBO0lBQTJCLENBQUM7SUFYNUI7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLHFDQUFxQztZQUNsRCxVQUFVLEVBQUUsQ0FBQywwQkFBaUIsRUFBRSxnQ0FBYyxFQUFDLDhCQUFhLENBQUM7U0FDOUQsQ0FBQztRQUVELG9CQUFXLENBQUM7WUFDWCxFQUFFLElBQUksRUFBRSxHQUFHLEVBQU8sSUFBSSxFQUFFLE9BQU8sRUFBRyxTQUFTLEVBQUUsZ0NBQWMsRUFBRyxZQUFZLEVBQUUsSUFBSSxFQUFDO1lBQ2pGLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBTyxJQUFJLEVBQUUsTUFBTSxFQUFHLFNBQVMsRUFBRSw4QkFBYSxFQUFHO1NBQ3JFLENBQUM7O29CQUFBO0lBRXlCLG1CQUFDO0FBQUQsQ0FBM0IsQUFBNEIsSUFBQTtBQUFmLG9CQUFZLGVBQUcsQ0FBQSIsImZpbGUiOiJhcHAvY29tcG9uZW50cy9hcHAuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFUywgUm91dGVDb25maWd9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5pbXBvcnQge0hvbWVDb21wb25lbnR9IGZyb20gJy4uLy4uL2hvbWUvY29tcG9uZW50cy9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQge0xvZ2luQ29tcG9uZW50fSBmcm9tICcuLi8uLi9sb2dpbi9jb21wb25lbnRzL2xvZ2luLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NkLWFwcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAvY29tcG9uZW50cy9hcHAuY29tcG9uZW50Lmh0bWwnLFxuICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVMsIExvZ2luQ29tcG9uZW50LEhvbWVDb21wb25lbnRdXG59KVxuXG5AUm91dGVDb25maWcoW1xuICB7IHBhdGg6ICcvJywgICAgICBuYW1lOiAnTG9naW4nLCAgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudCAgLHVzZUFzRGVmYXVsdDogdHJ1ZX0sXG4gIHsgcGF0aDogJy9Ib21lLy4uLicsICAgICAgbmFtZTogJ0hvbWUnLCAgY29tcG9uZW50OiBIb21lQ29tcG9uZW50ICB9LFxuXSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7fVxuIl19
