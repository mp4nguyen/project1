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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var tab_component_1 = require('./tab.component');
var router_1 = require('angular2/router');
var TabsetComponent = (function () {
    function TabsetComponent(tabs, _router) {
        this._router = _router;
        this.tabs = tabs;
    }
    TabsetComponent.prototype.ngAfterContentInit = function () {
        this.tabs.toArray()[0].active = true;
    };
    TabsetComponent.prototype.setActive = function (tab) {
        this.tabs.toArray().forEach(function (t) { return t.active = false; });
        tab.active = true;
        if (tab.routeName && tab.routeName.length > 0) {
            console.log("will go to route: ", tab.routeName);
            this._router.navigate([tab.routeName]);
        }
    };
    TabsetComponent = __decorate([
        core_1.Component({
            selector: 'tabset',
            directives: [router_1.ROUTER_DIRECTIVES],
            template: "\n<div class=\"tabbable-line\">\n    <ul class=\"nav nav-tabs \">\n        <li *ngFor=\"#tab of tabs\" [class.active]=\"tab.active\">\n            <a (click)=\"setActive(tab)\" data-toggle=\"tab\"> {{tab.title}} </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n    \t\t\n    \t\t<ng-content></ng-content>\n    \t\t<router-outlet></router-outlet>     \n    </div>\n</div>  \n"
        }),
        __param(0, core_1.Query(tab_component_1.TabComponent)), 
        __metadata('design:paramtypes', [core_1.QueryList, router_1.Router])
    ], TabsetComponent);
    return TabsetComponent;
}());
exports.TabsetComponent = TabsetComponent;
//# sourceMappingURL=tabset.component.js.map