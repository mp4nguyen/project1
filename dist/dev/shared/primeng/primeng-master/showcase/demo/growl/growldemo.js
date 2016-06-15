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
var growl_1 = require('../../../components/growl/growl');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var GrowlDemo = (function () {
    function GrowlDemo() {
        this.msgs = [];
    }
    GrowlDemo.prototype.showInfo = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    };
    GrowlDemo.prototype.showWarn = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    };
    GrowlDemo.prototype.showError = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    };
    GrowlDemo.prototype.showMultiple = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Message 1', detail: 'PrimeNG rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 2', detail: 'PrimeUI rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks' });
    };
    GrowlDemo.prototype.clear = function () {
        this.msgs = [];
    };
    GrowlDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/growl/growldemo.html',
            directives: [growl_1.Growl, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], GrowlDemo);
    return GrowlDemo;
}());
exports.GrowlDemo = GrowlDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZ3Jvd2wvZ3Jvd2xkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFDdEQsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFFekQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFPN0Q7SUFBQTtRQUVJLFNBQUksR0FBYyxFQUFFLENBQUM7SUEyQnpCLENBQUM7SUF6QkcsNEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBQywyQkFBMkIsRUFBQyxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUVELDZCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsZUFBZSxFQUFFLE1BQU0sRUFBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELGdDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxlQUFlLEVBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELHlCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBaENMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsVUFBVSxFQUFFLENBQUMsYUFBSyxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxlQUFNLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUNoRixDQUFDOztpQkFBQTtJQThCRixnQkFBQztBQUFELENBN0JBLEFBNkJDLElBQUE7QUE3QlksaUJBQVMsWUE2QnJCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9ncm93bC9ncm93bGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0dyb3dsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2dyb3dsL2dyb3dsJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge1NlbGVjdEl0ZW19IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL3NlbGVjdGl0ZW0nO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9tZXNzYWdlJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2dyb3dsL2dyb3dsZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbR3Jvd2wsVGFiUGFuZWwsVGFiVmlldyxCdXR0b24sQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBHcm93bERlbW8ge1xuXG4gICAgbXNnczogTWVzc2FnZVtdID0gW107XG5cbiAgICBzaG93SW5mbygpIHtcbiAgICAgICAgdGhpcy5tc2dzID0gW107XG4gICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTonaW5mbycsIHN1bW1hcnk6J0luZm8gTWVzc2FnZScsIGRldGFpbDonUHJpbWVORyByb2Nrcyd9KTtcbiAgICB9XG5cbiAgICBzaG93V2FybigpIHtcbiAgICAgICAgdGhpcy5tc2dzID0gW107XG4gICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTond2FybicsIHN1bW1hcnk6J1dhcm4gTWVzc2FnZScsIGRldGFpbDonVGhlcmUgYXJlIHVuc2F2ZWQgY2hhbmdlcyd9KTtcbiAgICB9XG5cbiAgICBzaG93RXJyb3IoKSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2Vycm9yJywgc3VtbWFyeTonRXJyb3IgTWVzc2FnZScsIGRldGFpbDonVmFsaWRhdGlvbiBmYWlsZWQnfSk7XG4gICAgfVxuXG4gICAgc2hvd011bHRpcGxlKCkge1xuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OidpbmZvJywgc3VtbWFyeTonTWVzc2FnZSAxJywgZGV0YWlsOidQcmltZU5HIHJvY2tzJ30pO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidNZXNzYWdlIDInLCBkZXRhaWw6J1ByaW1lVUkgcm9ja3MnfSk7XG4gICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTonaW5mbycsIHN1bW1hcnk6J01lc3NhZ2UgMycsIGRldGFpbDonUHJpbWVGYWNlcyByb2Nrcyd9KTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5tc2dzID0gW107XG4gICAgfVxufSJdfQ==
