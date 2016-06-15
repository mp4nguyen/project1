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
var carservice_1 = require('../service/carservice');
var column_1 = require('../../../components/column/column');
var header_1 = require('../../../components/common/header');
var footer_1 = require('../../../components/common/footer');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var DataTableFacetsDemo = (function () {
    function DataTableFacetsDemo(carService) {
        this.carService = carService;
    }
    DataTableFacetsDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
    };
    DataTableFacetsDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablefacetsdemo.html',
            directives: [datatable_1.DataTable, column_1.Column, datatablesubmenu_component_1.DataTableSubmenu, header_1.Header, footer_1.Footer, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableFacetsDemo);
    return DataTableFacetsDemo;
}());
exports.DataTableFacetsDemo = DataTableFacetsDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWZhY2V0c2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsMEJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFDbEUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFFOUQsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFDakQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsMkNBQStCLDhCQUE4QixDQUFDLENBQUE7QUFPOUQ7SUFJSSw2QkFBb0IsVUFBcUI7UUFBckIsZUFBVSxHQUFWLFVBQVUsQ0FBVztJQUFHLENBQUM7SUFFN0Msc0NBQVEsR0FBUjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFiTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsa0RBQWtEO1lBQy9ELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsZUFBTSxFQUFDLDZDQUFnQixFQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7WUFDaEgsU0FBUyxFQUFFLENBQUMscUJBQWMsRUFBQyx1QkFBVSxDQUFDO1NBQ3pDLENBQUM7OzJCQUFBO0lBVUYsMEJBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLDJCQUFtQixzQkFTL0IsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2RhdGF0YWJsZS9kYXRhdGFibGVmYWNldHNkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9ICAgIGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0IHtEYXRhVGFibGV9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZGF0YXRhYmxlL2RhdGF0YWJsZSc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Q2FyfSBmcm9tICcuLi9kb21haW4vY2FyJztcbmltcG9ydCB7Q2FyU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9jYXJzZXJ2aWNlJztcbmltcG9ydCB7Q29sdW1ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbHVtbi9jb2x1bW4nO1xuaW1wb3J0IHtIZWFkZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2hlYWRlcic7XG5pbXBvcnQge0Zvb3Rlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb24vZm9vdGVyJztcbmltcG9ydCB7RGF0YVRhYmxlU3VibWVudX0gZnJvbSAnLi9kYXRhdGFibGVzdWJtZW51LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9kYXRhdGFibGUvZGF0YXRhYmxlZmFjZXRzZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbRGF0YVRhYmxlLENvbHVtbixEYXRhVGFibGVTdWJtZW51LEhlYWRlcixGb290ZXIsVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHByb3ZpZGVyczogW0hUVFBfUFJPVklERVJTLENhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUZhY2V0c0RlbW8gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY2FyczogQ2FyW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhclNlcnZpY2U6Q2FyU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNhclNlcnZpY2UuZ2V0Q2Fyc1NtYWxsKCkudGhlbihjYXJzID0+IHRoaXMuY2FycyA9IGNhcnMpO1xuICAgIH1cbn0iXX0=
