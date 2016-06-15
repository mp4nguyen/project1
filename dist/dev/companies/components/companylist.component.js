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
var companies_services_1 = require('../services/companies.services');
var logging_service_1 = require('../../shared/services/logging.service');
var table_component_1 = require('../../shared/components/table/table.component');
var dialog_component_1 = require('../../shared/components/dialog/dialog.component');
var doctorschedule_component_1 = require('./doctorschedule.component');
var calendar_1 = require('../../shared/components/calendar/calendar');
var CompanyListComponent = (function () {
    function CompanyListComponent(_companiesService, _router, _log) {
        var _this = this;
        this._companiesService = _companiesService;
        this._router = _router;
        this._log = _log;
        this.columns = [{ title: 'Company Name', fieldName: 'companyName' },
            { title: 'Address', fieldName: 'address' },
            { title: 'District', fieldName: 'suburbDistrict' },
            { title: 'City/Province', fieldName: 'stateProvince' }];
        this.es = {
            closeText: "Cerrar",
            prevText: "<Ant",
            nextText: "Sig>",
            currentText: "Hoy",
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun",
                "jul", "ago", "sep", "oct", "nov", "dic"],
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            weekHeader: "Sm",
            dateFormat: "dd/mm/yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        _companiesService.getCompanies().subscribe(function (data) {
            _this.companies = data;
            _this._log.log("CompanyListComponent = ", _this.companies);
        }, function (err) { return console.log(err); }, function () { return console.log("finished"); });
    }
    CompanyListComponent.prototype.newOrEditDetail = function (company) {
        this._companiesService.setCurrentCompany(company);
        this._log.log("company = ", company);
        this._router.navigate(['CompanyDetail']);
    };
    CompanyListComponent.prototype.showConfirmDialog = function () {
        var _this = this;
        this.myDialog.activate().subscribe(function (data) { _this._log.log('dialog return = ', data); }, function (err) { _this._log.log('dialog err = ', err); }, function () { _this._log.log('dialog closed = '); });
    };
    CompanyListComponent.prototype.cancelDialog = function () {
        this.myDialog.cancel(function () {
            console.log('i hit close button !');
            return true;
        });
    };
    CompanyListComponent.prototype.showMsg = function () {
        console.log('show msg');
    };
    __decorate([
        core_1.ViewChild('myDialog'), 
        __metadata('design:type', dialog_component_1.DialogComponent)
    ], CompanyListComponent.prototype, "myDialog", void 0);
    CompanyListComponent = __decorate([
        core_1.Component({
            selector: 'company-list',
            templateUrl: './companies/components/companylist.component.html',
            providers: [],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault, table_component_1.MyTableComponent, dialog_component_1.DialogComponent, doctorschedule_component_1.DoctorScheduleComponent, calendar_1.Calendar]
        }), 
        __metadata('design:paramtypes', [companies_services_1.CompaniesService, router_1.Router, logging_service_1.MyLogger])
    ], CompanyListComponent);
    return CompanyListComponent;
}());
exports.CompanyListComponent = CompanyListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9jb21wb25lbnRzL2NvbXBhbnlsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBQ2xELHVCQUFxRixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3ZHLHVCQUFpQyxpQkFBaUIsQ0FBQyxDQUFBO0FBRW5ELG1DQUErQixnQ0FDL0IsQ0FBQyxDQUQ4RDtBQUMvRCxnQ0FBdUIsdUNBQXVDLENBQUMsQ0FBQTtBQUUvRCxnQ0FBK0IsK0NBQStDLENBQUMsQ0FBQTtBQUUvRSxpQ0FBOEIsaURBQWlELENBQUMsQ0FBQTtBQUNoRix5Q0FBc0MsNEJBQTRCLENBQUMsQ0FBQTtBQUNuRSx5QkFBd0IsMkNBQTJDLENBQUMsQ0FBQTtBQWNwRTtJQTBDRSw4QkFDZ0IsaUJBQW1DLEVBQ3ZDLE9BQWUsRUFDZixJQUFjO1FBN0M1QixpQkF5R0M7UUE5RGlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFNBQUksR0FBSixJQUFJLENBQVU7UUF2Q25CLFlBQU8sR0FDVSxDQUFDLEVBQUMsS0FBSyxFQUFDLGNBQWMsRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDO1lBQy9DLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDO1lBQ3JDLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsZ0JBQWdCLEVBQUM7WUFDN0MsRUFBQyxLQUFLLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO1FBc0M3RSxJQUFJLENBQUMsRUFBRSxHQUFHO1lBQ0UsU0FBUyxFQUFFLFFBQVE7WUFDckIsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsVUFBVSxFQUFFLENBQUUsT0FBTyxFQUFDLFNBQVMsRUFB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Q0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSxtREFBbUQ7WUFDaEUsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUUsQ0FBQyx3QkFBZSxFQUFFLHdCQUFlLEVBQUMsaUJBQVEsRUFBQyxxQkFBWSxFQUFDLHdCQUFlLEVBQUMsa0NBQWdCLEVBQUMsa0NBQWUsRUFBQyxrREFBdUIsRUFBQyxtQkFBUSxDQUFDO1NBQ3ZKLENBQUM7OzRCQUFBO0lBNEdGLDJCQUFDO0FBQUQsQ0F6R0EsQUF5R0MsSUFBQTtBQXpHWSw0QkFBb0IsdUJBeUdoQyxDQUFBIiwiZmlsZSI6ImNvbXBhbmllcy9jb21wb25lbnRzL2NvbXBhbnlsaXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LFZpZXdDaGlsZH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTLE5nU3dpdGNoLE5nU3dpdGNoV2hlbixOZ1N3aXRjaERlZmF1bHR9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQge1JvdXRlQ29uZmlnLFJvdXRlcn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcblxuaW1wb3J0IHtDb21wYW5pZXNTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlcy9jb21wYW5pZXMuc2VydmljZXMnXG5pbXBvcnQge015TG9nZ2VyfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7Q29tcGFueX0gZnJvbSAnLi4vbW9kZWxzL2NvbXBhbnkubW9kZWwnO1xuaW1wb3J0IHtNeVRhYmxlQ29tcG9uZW50fSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy90YWJsZS90YWJsZS5jb21wb25lbnQnO1xuXG5pbXBvcnQge0RpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHtEb2N0b3JTY2hlZHVsZUNvbXBvbmVudH0gZnJvbSAnLi9kb2N0b3JzY2hlZHVsZS5jb21wb25lbnQnO1xuaW1wb3J0IHtDYWxlbmRhcn0gIGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyJztcbi8vaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vc2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG4vL2ltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vLi4vc2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9tZXNzYWdlcy9tZXNzYWdlcyc7XG5cbi8vZGVjbGFyZSB2YXIgalF1ZXJ5OiBKUXVlcnlTdGF0aWM7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvbXBhbnktbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21wYW5pZXMvY29tcG9uZW50cy9jb21wYW55bGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW10sXG4gIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUyxOZ1N3aXRjaCxOZ1N3aXRjaFdoZW4sTmdTd2l0Y2hEZWZhdWx0LE15VGFibGVDb21wb25lbnQsRGlhbG9nQ29tcG9uZW50LERvY3RvclNjaGVkdWxlQ29tcG9uZW50LENhbGVuZGFyXVxufSlcblxuXG5leHBvcnQgY2xhc3MgQ29tcGFueUxpc3RDb21wb25lbnQge1xuICBcbiAgQFZpZXdDaGlsZCgnbXlEaWFsb2cnKW15RGlhbG9nOkRpYWxvZ0NvbXBvbmVudDtcbiAgbmV3TmFtZTogc3RyaW5nO1xuICBwdWJsaWMgY29tcGFuaWVzOiBDb21wYW55W107XG5cbiAgcHVibGljIGNvbHVtbnM6T2JqZWN0W10gPSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3t0aXRsZTonQ29tcGFueSBOYW1lJyxmaWVsZE5hbWU6J2NvbXBhbnlOYW1lJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt0aXRsZTonQWRkcmVzcycsZmllbGROYW1lOidhZGRyZXNzJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt0aXRsZTonRGlzdHJpY3QnLGZpZWxkTmFtZTonc3VidXJiRGlzdHJpY3QnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAge3RpdGxlOidDaXR5L1Byb3ZpbmNlJyxmaWVsZE5hbWU6J3N0YXRlUHJvdmluY2UnfV07XG5cbiAgICBkYXRlMTogc3RyaW5nO1xuXG4gICAgZGF0ZTI6IHN0cmluZztcblxuICAgIGRhdGUzOiBzdHJpbmc7XG5cbiAgICBkYXRlNDogc3RyaW5nO1xuXG4gICAgZGF0ZTU6IHN0cmluZztcblxuICAgIGRhdGU2OiBzdHJpbmc7XG5cbiAgICBkYXRlNzogc3RyaW5nO1xuXG4gICAgZGF0ZTg6IHN0cmluZztcblxuICAgIGRhdGU5OiBzdHJpbmc7XG5cbiAgICBkYXRlMTA6IHN0cmluZztcbiAgICBcbiAgICBkYXRlMTE6IHN0cmluZztcbiAgICBcbiAgICBkYXRlMTI6IHN0cmluZztcbiAgICBcbiAgICBkYXRlMTM6IHN0cmluZztcbiAgICBcbiAgICBlczogYW55O1xuXG5cblxuICBjb25zdHJ1Y3RvcihcdFxuICAgICAgICAgIHByaXZhdGUgX2NvbXBhbmllc1NlcnZpY2U6IENvbXBhbmllc1NlcnZpY2UsXG4gIFx0XHRcdFx0cHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gIFx0XHRcdFx0cHJpdmF0ZSBfbG9nOiBNeUxvZ2dlclxuICAgICAgICAgICkge1xuICAgICAgICBcbnRoaXMuZXMgPSB7XG4gICAgICAgICAgICBjbG9zZVRleHQ6IFwiQ2VycmFyXCIsXG4gICAgICAgICAgcHJldlRleHQ6IFwiPEFudFwiLFxuICAgICAgICAgIG5leHRUZXh0OiBcIlNpZz5cIixcbiAgICAgICAgICBjdXJyZW50VGV4dDogXCJIb3lcIixcbiAgICAgICAgICBtb250aE5hbWVzOiBbIFwiZW5lcm9cIixcImZlYnJlcm9cIixcIm1hcnpvXCIsXCJhYnJpbFwiLFwibWF5b1wiLFwianVuaW9cIixcbiAgICAgICAgICBcImp1bGlvXCIsXCJhZ29zdG9cIixcInNlcHRpZW1icmVcIixcIm9jdHVicmVcIixcIm5vdmllbWJyZVwiLFwiZGljaWVtYnJlXCIgXSxcbiAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsgXCJlbmVcIixcImZlYlwiLFwibWFyXCIsXCJhYnJcIixcIm1heVwiLFwianVuXCIsXG4gICAgICAgICAgXCJqdWxcIixcImFnb1wiLFwic2VwXCIsXCJvY3RcIixcIm5vdlwiLFwiZGljXCIgXSxcbiAgICAgICAgICBkYXlOYW1lczogWyBcImRvbWluZ29cIixcImx1bmVzXCIsXCJtYXJ0ZXNcIixcIm1pw6lyY29sZXNcIixcImp1ZXZlc1wiLFwidmllcm5lc1wiLFwic8OhYmFkb1wiIF0sXG4gICAgICAgICAgZGF5TmFtZXNTaG9ydDogWyBcImRvbVwiLFwibHVuXCIsXCJtYXJcIixcIm1pw6lcIixcImp1ZVwiLFwidmllXCIsXCJzw6FiXCIgXSxcbiAgICAgICAgICBkYXlOYW1lc01pbjogWyBcIkRcIixcIkxcIixcIk1cIixcIlhcIixcIkpcIixcIlZcIixcIlNcIiBdLFxuICAgICAgICAgIHdlZWtIZWFkZXI6IFwiU21cIixcbiAgICAgICAgICBkYXRlRm9ybWF0OiBcImRkL21tL3l5XCIsXG4gICAgICAgICAgZmlyc3REYXk6IDEsXG4gICAgICAgICAgaXNSVEw6IGZhbHNlLFxuICAgICAgICAgIHNob3dNb250aEFmdGVyWWVhcjogZmFsc2UsXG4gICAgICAgICAgeWVhclN1ZmZpeDogXCJcIiBcbiAgICAgICAgfTtcblxuICAgICAgICAgICAgXG4gIFx0X2NvbXBhbmllc1NlcnZpY2UuZ2V0Q29tcGFuaWVzKCkuc3Vic2NyaWJlKFxuICBcdFx0ZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuY29tcGFuaWVzID0gZGF0YTtcbiAgICAgICAgdGhpcy5fbG9nLmxvZyhcIkNvbXBhbnlMaXN0Q29tcG9uZW50ID0gXCIsdGhpcy5jb21wYW5pZXMpO1xuICAgICAgfSxcbiAgXHRcdGVyciA9PiBjb25zb2xlLmxvZyhlcnIpLFxuICBcdFx0KCkgPT4gY29uc29sZS5sb2coXCJmaW5pc2hlZFwiKSk7XG4gIFx0XG4gIH1cblxuICBwdWJsaWMgbmV3T3JFZGl0RGV0YWlsKGNvbXBhbnk6Q29tcGFueSl7XG4gIFx0dGhpcy5fY29tcGFuaWVzU2VydmljZS5zZXRDdXJyZW50Q29tcGFueShjb21wYW55KTtcbiAgXHR0aGlzLl9sb2cubG9nKFwiY29tcGFueSA9IFwiLGNvbXBhbnkpO1xuICBcdHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbJ0NvbXBhbnlEZXRhaWwnXSk7XG4gIH1cbiAgXG4gIHNob3dDb25maXJtRGlhbG9nKCkge1xuICAgICAgdGhpcy5teURpYWxvZy5hY3RpdmF0ZSgpLnN1YnNjcmliZShcbiAgICAgICAgICBkYXRhID0+IHt0aGlzLl9sb2cubG9nKCdkaWFsb2cgcmV0dXJuID0gJyxkYXRhKX0sXG4gICAgICAgICAgZXJyID0+IHt0aGlzLl9sb2cubG9nKCdkaWFsb2cgZXJyID0gJyxlcnIpfSxcbiAgICAgICAgICAoKSA9PiB7dGhpcy5fbG9nLmxvZygnZGlhbG9nIGNsb3NlZCA9ICcpfVxuICAgICAgICApO1xuICB9XG5cbiAgY2FuY2VsRGlhbG9nKCl7XG4gICAgdGhpcy5teURpYWxvZy5jYW5jZWwoZnVuY3Rpb24oKXtcbiAgICAgIGNvbnNvbGUubG9nKCdpIGhpdCBjbG9zZSBidXR0b24gIScpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBzaG93TXNnKCl7XG4gICAgY29uc29sZS5sb2coJ3Nob3cgbXNnJyk7XG4vKiAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidJbmZvIE1lc3NhZ2UnLCBkZXRhaWw6J1ByaW1lTkcgcm9ja3MnfSk7XG4gICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5Oid3YXJuJywgc3VtbWFyeTonV2FybiBNZXNzYWdlJywgZGV0YWlsOidUaGVyZSBhcmUgdW5zYXZlZCBjaGFuZ2VzJ30pOyovXG4gIH1cbn1cbiJdfQ==
