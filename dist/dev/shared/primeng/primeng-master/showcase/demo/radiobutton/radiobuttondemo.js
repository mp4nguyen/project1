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
var radiobutton_1 = require('../../../components/radiobutton/radiobutton');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var RadioButtonDemo = (function () {
    function RadioButtonDemo() {
        this.val2 = 'Option 2';
    }
    RadioButtonDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/radiobutton/radiobuttondemo.html',
            styles: ["\n        .ui-grid label {\n            display: inline-block;\n            margin: 3px 0px 0px 4px;\n        }\n    "],
            directives: [radiobutton_1.RadioButton, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RadioButtonDemo);
    return RadioButtonDemo;
}());
exports.RadioButtonDemo = RadioButtonDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vcmFkaW9idXR0b24vcmFkaW9idXR0b25kZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsNEJBQTBCLDZDQUE2QyxDQUFDLENBQUE7QUFDeEUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFZN0Q7SUFBQTtRQUlJLFNBQUksR0FBVyxVQUFVLENBQUM7SUFDOUIsQ0FBQztJQWZEO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSxnREFBZ0Q7WUFDN0QsTUFBTSxFQUFFLENBQUMsdUhBS1IsQ0FBQztZQUNGLFVBQVUsRUFBRSxDQUFDLHlCQUFXLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDL0UsQ0FBQzs7dUJBQUE7SUFNRixzQkFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksdUJBQWUsa0JBSzNCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9yYWRpb2J1dHRvbi9yYWRpb2J1dHRvbmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JhZGlvQnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3JhZGlvYnV0dG9uL3JhZGlvYnV0dG9uJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vcmFkaW9idXR0b24vcmFkaW9idXR0b25kZW1vLmh0bWwnLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLnVpLWdyaWQgbGFiZWwge1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgbWFyZ2luOiAzcHggMHB4IDBweCA0cHg7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBkaXJlY3RpdmVzOiBbUmFkaW9CdXR0b24sVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uRGVtbyB7XG5cbiAgICB2YWwxOiBzdHJpbmc7XG5cbiAgICB2YWwyOiBzdHJpbmcgPSAnT3B0aW9uIDInO1xufSJdfQ==
