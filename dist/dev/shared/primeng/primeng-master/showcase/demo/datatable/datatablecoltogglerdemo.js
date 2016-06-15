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
var multiselect_1 = require('../../../components/multiselect/multiselect');
var column_1 = require('../../../components/column/column');
var header_1 = require('../../../components/common/header');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var carservice_1 = require('../service/carservice');
var DataTableColTogglerDemo = (function () {
    function DataTableColTogglerDemo(carService) {
        this.carService = carService;
    }
    DataTableColTogglerDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.columnOptions = [];
        for (var i = 0; i < this.cols.length; i++) {
            this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
        }
    };
    DataTableColTogglerDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablecoltogglerdemo.html',
            directives: [datatable_1.DataTable, column_1.Column, header_1.Header, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, multiselect_1.MultiSelect, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableColTogglerDemo);
    return DataTableColTogglerDemo;
}());
exports.DataTableColTogglerDemo = DataTableColTogglerDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWNvbHRvZ2dsZXJkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFDN0QscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELDRCQUEwQiw2Q0FBNkMsQ0FBQyxDQUFBO0FBRXhFLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELDJDQUErQiw4QkFBOEIsQ0FBQyxDQUFBO0FBQzlELDJCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBUWpEO0lBUUksaUNBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLDBDQUFRLEdBQVI7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFDN0IsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUM7WUFDL0IsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUM7WUFDakMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUM7U0FDcEMsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDL0UsQ0FBQztJQUNMLENBQUM7SUE3Qkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHNEQUFzRDtZQUNuRSxVQUFVLEVBQUUsQ0FBQyxxQkFBUyxFQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsNkNBQWdCLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLHlCQUFXLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztZQUNySCxTQUFTLEVBQUUsQ0FBQyxxQkFBYyxFQUFDLHVCQUFVLENBQUM7U0FDekMsQ0FBQzs7K0JBQUE7SUEwQkYsOEJBQUM7QUFBRCxDQXpCQSxBQXlCQyxJQUFBO0FBekJZLCtCQUF1QiwwQkF5Qm5DLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9kYXRhdGFibGUvZGF0YXRhYmxlY29sdG9nZ2xlcmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gICAgZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhdGFibGUvZGF0YXRhYmxlJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtNdWx0aVNlbGVjdH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9tdWx0aXNlbGVjdC9tdWx0aXNlbGVjdCc7XG5pbXBvcnQge0Nhcn0gZnJvbSAnLi4vZG9tYWluL2Nhcic7XG5pbXBvcnQge0NvbHVtbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2x1bW4vY29sdW1uJztcbmltcG9ydCB7SGVhZGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbi9oZWFkZXInO1xuaW1wb3J0IHtEYXRhVGFibGVTdWJtZW51fSBmcm9tICcuL2RhdGF0YWJsZXN1Ym1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7Q2FyU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9jYXJzZXJ2aWNlJztcbmltcG9ydCB7U2VsZWN0SXRlbX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvc2VsZWN0aXRlbSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9kYXRhdGFibGUvZGF0YXRhYmxlY29sdG9nZ2xlcmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0RhdGFUYWJsZSxDb2x1bW4sSGVhZGVyLERhdGFUYWJsZVN1Ym1lbnUsVGFiUGFuZWwsVGFiVmlldyxNdWx0aVNlbGVjdCxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHByb3ZpZGVyczogW0hUVFBfUFJPVklERVJTLENhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUNvbFRvZ2dsZXJEZW1vIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNhcnM6IENhcltdO1xuICAgIFxuICAgIGNvbHM6IGFueVtdO1xuICAgIFxuICAgIGNvbHVtbk9wdGlvbnM6IFNlbGVjdEl0ZW1bXTtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJTZXJ2aWNlOiBDYXJTZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNhclNlcnZpY2UuZ2V0Q2Fyc1NtYWxsKCkudGhlbihjYXJzID0+IHRoaXMuY2FycyA9IGNhcnMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb2xzID0gW1xuICAgICAgICAgICAge2ZpZWxkOiAndmluJywgaGVhZGVyOiAnVmluJ30sXG4gICAgICAgICAgICB7ZmllbGQ6ICd5ZWFyJywgaGVhZGVyOiAnWWVhcid9LFxuICAgICAgICAgICAge2ZpZWxkOiAnYnJhbmQnLCBoZWFkZXI6ICdCcmFuZCd9LFxuICAgICAgICAgICAge2ZpZWxkOiAnY29sb3InLCBoZWFkZXI6ICdDb2xvcid9XG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbHVtbk9wdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY29scy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5PcHRpb25zLnB1c2goe2xhYmVsOiB0aGlzLmNvbHNbaV0uaGVhZGVyLCB2YWx1ZTogdGhpcy5jb2xzW2ldfSk7XG4gICAgICAgIH1cbiAgICB9XG59Il19
