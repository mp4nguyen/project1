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
var input_component_1 = require('../input/input.component');
var logging_service_1 = require('../../services/logging.service');
var AddressComponent = (function () {
    function AddressComponent(_log) {
        this._log = _log;
        this.addressControlGroup = new core_1.EventEmitter();
        this.components = new Array();
        this.addressControl = new common_1.Control("");
        this.suburbDistrictControl = new common_1.Control("");
        this.wardControl = new common_1.Control("");
        this.postcodeControl = new common_1.Control("");
        this.stateProvinceControl = new common_1.Control("");
        this.countryControl = new common_1.Control("");
        this.components.push({ control: this.addressControl, type: 'text', title: 'Address', placeholder: 'Address', isRequired: true, requiredMsg: 'Address is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.wardControl, type: 'option', title: 'Ward', placeholder: 'Ward', isRequired: false, requiredMsg: 'Ward is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.wards });
        this.components.push({ control: this.suburbDistrictControl, type: 'text', title: 'District', placeholder: 'District', isRequired: true, requiredMsg: 'District is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.stateProvinceControl, type: 'text', title: 'Province', placeholder: 'Province', isRequired: true, requiredMsg: 'Province is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.countryControl, type: 'text', title: 'Country', placeholder: 'Country', isRequired: true, requiredMsg: 'Country is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.myForm = new common_1.ControlGroup({
            address: this.addressControl,
            suburbDistrict: this.suburbDistrictControl,
            ward: this.wardControl,
            postcode: this.postcodeControl,
            stateProvince: this.stateProvinceControl,
            country: this.countryControl,
        });
        this._log.log("address contructor -> addressForm = ", this.myForm);
    }
    AddressComponent.prototype.ngOnInit = function () {
        if (this.address) {
            this.addressControl.updateValue(this.address.address);
            this.wardControl.updateValue(this.address.ward);
            this.suburbDistrictControl.updateValue(this.address.suburbDistrict);
            this.stateProvinceControl.updateValue(this.address.stateProvince);
            this.countryControl.updateValue(this.address.country);
        }
        this.addressControlGroup.next(this.myForm);
    };
    AddressComponent.prototype.fireRowClickedEvent = function (row) {
        this.rowClickedEvent.next(row);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddressComponent.prototype, "address", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AddressComponent.prototype, "addressControlGroup", void 0);
    AddressComponent = __decorate([
        core_1.Component({
            selector: 'address',
            directives: [input_component_1.InputComponent],
            template: "\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[0]\"></my-input>\n        </div>\n        <div class=\"col-md-4\">    \n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[1]\"></my-input>\n        </div>\n        <div class=\"col-md-4\">    \n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[2]\"></my-input>\n        </div>    \n    </div> \n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[3]\"></my-input>\n        </div>\n        <div class=\"col-md-4\">    \n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[4]\"></my-input>\n        </div>    \n    </div> \n"
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger])
    ], AddressComponent);
    return AddressComponent;
}());
exports.AddressComponent = AddressComponent;
//# sourceMappingURL=address.component.js.map