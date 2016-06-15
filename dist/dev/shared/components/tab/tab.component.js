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
var TabComponent = (function () {
    function TabComponent() {
        this.active = false;
    }
    __decorate([
        core_1.Input('title'), 
        __metadata('design:type', String)
    ], TabComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input('routeName'), 
        __metadata('design:type', String)
    ], TabComponent.prototype, "routeName", void 0);
    TabComponent = __decorate([
        core_1.Component({
            selector: 'tab',
            inputs: ['title', 'routeName'],
            template: "\n\t\t\t<div class=\"tab-pane\" *ngIf=\"active\"> \n\t\t\t\t<ng-content></ng-content>\n\t\t\t</div>\n\t\t\t"
        }), 
        __metadata('design:paramtypes', [])
    ], TabComponent);
    return TabComponent;
}());
exports.TabComponent = TabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL3RhYi90YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNEMsZUFBZSxDQUFDLENBQUE7QUFlNUQ7SUFBQTtRQUdFLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFFMUIsQ0FBQztJQUpDO1FBQUMsWUFBSyxDQUFDLE9BQU8sQ0FBQzs7K0NBQUE7SUFDZjtRQUFDLFlBQUssQ0FBQyxXQUFXLENBQUM7O21EQUFBO0lBZHJCO1FBQUMsZ0JBQVMsQ0FBQztZQUNYLFFBQVEsRUFBRSxLQUFLO1lBQ2YsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFDLFdBQVcsQ0FBQztZQUM3QixRQUFRLEVBQ0wsNkdBSUM7U0FDSCxDQUFDOztvQkFBQTtJQVFGLG1CQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7QUFMWSxvQkFBWSxlQUt4QixDQUFBIiwiZmlsZSI6InNoYXJlZC9jb21wb25lbnRzL3RhYi90YWIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsSW5wdXQsT3V0cHV0LE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTLE5nQ2xhc3MsTmdGb3JtfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbnNlbGVjdG9yOiAndGFiJyxcbmlucHV0czogWyd0aXRsZScsJ3JvdXRlTmFtZSddLFxudGVtcGxhdGU6IFxuXHRcdFx0YFxuXHRcdFx0PGRpdiBjbGFzcz1cInRhYi1wYW5lXCIgKm5nSWY9XCJhY3RpdmVcIj4gXG5cdFx0XHRcdDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblx0XHRcdDwvZGl2PlxuXHRcdFx0YCBcbn0pXG5cblxuZXhwb3J0IGNsYXNzIFRhYkNvbXBvbmVudCB7XG4gIEBJbnB1dCgndGl0bGUnKSB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoJ3JvdXRlTmFtZScpIHJvdXRlTmFtZTogc3RyaW5nO1xuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbmFtZTogc3RyaW5nO1xufSJdfQ==
