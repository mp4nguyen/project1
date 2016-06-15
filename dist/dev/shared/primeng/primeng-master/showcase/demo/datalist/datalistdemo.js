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
var datalist_1 = require('../../../components/datalist/datalist');
var header_1 = require('../../../components/common/header');
var footer_1 = require('../../../components/common/footer');
var panel_1 = require('../../../components/panel/panel');
var button_1 = require('../../../components/button/button');
var dialog_1 = require('../../../components/dialog/dialog');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var carservice_1 = require('../service/carservice');
var DataListDemo = (function () {
    function DataListDemo(carService) {
        this.carService = carService;
    }
    DataListDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsLarge().then(function (cars) { return _this.cars = cars; });
    };
    DataListDemo.prototype.selectCar = function (car) {
        this.selectedCar = car;
        this.displayDialog = true;
    };
    DataListDemo.prototype.onDialogHide = function () {
        this.selectedCar = null;
    };
    DataListDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datalist/datalistdemo.html',
            directives: [datalist_1.DataList, header_1.Header, footer_1.Footer, dialog_1.Dialog, panel_1.Panel, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService],
            styles: ["\n        .ui-grid-row > div {\n            padding: 4px 10px;\n            font-size: 20px;\n        }\n        \n        .ui-grid-row .ui-grid-row > div:last-child {\n            font-weight: bold;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataListDemo);
    return DataListDemo;
}());
exports.DataListDemo = DataListDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YWxpc3QvZGF0YWxpc3RkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0Msa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFDN0QscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHNCQUFvQixpQ0FBaUMsQ0FBQyxDQUFBO0FBQ3RELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBRTlELDJCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBaUJqRDtJQVFJLHNCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUksQ0FBQztJQUUvQywrQkFBUSxHQUFSO1FBQUEsaUJBRUM7UUFERyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFoQixDQUFnQixDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELGdDQUFTLEdBQVQsVUFBVSxHQUFRO1FBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVELG1DQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBcENMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsVUFBVSxFQUFFLENBQUMsbUJBQVEsRUFBQyxlQUFNLEVBQUMsZUFBTSxFQUFDLGVBQU0sRUFBQyxhQUFLLEVBQUMsZUFBTSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1lBQzNHLFNBQVMsRUFBRSxDQUFDLHFCQUFjLEVBQUMsdUJBQVUsQ0FBQztZQUN0QyxNQUFNLEVBQUUsQ0FBQywwTkFTUixDQUFDO1NBQ0wsQ0FBQzs7b0JBQUE7SUF1QkYsbUJBQUM7QUFBRCxDQXRCQSxBQXNCQyxJQUFBO0FBdEJZLG9CQUFZLGVBc0J4QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YWxpc3QvZGF0YWxpc3RkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9ICAgIGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0IHtEYXRhTGlzdH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhbGlzdC9kYXRhbGlzdCc7XG5pbXBvcnQge0hlYWRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb24vaGVhZGVyJztcbmltcG9ydCB7Rm9vdGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbi9mb290ZXInO1xuaW1wb3J0IHtQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9wYW5lbC9wYW5lbCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7RGlhbG9nfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0Nhcn0gZnJvbSAnLi4vZG9tYWluL2Nhcic7XG5pbXBvcnQge0NhclNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvY2Fyc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9kYXRhbGlzdC9kYXRhbGlzdGRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0RhdGFMaXN0LEhlYWRlcixGb290ZXIsRGlhbG9nLFBhbmVsLEJ1dHRvbixUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU10sXG4gICAgcHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlMsQ2FyU2VydmljZV0sXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAudWktZ3JpZC1yb3cgPiBkaXYge1xuICAgICAgICAgICAgcGFkZGluZzogNHB4IDEwcHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC51aS1ncmlkLXJvdyAudWktZ3JpZC1yb3cgPiBkaXY6bGFzdC1jaGlsZCB7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFMaXN0RGVtbyBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjYXJzOiBDYXJbXTtcbiAgICBcbiAgICBzZWxlY3RlZENhcjogQ2FyO1xuICAgIFxuICAgIGRpc3BsYXlEaWFsb2c6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhclNlcnZpY2U6IENhclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzTGFyZ2UoKS50aGVuKGNhcnMgPT4gdGhpcy5jYXJzID0gY2Fycyk7XG4gICAgfVxuICAgIFxuICAgIHNlbGVjdENhcihjYXI6IENhcikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyID0gY2FyO1xuICAgICAgICB0aGlzLmRpc3BsYXlEaWFsb2cgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBvbkRpYWxvZ0hpZGUoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXIgPSBudWxsO1xuICAgIH1cbn0iXX0=
