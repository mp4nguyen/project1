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
var slider_1 = require('../../../components/slider/slider');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var SliderDemo = (function () {
    function SliderDemo() {
        this.val2 = 50;
        this.rangeValues = [20, 80];
    }
    SliderDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/slider/sliderdemo.html',
            directives: [slider_1.Slider, inputtext_1.InputText, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SliderDemo);
    return SliderDemo;
}());
exports.SliderDemo = SliderDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vc2xpZGVyL3NsaWRlcmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCwwQkFBd0IseUNBQXlDLENBQUMsQ0FBQTtBQUNsRSx3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU03RDtJQUFBO1FBSUksU0FBSSxHQUFXLEVBQUUsQ0FBQztRQVFsQixnQkFBVyxHQUFhLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFqQkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxVQUFVLEVBQUUsQ0FBQyxlQUFNLEVBQUMscUJBQVMsRUFBQyxlQUFNLEVBQUMsaUJBQU8sRUFBQyxtQkFBUSxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDM0YsQ0FBQzs7a0JBQUE7SUFjRixpQkFBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBYlksa0JBQVUsYUFhdEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL3NsaWRlci9zbGlkZXJkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTbGlkZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlcic7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtJbnB1dFRleHR9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXR0ZXh0L2lucHV0dGV4dCc7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9zbGlkZXIvc2xpZGVyZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbU2xpZGVyLElucHV0VGV4dCxCdXR0b24sVGFiVmlldyxUYWJQYW5lbCxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlckRlbW8ge1xuXG4gICAgdmFsMTogbnVtYmVyO1xuXG4gICAgdmFsMjogbnVtYmVyID0gNTA7XG5cbiAgICB2YWwzOiBudW1iZXI7XG5cbiAgICB2YWw0OiBudW1iZXI7XG5cbiAgICB2YWw1OiBudW1iZXI7XG5cbiAgICByYW5nZVZhbHVlczogbnVtYmVyW10gPSBbMjAsODBdO1xufSJdfQ==
