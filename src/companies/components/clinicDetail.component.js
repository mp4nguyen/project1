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
var companies_services_1 = require('../services/companies.services');
var logging_service_1 = require('../../shared/services/logging.service');
var input_component_1 = require('../../shared/components/input/input.component');
var address_component_1 = require('../../shared/components/address/address.component');
var tab_component_1 = require('../../shared/components/tab/tab.component');
var tabset_component_1 = require('../../shared/components/tab/tabset.component');
var bookingtypelist_component_1 = require('./bookingtypelist.component');
var doctorlist2_component_1 = require('./doctorlist2.component');
var selectbookingtypes_component_1 = require('./selectbookingtypes.component');
var selectdoctors_component_1 = require('./selectdoctors.component');
var ClinicDetailComponent = (function () {
    function ClinicDetailComponent(_companiesService, _log, _fb) {
        this._companiesService = _companiesService;
        this._log = _log;
        this._fb = _fb;
        this.isSubmitted = false;
        this.components = new Array();
        this.addressObject = {};
        this.wards = ['1', '2', '3', '4', 'abc'];
        this.clinicNameControl = new common_2.Control("", common_2.Validators.required);
        this.addressControl = new common_2.Control("", common_2.Validators.required);
        this.wardControl = new common_2.Control("", common_2.Validators.required);
        this.suburbDistrictControl = new common_2.Control("", common_2.Validators.required);
        this.stateProvinceControl = new common_2.Control("", common_2.Validators.required);
        this.countryControl = new common_2.Control("", common_2.Validators.required);
        this.descriptionControl = new common_2.Control("");
        this.isenableControl = new common_2.Control("");
        this.isbookableControl = new common_2.Control("");
        this.istelehealthControl = new common_2.Control("");
        this.iscalendarControl = new common_2.Control("");
        this.components.push({ control: this.clinicNameControl, type: 'text', title: 'Clinic Name', placeholder: 'Clinic Name', isRequired: true, requiredMsg: 'Clinic name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.isenableControl, type: 'boolean', title: 'Enable', placeholder: 'Company Name', isRequired: false, requiredMsg: 'Company name is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.isbookableControl, type: 'boolean', title: 'Book', placeholder: 'Company Name', isRequired: false, requiredMsg: 'Company name is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.istelehealthControl, type: 'boolean', title: 'Telehealth', placeholder: 'Company Name', isRequired: false, requiredMsg: 'Company name is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.iscalendarControl, type: 'boolean', title: 'Calendar', placeholder: 'Company Name', isRequired: false, requiredMsg: 'Company name is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.myForm = new common_2.ControlGroup({
            clinicName: this.clinicNameControl,
            address: this.addressControl,
            ward: this.wardControl,
            suburbDistrict: this.suburbDistrictControl,
            stateProvince: this.stateProvinceControl,
            country: this.countryControl,
            description: this.descriptionControl,
            isenable: this.isenableControl,
            isbookable: this.isbookableControl,
            istelehealth: this.istelehealthControl,
            iscalendar: this.iscalendarControl,
        });
    }
    ClinicDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setClinicData();
        this.myForm.valueChanges
            .subscribe(function (value) {
            _this._log.log("Model Driven Form : " + JSON.stringify(value));
        });
    };
    ClinicDetailComponent.prototype.addressControlGroup = function (addressControlGroup) {
        this.myForm.addControl('addressGroup', this._fb.group(addressControlGroup.controls));
    };
    ClinicDetailComponent.prototype.setClinicData = function () {
        this.clinic = this._companiesService.getCurrentClinic();
        this._log.log("Get data from clinic ", this.clinic);
        if (this.clinic) {
            this.clinicNameControl.updateValue(this.clinic.clinicName);
            this.addressControl.updateValue(this.clinic.address);
            this.wardControl.updateValue(this.clinic.ward);
            this.suburbDistrictControl.updateValue(this.clinic.suburbDistrict);
            this.stateProvinceControl.updateValue(this.clinic.stateProvince);
            this.countryControl.updateValue(this.clinic.country);
            this.isenableControl.updateValue(this.clinic.isenable);
            this.isbookableControl.updateValue(this.clinic.isbookable);
            this.istelehealthControl.updateValue(this.clinic.istelehealth);
            this.iscalendarControl.updateValue(this.clinic.iscalendar);
            this.addressObject.address = this.clinic.address;
            this.addressObject.ward = this.clinic.ward;
            this.addressObject.suburbDistrict = this.clinic.suburbDistrict;
            this.addressObject.stateProvince = this.clinic.stateProvince;
            this.addressObject.postcode = this.clinic.postcode;
            this.addressObject.country = this.clinic.country;
        }
    };
    ClinicDetailComponent.prototype.submit = function () {
        var _this = this;
        this.isSubmitted = true;
        this.wards.push('Added more');
        console.log('submiting...', this.myForm);
        this._companiesService.saveClinic(this.myForm.value).subscribe(function (data) { _this._log.log("form", data); _this.setClinicData(); }, function (err) { _this._log.log(err); }, function () { _this._log.log('created !'); });
    };
    ClinicDetailComponent.prototype.fireClinicRowClicked = function (row) {
        this._log.log('row = ', row);
        this.doctorDialog.openDialog(row);
    };
    ClinicDetailComponent.prototype.fireBTRowClicked = function (row) {
        this._log.log('row = ', row);
        this.btDialog.openDialog(row, 'CLINIC');
    };
    __decorate([
        core_1.ViewChild('btDialog'), 
        __metadata('design:type', selectbookingtypes_component_1.SelectBookingTypeComponent)
    ], ClinicDetailComponent.prototype, "btDialog", void 0);
    __decorate([
        core_1.ViewChild('doctorDialog'), 
        __metadata('design:type', selectdoctors_component_1.SelectDoctorComponent)
    ], ClinicDetailComponent.prototype, "doctorDialog", void 0);
    ClinicDetailComponent = __decorate([
        core_1.Component({
            selector: 'clinic-detail',
            templateUrl: './companies/components/clinicdetail.component.html',
            providers: [],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, input_component_1.InputComponent, address_component_1.AddressComponent, tab_component_1.TabComponent, tabset_component_1.TabsetComponent, bookingtypelist_component_1.BookingTypeListComponent, doctorlist2_component_1.DoctorListComponent, selectbookingtypes_component_1.SelectBookingTypeComponent, selectdoctors_component_1.SelectDoctorComponent]
        }), 
        __metadata('design:paramtypes', [companies_services_1.CompaniesService, logging_service_1.MyLogger, common_1.FormBuilder])
    ], ClinicDetailComponent);
    return ClinicDetailComponent;
}());
exports.ClinicDetailComponent = ClinicDetailComponent;
//# sourceMappingURL=clinicDetail.component.js.map