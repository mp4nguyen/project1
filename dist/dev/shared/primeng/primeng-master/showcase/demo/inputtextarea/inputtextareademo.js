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
var inputtextarea_1 = require('../../../components/inputtextarea/inputtextarea');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var InputTextareaDemo = (function () {
    function InputTextareaDemo() {
    }
    InputTextareaDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/inputtextarea/inputtextareademo.html',
            directives: [inputtextarea_1.InputTextarea, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], InputTextareaDemo);
    return InputTextareaDemo;
}());
exports.InputTextareaDemo = InputTextareaDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vaW5wdXR0ZXh0YXJlYS9pbnB1dHRleHRhcmVhZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLDhCQUE0QixpREFBaUQsQ0FBQyxDQUFBO0FBQzlFLGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTTdEO0lBQUE7SUFFQSxDQUFDO0lBTkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLG9EQUFvRDtZQUNqRSxVQUFVLEVBQUUsQ0FBQyw2QkFBYSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQ2pGLENBQUM7O3lCQUFBO0lBR0Ysd0JBQUM7QUFBRCxDQUZBLEFBRUMsSUFBQTtBQUZZLHlCQUFpQixvQkFFN0IsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2lucHV0dGV4dGFyZWEvaW5wdXR0ZXh0YXJlYWRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0lucHV0VGV4dGFyZWF9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXR0ZXh0YXJlYS9pbnB1dHRleHRhcmVhJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vaW5wdXR0ZXh0YXJlYS9pbnB1dHRleHRhcmVhZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbSW5wdXRUZXh0YXJlYSxUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0YXJlYURlbW8ge1xuXG59Il19
