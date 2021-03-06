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
var peoplelist_component_1 = require('../../people/components/peoplelist.component');
var logging_service_1 = require('../../shared/services/logging.service');
var DoctorListComponent = (function () {
    function DoctorListComponent(_log) {
        this._log = _log;
        this.rowClicked = new core_1.EventEmitter();
        this.personIds = [];
        this.columns = [{ title: 'First Name', fieldName: 'firstName' },
            { title: 'Last Name', fieldName: 'lastName' },
            { title: 'Mobile', fieldName: 'mobile' },
            { title: 'Address', fieldName: 'address' }];
        console.log("doctor list component....");
    }
    DoctorListComponent.prototype.fireRowClicked = function (row) {
        this.rowClicked.next(row);
    };
    DoctorListComponent.prototype.ngOnInit = function () {
        for (var _i = 0, _a = this.doctors; _i < _a.length; _i++) {
            var d = _a[_i];
            this.personIds.push(d.personId);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DoctorListComponent.prototype, "doctors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DoctorListComponent.prototype, "rowClicked", void 0);
    DoctorListComponent = __decorate([
        core_1.Component({
            selector: 'doctor-list',
            templateUrl: './companies/components/doctorlist.component.html',
            providers: [],
            directives: [peoplelist_component_1.PeopleListComponent]
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger])
    ], DoctorListComponent);
    return DoctorListComponent;
}());
exports.DoctorListComponent = DoctorListComponent;
//# sourceMappingURL=doctorlist.component.js.map