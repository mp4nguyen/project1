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
var DataTableDemo = (function () {
    function DataTableDemo(carService) {
        this.carService = carService;
    }
    DataTableDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    };
    DataTableDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatabledemo.html',
            directives: [datatable_1.DataTable, column_1.Column, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableDemo);
    return DataTableDemo;
}());
exports.DataTableDemo = DataTableDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsMEJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFDbEUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFFOUQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsMkNBQStCLDhCQUE4QixDQUFDLENBQUE7QUFDOUQsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFPakQ7SUFNSSx1QkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFJLENBQUM7SUFFL0MsZ0NBQVEsR0FBUjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDUixFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQztZQUM3QixFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQztZQUMvQixFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQztZQUNqQyxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQztTQUNwQyxDQUFDO0lBQ04sQ0FBQztJQXRCTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsNENBQTRDO1lBQ3pELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsZUFBTSxFQUFDLDZDQUFnQixFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1lBQ2xHLFNBQVMsRUFBRSxDQUFDLHFCQUFjLEVBQUMsdUJBQVUsQ0FBQztTQUN6QyxDQUFDOztxQkFBQTtJQW1CRixvQkFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFsQlkscUJBQWEsZ0JBa0J6QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gICAgZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhdGFibGUvZGF0YXRhYmxlJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtDYXJ9IGZyb20gJy4uL2RvbWFpbi9jYXInO1xuaW1wb3J0IHtDb2x1bW59IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29sdW1uL2NvbHVtbic7XG5pbXBvcnQge0RhdGFUYWJsZVN1Ym1lbnV9IGZyb20gJy4vZGF0YXRhYmxlc3VibWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHtDYXJTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2NhcnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0RhdGFUYWJsZSxDb2x1bW4sRGF0YVRhYmxlU3VibWVudSxUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU10sXG4gICAgcHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlMsQ2FyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlRGVtbyBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjYXJzOiBDYXJbXTtcbiAgICBcbiAgICBjb2xzOiBhbnlbXTtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhclNlcnZpY2U6IENhclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzU21hbGwoKS50aGVuKGNhcnMgPT4gdGhpcy5jYXJzID0gY2Fycyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbHMgPSBbXG4gICAgICAgICAgICB7ZmllbGQ6ICd2aW4nLCBoZWFkZXI6ICdWaW4nfSxcbiAgICAgICAgICAgIHtmaWVsZDogJ3llYXInLCBoZWFkZXI6ICdZZWFyJ30sXG4gICAgICAgICAgICB7ZmllbGQ6ICdicmFuZCcsIGhlYWRlcjogJ0JyYW5kJ30sXG4gICAgICAgICAgICB7ZmllbGQ6ICdjb2xvcicsIGhlYWRlcjogJ0NvbG9yJ31cbiAgICAgICAgXTtcbiAgICB9XG59Il19
