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
var common_1 = require('angular2/common');
var name_list_service_1 = require('../../shared/services/name-list.service');
var router_1 = require('angular2/router');
var about_component_1 = require('../../about/components/about.component');
var companies_component_1 = require('../../companies/components/companies.component');
var HomeComponent = (function () {
    function HomeComponent(nameListService) {
        this.nameListService = nameListService;
    }
    HomeComponent.prototype.addName = function () {
        this.nameListService.add(this.newName);
        this.newName = '';
        return false;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'sd-home',
            templateUrl: './home/components/home.component.html',
            styleUrls: ['./home/components/home.component.css'],
            viewProviders: [name_list_service_1.NameListService],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, router_1.RouterOutlet]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'About', component: about_component_1.AboutComponent },
            { path: '/Companies/...', name: 'Companies', component: companies_component_1.CompaniesComponent, useAsDefault: true },
        ]), 
        __metadata('design:paramtypes', [name_list_service_1.NameListService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map