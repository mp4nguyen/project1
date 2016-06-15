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
var core_1 = require("angular2/core");
var common_1 = require('angular2/common');
var dialog_component_1 = require("../../shared/components/dialog/dialog.component");
var logging_service_1 = require('../../shared/services/logging.service');
var doctor_model_1 = require('../models/doctor.model');
var input_component_1 = require('../../shared/components/input/input.component');
var companies_services_1 = require('../services/companies.services');
var SelectDoctorComponent = (function () {
    function SelectDoctorComponent(_log, _companyServices) {
        var _this = this;
        this._log = _log;
        this._companyServices = _companyServices;
        this.doctor = new doctor_model_1.Doctor(null);
        this.components = new Array();
        this.doctors = [];
        this.people = [];
        this.isNew = true;
        this.doctorIdControl = new common_1.Control();
        this.bookingTypeNameControl = new common_1.Control();
        this.isenableControl = new common_1.Control();
        this.components.push({ control: this.doctorIdControl, type: 'option', title: 'Doctor', placeholder: 'Booking Type', isRequired: true, requiredMsg: 'Booking type is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.doctors, displayProperty: 'bookingTypeName', returnProperty: 'doctorId' });
        this.components.push({ control: this.isenableControl, type: 'boolean', title: 'Enable', placeholder: 'Clinic Name', isRequired: true, requiredMsg: 'Clinic name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.myForm = new common_1.ControlGroup({
            doctorId: this.doctorIdControl,
            isenable: this.isenableControl
        });
        this.myForm.valueChanges.subscribe(function (data) { _this._log.log('booking type form = ', JSON.stringify(_this.myForm.value)); });
    }
    SelectDoctorComponent.prototype.ngOnInit = function () {
    };
    SelectDoctorComponent.prototype.openDialog = function (doctor) {
        var _this = this;
        this.doctors = this._companyServices.getCanselectingDoctors();
        this.people = [];
        for (var _i = 0, _a = this.doctors; _i < _a.length; _i++) {
            var dt = _a[_i];
            dt.person.doctorId = dt.doctorId;
            dt.person.doctorName = dt.person.firstName + ' ' + dt.person.lastName;
            this.people.push(dt.person);
        }
        this._log.log(' get doctors be able to select = ', this.doctors, this.people);
        this.components[0] = { control: this.doctorIdControl, type: 'option', title: 'Doctor', placeholder: 'Booking Type', isRequired: true, requiredMsg: 'Booking type is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.people, displayProperty: 'doctorName', returnProperty: 'doctorId' };
        if (doctor) {
            this.isNew = false;
            this.doctor = doctor;
            this.updateView();
        }
        else {
            this.isNew = true;
            this.doctor = new doctor_model_1.Doctor(null);
            this.updateView();
        }
        this.myDialog.activate().subscribe(function (code) { _this._log.log('dialog return code =', code); }, function (err) { _this._log.log('dialog return err =', err); }, function () { _this._log.log('dialog completed'); });
    };
    SelectDoctorComponent.prototype.updateView = function () {
        this.doctorIdControl.updateValue(this.doctor.doctorId);
        this.isenableControl.updateValue(this.doctor.isenable);
    };
    SelectDoctorComponent.prototype.remove = function () {
        this._companyServices.clinicRemoveDoctor(this.doctorIdControl.value);
        this.myDialog.ok(null);
    };
    SelectDoctorComponent.prototype.add = function () {
        this._companyServices.clinicAddDoctor(this.doctorIdControl.value);
        this.myDialog.ok(null);
    };
    __decorate([
        core_1.ViewChild('myDialog'), 
        __metadata('design:type', dialog_component_1.DialogComponent)
    ], SelectDoctorComponent.prototype, "myDialog", void 0);
    SelectDoctorComponent = __decorate([
        core_1.Component({
            selector: 'select-doctor',
            directives: [dialog_component_1.DialogComponent, input_component_1.InputComponent],
            template: "\n    <my-dialog #myDialog>\n        <div class=\"modal-header\">\n            <button type=\"button\" (click)=\"myDialog.close()\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"></button>\n            <h4 class=\"modal-title\">Booking Type</h4>\n        </div>\n        <div class=\"modal-body\"> \n             <div class=\"portlet-body form\">\n                    <form role=\"form\">\n                        <div class=\"form-body\">\n                            <div class=\"row\">\n                                <div class=\"col-md-12\">\n                                    \n                                    <div *ngIf=\"isNew\"><my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[0]\"></my-input></div>                                    \n                                </div>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button (click)=\"myDialog.cancel()\" type=\"button\" class=\"btn dark btn-outline\" data-dismiss=\"modal\">Close</button>\n            <button *ngIf=\"!isNew\" (click)=\"remove()\" type=\"button\" class=\"btn red\">Remove</button>\n            <button *ngIf=\"isNew\" (click)=\"add()\" type=\"button\" class=\"btn green\">Add</button>\n        </div>\n    </my-dialog>    \n    "
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger, companies_services_1.CompaniesService])
    ], SelectDoctorComponent);
    return SelectDoctorComponent;
}());
exports.SelectDoctorComponent = SelectDoctorComponent;
//# sourceMappingURL=selectdoctors.component.js.map