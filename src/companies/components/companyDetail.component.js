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
var common_2 = require('angular2/common');
var router_1 = require('angular2/router');
var companies_services_1 = require('../services/companies.services');
var logging_service_1 = require('../../shared/services/logging.service');
var input_component_1 = require('../../shared/components/input/input.component');
var cliniclist_component_1 = require('./cliniclist.component');
var doctorlist2_component_1 = require('./doctorlist2.component');
var address_component_1 = require('../../shared/components/address/address.component');
var tab_component_1 = require('../../shared/components/tab/tab.component');
var tabset_component_1 = require('../../shared/components/tab/tabset.component');
var CompanyDetailComponent = (function () {
    function CompanyDetailComponent(_companiesService, _log, _router, _fb) {
        this._companiesService = _companiesService;
        this._log = _log;
        this._router = _router;
        this._fb = _fb;
        this.isSubmitted = false;
        this.components = new Array();
        this.wards = ['1', '2', '3', '4', 'abc'];
        this.addressObject = {};
        this.companyIdControl = new common_2.Control();
        this.companyNameControl = new common_2.Control("", common_2.Validators.required);
        this.addressControl = new common_2.Control("", common_2.Validators.required);
        this.wardControl = new common_2.Control("", common_2.Validators.required);
        this.suburbDistrictControl = new common_2.Control("", common_2.Validators.required);
        this.stateProvinceControl = new common_2.Control("", common_2.Validators.required);
        this.countryControl = new common_2.Control("", common_2.Validators.required);
        this.descriptionControl = new common_2.Control("");
        this.isenableControl = new common_2.Control("");
        this.policyControl = new common_2.Control("");
        this.conditionToBookControl = new common_2.Control("");
        this.components.push({ control: this.companyNameControl, type: 'text', title: 'Company Name', placeholder: 'Company Name', isRequired: true, requiredMsg: 'Company name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.addressControl, type: 'text', title: 'Address', placeholder: 'Address', isRequired: true, requiredMsg: 'Address is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.wardControl, type: 'option', title: 'Ward', placeholder: 'Ward', isRequired: false, requiredMsg: 'Ward is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.wards });
        this.components.push({ control: this.suburbDistrictControl, type: 'text', title: 'District', placeholder: 'District', isRequired: true, requiredMsg: 'District is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.stateProvinceControl, type: 'text', title: 'Province', placeholder: 'Province', isRequired: true, requiredMsg: 'Province is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.countryControl, type: 'text', title: 'Country', placeholder: 'Country', isRequired: true, requiredMsg: 'Country is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.isenableControl, type: 'boolean', title: 'Enable', placeholder: 'Company Name', isRequired: false, requiredMsg: 'Company name is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.descriptionControl, type: 'text', title: 'Description', placeholder: 'Description', isRequired: false, requiredMsg: 'Company name is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.policyControl, type: 'text', title: 'Policy', placeholder: 'Policy', isRequired: false, requiredMsg: 'Company name is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.conditionToBookControl, type: 'text', title: 'Condition to book', placeholder: 'Condition to book', isRequired: false, requiredMsg: 'Company name is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.myForm = new common_2.ControlGroup({
            companyId: this.companyIdControl,
            companyName: this.companyNameControl,
            address: this.addressControl,
            ward: this.wardControl,
            suburbDistrict: this.suburbDistrictControl,
            stateProvince: this.stateProvinceControl,
            country: this.countryControl,
            description: this.descriptionControl,
            isenable: this.isenableControl,
            policy: this.policyControl,
            conditionToBook: this.conditionToBookControl,
        });
    }
    CompanyDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setCompanyData();
        this.myForm.valueChanges
            .subscribe(function (value) {
            _this._log.log("Model Driven Form : " + JSON.stringify(value));
        });
    };
    CompanyDetailComponent.prototype.addressControlGroup = function (addressControlGroup) {
        this.myForm.addControl('addressGroup', this._fb.group(addressControlGroup.controls));
    };
    CompanyDetailComponent.prototype.save = function () {
        var _this = this;
        this.isSubmitted = true;
        console.log('submiting...', this.myForm.value);
        this._companiesService.saveCompany(this.myForm.value).subscribe(function (data) { _this._log.log("form", data); _this.setCompanyData(); }, function (err) { _this._log.log(err); }, function () { _this._log.log('created !'); });
    };
    CompanyDetailComponent.prototype.showFormControls = function (form) {
        console.log(this.myForm);
    };
    CompanyDetailComponent.prototype.newOrEditClinicDetail = function (clinic) {
        this._companiesService.setCurrentClinic(clinic);
        this._log.log("company = ", clinic);
        this._router.navigate(['ClinicDetail']);
    };
    CompanyDetailComponent.prototype.newOrEditDoctorDetail = function (doctor) {
        this._log.log("clicked on doctor = ", doctor);
        this._companiesService.setCurrentDoctor(doctor);
        this._router.navigate(['DoctorDetail']);
    };
    CompanyDetailComponent.prototype.setCompanyData = function () {
        this.company = this._companiesService.getCurrentCompany();
        this._log.log("Get data from company list = ", this.company, this.clinics);
        if (this.company) {
            this.clinics = this.company.clinics;
            this.doctors = this.company.doctors;
            this.companyIdControl.updateValue(this.company.companyId);
            this.companyNameControl.updateValue(this.company.companyName);
            this.addressControl.updateValue(this.company.address);
            this.wardControl.updateValue(this.company.ward);
            this.suburbDistrictControl.updateValue(this.company.suburbDistrict);
            this.stateProvinceControl.updateValue(this.company.stateProvince);
            this.countryControl.updateValue(this.company.country);
            this.descriptionControl.updateValue(this.company.description);
            this.isenableControl.updateValue(this.company.isenable);
            this.policyControl.updateValue(this.company.policy);
            this.conditionToBookControl.updateValue(this.company.conditionToBook);
            this.addressObject.address = this.company.address;
            this.addressObject.ward = this.company.ward;
            this.addressObject.suburbDistrict = this.company.suburbDistrict;
            this.addressObject.stateProvince = this.company.stateProvince;
            this.addressObject.postcode = this.company.postcode;
            this.addressObject.country = this.company.country;
        }
    };
    CompanyDetailComponent = __decorate([
        core_1.Component({
            selector: 'company-detail',
            templateUrl: './companies/components/companydetail.component.html',
            providers: [],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, common_1.NgClass, common_1.NgForm, input_component_1.InputComponent, common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault, tab_component_1.TabComponent, tabset_component_1.TabsetComponent, cliniclist_component_1.ClinicListComponent, doctorlist2_component_1.DoctorListComponent, address_component_1.AddressComponent]
        }), 
        __metadata('design:paramtypes', [companies_services_1.CompaniesService, logging_service_1.MyLogger, router_1.Router, common_2.FormBuilder])
    ], CompanyDetailComponent);
    return CompanyDetailComponent;
}());
exports.CompanyDetailComponent = CompanyDetailComponent;
//# sourceMappingURL=companyDetail.component.js.map