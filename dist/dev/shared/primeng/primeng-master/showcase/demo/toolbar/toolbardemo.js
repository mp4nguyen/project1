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
var toolbar_1 = require('../../../components/toolbar/toolbar');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var splitbutton_1 = require('../../../components/splitbutton/splitbutton');
var splitbuttonitem_1 = require('../../../components/splitbutton/splitbuttonitem');
var router_deprecated_1 = require('angular2/router-deprecated');
var ToolbarDemo = (function () {
    function ToolbarDemo() {
    }
    ToolbarDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/toolbar/toolbardemo.html',
            directives: [toolbar_1.Toolbar, button_1.Button, splitbutton_1.SplitButton, splitbuttonitem_1.SplitButtonItem, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ToolbarDemo);
    return ToolbarDemo;
}());
exports.ToolbarDemo = ToolbarDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdG9vbGJhci90b29sYmFyZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELDRCQUEwQiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQ3hFLGdDQUE4QixpREFBaUQsQ0FBQyxDQUFBO0FBQ2hGLGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTTdEO0lBQUE7SUFFQSxDQUFDO0lBTkQ7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHdDQUF3QztZQUNyRCxVQUFVLEVBQUUsQ0FBQyxpQkFBTyxFQUFDLGVBQU0sRUFBQyx5QkFBVyxFQUFDLGlDQUFlLEVBQUMsaUJBQU8sRUFBQyxtQkFBUSxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDOUcsQ0FBQzs7bUJBQUE7SUFHRixrQkFBQztBQUFELENBRkEsQUFFQyxJQUFBO0FBRlksbUJBQVcsY0FFdkIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL3Rvb2xiYXIvdG9vbGJhcmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1Rvb2xiYXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdG9vbGJhci90b29sYmFyJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge1NwbGl0QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3NwbGl0YnV0dG9uL3NwbGl0YnV0dG9uJztcbmltcG9ydCB7U3BsaXRCdXR0b25JdGVtfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3NwbGl0YnV0dG9uL3NwbGl0YnV0dG9uaXRlbSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby90b29sYmFyL3Rvb2xiYXJkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtUb29sYmFyLEJ1dHRvbixTcGxpdEJ1dHRvbixTcGxpdEJ1dHRvbkl0ZW0sVGFiVmlldyxUYWJQYW5lbCxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJEZW1vIHtcblxufVxuIl19
