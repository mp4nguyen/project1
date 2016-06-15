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
var dialog_1 = require('../../../components/dialog/dialog');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var column_1 = require('../../../components/column/column');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var carservice_1 = require('../service/carservice');
var DataTableRowExpansionDemo = (function () {
    function DataTableRowExpansionDemo(carService) {
        this.carService = carService;
    }
    DataTableRowExpansionDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    };
    DataTableRowExpansionDemo.prototype.showCar = function (car) {
        this.selectedCar = car;
        this.dialogVisible = true;
    };
    DataTableRowExpansionDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablerowexpansiondemo.html',
            directives: [datatable_1.DataTable, column_1.Column, datatablesubmenu_component_1.DataTableSubmenu, dialog_1.Dialog, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService],
            styles: ["\n        .label {\n            font-weight: bold\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableRowExpansionDemo);
    return DataTableRowExpansionDemo;
}());
exports.DataTableRowExpansionDemo = DataTableRowExpansionDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZXJvd2V4cGFuc2lvbmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsMEJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFDbEUsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFFOUQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsMkNBQStCLDhCQUE4QixDQUFDLENBQUE7QUFDOUQsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFZakQ7SUFVSSxtQ0FBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFJLENBQUM7SUFFL0MsNENBQVEsR0FBUjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDUixFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQztZQUM3QixFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQztZQUMvQixFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQztZQUNqQyxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQztTQUNwQyxDQUFDO0lBQ04sQ0FBQztJQUVELDJDQUFPLEdBQVAsVUFBUSxHQUFRO1FBQ1osSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQXBDTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsd0RBQXdEO1lBQ3JFLFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsZUFBTSxFQUFDLDZDQUFnQixFQUFDLGVBQU0sRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztZQUN6RyxTQUFTLEVBQUUsQ0FBQyxxQkFBYyxFQUFDLHVCQUFVLENBQUM7WUFDdEMsTUFBTSxFQUFFLENBQUMsb0VBSVIsQ0FBQztTQUNMLENBQUM7O2lDQUFBO0lBNEJGLGdDQUFDO0FBQUQsQ0EzQkEsQUEyQkMsSUFBQTtBQTNCWSxpQ0FBeUIsNEJBMkJyQyxDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZXJvd2V4cGFuc2lvbmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gICAgZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhdGFibGUvZGF0YXRhYmxlJztcbmltcG9ydCB7RGlhbG9nfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0Nhcn0gZnJvbSAnLi4vZG9tYWluL2Nhcic7XG5pbXBvcnQge0NvbHVtbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2x1bW4vY29sdW1uJztcbmltcG9ydCB7RGF0YVRhYmxlU3VibWVudX0gZnJvbSAnLi9kYXRhdGFibGVzdWJtZW51LmNvbXBvbmVudCc7XG5pbXBvcnQge0NhclNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvY2Fyc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9kYXRhdGFibGUvZGF0YXRhYmxlcm93ZXhwYW5zaW9uZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbRGF0YVRhYmxlLENvbHVtbixEYXRhVGFibGVTdWJtZW51LERpYWxvZyxUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU10sXG4gICAgcHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlMsQ2FyU2VydmljZV0sXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAubGFiZWwge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGRcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVJvd0V4cGFuc2lvbkRlbW8gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY2FyczogQ2FyW107XG4gICAgXG4gICAgY29sczogYW55W107XG4gICAgXG4gICAgc2VsZWN0ZWRDYXI6IENhcjtcbiAgICBcbiAgICBkaWFsb2dWaXNpYmxlOiBib29sZWFuO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FyU2VydmljZTogQ2FyU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jYXJTZXJ2aWNlLmdldENhcnNTbWFsbCgpLnRoZW4oY2FycyA9PiB0aGlzLmNhcnMgPSBjYXJzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29scyA9IFtcbiAgICAgICAgICAgIHtmaWVsZDogJ3ZpbicsIGhlYWRlcjogJ1Zpbid9LFxuICAgICAgICAgICAge2ZpZWxkOiAneWVhcicsIGhlYWRlcjogJ1llYXInfSxcbiAgICAgICAgICAgIHtmaWVsZDogJ2JyYW5kJywgaGVhZGVyOiAnQnJhbmQnfSxcbiAgICAgICAgICAgIHtmaWVsZDogJ2NvbG9yJywgaGVhZGVyOiAnQ29sb3InfVxuICAgICAgICBdO1xuICAgIH1cbiAgICBcbiAgICBzaG93Q2FyKGNhcjogQ2FyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXIgPSBjYXI7XG4gICAgICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IHRydWU7XG4gICAgfVxufSJdfQ==
