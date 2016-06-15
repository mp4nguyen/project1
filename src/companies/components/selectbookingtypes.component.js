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
var bookingtype_model_1 = require('../models/bookingtype.model');
var input_component_1 = require('../../shared/components/input/input.component');
var companies_services_1 = require('../services/companies.services');
var SelectBookingTypeComponent = (function () {
    function SelectBookingTypeComponent(_log, _companyServices) {
        var _this = this;
        this._log = _log;
        this._companyServices = _companyServices;
        this.bt = new bookingtype_model_1.BookingType({ bookingTypeName: '', isenable: 0 });
        this.components = new Array();
        this.bts = [];
        this.isNew = true;
        this.bookingTypeIdControl = new common_1.Control();
        this.bookingTypeNameControl = new common_1.Control();
        this.isenableControl = new common_1.Control();
        this.components.push({ control: this.bookingTypeIdControl, type: 'option', title: 'Booking Type', placeholder: 'Booking Type', isRequired: true, requiredMsg: 'Booking type is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.bts, values: this.bts, displayProperty: 'bookingTypeName', returnProperty: 'bookingTypeId' });
        this.components.push({ control: this.isenableControl, type: 'boolean', title: 'Enable', placeholder: 'Clinic Name', isRequired: true, requiredMsg: 'Clinic name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.myForm = new common_1.ControlGroup({
            bookingTypeId: this.bookingTypeIdControl,
            bookingTypeName: this.bookingTypeNameControl,
            isenable: this.isenableControl
        });
        this.myForm.valueChanges.subscribe(function (data) { _this._log.log('booking type form = ', JSON.stringify(_this.myForm.value)); });
    }
    SelectBookingTypeComponent.prototype.ngOnInit = function () {
    };
    SelectBookingTypeComponent.prototype.openDialog = function (bt, type) {
        var _this = this;
        this.type = type;
        this._companyServices.getBookingTypes(type).subscribe(function (data) {
            _this.bts = data;
            _this._log.log('bts = ', data);
            _this.components[0] = { control: _this.bookingTypeIdControl, type: 'option', title: 'Booking Type', placeholder: 'Booking Type', isRequired: true, requiredMsg: 'Booking type is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: _this.bts, displayProperty: 'bookingTypeName', returnProperty: 'bookingTypeId' };
        }, function (err) { _this._log.log('error = ', err); }, function () { _this._log.log('completed'); });
        if (bt) {
            this.isNew = false;
            this.bt = bt;
            this.updateView();
        }
        else {
            this.isNew = true;
            this.bt = new bookingtype_model_1.BookingType({ bookingTypeName: '', isenable: 0 });
            this.updateView();
        }
        this.myDialog.activate().subscribe(function (code) { _this._log.log('dialog return code =', code); }, function (err) { _this._log.log('dialog return err =', err); }, function () { _this._log.log('dialog completed'); });
    };
    SelectBookingTypeComponent.prototype.updateView = function () {
        this.bookingTypeIdControl.updateValue(this.bt.bookingTypeId);
        this.bookingTypeNameControl.updateValue(this.bt);
        this.isenableControl.updateValue(this.bt.isenable);
    };
    SelectBookingTypeComponent.prototype.remove = function () {
        this._companyServices.doctorRemoveBT(this.bookingTypeIdControl.value, this.type);
        this.myDialog.ok(null);
    };
    SelectBookingTypeComponent.prototype.add = function () {
        this._log.log('bt = ', this.bookingTypeIdControl.value);
        this._companyServices.doctorAddBT(this.bookingTypeIdControl.value, this.type);
        this.myDialog.ok(null);
    };
    __decorate([
        core_1.ViewChild('myDialog'), 
        __metadata('design:type', dialog_component_1.DialogComponent)
    ], SelectBookingTypeComponent.prototype, "myDialog", void 0);
    SelectBookingTypeComponent = __decorate([
        core_1.Component({
            selector: 'select-booking-type',
            directives: [dialog_component_1.DialogComponent, input_component_1.InputComponent],
            template: "\n    <my-dialog #myDialog>\n        <div class=\"modal-header\">\n            <button type=\"button\" (click)=\"myDialog.close()\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"></button>\n            <h4 class=\"modal-title\">Booking Type</h4>\n        </div>\n        <div class=\"modal-body\"> \n             <div class=\"portlet-body form\">\n                    <form role=\"form\">\n                        <div class=\"form-body\">\n                            <div class=\"row\">\n                                <div class=\"col-md-12\">\n                                    <p *ngIf=\"!isNew\">{{bt.bookingTypeName}}\n                                    <div *ngIf=\"isNew\"><my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[0]\"></my-input></div>                                    \n                                </div>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button (click)=\"myDialog.cancel()\" type=\"button\" class=\"btn dark btn-outline\" data-dismiss=\"modal\">Close</button>\n            <button *ngIf=\"!isNew\" (click)=\"remove()\" type=\"button\" class=\"btn red\">Remove</button>\n            <button *ngIf=\"isNew\" (click)=\"add()\" type=\"button\" class=\"btn green\">Add</button>\n        </div>\n    </my-dialog>    \n    "
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger, companies_services_1.CompaniesService])
    ], SelectBookingTypeComponent);
    return SelectBookingTypeComponent;
}());
exports.SelectBookingTypeComponent = SelectBookingTypeComponent;
//# sourceMappingURL=selectbookingtypes.component.js.map