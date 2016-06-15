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
var router_1 = require('angular2/router');
var people_services_1 = require('../services/people.services');
var logging_service_1 = require('../../shared/services/logging.service');
var table_component_1 = require('../../shared/components/table/table.component');
var PeopleListComponent = (function () {
    function PeopleListComponent(_log, _router, _peopleService) {
        this._log = _log;
        this._router = _router;
        this._peopleService = _peopleService;
        this.rowClicked = new core_1.EventEmitter();
        this.columns = [{ title: 'First Name', fieldName: 'firstName' },
            { title: 'Last Name', fieldName: 'lastName' },
            { title: 'Mobile', fieldName: 'mobile' },
            { title: 'Address', fieldName: 'address' }];
    }
    PeopleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._peopleService.getPeople(this.personIds).subscribe(function (data) { _this.people = data; });
        this._log.log('will view personIds = ', this.personIds);
    };
    PeopleListComponent.prototype.fireRowClicked = function (row) {
        this._log.log("People -> clicked row = ", row);
        this.rowClicked.next(row);
    };
    PeopleListComponent.prototype.setCompanyData = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PeopleListComponent.prototype, "tableTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PeopleListComponent.prototype, "buttonLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PeopleListComponent.prototype, "personIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PeopleListComponent.prototype, "rowClicked", void 0);
    PeopleListComponent = __decorate([
        core_1.Component({
            selector: 'people-list',
            templateUrl: './people/components/peoplelist.component.html',
            providers: [],
            directives: [table_component_1.MyTableComponent]
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger, router_1.Router, people_services_1.PeopleService])
    ], PeopleListComponent);
    return PeopleListComponent;
}());
exports.PeopleListComponent = PeopleListComponent;
//# sourceMappingURL=peoplelist.component.js.map