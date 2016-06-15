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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9jb21wb25lbnRzL2NsaW5pY2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0QsZUFBZSxDQUFDLENBQUE7QUFFbEUsZ0NBQStCLCtDQUErQyxDQUFDLENBQUE7QUFTL0U7SUFVQztRQVJVLGVBQVUsR0FBaUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFL0MsWUFBTyxHQUNXLENBQUMsRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBQyxZQUFZLEVBQUM7WUFDN0MsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUM7WUFDckMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxnQkFBZ0IsRUFBQztZQUM3QyxFQUFDLEtBQUssRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUM7UUFHN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCw0Q0FBYyxHQUFkLFVBQWUsR0FBRztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBZkQ7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBQ1I7UUFBQyxhQUFNLEVBQUU7OzJEQUFBO0lBVFY7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLGtEQUFrRDtZQUMvRCxTQUFTLEVBQUUsRUFBRTtZQUNiLFVBQVUsRUFBRSxDQUFDLGtDQUFnQixDQUFDO1NBQy9CLENBQUM7OzJCQUFBO0lBb0JGLDBCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsSUFBQTtBQWxCWSwyQkFBbUIsc0JBa0IvQixDQUFBIiwiZmlsZSI6ImNvbXBhbmllcy9jb21wb25lbnRzL2NsaW5pY2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NsaW5pY30gZnJvbSAnLi4vbW9kZWxzL2NsaW5pYy5tb2RlbCc7XG5pbXBvcnQge015VGFibGVDb21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsaW5pYy1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbXBhbmllcy9jb21wb25lbnRzL2NsaW5pY2xpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtdLFxuICBkaXJlY3RpdmVzOiBbTXlUYWJsZUNvbXBvbmVudF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBDbGluaWNMaXN0Q29tcG9uZW50IHtcblx0QElucHV0KCkgY2xpbmljczogQ2xpbmljW107XHRcdFxuXHRAT3V0cHV0KCkgcm93Q2xpY2tlZDogRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIFx0cHVibGljIGNvbHVtbnM6T2JqZWN0W10gPSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbe3RpdGxlOidDbGluaWMgTmFtZScsZmllbGROYW1lOidjbGluaWNOYW1lJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpdGxlOidBZGRyZXNzJyxmaWVsZE5hbWU6J2FkZHJlc3MnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGl0bGU6J0Rpc3RyaWN0JyxmaWVsZE5hbWU6J3N1YnVyYkRpc3RyaWN0J30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpdGxlOidDaXR5L1Byb3ZpbmNlJyxmaWVsZE5hbWU6J3N0YXRlUHJvdmluY2UnfV07XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHRjb25zb2xlLmxvZyhcImNsaW5pYyBsaXN0IGNvbXBvbmVudC4uLi5cIik7XG5cdH1cblxuXHRmaXJlUm93Q2xpY2tlZChyb3cpe1xuXHRcdHRoaXMucm93Q2xpY2tlZC5uZXh0KHJvdyk7XG5cdH1cblxufVxuIl19
