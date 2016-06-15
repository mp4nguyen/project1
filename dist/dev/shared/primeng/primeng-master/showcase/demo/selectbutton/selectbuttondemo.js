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
var selectbutton_1 = require('../../../components/selectbutton/selectbutton');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var SelectButtonDemo = (function () {
    function SelectButtonDemo() {
        this.selectedTypes = ['Apartment', 'Studio'];
        this.types = [];
        this.types.push({ label: 'Apartment', value: 'Apartment' });
        this.types.push({ label: 'House', value: 'House' });
        this.types.push({ label: 'Studio', value: 'Studio' });
    }
    SelectButtonDemo.prototype.clear = function () {
        this.selectedType = null;
        this.selectedTypes = [];
    };
    SelectButtonDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/selectbutton/selectbuttondemo.html',
            directives: [selectbutton_1.SelectButton, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SelectButtonDemo);
    return SelectButtonDemo;
}());
exports.SelectButtonDemo = SelectButtonDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vc2VsZWN0YnV0dG9uL3NlbGVjdGJ1dHRvbmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyw2QkFBMkIsK0NBQStDLENBQUMsQ0FBQTtBQUMzRSxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUV6RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU03RDtJQVFJO1FBRkEsa0JBQWEsR0FBYSxDQUFDLFdBQVcsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUc3QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsZ0NBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUF0Qkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLGtEQUFrRDtZQUMvRCxVQUFVLEVBQUUsQ0FBQywyQkFBWSxFQUFFLG1CQUFRLEVBQUUsaUJBQU8sRUFBRSxlQUFNLEVBQUMsaUNBQWUsRUFBRSxxQ0FBaUIsQ0FBQztTQUMzRixDQUFDOzt3QkFBQTtJQW9CRix1QkFBQztBQUFELENBbkJBLEFBbUJDLElBQUE7QUFuQlksd0JBQWdCLG1CQW1CNUIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL3NlbGVjdGJ1dHRvbi9zZWxlY3RidXR0b25kZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTZWxlY3RCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0YnV0dG9uL3NlbGVjdGJ1dHRvbic7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9zZWxlY3RpdGVtJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL3NlbGVjdGJ1dHRvbi9zZWxlY3RidXR0b25kZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtTZWxlY3RCdXR0b24sIFRhYlBhbmVsLCBUYWJWaWV3LCBCdXR0b24sQ29kZUhpZ2hsaWdodGVyLCBST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0QnV0dG9uRGVtbyB7XG5cbiAgICB0eXBlczogU2VsZWN0SXRlbVtdO1xuXG4gICAgc2VsZWN0ZWRUeXBlOiBzdHJpbmc7XG5cbiAgICBzZWxlY3RlZFR5cGVzOiBzdHJpbmdbXSA9IFsnQXBhcnRtZW50JywnU3R1ZGlvJ107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50eXBlcyA9IFtdO1xuICAgICAgICB0aGlzLnR5cGVzLnB1c2goe2xhYmVsOiAnQXBhcnRtZW50JywgdmFsdWU6ICdBcGFydG1lbnQnfSk7XG4gICAgICAgIHRoaXMudHlwZXMucHVzaCh7bGFiZWw6ICdIb3VzZScsIHZhbHVlOiAnSG91c2UnfSk7XG4gICAgICAgIHRoaXMudHlwZXMucHVzaCh7bGFiZWw6ICdTdHVkaW8nLCB2YWx1ZTogJ1N0dWRpbyd9KTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFR5cGUgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVHlwZXMgPSBbXTtcbiAgICB9XG59Il19
