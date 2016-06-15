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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var tab_component_1 = require('./tab.component');
var router_1 = require('angular2/router');
var TabsetComponent = (function () {
    function TabsetComponent(tabs, _router) {
        this._router = _router;
        this.tabs = tabs;
    }
    TabsetComponent.prototype.ngAfterContentInit = function () {
        this.tabs.toArray()[0].active = true;
    };
    TabsetComponent.prototype.setActive = function (tab) {
        this.tabs.toArray().forEach(function (t) { return t.active = false; });
        tab.active = true;
        if (tab.routeName && tab.routeName.length > 0) {
            console.log("will go to route: ", tab.routeName);
            this._router.navigate([tab.routeName]);
        }
    };
    TabsetComponent = __decorate([
        core_1.Component({
            selector: 'tabset',
            directives: [router_1.ROUTER_DIRECTIVES],
            template: "\n<div class=\"tabbable-line\">\n    <ul class=\"nav nav-tabs \">\n        <li *ngFor=\"#tab of tabs\" [class.active]=\"tab.active\">\n            <a (click)=\"setActive(tab)\" data-toggle=\"tab\"> {{tab.title}} </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n    \t\t\n    \t\t<ng-content></ng-content>\n    \t\t<router-outlet></router-outlet>     \n    </div>\n</div>  \n"
        }),
        __param(0, core_1.Query(tab_component_1.TabComponent)), 
        __metadata('design:paramtypes', [core_1.QueryList, router_1.Router])
    ], TabsetComponent);
    return TabsetComponent;
}());
exports.TabsetComponent = TabsetComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL3RhYi90YWJzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBc0UsZUFBZSxDQUFDLENBQUE7QUFFdEYsOEJBQTJCLGlCQUFpQixDQUFDLENBQUE7QUFDN0MsdUJBQW1ELGlCQUFpQixDQUFDLENBQUE7QUF5QnJFO0lBR0MseUJBQWlDLElBQTRCLEVBQVMsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDcEYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVDLDRDQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBRUMsbUNBQVMsR0FBVCxVQUFVLEdBQWlCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQWhCLENBQWdCLENBQUMsQ0FBQztRQUNyRCxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVsQixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0wsQ0FBQztJQTFDRjtRQUFDLGdCQUFTLENBQUM7WUFDWCxRQUFRLEVBQUUsUUFBUTtZQUNsQixVQUFVLEVBQUMsQ0FBQywwQkFBaUIsQ0FBQztZQUM5QixRQUFRLEVBQ1Isd1lBYUM7U0FDQSxDQUFDO21CQVFZLFlBQUssQ0FBQyw0QkFBWSxDQUFDOzt1QkFSL0I7SUF5QkYsc0JBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBO0FBcEJZLHVCQUFlLGtCQW9CM0IsQ0FBQSIsImZpbGUiOiJzaGFyZWQvY29tcG9uZW50cy90YWIvdGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LElucHV0LE91dHB1dCxBZnRlckNvbnRlbnRJbml0LFF1ZXJ5TGlzdCxRdWVyeX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTLE5nQ2xhc3MsTmdGb3JtfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuaW1wb3J0IHtUYWJDb21wb25lbnR9IGZyb20gJy4vdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLFJvdXRlQ29uZmlnLFJvdXRlcn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG5zZWxlY3RvcjogJ3RhYnNldCcsXG5kaXJlY3RpdmVzOltST1VURVJfRElSRUNUSVZFU10sXG50ZW1wbGF0ZTogXG5gXG48ZGl2IGNsYXNzPVwidGFiYmFibGUtbGluZVwiPlxuICAgIDx1bCBjbGFzcz1cIm5hdiBuYXYtdGFicyBcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cIiN0YWIgb2YgdGFic1wiIFtjbGFzcy5hY3RpdmVdPVwidGFiLmFjdGl2ZVwiPlxuICAgICAgICAgICAgPGEgKGNsaWNrKT1cInNldEFjdGl2ZSh0YWIpXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj4ge3t0YWIudGl0bGV9fSA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8ZGl2IGNsYXNzPVwidGFiLWNvbnRlbnRcIj5cbiAgICBcdFx0XG4gICAgXHRcdDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICBcdFx0PHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PiAgICAgXG4gICAgPC9kaXY+XG48L2Rpdj4gIFxuYCBcbn0pXG5cblxuXG5cbmV4cG9ydCBjbGFzcyBUYWJzZXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHsgXG5cdHRhYnM6IFF1ZXJ5TGlzdDxUYWJDb21wb25lbnQ+O1xuXG5cdGNvbnN0cnVjdG9yKEBRdWVyeShUYWJDb21wb25lbnQpIHRhYnM6UXVlcnlMaXN0PFRhYkNvbXBvbmVudD4scHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHsgXG5cdFx0dGhpcy50YWJzID0gdGFicztcblx0fVxuICBcbiAgXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgXHR0aGlzLnRhYnMudG9BcnJheSgpWzBdLmFjdGl2ZSA9IHRydWU7XG5cdH1cblxuICBcdHNldEFjdGl2ZSh0YWI6IFRhYkNvbXBvbmVudCkge1xuICAgIFx0dGhpcy50YWJzLnRvQXJyYXkoKS5mb3JFYWNoKCh0KSA9PiB0LmFjdGl2ZSA9IGZhbHNlKTtcbiAgICBcdHRhYi5hY3RpdmUgPSB0cnVlO1xuICAgIFx0Ly9JZiB0aGVyZSBpcyByb3V0ZU5hbWUgPT4gd2lsbCByb3V0ZSBcbiAgICBcdGlmKHRhYi5yb3V0ZU5hbWUgJiYgdGFiLnJvdXRlTmFtZS5sZW5ndGggPiAwKXtcblx0ICAgIFx0Y29uc29sZS5sb2coXCJ3aWxsIGdvIHRvIHJvdXRlOiBcIix0YWIucm91dGVOYW1lKTtcblx0ICAgIFx0dGhpcy5fcm91dGVyLm5hdmlnYXRlKFt0YWIucm91dGVOYW1lXSk7ICAgIFx0XHRcbiAgICBcdH1cblx0fSBcbn0iXX0=
