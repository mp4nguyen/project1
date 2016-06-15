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
var Observable_1 = require('rxjs/Observable');
var logging_service_1 = require('../../shared/services/logging.service');
var input_component_1 = require('../../shared/components/input/input.component');
var address_component_1 = require('../../shared/components/address/address.component');
var people_model_1 = require('../models/people.model');
var people_services_1 = require('../services/people.services');
var PeopleComponent = (function () {
    function PeopleComponent(_log, _router, _fb, _peopleService) {
        this._log = _log;
        this._router = _router;
        this._fb = _fb;
        this._peopleService = _peopleService;
        this.personControlGroup = new core_1.EventEmitter();
        this.isSubmitted = false;
        this.components = new Array();
        this.addressObject = {};
        this.personIdControl = new common_2.Control();
        this.titleControl = new common_2.Control();
        this.firstNameControl = new common_2.Control("", common_2.Validators.required);
        this.lastNameControl = new common_2.Control("", common_2.Validators.required);
        this.dobControl = new common_2.Control("", common_2.Validators.required);
        this.genderControl = new common_2.Control("", common_2.Validators.required);
        this.phoneControl = new common_2.Control("", common_2.Validators.required);
        this.mobileControl = new common_2.Control("", common_2.Validators.required);
        this.occupationControl = new common_2.Control("");
        this.isenableControl = new common_2.Control("");
        this.addressControl = new common_2.Control("");
        this.suburbDistrictControl = new common_2.Control("");
        this.wardControl = new common_2.Control("");
        this.postcodeControl = new common_2.Control("");
        this.stateProvinceControl = new common_2.Control("");
        this.countryControl = new common_2.Control("");
        this.ispatientControl = new common_2.Control("");
        this.isdoctorControl = new common_2.Control("");
        this.imageControl = new common_2.Control("");
        this.components.push({ control: this.titleControl, type: 'option', title: 'Title', placeholder: 'Company Name', isRequired: true, requiredMsg: 'Title is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: ['Mr', 'Ms', 'Miss'] });
        this.components.push({ control: this.firstNameControl, type: 'text', title: 'Firstname', placeholder: 'Firstname', isRequired: true, requiredMsg: 'Firstname is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.lastNameControl, type: 'text', title: 'Lastname', placeholder: 'Lastname', isRequired: true, requiredMsg: 'Lastname is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.dobControl, type: 'text', title: 'DOB', placeholder: 'DOB', isRequired: true, requiredMsg: 'DOB is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.genderControl, type: 'option', title: 'Gender', placeholder: 'DOB', isRequired: true, requiredMsg: 'Gender is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: ['Male', 'Female'] });
        this.components.push({ control: this.phoneControl, type: 'text', title: 'Phone', placeholder: 'Phone', isRequired: false, requiredMsg: 'Phone is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.mobileControl, type: 'text', title: 'Mobile', placeholder: 'Mobile', isRequired: false, requiredMsg: 'Mobile is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.occupationControl, type: 'text', title: 'Occupation', placeholder: 'Occupation', isRequired: false, requiredMsg: 'Mobile is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.isenableControl, type: 'boolean', title: 'Enable', placeholder: 'Company Name', isRequired: false, requiredMsg: 'Company name is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.imageControl, type: 'text', title: 'Image', placeholder: 'Image', isRequired: false, requiredMsg: 'Mobile is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.addressControl, type: 'text', title: 'Address', placeholder: 'Address', isRequired: true, requiredMsg: 'Address is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.wardControl, type: 'option', title: 'Ward', placeholder: 'Ward', isRequired: false, requiredMsg: 'Ward is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.wards });
        this.components.push({ control: this.suburbDistrictControl, type: 'text', title: 'District', placeholder: 'District', isRequired: true, requiredMsg: 'District is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.stateProvinceControl, type: 'text', title: 'Province', placeholder: 'Province', isRequired: true, requiredMsg: 'Province is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.countryControl, type: 'text', title: 'Country', placeholder: 'Country', isRequired: true, requiredMsg: 'Country is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.myForm = new common_2.ControlGroup({
            personId: this.personIdControl,
            isenable: this.isenableControl,
            title: this.titleControl,
            firstName: this.firstNameControl,
            lastName: this.lastNameControl,
            dob: this.dobControl,
            gender: this.genderControl,
            phone: this.phoneControl,
            mobile: this.mobileControl,
            occupation: this.occupationControl,
            ispatient: this.ispatientControl,
            isdoctor: this.isdoctorControl,
            image: this.imageControl
        });
        this._log.log("Person.Contructor ................");
    }
    PeopleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._log.log("Person.ngOnInit ................ isSave = ", this.isSave);
        this.setCompanyData();
        this.myForm.valueChanges
            .subscribe(function (value) {
            _this._log.log("People -> Model Driven Form : " + JSON.stringify(value));
        });
    };
    PeopleComponent.prototype.save = function (person) {
        var _this = this;
        var observer;
        var obs = new Observable_1.Observable(function (o) { return observer = o; });
        this._peopleService.savePerson(person).subscribe(function (data) {
            _this._log.log("person component save data = ", data);
            observer.next(new people_model_1.People(data));
        }, function (err) { _this._log.log(err); }, function () { _this._log.log('created !'); });
        return obs;
    };
    PeopleComponent.prototype.addressControlGroup = function (addressControlGroup) {
        this.myForm.addControl('addressGroup', this._fb.group(addressControlGroup.controls));
        this.personControlGroup.next(this.myForm);
    };
    PeopleComponent.prototype.showFormControls = function (form) {
        console.log(this.myForm);
    };
    PeopleComponent.prototype.newOrEditDetail = function (clinic) {
        this._log.log("company = ", clinic);
        this._router.navigate(['ClinicDetail']);
    };
    PeopleComponent.prototype.setCompanyData = function () {
        this._log.log("Get data from father ; doctor  = ", this.person);
        if (this.person) {
            this.personIdControl.updateValue(this.person.personId);
            this.titleControl.updateValue(this.person.title);
            this.firstNameControl.updateValue(this.person.firstName);
            this.lastNameControl.updateValue(this.person.lastName);
            this.dobControl.updateValue(this.person.dob);
            this.genderControl.updateValue(this.person.gender);
            this.phoneControl.updateValue(this.person.phone);
            this.mobileControl.updateValue(this.person.mobile);
            this.occupationControl.updateValue(this.person.occupation);
            this.isenableControl.updateValue(this.person.isenable);
            this.addressControl.updateValue(this.person.address);
            this.suburbDistrictControl.updateValue(this.person.suburbDistrict);
            this.wardControl.updateValue(this.person.ward);
            this.postcodeControl.updateValue(this.person.postcode);
            this.stateProvinceControl.updateValue(this.person.stateProvince);
            this.countryControl.updateValue(this.person.country);
            this.ispatientControl.updateValue(this.person.ispatient);
            this.isdoctorControl.updateValue(this.person.isdoctor);
            this.imageControl.updateValue(this.person.image);
            this.addressObject.address = this.person.address;
            this.addressObject.ward = this.person.ward;
            this.addressObject.suburbDistrict = this.person.suburbDistrict;
            this.addressObject.stateProvince = this.person.stateProvince;
            this.addressObject.postcode = this.person.postcode;
            this.addressObject.country = this.person.country;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', people_model_1.People)
    ], PeopleComponent.prototype, "person", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PeopleComponent.prototype, "personControlGroup", void 0);
    PeopleComponent = __decorate([
        core_1.Component({
            selector: 'people',
            templateUrl: './people/components/people.component.html',
            providers: [],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, common_1.NgClass, common_1.NgForm, input_component_1.InputComponent, address_component_1.AddressComponent]
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger, router_1.Router, common_2.FormBuilder, people_services_1.PeopleService])
    ], PeopleComponent);
    return PeopleComponent;
}());
exports.PeopleComponent = PeopleComponent;
//# sourceMappingURL=people.component.js.map