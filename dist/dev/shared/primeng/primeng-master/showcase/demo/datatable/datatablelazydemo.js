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
var router_deprecated_1 = require('angular2/router-deprecated');
var http_1 = require('angular2/http');
var datatable_1 = require('../../../components/datatable/datatable');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var column_1 = require('../../../components/column/column');
var header_1 = require('../../../components/common/header');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var carservice_1 = require('../service/carservice');
var DataTableLazyDemo = (function () {
    function DataTableLazyDemo(carService) {
        this.carService = carService;
    }
    DataTableLazyDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsLarge().then(function (cars) { _this.datasource = cars; _this.totalRecords = _this.datasource.length; });
    };
    DataTableLazyDemo.prototype.loadCarsLazy = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.cars = _this.datasource.slice(event.first, (event.first + event.rows));
        }, 250);
    };
    DataTableLazyDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablelazydemo.html',
            directives: [datatable_1.DataTable, column_1.Column, header_1.Header, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableLazyDemo);
    return DataTableLazyDemo;
}());
exports.DataTableLazyDemo = DataTableLazyDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWxhenlkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFDN0QscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBRTlELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELDJDQUErQiw4QkFBOEIsQ0FBQyxDQUFBO0FBQzlELDJCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBU2pEO0lBUUksMkJBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLG9DQUFRLEdBQVI7UUFBQSxpQkFHQztRQURHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFLLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO0lBQ3ZILENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsS0FBb0I7UUFBakMsaUJBWUM7UUFIRyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFoQ0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLGdEQUFnRDtZQUM3RCxVQUFVLEVBQUUsQ0FBQyxxQkFBUyxFQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsNkNBQWdCLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7WUFDekcsU0FBUyxFQUFFLENBQUMscUJBQWMsRUFBQyx1QkFBVSxDQUFDO1NBQ3pDLENBQUM7O3lCQUFBO0lBNkJGLHdCQUFDO0FBQUQsQ0E1QkEsQUE0QkMsSUFBQTtBQTVCWSx5QkFBaUIsb0JBNEI3QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWxhenlkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9ICAgIGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0IHtEYXRhVGFibGV9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZGF0YXRhYmxlL2RhdGF0YWJsZSc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Q2FyfSBmcm9tICcuLi9kb21haW4vY2FyJztcbmltcG9ydCB7Q29sdW1ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbHVtbi9jb2x1bW4nO1xuaW1wb3J0IHtIZWFkZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2hlYWRlcic7XG5pbXBvcnQge0RhdGFUYWJsZVN1Ym1lbnV9IGZyb20gJy4vZGF0YXRhYmxlc3VibWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHtDYXJTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2NhcnNlcnZpY2UnO1xuaW1wb3J0IHtMYXp5TG9hZEV2ZW50fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9sYXp5bG9hZCc7XG5pbXBvcnQge0ZpbHRlck1ldGFkYXRhfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9sYXp5bG9hZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9kYXRhdGFibGUvZGF0YXRhYmxlbGF6eWRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0RhdGFUYWJsZSxDb2x1bW4sSGVhZGVyLERhdGFUYWJsZVN1Ym1lbnUsVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHByb3ZpZGVyczogW0hUVFBfUFJPVklERVJTLENhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUxhenlEZW1vIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGRhdGFzb3VyY2U6IENhcltdO1xuICAgIFxuICAgIGNhcnM6IENhcltdO1xuICAgIFxuICAgIHRvdGFsUmVjb3JkczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJTZXJ2aWNlOiBDYXJTZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvL2RhdGFzb3VyY2UgaW1pdGF0aW9uXG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzTGFyZ2UoKS50aGVuKGNhcnMgPT4ge3RoaXMuZGF0YXNvdXJjZSA9IGNhcnM7IHRoaXMudG90YWxSZWNvcmRzID0gdGhpcy5kYXRhc291cmNlLmxlbmd0aDt9KTtcbiAgICB9XG4gICAgXG4gICAgbG9hZENhcnNMYXp5KGV2ZW50OiBMYXp5TG9hZEV2ZW50KSB7XG4gICAgICAgIC8vaW4gYSByZWFsIGFwcGxpY2F0aW9uLCBtYWtlIGEgcmVtb3RlIHJlcXVlc3QgdG8gbG9hZCBkYXRhIHVzaW5nIHN0YXRlIG1ldGFkYXRhIGZyb20gZXZlbnRcbiAgICAgICAgLy9ldmVudC5maXJzdCA9IEZpcnN0IHJvdyBvZmZzZXRcbiAgICAgICAgLy9ldmVudC5yb3dzID0gTnVtYmVyIG9mIHJvd3MgcGVyIHBhZ2VcbiAgICAgICAgLy9ldmVudC5zb3J0RmllbGQgPSBGaWVsZCBuYW1lIHRvIHNvcnQgd2l0aFxuICAgICAgICAvL2V2ZW50LnNvcnRPcmRlciA9IFNvcnQgb3JkZXIgYXMgbnVtYmVyLCAxIGZvciBhc2MgYW5kIC0xIGZvciBkZWNcbiAgICAgICAgLy9maWx0ZXJzOiBGaWx0ZXJNZXRhZGF0YSBvYmplY3QgaGF2aW5nIGZpZWxkIGFzIGtleSBhbmQgZmlsdGVyIHZhbHVlLCBmaWx0ZXIgbWF0Y2hNb2RlIGFzIHZhbHVlXG4gICAgICAgIFxuICAgICAgICAvL2ltaXRhdGUgZGIgY29ubmVjdGlvbiBvdmVyIGEgbmV0d29ya1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FycyA9IHRoaXMuZGF0YXNvdXJjZS5zbGljZShldmVudC5maXJzdCwgKGV2ZW50LmZpcnN0ICsgZXZlbnQucm93cykpO1xuICAgICAgICB9LCAyNTApO1xuICAgIH1cbn0iXX0=
