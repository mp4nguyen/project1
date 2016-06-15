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
var orderlist_1 = require('../../../components/orderlist/orderlist');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var carservice_1 = require('../service/carservice');
var OrderListDemo = (function () {
    function OrderListDemo(carService) {
        this.carService = carService;
    }
    OrderListDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
    };
    OrderListDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/orderlist/orderlistdemo.html',
            directives: [orderlist_1.OrderList, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], OrderListDemo);
    return OrderListDemo;
}());
exports.OrderListDemo = OrderListDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vb3JkZXJsaXN0L29yZGVybGlzdGRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QyxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsMEJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFDbEUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFFekQsMkJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFPakQ7SUFJSSx1QkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFJLENBQUM7SUFFL0MsZ0NBQVEsR0FBUjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFiTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsNENBQTRDO1lBQ3pELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGVBQU0sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1lBQ2pGLFNBQVMsRUFBRSxDQUFDLHFCQUFjLEVBQUMsdUJBQVUsQ0FBQztTQUN6QyxDQUFDOztxQkFBQTtJQVVGLG9CQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSxxQkFBYSxnQkFTekIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL29yZGVybGlzdC9vcmRlcmxpc3RkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gICAgZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge09yZGVyTGlzdH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9vcmRlcmxpc3Qvb3JkZXJsaXN0JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge0Nhcn0gZnJvbSAnLi4vZG9tYWluL2Nhcic7XG5pbXBvcnQge0NhclNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvY2Fyc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9vcmRlcmxpc3Qvb3JkZXJsaXN0ZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbT3JkZXJMaXN0LFRhYlBhbmVsLFRhYlZpZXcsQnV0dG9uLENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU10sXG4gICAgcHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlMsQ2FyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJMaXN0RGVtbyB7XG5cbiAgICBjYXJzOiBDYXJbXTtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhclNlcnZpY2U6IENhclNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzU21hbGwoKS50aGVuKGNhcnMgPT4gdGhpcy5jYXJzID0gY2Fycyk7XG4gICAgfVxufSJdfQ==
