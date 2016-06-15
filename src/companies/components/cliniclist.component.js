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
var table_component_1 = require('../../shared/components/table/table.component');
var ClinicListComponent = (function () {
    function ClinicListComponent() {
        this.rowClicked = new core_1.EventEmitter();
        this.columns = [{ title: 'Clinic Name', fieldName: 'clinicName' },
            { title: 'Address', fieldName: 'address' },
            { title: 'District', fieldName: 'suburbDistrict' },
            { title: 'City/Province', fieldName: 'stateProvince' }];
        console.log("clinic list component....");
    }
    ClinicListComponent.prototype.fireRowClicked = function (row) {
        this.rowClicked.next(row);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ClinicListComponent.prototype, "clinics", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ClinicListComponent.prototype, "rowClicked", void 0);
    ClinicListComponent = __decorate([
        core_1.Component({
            selector: 'clinic-list',
            templateUrl: './companies/components/cliniclist.component.html',
            providers: [],
            directives: [table_component_1.MyTableComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ClinicListComponent);
    return ClinicListComponent;
}());
exports.ClinicListComponent = ClinicListComponent;
//# sourceMappingURL=cliniclist.component.js.map