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
var inputtext_1 = require('../../../components/inputtext/inputtext');
var column_1 = require('../../../components/column/column');
var header_1 = require('../../../components/common/header');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var carservice_1 = require('../service/carservice');
var DataTableFilterDemo = (function () {
    function DataTableFilterDemo(carService) {
        this.carService = carService;
    }
    DataTableFilterDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsMedium().then(function (cars) { return _this.cars = cars; });
    };
    DataTableFilterDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablefilterdemo.html',
            directives: [datatable_1.DataTable, column_1.Column, header_1.Header, inputtext_1.InputText, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableFilterDemo);
    return DataTableFilterDemo;
}());
exports.DataTableFilterDemo = DataTableFilterDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWZpbHRlcmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsMEJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFDbEUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsMEJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFFbEUsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsMkNBQStCLDhCQUE4QixDQUFDLENBQUE7QUFDOUQsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFPakQ7SUFJSSw2QkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFOUMsc0NBQVEsR0FBUjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFiTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsa0RBQWtEO1lBQy9ELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsZUFBTSxFQUFDLGVBQU0sRUFBQyxxQkFBUyxFQUFDLDZDQUFnQixFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1lBQ25ILFNBQVMsRUFBRSxDQUFDLHFCQUFjLEVBQUMsdUJBQVUsQ0FBQztTQUN6QyxDQUFDOzsyQkFBQTtJQVVGLDBCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSwyQkFBbUIsc0JBUy9CLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9kYXRhdGFibGUvZGF0YXRhYmxlZmlsdGVyZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSAgICBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCB7RGF0YVRhYmxlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RhdGF0YWJsZS9kYXRhdGFibGUnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0lucHV0VGV4dH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9pbnB1dHRleHQvaW5wdXR0ZXh0JztcbmltcG9ydCB7Q2FyfSBmcm9tICcuLi9kb21haW4vY2FyJztcbmltcG9ydCB7Q29sdW1ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbHVtbi9jb2x1bW4nO1xuaW1wb3J0IHtIZWFkZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2hlYWRlcic7XG5pbXBvcnQge0RhdGFUYWJsZVN1Ym1lbnV9IGZyb20gJy4vZGF0YXRhYmxlc3VibWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHtDYXJTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2NhcnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWZpbHRlcmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0RhdGFUYWJsZSxDb2x1bW4sSGVhZGVyLElucHV0VGV4dCxEYXRhVGFibGVTdWJtZW51LFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBwcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSUyxDYXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVGaWx0ZXJEZW1vIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNhcnM6IENhcltdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJTZXJ2aWNlOiBDYXJTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzTWVkaXVtKCkudGhlbihjYXJzID0+IHRoaXMuY2FycyA9IGNhcnMpO1xuICAgIH1cbn0iXX0=
