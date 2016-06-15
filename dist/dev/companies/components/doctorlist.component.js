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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9jb21wb25lbnRzL2RvY3Rvcmxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUQsZUFBZSxDQUFDLENBQUE7QUFFekUscUNBQWtDLDhDQUE4QyxDQUFDLENBQUE7QUFDakYsZ0NBQXdCLHVDQUF1QyxDQUFDLENBQUE7QUFTaEU7SUFXQyw2QkFBb0IsSUFBYztRQUFkLFNBQUksR0FBSixJQUFJLENBQVU7UUFUeEIsZUFBVSxHQUFpQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUVoRCxjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFlBQU8sR0FDVyxDQUFDLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDO1lBQzNDLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDO1lBQ3hDLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDO1lBQ25DLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUdqRSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELDRDQUFjLEdBQWQsVUFBZSxHQUFHO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0MsR0FBRyxDQUFBLENBQVUsVUFBWSxFQUFaLEtBQUEsSUFBSSxDQUFDLE9BQU8sRUFBWixjQUFZLEVBQVosSUFBWSxDQUFDO1lBQXRCLElBQUksQ0FBQyxTQUFBO1lBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0YsQ0FBQztJQXRCRDtRQUFDLFlBQUssRUFBRTs7d0RBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7MkRBQUE7SUFUVjtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsa0RBQWtEO1lBQy9ELFNBQVMsRUFBRSxFQUFFO1lBQ2IsVUFBVSxFQUFFLENBQUMsMENBQW1CLENBQUM7U0FDbEMsQ0FBQzs7MkJBQUE7SUEwQkYsMEJBQUM7QUFBRCxDQXhCQSxBQXdCQyxJQUFBO0FBeEJZLDJCQUFtQixzQkF3Qi9CLENBQUEiLCJmaWxlIjoiY29tcGFuaWVzL2NvbXBvbmVudHMvZG9jdG9ybGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0RvY3Rvcn0gZnJvbSAnLi4vbW9kZWxzL2RvY3Rvci5tb2RlbCc7XG5pbXBvcnQge1Blb3BsZUxpc3RDb21wb25lbnR9IGZyb20gJy4uLy4uL3Blb3BsZS9jb21wb25lbnRzL3Blb3BsZWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7TXlMb2dnZXJ9ICBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZG9jdG9yLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29tcGFuaWVzL2NvbXBvbmVudHMvZG9jdG9ybGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW10sXG4gIGRpcmVjdGl2ZXM6IFtQZW9wbGVMaXN0Q29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIERvY3Rvckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG5cdEBJbnB1dCgpIGRvY3RvcnM6IERvY3RvcltdO1x0XHRcblx0QE91dHB1dCgpIHJvd0NsaWNrZWQ6IEV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHRwcml2YXRlIHBlcnNvbklkczogbnVtYmVyW109W107XG4gIFx0cHVibGljIGNvbHVtbnM6T2JqZWN0W10gPSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbe3RpdGxlOidGaXJzdCBOYW1lJyxmaWVsZE5hbWU6J2ZpcnN0TmFtZSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aXRsZTonTGFzdCBOYW1lJyxmaWVsZE5hbWU6J2xhc3ROYW1lJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpdGxlOidNb2JpbGUnLGZpZWxkTmFtZTonbW9iaWxlJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpdGxlOidBZGRyZXNzJyxmaWVsZE5hbWU6J2FkZHJlc3MnfV07XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfbG9nOiBNeUxvZ2dlcil7XG5cdFx0Y29uc29sZS5sb2coXCJkb2N0b3IgbGlzdCBjb21wb25lbnQuLi4uXCIpO1xuXHR9XG5cblx0ZmlyZVJvd0NsaWNrZWQocm93KXtcblx0XHR0aGlzLnJvd0NsaWNrZWQubmV4dChyb3cpO1xuXHR9XG5cblx0bmdPbkluaXQoKXtcblx0XHRmb3IodmFyIGQgb2YgdGhpcy5kb2N0b3JzKXtcblx0XHRcdHRoaXMucGVyc29uSWRzLnB1c2goZC5wZXJzb25JZCk7XG5cdFx0fVx0XHRcblx0fVxufSJdfQ==
