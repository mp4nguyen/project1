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
var carousel_1 = require('../../../components/carousel/carousel');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var growl_1 = require('../../../components/growl/growl');
var router_deprecated_1 = require('angular2/router-deprecated');
var CarouselDemo = (function () {
    function CarouselDemo() {
        this.msgs = [];
        this.cars = [
            { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
            { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
            { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
            { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
            { vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
            { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
            { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
            { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
            { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
        ];
    }
    CarouselDemo.prototype.selectCar = function (car) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Car Selected', detail: 'Vin:' + car.vin });
    };
    CarouselDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/carousel/carouseldemo.html',
            directives: [carousel_1.Carousel, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, growl_1.Growl, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            styles: ["\n        .ui-grid-row {\n            text-align: center;\n        }\n\n        .ui-grid {\n            margin: 10px 0px;\n        }\n\n        .ui-grid-row > div {\n            padding: 4px 10px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], CarouselDemo);
    return CarouselDemo;
}());
exports.CarouselDemo = CarouselDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2Fyb3VzZWwvY2Fyb3VzZWxkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0QsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFFdEQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFvQjdEO0lBTUk7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDUixFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7WUFDM0QsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDO1lBQzFELEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztZQUMzRCxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7WUFDOUQsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDO1lBQ3ZELEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztZQUM1RCxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUM7WUFDNUQsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDO1lBQy9ELEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQztTQUM5RCxDQUFDO0lBQ04sQ0FBQztJQUVELGdDQUFTLEdBQVQsVUFBVSxHQUFRO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUF6Q0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxVQUFVLEVBQUUsQ0FBQyxtQkFBUSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxlQUFNLEVBQUMsYUFBSyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7WUFDdEYsTUFBTSxFQUFFLENBQUMsdU5BWVIsQ0FBQztTQUNMLENBQUM7O29CQUFBO0lBMEJGLG1CQUFDO0FBQUQsQ0F6QkEsQUF5QkMsSUFBQTtBQXpCWSxvQkFBWSxlQXlCeEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2Nhcm91c2VsL2Nhcm91c2VsZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q2Fyb3VzZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7R3Jvd2x9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZ3Jvd2wvZ3Jvd2wnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9tZXNzYWdlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7Q2FyfSBmcm9tICcuLi9kb21haW4vY2FyJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2Nhcm91c2VsL2Nhcm91c2VsZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbQ2Fyb3VzZWwsVGFiUGFuZWwsVGFiVmlldyxCdXR0b24sR3Jvd2wsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC51aS1ncmlkLXJvdyB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAudWktZ3JpZCB7XG4gICAgICAgICAgICBtYXJnaW46IDEwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnVpLWdyaWQtcm93ID4gZGl2IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDRweCAxMHB4O1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxEZW1vIHtcblxuICAgIGNhcnM6IENhcltdO1xuXG4gICAgbXNnczogTWVzc2FnZVtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLmNhcnMgPSBbXG4gICAgICAgICAgICB7dmluOiAncjMyNzhyMicsIHllYXI6IDIwMTAsIGJyYW5kOiAnQXVkaScsIGNvbG9yOiAnQmxhY2snfSxcbiAgICAgICAgICAgIHt2aW46ICdqaHRvMmcyJywgeWVhcjogMjAxNSwgYnJhbmQ6ICdCTVcnLCBjb2xvcjogJ1doaXRlJ30sXG4gICAgICAgICAgICB7dmluOiAnaDQ1M3c1NCcsIHllYXI6IDIwMTIsIGJyYW5kOiAnSG9uZGEnLCBjb2xvcjogJ0JsdWUnfSxcbiAgICAgICAgICAgIHt2aW46ICdnNDNnd3dnJywgeWVhcjogMTk5OCwgYnJhbmQ6ICdSZW5hdWx0JywgY29sb3I6ICdXaGl0ZSd9LFxuICAgICAgICAgICAge3ZpbjogJ2dmNDV3ZzUnLCB5ZWFyOiAyMDExLCBicmFuZDogJ1ZXJywgY29sb3I6ICdSZWQnfSxcbiAgICAgICAgICAgIHt2aW46ICdiaHY1eTV3JywgeWVhcjogMjAxNSwgYnJhbmQ6ICdKYWd1YXInLCBjb2xvcjogJ0JsdWUnfSxcbiAgICAgICAgICAgIHt2aW46ICd5Ync1ZnNkJywgeWVhcjogMjAxMiwgYnJhbmQ6ICdGb3JkJywgY29sb3I6ICdZZWxsb3cnfSxcbiAgICAgICAgICAgIHt2aW46ICc0NTY2NWU1JywgeWVhcjogMjAxMSwgYnJhbmQ6ICdNZXJjZWRlcycsIGNvbG9yOiAnQnJvd24nfSxcbiAgICAgICAgICAgIHt2aW46ICdoZTZzYjV2JywgeWVhcjogMjAxNSwgYnJhbmQ6ICdGb3JkJywgY29sb3I6ICdCbGFjayd9XG4gICAgICAgIF07XG4gICAgfVxuICAgICAgICBcbiAgICBzZWxlY3RDYXIoY2FyOiBDYXIpIHtcbiAgICAgICAgdGhpcy5tc2dzID0gW107XG4gICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTogJ2luZm8nLCBzdW1tYXJ5OiAnQ2FyIFNlbGVjdGVkJywgZGV0YWlsOiAnVmluOicgKyBjYXIudmlufSk7XG4gICAgfVxufSJdfQ==
