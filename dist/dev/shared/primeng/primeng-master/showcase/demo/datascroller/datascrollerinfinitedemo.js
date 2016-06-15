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
var growl_1 = require('../../../components/growl/growl');
var button_1 = require('../../../components/button/button');
var dialog_1 = require('../../../components/dialog/dialog');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var carservice_1 = require('../service/carservice');
var datascrollersubmenu_1 = require('./datascrollersubmenu');
var DataScrollerInfiniteDemo = (function () {
    function DataScrollerInfiniteDemo(carService) {
        this.carService = carService;
        this.msgs = [];
    }
    DataScrollerInfiniteDemo.prototype.loadData = function (event) {
        var _this = this;
        if (!this.cars) {
            this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
        }
        else {
            var newArray = this.cars.slice(0);
            for (var i = 0; i < newArray.length; i++) {
                this.cars.push(newArray[i]);
            }
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: 'Data Loaded', detail: 'Between ' + event.first + ' and ' + (event.first + event.rows) });
        }
    };
    DataScrollerInfiniteDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datascroller/datascrollerinfinitedemo.html',
            directives: [datascroller_1.DataScroller, header_1.Header, footer_1.Footer, dialog_1.Dialog, growl_1.Growl, datascrollersubmenu_1.DataScrollerSubMenu, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService],
            styles: ["\n        .ui-grid-row > div {\n            padding: 4px 10px;\n            font-size: 20px;\n        }\n        \n        .ui-grid-row .ui-grid-row > div:last-child {\n            font-weight: bold;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataScrollerInfiniteDemo);
    return DataScrollerInfiniteDemo;
}());
exports.DataScrollerInfiniteDemo = DataScrollerInfiniteDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXNjcm9sbGVyL2RhdGFzY3JvbGxlcmluZmluaXRlZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBQzdELHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCw2QkFBMkIsK0NBQStDLENBQUMsQ0FBQTtBQUMzRSx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCxzQkFBb0IsaUNBQWlDLENBQUMsQ0FBQTtBQUN0RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUU5RCwyQkFBeUIsdUJBQXVCLENBQUMsQ0FBQTtBQUNqRCxvQ0FBa0MsdUJBQXVCLENBQUMsQ0FBQTtBQWtCMUQ7SUFNSSxrQ0FBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUYxQyxTQUFJLEdBQWMsRUFBRSxDQUFDO0lBRXlCLENBQUM7SUFFL0MsMkNBQVEsR0FBUixVQUFTLEtBQUs7UUFBZCxpQkFjQztRQVpHLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUVELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsYUFBYSxFQUFFLE1BQU0sRUFBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDckksQ0FBQztJQUNMLENBQUM7SUFyQ0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDBEQUEwRDtZQUN2RSxVQUFVLEVBQUUsQ0FBQywyQkFBWSxFQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsZUFBTSxFQUFDLGFBQUssRUFBQyx5Q0FBbUIsRUFBQyxlQUFNLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7WUFDbkksU0FBUyxFQUFFLENBQUMscUJBQWMsRUFBQyx1QkFBVSxDQUFDO1lBQ3RDLE1BQU0sRUFBRSxDQUFDLDBOQVNSLENBQUM7U0FDTCxDQUFDOztnQ0FBQTtJQXdCRiwrQkFBQztBQUFELENBdkJBLEFBdUJDLElBQUE7QUF2QlksZ0NBQXdCLDJCQXVCcEMsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2RhdGFzY3JvbGxlci9kYXRhc2Nyb2xsZXJpbmZpbml0ZWRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gICAgZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge0RhdGFTY3JvbGxlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhc2Nyb2xsZXIvZGF0YXNjcm9sbGVyJztcbmltcG9ydCB7SGVhZGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbi9oZWFkZXInO1xuaW1wb3J0IHtGb290ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2Zvb3Rlcic7XG5pbXBvcnQge0dyb3dsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2dyb3dsL2dyb3dsJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtEaWFsb2d9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZyc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Q2FyfSBmcm9tICcuLi9kb21haW4vY2FyJztcbmltcG9ydCB7Q2FyU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9jYXJzZXJ2aWNlJztcbmltcG9ydCB7RGF0YVNjcm9sbGVyU3ViTWVudX0gZnJvbSAnLi9kYXRhc2Nyb2xsZXJzdWJtZW51JztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVzc2FnZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9kYXRhc2Nyb2xsZXIvZGF0YXNjcm9sbGVyaW5maW5pdGVkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtEYXRhU2Nyb2xsZXIsSGVhZGVyLEZvb3RlcixEaWFsb2csR3Jvd2wsRGF0YVNjcm9sbGVyU3ViTWVudSxCdXR0b24sVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHByb3ZpZGVyczogW0hUVFBfUFJPVklERVJTLENhclNlcnZpY2VdLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLnVpLWdyaWQtcm93ID4gZGl2IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDRweCAxMHB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAudWktZ3JpZC1yb3cgLnVpLWdyaWQtcm93ID4gZGl2Omxhc3QtY2hpbGQge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhU2Nyb2xsZXJJbmZpbml0ZURlbW8ge1xuXG4gICAgY2FyczogQ2FyW107XG4gICAgXG4gICAgbXNnczogTWVzc2FnZVtdID0gW107XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJTZXJ2aWNlOiBDYXJTZXJ2aWNlKSB7IH1cbiAgICBcbiAgICBsb2FkRGF0YShldmVudCnCoHtcbiAgICAgICAgLy9pbml0aWFsaXplXG4gICAgICAgIGlmKCF0aGlzLmNhcnMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzU21hbGwoKS50aGVuKGNhcnMgPT4gdGhpcy5jYXJzID0gY2Fycyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9pbiByZWFsIGFwcGxpY2F0aW9uLCBuZXdBcnJheSBzaG91bGQgYmUgbG9hZGVkIGZyb20gYSByZW1vdGUgZGF0YXNvdXJjZVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXdBcnJheSA9IHRoaXMuY2Fycy5zbGljZSgwKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBuZXdBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2Fycy5wdXNoKG5ld0FycmF5W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OidpbmZvJywgc3VtbWFyeTonRGF0YSBMb2FkZWQnLCBkZXRhaWw6J0JldHdlZW4gJyArIGV2ZW50LmZpcnN0ICsgJyBhbmQgJyArIChldmVudC5maXJzdCArIGV2ZW50LnJvd3MpfSk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cbn0iXX0=
