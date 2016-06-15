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
var panel_1 = require('../../../components/panel/panel');
var splitbutton_1 = require('../../../components/splitbutton/splitbutton');
var splitbuttonitem_1 = require('../../../components/splitbutton/splitbuttonitem');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var growl_1 = require('../../../components/growl/growl');
var router_deprecated_1 = require('angular2/router-deprecated');
var PanelDemo = (function () {
    function PanelDemo() {
        this.msgs = [];
    }
    PanelDemo.prototype.save = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Saved' });
    };
    PanelDemo.prototype.update = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Updated' });
    };
    PanelDemo.prototype.delete = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Deleted' });
    };
    PanelDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/panel/paneldemo.html',
            directives: [panel_1.Panel, tabview_1.TabView, tabpanel_1.TabPanel, growl_1.Growl, codehighlighter_1.CodeHighlighter, splitbutton_1.SplitButton, splitbuttonitem_1.SplitButtonItem, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], PanelDemo);
    return PanelDemo;
}());
exports.PanelDemo = PanelDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vcGFuZWwvcGFuZWxkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFDdEQsNEJBQTBCLDZDQUE2QyxDQUFDLENBQUE7QUFDeEUsZ0NBQThCLGlEQUFpRCxDQUFDLENBQUE7QUFDaEYsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFFOUQsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFDdEQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFBQTtRQUVJLFNBQUksR0FBYyxFQUFFLENBQUM7SUFnQnpCLENBQUM7SUFkRyx3QkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLGNBQWMsRUFBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELDBCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFyQkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxVQUFVLEVBQUUsQ0FBQyxhQUFLLEVBQUMsaUJBQU8sRUFBQyxtQkFBUSxFQUFDLGFBQUssRUFBQyxpQ0FBZSxFQUFDLHlCQUFXLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUMzRyxDQUFDOztpQkFBQTtJQW1CRixnQkFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFsQlksaUJBQVMsWUFrQnJCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9wYW5lbC9wYW5lbGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1BhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3BhbmVsL3BhbmVsJztcbmltcG9ydCB7U3BsaXRCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc3BsaXRidXR0b24vc3BsaXRidXR0b24nO1xuaW1wb3J0IHtTcGxpdEJ1dHRvbkl0ZW19IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc3BsaXRidXR0b24vc3BsaXRidXR0b25pdGVtJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9tZXNzYWdlJztcbmltcG9ydCB7R3Jvd2x9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZ3Jvd2wvZ3Jvd2wnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vcGFuZWwvcGFuZWxkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtQYW5lbCxUYWJWaWV3LFRhYlBhbmVsLEdyb3dsLENvZGVIaWdobGlnaHRlcixTcGxpdEJ1dHRvbixTcGxpdEJ1dHRvbkl0ZW0sUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsRGVtbyB7XG5cbiAgICBtc2dzOiBNZXNzYWdlW10gPSBbXTtcblxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidTdWNjZXNzJywgZGV0YWlsOidEYXRhIFNhdmVkJ30pO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5tc2dzID0gW107XG4gICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTonaW5mbycsIHN1bW1hcnk6J1N1Y2Nlc3MnLCBkZXRhaWw6J0RhdGEgVXBkYXRlZCd9KTtcbiAgICB9XG5cbiAgICBkZWxldGUoKSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidTdWNjZXNzJywgZGV0YWlsOidEYXRhIERlbGV0ZWQnfSk7XG4gICAgfVxufSJdfQ==
