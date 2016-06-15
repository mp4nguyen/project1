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
var companies_services_1 = require('../services/companies.services');
var logging_service_1 = require('../../shared/services/logging.service');
var table_component_1 = require('../../shared/components/table/table.component');
var dialog_component_1 = require('../../shared/components/dialog/dialog.component');
var doctorschedule_component_1 = require('./doctorschedule.component');
var calendar_1 = require('../../shared/components/calendar/calendar');
var growl_1 = require('../../shared/primeng/components/growl/growl');
var CompanyListComponent = (function () {
    function CompanyListComponent(_companiesService, _router, _log) {
        var _this = this;
        this._companiesService = _companiesService;
        this._router = _router;
        this._log = _log;
        this.columns = [{ title: 'Company Name', fieldName: 'companyName' },
            { title: 'Address', fieldName: 'address' },
            { title: 'District', fieldName: 'suburbDistrict' },
            { title: 'City/Province', fieldName: 'stateProvince' }];
        this.msgs = [];
        this.es = {
            closeText: "Cerrar",
            prevText: "<Ant",
            nextText: "Sig>",
            currentText: "Hoy",
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun",
                "jul", "ago", "sep", "oct", "nov", "dic"],
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            weekHeader: "Sm",
            dateFormat: "dd/mm/yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        _companiesService.getCompanies().subscribe(function (data) {
            _this.companies = data;
            _this._log.log("CompanyListComponent = ", _this.companies);
        }, function (err) { return console.log(err); }, function () { return console.log("finished"); });
    }
    CompanyListComponent.prototype.newOrEditDetail = function (company) {
        this._companiesService.setCurrentCompany(company);
        this._log.log("company = ", company);
        this._router.navigate(['CompanyDetail']);
    };
    CompanyListComponent.prototype.showConfirmDialog = function () {
        var _this = this;
        this.myDialog.activate().subscribe(function (data) { _this._log.log('dialog return = ', data); }, function (err) { _this._log.log('dialog err = ', err); }, function () { _this._log.log('dialog closed = '); });
    };
    CompanyListComponent.prototype.cancelDialog = function () {
        this.myDialog.cancel(function () {
            console.log('i hit close button !');
            return true;
        });
    };
    CompanyListComponent.prototype.showMsg = function () {
        console.log('show msg');
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    };
    __decorate([
        core_1.ViewChild('myDialog'), 
        __metadata('design:type', dialog_component_1.DialogComponent)
    ], CompanyListComponent.prototype, "myDialog", void 0);
    CompanyListComponent = __decorate([
        core_1.Component({
            selector: 'company-list',
            templateUrl: './companies/components/companylist.component.html',
            providers: [],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault, table_component_1.MyTableComponent, dialog_component_1.DialogComponent, doctorschedule_component_1.DoctorScheduleComponent, calendar_1.Calendar, growl_1.Growl]
        }), 
        __metadata('design:paramtypes', [companies_services_1.CompaniesService, router_1.Router, logging_service_1.MyLogger])
    ], CompanyListComponent);
    return CompanyListComponent;
}());
exports.CompanyListComponent = CompanyListComponent;
//# sourceMappingURL=companylist.component.js.map