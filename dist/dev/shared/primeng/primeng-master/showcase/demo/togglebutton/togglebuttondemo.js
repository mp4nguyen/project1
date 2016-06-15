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
var togglebutton_1 = require('../../../components/togglebutton/togglebutton');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var ToggleButtonDemo = (function () {
    function ToggleButtonDemo() {
        this.checked1 = false;
        this.checked2 = true;
    }
    ToggleButtonDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/togglebutton/togglebuttondemo.html',
            directives: [togglebutton_1.ToggleButton, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ToggleButtonDemo);
    return ToggleButtonDemo;
}());
exports.ToggleButtonDemo = ToggleButtonDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdG9nZ2xlYnV0dG9uL3RvZ2dsZWJ1dHRvbmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyw2QkFBMkIsK0NBQStDLENBQUMsQ0FBQTtBQUMzRSxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU03RDtJQUFBO1FBRUksYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixhQUFRLEdBQVksSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFURDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsa0RBQWtEO1lBQy9ELFVBQVUsRUFBRSxDQUFDLDJCQUFZLEVBQUMsaUJBQU8sRUFBQyxtQkFBUSxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDaEYsQ0FBQzs7d0JBQUE7SUFNRix1QkFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksd0JBQWdCLG1CQUs1QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdG9nZ2xlYnV0dG9uL3RvZ2dsZWJ1dHRvbmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1RvZ2dsZUJ1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90b2dnbGVidXR0b24vdG9nZ2xlYnV0dG9uJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vdG9nZ2xlYnV0dG9uL3RvZ2dsZWJ1dHRvbmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1RvZ2dsZUJ1dHRvbixUYWJWaWV3LFRhYlBhbmVsLENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlQnV0dG9uRGVtbyB7XG4gICAgXG4gICAgY2hlY2tlZDE6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNoZWNrZWQyOiBib29sZWFuID0gdHJ1ZTtcbn0iXX0=
