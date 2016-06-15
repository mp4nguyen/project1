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
var checkbox_1 = require('../../../components/checkbox/checkbox');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var CheckboxDemo = (function () {
    function CheckboxDemo() {
        this.selectedCities = [];
        this.selectedCategories = ['Technology', 'Sports'];
        this.checked = false;
    }
    CheckboxDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/checkbox/checkboxdemo.html',
            styles: ["\n        .ui-grid .ui-grid-col-1,\n        .ui-grid .ui-grid-col-11 {\n            padding: 4px 10px;\n        }\n\n        .ui-grid label {\n            display: block;\n            margin: 2px 0 0 4px;\n        }\n    "],
            directives: [checkbox_1.Checkbox, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxDemo);
    return CheckboxDemo;
}());
exports.CheckboxDemo = CheckboxDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2hlY2tib3gvY2hlY2tib3hkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0QsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFpQjdEO0lBQUE7UUFFSSxtQkFBYyxHQUFhLEVBQUUsQ0FBQztRQUU5Qix1QkFBa0IsR0FBYSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV4RCxZQUFPLEdBQVksS0FBSyxDQUFDO0lBQzdCLENBQUM7SUF0QkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxNQUFNLEVBQUUsQ0FBQywrTkFVUixDQUFDO1lBQ0YsVUFBVSxFQUFFLENBQUMsbUJBQVEsRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUM1RSxDQUFDOztvQkFBQTtJQVFGLG1CQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSxvQkFBWSxlQU94QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2hlY2tib3gvY2hlY2tib3hkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtDaGVja2JveH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jaGVja2JveC9jaGVja2JveCc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2NoZWNrYm94L2NoZWNrYm94ZGVtby5odG1sJyxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC51aS1ncmlkIC51aS1ncmlkLWNvbC0xLFxuICAgICAgICAudWktZ3JpZCAudWktZ3JpZC1jb2wtMTEge1xuICAgICAgICAgICAgcGFkZGluZzogNHB4IDEwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAudWktZ3JpZCBsYWJlbCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIG1hcmdpbjogMnB4IDAgMCA0cHg7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBkaXJlY3RpdmVzOiBbQ2hlY2tib3gsVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94RGVtbyB7XG5cbiAgICBzZWxlY3RlZENpdGllczogc3RyaW5nW10gPSBbXTtcblxuICAgIHNlbGVjdGVkQ2F0ZWdvcmllczogc3RyaW5nW10gPSBbJ1RlY2hub2xvZ3knLCAnU3BvcnRzJ107XG4gICAgXG4gICAgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xufSJdfQ==
