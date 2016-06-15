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
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var carservice_1 = require('../service/carservice');
var DataTableColReorderDemo = (function () {
    function DataTableColReorderDemo(carService) {
        this.carService = carService;
    }
    DataTableColReorderDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
    };
    DataTableColReorderDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablecolreorderdemo.html',
            directives: [datatable_1.DataTable, column_1.Column, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableColReorderDemo);
    return DataTableColReorderDemo;
}());
exports.DataTableColReorderDemo = DataTableColReorderDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWNvbHJlb3JkZXJkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFDN0QscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBRTlELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELDJDQUErQiw4QkFBOEIsQ0FBQyxDQUFBO0FBQzlELDJCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBT2pEO0lBSUksaUNBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLDBDQUFRLEdBQVI7UUFBQSxpQkFFQztRQURHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBYkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHNEQUFzRDtZQUNuRSxVQUFVLEVBQUUsQ0FBQyxxQkFBUyxFQUFDLGVBQU0sRUFBQyw2Q0FBZ0IsRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztZQUNsRyxTQUFTLEVBQUUsQ0FBQyxxQkFBYyxFQUFDLHVCQUFVLENBQUM7U0FDekMsQ0FBQzs7K0JBQUE7SUFVRiw4QkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksK0JBQXVCLDBCQVNuQyxDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWNvbHJlb3JkZXJkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9ICAgIGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0IHtEYXRhVGFibGV9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZGF0YXRhYmxlL2RhdGF0YWJsZSc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Q2FyfSBmcm9tICcuLi9kb21haW4vY2FyJztcbmltcG9ydCB7Q29sdW1ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbHVtbi9jb2x1bW4nO1xuaW1wb3J0IHtEYXRhVGFibGVTdWJtZW51fSBmcm9tICcuL2RhdGF0YWJsZXN1Ym1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7Q2FyU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9jYXJzZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2RhdGF0YWJsZS9kYXRhdGFibGVjb2xyZW9yZGVyZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbRGF0YVRhYmxlLENvbHVtbixEYXRhVGFibGVTdWJtZW51LFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBwcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSUyxDYXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVDb2xSZW9yZGVyRGVtbyBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjYXJzOiBDYXJbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FyU2VydmljZTogQ2FyU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jYXJTZXJ2aWNlLmdldENhcnNTbWFsbCgpLnRoZW4oY2FycyA9PiB0aGlzLmNhcnMgPSBjYXJzKTtcbiAgICB9XG59Il19
