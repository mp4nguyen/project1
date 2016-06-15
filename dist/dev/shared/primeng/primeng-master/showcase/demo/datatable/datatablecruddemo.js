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
var button_1 = require('../../../components/button/button');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var dialog_1 = require('../../../components/dialog/dialog');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var column_1 = require('../../../components/column/column');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var carservice_1 = require('../service/carservice');
var header_1 = require('../../../components/common/header');
var footer_1 = require('../../../components/common/footer');
var DataTableCrudDemo = (function () {
    function DataTableCrudDemo(carService) {
        this.carService = carService;
        this.car = new PrimeCar();
    }
    DataTableCrudDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
    };
    DataTableCrudDemo.prototype.showDialogToAdd = function () {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    };
    DataTableCrudDemo.prototype.save = function () {
        if (this.newCar)
            this.cars.push(this.car);
        else
            this.cars[this.findSelectedCarIndex()] = this.car;
        this.car = null;
        this.displayDialog = false;
    };
    DataTableCrudDemo.prototype.delete = function () {
        this.cars.splice(this.findSelectedCarIndex(), 1);
        this.car = null;
        this.displayDialog = false;
    };
    DataTableCrudDemo.prototype.onRowSelect = function (event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    };
    DataTableCrudDemo.prototype.cloneCar = function (c) {
        var car = new PrimeCar();
        for (var prop in c) {
            car[prop] = c[prop];
        }
        return car;
    };
    DataTableCrudDemo.prototype.findSelectedCarIndex = function () {
        return this.cars.indexOf(this.selectedCar);
    };
    DataTableCrudDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablecruddemo.html',
            directives: [datatable_1.DataTable, column_1.Column, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, header_1.Header, footer_1.Footer, dialog_1.Dialog, button_1.Button, inputtext_1.InputText, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService],
            styles: ["\n        .ui-grid-row div {\n          padding: 4px 10px\n        }\n        \n        .ui-grid-row div label {\n          font-weight: bold;\n        }\n  "]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableCrudDemo);
    return DataTableCrudDemo;
}());
exports.DataTableCrudDemo = DataTableCrudDemo;
var PrimeCar = (function () {
    function PrimeCar(vin, year, brand, color) {
        this.vin = vin;
        this.year = year;
        this.brand = brand;
        this.color = color;
    }
    return PrimeCar;
}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWNydWRkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFDN0QscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBRTlELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELDJDQUErQiw4QkFBOEIsQ0FBQyxDQUFBO0FBQzlELDJCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBZ0J6RDtJQVlJLDJCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUjFDLFFBQUcsR0FBUSxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBUW9CLENBQUM7SUFFL0Msb0NBQVEsR0FBUjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJO1lBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFdEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVELGtDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFZLEtBQUs7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRCxvQ0FBUSxHQUFSLFVBQVMsQ0FBTTtRQUNYLElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFBLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELGdEQUFvQixHQUFwQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQXRFTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsZ0RBQWdEO1lBQzdELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsZUFBTSxFQUFDLDZDQUFnQixFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsZUFBTSxFQUFDLGVBQU0sRUFBQyxxQkFBUyxFQUFDLHFDQUFpQixDQUFDO1lBQ3hJLFNBQVMsRUFBRSxDQUFDLHFCQUFjLEVBQUMsdUJBQVUsQ0FBQztZQUN0QyxNQUFNLEVBQUUsQ0FBQywrSkFRVixDQUFDO1NBQ0gsQ0FBQzs7eUJBQUE7SUEwREYsd0JBQUM7QUFBRCxDQXpEQSxBQXlEQyxJQUFBO0FBekRZLHlCQUFpQixvQkF5RDdCLENBQUE7QUFFRDtJQUVJLGtCQUFtQixHQUFJLEVBQVMsSUFBSyxFQUFTLEtBQU0sRUFBUyxLQUFNO1FBQWhELFFBQUcsR0FBSCxHQUFHLENBQUM7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFDO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBQztRQUFTLFVBQUssR0FBTCxLQUFLLENBQUM7SUFBRyxDQUFDO0lBQzNFLGVBQUM7QUFBRCxDQUhBLEFBR0MsSUFBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2RhdGF0YWJsZS9kYXRhdGFibGVjcnVkZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSAgICBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCB7RGF0YVRhYmxlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RhdGF0YWJsZS9kYXRhdGFibGUnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge0lucHV0VGV4dH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9pbnB1dHRleHQvaW5wdXR0ZXh0JztcbmltcG9ydCB7RGlhbG9nfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0Nhcn0gZnJvbSAnLi4vZG9tYWluL2Nhcic7XG5pbXBvcnQge0NvbHVtbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2x1bW4vY29sdW1uJztcbmltcG9ydCB7RGF0YVRhYmxlU3VibWVudX0gZnJvbSAnLi9kYXRhdGFibGVzdWJtZW51LmNvbXBvbmVudCc7XG5pbXBvcnQge0NhclNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvY2Fyc2VydmljZSc7XG5pbXBvcnQge0hlYWRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb24vaGVhZGVyJztcbmltcG9ydCB7Rm9vdGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbi9mb290ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWNydWRkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtEYXRhVGFibGUsQ29sdW1uLERhdGFUYWJsZVN1Ym1lbnUsVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsSGVhZGVyLEZvb3RlcixEaWFsb2csQnV0dG9uLElucHV0VGV4dCxST1VURVJfRElSRUNUSVZFU10sXG4gICAgcHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlMsQ2FyU2VydmljZV0sXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAudWktZ3JpZC1yb3cgZGl2IHtcbiAgICAgICAgICBwYWRkaW5nOiA0cHggMTBweFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAudWktZ3JpZC1yb3cgZGl2IGxhYmVsIHtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgfVxuICBgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVDcnVkRGVtbyBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBkaXNwbGF5RGlhbG9nOiBib29sZWFuO1xuXG4gICAgY2FyOiBDYXIgPSBuZXcgUHJpbWVDYXIoKTtcbiAgICBcbiAgICBzZWxlY3RlZENhcjogQ2FyO1xuICAgIFxuICAgIG5ld0NhcjogYm9vbGVhbjtcblxuICAgIGNhcnM6IENhcltdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJTZXJ2aWNlOiBDYXJTZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNhclNlcnZpY2UuZ2V0Q2Fyc1NtYWxsKCkudGhlbihjYXJzID0+IHRoaXMuY2FycyA9IGNhcnMpO1xuICAgIH1cbiAgICBcbiAgICBzaG93RGlhbG9nVG9BZGQoKSB7XG4gICAgICAgIHRoaXMubmV3Q2FyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYXIgPSBuZXcgUHJpbWVDYXIoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5RGlhbG9nID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgaWYodGhpcy5uZXdDYXIpXG4gICAgICAgICAgICB0aGlzLmNhcnMucHVzaCh0aGlzLmNhcik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuY2Fyc1t0aGlzLmZpbmRTZWxlY3RlZENhckluZGV4KCldID0gdGhpcy5jYXI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhciA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzcGxheURpYWxvZyA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBkZWxldGUoKSB7XG4gICAgICAgIHRoaXMuY2Fycy5zcGxpY2UodGhpcy5maW5kU2VsZWN0ZWRDYXJJbmRleCgpLCAxKTtcbiAgICAgICAgdGhpcy5jYXIgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc3BsYXlEaWFsb2cgPSBmYWxzZTtcbiAgICB9ICAgIFxuICAgIFxuICAgIG9uUm93U2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMubmV3Q2FyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FyID0gdGhpcy5jbG9uZUNhcihldmVudC5kYXRhKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5RGlhbG9nID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgY2xvbmVDYXIoYzogQ2FyKTogQ2FyIHtcbiAgICAgICAgbGV0IGNhciA9IG5ldyBQcmltZUNhcigpO1xuICAgICAgICBmb3IobGV0IHByb3AgaW4gYykge1xuICAgICAgICAgICAgY2FyW3Byb3BdID0gY1twcm9wXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FyO1xuICAgIH1cbiAgICBcbiAgICBmaW5kU2VsZWN0ZWRDYXJJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jYXJzLmluZGV4T2YodGhpcy5zZWxlY3RlZENhcik7XG4gICAgfVxufVxuXG5jbGFzcyBQcmltZUNhciBpbXBsZW1lbnRzIENhciB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIHZpbj8sIHB1YmxpYyB5ZWFyPywgcHVibGljIGJyYW5kPywgcHVibGljIGNvbG9yPykge31cbn0iXX0=
