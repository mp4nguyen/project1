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
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
var lbservices_1 = require('../../shared/services/lbservices');
var logging_service_1 = require('../../shared/services/logging.service');
var people_model_1 = require('../models/people.model');
var PeopleService = (function () {
    function PeopleService() {
        this.injector = core_1.Injector.resolveAndCreate([lbservices_1.CPeopleApi, logging_service_1.MyLogger, http_1.HTTP_PROVIDERS]);
        this._people = this.injector.get(lbservices_1.CPeopleApi);
        this._log = this.injector.get(logging_service_1.MyLogger);
        this.countContructor = 0;
        this.countContructor++;
        console.log('People server constructor ....................................................................', this.countContructor);
    }
    PeopleService.prototype.getPeople = function (personIds) {
        var _this = this;
        var obs = new Observable_1.Observable(function (observer) {
            if (_this.people) {
                observer.next(_this.people);
            }
            else {
                _this._people.find({ where: { personId: { inq: personIds } } })
                    .map(function (res) {
                    var people = [];
                    for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                        var c = res_1[_i];
                        var person = new people_model_1.People(c);
                        people.push(person);
                    }
                    return people;
                })
                    .subscribe(function (data) { console.log("Get from server = ", data); _this.people = data; observer.next(data); }, function (err) { return console.error(err); }, function () { return console.log('done'); });
            }
        });
        return obs;
    };
    PeopleService.prototype.savePerson = function (personObject) {
        var _this = this;
        var observer;
        var obs = new Observable_1.Observable(function (o) { return observer = o; });
        if (personObject && personObject.personId) {
            var address = personObject.addressGroup;
            this._log.log("People service.address = ", address);
            personObject.address = address.address;
            personObject.ward = address.ward;
            personObject.suburbDistrict = address.suburbDistrict;
            personObject.stateProvince = address.stateProvince;
            personObject.postcode = address.postcode;
            personObject.country = address.country;
            this._log.log("will update this person", personObject);
            this._people.updateAttributes(personObject.personId, personObject).subscribe(function (data) {
                _this._log.log(data);
                observer.next(data);
            }, function (err) { _this._log.log(err); }, function () { _this._log.log('updated !'); });
        }
        else {
            personObject.personId = 0;
            var address = personObject.addressGroup;
            this._log.log("People service.address = ", address);
            personObject.address = address.address;
            personObject.ward = address.ward;
            personObject.suburbDistrict = address.suburbDistrict;
            personObject.stateProvince = address.stateProvince;
            personObject.postcode = address.postcode;
            personObject.country = address.country;
            this._log.log("Will create this person", personObject);
            this._people.create(personObject).subscribe(function (data) {
                observer.next(data);
            }, function (err) { _this._log.log(err); }, function () { _this._log.log('created !'); });
        }
        return obs;
    };
    PeopleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PeopleService);
    return PeopleService;
}());
exports.PeopleService = PeopleService;
//# sourceMappingURL=people.services.js.map