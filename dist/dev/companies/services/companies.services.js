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
        var observer;
        var obs = new Observable_1.Observable(function (o) { return observer = o; });
        if (this.currentDoctor) {
            var clinicIndex_1 = _.findIndex(this.currentDoctor.clinics, { clinicId: parseInt(rosterDef.workingSiteId) });
            var bookingTypeIndex_1 = _.findIndex(this.currentDoctor.bookingTypes, { bookingTypeId: parseInt(rosterDef.bookingTypeId) });
            this._log.log('currentDoctor = ', this.currentDoctor, ' clinicIndex = ', clinicIndex_1, ' bookingTypeIndex = ', bookingTypeIndex_1);
            var workingSiteName_1 = this.currentDoctor.clinics[clinicIndex_1].clinicName;
            var bookingTypeName_1 = this.currentDoctor.bookingTypes[bookingTypeIndex_1].bookingTypeName;
            rosterDef.doctorId = this.currentDoctor.doctorId;
            this._log.log('Will generate the roster following the defination:', rosterDef);
            this._companies.generateRoster(rosterDef).subscribe(function (rosters) {
                _this._log.log('generated rosters = ', rosters.rosters);
                for (var _i = 0, _a = rosters.rosters; _i < _a.length; _i++) {
                    var r = _a[_i];
                    r.Clinic = { clinicName: workingSiteName_1 };
                    r.BookingType = { bookingTypeName: bookingTypeName_1 };
                    var roster = new roster_model_1.Roster(r);
                    _this._log.log(r, 'clinicIndex = ', clinicIndex_1, ' bookingTypeIndex = ', bookingTypeIndex_1);
                    _this._log.log(' roster =', roster);
                    _this.currentDoctor.rosters.push(roster);
                }
                _this._log.log('updated doctor = ', _this.currentDoctor);
                observer.next('success');
            }, function (err) {
                _this._log.log('error during generating doctor rosters', err);
                observer.error(err);
            });
        }
        return obs;
    };
    CompaniesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CompaniesService);
    return CompaniesService;
}());
exports.CompaniesService = CompaniesService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9zZXJ2aWNlcy9jb21wYW5pZXMuc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrQyxlQUFlLENBQUMsQ0FBQTtBQUNsRCwyQkFBeUIsaUJBQWlCLENBQUMsQ0FBQTtBQUUzQyxxQkFBNkIsZUFBZSxDQUFDLENBQUE7QUFDN0MsUUFBTyxTQUFTLENBQUMsQ0FBQTtBQUNqQixJQUFZLENBQUMsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBRTNDLDJCQUE0QixrQ0FBa0MsQ0FBQyxDQUFBO0FBQy9ELDJCQUErQixrQ0FBa0MsQ0FBQyxDQUFBO0FBQ2xFLGdDQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELDhCQUFzQix5QkFBeUIsQ0FBQyxDQUFBO0FBQ2hELDZCQUFxQix3QkFBd0IsQ0FBQyxDQUFBO0FBQzlDLDZCQUFxQix3QkFBd0IsQ0FBQyxDQUFBO0FBQzlDLGtDQUEwQiw2QkFBNkIsQ0FBQyxDQUFBO0FBRXhELDZCQUFxQix3QkFBd0IsQ0FBQyxDQUFBO0FBRzlDO0lBZ0JFO1FBTlEscUJBQWdCLEdBQVUsQ0FBQyxDQUFDO1FBQzVCLGFBQVEsR0FBTyxlQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyw2QkFBZ0IsRUFBQywwQkFBYSxFQUFDLDBCQUFRLEVBQUMscUJBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbkcsZUFBVSxHQUFpQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQywwQkFBYSxDQUFDLENBQUM7UUFDNUQsa0JBQWEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsNkJBQWdCLENBQUMsQ0FBQztRQUNyRSxTQUFJLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQVEsQ0FBQyxDQUFDO1FBR2xELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xHLENB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LENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3pDO2dCQUNELEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQixDQUFDLEVBQ0QsVUFBQSxHQUFHO2dCQUNELEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxFQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU1RCxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXRCLENBQUMsQ0FDRixDQUFDO1FBQ04sQ0FBQztRQUVELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBNWZIO1FBQUMsaUJBQVUsRUFBRTs7d0JBQUE7SUE2ZmIsdUJBQUM7QUFBRCxDQTVmQSxBQTRmQyxJQUFBO0FBNWZZLHdCQUFnQixtQkE0ZjVCLENBQUEiLCJmaWxlIjoiY29tcGFuaWVzL3NlcnZpY2VzL2NvbXBhbmllcy5zZXJ2aWNlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSxJbmplY3Rvcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0ICdyeGpzL1J4JztcbmltcG9ydCAqIGFzIF8gZnJvbSAndW5kZXJzY29yZS91bmRlcnNjb3JlJztcblxuaW1wb3J0IHtDQ29tcGFuaWVzQXBpfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbGJzZXJ2aWNlcyc7XG5pbXBvcnQge0NCb29raW5nVHlwZXNBcGl9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sYnNlcnZpY2VzJztcbmltcG9ydCB7TXlMb2dnZXJ9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHtDb21wYW55fSBmcm9tICcuLi9tb2RlbHMvY29tcGFueS5tb2RlbCc7XG5pbXBvcnQge0NsaW5pY30gZnJvbSAnLi4vbW9kZWxzL2NsaW5pYy5tb2RlbCc7XG5pbXBvcnQge0RvY3Rvcn0gZnJvbSAnLi4vbW9kZWxzL2RvY3Rvci5tb2RlbCc7XG5pbXBvcnQge0Jvb2tpbmdUeXBlfSBmcm9tICcuLi9tb2RlbHMvYm9va2luZ3R5cGUubW9kZWwnO1xuaW1wb3J0IHtQZW9wbGV9IGZyb20gJy4uLy4uL3Blb3BsZS9tb2RlbHMvcGVvcGxlLm1vZGVsJztcbmltcG9ydCB7Um9zdGVyfSBmcm9tICcuLi9tb2RlbHMvcm9zdGVyLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbXBhbmllc1NlcnZpY2Uge1xuICBcbiAgcHJpdmF0ZSBjb21wYW5pZXM6IENvbXBhbnlbXTtcbiAgcHJpdmF0ZSBib29raW5nVHlwZXM6IEJvb2tpbmdUeXBlW107XG4gIHByaXZhdGUgY2FuU2VsZWN0aW5nQm9va2luZ1R5cGVzOiBCb29raW5nVHlwZVtdOyAgXG4gIHByaXZhdGUgY2FuU2VsZWN0aW5nRG9jdG9yczogRG9jdG9yW107XG4gIHByaXZhdGUgY2FuU2VsZWN0aW5nQ2xpbmljOiBDbGluaWNbXTtcbiAgcHJpdmF0ZSBjdXJyZW50Q29tcGFueTogQ29tcGFueTtcbiAgcHJpdmF0ZSBjdXJyZW50Q2xpbmljOiBDbGluaWM7XG4gIHByaXZhdGUgY3VycmVudERvY3RvcjogRG9jdG9yO1xuICBwcml2YXRlIGNvdW50Q29uc3RydWN0b3I6bnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBpbmplY3RvcjphbnkgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtDQm9va2luZ1R5cGVzQXBpLENDb21wYW5pZXNBcGksTXlMb2dnZXIsSFRUUF9QUk9WSURFUlNdKTsgIFxuICBwcml2YXRlIF9jb21wYW5pZXM6Q0NvbXBhbmllc0FwaSA9IHRoaXMuaW5qZWN0b3IuZ2V0KENDb21wYW5pZXNBcGkpO1xuICBwcml2YXRlIF9ib29raW5ndHlwZXM6Q0Jvb2tpbmdUeXBlc0FwaSA9IHRoaXMuaW5qZWN0b3IuZ2V0KENCb29raW5nVHlwZXNBcGkpO1xuICBwcml2YXRlIF9sb2c6TXlMb2dnZXIgPSB0aGlzLmluamVjdG9yLmdldChNeUxvZ2dlcik7XG5cbiAgY29uc3RydWN0b3IoKXsvL3ByaXZhdGUgX2NvbXBhbmllczpDQ29tcGFuaWVzQXBpLHByaXZhdGUgX2xvZzogTXlMb2dnZXJcbiAgICB0aGlzLl9sb2cubG9nKCdDb21wYW5pZXNTZXJ2aWNlIC0tLS0tLS0tLS0tLS0tLS0tPiBjb25zdHJ1Y3RvciBjb3VudCA9ICcsdGhpcy5jb3VudENvbnN0cnVjdG9yKTsgIFxuICB9XG4gIFxuICBnZXRDb21wYW5pZXMoKTpPYnNlcnZhYmxlPENvbXBhbnk+IHtcbiBcbiAgICBsZXQgb2JzID0gIG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IFxuICAgICAge1xuICAgICAgICBpZih0aGlzLmNvbXBhbmllcyl7XG4gICAgICAgICAgdGhpcy5fbG9nLmxvZygnR2V0IGNvbXBhbmllcyBmcm9tIG1lbW9yeScpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQodGhpcy5jb21wYW5pZXMpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLl9jb21wYW5pZXMuZmluZCh7aW5jbHVkZTpbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVsYXRpb246J0NsaW5pY3MnLHNjb3BlOntpbmNsdWRlOltcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlbGF0aW9uOidCb29raW5nVHlwZXMnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlbGF0aW9uOidEb2N0b3JzJyxzY29wZTp7aW5jbHVkZTonUGVyc29uJ319XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWxhdGlvbjonRG9jdG9ycycsc2NvcGU6e2luY2x1ZGU6W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVsYXRpb246J1BlcnNvbid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVsYXRpb246J0NsaW5pY3MnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlbGF0aW9uOidCb29raW5nVHlwZXMnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlbGF0aW9uOidSb3N0ZXJzJyxzY29wZTp7aW5jbHVkZTpbJ0Jvb2tpbmdUeXBlJywnQ2xpbmljJ119fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdfSlcbiAgICAgICAgICAubWFwKChyZXMpPT57IFxuICAgICAgICAgICAgbGV0IGNvbXBhbmllczogQXJyYXk8Q29tcGFueT4gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5sb2coJ0dldCBjb21wYW5pZXMgZnJvbSBzZXJ2ZXIgYXQgc2VydmljZSA9ICcscmVzKTtcbiAgICAgICAgICAgIGZvcih2YXIgYyBvZiByZXMpeyAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvL3RoaXMuX2xvZy5sb2coJ29iamVjdCA9ICcsYykgIFxuICAgICAgICAgICAgICBsZXQgY29tcGFueTpDb21wYW55ID0gbmV3IENvbXBhbnkoYyk7ICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy90aGlzLl9sb2cubG9nKCdlbmRlZCBvYmplY3QnKTsgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBjb21wYW5pZXMucHVzaCggY29tcGFueSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90aGlzLl9sb2cubG9nKCdFbmRlZCB0cmFuc2Zvcm1pbmcgZGF0YSB0byBvYmplY3QgbW9kZWwuJyk7XG4gICAgICAgICAgICByZXR1cm4gY29tcGFuaWVzO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9sb2cubG9nKFwiR2V0IGZyb20gc2VydmVyIGFmdGVyIGNvbnZlcnQgdG8gY29tcGFueSBvYmplY3RzID0gXCIsZGF0YSk7XG4gICAgICAgICAgICAgIHRoaXMuY29tcGFuaWVzID0gZGF0YTtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpLFxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ2RvbmUnKSAgICAgICAgXG4gICAgICAgICAgKTsgIFxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9icztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2Fuc2VsZWN0aW5nQlRzKHNlbGVjdGVkQlRzOkJvb2tpbmdUeXBlW10sYnRzOkJvb2tpbmdUeXBlW10pIDogQXJyYXk8Qm9va2luZ1R5cGU+e1xuICAgIGxldCByZXR1cm5BcnJheTogQm9va2luZ1R5cGVbXSA9IF8uY2xvbmUoYnRzKTtcbiAgICBpZihzZWxlY3RlZEJUcyl7XG4gICAgICBmb3IodmFyIGJ0IG9mIHNlbGVjdGVkQlRzKXtcbiAgICAgICAgbGV0IGluZGV4ID0gXy5maW5kSW5kZXgocmV0dXJuQXJyYXkse2Jvb2tpbmdUeXBlSWQ6YnQuYm9va2luZ1R5cGVJZH0pO1xuICAgICAgICByZXR1cm5BcnJheS5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXR1cm5BcnJheTsgICAgXG4gIH1cblxuICBnZXRDYW5zZWxlY3RpbmdEb2N0b3JzKCkgOiBBcnJheTxEb2N0b3I+e1xuICAgIGxldCByZXR1cm5BcnJheTogRG9jdG9yW10gPSBfLmNsb25lKHRoaXMuY3VycmVudENvbXBhbnkuZG9jdG9ycyk7XG4gICAgaWYodGhpcy5jdXJyZW50Q2xpbmljKXtcbiAgICAgIGZvcih2YXIgYnQgb2YgdGhpcy5jdXJyZW50Q2xpbmljLmRvY3RvcnMpe1xuICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleChyZXR1cm5BcnJheSx7ZG9jdG9ySWQ6YnQuZG9jdG9ySWR9KTtcbiAgICAgICAgcmV0dXJuQXJyYXkuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgfVxuICAgIH0gICAgXG4gICAgcmV0dXJuIHJldHVybkFycmF5OyAgICBcbiAgfVxuXG4gIGdldENhbnNlbGVjdGluZ0NsaW5pY3MoKSA6IEFycmF5PENsaW5pYz57XG4gICAgbGV0IHJldHVybkFycmF5OiBDbGluaWNbXSA9IF8uY2xvbmUodGhpcy5jdXJyZW50Q29tcGFueS5jbGluaWNzKTtcbiAgICBpZih0aGlzLmN1cnJlbnREb2N0b3Ipe1xuICAgICAgZm9yKHZhciBidCBvZiB0aGlzLmN1cnJlbnREb2N0b3IuY2xpbmljcyl7XG4gICAgICAgIGxldCBpbmRleCA9IF8uZmluZEluZGV4KHJldHVybkFycmF5LHtjbGluaWNJZDpidC5jbGluaWNJZH0pO1xuICAgICAgICByZXR1cm5BcnJheS5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICB9XG4gICAgfSAgICBcbiAgICByZXR1cm4gcmV0dXJuQXJyYXk7ICAgIFxuICB9XG5cbiAgZ2V0Qm9va2luZ1R5cGVzKHR5cGU6c3RyaW5nKTpPYnNlcnZhYmxlPEJvb2tpbmdUeXBlPiB7XG4gICAgbGV0IHNlbGVjdGVkQlRzOkJvb2tpbmdUeXBlW10gPSBbXVxuICAgIGlmKHR5cGUgPT0gJ0RPQ1RPUicgJiYgdGhpcy5jdXJyZW50RG9jdG9yKXtcbiAgICAgIHNlbGVjdGVkQlRzID0gdGhpcy5jdXJyZW50RG9jdG9yLmJvb2tpbmdUeXBlcztcbiAgICB9ZWxzZSBpZih0eXBlID09ICdDTElOSUMnICYmIHRoaXMuY3VycmVudENsaW5pYyl7XG4gICAgICBzZWxlY3RlZEJUcyA9IHRoaXMuY3VycmVudENsaW5pYy5ib29raW5nVHlwZXM7XG4gICAgfVxuICAgIFxuICAgIGxldCBvYnMgPSAgbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4gXG4gICAgICB7XG4gICAgICAgIGlmKHRoaXMuYm9va2luZ1R5cGVzKXtcbiAgICAgICAgICB0aGlzLl9sb2cubG9nKCdHZXQgYm9va2luZyB0eXBlcyBmcm9tIG1lbW9yeScpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQodGhpcy5nZXRDYW5zZWxlY3RpbmdCVHMoc2VsZWN0ZWRCVHMsIHRoaXMuYm9va2luZ1R5cGVzKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuX2Jvb2tpbmd0eXBlcy5maW5kKHt3aGVyZTp7aXNlbmFibGU6MX19KVxuICAgICAgICAgIC5tYXAoKHJlcyk9PnsgXG4gICAgICAgICAgICBsZXQgYnRzOiBBcnJheTxCb29raW5nVHlwZT4gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2xvZy5sb2coJ0dldCBib29raW5nIHR5cGVzIGZyb20gc2VydmVyIGF0IHNlcnZpY2UgPSAnLHJlcyk7XG4gICAgICAgICAgICBmb3IodmFyIGMgb2YgcmVzKXsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgLy90aGlzLl9sb2cubG9nKCdvYmplY3QgPSAnLGMpICBcbiAgICAgICAgICAgICAgbGV0IGJ0OkJvb2tpbmdUeXBlID0gbmV3IEJvb2tpbmdUeXBlKGMpOyAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vdGhpcy5fbG9nLmxvZygnZW5kZWQgb2JqZWN0Jyk7ICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgYnRzLnB1c2goIGJ0ICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMuX2xvZy5sb2coJ0VuZGVkIHRyYW5zZm9ybWluZyBkYXRhIHRvIG9iamVjdCBtb2RlbC4nKTtcbiAgICAgICAgICAgIHJldHVybiBidHM7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2xvZy5sb2coXCJHZXQgZnJvbSBzZXJ2ZXIgYWZ0ZXIgY29udmVydCB0byBib29raW5nIHR5cGUgb2JqZWN0cyA9IFwiLGRhdGEpO1xuICAgICAgICAgICAgICB0aGlzLmJvb2tpbmdUeXBlcyA9IGRhdGE7ICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLmdldENhbnNlbGVjdGluZ0JUcyhzZWxlY3RlZEJUcywgdGhpcy5ib29raW5nVHlwZXMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpLFxuICAgICAgICAgICAgKCkgPT4gY29uc29sZS5sb2coJ2RvbmUnKSAgICAgICAgXG4gICAgICAgICAgKTsgIFxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9icztcbiAgfVxuXG4gIHNldEN1cnJlbnRDb21wYW55KGNvbXBhbnk6IENvbXBhbnkpOiB2b2lkeyAgICBcbiAgICB0aGlzLmN1cnJlbnRDb21wYW55ID0gY29tcGFueTtcbiAgICBjb25zb2xlLmxvZyhcInNldCBjdXJyZW50IGNvbXBhbnkgPSBcIix0aGlzLmN1cnJlbnRDb21wYW55KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRDb21wYW55KCk6IENvbXBhbnkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRDb21wYW55O1xuICB9XG5cbiAgc2V0Q3VycmVudENsaW5pYyhjbGluaWM6IENsaW5pYyk6IHZvaWR7ICAgIFxuICAgIHRoaXMuY3VycmVudENsaW5pYyA9IGNsaW5pYztcbiAgfVxuXG4gIGdldEN1cnJlbnRDbGluaWMoKTogQ2xpbmljIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q2xpbmljO1xuICB9XG5cbiAgc2V0Q3VycmVudERvY3RvcihwZXJzb246IFBlb3BsZSk6IHZvaWR7ICAgIFxuICAgIC8vdGhpcy5fbG9nLmxvZygnZG9jdG9yIGluZGV4ID0gJywgKTtcbiAgICBpZihwZXJzb24gJiYgcGVyc29uLnBlcnNvbklkKXtcbiAgICAgIGxldCBkb2N0b3JJbmRleCA9IF8uZmluZEluZGV4KHRoaXMuY3VycmVudENvbXBhbnkuZG9jdG9ycywge3BlcnNvbklkOiBwZXJzb24ucGVyc29uSWR9KTtcbiAgICAgIGlmKGRvY3RvckluZGV4ID49MCApe1xuICAgICAgICB0aGlzLmN1cnJlbnREb2N0b3IgPSB0aGlzLmN1cnJlbnRDb21wYW55LmRvY3RvcnNbZG9jdG9ySW5kZXhdO1xuICAgICAgICB0aGlzLmN1cnJlbnREb2N0b3Iuc2V0UGVyc29uKHBlcnNvbik7XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmN1cnJlbnREb2N0b3IgPSBuZXcgRG9jdG9yKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q3VycmVudERvY3RvcigpOiBEb2N0b3J7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudERvY3RvcjtcbiAgfVxuXG4gIHNhdmVDb21wYW55KGNvbXBhbnlPYmplY3QpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgbGV0IG9ic2VydmVyOmFueTtcbiAgICBsZXQgb2JzID0gbmV3IE9ic2VydmFibGUobyA9PiBvYnNlcnZlciA9IG8pO1xuICAgIGlmKHRoaXMuY3VycmVudENvbXBhbnkgJiYgdGhpcy5jdXJyZW50Q29tcGFueS5jb21wYW55SWQpe1xuICAgICAgbGV0IGFkZHJlc3MgPSBjb21wYW55T2JqZWN0LmFkZHJlc3NHcm91cDtcbiAgICAgIFxuICAgICAgdGhpcy5fbG9nLmxvZyhcIkNvbXBhbnkgc2VydmljZS5hZGRyZXNzID0gXCIsYWRkcmVzcyk7XG4gICAgICAvL2luIHRoZSBmb3JtOyBhZGRyZXNzIGlzIGEgc3ViZm9ybSwgaXQgY29udGFpbnMgYWRkcmVzcyx3YXJkLGRpc3RyaWN0LHByb3ZpbmNlLGNvdW50cnk7IHdlIG5lZWQgdG8gY29weSBhbGwgcHJvcGVydGllcyB0byBmYXRoZXIgb2JqZWN0ICAgICAgXG4gICAgICBjb21wYW55T2JqZWN0LmFkZHJlc3MgPSBhZGRyZXNzLmFkZHJlc3M7XG4gICAgICBjb21wYW55T2JqZWN0LndhcmQgPSBhZGRyZXNzLndhcmQ7XG4gICAgICBjb21wYW55T2JqZWN0LnN1YnVyYkRpc3RyaWN0ID0gYWRkcmVzcy5zdWJ1cmJEaXN0cmljdDtcbiAgICAgIGNvbXBhbnlPYmplY3Quc3RhdGVQcm92aW5jZSA9IGFkZHJlc3Muc3RhdGVQcm92aW5jZTtcbiAgICAgIGNvbXBhbnlPYmplY3QucG9zdGNvZGUgPSBhZGRyZXNzLnBvc3Rjb2RlO1xuICAgICAgY29tcGFueU9iamVjdC5jb3VudHJ5ID0gYWRkcmVzcy5jb3VudHJ5O1xuICAgICAgLy91cGRhdGVcbiAgICAgIHRoaXMuX2xvZy5sb2coXCJ3aWxsIHVwZGF0ZSB0aGlzIGNvbXBhbnlcIixjb21wYW55T2JqZWN0KTtcbiAgICAgIHRoaXMuX2NvbXBhbmllcy51cGRhdGVBdHRyaWJ1dGVzKHRoaXMuY3VycmVudENvbXBhbnkuY29tcGFueUlkLGNvbXBhbnlPYmplY3QpLnN1YnNjcmliZShcbiAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5fbG9nLmxvZyhkYXRhKTtcbiAgICAgICAgICBsZXQgdXBkYXRlZENvbXBhbnkgPSBuZXcgQ29tcGFueShkYXRhKVxuICAgICAgICAgIHRoaXMuc2V0Q3VycmVudENvbXBhbnkodXBkYXRlZENvbXBhbnkpO1xuICAgICAgICAgIGxldCBjb21wYW55SW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmNvbXBhbmllcywge2NvbXBhbnlJZDogZGF0YS5jb21wYW55SWR9KTtcblxuICAgICAgICAgIHRoaXMuX2xvZy5sb2coXCIgd2lsbCBmaW5kIHRoZSBjb21wYW55IHdpdGggaWQgPSBcIixkYXRhLmNvbXBhbnlJZCk7XG4gICAgICAgICAgdGhpcy5fbG9nLmxvZyhcIiBmaW5kIGNvbXBhbnkgcG9zaXRpb24gPSBcIiAsY29tcGFueUluZGV4KTtcbiAgICAgICAgICB0aGlzLmNvbXBhbmllc1tjb21wYW55SW5kZXhdID0gdXBkYXRlZENvbXBhbnk7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChkYXRhKTsgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7dGhpcy5fbG9nLmxvZyhlcnIpO30sXG4gICAgICAgICgpID0+IHt0aGlzLl9sb2cubG9nKCd1cGRhdGVkICEnKTt9XG4gICAgICAgICk7XG4gICAgfWVsc2V7XG4gICAgICAvL2NyZWF0ZSAgICAgIFxuICAgICAgY29tcGFueU9iamVjdC5jb21wYW55SWQgPSAwO1xuICAgICAgbGV0IGFkZHJlc3MgPSBjb21wYW55T2JqZWN0LmFkZHJlc3NHcm91cDtcbiAgICAgIFxuICAgICAgdGhpcy5fbG9nLmxvZyhcIkNvbXBhbnkgc2VydmljZS5hZGRyZXNzID0gXCIsYWRkcmVzcyk7XG4gICAgICAvL2luIHRoZSBmb3JtOyBhZGRyZXNzIGlzIGEgc3ViZm9ybSwgaXQgY29udGFpbnMgYWRkcmVzcyx3YXJkLGRpc3RyaWN0LHByb3ZpbmNlLGNvdW50cnk7IHdlIG5lZWQgdG8gY29weSBhbGwgcHJvcGVydGllcyB0byBmYXRoZXIgb2JqZWN0ICAgICAgXG4gICAgICBjb21wYW55T2JqZWN0LmFkZHJlc3MgPSBhZGRyZXNzLmFkZHJlc3M7XG4gICAgICBjb21wYW55T2JqZWN0LndhcmQgPSBhZGRyZXNzLndhcmQ7XG4gICAgICBjb21wYW55T2JqZWN0LnN1YnVyYkRpc3RyaWN0ID0gYWRkcmVzcy5zdWJ1cmJEaXN0cmljdDtcbiAgICAgIGNvbXBhbnlPYmplY3Quc3RhdGVQcm92aW5jZSA9IGFkZHJlc3Muc3RhdGVQcm92aW5jZTtcbiAgICAgIGNvbXBhbnlPYmplY3QucG9zdGNvZGUgPSBhZGRyZXNzLnBvc3Rjb2RlO1xuICAgICAgY29tcGFueU9iamVjdC5jb3VudHJ5ID0gYWRkcmVzcy5jb3VudHJ5O1xuICAgICAgdGhpcy5fbG9nLmxvZyhcIldpbGwgY3JlYXRlIHRoaXMgY29tcGFueVwiLGNvbXBhbnlPYmplY3QpO1xuICAgICAgdGhpcy5fY29tcGFuaWVzLmNyZWF0ZShjb21wYW55T2JqZWN0KS5zdWJzY3JpYmUoXG4gICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgIGxldCB1cGRhdGVkQ29tcGFueSA9IG5ldyBDb21wYW55KGRhdGEpXG4gICAgICAgICAgdGhpcy5fbG9nLmxvZyhkYXRhKTsgXG4gICAgICAgICAgdGhpcy5zZXRDdXJyZW50Q29tcGFueSh1cGRhdGVkQ29tcGFueSk7IFxuICAgICAgICAgIG9ic2VydmVyLm5leHQoZGF0YSk7IFxuICAgICAgICAgIHRoaXMuY29tcGFuaWVzLnB1c2godXBkYXRlZENvbXBhbnkpO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge3RoaXMuX2xvZy5sb2coZXJyKTt9LFxuICAgICAgICAoKSA9PiB7dGhpcy5fbG9nLmxvZygnY3JlYXRlZCAhJyk7fVxuICAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gb2JzO1xuICB9XG5cbiAgc2F2ZUNsaW5pYyhjbGluaWNPYmplY3QpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgbGV0IG9ic2VydmVyOmFueTtcbiAgICBsZXQgb2JzID0gbmV3IE9ic2VydmFibGUobyA9PiBvYnNlcnZlciA9IG8pO1xuXG4gICAgaWYodGhpcy5jdXJyZW50Q2xpbmljICYmIHRoaXMuY3VycmVudENsaW5pYy5jbGluaWNJZCl7XG4gICAgICAvL3VwZGF0ZVxuICAgICAgbGV0IGFkZHJlc3MgPSBjbGluaWNPYmplY3QuYWRkcmVzc0dyb3VwO1xuICAgICAgXG4gICAgICB0aGlzLl9sb2cubG9nKFwiQ29tcGFueSBzZXJ2aWNlLmFkZHJlc3MgPSBcIixhZGRyZXNzKTtcbiAgICAgIC8vaW4gdGhlIGZvcm07IGFkZHJlc3MgaXMgYSBzdWJmb3JtLCBpdCBjb250YWlucyBhZGRyZXNzLHdhcmQsZGlzdHJpY3QscHJvdmluY2UsY291bnRyeTsgd2UgbmVlZCB0byBjb3B5IGFsbCBwcm9wZXJ0aWVzIHRvIGZhdGhlciBvYmplY3QgICAgICBcbiAgICAgIGNsaW5pY09iamVjdC5hZGRyZXNzID0gYWRkcmVzcy5hZGRyZXNzO1xuICAgICAgY2xpbmljT2JqZWN0LndhcmQgPSBhZGRyZXNzLndhcmQ7XG4gICAgICBjbGluaWNPYmplY3Quc3VidXJiRGlzdHJpY3QgPSBhZGRyZXNzLnN1YnVyYkRpc3RyaWN0O1xuICAgICAgY2xpbmljT2JqZWN0LnN0YXRlUHJvdmluY2UgPSBhZGRyZXNzLnN0YXRlUHJvdmluY2U7XG4gICAgICBjbGluaWNPYmplY3QucG9zdGNvZGUgPSBhZGRyZXNzLnBvc3Rjb2RlO1xuICAgICAgY2xpbmljT2JqZWN0LmNvdW50cnkgPSBhZGRyZXNzLmNvdW50cnk7XG5cbiAgICAgIHRoaXMuX2xvZy5sb2coXCJ3aWxsIHVwZGF0ZSB0aGlzIGNsaW5pY1wiLGNsaW5pY09iamVjdCk7XG4gICAgICB0aGlzLl9jb21wYW5pZXMuX191cGRhdGVCeUlkX19DbGluaWNzKHRoaXMuY3VycmVudENvbXBhbnkuY29tcGFueUlkLHRoaXMuY3VycmVudENsaW5pYy5jbGluaWNJZCxjbGluaWNPYmplY3QpLnN1YnNjcmliZShcbiAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgbGV0IHVwZGF0ZWRDbGluaWMgPSBuZXcgQ2xpbmljKGRhdGEpXG4gICAgICAgICAgdGhpcy5fbG9nLmxvZyhkYXRhKTtcbiAgICAgICAgICB0aGlzLnNldEN1cnJlbnRDbGluaWModXBkYXRlZENsaW5pYyk7XG4gICAgICAgICAgbGV0IGNsaW5pY0luZGV4ID0gXy5maW5kSW5kZXgodGhpcy5jdXJyZW50Q29tcGFueS5jbGluaWNzLCB7Y2xpbmljSWQ6IGRhdGEuY2xpbmljSWR9KTtcblxuICAgICAgICAgIHRoaXMuX2xvZy5sb2coXCIgd2lsbCBmaW5kIHRoZSBjb21wYW55IHdpdGggaWQgPSBcIixkYXRhLmNsaW5pY0lkKTtcbiAgICAgICAgICB0aGlzLl9sb2cubG9nKFwiIGZpbmQgY29tcGFueSBwb3NpdGlvbiA9IFwiICxjbGluaWNJbmRleCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Q29tcGFueS5jbGluaWNzW2NsaW5pY0luZGV4XSA9IHVwZGF0ZWRDbGluaWM7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChkYXRhKTsgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7dGhpcy5fbG9nLmxvZyhlcnIpO30sXG4gICAgICAgICgpID0+IHt0aGlzLl9sb2cubG9nKCd1cGRhdGVkICEnKTt9XG4gICAgICAgICk7XG4gICAgfWVsc2V7XG4gICAgICAvL2NyZWF0ZSAgICAgIFxuICAgICAgbGV0IGFkZHJlc3MgPSBjbGluaWNPYmplY3QuYWRkcmVzc0dyb3VwO1xuICAgICAgXG4gICAgICB0aGlzLl9sb2cubG9nKFwiQ29tcGFueSBzZXJ2aWNlLmFkZHJlc3MgPSBcIixhZGRyZXNzKTtcbiAgICAgIC8vaW4gdGhlIGZvcm07IGFkZHJlc3MgaXMgYSBzdWJmb3JtLCBpdCBjb250YWlucyBhZGRyZXNzLHdhcmQsZGlzdHJpY3QscHJvdmluY2UsY291bnRyeTsgd2UgbmVlZCB0byBjb3B5IGFsbCBwcm9wZXJ0aWVzIHRvIGZhdGhlciBvYmplY3QgICAgICBcbiAgICAgIGNsaW5pY09iamVjdC5hZGRyZXNzID0gYWRkcmVzcy5hZGRyZXNzO1xuICAgICAgY2xpbmljT2JqZWN0LndhcmQgPSBhZGRyZXNzLndhcmQ7XG4gICAgICBjbGluaWNPYmplY3Quc3VidXJiRGlzdHJpY3QgPSBhZGRyZXNzLnN1YnVyYkRpc3RyaWN0O1xuICAgICAgY2xpbmljT2JqZWN0LnN0YXRlUHJvdmluY2UgPSBhZGRyZXNzLnN0YXRlUHJvdmluY2U7XG4gICAgICBjbGluaWNPYmplY3QucG9zdGNvZGUgPSBhZGRyZXNzLnBvc3Rjb2RlO1xuICAgICAgY2xpbmljT2JqZWN0LmNvdW50cnkgPSBhZGRyZXNzLmNvdW50cnk7XG5cbiAgICAgIGNsaW5pY09iamVjdC5jb21wYW55SWQgPSB0aGlzLmN1cnJlbnRDb21wYW55LmNvbXBhbnlJZDtcbiAgICAgIGNsaW5pY09iamVjdC5jbGluaWNJZCA9IDA7XG4gICAgICB0aGlzLl9sb2cubG9nKFwiV2lsbCBjcmVhdGUgdGhpcyBjb21wYW55XCIsY2xpbmljT2JqZWN0KTtcbiAgICAgIHRoaXMuX2NvbXBhbmllcy5fX2NyZWF0ZV9fQ2xpbmljcyh0aGlzLmN1cnJlbnRDb21wYW55LmNvbXBhbnlJZCxjbGluaWNPYmplY3QpLnN1YnNjcmliZShcbiAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgbGV0IHVwZGF0ZWRDbGluaWMgPSBuZXcgQ2xpbmljKGRhdGEpXG4gICAgICAgICAgdGhpcy5fbG9nLmxvZyhkYXRhKTsgXG4gICAgICAgICAgdGhpcy5zZXRDdXJyZW50Q2xpbmljKHVwZGF0ZWRDbGluaWMpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoZGF0YSk7IFxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBjbGluYywgY3VycmVudCBjb21wYW55ID1cIix0aGlzLmN1cnJlbnRDb21wYW55KTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDb21wYW55LmNsaW5pY3MucHVzaCh1cGRhdGVkQ2xpbmljKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHt0aGlzLl9sb2cubG9nKGVycik7fSxcbiAgICAgICAgKCkgPT4ge3RoaXMuX2xvZy5sb2coJ2NyZWF0ZWQgIScpO31cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG9icztcbiAgfVxuXG4gIHNhdmVEb2N0b3IoZG9jdG9yT2JqZWN0OiBEb2N0b3IscGVyc29uOlBlb3BsZSk6IE9ic2VydmFibGU8YW55PntcbiAgICBsZXQgb2JzZXJ2ZXI6YW55O1xuICAgIGxldCBvYnMgPSBuZXcgT2JzZXJ2YWJsZShvID0+IG9ic2VydmVyID0gbyk7XG5cbiAgICBpZihkb2N0b3JPYmplY3QgJiYgZG9jdG9yT2JqZWN0LmRvY3RvcklkKXtcbiAgICAgIC8vdXBkYXRlXG4gICAgICB0aGlzLl9sb2cubG9nKFwid2lsbCB1cGRhdGUgdGhpcyBkb2N0b3JcIixkb2N0b3JPYmplY3QpO1xuICAgICAgdGhpcy5fY29tcGFuaWVzLl9fdXBkYXRlQnlJZF9fRG9jdG9ycyh0aGlzLmN1cnJlbnRDb21wYW55LmNvbXBhbnlJZCxkb2N0b3JPYmplY3QuZG9jdG9ySWQsZG9jdG9yT2JqZWN0KS5zdWJzY3JpYmUoXG4gICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgIGxldCB1cGRhdGVkRG9jdG9yID0gbmV3IERvY3RvcihkYXRhKTtcbiAgICAgICAgICB1cGRhdGVkRG9jdG9yLnNldFBlcnNvbihwZXJzb24pO1xuICAgICAgICAgIHRoaXMuX2xvZy5sb2coZGF0YSk7XG4gICAgICAgICAgdGhpcy5zZXRDdXJyZW50RG9jdG9yKHBlcnNvbik7ICAgICAgICAgIFxuICAgICAgICAgIGxldCBkb2N0b3JJbmRleCA9IF8uZmluZEluZGV4KHRoaXMuY3VycmVudENvbXBhbnkuZG9jdG9ycywge2RvY3RvcklkOiBkYXRhLmRvY3RvcklkfSk7XG5cbiAgICAgICAgICB0aGlzLl9sb2cubG9nKFwiIHdpbGwgZmluZCB0aGUgZG9jdG9yIHdpdGggaWQgPSBcIixkYXRhLmRvY3RvcklkKTtcbiAgICAgICAgICB0aGlzLl9sb2cubG9nKFwiIGZpbmQgZG9jdG9yIHBvc2l0aW9uID0gXCIgLGRvY3RvckluZGV4KTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRDb21wYW55LmRvY3RvcnNbZG9jdG9ySW5kZXhdID0gdXBkYXRlZERvY3RvcjtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGEpOyAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHt0aGlzLl9sb2cubG9nKGVycik7fSxcbiAgICAgICAgKCkgPT4ge3RoaXMuX2xvZy5sb2coJ3VwZGF0ZWQgIScpO31cbiAgICAgICAgKTtcbiAgICB9ZWxzZXtcbiAgICAgIC8vY3JlYXRlICAgICAgXG4gICAgICBkb2N0b3JPYmplY3QuY29tcGFueUlkID0gdGhpcy5jdXJyZW50Q29tcGFueS5jb21wYW55SWQ7XG4gICAgICBkb2N0b3JPYmplY3QuZG9jdG9ySWQgPSAwO1xuICAgICAgZG9jdG9yT2JqZWN0LnBlcnNvbklkID0gcGVyc29uLnBlcnNvbklkO1xuICAgICAgdGhpcy5fbG9nLmxvZyhcIldpbGwgY3JlYXRlIHRoaXMgZG9jdG9yXCIsZG9jdG9yT2JqZWN0KTtcbiAgICAgIHRoaXMuX2NvbXBhbmllcy5fX2NyZWF0ZV9fRG9jdG9ycyh0aGlzLmN1cnJlbnRDb21wYW55LmNvbXBhbnlJZCxkb2N0b3JPYmplY3QpLnN1YnNjcmliZShcbiAgICAgICAgZGF0YSA9PiB7ICAgICAgICAgIFxuICAgICAgICAgIGxldCBuZXdEb2N0b3IgPSBuZXcgRG9jdG9yKGRhdGEpO1xuICAgICAgICAgIG5ld0RvY3Rvci5zZXRQZXJzb24ocGVyc29uKTtcbiAgICAgICAgICB0aGlzLl9sb2cubG9nKFwiY3JlYXRlZCBuZXcgZG9jdG9yID0gXCIsbmV3RG9jdG9yKTsgICAgICAgICAgIFxuICAgICAgICAgIHRoaXMuY3VycmVudENvbXBhbnkuZG9jdG9ycy5wdXNoKG5ld0RvY3Rvcik7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChkYXRhKTsgICAgICAgICAgIFxuICAgICAgICAgIHRoaXMuc2V0Q3VycmVudERvY3RvcihwZXJzb24pO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge3RoaXMuX2xvZy5sb2coZXJyKTt9LFxuICAgICAgICAoKSA9PiB7dGhpcy5fbG9nLmxvZygnY3JlYXRlZCAhJyk7fVxuICAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gb2JzO1xuICB9XG5cbiAgZG9jdG9yUmVtb3ZlQlQoYnRJZDpudW1iZXIsdHlwZTpzdHJpbmcpe1xuICAgIHRoaXMuX2xvZy5sb2coJ1dpbGwgcmVtb3ZlIHRoaXMgYnQgOiAnLGJ0SWQpO1xuICAgIGlmKHR5cGU9PSdET0NUT1InKXtcbiAgICAgIHRoaXMuX2NvbXBhbmllcy5fX3VubGlua19fRG9jdG9yc19fQm9va2luZ1R5cGVzKHRoaXMuY3VycmVudENvbXBhbnkuY29tcGFueUlkLHRoaXMuY3VycmVudERvY3Rvci5kb2N0b3JJZCxidElkKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fbG9nLmxvZygndW5saW5rIGRvY3RvciAtIGJvb2tpbmcgdHlwZSA9JyxkYXRhKTtcbiAgICAgICAgICAgICAgbGV0IGJ0SW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmN1cnJlbnREb2N0b3IuYm9va2luZ1R5cGVzLHtib29raW5nVHlwZUlkOmJ0SWR9KTtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RG9jdG9yLmJvb2tpbmdUeXBlcy5zcGxpY2UoYnRJbmRleCwxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge3RoaXMuX2xvZy5sb2coJ3VubGluayBkb2N0b3IgLSBib29raW5nIHR5cGUgPScsZXJyKTt9LFxuICAgICAgICAgICAgKCkgPT4ge3RoaXMuX2xvZy5sb2coJ3VubGluayBkb2N0b3IgLSBib29raW5nIGNvbXBsZXRlZCcpO31cbiAgICAgICAgICAgICk7ICAgICAgXG4gICAgfWVsc2UgaWYodHlwZT09J0NMSU5JQycpe1xuICAgICAgdGhpcy5fY29tcGFuaWVzLl9fdW5saW5rX19DbGluaWNzX19Cb29raW5nVHlwZXModGhpcy5jdXJyZW50Q29tcGFueS5jb21wYW55SWQsdGhpcy5jdXJyZW50Q2xpbmljLmNsaW5pY0lkLGJ0SWQpXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9sb2cubG9nKCd1bmxpbmsgY2xpbmljIC0gYm9va2luZyB0eXBlID0nLGRhdGEpO1xuICAgICAgICAgICAgICBsZXQgYnRJbmRleCA9IF8uZmluZEluZGV4KHRoaXMuY3VycmVudENsaW5pYy5ib29raW5nVHlwZXMse2Jvb2tpbmdUeXBlSWQ6YnRJZH0pO1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDbGluaWMuYm9va2luZ1R5cGVzLnNwbGljZShidEluZGV4LDEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB7dGhpcy5fbG9nLmxvZygndW5saW5rIGNsaW5pYyAtIGJvb2tpbmcgdHlwZSA9JyxlcnIpO30sXG4gICAgICAgICAgICAoKSA9PiB7dGhpcy5fbG9nLmxvZygndW5saW5rIGNsaW5pYyAtIGJvb2tpbmcgY29tcGxldGVkJyk7fVxuICAgICAgICAgICAgKTsgICAgICBcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuX2xvZy5sb2coJ3RoZSBzZXJ2aWNlIGRvIG5vdCBrbm93IHRoZSB0eXBlID0gJyx0eXBlKTtcbiAgICB9XG4gIH1cblxuICBkb2N0b3JBZGRCVChidElkOm51bWJlcix0eXBlOnN0cmluZyl7XG4gICAgdGhpcy5fbG9nLmxvZygnV2lsbCBhZGQgdGhpcyBidCA6ICcsYnRJZCk7XG4gICAgaWYodHlwZT09J0RPQ1RPUicpe1xuICAgICAgdGhpcy5fY29tcGFuaWVzLl9fbGlua19fRG9jdG9yc19fQm9va2luZ1R5cGVzKHRoaXMuY3VycmVudENvbXBhbnkuY29tcGFueUlkLHRoaXMuY3VycmVudERvY3Rvci5kb2N0b3JJZCxidElkLHtkb2N0b3JJZDp0aGlzLmN1cnJlbnREb2N0b3IuZG9jdG9ySWQsYm9va2luZ1R5cGVJZDpidElkLGlzZW5hYmxlOjF9KVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fbG9nLmxvZygnbGluayBkb2N0b3IgLSBib29raW5nIHR5cGUgPScsZGF0YSk7XG4gICAgICAgICAgICAgIGxldCBidEluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5ib29raW5nVHlwZXMse2Jvb2tpbmdUeXBlSWQ6ZGF0YS5ib29raW5nVHlwZUlkfSk7XG4gICAgICAgICAgICAgIHRoaXMuX2xvZy5sb2coJ2J0SWQgPSAnLGJ0SWQsJ2J0SW5kZXggPSAnLGJ0SW5kZXgsJyBidCA9ICcsdGhpcy5ib29raW5nVHlwZXNbYnRJbmRleF0sJyBidHMgPSAnLHRoaXMuYm9va2luZ1R5cGVzKTtcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RG9jdG9yLmJvb2tpbmdUeXBlcy5wdXNoKHRoaXMuYm9va2luZ1R5cGVzW2J0SW5kZXhdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge3RoaXMuX2xvZy5sb2coJ2xpbmsgZG9jdG9yIC0gYm9va2luZyB0eXBlID0nLGVycik7fSxcbiAgICAgICAgICAgICgpID0+IHt0aGlzLl9sb2cubG9nKCdsaW5rIGRvY3RvciAtIGJvb2tpbmcgY29tcGxldGVkJyk7fVxuICAgICAgICAgICAgKTtcbiAgICB9ZWxzZSBpZih0eXBlPT0nQ0xJTklDJyl7XG4gICAgICB0aGlzLl9jb21wYW5pZXMuX19saW5rX19DbGluaWNzX19Cb29raW5nVHlwZXModGhpcy5jdXJyZW50Q29tcGFueS5jb21wYW55SWQsdGhpcy5jdXJyZW50Q2xpbmljLmNsaW5pY0lkLGJ0SWQse2NsaW5pY0lkOnRoaXMuY3VycmVudENsaW5pYy5jbGluaWNJZCxib29raW5nVHlwZUlkOmJ0SWQsaXNlbmFibGU6MX0pXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9sb2cubG9nKCdsaW5rIGNsaW5pYyAtIGJvb2tpbmcgdHlwZSA9JyxkYXRhKTtcbiAgICAgICAgICAgICAgbGV0IGJ0SW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmJvb2tpbmdUeXBlcyx7Ym9va2luZ1R5cGVJZDpkYXRhLmJvb2tpbmdUeXBlSWR9KTtcbiAgICAgICAgICAgICAgdGhpcy5fbG9nLmxvZygnYnRJZCA9ICcsYnRJZCwnYnRJbmRleCA9ICcsYnRJbmRleCwnIGJ0ID0gJyx0aGlzLmJvb2tpbmdUeXBlc1tidEluZGV4XSwnIGJ0cyA9ICcsdGhpcy5ib29raW5nVHlwZXMpO1xuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDbGluaWMuYm9va2luZ1R5cGVzLnB1c2godGhpcy5ib29raW5nVHlwZXNbYnRJbmRleF0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB7dGhpcy5fbG9nLmxvZygnbGluayBjbGluaWMgLSBib29raW5nIHR5cGUgPScsZXJyKTt9LFxuICAgICAgICAgICAgKCkgPT4ge3RoaXMuX2xvZy5sb2coJ2xpbmsgY2xpbmljIC0gYm9va2luZyBjb21wbGV0ZWQnKTt9XG4gICAgICAgICAgICApO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5fbG9nLmxvZygndGhlIHNlcnZpY2UgZG8gbm90IGtub3cgdGhlIHR5cGUgPSAnLHR5cGUpO1xuICAgIH0gICAgXG4gIH1cblxuICBjbGluaWNSZW1vdmVEb2N0b3IoZG9jdG9ySWQ6bnVtYmVyKXtcbiAgICAgIHRoaXMuX2xvZy5sb2coJ1dpbGwgcmVtb3ZlIHRoaXMgYnQgOiAnLGRvY3RvcklkKTtcbiAgICAgIGlmKHRoaXMuY3VycmVudENsaW5pYyl7XG4gICAgICAgIHRoaXMuX2NvbXBhbmllcy5fX3VubGlua19fQ2xpbmljc19fRG9jdG9ycyh0aGlzLmN1cnJlbnRDb21wYW55LmNvbXBhbnlJZCx0aGlzLmN1cnJlbnRDbGluaWMuY2xpbmljSWQsZG9jdG9ySWQpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICBkYXRhID0+IHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGJ0SW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmN1cnJlbnRDbGluaWMuZG9jdG9ycyx7ZG9jdG9ySWQ6ZG9jdG9ySWR9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDbGluaWMuZG9jdG9ycy5zcGxpY2UoYnRJbmRleCwxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2cubG9nKCd1bmxpbmsgZG9jdG9yIC0gYm9va2luZyB0eXBlID0nLGRhdGEsJ2N1cnJlbnRDbGluaWM9Jyx0aGlzLmN1cnJlbnRDbGluaWMpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBlcnIgPT4ge3RoaXMuX2xvZy5sb2coJ3VubGluayBkb2N0b3IgLSBib29raW5nIHR5cGUgPScsZXJyKTt9LFxuICAgICAgICAgICAgICAoKSA9PiB7dGhpcy5fbG9nLmxvZygndW5saW5rIGRvY3RvciAtIGJvb2tpbmcgY29tcGxldGVkJyk7fVxuICAgICAgICAgICAgICApOyAgICAgIFxuICAgICAgfSAgICBcbiAgfVxuXG4gIGNsaW5pY0FkZERvY3Rvcihkb2N0b3JJZDpudW1iZXIpe1xuXG4gICAgICB0aGlzLl9sb2cubG9nKCdXaWxsIGFkZCB0aGlzIGJ0IDogJyxkb2N0b3JJZCk7XG5cbiAgICAgIHRoaXMuX2NvbXBhbmllcy5fX2xpbmtfX0NsaW5pY3NfX0RvY3RvcnModGhpcy5jdXJyZW50Q29tcGFueS5jb21wYW55SWQsdGhpcy5jdXJyZW50Q2xpbmljLmNsaW5pY0lkLGRvY3RvcklkLHtjbGluaWNJZDp0aGlzLmN1cnJlbnRDbGluaWMuY2xpbmljSWQsZG9jdG9ySWQ6ZG9jdG9ySWQsaXNlbmFibGU6MX0pXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9sb2cubG9nKCdsaW5rIGRvY3RvciAtIGJvb2tpbmcgdHlwZSA9JyxkYXRhKTtcbiAgICAgICAgICAgICAgbGV0IGJ0SW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmN1cnJlbnRDb21wYW55LmRvY3RvcnMse2RvY3RvcklkOmRhdGEuZG9jdG9ySWR9KTsgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDbGluaWMuZG9jdG9ycy5wdXNoKHRoaXMuY3VycmVudENvbXBhbnkuZG9jdG9yc1tidEluZGV4XSk7XG4gICAgICAgICAgICAgIHRoaXMuX2xvZy5sb2coJ2J0SWQgPSAnLGRvY3RvcklkLCdidEluZGV4ID0gJyxidEluZGV4LCcgYnQgPSAnLHRoaXMuY3VycmVudENvbXBhbnkuZG9jdG9yc1tidEluZGV4XSwnIGJ0cyA9ICcsdGhpcy5jdXJyZW50Q29tcGFueS5kb2N0b3JzLCdjdXJyZW50IGNsaW5pYyA9ICcsdGhpcy5jdXJyZW50Q2xpbmljKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge3RoaXMuX2xvZy5sb2coJ2xpbmsgZG9jdG9yIC0gYm9va2luZyB0eXBlID0nLGVycik7fSxcbiAgICAgICAgICAgICgpID0+IHt0aGlzLl9sb2cubG9nKCdsaW5rIGRvY3RvciAtIGJvb2tpbmcgY29tcGxldGVkJyk7fVxuICAgICAgICAgICAgKTtcbiAgfVxuXG4gIGRvY3RvclJlbW92ZUNsaW5pYyhjbGluaWNJZDpudW1iZXIpe1xuICAgICAgdGhpcy5fbG9nLmxvZygnV2lsbCByZW1vdmUgdGhpcyBidCA6ICcsY2xpbmljSWQpO1xuICAgICAgaWYodGhpcy5jdXJyZW50RG9jdG9yKXtcbiAgICAgICAgdGhpcy5fY29tcGFuaWVzLl9fdW5saW5rX19Eb2N0b3JzX19DbGluaWNzKHRoaXMuY3VycmVudENvbXBhbnkuY29tcGFueUlkLHRoaXMuY3VycmVudERvY3Rvci5kb2N0b3JJZCxjbGluaWNJZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgIGRhdGEgPT4geyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgYnRJbmRleCA9IF8uZmluZEluZGV4KHRoaXMuY3VycmVudERvY3Rvci5jbGluaWNzLHtjbGluaWNJZDpjbGluaWNJZH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERvY3Rvci5jbGluaWNzLnNwbGljZShidEluZGV4LDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvZy5sb2coJ3VubGluayBkb2N0b3IgLSBjbGluaWMgPScsZGF0YSwnY3VycmVudENsaW5pYz0nLHRoaXMuY3VycmVudERvY3Rvcik7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGVyciA9PiB7dGhpcy5fbG9nLmxvZygndW5saW5rIGRvY3RvciAtIGJvb2tpbmcgdHlwZSA9JyxlcnIpO30sXG4gICAgICAgICAgICAgICgpID0+IHt0aGlzLl9sb2cubG9nKCd1bmxpbmsgZG9jdG9yIC0gYm9va2luZyBjb21wbGV0ZWQnKTt9XG4gICAgICAgICAgICAgICk7ICAgICAgXG4gICAgICB9ICAgIFxuICB9XG5cbiAgZG9jdG9yQWRkQ2xpbmljKGNsaW5pY0lkOm51bWJlcil7IFxuXG4gICAgICB0aGlzLl9sb2cubG9nKCdXaWxsIGFkZCB0aGlzIGJ0IDogJyxjbGluaWNJZCk7XG5cbiAgICAgIHRoaXMuX2NvbXBhbmllcy5fX2xpbmtfX0RvY3RvcnNfX0NsaW5pY3ModGhpcy5jdXJyZW50Q29tcGFueS5jb21wYW55SWQsdGhpcy5jdXJyZW50RG9jdG9yLmRvY3RvcklkLGNsaW5pY0lkLHtkb2N0b3JJZDp0aGlzLmN1cnJlbnREb2N0b3IuZG9jdG9ySWQsY2xpbmljSWQ6Y2xpbmljSWQsaXNlbmFibGU6MX0pXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9sb2cubG9nKCdsaW5rIGRvY3RvciAtIGJvb2tpbmcgdHlwZSA9JyxkYXRhKTtcbiAgICAgICAgICAgICAgbGV0IGJ0SW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmN1cnJlbnRDb21wYW55LmNsaW5pY3Mse2NsaW5pY0lkOmRhdGEuY2xpbmljSWR9KTsgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREb2N0b3IuY2xpbmljcy5wdXNoKHRoaXMuY3VycmVudENvbXBhbnkuY2xpbmljc1tidEluZGV4XSk7XG4gICAgICAgICAgICAgIHRoaXMuX2xvZy5sb2coJ2J0SWQgPSAnLGNsaW5pY0lkLCdidEluZGV4ID0gJyxidEluZGV4LCcgYnQgPSAnLHRoaXMuY3VycmVudENvbXBhbnkuY2xpbmljc1tidEluZGV4XSwnIGJ0cyA9ICcsdGhpcy5jdXJyZW50Q29tcGFueS5jbGluaWNzLCdjdXJyZW50IGNsaW5pYyA9ICcsdGhpcy5jdXJyZW50RG9jdG9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4ge3RoaXMuX2xvZy5sb2coJ2xpbmsgZG9jdG9yIC0gYm9va2luZyB0eXBlID0nLGVycik7fSxcbiAgICAgICAgICAgICgpID0+IHt0aGlzLl9sb2cubG9nKCdsaW5rIGRvY3RvciAtIGJvb2tpbmcgY29tcGxldGVkJyk7fVxuICAgICAgICAgICAgKTtcbiAgfVxuXG4gIGdlbmVyYXRlUm9zdGVyKHJvc3RlckRlZjphbnkpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgbGV0IG9ic2VydmVyOk9ic2VydmVyPGFueT47XG4gICAgbGV0IG9icyA9IG5ldyBPYnNlcnZhYmxlKG8gPT4gb2JzZXJ2ZXIgPSBvKTtcblxuICAgIGlmKHRoaXMuY3VycmVudERvY3Rvcil7XG4gICAgICBsZXQgY2xpbmljSW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLmN1cnJlbnREb2N0b3IuY2xpbmljcyx7Y2xpbmljSWQ6cGFyc2VJbnQocm9zdGVyRGVmLndvcmtpbmdTaXRlSWQpfSk7XG4gICAgICBsZXQgYm9va2luZ1R5cGVJbmRleCA9IF8uZmluZEluZGV4KHRoaXMuY3VycmVudERvY3Rvci5ib29raW5nVHlwZXMse2Jvb2tpbmdUeXBlSWQ6cGFyc2VJbnQocm9zdGVyRGVmLmJvb2tpbmdUeXBlSWQpfSk7XG4gICAgICB0aGlzLl9sb2cubG9nKCdjdXJyZW50RG9jdG9yID0gJyx0aGlzLmN1cnJlbnREb2N0b3IsJyBjbGluaWNJbmRleCA9ICcsY2xpbmljSW5kZXgsJyBib29raW5nVHlwZUluZGV4ID0gJyxib29raW5nVHlwZUluZGV4KTtcbiAgICAgIGxldCB3b3JraW5nU2l0ZU5hbWUgPSB0aGlzLmN1cnJlbnREb2N0b3IuY2xpbmljc1tjbGluaWNJbmRleF0uY2xpbmljTmFtZTtcbiAgICAgIGxldCBib29raW5nVHlwZU5hbWUgPSB0aGlzLmN1cnJlbnREb2N0b3IuYm9va2luZ1R5cGVzW2Jvb2tpbmdUeXBlSW5kZXhdLmJvb2tpbmdUeXBlTmFtZTsgICAgICBcbiAgICAgIHJvc3RlckRlZi5kb2N0b3JJZCA9IHRoaXMuY3VycmVudERvY3Rvci5kb2N0b3JJZDtcbiAgICAgIHRoaXMuX2xvZy5sb2coJ1dpbGwgZ2VuZXJhdGUgdGhlIHJvc3RlciBmb2xsb3dpbmcgdGhlIGRlZmluYXRpb246Jyxyb3N0ZXJEZWYpO1xuICAgICAgdGhpcy5fY29tcGFuaWVzLmdlbmVyYXRlUm9zdGVyKHJvc3RlckRlZikuc3Vic2NyaWJlKFxuICAgICAgICAgIHJvc3RlcnMgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9nLmxvZygnZ2VuZXJhdGVkIHJvc3RlcnMgPSAnLHJvc3RlcnMucm9zdGVycyk7ICAgICBcbiAgICAgICAgICAgIGZvcih2YXIgciBvZiByb3N0ZXJzLnJvc3RlcnMpe1xuICAgICAgICAgICAgICByLkNsaW5pYyA9IHtjbGluaWNOYW1lOndvcmtpbmdTaXRlTmFtZX07XG4gICAgICAgICAgICAgIHIuQm9va2luZ1R5cGUgPSB7Ym9va2luZ1R5cGVOYW1lOmJvb2tpbmdUeXBlTmFtZX07XG4gICAgICAgICAgICAgIGxldCByb3N0ZXIgPSBuZXcgUm9zdGVyKHIpOyAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHRoaXMuX2xvZy5sb2cociwnY2xpbmljSW5kZXggPSAnLGNsaW5pY0luZGV4LCcgYm9va2luZ1R5cGVJbmRleCA9ICcsYm9va2luZ1R5cGVJbmRleCk7XG4gICAgICAgICAgICAgIHRoaXMuX2xvZy5sb2coJyByb3N0ZXIgPScscm9zdGVyKVxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREb2N0b3Iucm9zdGVycy5wdXNoKHJvc3Rlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9sb2cubG9nKCd1cGRhdGVkIGRvY3RvciA9ICcsdGhpcy5jdXJyZW50RG9jdG9yKTtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLl9sb2cubG9nKCdlcnJvciBkdXJpbmcgZ2VuZXJhdGluZyBkb2N0b3Igcm9zdGVycycsZXJyKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBvYnM7XG4gIH1cbn1cbiJdfQ==
