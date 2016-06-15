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
var router_1 = require('angular2/router');
var companylist_component_1 = require('./companylist.component');
var companyDetail_component_1 = require('./companyDetail.component');
var clinicDetail_component_1 = require('./clinicDetail.component');
var doctorDetail_component_1 = require('./doctorDetail.component');
var companies_services_1 = require('../services/companies.services');
var people_services_1 = require('../../people/services/people.services');
var people_component_1 = require('../../people/components/people.component');
var CompaniesComponent = (function () {
    function CompaniesComponent() {
    }
    CompaniesComponent = __decorate([
        core_1.Component({
            selector: 'companies',
            templateUrl: './companies/components/companies.component.html',
            styleUrls: ['./companies/components/companies.component.css'],
            providers: [companies_services_1.CompaniesService, people_services_1.PeopleService],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, router_1.RouterOutlet, companylist_component_1.CompanyListComponent, people_component_1.PeopleComponent]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'CompanyList', component: companylist_component_1.CompanyListComponent, useAsDefault: true },
            { path: '/Detail', name: 'CompanyDetail', component: companyDetail_component_1.CompanyDetailComponent },
            { path: '/ClinicDetail', name: 'ClinicDetail', component: clinicDetail_component_1.ClinicDetailComponent },
            { path: '/DoctorDetail', name: 'DoctorDetail', component: doctorDetail_component_1.DoctorDetailComponent },
        ]), 
        __metadata('design:paramtypes', [])
    ], CompaniesComponent);
    return CompaniesComponent;
}());
exports.CompaniesComponent = CompaniesComponent;
//# sourceMappingURL=companies.component.js.map