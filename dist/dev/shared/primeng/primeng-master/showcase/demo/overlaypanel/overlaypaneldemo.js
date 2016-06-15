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
var overlaypanel_1 = require('../../../components/overlaypanel/overlaypanel');
var button_1 = require('../../../components/button/button');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var datatable_1 = require('../../../components/datatable/datatable');
var column_1 = require('../../../components/column/column');
var carservice_1 = require('../service/carservice');
var router_deprecated_1 = require('angular2/router-deprecated');
var http_1 = require('angular2/http');
var OverlayPanelDemo = (function () {
    function OverlayPanelDemo(carService) {
        this.carService = carService;
    }
    OverlayPanelDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars1 = cars; });
        this.carService.getCarsSmall().then(function (cars) { return _this.cars2 = cars; });
    };
    OverlayPanelDemo.prototype.selectCar = function (event, car, overlaypanel) {
        this.selectedCar = car;
        overlaypanel.toggle(event);
    };
    OverlayPanelDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/overlaypanel/overlaypaneldemo.html',
            directives: [overlaypanel_1.OverlayPanel, datatable_1.DataTable, column_1.Column, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], OverlayPanelDemo);
    return OverlayPanelDemo;
}());
exports.OverlayPanelDemo = OverlayPanelDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vb3ZlcmxheXBhbmVsL292ZXJsYXlwYW5lbGRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyw2QkFBMkIsK0NBQStDLENBQUMsQ0FBQTtBQUMzRSx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCwwQkFBd0IseUNBQXlDLENBQUMsQ0FBQTtBQUVsRSx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCwyQkFBeUIsdUJBQXVCLENBQUMsQ0FBQTtBQUNqRCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFPaEQ7SUFRSSwwQkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFJLENBQUM7SUFFL0MsbUNBQVEsR0FBUjtRQUFBLGlCQUdDO1FBRkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLEtBQUssRUFBQyxHQUFRLEVBQUUsWUFBMEI7UUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBdkJMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSxrREFBa0Q7WUFDL0QsVUFBVSxFQUFFLENBQUMsMkJBQVksRUFBQyxxQkFBUyxFQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsaUJBQU8sRUFBQyxtQkFBUSxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7WUFDckcsU0FBUyxFQUFFLENBQUMscUJBQWMsRUFBQyx1QkFBVSxDQUFDO1NBQ3pDLENBQUM7O3dCQUFBO0lBb0JGLHVCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSx3QkFBZ0IsbUJBbUI1QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vb3ZlcmxheXBhbmVsL292ZXJsYXlwYW5lbGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge092ZXJsYXlQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9vdmVybGF5cGFuZWwvb3ZlcmxheXBhbmVsJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhdGFibGUvZGF0YXRhYmxlJztcbmltcG9ydCB7Q2FyfSBmcm9tICcuLi9kb21haW4vY2FyJztcbmltcG9ydCB7Q29sdW1ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbHVtbi9jb2x1bW4nO1xuaW1wb3J0IHtDYXJTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2NhcnNlcnZpY2UnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gICAgZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9vdmVybGF5cGFuZWwvb3ZlcmxheXBhbmVsZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbT3ZlcmxheVBhbmVsLERhdGFUYWJsZSxDb2x1bW4sQnV0dG9uLFRhYlZpZXcsVGFiUGFuZWwsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBwcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSUyxDYXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5UGFuZWxEZW1vIHtcblxuICAgIGNhcnMxOiBDYXJbXTtcbiAgICBcbiAgICBjYXJzMjogQ2FyW107XG4gICAgXG4gICAgc2VsZWN0ZWRDYXI6IENhcjtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhclNlcnZpY2U6IENhclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzU21hbGwoKS50aGVuKGNhcnMgPT4gdGhpcy5jYXJzMSA9IGNhcnMpO1xuICAgICAgICB0aGlzLmNhclNlcnZpY2UuZ2V0Q2Fyc1NtYWxsKCkudGhlbihjYXJzID0+IHRoaXMuY2FyczIgPSBjYXJzKTtcbiAgICB9XG4gICAgXG4gICAgc2VsZWN0Q2FyKGV2ZW50LGNhcjogQ2FyLCBvdmVybGF5cGFuZWw6IE92ZXJsYXlQYW5lbCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FyID0gY2FyO1xuICAgICAgICBvdmVybGF5cGFuZWwudG9nZ2xlKGV2ZW50KTtcbiAgICB9XG59Il19
