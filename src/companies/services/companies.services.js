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
var Observable_1 = require('rxjs/Observable');
var http_1 = require('angular2/http');
require('rxjs/Rx');
var _ = require('underscore/underscore');
var lbservices_1 = require('../../shared/services/lbservices');
var lbservices_2 = require('../../shared/services/lbservices');
var logging_service_1 = require('../../shared/services/logging.service');
var company_model_1 = require('../models/company.model');
var clinic_model_1 = require('../models/clinic.model');
var doctor_model_1 = require('../models/doctor.model');
var bookingtype_model_1 = require('../models/bookingtype.model');
var roster_model_1 = require('../models/roster.model');
var CompaniesService = (function () {
    function CompaniesService() {
        this.countConstructor = 0;
        this.injector = core_1.Injector.resolveAndCreate([lbservices_2.CBookingTypesApi, lbservices_1.CCompaniesApi, logging_service_1.MyLogger, http_1.HTTP_PROVIDERS]);
        this._companies = this.injector.get(lbservices_1.CCompaniesApi);
        this._bookingtypes = this.injector.get(lbservices_2.CBookingTypesApi);
        this._log = this.injector.get(logging_service_1.MyLogger);
        this._log.log('CompaniesService -----------------> constructor count = ', this.countConstructor);
    }
    CompaniesService.prototype.getCompanies = function () {
        var _this = this;
        var obs = new Observable_1.Observable(function (observer) {
            if (_this.companies) {
                _this._log.log('Get companies from memory');
                observer.next(_this.companies);
            }
            else {
                _this._companies.find({ include: [
                        { relation: 'Clinics', scope: { include: [
                                    { relation: 'BookingTypes' },
                                    { relation: 'Doctors', scope: { include: 'Person' } }
                                ] } },
                        { relation: 'Doctors', scope: { include: [
                                    { relation: 'Person' },
                                    { relation: 'Clinics' },
                                    { relation: 'BookingTypes' },
                                    { relation: 'Rosters', scope: { include: ['BookingType', 'Clinic'] } }
                                ] } }
                    ] })
                    .map(function (res) {
                    var companies = [];
                    _this._log.log('Get companies from server at service = ', res);
                    for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                        var c = res_1[_i];
                        var company = new company_model_1.Company(c);
                        companies.push(company);
                    }
                    return companies;
                })
                    .subscribe(function (data) {
                    _this._log.log("Get from server after convert to company objects = ", data);
                    _this.companies = data;
                    observer.next(data);
                }, function (err) { return console.error(err); }, function () { return console.log('done'); });
            }
        });
        return obs;
    };
    CompaniesService.prototype.getCanselectingBTs = function (selectedBTs, bts) {
        var returnArray = _.clone(bts);
        if (selectedBTs) {
            for (var _i = 0, selectedBTs_1 = selectedBTs; _i < selectedBTs_1.length; _i++) {
                var bt = selectedBTs_1[_i];
                var index = _.findIndex(returnArray, { bookingTypeId: bt.bookingTypeId });
                returnArray.splice(index, 1);
            }
        }
        return returnArray;
    };
    CompaniesService.prototype.getCanselectingDoctors = function () {
        var returnArray = _.clone(this.currentCompany.doctors);
        if (this.currentClinic) {
            for (var _i = 0, _a = this.currentClinic.doctors; _i < _a.length; _i++) {
                var bt = _a[_i];
                var index = _.findIndex(returnArray, { doctorId: bt.doctorId });
                returnArray.splice(index, 1);
            }
        }
        return returnArray;
    };
    CompaniesService.prototype.getCanselectingClinics = function () {
        var returnArray = _.clone(this.currentCompany.clinics);
        if (this.currentDoctor) {
            for (var _i = 0, _a = this.currentDoctor.clinics; _i < _a.length; _i++) {
                var bt = _a[_i];
                var index = _.findIndex(returnArray, { clinicId: bt.clinicId });
                returnArray.splice(index, 1);
            }
        }
        return returnArray;
    };
    CompaniesService.prototype.getBookingTypes = function (type) {
        var _this = this;
        var selectedBTs = [];
        if (type == 'DOCTOR' && this.currentDoctor) {
            selectedBTs = this.currentDoctor.bookingTypes;
        }
        else if (type == 'CLINIC' && this.currentClinic) {
            selectedBTs = this.currentClinic.bookingTypes;
        }
        var obs = new Observable_1.Observable(function (observer) {
            if (_this.bookingTypes) {
                _this._log.log('Get booking types from memory');
                observer.next(_this.getCanselectingBTs(selectedBTs, _this.bookingTypes));
            }
            else {
                _this._bookingtypes.find({ where: { isenable: 1 } })
                    .map(function (res) {
                    var bts = [];
                    _this._log.log('Get booking types from server at service = ', res);
                    for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
                        var c = res_2[_i];
                        var bt = new bookingtype_model_1.BookingType(c);
                        bts.push(bt);
                    }
                    return bts;
                })
                    .subscribe(function (data) {
                    _this._log.log("Get from server after convert to booking type objects = ", data);
                    _this.bookingTypes = data;
                    observer.next(_this.getCanselectingBTs(selectedBTs, _this.bookingTypes));
                }, function (err) { return console.error(err); }, function () { return console.log('done'); });
            }
        });
        return obs;
    };
    CompaniesService.prototype.setCurrentCompany = function (company) {
        this.currentCompany = company;
        console.log("set current company = ", this.currentCompany);
    };
    CompaniesService.prototype.getCurrentCompany = function () {
        return this.currentCompany;
    };
    CompaniesService.prototype.setCurrentClinic = function (clinic) {
        this.currentClinic = clinic;
    };
    CompaniesService.prototype.getCurrentClinic = function () {
        return this.currentClinic;
    };
    CompaniesService.prototype.setCurrentDoctor = function (person) {
        if (person && person.personId) {
            var doctorIndex = _.findIndex(this.currentCompany.doctors, { personId: person.personId });
            if (doctorIndex >= 0) {
                this.currentDoctor = this.currentCompany.doctors[doctorIndex];
                this.currentDoctor.setPerson(person);
            }
        }
        else {
            this.currentDoctor = new doctor_model_1.Doctor();
        }
    };
    CompaniesService.prototype.getCurrentDoctor = function () {
        return this.currentDoctor;
    };
    CompaniesService.prototype.saveCompany = function (companyObject) {
        var _this = this;
        var observer;
        var obs = new Observable_1.Observable(function (o) { return observer = o; });
        if (this.currentCompany && this.currentCompany.companyId) {
            var address = companyObject.addressGroup;
            this._log.log("Company service.address = ", address);
            companyObject.address = address.address;
            companyObject.ward = address.ward;
            companyObject.suburbDistrict = address.suburbDistrict;
            companyObject.stateProvince = address.stateProvince;
            companyObject.postcode = address.postcode;
            companyObject.country = address.country;
            this._log.log("will update this company", companyObject);
            this._companies.updateAttributes(this.currentCompany.companyId, companyObject).subscribe(function (data) {
                _this._log.log(data);
                var updatedCompany = new company_model_1.Company(data);
                _this.setCurrentCompany(updatedCompany);
                var companyIndex = _.findIndex(_this.companies, { companyId: data.companyId });
                _this._log.log(" will find the company with id = ", data.companyId);
                _this._log.log(" find company position = ", companyIndex);
                _this.companies[companyIndex] = updatedCompany;
                observer.next(data);
            }, function (err) { _this._log.log(err); }, function () { _this._log.log('updated !'); });
        }
        else {
            companyObject.companyId = 0;
            var address = companyObject.addressGroup;
            this._log.log("Company service.address = ", address);
            companyObject.address = address.address;
            companyObject.ward = address.ward;
            companyObject.suburbDistrict = address.suburbDistrict;
            companyObject.stateProvince = address.stateProvince;
            companyObject.postcode = address.postcode;
            companyObject.country = address.country;
            this._log.log("Will create this company", companyObject);
            this._companies.create(companyObject).subscribe(function (data) {
                var updatedCompany = new company_model_1.Company(data);
                _this._log.log(data);
                _this.setCurrentCompany(updatedCompany);
                observer.next(data);
                _this.companies.push(updatedCompany);
            }, function (err) { _this._log.log(err); }, function () { _this._log.log('created !'); });
        }
        return obs;
    };
    CompaniesService.prototype.saveClinic = function (clinicObject) {
        var _this = this;
        var observer;
        var obs = new Observable_1.Observable(function (o) { return observer = o; });
        if (this.currentClinic && this.currentClinic.clinicId) {
            var address = clinicObject.addressGroup;
            this._log.log("Company service.address = ", address);
            clinicObject.address = address.address;
            clinicObject.ward = address.ward;
            clinicObject.suburbDistrict = address.suburbDistrict;
            clinicObject.stateProvince = address.stateProvince;
            clinicObject.postcode = address.postcode;
            clinicObject.country = address.country;
            this._log.log("will update this clinic", clinicObject);
            this._companies.__updateById__Clinics(this.currentCompany.companyId, this.currentClinic.clinicId, clinicObject).subscribe(function (data) {
                var updatedClinic = new clinic_model_1.Clinic(data);
                _this._log.log(data);
                _this.setCurrentClinic(updatedClinic);
                var clinicIndex = _.findIndex(_this.currentCompany.clinics, { clinicId: data.clinicId });
                _this._log.log(" will find the company with id = ", data.clinicId);
                _this._log.log(" find company position = ", clinicIndex);
                _this.currentCompany.clinics[clinicIndex] = updatedClinic;
                observer.next(data);
            }, function (err) { _this._log.log(err); }, function () { _this._log.log('updated !'); });
        }
        else {
            var address = clinicObject.addressGroup;
            this._log.log("Company service.address = ", address);
            clinicObject.address = address.address;
            clinicObject.ward = address.ward;
            clinicObject.suburbDistrict = address.suburbDistrict;
            clinicObject.stateProvince = address.stateProvince;
            clinicObject.postcode = address.postcode;
            clinicObject.country = address.country;
            clinicObject.companyId = this.currentCompany.companyId;
            clinicObject.clinicId = 0;
            this._log.log("Will create this company", clinicObject);
            this._companies.__create__Clinics(this.currentCompany.companyId, clinicObject).subscribe(function (data) {
                var updatedClinic = new clinic_model_1.Clinic(data);
                _this._log.log(data);
                _this.setCurrentClinic(updatedClinic);
                observer.next(data);
                console.log("created clinc, current company =", _this.currentCompany);
                _this.currentCompany.clinics.push(updatedClinic);
            }, function (err) { _this._log.log(err); }, function () { _this._log.log('created !'); });
        }
        return obs;
    };
    CompaniesService.prototype.saveDoctor = function (doctorObject, person) {
        var _this = this;
        var observer;
        var obs = new Observable_1.Observable(function (o) { return observer = o; });
        if (doctorObject && doctorObject.doctorId) {
            this._log.log("will update this doctor", doctorObject);
            this._companies.__updateById__Doctors(this.currentCompany.companyId, doctorObject.doctorId, doctorObject).subscribe(function (data) {
                var updatedDoctor = new doctor_model_1.Doctor(data);
                updatedDoctor.setPerson(person);
                _this._log.log(data);
                _this.setCurrentDoctor(person);
                var doctorIndex = _.findIndex(_this.currentCompany.doctors, { doctorId: data.doctorId });
                _this._log.log(" will find the doctor with id = ", data.doctorId);
                _this._log.log(" find doctor position = ", doctorIndex);
                _this.currentCompany.doctors[doctorIndex] = updatedDoctor;
                observer.next(data);
            }, function (err) { _this._log.log(err); }, function () { _this._log.log('updated !'); });
        }
        else {
            doctorObject.companyId = this.currentCompany.companyId;
            doctorObject.doctorId = 0;
            doctorObject.personId = person.personId;
            this._log.log("Will create this doctor", doctorObject);
            this._companies.__create__Doctors(this.currentCompany.companyId, doctorObject).subscribe(function (data) {
                var newDoctor = new doctor_model_1.Doctor(data);
                newDoctor.setPerson(person);
                _this._log.log("created new doctor = ", newDoctor);
                _this.currentCompany.doctors.push(newDoctor);
                observer.next(data);
                _this.setCurrentDoctor(person);
            }, function (err) { _this._log.log(err); }, function () { _this._log.log('created !'); });
        }
        return obs;
    };
    CompaniesService.prototype.doctorRemoveBT = function (btId, type) {
        var _this = this;
        this._log.log('Will remove this bt : ', btId);
        if (type == 'DOCTOR') {
            this._companies.__unlink__Doctors__BookingTypes(this.currentCompany.companyId, this.currentDoctor.doctorId, btId)
                .subscribe(function (data) {
                _this._log.log('unlink doctor - booking type =', data);
                var btIndex = _.findIndex(_this.currentDoctor.bookingTypes, { bookingTypeId: btId });
                _this.currentDoctor.bookingTypes.splice(btIndex, 1);
            }, function (err) { _this._log.log('unlink doctor - booking type =', err); }, function () { _this._log.log('unlink doctor - booking completed'); });
        }
        else if (type == 'CLINIC') {
            this._companies.__unlink__Clinics__BookingTypes(this.currentCompany.companyId, this.currentClinic.clinicId, btId)
                .subscribe(function (data) {
                _this._log.log('unlink clinic - booking type =', data);
                var btIndex = _.findIndex(_this.currentClinic.bookingTypes, { bookingTypeId: btId });
                _this.currentClinic.bookingTypes.splice(btIndex, 1);
            }, function (err) { _this._log.log('unlink clinic - booking type =', err); }, function () { _this._log.log('unlink clinic - booking completed'); });
        }
        else {
            this._log.log('the service do not know the type = ', type);
        }
    };
    CompaniesService.prototype.doctorAddBT = function (btId, type) {
        var _this = this;
        this._log.log('Will add this bt : ', btId);
        if (type == 'DOCTOR') {
            this._companies.__link__Doctors__BookingTypes(this.currentCompany.companyId, this.currentDoctor.doctorId, btId, { doctorId: this.currentDoctor.doctorId, bookingTypeId: btId, isenable: 1 })
                .subscribe(function (data) {
                _this._log.log('link doctor - booking type =', data);
                var btIndex = _.findIndex(_this.bookingTypes, { bookingTypeId: data.bookingTypeId });
                _this._log.log('btId = ', btId, 'btIndex = ', btIndex, ' bt = ', _this.bookingTypes[btIndex], ' bts = ', _this.bookingTypes);
                _this.currentDoctor.bookingTypes.push(_this.bookingTypes[btIndex]);
            }, function (err) { _this._log.log('link doctor - booking type =', err); }, function () { _this._log.log('link doctor - booking completed'); });
        }
        else if (type == 'CLINIC') {
            this._companies.__link__Clinics__BookingTypes(this.currentCompany.companyId, this.currentClinic.clinicId, btId, { clinicId: this.currentClinic.clinicId, bookingTypeId: btId, isenable: 1 })
                .subscribe(function (data) {
                _this._log.log('link clinic - booking type =', data);
                var btIndex = _.findIndex(_this.bookingTypes, { bookingTypeId: data.bookingTypeId });
                _this._log.log('btId = ', btId, 'btIndex = ', btIndex, ' bt = ', _this.bookingTypes[btIndex], ' bts = ', _this.bookingTypes);
                _this.currentClinic.bookingTypes.push(_this.bookingTypes[btIndex]);
            }, function (err) { _this._log.log('link clinic - booking type =', err); }, function () { _this._log.log('link clinic - booking completed'); });
        }
        else {
            this._log.log('the service do not know the type = ', type);
        }
    };
    CompaniesService.prototype.clinicRemoveDoctor = function (doctorId) {
        var _this = this;
        this._log.log('Will remove this bt : ', doctorId);
        if (this.currentClinic) {
            this._companies.__unlink__Clinics__Doctors(this.currentCompany.companyId, this.currentClinic.clinicId, doctorId)
                .subscribe(function (data) {
                var btIndex = _.findIndex(_this.currentClinic.doctors, { doctorId: doctorId });
                _this.currentClinic.doctors.splice(btIndex, 1);
                _this._log.log('unlink doctor - booking type =', data, 'currentClinic=', _this.currentClinic);
            }, function (err) { _this._log.log('unlink doctor - booking type =', err); }, function () { _this._log.log('unlink doctor - booking completed'); });
        }
    };
    CompaniesService.prototype.clinicAddDoctor = function (doctorId) {
        var _this = this;
        this._log.log('Will add this bt : ', doctorId);
        this._companies.__link__Clinics__Doctors(this.currentCompany.companyId, this.currentClinic.clinicId, doctorId, { clinicId: this.currentClinic.clinicId, doctorId: doctorId, isenable: 1 })
            .subscribe(function (data) {
            _this._log.log('link doctor - booking type =', data);
            var btIndex = _.findIndex(_this.currentCompany.doctors, { doctorId: data.doctorId });
            _this.currentClinic.doctors.push(_this.currentCompany.doctors[btIndex]);
            _this._log.log('btId = ', doctorId, 'btIndex = ', btIndex, ' bt = ', _this.currentCompany.doctors[btIndex], ' bts = ', _this.currentCompany.doctors, 'current clinic = ', _this.currentClinic);
        }, function (err) { _this._log.log('link doctor - booking type =', err); }, function () { _this._log.log('link doctor - booking completed'); });
    };
    CompaniesService.prototype.doctorRemoveClinic = function (clinicId) {
        var _this = this;
        this._log.log('Will remove this bt : ', clinicId);
        if (this.currentDoctor) {
            this._companies.__unlink__Doctors__Clinics(this.currentCompany.companyId, this.currentDoctor.doctorId, clinicId)
                .subscribe(function (data) {
                var btIndex = _.findIndex(_this.currentDoctor.clinics, { clinicId: clinicId });
                _this.currentDoctor.clinics.splice(btIndex, 1);
                _this._log.log('unlink doctor - clinic =', data, 'currentClinic=', _this.currentDoctor);
            }, function (err) { _this._log.log('unlink doctor - booking type =', err); }, function () { _this._log.log('unlink doctor - booking completed'); });
        }
    };
    CompaniesService.prototype.doctorAddClinic = function (clinicId) {
        var _this = this;
        this._log.log('Will add this bt : ', clinicId);
        this._companies.__link__Doctors__Clinics(this.currentCompany.companyId, this.currentDoctor.doctorId, clinicId, { doctorId: this.currentDoctor.doctorId, clinicId: clinicId, isenable: 1 })
            .subscribe(function (data) {
            _this._log.log('link doctor - booking type =', data);
            var btIndex = _.findIndex(_this.currentCompany.clinics, { clinicId: data.clinicId });
            _this.currentDoctor.clinics.push(_this.currentCompany.clinics[btIndex]);
            _this._log.log('btId = ', clinicId, 'btIndex = ', btIndex, ' bt = ', _this.currentCompany.clinics[btIndex], ' bts = ', _this.currentCompany.clinics, 'current clinic = ', _this.currentDoctor);
        }, function (err) { _this._log.log('link doctor - booking type =', err); }, function () { _this._log.log('link doctor - booking completed'); });
    };
    CompaniesService.prototype.generateRoster = function (rosterDef) {
        var _this = this;
        if (this.currentDoctor) {
            rosterDef.doctorId = this.currentDoctor.doctorId;
            this._log.log('Will generate the roster following the defination:', rosterDef);
            this._companies.generateRoster(rosterDef).subscribe(function (rosters) {
                _this._log.log('generated rosters = ', rosters.rosters);
                for (var _i = 0, _a = rosters.rosters; _i < _a.length; _i++) {
                    var r = _a[_i];
                    var roster = new roster_model_1.Roster(r);
                    _this._log.log(r);
                    _this.currentDoctor.rosters.push(roster);
                }
                _this._log.log('updated doctor = ', _this.currentDoctor);
            }, function (err) {
                _this._log.log('error during generating doctor rosters', err);
            });
        }
    };
    CompaniesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CompaniesService);
    return CompaniesService;
}());
exports.CompaniesService = CompaniesService;
//# sourceMappingURL=companies.services.js.map