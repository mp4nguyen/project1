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
var input_component_1 = require('../../shared/components/input/input.component');
var companies_services_1 = require('../services/companies.services');
var logging_service_1 = require('../../shared/services/logging.service');
var people_component_1 = require('../../people/components/people.component');
var doctor_model_1 = require('../models/doctor.model');
var tab_component_1 = require('../../shared/components/tab/tab.component');
var tabset_component_1 = require('../../shared/components/tab/tabset.component');
var bookingtypelist_component_1 = require('./bookingtypelist.component');
var cliniclist_component_1 = require('./cliniclist.component');
var selectbookingtypes_component_1 = require('./selectbookingtypes.component');
var selectclinics_component_1 = require('./selectclinics.component');
var doctorschedule_component_1 = require('./doctorschedule.component');
var growl_1 = require('../../shared/primeng/components/growl/growl');
var DoctorDetailComponent = (function () {
    function DoctorDetailComponent(_log, _companyService, _fb) {
        this._log = _log;
        this._companyService = _companyService;
        this._fb = _fb;
        this.msgs = [];
        this.components = new Array();
        this.doctorIdControl = new common_1.Control();
        this.userIdControl = new common_1.Control();
        this.signatureControl = new common_1.Control();
        this.timeIntervalControl = new common_1.Control();
        this.isenableControl = new common_1.Control();
        this.person = _fb.group({});
        this.myForm = _fb.group({
            doctorId: this.doctorIdControl,
            userId: this.userIdControl,
            signature: this.signatureControl,
            timeInterval: this.timeIntervalControl,
            isenable: this.isenableControl,
            person: this.person
        });
        this.components.push({ control: this.isenableControl, type: 'boolean', title: 'Enable', placeholder: 'Clinic Name', isRequired: true, requiredMsg: 'Clinic name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.timeIntervalControl, type: 'number', title: 'Time Interval', placeholder: 'Time Interval', isRequired: true, requiredMsg: 'Clinic name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.signatureControl, type: 'text', title: 'Signatute', placeholder: 'Time Interval', isRequired: true, requiredMsg: 'Clinic name is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.myForm = new common_1.ControlGroup({
            doctorId: this.doctorIdControl,
            userId: this.userIdControl,
            signature: this.signatureControl,
            timeInterval: this.timeIntervalControl,
            isenable: this.isenableControl
        });
    }
    DoctorDetailComponent.prototype.ngOnInit = function () {
        this.doctor = this._companyService.getCurrentDoctor();
        this._log.log('Doctor =', this.doctor);
        if (this.doctor) {
            this.doctorIdControl.updateValue(this.doctor.doctorId);
            this.isenableControl.updateValue(this.doctor.isenable);
            this.timeIntervalControl.updateValue(this.doctor.timeInterval);
            this.signatureControl.updateValue(this.doctor.signature);
        }
        else {
            this.doctor = new doctor_model_1.Doctor();
        }
    };
    DoctorDetailComponent.prototype.save = function () {
        var _this = this;
        this._log.log('doctor detail -> will save data with myForm.person=', this.myForm.value.person);
        this.person.save(this.myForm.value.person).subscribe(function (person) {
            _this._log.log(' received data from person component =', person);
            _this._companyService.saveDoctor(_this.myForm.value, person).subscribe(function (data) { _this._log.log("doctor saved successfully ! ", data); }, function (err) { _this._log.log(err); }, function () { _this._log.log('created !'); });
        }, function (err) { _this._log.log('error in saving person = ', err); }, function () { _this._log.log('saved person successfully !'); });
    };
    DoctorDetailComponent.prototype.personControlGroup = function (personControlGroup) {
        this.myForm.addControl('person', this._fb.group(personControlGroup.controls));
        this._log.log("doctor detail person control group =", personControlGroup, this.myForm);
    };
    DoctorDetailComponent.prototype.fireClinicRowClicked = function (row) {
        this._log.log('row = ', row);
        this.clinicDialog.openDialog(row);
    };
    DoctorDetailComponent.prototype.fireBTRowClicked = function (row) {
        this._log.log('row = ', row);
        this.btDialog.openDialog(row, 'DOCTOR');
    };
    DoctorDetailComponent.prototype.addedRosterEvent = function (data) {
        var _this = this;
        this._log.log(' will add this roster = ', data);
        this._companyService.generateRoster(data).subscribe(function (data) {
            _this._log.log(' data = ', data);
        }, function (err) {
            _this._log.log(' error = ', err);
            _this.msgs.push({ severity: 'error', summary: 'Info Message', detail: 'There are slots :' + JSON.stringify(err) });
        });
    };
    __decorate([
        core_1.ViewChild(people_component_1.PeopleComponent), 
        __metadata('design:type', people_component_1.PeopleComponent)
    ], DoctorDetailComponent.prototype, "person", void 0);
    __decorate([
        core_1.ViewChild('btDialog'), 
        __metadata('design:type', selectbookingtypes_component_1.SelectBookingTypeComponent)
    ], DoctorDetailComponent.prototype, "btDialog", void 0);
    __decorate([
        core_1.ViewChild('clinicDialog'), 
        __metadata('design:type', selectclinics_component_1.SelectClinicComponent)
    ], DoctorDetailComponent.prototype, "clinicDialog", void 0);
    DoctorDetailComponent = __decorate([
        core_1.Component({
            selector: 'clinic-detail',
            templateUrl: './companies/components/doctordetail.component.html',
            providers: [],
            directives: [people_component_1.PeopleComponent, input_component_1.InputComponent, tab_component_1.TabComponent, tabset_component_1.TabsetComponent, bookingtypelist_component_1.BookingTypeListComponent, cliniclist_component_1.ClinicListComponent, selectbookingtypes_component_1.SelectBookingTypeComponent, selectclinics_component_1.SelectClinicComponent, doctorschedule_component_1.DoctorScheduleComponent, growl_1.Growl]
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger, companies_services_1.CompaniesService, common_1.FormBuilder])
    ], DoctorDetailComponent);
    return DoctorDetailComponent;
}());
exports.DoctorDetailComponent = DoctorDetailComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9jb21wb25lbnRzL2RvY3RvcmRldGFpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQyxlQUFlLENBQUMsQ0FBQTtBQUUvRCx1QkFBMEUsaUJBQWlCLENBQUMsQ0FBQTtBQUU1RixnQ0FBOEIsK0NBQStDLENBQUMsQ0FBQTtBQUM5RSxtQ0FBK0IsZ0NBQWdDLENBQUMsQ0FBQTtBQUNoRSxnQ0FBd0IsdUNBQXVDLENBQUMsQ0FBQTtBQUNoRSxpQ0FBOEIsMENBQTBDLENBQUMsQ0FBQTtBQUN6RSw2QkFBcUIsd0JBQXdCLENBQUMsQ0FBQTtBQUM5Qyw4QkFBMkIsMkNBQTJDLENBQUMsQ0FBQTtBQUN2RSxpQ0FBOEIsOENBQThDLENBQUMsQ0FBQTtBQUM3RSwwQ0FBdUMsNkJBQTZCLENBQUMsQ0FBQTtBQUNyRSxxQ0FBa0Msd0JBQXdCLENBQUMsQ0FBQTtBQUMzRCw2Q0FBeUMsZ0NBQWdDLENBQUMsQ0FBQTtBQUMxRSx3Q0FBb0MsMkJBQTJCLENBQUMsQ0FBQTtBQUdoRSx5Q0FBc0MsNEJBQTRCLENBQUMsQ0FBQTtBQUNuRSxzQkFBb0IsNkNBQTZDLENBQUMsQ0FBQTtBQVlsRTtJQW9CRSwrQkFDa0IsSUFBYyxFQUNkLGVBQWlDLEVBQ2pDLEdBQWdCO1FBRmhCLFNBQUksR0FBSixJQUFJLENBQVU7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDakMsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQWpCMUIsU0FBSSxHQUFZLEVBQUUsQ0FBQztRQUVwQixlQUFVLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7UUFpQnJELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxnQkFBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGdCQUFPLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBTyxFQUFFLENBQUM7UUFDdEMsSUFBSSxD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LEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUUvRyxDQUFDLENBQ0EsQ0FBQztJQUNOLENBQUM7SUF4SEQ7UUFBQyxnQkFBUyxDQUFDLGtDQUFlLENBQUM7O3lEQUFBO0lBQzNCO1FBQUMsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7OzJEQUFBO0lBQ3RCO1FBQUMsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7OytEQUFBO0lBWjVCO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxvREFBb0Q7WUFDakUsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUUsQ0FBQyxrQ0FBZSxFQUFDLGdDQUFjLEVBQUMsNEJBQVksRUFBQyxrQ0FBZSxFQUFDLG9EQUF3QixFQUFDLDBDQUFtQixFQUFDLHlEQUEwQixFQUFDLCtDQUFxQixFQUFDLGtEQUF1QixFQUFDLGFBQUssQ0FBQztTQUN0TSxDQUFDOzs2QkFBQTtJQThIRiw0QkFBQztBQUFELENBM0hBLEFBMkhDLElBQUE7QUEzSFksNkJBQXFCLHdCQTJIakMsQ0FBQSIsImZpbGUiOiJjb21wYW5pZXMvY29tcG9uZW50cy9kb2N0b3JkZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0LElucHV0LFZpZXdDaGlsZH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JvdXRlQ29uZmlnfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuaW1wb3J0IHtDb250cm9sLCBWYWxpZGF0b3JzLCBOZ0Zvcm1Nb2RlbCwgQ29udHJvbEdyb3VwLEZvcm1CdWlsZGVyfSAgZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcblxuaW1wb3J0IHtJbnB1dENvbXBvbmVudH0gIGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L2lucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbXBhbmllc1NlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL2NvbXBhbmllcy5zZXJ2aWNlcyc7XG5pbXBvcnQge015TG9nZ2VyfSAgZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcuc2VydmljZSc7XG5pbXBvcnQge1Blb3BsZUNvbXBvbmVudH0gZnJvbSAnLi4vLi4vcGVvcGxlL2NvbXBvbmVudHMvcGVvcGxlLmNvbXBvbmVudCc7XG5pbXBvcnQge0RvY3Rvcn0gZnJvbSAnLi4vbW9kZWxzL2RvY3Rvci5tb2RlbCc7XG5pbXBvcnQge1RhYkNvbXBvbmVudH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvdGFiL3RhYi5jb21wb25lbnQnO1xuaW1wb3J0IHtUYWJzZXRDb21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RhYi90YWJzZXQuY29tcG9uZW50JztcbmltcG9ydCB7Qm9va2luZ1R5cGVMaXN0Q29tcG9uZW50fSBmcm9tICcuL2Jvb2tpbmd0eXBlbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtDbGluaWNMaXN0Q29tcG9uZW50fSBmcm9tICcuL2NsaW5pY2xpc3QuY29tcG9uZW50JztcbmltcG9ydCB7U2VsZWN0Qm9va2luZ1R5cGVDb21wb25lbnR9IGZyb20gJy4vc2VsZWN0Ym9va2luZ3R5cGVzLmNvbXBvbmVudCc7XG5pbXBvcnQge1NlbGVjdENsaW5pY0NvbXBvbmVudH0gZnJvbSAnLi9zZWxlY3RjbGluaWNzLmNvbXBvbmVudCc7XG5cblxuaW1wb3J0IHtEb2N0b3JTY2hlZHVsZUNvbXBvbmVudH0gZnJvbSAnLi9kb2N0b3JzY2hlZHVsZS5jb21wb25lbnQnO1xuaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vc2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4uLy4uL3NoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvbWVzc2FnZXMvbWVzc2FnZXMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NsaW5pYy1kZXRhaWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29tcGFuaWVzL2NvbXBvbmVudHMvZG9jdG9yZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZGlyZWN0aXZlczogW1Blb3BsZUNvbXBvbmVudCxJbnB1dENvbXBvbmVudCxUYWJDb21wb25lbnQsVGFic2V0Q29tcG9uZW50LEJvb2tpbmdUeXBlTGlzdENvbXBvbmVudCxDbGluaWNMaXN0Q29tcG9uZW50LFNlbGVjdEJvb2tpbmdUeXBlQ29tcG9uZW50LFNlbGVjdENsaW5pY0NvbXBvbmVudCxEb2N0b3JTY2hlZHVsZUNvbXBvbmVudCxHcm93bF1cbn0pXG5cblxuZXhwb3J0IGNsYXNzIERvY3RvckRldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgXG4gIEBWaWV3Q2hpbGQoUGVvcGxlQ29tcG9uZW50KXBlcnNvbjogUGVvcGxlQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdidERpYWxvZycpYnREaWFsb2c6IFNlbGVjdEJvb2tpbmdUeXBlQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdjbGluaWNEaWFsb2cnKWNsaW5pY0RpYWxvZzogU2VsZWN0Q2xpbmljQ29tcG9uZW50O1xuXG4gIHByaXZhdGUgbXNnczpNZXNzYWdlW10gPVtdO1xuICBwcml2YXRlIGRvY3RvcjogRG9jdG9yO1xuICBwdWJsaWMgY29tcG9uZW50czogQXJyYXk8T2JqZWN0PiA9IG5ldyBBcnJheTxPYmplY3Q+KCk7XG4gIHB1YmxpYyBteUZvcm06IENvbnRyb2xHcm91cDtcbiAgXG4gIHByaXZhdGUgZGF5T2ZXZWVrQ29udHJvbDpDb250cm9sO1xuICBwcml2YXRlIGZyb21EYXRlQ29udHJvbDpDb250cm9sO1xuICBwcml2YXRlIHRvRGF0ZUNvbnRyb2w6Q29udHJvbDtcbiAgcHJpdmF0ZSB3b3JraW5nU2l0ZUlkQ29udHJvbDpDb250cm9sO1xuICBwcml2YXRlIGJvb2tpbmdUeXBlSWRDb250cm9sOkNvbnRyb2w7XG4gIHByaXZhdGUgdGltZUludGVydmFsQ29udHJvbDpDb250cm9sOyAgIFxuICBwcml2YXRlIHJlcGVhdFR5cGVDb250cm9sOkNvbnRyb2w7XG4gIHByaXZhdGUgaXNlbmFibGVDb250cm9sOkNvbnRyb2w7ICAgXG5cbiAgY29uc3RydWN0b3IoXG4gICAgICAgICAgICBwcml2YXRlIF9sb2c6IE15TG9nZ2VyLFxuICAgICAgICAgICAgcHJpdmF0ZSBfY29tcGFueVNlcnZpY2U6IENvbXBhbmllc1NlcnZpY2UsXG4gICAgICAgICAgICBwcml2YXRlIF9mYjogRm9ybUJ1aWxkZXJcbiAgICAgICAgICAgICl7XG4gICAgdGhpcy5kb2N0b3JJZENvbnRyb2wgPSBuZXcgQ29udHJvbCgpO1xuICAgIHRoaXMudXNlcklkQ29udHJvbCA9IG5ldyBDb250cm9sKCk7XG4gICAgdGhpcy5zaWduYXR1cmVDb250cm9sID0gbmV3IENvbnRyb2woKTtcbiAgICB0aGlzLnRpbWVJbnRlcnZhbENvbnRyb2wgPSBuZXcgQ29udHJvbCgpO1xuICAgIHRoaXMuaXNlbmFibGVDb250cm9sID0gbmV3IENvbnRyb2woKTtcblxuICAgIHRoaXMucGVyc29uID0gX2ZiLmdyb3VwKHt9KTtcbiAgICB0aGlzLm15Rm9ybSA9IF9mYi5ncm91cChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N0b3JJZDogdGhpcy5kb2N0b3JJZENvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZTogdGhpcy5zaWduYXR1cmVDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZUludGVydmFsOiB0aGlzLnRpbWVJbnRlcnZhbENvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc2VuYWJsZTogdGhpcy5pc2VuYWJsZUNvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzb246IHRoaXMucGVyc29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKHtjb250cm9sOiB0aGlzLmlzZW5hYmxlQ29udHJvbCwgdHlwZTonYm9vbGVhbicsdGl0bGU6ICdFbmFibGUnLCBwbGFjZWhvbGRlcjogJ0NsaW5pYyBOYW1lJywgaXNSZXF1aXJlZDogdHJ1ZSxyZXF1aXJlZE1zZzogJ0NsaW5pYyBuYW1lIGlzIHJlcXVpcmVkJyxsYWJlbENvbHVtbkNsYXNzOidjb2wtbWQtMyBjb250cm9sLWxhYmVsJyxpbnB1dENvbHVtbkNsYXNzOidjb2wtbWQtOSd9KTtcbiAgICB0aGlzLmNvbXBvbmVudHMucHVzaCh7Y29udHJvbDogdGhpcy50aW1lSW50ZXJ2YWxDb250cm9sLCB0eXBlOidudW1iZXInLHRpdGxlOiAnVGltZSBJbnRlcnZhbCcsIHBsYWNlaG9sZGVyOiAnVGltZSBJbnRlcnZhbCcsIGlzUmVxdWlyZWQ6IHRydWUscmVxdWlyZWRNc2c6ICdDbGluaWMgbmFtZSBpcyByZXF1aXJlZCcsbGFiZWxDb2x1bW5DbGFzczonY29sLW1kLTMgY29udHJvbC1sYWJlbCcsaW5wdXRDb2x1bW5DbGFzczonY29sLW1kLTknfSk7XG4gICAgdGhpcy5jb21wb25lbnRzLnB1c2goe2NvbnRyb2w6IHRoaXMuc2lnbmF0dXJlQ29udHJvbCwgdHlwZTondGV4dCcsdGl0bGU6ICdTaWduYXR1dGUnLCBwbGFjZWhvbGRlcjogJ1RpbWUgSW50ZXJ2YWwnLCBpc1JlcXVpcmVkOiB0cnVlLHJlcXVpcmVkTXNnOiAnQ2xpbmljIG5hbWUgaXMgcmVxdWlyZWQnLGxhYmVsQ29sdW1uQ2xhc3M6J2NvbC1tZC0zIGNvbnRyb2wtbGFiZWwnLGlucHV0Q29sdW1uQ2xhc3M6J2NvbC1tZC05J30pO1xuICAgIFxuICAgIHRoaXMubXlGb3JtID0gbmV3IENvbnRyb2xHcm91cCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N0b3JJZDogdGhpcy5kb2N0b3JJZENvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZTogdGhpcy5zaWduYXR1cmVDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZUludGVydmFsOiB0aGlzLnRpbWVJbnRlcnZhbENvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc2VuYWJsZTogdGhpcy5pc2VuYWJsZUNvbnRyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpe1xuICAgIHRoaXMuZG9jdG9yID0gdGhpcy5fY29tcGFueVNlcnZpY2UuZ2V0Q3VycmVudERvY3RvcigpO1xuICAgIHRoaXMuX2xvZy5sb2coJ0RvY3RvciA9Jyx0aGlzLmRvY3Rvcik7XG4gICAgaWYodGhpcy5kb2N0b3Ipe1xuICAgICAgdGhpcy5kb2N0b3JJZENvbnRyb2wudXBkYXRlVmFsdWUodGhpcy5kb2N0b3IuZG9jdG9ySWQpO1xuICAgICAgdGhpcy5pc2VuYWJsZUNvbnRyb2wudXBkYXRlVmFsdWUodGhpcy5kb2N0b3IuaXNlbmFibGUpO1xuICAgICAgdGhpcy50aW1lSW50ZXJ2YWxDb250cm9sLnVwZGF0ZVZhbHVlKHRoaXMuZG9jdG9yLnRpbWVJbnRlcnZhbCk7XG4gICAgICB0aGlzLnNpZ25hdHVyZUNvbnRyb2wudXBkYXRlVmFsdWUodGhpcy5kb2N0b3Iuc2lnbmF0dXJlKTsgICAgICBcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuZG9jdG9yID0gbmV3IERvY3RvcigpO1xuICAgIH1cbiAgICAvKlxuICAgIHRoaXMubXlGb3JtLnZhbHVlQ2hhbmdlc1xuICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICB0aGlzLl9sb2cubG9nKFwiZG9jdG9yIGRldGFpbCAtPiBNb2RlbCBEcml2ZW4gRm9ybSA6IFwiICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICovXG4gIH0gIFxuXG4gIHNhdmUoKXtcbiAgICAvL3BlcnNvbiBjb21wb25lbnQgaXMgc2VmbC1zYXZlIGNvbXBvbmVudCwgaXQgd2lsbCBzYXZlIHRoZSBkYXRhIG9mIGlzU2F2ZSA9IHRydWUgOyBhZnRlciBzYXZlLCBpdCB3aWxsIGNhbCBwZXJzb25BZnRlclNhdmUgbWV0aG9kXG4gICAgdGhpcy5fbG9nLmxvZygnZG9jdG9yIGRldGFpbCAtPiB3aWxsIHNhdmUgZGF0YSB3aXRoIG15Rm9ybS5wZXJzb249Jyx0aGlzLm15Rm9ybS52YWx1ZS5wZXJzb24pO1xuICAgIHRoaXMucGVyc29uLnNhdmUodGhpcy5teUZvcm0udmFsdWUucGVyc29uKS5zdWJzY3JpYmUoXG4gICAgICAgIHBlcnNvbiA9PiB7XG4gICAgICAgICAgdGhpcy5fbG9nLmxvZygnIHJlY2VpdmVkIGRhdGEgZnJvbSBwZXJzb24gY29tcG9uZW50ID0nLHBlcnNvbik7XG4gICAgICAgICAgdGhpcy5fY29tcGFueVNlcnZpY2Uuc2F2ZURvY3Rvcih0aGlzLm15Rm9ybS52YWx1ZSxwZXJzb24pLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgZGF0YSA9PiB7dGhpcy5fbG9nLmxvZyhcImRvY3RvciBzYXZlZCBzdWNjZXNzZnVsbHkgISBcIixkYXRhKTsgfSxcbiAgICAgICAgICAgICAgZXJyID0+IHt0aGlzLl9sb2cubG9nKGVycik7fSxcbiAgICAgICAgICAgICAgKCkgPT4ge3RoaXMuX2xvZy5sb2coJ2NyZWF0ZWQgIScpO31cbiAgICAgICAgICAgICAgKTsgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHt0aGlzLl9sb2cubG9nKCdlcnJvciBpbiBzYXZpbmcgcGVyc29uID0gJyxlcnIpO30sXG4gICAgICAgICgpID0+IHt0aGlzLl9sb2cubG9nKCdzYXZlZCBwZXJzb24gc3VjY2Vzc2Z1bGx5ICEnKTt9XG4gICAgICApOyAgICBcbiAgfVxuXG5cbiAgcGVyc29uQ29udHJvbEdyb3VwKHBlcnNvbkNvbnRyb2xHcm91cDogQ29udHJvbEdyb3VwKXsgICAgXG4gICAgLy90aGlzLnBlcnNvbiA9IHBlcnNvbkNvbnRyb2xHcm91cDtcbiAgICB0aGlzLm15Rm9ybS5hZGRDb250cm9sKCdwZXJzb24nLHRoaXMuX2ZiLmdyb3VwKHBlcnNvbkNvbnRyb2xHcm91cC5jb250cm9scykpO1xuICAgIHRoaXMuX2xvZy5sb2coXCJkb2N0b3IgZGV0YWlsIHBlcnNvbiBjb250cm9sIGdyb3VwID1cIixwZXJzb25Db250cm9sR3JvdXAsdGhpcy5teUZvcm0pO1xuICB9XG5cbiAgZmlyZUNsaW5pY1Jvd0NsaWNrZWQocm93KXtcbiAgICB0aGlzLl9sb2cubG9nKCdyb3cgPSAnLHJvdylcbiAgICB0aGlzLmNsaW5pY0RpYWxvZy5vcGVuRGlhbG9nKHJvdyk7XG4gIH1cblxuICBmaXJlQlRSb3dDbGlja2VkKHJvdyl7XG4gICAgdGhpcy5fbG9nLmxvZygncm93ID0gJyxyb3cpXG4gICAgdGhpcy5idERpYWxvZy5vcGVuRGlhbG9nKHJvdywnRE9DVE9SJyk7XG4gIH1cblxuICBhZGRlZFJvc3RlckV2ZW50KGRhdGEpe1xuICAgIHRoaXMuX2xvZy5sb2coJyB3aWxsIGFkZCB0aGlzIHJvc3RlciA9ICcsZGF0YSk7XG4gICAgdGhpcy5fY29tcGFueVNlcnZpY2UuZ2VuZXJhdGVSb3N0ZXIoZGF0YSkuc3Vic2NyaWJlKFxuICAgICAgZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuX2xvZy5sb2coJyBkYXRhID0gJyxkYXRhKTtcbiAgICAgIH0sXG4gICAgICBlcnIgPT4ge1xuICAgICAgICB0aGlzLl9sb2cubG9nKCcgZXJyb3IgPSAnLGVycik7XG4gICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTonZXJyb3InLCBzdW1tYXJ5OidJbmZvIE1lc3NhZ2UnLCBkZXRhaWw6J1RoZXJlIGFyZSBzbG90cyA6JyArIEpTT04uc3RyaW5naWZ5KGVycil9KTtcblxuICAgICAgfSAgICAgIFxuICAgICAgKTtcbiAgfVxufVxuIl19
