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
var logging_service_1 = require('../../shared/services/logging.service');
var table_component_1 = require('../../shared/components/table/table.component');
var DoctorListComponent = (function () {
    function DoctorListComponent(_log) {
        this._log = _log;
        this.rowClicked = new core_1.EventEmitter();
        this.people = [];
        this.columns = [{ title: 'First Name', fieldName: 'firstName' },
            { title: 'Last Name', fieldName: 'lastName' },
            { title: 'Mobile', fieldName: 'mobile' },
            { title: 'Address', fieldName: 'address' }];
    }
    DoctorListComponent.prototype.ngOnInit = function () {
        this._log.log('Doctor list = ', this.doctors);
        for (var _i = 0, _a = this.doctors; _i < _a.length; _i++) {
            var d = _a[_i];
            this.people.push(d.person);
        }
        this._log.log('people list = ', this.people);
    };
    DoctorListComponent.prototype.fireRowClicked = function (row) {
        this.rowClicked.next(row);
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
            templateUrl: './companies/components/doctorlist2.component.html',
            providers: [],
            directives: [table_component_1.MyTableComponent]
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger])
    ], DoctorListComponent);
    return DoctorListComponent;
}());
exports.DoctorListComponent = DoctorListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9jb21wb25lbnRzL2RvY3Rvcmxpc3QyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXlELGVBQWUsQ0FBQyxDQUFBO0FBRXpFLGdDQUF3Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBR2hFLGdDQUErQiwrQ0FBK0MsQ0FBQyxDQUFBO0FBUy9FO0lBWUMsNkJBQW9CLElBQWE7UUFBYixTQUFJLEdBQUosSUFBSSxDQUFTO1FBVnZCLGVBQVUsR0FBaUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFaEQsV0FBTSxHQUFZLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQ1csQ0FBQyxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQztZQUMzQyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQztZQUN4QyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQztZQUNuQyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFLbEUsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsR0FBRyxDQUFBLENBQVUsVUFBWSxFQUFaLEtBQUEsSUFBSSxDQUFDLE9BQU8sRUFBWixjQUFZLEVBQVosSUFBWSxDQUFDO1lBQXRCLElBQUksQ0FBQyxTQUFBO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw0Q0FBYyxHQUFkLFVBQWUsR0FBTztRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBekJEO1FBQUMsWUFBSyxFQUFFOzt3REFBQTtJQUNSO1FBQUMsYUFBTSxFQUFFOzsyREFBQTtJQVRWO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSxtREFBbUQ7WUFDaEUsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUUsQ0FBQyxrQ0FBZ0IsQ0FBQztTQUMvQixDQUFDOzsyQkFBQTtJQThCRiwwQkFBQztBQUFELENBNUJBLEFBNEJDLElBQUE7QUE1QlksMkJBQW1CLHNCQTRCL0IsQ0FBQSIsImZpbGUiOiJjb21wYW5pZXMvY29tcG9uZW50cy9kb2N0b3JsaXN0Mi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCB7TXlMb2dnZXJ9ICBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7RG9jdG9yfSBmcm9tICcuLi9tb2RlbHMvZG9jdG9yLm1vZGVsJztcbmltcG9ydCB7UGVvcGxlfSBmcm9tICcuLi8uLi9wZW9wbGUvbW9kZWxzL3Blb3BsZS5tb2RlbCc7XG5pbXBvcnQge015VGFibGVDb21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3Rvci1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbXBhbmllcy9jb21wb25lbnRzL2RvY3Rvcmxpc3QyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZGlyZWN0aXZlczogW015VGFibGVDb21wb25lbnRdXG59KVxuXG5leHBvcnQgY2xhc3MgRG9jdG9yTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdEBJbnB1dCgpIGRvY3RvcnM6IERvY3RvcltdO1x0XHRcdFxuXHRAT3V0cHV0KCkgcm93Q2xpY2tlZDogRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdHByaXZhdGUgcGVvcGxlOlBlb3BsZVtdID0gW107XG4gIFx0cHVibGljIGNvbHVtbnM6T2JqZWN0W10gPSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbe3RpdGxlOidGaXJzdCBOYW1lJyxmaWVsZE5hbWU6J2ZpcnN0TmFtZSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aXRsZTonTGFzdCBOYW1lJyxmaWVsZE5hbWU6J2xhc3ROYW1lJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpdGxlOidNb2JpbGUnLGZpZWxkTmFtZTonbW9iaWxlJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpdGxlOidBZGRyZXNzJyxmaWVsZE5hbWU6J2FkZHJlc3MnfV07XG5cblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2c6TXlMb2dnZXIpe1xuXHRcdFxuXHR9XG5cblx0bmdPbkluaXQoKXtcblx0XHR0aGlzLl9sb2cubG9nKCdEb2N0b3IgbGlzdCA9ICcsdGhpcy5kb2N0b3JzKTtcblx0XHRmb3IodmFyIGQgb2YgdGhpcy5kb2N0b3JzKXtcblx0XHRcdHRoaXMucGVvcGxlLnB1c2goZC5wZXJzb24pO1xuXHRcdH1cblx0XHR0aGlzLl9sb2cubG9nKCdwZW9wbGUgbGlzdCA9ICcsdGhpcy5wZW9wbGUpO1xuXHR9XG5cblx0ZmlyZVJvd0NsaWNrZWQocm93OmFueSl7XG5cdFx0dGhpcy5yb3dDbGlja2VkLm5leHQocm93KTtcblx0fVxuXG59XG4iXX0=
