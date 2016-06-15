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
var growl_1 = require('../../../components/growl/growl');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var TabViewDemo = (function () {
    function TabViewDemo() {
    }
    TabViewDemo.prototype.onTabChange = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
    };
    TabViewDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/tabview/tabviewdemo.html',
            directives: [tabview_1.TabView, tabpanel_1.TabPanel, growl_1.Growl, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TabViewDemo);
    return TabViewDemo;
}());
exports.TabViewDemo = TabViewDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdGFidmlldy90YWJ2aWV3ZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHNCQUFvQixpQ0FBaUMsQ0FBQyxDQUFBO0FBRXRELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTTdEO0lBQUE7SUFRQSxDQUFDO0lBSkcsaUNBQVcsR0FBWCxVQUFZLEtBQUs7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQVhMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSx3Q0FBd0M7WUFDckQsVUFBVSxFQUFFLENBQUMsaUJBQU8sRUFBQyxtQkFBUSxFQUFDLGFBQUssRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQ3pFLENBQUM7O21CQUFBO0lBU0Ysa0JBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQVJZLG1CQUFXLGNBUXZCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby90YWJ2aWV3L3RhYnZpZXdkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge0dyb3dsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2dyb3dsL2dyb3dsJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVzc2FnZSc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby90YWJ2aWV3L3RhYnZpZXdkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtUYWJWaWV3LFRhYlBhbmVsLEdyb3dsLENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgVGFiVmlld0RlbW8ge1xuXG4gICAgbXNnczogTWVzc2FnZVtdO1xuICAgIFxuICAgIG9uVGFiQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidUYWIgRXhwYW5kZWQnLCBkZXRhaWw6ICdJbmRleDogJyArIGV2ZW50LmluZGV4fSk7XG4gICAgfVxufSJdfQ==
