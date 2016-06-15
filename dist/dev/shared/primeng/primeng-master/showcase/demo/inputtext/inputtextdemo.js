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
var inputtext_1 = require('../../../components/inputtext/inputtext');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var InputTextDemo = (function () {
    function InputTextDemo() {
        this.disabled = true;
    }
    InputTextDemo.prototype.toggleDisabled = function () {
        this.disabled = !this.disabled;
    };
    InputTextDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/inputtext/inputtextdemo.html',
            directives: [inputtext_1.InputText, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], InputTextDemo);
    return InputTextDemo;
}());
exports.InputTextDemo = InputTextDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vaW5wdXR0ZXh0L2lucHV0dGV4dGRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QywwQkFBd0IseUNBQXlDLENBQUMsQ0FBQTtBQUNsRSxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCx3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU03RDtJQUFBO1FBSUksYUFBUSxHQUFZLElBQUksQ0FBQztJQUs3QixDQUFDO0lBSEcsc0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFaTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsNENBQTRDO1lBQ3pELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsZUFBTSxFQUFDLGlCQUFPLEVBQUMsbUJBQVEsRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQ3BGLENBQUM7O3FCQUFBO0lBVUYsb0JBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLHFCQUFhLGdCQVN6QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vaW5wdXR0ZXh0L2lucHV0dGV4dGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0lucHV0VGV4dH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9pbnB1dHRleHQvaW5wdXR0ZXh0JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9pbnB1dHRleHQvaW5wdXR0ZXh0ZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbSW5wdXRUZXh0LEJ1dHRvbixUYWJWaWV3LFRhYlBhbmVsLENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0RGVtbyB7XG5cbiAgICB0ZXh0OiBzdHJpbmc7XG5cbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICB0b2dnbGVEaXNhYmxlZCgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9ICF0aGlzLmRpc2FibGVkO1xuICAgIH1cbn0iXX0=
