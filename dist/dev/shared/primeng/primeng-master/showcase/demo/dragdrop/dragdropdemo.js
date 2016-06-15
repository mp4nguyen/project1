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
var draggable_1 = require('../../../components/dragdrop/draggable');
var droppable_1 = require('../../../components/dragdrop/droppable');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var panel_1 = require('../../../components/panel/panel');
var column_1 = require('../../../components/column/column');
var datatable_1 = require('../../../components/datatable/datatable');
var carservice_1 = require('../service/carservice');
var router_deprecated_1 = require('angular2/router-deprecated');
var http_1 = require('angular2/http');
var DragDropDemo = (function () {
    function DragDropDemo(carService) {
        this.carService = carService;
    }
    DragDropDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedCars = [];
        this.carService.getCarsSmall().then(function (cars) { return _this.availableCars = cars; });
    };
    DragDropDemo.prototype.dragStart = function (event, car) {
        this.draggedCar = car;
    };
    DragDropDemo.prototype.drop = function (event) {
        if (this.draggedCar) {
            this.selectedCars.push(this.draggedCar);
            this.availableCars.splice(this.findIndex(this.draggedCar), 1);
            this.draggedCar = null;
        }
    };
    DragDropDemo.prototype.dragEnd = function (event) {
        this.draggedCar = null;
    };
    DragDropDemo.prototype.findIndex = function (car) {
        var index = -1;
        for (var i = 0; i < this.availableCars.length; i++) {
            if (car.vin === this.availableCars[i].vin) {
                index = i;
                break;
            }
        }
        return index;
    };
    DragDropDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/dragdrop/dragdropdemo.html',
            directives: [draggable_1.Draggable, droppable_1.Droppable, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, panel_1.Panel, column_1.Column, datatable_1.DataTable, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            styles: ["\n        .ui-grid li {\n            list-style-type: none;\n            padding: 10px;\n            margin-bottom: 5px;\n        }\n    "],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DragDropDemo);
    return DragDropDemo;
}());
exports.DragDropDemo = DragDropDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZHJhZ2Ryb3AvZHJhZ2Ryb3BkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsMEJBQXdCLHdDQUF3QyxDQUFDLENBQUE7QUFDakUsMEJBQXdCLHdDQUF3QyxDQUFDLENBQUE7QUFDakUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFFdEQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsMEJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFDbEUsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFDakQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFDN0QscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBY2hEO0lBUUksc0JBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBSSxDQUFDO0lBRS9DLCtCQUFRLEdBQVI7UUFBQSxpQkFHQztRQUZHLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEVBQXpCLENBQXlCLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsZ0NBQVMsR0FBVCxVQUFVLEtBQUssRUFBQyxHQUFRO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFFRCwyQkFBSSxHQUFKLFVBQUssS0FBSztRQUNOLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELGdDQUFTLEdBQVQsVUFBVSxHQUFRO1FBQ2QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDZixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ1YsS0FBSyxDQUFDO1lBQ1YsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFwREw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxVQUFVLEVBQUUsQ0FBQyxxQkFBUyxFQUFDLHFCQUFTLEVBQUMsZUFBTSxFQUFDLGlCQUFPLEVBQUMsbUJBQVEsRUFBQyxhQUFLLEVBQUMsZUFBTSxFQUFDLHFCQUFTLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztZQUNsSCxNQUFNLEVBQUUsQ0FBQywySUFNUixDQUFDO1lBQ0YsU0FBUyxFQUFFLENBQUMscUJBQWMsRUFBQyx1QkFBVSxDQUFDO1NBQ3pDLENBQUM7O29CQUFBO0lBMkNGLG1CQUFDO0FBQUQsQ0ExQ0EsQUEwQ0MsSUFBQTtBQTFDWSxvQkFBWSxlQTBDeEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2RyYWdkcm9wL2RyYWdkcm9wZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7RHJhZ2dhYmxlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RyYWdkcm9wL2RyYWdnYWJsZSc7XG5pbXBvcnQge0Ryb3BwYWJsZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kcmFnZHJvcC9kcm9wcGFibGUnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7UGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwnO1xuaW1wb3J0IHtDYXJ9IGZyb20gJy4uL2RvbWFpbi9jYXInO1xuaW1wb3J0IHtDb2x1bW59IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29sdW1uL2NvbHVtbic7XG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhdGFibGUvZGF0YXRhYmxlJztcbmltcG9ydCB7Q2FyU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9jYXJzZXJ2aWNlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9ICAgIGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vZHJhZ2Ryb3AvZHJhZ2Ryb3BkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtEcmFnZ2FibGUsRHJvcHBhYmxlLEJ1dHRvbixUYWJWaWV3LFRhYlBhbmVsLFBhbmVsLENvbHVtbixEYXRhVGFibGUsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC51aS1ncmlkIGxpIHtcbiAgICAgICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBwcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSUyxDYXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEcmFnRHJvcERlbW8ge1xuICAgIFxuICAgIGF2YWlsYWJsZUNhcnM6IENhcltdO1xuICAgIFxuICAgIHNlbGVjdGVkQ2FyczogQ2FyW107XG4gICAgXG4gICAgZHJhZ2dlZENhcjogQ2FyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FyU2VydmljZTogQ2FyU2VydmljZSkgeyB9XG4gICAgXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXJzID0gW107XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzU21hbGwoKS50aGVuKGNhcnMgPT4gdGhpcy5hdmFpbGFibGVDYXJzID0gY2Fycyk7XG4gICAgfVxuICAgIFxuICAgIGRyYWdTdGFydChldmVudCxjYXI6IENhcikge1xuICAgICAgICB0aGlzLmRyYWdnZWRDYXIgPSBjYXI7XG4gICAgfVxuICAgIFxuICAgIGRyb3AoZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy5kcmFnZ2VkQ2FyKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2Fycy5wdXNoKHRoaXMuZHJhZ2dlZENhcik7XG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUNhcnMuc3BsaWNlKHRoaXMuZmluZEluZGV4KHRoaXMuZHJhZ2dlZENhciksIDEpO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2VkQ2FyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBkcmFnRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHJhZ2dlZENhciA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGZpbmRJbmRleChjYXI6IENhcikge1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYXZhaWxhYmxlQ2Fycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoY2FyLnZpbiA9PT0gdGhpcy5hdmFpbGFibGVDYXJzW2ldLnZpbikge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG59Il19
