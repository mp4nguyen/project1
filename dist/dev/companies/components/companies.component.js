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
var router_1 = require('angular2/router');
var companylist_component_1 = require('./companylist.component');
var companyDetail_component_1 = require('./companyDetail.component');
var clinicDetail_component_1 = require('./clinicDetail.component');
var doctorDetail_component_1 = require('./doctorDetail.component');
var companies_services_1 = require('../services/companies.services');
var people_services_1 = require('../../people/services/people.services');
var people_component_1 = require('../../people/components/people.component');
var CompaniesComponent = (function () {
    function CompaniesComponent() {
    }
    CompaniesComponent = __decorate([
        core_1.Component({
            selector: 'companies',
            templateUrl: './companies/components/companies.component.html',
            styleUrls: ['./companies/components/companies.component.css'],
            providers: [companies_services_1.CompaniesService, people_services_1.PeopleService],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, router_1.RouterOutlet, companylist_component_1.CompanyListComponent, people_component_1.PeopleComponent]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'CompanyList', component: companylist_component_1.CompanyListComponent, useAsDefault: true },
            { path: '/Detail', name: 'CompanyDetail', component: companyDetail_component_1.CompanyDetailComponent },
            { path: '/ClinicDetail', name: 'ClinicDetail', component: clinicDetail_component_1.ClinicDetailComponent },
            { path: '/DoctorDetail', name: 'DoctorDetail', component: doctorDetail_component_1.DoctorDetailComponent },
        ]), 
        __metadata('design:paramtypes', [])
    ], CompaniesComponent);
    return CompaniesComponent;
}());
exports.CompaniesComponent = CompaniesComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9jb21wb25lbnRzL2NvbXBhbmllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx1QkFBK0MsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRSx1QkFBd0MsaUJBQWlCLENBQUMsQ0FBQTtBQUkxRCxzQ0FBb0MseUJBQXlCLENBQUMsQ0FBQTtBQUM5RCx3Q0FBc0MsMkJBQTJCLENBQUMsQ0FBQTtBQUNsRSx1Q0FBcUMsMEJBQTBCLENBQUMsQ0FBQTtBQUNoRSx1Q0FBcUMsMEJBQTBCLENBQUMsQ0FBQTtBQUNoRSxtQ0FBK0IsZ0NBQWdDLENBQUMsQ0FBQTtBQUNoRSxnQ0FBNEIsdUNBQXVDLENBQUMsQ0FBQTtBQUlwRSxpQ0FBOEIsMENBQTBDLENBQUMsQ0FBQTtBQWlCekU7SUFFRTtJQUVBLENBQUM7SUFuQkg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLGlEQUFpRDtZQUM5RCxTQUFTLEVBQUUsQ0FBQyxnREFBZ0QsQ0FBQztZQUM3RCxTQUFTLEVBQUUsQ0FBQyxxQ0FBZ0IsRUFBQywrQkFBYSxDQUFDO1lBQzNDLFVBQVUsRUFBRSxDQUFDLHdCQUFlLEVBQUUsd0JBQWUsRUFBQyxxQkFBWSxFQUFDLDRDQUFvQixFQUFDLGtDQUFlLENBQUM7U0FDakcsQ0FBQztRQUVELG9CQUFXLENBQUM7WUFDWCxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUssSUFBSSxFQUFFLGFBQWEsRUFBSSxTQUFTLEVBQUUsNENBQW9CLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQztZQUN6RixFQUFDLElBQUksRUFBQyxTQUFTLEVBQUssSUFBSSxFQUFFLGVBQWUsRUFBSSxTQUFTLEVBQUUsZ0RBQXNCLEVBQUM7WUFDL0UsRUFBQyxJQUFJLEVBQUMsZUFBZSxFQUFLLElBQUksRUFBRSxjQUFjLEVBQUksU0FBUyxFQUFFLDhDQUFxQixFQUFDO1lBQ25GLEVBQUMsSUFBSSxFQUFDLGVBQWUsRUFBSyxJQUFJLEVBQUUsY0FBYyxFQUFJLFNBQVMsRUFBRSw4Q0FBcUIsRUFBQztTQUNwRixDQUFDOzswQkFBQTtJQVFGLHlCQUFDO0FBQUQsQ0FOQSxBQU1DLElBQUE7QUFOWSwwQkFBa0IscUJBTTlCLENBQUEiLCJmaWxlIjoiY29tcGFuaWVzL2NvbXBvbmVudHMvY29tcGFuaWVzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTLCBGT1JNX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQge1JvdXRlQ29uZmlnLCBSb3V0ZXJPdXRsZXR9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9odHRwJztcblxuXG5pbXBvcnQge0NvbXBhbnlMaXN0Q29tcG9uZW50fSAgZnJvbSAnLi9jb21wYW55bGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21wYW55RGV0YWlsQ29tcG9uZW50fSAgZnJvbSAnLi9jb21wYW55RGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQge0NsaW5pY0RldGFpbENvbXBvbmVudH0gIGZyb20gJy4vY2xpbmljRGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQge0RvY3RvckRldGFpbENvbXBvbmVudH0gIGZyb20gJy4vZG9jdG9yRGV0YWlsLmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbXBhbmllc1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2NvbXBhbmllcy5zZXJ2aWNlcyc7XG5pbXBvcnQge1Blb3BsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3Blb3BsZS9zZXJ2aWNlcy9wZW9wbGUuc2VydmljZXMnO1xuLy9pbXBvcnQge0NDb21wYW5pZXNBcGksQ1Blb3BsZUFwaX0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xic2VydmljZXMnO1xuXG5cbmltcG9ydCB7UGVvcGxlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9wZW9wbGUvY29tcG9uZW50cy9wZW9wbGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29tcGFuaWVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbXBhbmllcy9jb21wb25lbnRzL2NvbXBhbmllcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbXBhbmllcy9jb21wb25lbnRzL2NvbXBhbmllcy5jb21wb25lbnQuY3NzJ10sXG4gIHByb3ZpZGVyczogW0NvbXBhbmllc1NlcnZpY2UsUGVvcGxlU2VydmljZV0sXG4gIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUyxSb3V0ZXJPdXRsZXQsQ29tcGFueUxpc3RDb21wb25lbnQsUGVvcGxlQ29tcG9uZW50XVxufSlcblxuQFJvdXRlQ29uZmlnKFtcbiAge3BhdGg6Jy8nLCAgICBuYW1lOiAnQ29tcGFueUxpc3QnLCAgIGNvbXBvbmVudDogQ29tcGFueUxpc3RDb21wb25lbnQsIHVzZUFzRGVmYXVsdDogdHJ1ZX0sICBcbiAge3BhdGg6Jy9EZXRhaWwnLCAgICBuYW1lOiAnQ29tcGFueURldGFpbCcsICAgY29tcG9uZW50OiBDb21wYW55RGV0YWlsQ29tcG9uZW50fSxcbiAge3BhdGg6Jy9DbGluaWNEZXRhaWwnLCAgICBuYW1lOiAnQ2xpbmljRGV0YWlsJywgICBjb21wb25lbnQ6IENsaW5pY0RldGFpbENvbXBvbmVudH0sXG4gIHtwYXRoOicvRG9jdG9yRGV0YWlsJywgICAgbmFtZTogJ0RvY3RvckRldGFpbCcsICAgY29tcG9uZW50OiBEb2N0b3JEZXRhaWxDb21wb25lbnR9LFxuXSlcblxuZXhwb3J0IGNsYXNzIENvbXBhbmllc0NvbXBvbmVudCB7XG4gIG5ld05hbWU6IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgXG4gIH1cblxufVxuIl19
