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
var input_component_1 = require('../../shared/components/input/input.component');
var companies_services_1 = require('../services/companies.services');
var logging_service_1 = require('../../shared/services/logging.service');
var people_component_1 = require('../../people/components/people.component');
var doctor_model_1 = require('../models/doctor.model');
var tab_component_1 = require('../../shared/components/tab/tab.component');
var tabset_component_1 = require('../../shared/components/tab/tabset.component');
var bookingtypelist_component_1 = require('./bookingtypelist.component');
var cliniclist_component_1 = require('./cliniclist.component');
var selectbookingtypes_component_1 = require('./selectbookingtypes.component');
var selectclinics_component_1 = require('./selectclinics.component');
var doctorschedule_component_1 = require('./doctorschedule.component');
var growl_1 = require('../../shared/primeng/components/growl/growl');
var DoctorDetailComponent = (function () {
    function DoctorDetailComponent(_log, _companyService, _fb) {
        this._log = _log;
        this._companyService = _companyService;
        this._fb = _fb;
        this.msgs = [];
        this.components = new Array();
        this.doctorIdControl = new common_1.Control();
        this.userIdControl = new common_1.Control();
        this.signatureControl = new common_1.Control();
        this.timeIntervalControl = new common_1.Control();
        this.isenableControl = new common_1.Control();
        this.person = _fb.group({});
        this.myForm = _fb.group({
            doctorId: this.doctorIdControl,
            userId: this.userIdControl,
            signature: this.signatureControl,
            timeInterval: this.timeIntervalControl,
            isenable: this.isenableControl,
            person: this.person
        });
        this.components.push({ control: this.isenableControl, type: 'boolean', title: 'Enable', placeholder: 'Clinic Name', isRequired: true, requiredMsg: 'Clinic name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.timeIntervalControl, type: 'number', title: 'Time Interval', placeholder: 'Time Interval', isRequired: true, requiredMsg: 'Clinic name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.signatureControl, type: 'text', title: 'Signatute', placeholder: 'Time Interval', isRequired: true, requiredMsg: 'Clinic name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.myForm = new common_1.ControlGroup({
            doctorId: this.doctorIdControl,
            userId: this.userIdControl,
            signature: this.signatureControl,
            timeInterval: this.timeIntervalControl,
            isenable: this.isenableControl
        });
    }
    DoctorDetailComponent.prototype.ngOnInit = function () {
        this.doctor = this._companyService.getCurrentDoctor();
        this._log.log('Doctor =', this.doctor);
        if (this.doctor) {
            this.doctorIdControl.updateValue(this.doctor.doctorId);
            this.isenableControl.updateValue(this.doctor.isenable);
            this.timeIntervalControl.updateValue(this.doctor.timeInterval);
            this.signatureControl.updateValue(this.doctor.signature);
        }
        else {
            this.doctor = new doctor_model_1.Doctor();
        }
    };
    DoctorDetailComponent.prototype.save = function () {
        var _this = this;
        this._log.log('doctor detail -> will save data with myForm.person=', this.myForm.value.person);
        this.person.save(this.myForm.value.person).subscribe(function (person) {
            _this._log.log(' received data from person component =', person);
            _this._companyService.saveDoctor(_this.myForm.value, person).subscribe(function (data) { _this._log.log("doctor saved successfully ! ", data); }, function (err) { _this._log.log(err); }, function () { _this._log.log('created !'); });
        }, function (err) { _this._log.log('error in saving person = ', err); }, function () { _this._log.log('saved person successfully !'); });
    };
    DoctorDetailComponent.prototype.personControlGroup = function (personControlGroup) {
        this.myForm.addControl('person', this._fb.group(personControlGroup.controls));
        this._log.log("doctor detail person control group =", personControlGroup, this.myForm);
    };
    DoctorDetailComponent.prototype.fireClinicRowClicked = function (row) {
        this._log.log('row = ', row);
        this.clinicDialog.openDialog(row);
    };
    DoctorDetailComponent.prototype.fireBTRowClicked = function (row) {
        this._log.log('row = ', row);
        this.btDialog.openDialog(row, 'DOCTOR');
    };
    DoctorDetailComponent.prototype.addedRosterEvent = function (data) {
        this._log.log(' will add this roster = ', data);
        this._companyService.generateRoster(data);
    };
    __decorate([
        core_1.ViewChild(people_component_1.PeopleComponent), 
        __metadata('design:type', people_component_1.PeopleComponent)
    ], DoctorDetailComponent.prototype, "person", void 0);
    __decorate([
        core_1.ViewChild('btDialog'), 
        __metadata('design:type', selectbookingtypes_component_1.SelectBookingTypeComponent)
    ], DoctorDetailComponent.prototype, "btDialog", void 0);
    __decorate([
        core_1.ViewChild('clinicDialog'), 
        __metadata('design:type', selectclinics_component_1.SelectClinicComponent)
    ], DoctorDetailComponent.prototype, "clinicDialog", void 0);
    DoctorDetailComponent = __decorate([
        core_1.Component({
            selector: 'clinic-detail',
            templateUrl: './companies/components/doctordetail.component.html',
            providers: [],
            directives: [people_component_1.PeopleComponent, input_component_1.InputComponent, tab_component_1.TabComponent, tabset_component_1.TabsetComponent, bookingtypelist_component_1.BookingTypeListComponent, cliniclist_component_1.ClinicListComponent, selectbookingtypes_component_1.SelectBookingTypeComponent, selectclinics_component_1.SelectClinicComponent, doctorschedule_component_1.DoctorScheduleComponent, growl_1.Growl]
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger, companies_services_1.CompaniesService, common_1.FormBuilder])
    ], DoctorDetailComponent);
    return DoctorDetailComponent;
}());
exports.DoctorDetailComponent = DoctorDetailComponent;
//# sourceMappingURL=doctorDetail.component.js.map