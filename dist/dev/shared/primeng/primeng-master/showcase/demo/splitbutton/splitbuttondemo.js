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
var tabview_1 = require('../../../components/tabview/tabview');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var splitbutton_1 = require('../../../components/splitbutton/splitbutton');
var splitbuttonitem_1 = require('../../../components/splitbutton/splitbuttonitem');
var growl_1 = require('../../../components/growl/growl');
var router_deprecated_1 = require('angular2/router-deprecated');
var SplitButtonDemo = (function () {
    function SplitButtonDemo() {
        this.msgs = [];
    }
    SplitButtonDemo.prototype.save = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Saved' });
    };
    SplitButtonDemo.prototype.update = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Updated' });
    };
    SplitButtonDemo.prototype.delete = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Deleted' });
    };
    SplitButtonDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/splitbutton/splitbuttondemo.html',
            directives: [splitbutton_1.SplitButton, splitbuttonitem_1.SplitButtonItem, growl_1.Growl, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SplitButtonDemo);
    return SplitButtonDemo;
}());
exports.SplitButtonDemo = SplitButtonDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vc3BsaXRidXR0b24vc3BsaXRidXR0b25kZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsNEJBQTBCLDZDQUE2QyxDQUFDLENBQUE7QUFDeEUsZ0NBQThCLGlEQUFpRCxDQUFDLENBQUE7QUFDaEYsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFFdEQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFBQTtRQUVJLFNBQUksR0FBYyxFQUFFLENBQUM7SUFnQnpCLENBQUM7SUFkRyw4QkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLGNBQWMsRUFBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFyQkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLGdEQUFnRDtZQUM3RCxVQUFVLEVBQUUsQ0FBQyx5QkFBVyxFQUFDLGlDQUFlLEVBQUMsYUFBSyxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQ3JHLENBQUM7O3VCQUFBO0lBbUJGLHNCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsSUFBQTtBQWxCWSx1QkFBZSxrQkFrQjNCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9zcGxpdGJ1dHRvbi9zcGxpdGJ1dHRvbmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7U3BsaXRCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc3BsaXRidXR0b24vc3BsaXRidXR0b24nO1xuaW1wb3J0IHtTcGxpdEJ1dHRvbkl0ZW19IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc3BsaXRidXR0b24vc3BsaXRidXR0b25pdGVtJztcbmltcG9ydCB7R3Jvd2x9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZ3Jvd2wvZ3Jvd2wnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9tZXNzYWdlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL3NwbGl0YnV0dG9uL3NwbGl0YnV0dG9uZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbU3BsaXRCdXR0b24sU3BsaXRCdXR0b25JdGVtLEdyb3dsLFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBTcGxpdEJ1dHRvbkRlbW8ge1xuXG4gICAgbXNnczogTWVzc2FnZVtdID0gW107XG5cbiAgICBzYXZlKCkge1xuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OidpbmZvJywgc3VtbWFyeTonU3VjY2VzcycsIGRldGFpbDonRGF0YSBTYXZlZCd9KTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OidpbmZvJywgc3VtbWFyeTonU3VjY2VzcycsIGRldGFpbDonRGF0YSBVcGRhdGVkJ30pO1xuICAgIH1cbiAgICBcbiAgICBkZWxldGUoKSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidTdWNjZXNzJywgZGV0YWlsOidEYXRhIERlbGV0ZWQnfSk7XG4gICAgfVxufVxuIl19
