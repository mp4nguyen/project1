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
var button_1 = require('../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var ButtonDemo = (function () {
    function ButtonDemo() {
        this.clicks = 0;
    }
    ButtonDemo.prototype.count = function () {
        this.clicks++;
    };
    ButtonDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/button/buttondemo.html',
            directives: [codehighlighter_1.CodeHighlighter, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ButtonDemo);
    return ButtonDemo;
}());
exports.ButtonDemo = ButtonDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vYnV0dG9uL2J1dHRvbmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU03RDtJQUFBO1FBRUksV0FBTSxHQUFXLENBQUMsQ0FBQztJQUt2QixDQUFDO0lBSEcsMEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBVkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxVQUFVLEVBQUUsQ0FBQyxpQ0FBZSxFQUFDLGVBQU0sRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMscUNBQWlCLENBQUM7U0FDMUUsQ0FBQzs7a0JBQUE7SUFRRixpQkFBQztBQUFELENBUEEsQUFPQyxJQUFBO0FBUFksa0JBQVUsYUFPdEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2J1dHRvbi9idXR0b25kZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2J1dHRvbi9idXR0b25kZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtDb2RlSGlnaGxpZ2h0ZXIsQnV0dG9uLFRhYlBhbmVsLFRhYlZpZXcsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkRlbW8ge1xuXG4gICAgY2xpY2tzOiBudW1iZXIgPSAwO1xuXG4gICAgY291bnQoKSB7XG4gICAgICAgIHRoaXMuY2xpY2tzKys7XG4gICAgfVxufSJdfQ==
