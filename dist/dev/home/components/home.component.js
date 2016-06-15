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
var common_1 = require('angular2/common');
var name_list_service_1 = require('../../shared/services/name-list.service');
var router_1 = require('angular2/router');
var about_component_1 = require('../../about/components/about.component');
var companies_component_1 = require('../../companies/components/companies.component');
var HomeComponent = (function () {
    function HomeComponent(nameListService) {
        this.nameListService = nameListService;
    }
    HomeComponent.prototype.addName = function () {
        this.nameListService.add(this.newName);
        this.newName = '';
        return false;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'sd-home',
            templateUrl: './home/components/home.component.html',
            styleUrls: ['./home/components/home.component.css'],
            viewProviders: [name_list_service_1.NameListService],
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, router_1.RouterOutlet]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'About', component: about_component_1.AboutComponent },
            { path: '/Companies/...', name: 'Companies', component: companies_component_1.CompaniesComponent, useAsDefault: true },
        ]), 
        __metadata('design:paramtypes', [name_list_service_1.NameListService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUvY29tcG9uZW50cy9ob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHVCQUErQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2pFLGtDQUE4Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ3hFLHVCQUF3QyxpQkFBaUIsQ0FBQyxDQUFBO0FBQzFELGdDQUE2Qix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3RFLG9DQUFpQyxnREFBZ0QsQ0FBQyxDQUFBO0FBZ0JsRjtJQUVFLHVCQUFtQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDO0lBTXZELCtCQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUF6Qkg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztZQUNuRCxhQUFhLEVBQUUsQ0FBQyxtQ0FBZSxDQUFDO1lBQ2hDLFVBQVUsRUFBRSxDQUFDLHdCQUFlLEVBQUUsd0JBQWUsRUFBQyxxQkFBWSxDQUFDO1NBQzVELENBQUM7UUFFRCxvQkFBVyxDQUFDO1lBQ1gsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFLLElBQUksRUFBRSxPQUFPLEVBQUksU0FBUyxFQUFFLGdDQUFjLEVBQUM7WUFDekQsRUFBQyxJQUFJLEVBQUMsZ0JBQWdCLEVBQUssSUFBSSxFQUFFLFdBQVcsRUFBSSxTQUFTLEVBQUUsd0NBQWtCLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQztTQUNuRyxDQUFDOztxQkFBQTtJQWVGLG9CQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSxxQkFBYSxnQkFhekIsQ0FBQSIsImZpbGUiOiJob21lL2NvbXBvbmVudHMvaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NPUkVfRElSRUNUSVZFUywgRk9STV9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuaW1wb3J0IHtOYW1lTGlzdFNlcnZpY2V9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9uYW1lLWxpc3Quc2VydmljZSc7XG5pbXBvcnQge1JvdXRlQ29uZmlnLCBSb3V0ZXJPdXRsZXR9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5pbXBvcnQge0Fib3V0Q29tcG9uZW50fSBmcm9tICcuLi8uLi9hYm91dC9jb21wb25lbnRzL2Fib3V0LmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbXBhbmllc0NvbXBvbmVudH0gZnJvbSAnLi4vLi4vY29tcGFuaWVzL2NvbXBvbmVudHMvY29tcGFuaWVzLmNvbXBvbmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2QtaG9tZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lL2NvbXBvbmVudHMvaG9tZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2hvbWUvY29tcG9uZW50cy9ob21lLmNvbXBvbmVudC5jc3MnXSxcbiAgdmlld1Byb3ZpZGVyczogW05hbWVMaXN0U2VydmljZV0sXG4gIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVMsIENPUkVfRElSRUNUSVZFUyxSb3V0ZXJPdXRsZXRdXG59KVxuXG5AUm91dGVDb25maWcoW1xuICB7cGF0aDonLycsICAgIG5hbWU6ICdBYm91dCcsICAgY29tcG9uZW50OiBBYm91dENvbXBvbmVudH0sICBcbiAge3BhdGg6Jy9Db21wYW5pZXMvLi4uJywgICAgbmFtZTogJ0NvbXBhbmllcycsICAgY29tcG9uZW50OiBDb21wYW5pZXNDb21wb25lbnQsIHVzZUFzRGVmYXVsdDogdHJ1ZX0sXG5dKVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCB7XG4gIG5ld05hbWU6IHN0cmluZztcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWVMaXN0U2VydmljZTogTmFtZUxpc3RTZXJ2aWNlKSB7fVxuXG4gIC8qXG4gICAqIEBwYXJhbSBuZXduYW1lICBhbnkgdGV4dCBhcyBpbnB1dC5cbiAgICogQHJldHVybnMgcmV0dXJuIGZhbHNlIHRvIHByZXZlbnQgZGVmYXVsdCBmb3JtIHN1Ym1pdCBiZWhhdmlvciB0byByZWZyZXNoIHRoZSBwYWdlLlxuICAgKi9cbiAgYWRkTmFtZSgpOiBib29sZWFuIHtcbiAgICB0aGlzLm5hbWVMaXN0U2VydmljZS5hZGQodGhpcy5uZXdOYW1lKTtcbiAgICB0aGlzLm5ld05hbWUgPSAnJztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==
