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
var messages_1 = require('../../../components/messages/messages');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var progressbar_1 = require('../../../components/progressbar/progressbar');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var growl_1 = require('../../../components/growl/growl');
var router_deprecated_1 = require('angular2/router-deprecated');
var ProgressBarDemo = (function () {
    function ProgressBarDemo() {
        this.value = 0;
    }
    ProgressBarDemo.prototype.ngOnInit = function () {
        var _this = this;
        var interval = setInterval(function () {
            _this.value = _this.value + Math.floor(Math.random() * 10) + 1;
            if (_this.value >= 100) {
                _this.value = 100;
                _this.msgs = [{ severity: 'info', summary: 'Success', detail: 'Process Completed' }];
                clearInterval(interval);
            }
        }, 2000);
    };
    ProgressBarDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/progressbar/progressbardemo.html',
            directives: [messages_1.Messages, tabpanel_1.TabPanel, tabview_1.TabView, progressbar_1.ProgressBar, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES, growl_1.Growl]
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressBarDemo);
    return ProgressBarDemo;
}());
exports.ProgressBarDemo = ProgressBarDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXJkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBK0IsZUFBZSxDQUFDLENBQUE7QUFDL0MseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0Qsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsNEJBQTBCLDZDQUE2QyxDQUFDLENBQUE7QUFDeEUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFHcEYsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFDdEQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFBQTtRQUVJLFVBQUssR0FBVyxDQUFDLENBQUM7SUFldEIsQ0FBQztJQVhHLGtDQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJHLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQztZQUN2QixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdELEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDO2dCQUNsRixhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUIsQ0FBQztRQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7SUFuQkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLGdEQUFnRDtZQUM3RCxVQUFVLEVBQUUsQ0FBQyxtQkFBUSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyx5QkFBVyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLEVBQUMsYUFBSyxDQUFDO1NBQzlGLENBQUM7O3VCQUFBO0lBa0JGLHNCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSx1QkFBZSxrQkFpQjNCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9wcm9ncmVzc2Jhci9wcm9ncmVzc2JhcmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9tZXNzYWdlcy9tZXNzYWdlcyc7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge1Byb2dyZXNzQmFyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9zZWxlY3RpdGVtJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVzc2FnZSc7XG5pbXBvcnQge0dyb3dsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2dyb3dsL2dyb3dsJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbTWVzc2FnZXMsVGFiUGFuZWwsVGFiVmlldyxQcm9ncmVzc0JhcixDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVMsR3Jvd2xdXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyRGVtbyB7XG5cbiAgICB2YWx1ZTogbnVtYmVyID0gMDtcblxuICAgIG1zZ3M6IE1lc3NhZ2VbXTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICAgICAgICBpZih0aGlzLnZhbHVlID49IDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSAxMDA7XG4gICAgICAgICAgICAgICAgdGhpcy5tc2dzID0gW3tzZXZlcml0eTogJ2luZm8nLCBzdW1tYXJ5OiAnU3VjY2VzcycsIGRldGFpbDogJ1Byb2Nlc3MgQ29tcGxldGVkJ31dO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbn0iXX0=
