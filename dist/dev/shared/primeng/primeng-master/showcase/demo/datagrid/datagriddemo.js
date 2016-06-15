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
var datagrid_1 = require('../../../components/datagrid/datagrid');
var header_1 = require('../../../components/common/header');
var footer_1 = require('../../../components/common/footer');
var panel_1 = require('../../../components/panel/panel');
var button_1 = require('../../../components/button/button');
var dialog_1 = require('../../../components/dialog/dialog');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var carservice_1 = require('../service/carservice');
var DataGridDemo = (function () {
    function DataGridDemo(carService) {
        this.carService = carService;
    }
    DataGridDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsLarge().then(function (cars) { return _this.cars = cars; });
    };
    DataGridDemo.prototype.selectCar = function (car) {
        this.selectedCar = car;
        this.displayDialog = true;
    };
    DataGridDemo.prototype.onDialogHide = function () {
        this.selectedCar = null;
    };
    DataGridDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datagrid/datagriddemo.html',
            directives: [datagrid_1.DataGrid, header_1.Header, footer_1.Footer, dialog_1.Dialog, panel_1.Panel, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataGridDemo);
    return DataGridDemo;
}());
exports.DataGridDemo = DataGridDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YWdyaWQvZGF0YWdyaWRkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFDN0QscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHNCQUFvQixpQ0FBaUMsQ0FBQyxDQUFBO0FBQ3RELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBRTlELDJCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBT2pEO0lBUUksc0JBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLCtCQUFRLEdBQVI7UUFBQSxpQkFFQztRQURHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsZ0NBQVMsR0FBVCxVQUFVLEdBQVE7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQsbUNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUExQkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxVQUFVLEVBQUUsQ0FBQyxtQkFBUSxFQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsZUFBTSxFQUFDLGFBQUssRUFBQyxlQUFNLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7WUFDM0csU0FBUyxFQUFFLENBQUMscUJBQWMsRUFBQyx1QkFBVSxDQUFDO1NBQ3pDLENBQUM7O29CQUFBO0lBdUJGLG1CQUFDO0FBQUQsQ0F0QkEsQUFzQkMsSUFBQTtBQXRCWSxvQkFBWSxlQXNCeEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2RhdGFncmlkL2RhdGFncmlkZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSAgICBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCB7RGF0YUdyaWR9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZGF0YWdyaWQvZGF0YWdyaWQnO1xuaW1wb3J0IHtIZWFkZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2hlYWRlcic7XG5pbXBvcnQge0Zvb3Rlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb24vZm9vdGVyJztcbmltcG9ydCB7UGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge0RpYWxvZ30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtDYXJ9IGZyb20gJy4uL2RvbWFpbi9jYXInO1xuaW1wb3J0IHtDYXJTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2NhcnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vZGF0YWdyaWQvZGF0YWdyaWRkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtEYXRhR3JpZCxIZWFkZXIsRm9vdGVyLERpYWxvZyxQYW5lbCxCdXR0b24sVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHByb3ZpZGVyczogW0hUVFBfUFJPVklERVJTLENhclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFHcmlkRGVtbyBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjYXJzOiBDYXJbXTtcbiAgICBcbiAgICBzZWxlY3RlZENhcjogQ2FyO1xuICAgIFxuICAgIGRpc3BsYXlEaWFsb2c6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhclNlcnZpY2U6IENhclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzTGFyZ2UoKS50aGVuKGNhcnMgPT4gdGhpcy5jYXJzID0gY2Fycyk7XG4gICAgfVxuICAgIFxuICAgIHNlbGVjdENhcihjYXI6IENhcikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyID0gY2FyO1xuICAgICAgICB0aGlzLmRpc3BsYXlEaWFsb2cgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBvbkRpYWxvZ0hpZGUoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXIgPSBudWxsO1xuICAgIH1cbn0iXX0=
