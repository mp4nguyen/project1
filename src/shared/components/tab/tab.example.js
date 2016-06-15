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
var tabset_component_1 = require('./tabset.component');
var tab_component_1 = require('./tab.component');
var TabsSampleApp = (function () {
    function TabsSampleApp() {
        this.tabs = [
            { title: 'About', content: 'This is the About tab', routeName: 'DoctorList' },
            { title: 'Blog', content: 'This is our blog', routeName: 'DoctorList' },
            { title: 'Contact us', content: 'Contact us here', routeName: 'DoctorList' },
        ];
    }
    TabsSampleApp = __decorate([
        core_1.Component({
            selector: 'tabs-sample-app',
            directives: [tabset_component_1.TabsetComponent, tab_component_1.TabComponent],
            template: "\n<tabset>\n<tab title=\"First tab\" routeName=\"ClinicList\">\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magni quia ut harum facilis, ullam deleniti porro dignissimos quasi at molestiae sapiente natus, neque voluptatum ad consequuntur cupiditate nemo sunt.\n</tab>\n<tab *ngFor=\"#tab of tabs\" [title]=\"tab.title\" [routeName]=\"tab.routeName\">\n{{ tab.content }} </tab>\n</tabset>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], TabsSampleApp);
    return TabsSampleApp;
}());
exports.TabsSampleApp = TabsSampleApp;
//# sourceMappingURL=tab.example.js.map