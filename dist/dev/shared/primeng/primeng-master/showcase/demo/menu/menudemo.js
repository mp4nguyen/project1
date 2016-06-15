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
var menu_1 = require('../../../components/menu/menu');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var MenuDemo = (function () {
    function MenuDemo() {
    }
    MenuDemo.prototype.ngOnInit = function () {
        this.items = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'fa-plus' },
                    { label: 'Open', icon: 'fa-download' }
                ]
            },
            {
                label: 'Edit',
                items: [
                    { label: 'Undo', icon: 'fa-refresh' },
                    { label: 'Redo', icon: 'fa-repeat' }
                ]
            }];
    };
    MenuDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/menu/menudemo.html',
            directives: [menu_1.Menu, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MenuDemo);
    return MenuDemo;
}());
exports.MenuDemo = MenuDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbWVudS9tZW51ZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHFCQUFtQiwrQkFBK0IsQ0FBQyxDQUFBO0FBQ25ELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTzdEO0lBQUE7SUFvQkEsQ0FBQztJQWhCRywyQkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO2dCQUNWLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRTtvQkFDSCxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztvQkFDL0IsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUM7aUJBQ3ZDO2FBQ0o7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUU7b0JBQ0gsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUM7b0JBQ25DLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDO2lCQUNyQzthQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2Qkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxVQUFVLEVBQUUsQ0FBQyxXQUFJLEVBQUMsZUFBTSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQy9FLENBQUM7O2dCQUFBO0lBcUJGLGVBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBO0FBcEJZLGdCQUFRLFdBb0JwQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbWVudS9tZW51ZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TWVudX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9tZW51L21lbnUnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL21lbnVtb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9tZW51L21lbnVkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtNZW51LEJ1dHRvbixUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgTWVudURlbW8ge1xuICAgIFxuICAgIHByaXZhdGUgaXRlbXM6IE1lbnVJdGVtW107XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFt7XG4gICAgICAgICAgICBsYWJlbDogJ0ZpbGUnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7bGFiZWw6ICdOZXcnLCBpY29uOiAnZmEtcGx1cyd9LFxuICAgICAgICAgICAgICAgIHtsYWJlbDogJ09wZW4nLCBpY29uOiAnZmEtZG93bmxvYWQnfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7bGFiZWw6ICdVbmRvJywgaWNvbjogJ2ZhLXJlZnJlc2gnfSxcbiAgICAgICAgICAgICAgICB7bGFiZWw6ICdSZWRvJywgaWNvbjogJ2ZhLXJlcGVhdCd9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1dO1xuICAgIH1cbn0iXX0=
