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
var datascroller_1 = require('../../../components/datascroller/datascroller');
var header_1 = require('../../../components/common/header');
var footer_1 = require('../../../components/common/footer');
var panel_1 = require('../../../components/panel/panel');
var button_1 = require('../../../components/button/button');
var dialog_1 = require('../../../components/dialog/dialog');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var carservice_1 = require('../service/carservice');
var datascrollersubmenu_1 = require('./datascrollersubmenu');
var DataScrollerLoaderDemo = (function () {
    function DataScrollerLoaderDemo(carService) {
        this.carService = carService;
    }
    DataScrollerLoaderDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsMedium().then(function (cars) { return _this.cars = cars; });
    };
    DataScrollerLoaderDemo.prototype.selectCar = function (car) {
        this.selectedCar = car;
        this.displayDialog = true;
    };
    DataScrollerLoaderDemo.prototype.onDialogHide = function () {
        this.selectedCar = null;
    };
    DataScrollerLoaderDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datascroller/datascrollerloaderdemo.html',
            directives: [datascroller_1.DataScroller, header_1.Header, footer_1.Footer, dialog_1.Dialog, panel_1.Panel, datascrollersubmenu_1.DataScrollerSubMenu, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService],
            styles: ["\n        .ui-grid-row > div {\n            padding: 4px 10px;\n            font-size: 20px;\n        }\n        \n        .ui-grid-row .ui-grid-row > div:last-child {\n            font-weight: bold;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataScrollerLoaderDemo);
    return DataScrollerLoaderDemo;
}());
exports.DataScrollerLoaderDemo = DataScrollerLoaderDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXNjcm9sbGVyL2RhdGFzY3JvbGxlcmxvYWRlcmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQyxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsNkJBQTJCLCtDQUErQyxDQUFDLENBQUE7QUFDM0UsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFDdEQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFFOUQsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFDakQsb0NBQWtDLHVCQUF1QixDQUFDLENBQUE7QUFpQjFEO0lBUUksZ0NBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLHlDQUFRLEdBQVI7UUFBQSxpQkFFQztRQURHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsMENBQVMsR0FBVCxVQUFVLEdBQVE7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQsNkNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFwQ0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHdEQUF3RDtZQUNyRSxVQUFVLEVBQUUsQ0FBQywyQkFBWSxFQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsZUFBTSxFQUFDLGFBQUssRUFBQyx5Q0FBbUIsRUFBQyxlQUFNLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7WUFDbkksU0FBUyxFQUFFLENBQUMscUJBQWMsRUFBQyx1QkFBVSxDQUFDO1lBQ3RDLE1BQU0sRUFBRSxDQUFDLDBOQVNSLENBQUM7U0FDTCxDQUFDOzs4QkFBQTtJQXVCRiw2QkFBQztBQUFELENBdEJBLEFBc0JDLElBQUE7QUF0QlksOEJBQXNCLHlCQXNCbEMsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2RhdGFzY3JvbGxlci9kYXRhc2Nyb2xsZXJsb2FkZXJkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9ICAgIGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0IHtEYXRhU2Nyb2xsZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZGF0YXNjcm9sbGVyL2RhdGFzY3JvbGxlcic7XG5pbXBvcnQge0hlYWRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb24vaGVhZGVyJztcbmltcG9ydCB7Rm9vdGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbi9mb290ZXInO1xuaW1wb3J0IHtQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9wYW5lbC9wYW5lbCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7RGlhbG9nfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0Nhcn0gZnJvbSAnLi4vZG9tYWluL2Nhcic7XG5pbXBvcnQge0NhclNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvY2Fyc2VydmljZSc7XG5pbXBvcnQge0RhdGFTY3JvbGxlclN1Yk1lbnV9IGZyb20gJy4vZGF0YXNjcm9sbGVyc3VibWVudSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9kYXRhc2Nyb2xsZXIvZGF0YXNjcm9sbGVybG9hZGVyZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbRGF0YVNjcm9sbGVyLEhlYWRlcixGb290ZXIsRGlhbG9nLFBhbmVsLERhdGFTY3JvbGxlclN1Yk1lbnUsQnV0dG9uLFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBwcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSUyxDYXJTZXJ2aWNlXSxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC51aS1ncmlkLXJvdyA+IGRpdiB7XG4gICAgICAgICAgICBwYWRkaW5nOiA0cHggMTBweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLnVpLWdyaWQtcm93IC51aS1ncmlkLXJvdyA+IGRpdjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVNjcm9sbGVyTG9hZGVyRGVtbyBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjYXJzOiBDYXJbXTtcbiAgICBcbiAgICBzZWxlY3RlZENhcjogQ2FyO1xuICAgIFxuICAgIGRpc3BsYXlEaWFsb2c6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhclNlcnZpY2U6IENhclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzTWVkaXVtKCkudGhlbihjYXJzID0+IHRoaXMuY2FycyA9IGNhcnMpO1xuICAgIH1cbiAgICBcbiAgICBzZWxlY3RDYXIoY2FyOiBDYXIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhciA9IGNhcjtcbiAgICAgICAgdGhpcy5kaXNwbGF5RGlhbG9nID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgb25EaWFsb2dIaWRlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyID0gbnVsbDtcbiAgICB9XG59Il19
