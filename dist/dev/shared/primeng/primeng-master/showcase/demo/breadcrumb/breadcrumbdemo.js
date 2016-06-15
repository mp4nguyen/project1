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
var breadcrumb_1 = require('../../../components/breadcrumb/breadcrumb');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var BreadcrumbDemo = (function () {
    function BreadcrumbDemo() {
    }
    BreadcrumbDemo.prototype.ngOnInit = function () {
        this.items = [];
        this.items.push({ label: 'Categories' });
        this.items.push({ label: 'Sports' });
        this.items.push({ label: 'Football' });
        this.items.push({ label: 'Countries' });
        this.items.push({ label: 'Spain' });
        this.items.push({ label: 'F.C. Barcelona' });
        this.items.push({ label: 'Squad' });
        this.items.push({ label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' });
    };
    BreadcrumbDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/breadcrumb/breadcrumbdemo.html',
            directives: [breadcrumb_1.Breadcrumb, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], BreadcrumbDemo);
    return BreadcrumbDemo;
}());
exports.BreadcrumbDemo = BreadcrumbDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vYnJlYWRjcnVtYi9icmVhZGNydW1iZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTRDLGVBQWUsQ0FBQyxDQUFBO0FBQzVELDJCQUF5QiwyQ0FBMkMsQ0FBQyxDQUFBO0FBQ3JFLGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBRTlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTTdEO0lBQUE7SUFlQSxDQUFDO0lBWEcsaUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLDRDQUE0QyxFQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBbEJMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSw4Q0FBOEM7WUFDM0QsVUFBVSxFQUFFLENBQUMsdUJBQVUsRUFBQyxlQUFNLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDckYsQ0FBQzs7c0JBQUE7SUFnQkYscUJBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLHNCQUFjLGlCQWUxQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vYnJlYWRjcnVtYi9icmVhZGNydW1iZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdCxFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtCcmVhZGNydW1ifSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2JyZWFkY3J1bWIvYnJlYWRjcnVtYic7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVudW1vZGVsJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2JyZWFkY3J1bWIvYnJlYWRjcnVtYmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0JyZWFkY3J1bWIsQnV0dG9uLFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBCcmVhZGNydW1iRGVtbyBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwcml2YXRlIGl0ZW1zOiBNZW51SXRlbVtdO1xuICAgIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7bGFiZWw6J0NhdGVnb3JpZXMnfSk7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7bGFiZWw6J1Nwb3J0cyd9KTtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtsYWJlbDonRm9vdGJhbGwnfSk7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7bGFiZWw6J0NvdW50cmllcyd9KTtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtsYWJlbDonU3BhaW4nfSk7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7bGFiZWw6J0YuQy4gQmFyY2Vsb25hJ30pO1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goe2xhYmVsOidTcXVhZCd9KTtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHtsYWJlbDonTGlvbmVsIE1lc3NpJywgdXJsOiAnaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlvbmVsX01lc3NpJ30pO1xuICAgIH1cbn0iXX0=
