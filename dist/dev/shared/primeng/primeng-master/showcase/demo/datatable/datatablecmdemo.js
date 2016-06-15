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
var contextmenu_1 = require('../../../components/contextmenu/contextmenu');
var DataTableCMDemo = (function () {
    function DataTableCMDemo(carService) {
        this.carService = carService;
    }
    DataTableCMDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
        this.items = [
            { label: 'View', icon: 'fa-search', command: function (event) { return _this.viewCar(_this.selectedCar); } },
            { label: 'Delete', icon: 'fa-close', command: function (event) { return _this.deleteCar(_this.selectedCar); } }
        ];
    };
    DataTableCMDemo.prototype.viewCar = function (car) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Selected', detail: car.vin + ' - ' + car.brand });
    };
    DataTableCMDemo.prototype.deleteCar = function (car) {
        var index = -1;
        for (var i = 0; i < this.cars.length; i++) {
            if (this.cars[i].vin == car.vin) {
                index = i;
                break;
            }
        }
        this.cars.splice(index, 1);
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Deleted', detail: car.vin + ' - ' + car.brand });
    };
    DataTableCMDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablecmdemo.html',
            directives: [datatable_1.DataTable, column_1.Column, header_1.Header, footer_1.Footer, growl_1.Growl, contextmenu_1.ContextMenu, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableCMDemo);
    return DataTableCMDemo;
}());
exports.DataTableCMDemo = DataTableCMDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWNtZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBQzdELHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCwwQkFBd0IseUNBQXlDLENBQUMsQ0FBQTtBQUNsRSxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUU5RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCwyQ0FBK0IsOEJBQThCLENBQUMsQ0FBQTtBQUM5RCwyQkFBeUIsdUJBQXVCLENBQUMsQ0FBQTtBQUNqRCxzQkFBb0IsaUNBQWlDLENBQUMsQ0FBQTtBQUN0RCw0QkFBMEIsNkNBQTZDLENBQUMsQ0FBQTtBQVN4RTtJQVVJLHlCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUksQ0FBQztJQUUvQyxrQ0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUE5QixDQUE4QixFQUFDO1lBQ3RGLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFoQyxDQUFnQyxFQUFDO1NBQzVGLENBQUM7SUFDTixDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLEdBQVE7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQsbUNBQVMsR0FBVCxVQUFVLEdBQVE7UUFDZCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNmLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDVixLQUFLLENBQUM7WUFDVixDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBM0NMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSw4Q0FBOEM7WUFDM0QsVUFBVSxFQUFFLENBQUMscUJBQVMsRUFBQyxlQUFNLEVBQUMsZUFBTSxFQUFDLGVBQU0sRUFBQyxhQUFLLEVBQUMseUJBQVcsRUFBQyw2Q0FBZ0IsRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztZQUNsSSxTQUFTLEVBQUUsQ0FBQyxxQkFBYyxFQUFDLHVCQUFVLENBQUM7U0FDekMsQ0FBQzs7dUJBQUE7SUF3Q0Ysc0JBQUM7QUFBRCxDQXZDQSxBQXVDQyxJQUFBO0FBdkNZLHVCQUFlLGtCQXVDM0IsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2RhdGF0YWJsZS9kYXRhdGFibGVjbWRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gICAgZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhdGFibGUvZGF0YXRhYmxlJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtDYXJ9IGZyb20gJy4uL2RvbWFpbi9jYXInO1xuaW1wb3J0IHtDb2x1bW59IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29sdW1uL2NvbHVtbic7XG5pbXBvcnQge0hlYWRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb24vaGVhZGVyJztcbmltcG9ydCB7Rm9vdGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbi9mb290ZXInO1xuaW1wb3J0IHtEYXRhVGFibGVTdWJtZW51fSBmcm9tICcuL2RhdGF0YWJsZXN1Ym1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7Q2FyU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9jYXJzZXJ2aWNlJztcbmltcG9ydCB7R3Jvd2x9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZ3Jvd2wvZ3Jvd2wnO1xuaW1wb3J0IHtDb250ZXh0TWVudX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb250ZXh0bWVudS9jb250ZXh0bWVudSc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL21lc3NhZ2UnO1xuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVudW1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2RhdGF0YWJsZS9kYXRhdGFibGVjbWRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0RhdGFUYWJsZSxDb2x1bW4sSGVhZGVyLEZvb3RlcixHcm93bCxDb250ZXh0TWVudSxEYXRhVGFibGVTdWJtZW51LFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBwcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSUyxDYXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVDTURlbW8gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgbXNnczogTWVzc2FnZVtdO1xuXG4gICAgY2FyczogQ2FyW107XG5cbiAgICBzZWxlY3RlZENhcjogQ2FyO1xuICAgIFxuICAgIGl0ZW1zOiBNZW51SXRlbVtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJTZXJ2aWNlOiBDYXJTZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNhclNlcnZpY2UuZ2V0Q2Fyc1NtYWxsKCkudGhlbihjYXJzID0+IHRoaXMuY2FycyA9IGNhcnMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtcbiAgICAgICAgICAgIHtsYWJlbDogJ1ZpZXcnLCBpY29uOiAnZmEtc2VhcmNoJywgY29tbWFuZDogKGV2ZW50KSA9PiB0aGlzLnZpZXdDYXIodGhpcy5zZWxlY3RlZENhcil9LFxuICAgICAgICAgICAge2xhYmVsOiAnRGVsZXRlJywgaWNvbjogJ2ZhLWNsb3NlJywgY29tbWFuZDogKGV2ZW50KSA9PiB0aGlzLmRlbGV0ZUNhcih0aGlzLnNlbGVjdGVkQ2FyKX1cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICB2aWV3Q2FyKGNhcjogQ2FyKSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6ICdpbmZvJywgc3VtbWFyeTogJ0NhciBTZWxlY3RlZCcsIGRldGFpbDogY2FyLnZpbiArICcgLSAnICsgY2FyLmJyYW5kfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQ2FyKGNhcjogQ2FyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLmNhcnNbaV0udmluID09IGNhci52aW4pIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OiAnaW5mbycsIHN1bW1hcnk6ICdDYXIgRGVsZXRlZCcsIGRldGFpbDogY2FyLnZpbiArICcgLSAnICsgY2FyLmJyYW5kfSk7XG4gICAgfVxufSJdfQ==
