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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luL2NvbXBvbmVudHMvbG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFDM0QsdUJBQTZDLGlCQUFpQixDQUFDLENBQUE7QUFDL0QsdUJBQWtDLGlCQUFpQixDQUFDLENBQUE7QUFDcEQsd0JBQWtDLDJCQUEyQixDQUFDLENBQUE7QUFTOUQ7SUFDQyx3QkFDYyxPQUFlLEVBQ2YsSUFBdUI7UUFEdkIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFNBQUksR0FBSixJQUFJLENBQW1CO0lBR3JDLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVDLG9DQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFSCw4QkFBSyxHQUFMO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBNUJGO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSx5Q0FBeUM7WUFDdEQsVUFBVSxFQUFFLENBQUMsMEJBQWlCLENBQUM7U0FDaEMsQ0FBQzs7c0JBQUE7SUF5QkYscUJBQUM7QUFBRCxDQXRCQSxBQXNCQyxJQUFBO0FBdEJZLHNCQUFjLGlCQXNCMUIsQ0FBQSIsImZpbGUiOiJsb2dpbi9jb21wb25lbnRzL2xvZ2luLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZUNvbmZpZ30gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbmltcG9ydCB7Um91dGVyLCBSb3V0ZVBhcmFtc30gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbmltcG9ydCB7IEJyb3dzZXJEb21BZGFwdGVyIH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xvZ2luJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luL2NvbXBvbmVudHMvbG9naW4uY29tcG9uZW50Lmh0bWwnLFxuICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblx0Y29uc3RydWN0b3IoICAgIFxuICAgIFx0XHRcdHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgIFx0XHRcdHByaXZhdGUgX2RvbTogQnJvd3NlckRvbUFkYXB0ZXJcbiAgICBcdFx0XHQpIHtcblx0XHRcblx0fVxuXG5cdG5nT25Jbml0KCl7IFxuXHRcdHRoaXMuX2RvbS5hZGRDbGFzcyh0aGlzLl9kb20ucXVlcnkoXCJib2R5XCIpLCBcImxvZ2luXCIpOyBcblx0fVxuXG4gIFx0bmdPbkRlc3Ryb3koKXsgXG4gIFx0XHR0aGlzLl9kb20ucmVtb3ZlQ2xhc3ModGhpcy5fZG9tLnF1ZXJ5KFwiYm9keVwiKSwgXCJsb2dpblwiKTsgXG5cdFx0dGhpcy5fZG9tLmFkZENsYXNzKHRoaXMuX2RvbS5xdWVyeShcImJvZHlcIiksIFwicGFnZS1jb250YWluZXItYmctc29saWRcIik7ICAgXHRcdFxuXHRcdHRoaXMuX2RvbS5hZGRDbGFzcyh0aGlzLl9kb20ucXVlcnkoXCJib2R5XCIpLCBcInBhZ2UtYm94ZWRcIik7XG4gIFx0fVxuXG5cdGxvZ2luKCl7XG5cdFx0Y29uc29sZS5sb2coXCJsb2dpbiBpbnRvIHRoZSBzeXN0ZW0uLi5cIik7XG5cdFx0dGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnSG9tZSddKTtcblx0fVxufVxuIl19
