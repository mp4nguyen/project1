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
var footer_1 = require('../../../components/common/footer');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var carservice_1 = require('../service/carservice');
var growl_1 = require('../../../components/growl/growl');
var DataTableSelectionDemo = (function () {
    function DataTableSelectionDemo(carService) {
        this.carService = carService;
    }
    DataTableSelectionDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
    };
    DataTableSelectionDemo.prototype.onRowSelect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Selected', detail: event.data.vin + ' - ' + event.data.brand });
    };
    DataTableSelectionDemo.prototype.onRowUnselect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Unselected', detail: event.data.vin + ' - ' + event.data.brand });
    };
    DataTableSelectionDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatableselectiondemo.html',
            directives: [datatable_1.DataTable, column_1.Column, header_1.Header, footer_1.Footer, growl_1.Growl, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableSelectionDemo);
    return DataTableSelectionDemo;
}());
exports.DataTableSelectionDemo = DataTableSelectionDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZXNlbGVjdGlvbmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsMEJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFDbEUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFFOUQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsMkNBQStCLDhCQUE4QixDQUFDLENBQUE7QUFDOUQsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFDakQsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFRdEQ7SUFZSSxnQ0FBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFJLENBQUM7SUFFL0MseUNBQVEsR0FBUjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCw0Q0FBVyxHQUFYLFVBQVksS0FBSztRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDbkgsQ0FBQztJQUVELDhDQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQ3JILENBQUM7SUEvQkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHFEQUFxRDtZQUNsRSxVQUFVLEVBQUUsQ0FBQyxxQkFBUyxFQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsZUFBTSxFQUFDLGFBQUssRUFBQyw2Q0FBZ0IsRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztZQUN0SCxTQUFTLEVBQUUsQ0FBQyxxQkFBYyxFQUFDLHVCQUFVLENBQUM7U0FDekMsQ0FBQzs7OEJBQUE7SUE0QkYsNkJBQUM7QUFBRCxDQTNCQSxBQTJCQyxJQUFBO0FBM0JZLDhCQUFzQix5QkEyQmxDLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9kYXRhdGFibGUvZGF0YXRhYmxlc2VsZWN0aW9uZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSAgICBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCB7RGF0YVRhYmxlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RhdGF0YWJsZS9kYXRhdGFibGUnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0Nhcn0gZnJvbSAnLi4vZG9tYWluL2Nhcic7XG5pbXBvcnQge0NvbHVtbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2x1bW4vY29sdW1uJztcbmltcG9ydCB7SGVhZGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbi9oZWFkZXInO1xuaW1wb3J0IHtGb290ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2Zvb3Rlcic7XG5pbXBvcnQge0RhdGFUYWJsZVN1Ym1lbnV9IGZyb20gJy4vZGF0YXRhYmxlc3VibWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHtDYXJTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2NhcnNlcnZpY2UnO1xuaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL21lc3NhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZXNlbGVjdGlvbmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0RhdGFUYWJsZSxDb2x1bW4sSGVhZGVyLEZvb3RlcixHcm93bCxEYXRhVGFibGVTdWJtZW51LFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBwcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSUyxDYXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVTZWxlY3Rpb25EZW1vIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIG1zZ3M6IE1lc3NhZ2VbXTtcblxuICAgIGNhcnM6IENhcltdO1xuXG4gICAgc2VsZWN0ZWRDYXIxOiBDYXI7XG5cbiAgICBzZWxlY3RlZENhcjI6IENhcjtcblxuICAgIHNlbGVjdGVkQ2FyczogQ2FyW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhclNlcnZpY2U6IENhclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzU21hbGwoKS50aGVuKGNhcnMgPT4gdGhpcy5jYXJzID0gY2Fycyk7XG4gICAgfVxuXG4gICAgb25Sb3dTZWxlY3QoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tc2dzID0gW107XG4gICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTogJ2luZm8nLCBzdW1tYXJ5OiAnQ2FyIFNlbGVjdGVkJywgZGV0YWlsOiBldmVudC5kYXRhLnZpbiArICcgLSAnICsgZXZlbnQuZGF0YS5icmFuZH0pO1xuICAgIH1cblxuICAgIG9uUm93VW5zZWxlY3QoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tc2dzID0gW107XG4gICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTogJ2luZm8nLCBzdW1tYXJ5OiAnQ2FyIFVuc2VsZWN0ZWQnLCBkZXRhaWw6IGV2ZW50LmRhdGEudmluICsgJyAtICcgKyBldmVudC5kYXRhLmJyYW5kfSk7XG4gICAgfVxufSJdfQ==
