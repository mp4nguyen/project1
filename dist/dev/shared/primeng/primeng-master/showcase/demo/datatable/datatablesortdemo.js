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
var DataTableSortDemo = (function () {
    function DataTableSortDemo(carService) {
        this.carService = carService;
    }
    DataTableSortDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars1 = cars; });
        this.carService.getCarsSmall().then(function (cars) { return _this.cars2 = cars; });
    };
    DataTableSortDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablesortdemo.html',
            directives: [datatable_1.DataTable, column_1.Column, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableSortDemo);
    return DataTableSortDemo;
}());
exports.DataTableSortDemo = DataTableSortDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZXNvcnRkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFDN0QscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBRTlELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELDJDQUErQiw4QkFBOEIsQ0FBQyxDQUFBO0FBQzlELDJCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBT2pEO0lBTUksMkJBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLG9DQUFRLEdBQVI7UUFBQSxpQkFHQztRQUZHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQWhCTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsZ0RBQWdEO1lBQzdELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsZUFBTSxFQUFDLDZDQUFnQixFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1lBQ2xHLFNBQVMsRUFBRSxDQUFDLHFCQUFjLEVBQUMsdUJBQVUsQ0FBQztTQUN6QyxDQUFDOzt5QkFBQTtJQWFGLHdCQUFDO0FBQUQsQ0FaQSxBQVlDLElBQUE7QUFaWSx5QkFBaUIsb0JBWTdCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9kYXRhdGFibGUvZGF0YXRhYmxlc29ydGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gICAgZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhdGFibGUvZGF0YXRhYmxlJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtDYXJ9IGZyb20gJy4uL2RvbWFpbi9jYXInO1xuaW1wb3J0IHtDb2x1bW59IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29sdW1uL2NvbHVtbic7XG5pbXBvcnQge0RhdGFUYWJsZVN1Ym1lbnV9IGZyb20gJy4vZGF0YXRhYmxlc3VibWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHtDYXJTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2NhcnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZXNvcnRkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtEYXRhVGFibGUsQ29sdW1uLERhdGFUYWJsZVN1Ym1lbnUsVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHByb3ZpZGVyczogW0hUVFBfUFJPVklERVJTLENhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVNvcnREZW1vIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNhcnMxOiBDYXJbXTtcbiAgICBcbiAgICBjYXJzMjogQ2FyW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhclNlcnZpY2U6IENhclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzU21hbGwoKS50aGVuKGNhcnMgPT4gdGhpcy5jYXJzMSA9IGNhcnMpO1xuICAgICAgICB0aGlzLmNhclNlcnZpY2UuZ2V0Q2Fyc1NtYWxsKCkudGhlbihjYXJzID0+IHRoaXMuY2FyczIgPSBjYXJzKTtcbiAgICB9XG59Il19
