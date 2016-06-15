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
var TabComponent = (function () {
    function TabComponent() {
        this.active = false;
    }
    __decorate([
        core_1.Input('title'), 
        __metadata('design:type', String)
    ], TabComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input('routeName'), 
        __metadata('design:type', String)
    ], TabComponent.prototype, "routeName", void 0);
    TabComponent = __decorate([
        core_1.Component({
            selector: 'tab',
            inputs: ['title', 'routeName'],
            template: "\n\t\t\t<div class=\"tab-pane\" *ngIf=\"active\"> \n\t\t\t\t<ng-content></ng-content>\n\t\t\t</div>\n\t\t\t"
        }), 
        __metadata('design:paramtypes', [])
    ], TabComponent);
    return TabComponent;
}());
exports.TabComponent = TabComponent;
//# sourceMappingURL=tab.component.js.map