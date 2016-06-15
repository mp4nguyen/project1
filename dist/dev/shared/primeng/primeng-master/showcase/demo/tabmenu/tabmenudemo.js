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
var tabmenu_1 = require('../../../components/tabmenu/tabmenu');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var TabMenuDemo = (function () {
    function TabMenuDemo() {
    }
    TabMenuDemo.prototype.ngOnInit = function () {
        this.items = [
            { label: 'Stats', icon: 'fa-bar-chart' },
            { label: 'Calendar', icon: 'fa-calendar' },
            { label: 'Documentation', icon: 'fa-book' },
            { label: 'Support', icon: 'fa-support' },
            { label: 'Social', icon: 'fa-twitter' }
        ];
    };
    TabMenuDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/tabmenu/tabmenudemo.html',
            directives: [tabmenu_1.TabMenu, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TabMenuDemo);
    return TabMenuDemo;
}());
exports.TabMenuDemo = TabMenuDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdGFibWVudS90YWJtZW51ZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTzdEO0lBQUE7SUFhQSxDQUFDO0lBVEcsOEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQztZQUN0QyxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBQztZQUN4QyxFQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztZQUN6QyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBQztZQUN0QyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBQztTQUN4QyxDQUFDO0lBQ04sQ0FBQztJQWhCTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELFVBQVUsRUFBRSxDQUFDLGlCQUFPLEVBQUMsZUFBTSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQ2xGLENBQUM7O21CQUFBO0lBY0Ysa0JBQUM7QUFBRCxDQWJBLEFBYUMsSUFBQTtBQWJZLG1CQUFXLGNBYXZCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby90YWJtZW51L3RhYm1lbnVkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtUYWJNZW51fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYm1lbnUvdGFibWVudSc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVudW1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL3RhYm1lbnUvdGFibWVudWRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1RhYk1lbnUsQnV0dG9uLFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJNZW51RGVtbyB7XG4gICAgXG4gICAgcHJpdmF0ZSBpdGVtczogTWVudUl0ZW1bXTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gW1xuICAgICAgICAgICAge2xhYmVsOiAnU3RhdHMnLCBpY29uOiAnZmEtYmFyLWNoYXJ0J30sXG4gICAgICAgICAgICB7bGFiZWw6ICdDYWxlbmRhcicsIGljb246ICdmYS1jYWxlbmRhcid9LFxuICAgICAgICAgICAge2xhYmVsOiAnRG9jdW1lbnRhdGlvbicsIGljb246ICdmYS1ib29rJ30sXG4gICAgICAgICAgICB7bGFiZWw6ICdTdXBwb3J0JywgaWNvbjogJ2ZhLXN1cHBvcnQnfSxcbiAgICAgICAgICAgIHtsYWJlbDogJ1NvY2lhbCcsIGljb246ICdmYS10d2l0dGVyJ31cbiAgICAgICAgXTtcbiAgICB9XG59Il19
