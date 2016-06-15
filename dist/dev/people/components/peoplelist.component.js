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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlb3BsZS9jb21wb25lbnRzL3Blb3BsZWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0UsZUFBZSxDQUFDLENBQUE7QUFDbEYsdUJBQW1ELGlCQUFpQixDQUFDLENBQUE7QUFHckUsZ0NBQTRCLDZCQUM1QixDQUFDLENBRHdEO0FBQ3pELGdDQUF3Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQ2hFLGdDQUFnQywrQ0FBK0MsQ0FBQyxDQUFBO0FBVWhGO0lBZUUsNkJBQ2tCLElBQWMsRUFDZCxPQUFlLEVBQ2YsY0FBNkI7UUFGN0IsU0FBSSxHQUFKLElBQUksQ0FBVTtRQUNkLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQWRyQyxlQUFVLEdBQWlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBS2pELFlBQU8sR0FDWSxDQUFDLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDO1lBQzNDLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDO1lBQ3hDLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDO1lBQ25DLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztJQVFqRSxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQUdDO1FBRkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUksSUFBSyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsNENBQWMsR0FBZCxVQUFlLEdBQVU7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUdPLDRDQUFjLEdBQXRCO0lBRUEsQ0FBQztJQW5DRDtRQUFDLFlBQUssRUFBRTs7MkRBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7MERBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7MkRBQUE7SUFYWDtRQUFDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsK0NBQStDO1lBQzVELFNBQVMsRUFBRSxFQUFFO1lBQ2IsVUFBVSxFQUFFLENBQUMsa0NBQWdCLENBQUM7U0FDL0IsQ0FBQzs7MkJBQUE7SUF1Q0YsMEJBQUM7QUFBRCxDQXJDQSxBQXFDQyxJQUFBO0FBckNZLDJCQUFtQixzQkFxQy9CLENBQUEiLCJmaWxlIjoicGVvcGxlL2NvbXBvbmVudHMvcGVvcGxlbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXQsSW5qZWN0b3IsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLFJvdXRlQ29uZmlnLFJvdXRlcn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbi8vUm91dGVyLFJvdXRlQ29uZmlnLFJvdXRlck91dGxldFxuXG5pbXBvcnQge1Blb3BsZVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL3Blb3BsZS5zZXJ2aWNlcydcbmltcG9ydCB7TXlMb2dnZXJ9ICBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy5zZXJ2aWNlJztcbmltcG9ydCB7TXlUYWJsZUNvbXBvbmVudH0gIGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQge1Blb3BsZX0gZnJvbSAnLi4vbW9kZWxzL3Blb3BsZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Blb3BsZS1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Blb3BsZS9jb21wb25lbnRzL3Blb3BsZWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtdLFxuICBkaXJlY3RpdmVzOiBbTXlUYWJsZUNvbXBvbmVudF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBQZW9wbGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICBASW5wdXQoKSB0YWJsZVRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJ1dHRvbkxhYmVsOiBzdHJpbmc7IFxuICBASW5wdXQoKSBwZXJzb25JZHM6IG51bWJlcltdO1xuICBAT3V0cHV0KCkgcm93Q2xpY2tlZDogRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vcHJpdmF0ZSBpbmplY3RvcjphbnkgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtQZW9wbGVTZXJ2aWNlXSk7XG4gIC8vcHJpdmF0ZSBfcGVvcGxlU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KFBlb3BsZVNlcnZpY2UpO1xuICBwdWJsaWMgcGVvcGxlIDogUGVvcGxlW107XG4gIHB1YmxpYyBjb2x1bW5zOk9iamVjdFtdID0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3t0aXRsZTonRmlyc3QgTmFtZScsZmllbGROYW1lOidmaXJzdE5hbWUnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGl0bGU6J0xhc3QgTmFtZScsZmllbGROYW1lOidsYXN0TmFtZSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aXRsZTonTW9iaWxlJyxmaWVsZE5hbWU6J21vYmlsZSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aXRsZTonQWRkcmVzcycsZmllbGROYW1lOidhZGRyZXNzJ31dO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgcHJpdmF0ZSBfbG9nOiBNeUxvZ2dlcixcbiAgICAgICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgcHJpdmF0ZSBfcGVvcGxlU2VydmljZTogUGVvcGxlU2VydmljZVxuICAgICAgICAgICAgKXtcblxuICB9XG5cbiAgbmdPbkluaXQoKXtcbiAgICB0aGlzLl9wZW9wbGVTZXJ2aWNlLmdldFBlb3BsZSh0aGlzLnBlcnNvbklkcykuc3Vic2NyaWJlKGRhdGEgPT4ge3RoaXMucGVvcGxlID0gZGF0YX0pO1xuICAgIHRoaXMuX2xvZy5sb2coJ3dpbGwgdmlldyBwZXJzb25JZHMgPSAnLHRoaXMucGVyc29uSWRzKTtcbiAgfVxuXG4gIGZpcmVSb3dDbGlja2VkKHJvdzpQZW9wbGUpe1xuICAgIHRoaXMuX2xvZy5sb2coXCJQZW9wbGUgLT4gY2xpY2tlZCByb3cgPSBcIixyb3cpO1xuICAgIHRoaXMucm93Q2xpY2tlZC5uZXh0KHJvdyk7XG4gIH1cblxuXG4gIHByaXZhdGUgc2V0Q29tcGFueURhdGEoKXtcbiAgICBcbiAgfVxufVxuIl19
