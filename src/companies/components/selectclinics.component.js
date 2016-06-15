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
var clinic_model_1 = require('../models/clinic.model');
var input_component_1 = require('../../shared/components/input/input.component');
var companies_services_1 = require('../services/companies.services');
var SelectClinicComponent = (function () {
    function SelectClinicComponent(_log, _companyServices) {
        var _this = this;
        this._log = _log;
        this._companyServices = _companyServices;
        this.clinic = new clinic_model_1.Clinic(null);
        this.components = new Array();
        this.clinics = [];
        this.isNew = true;
        this.clinicIdControl = new common_1.Control();
        this.components.push({ control: this.clinicIdControl, type: 'option', title: 'Clinic', placeholder: 'Booking Type', isRequired: true, requiredMsg: 'Booking type is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.clinics, displayProperty: 'clinicName', returnProperty: 'clinicId' });
        this.myForm = new common_1.ControlGroup({
            doctorId: this.clinicIdControl
        });
        this.myForm.valueChanges.subscribe(function (data) { _this._log.log('clinic form = ', JSON.stringify(_this.myForm.value)); });
    }
    SelectClinicComponent.prototype.ngOnInit = function () {
    };
    SelectClinicComponent.prototype.openDialog = function (clinic) {
        var _this = this;
        this.clinics = this._companyServices.getCanselectingClinics();
        this._log.log(' get doctors be able to select = ', this.clinics);
        this.components[0] = { control: this.clinicIdControl, type: 'option', title: 'Clinic', placeholder: 'Booking Type', isRequired: true, requiredMsg: 'Booking type is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.clinics, displayProperty: 'clinicName', returnProperty: 'clinicId' };
        if (clinic) {
            this.isNew = false;
            this.clinic = clinic;
            this.updateView();
        }
        else {
            this.isNew = true;
            this.clinic = new clinic_model_1.Clinic(null);
            this.updateView();
        }
        this.myDialog.activate().subscribe(function (code) { _this._log.log('dialog return code =', code); }, function (err) { _this._log.log('dialog return err =', err); }, function () { _this._log.log('dialog completed'); });
    };
    SelectClinicComponent.prototype.updateView = function () {
        this.clinicIdControl.updateValue(this.clinic.clinicId);
    };
    SelectClinicComponent.prototype.remove = function () {
        this._companyServices.doctorRemoveClinic(this.clinicIdControl.value);
        this.myDialog.ok(null);
    };
    SelectClinicComponent.prototype.add = function () {
        this._companyServices.doctorAddClinic(this.clinicIdControl.value);
        this.myDialog.ok(null);
    };
    __decorate([
        core_1.ViewChild('myDialog'), 
        __metadata('design:type', dialog_component_1.DialogComponent)
    ], SelectClinicComponent.prototype, "myDialog", void 0);
    SelectClinicComponent = __decorate([
        core_1.Component({
            selector: 'select-clinic',
            directives: [dialog_component_1.DialogComponent, input_component_1.InputComponent],
            template: "\n    <my-dialog #myDialog>\n        <div class=\"modal-header\">\n            <button type=\"button\" (click)=\"myDialog.close()\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"></button>\n            <h4 class=\"modal-title\">Booking Type</h4>\n        </div>\n        <div class=\"modal-body\"> \n             <div class=\"portlet-body form\">\n                    <form role=\"form\">\n                        <div class=\"form-body\">\n                            <div class=\"row\">\n                                <div class=\"col-md-12\">\n                                    \n                                    <div *ngIf=\"isNew\"><my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[0]\"></my-input></div>                                    \n                                </div>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button (click)=\"myDialog.cancel()\" type=\"button\" class=\"btn dark btn-outline\" data-dismiss=\"modal\">Close</button>\n            <button *ngIf=\"!isNew\" (click)=\"remove()\" type=\"button\" class=\"btn red\">Remove</button>\n            <button *ngIf=\"isNew\" (click)=\"add()\" type=\"button\" class=\"btn green\">Add</button>\n        </div>\n    </my-dialog>    \n    "
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger, companies_services_1.CompaniesService])
    ], SelectClinicComponent);
    return SelectClinicComponent;
}());
exports.SelectClinicComponent = SelectClinicComponent;
//# sourceMappingURL=selectclinics.component.js.map