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
var spinner_1 = require('../../../components/spinner/spinner');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var SpinnerDemo = (function () {
    function SpinnerDemo() {
        this.val4 = 100;
    }
    SpinnerDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/spinner/spinnerdemo.html',
            directives: [spinner_1.Spinner, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SpinnerDemo);
    return SpinnerDemo;
}());
exports.SpinnerDemo = SpinnerDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vc3Bpbm5lci9zcGlubmVyZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTTdEO0lBQUE7UUFRSSxTQUFJLEdBQVcsR0FBRyxDQUFDO0lBQ3ZCLENBQUM7SUFiRDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELFVBQVUsRUFBRSxDQUFDLGlCQUFPLEVBQUMsZUFBTSxFQUFDLGlCQUFPLEVBQUMsbUJBQVEsRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQ2xGLENBQUM7O21CQUFBO0lBVUYsa0JBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLG1CQUFXLGNBU3ZCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9zcGlubmVyL3NwaW5uZXJkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTcGlubmVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lcic7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vc3Bpbm5lci9zcGlubmVyZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbU3Bpbm5lcixCdXR0b24sVGFiVmlldyxUYWJQYW5lbCxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFNwaW5uZXJEZW1vIHtcblxuICAgIHZhbDE6IG51bWJlcjtcblxuICAgIHZhbDI6IG51bWJlcjtcblxuICAgIHZhbDM6IG51bWJlcjtcblxuICAgIHZhbDQ6IG51bWJlciA9IDEwMDtcbn0iXX0=
