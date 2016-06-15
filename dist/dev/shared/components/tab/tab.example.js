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
var tabset_component_1 = require('./tabset.component');
var tab_component_1 = require('./tab.component');
var TabsSampleApp = (function () {
    function TabsSampleApp() {
        this.tabs = [
            { title: 'About', content: 'This is the About tab', routeName: 'DoctorList' },
            { title: 'Blog', content: 'This is our blog', routeName: 'DoctorList' },
            { title: 'Contact us', content: 'Contact us here', routeName: 'DoctorList' },
        ];
    }
    TabsSampleApp = __decorate([
        core_1.Component({
            selector: 'tabs-sample-app',
            directives: [tabset_component_1.TabsetComponent, tab_component_1.TabComponent],
            template: "\n<tabset>\n<tab title=\"First tab\" routeName=\"ClinicList\">\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magni quia ut harum facilis, ullam deleniti porro dignissimos quasi at molestiae sapiente natus, neque voluptatum ad consequuntur cupiditate nemo sunt.\n</tab>\n<tab *ngFor=\"#tab of tabs\" [title]=\"tab.title\" [routeName]=\"tab.routeName\">\n{{ tab.content }} </tab>\n</tabset>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], TabsSampleApp);
    return TabsSampleApp;
}());
exports.TabsSampleApp = TabsSampleApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL3RhYi90YWIuZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTRDLGVBQWUsQ0FBQyxDQUFBO0FBRTVELGlDQUE4QixvQkFBb0IsQ0FBQyxDQUFBO0FBQ25ELDhCQUEyQixpQkFBaUIsQ0FBQyxDQUFBO0FBb0I3QztJQUVFO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRztZQUNWLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFDLFlBQVksRUFBQztZQUMzRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBQyxZQUFZLEVBQUM7WUFDckUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUMsWUFBWSxFQUFDO1NBQy9FLENBQUM7SUFBQyxDQUFDO0lBdkJKO1FBQUMsZ0JBQVMsQ0FBQztZQUNYLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsVUFBVSxFQUFFLENBQUMsa0NBQWUsRUFBRSw0QkFBWSxDQUFDO1lBQzNDLFFBQVEsRUFDUiwrWkFRQztTQUNBLENBQUM7O3FCQUFBO0lBV0Ysb0JBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQVJZLHFCQUFhLGdCQVF6QixDQUFBIiwiZmlsZSI6InNoYXJlZC9jb21wb25lbnRzL3RhYi90YWIuZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LElucHV0LE91dHB1dCxPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVMsIEZPUk1fRElSRUNUSVZFUyxOZ0NsYXNzLE5nRm9ybX0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7VGFic2V0Q29tcG9uZW50fSBmcm9tICcuL3RhYnNldC5jb21wb25lbnQnO1xuaW1wb3J0IHtUYWJDb21wb25lbnR9IGZyb20gJy4vdGFiLmNvbXBvbmVudCc7XG5cblxuXG5AQ29tcG9uZW50KHtcbnNlbGVjdG9yOiAndGFicy1zYW1wbGUtYXBwJywgXG5kaXJlY3RpdmVzOiBbVGFic2V0Q29tcG9uZW50LCBUYWJDb21wb25lbnRdLCBcbnRlbXBsYXRlOiBcbmBcbjx0YWJzZXQ+XG48dGFiIHRpdGxlPVwiRmlyc3QgdGFiXCIgcm91dGVOYW1lPVwiQ2xpbmljTGlzdFwiPlxuTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIFF1aWJ1c2RhbSBtYWduaSBxdWlhIHV0IGhhcnVtIGZhY2lsaXMsIHVsbGFtIGRlbGVuaXRpIHBvcnJvIGRpZ25pc3NpbW9zIHF1YXNpIGF0IG1vbGVzdGlhZSBzYXBpZW50ZSBuYXR1cywgbmVxdWUgdm9sdXB0YXR1bSBhZCBjb25zZXF1dW50dXIgY3VwaWRpdGF0ZSBuZW1vIHN1bnQuXG48L3RhYj5cbjx0YWIgKm5nRm9yPVwiI3RhYiBvZiB0YWJzXCIgW3RpdGxlXT1cInRhYi50aXRsZVwiIFtyb3V0ZU5hbWVdPVwidGFiLnJvdXRlTmFtZVwiPlxue3sgdGFiLmNvbnRlbnQgfX0gPC90YWI+XG48L3RhYnNldD5cbmAgXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBUYWJzU2FtcGxlQXBwIHtcbiAgdGFiczogYW55O1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRhYnMgPSBbXG4gICAgICB7IHRpdGxlOiAnQWJvdXQnLCBjb250ZW50OiAnVGhpcyBpcyB0aGUgQWJvdXQgdGFiJyAscm91dGVOYW1lOidEb2N0b3JMaXN0J30sXG4gICAgICB7IHRpdGxlOiAnQmxvZycsIGNvbnRlbnQ6ICdUaGlzIGlzIG91ciBibG9nJyAscm91dGVOYW1lOidEb2N0b3JMaXN0J30sXG4gICAgICB7IHRpdGxlOiAnQ29udGFjdCB1cycsIGNvbnRlbnQ6ICdDb250YWN0IHVzIGhlcmUnICxyb3V0ZU5hbWU6J0RvY3Rvckxpc3QnfSxcbl07IH1cbn0iXX0=
