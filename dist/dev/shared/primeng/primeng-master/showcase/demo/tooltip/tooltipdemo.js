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
var tooltip_1 = require('../../../components/tooltip/tooltip');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var router_deprecated_1 = require('angular2/router-deprecated');
var TooltipDemo = (function () {
    function TooltipDemo() {
    }
    TooltipDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/tooltip/tooltipdemo.html',
            directives: [codehighlighter_1.CodeHighlighter, tooltip_1.Tooltip, inputtext_1.InputText, tabpanel_1.TabPanel, tabview_1.TabView, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TooltipDemo);
    return TooltipDemo;
}());
exports.TooltipDemo = TooltipDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdG9vbHRpcC90b29sdGlwZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTTdEO0lBQUE7SUFFQSxDQUFDO0lBTkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHdDQUF3QztZQUNyRCxVQUFVLEVBQUUsQ0FBQyxpQ0FBZSxFQUFDLGlCQUFPLEVBQUMscUJBQVMsRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMscUNBQWlCLENBQUM7U0FDckYsQ0FBQzs7bUJBQUE7SUFHRixrQkFBQztBQUFELENBRkEsQUFFQyxJQUFBO0FBRlksbUJBQVcsY0FFdkIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL3Rvb2x0aXAvdG9vbHRpcGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7VG9vbHRpcH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAnO1xuaW1wb3J0IHtJbnB1dFRleHR9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXR0ZXh0L2lucHV0dGV4dCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby90b29sdGlwL3Rvb2x0aXBkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtDb2RlSGlnaGxpZ2h0ZXIsVG9vbHRpcCxJbnB1dFRleHQsVGFiUGFuZWwsVGFiVmlldyxST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcERlbW8ge1xuXG59Il19
