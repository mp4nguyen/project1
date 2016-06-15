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
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var MessagesDemo = (function () {
    function MessagesDemo() {
        this.msgs = [];
    }
    MessagesDemo.prototype.showInfo = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    };
    MessagesDemo.prototype.showWarn = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    };
    MessagesDemo.prototype.showError = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    };
    MessagesDemo.prototype.showMultiple = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Message 1', detail: 'PrimeNG rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 2', detail: 'PrimeUI rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks' });
    };
    MessagesDemo.prototype.clear = function () {
        this.msgs = [];
    };
    MessagesDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/messages/messagesdemo.html',
            directives: [messages_1.Messages, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MessagesDemo);
    return MessagesDemo;
}());
exports.MessagesDemo = MessagesDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbWVzc2FnZXMvbWVzc2FnZXNkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0QsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFFekQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFPN0Q7SUFBQTtRQUVJLFNBQUksR0FBYyxFQUFFLENBQUM7SUEyQnpCLENBQUM7SUF6QkcsK0JBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQywyQkFBMkIsRUFBQyxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsZUFBZSxFQUFFLE1BQU0sRUFBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELG1DQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELDRCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBaENMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsVUFBVSxFQUFFLENBQUMsbUJBQVEsRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsZUFBTSxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDbkYsQ0FBQzs7b0JBQUE7SUE4QkYsbUJBQUM7QUFBRCxDQTdCQSxBQTZCQyxJQUFBO0FBN0JZLG9CQUFZLGVBNkJ4QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbWVzc2FnZXMvbWVzc2FnZXNkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlc30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9tZXNzYWdlcy9tZXNzYWdlcyc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9zZWxlY3RpdGVtJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVzc2FnZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9tZXNzYWdlcy9tZXNzYWdlc2RlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW01lc3NhZ2VzLFRhYlBhbmVsLFRhYlZpZXcsQnV0dG9uLENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNEZW1vIHtcblxuICAgIG1zZ3M6IE1lc3NhZ2VbXSA9IFtdO1xuXG4gICAgc2hvd0luZm8oKSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidJbmZvIE1lc3NhZ2UnLCBkZXRhaWw6J1ByaW1lTkcgcm9ja3MnfSk7XG4gICAgfVxuXG4gICAgc2hvd1dhcm4oKSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J3dhcm4nLCBzdW1tYXJ5OidXYXJuIE1lc3NhZ2UnLCBkZXRhaWw6J1RoZXJlIGFyZSB1bnNhdmVkIGNoYW5nZXMnfSk7XG4gICAgfVxuXG4gICAgc2hvd0Vycm9yKCkge1xuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OidlcnJvcicsIHN1bW1hcnk6J0Vycm9yIE1lc3NhZ2UnLCBkZXRhaWw6J1ZhbGlkYXRpb24gZmFpbGVkJ30pO1xuICAgIH1cblxuICAgIHNob3dNdWx0aXBsZSgpIHtcbiAgICAgICAgdGhpcy5tc2dzID0gW107XG4gICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTonaW5mbycsIHN1bW1hcnk6J01lc3NhZ2UgMScsIGRldGFpbDonUHJpbWVORyByb2Nrcyd9KTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OidpbmZvJywgc3VtbWFyeTonTWVzc2FnZSAyJywgZGV0YWlsOidQcmltZVVJIHJvY2tzJ30pO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidNZXNzYWdlIDMnLCBkZXRhaWw6J1ByaW1lRmFjZXMgcm9ja3MnfSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgIH1cbn0iXX0=
