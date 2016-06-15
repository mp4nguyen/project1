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
var multiselect_1 = require('../../../components/multiselect/multiselect');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var MultiSelectDemo = (function () {
    function MultiSelectDemo() {
        this.selectedCars = [];
        this.cars = [];
        this.cars.push({ label: 'Audi', value: 'Audi' });
        this.cars.push({ label: 'BMW', value: 'BMW' });
        this.cars.push({ label: 'Fiat', value: 'Fiat' });
        this.cars.push({ label: 'Ford', value: 'Ford' });
        this.cars.push({ label: 'Honda', value: 'Honda' });
        this.cars.push({ label: 'Jaguar', value: 'Jaguar' });
        this.cars.push({ label: 'Mercedes', value: 'Mercedes' });
        this.cars.push({ label: 'Renault', value: 'Renault' });
        this.cars.push({ label: 'VW', value: 'VW' });
        this.cars.push({ label: 'Volvo', value: 'Volvo' });
    }
    MultiSelectDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/multiselect/multiselectdemo.html',
            directives: [multiselect_1.MultiSelect, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MultiSelectDemo);
    return MultiSelectDemo;
}());
exports.MultiSelectDemo = MultiSelectDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbXVsdGlzZWxlY3QvbXVsdGlzZWxlY3RkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsNEJBQTBCLDZDQUE2QyxDQUFDLENBQUE7QUFDeEUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFFekQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFNSTtRQUZBLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBR3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUF0Qkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLGdEQUFnRDtZQUM3RCxVQUFVLEVBQUUsQ0FBQyx5QkFBVyxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxlQUFNLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUN0RixDQUFDOzt1QkFBQTtJQW9CRixzQkFBQztBQUFELENBbkJBLEFBbUJDLElBQUE7QUFuQlksdUJBQWUsa0JBbUIzQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbXVsdGlzZWxlY3QvbXVsdGlzZWxlY3RkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtNdWx0aVNlbGVjdH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9tdWx0aXNlbGVjdC9tdWx0aXNlbGVjdCc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9zZWxlY3RpdGVtJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL211bHRpc2VsZWN0L211bHRpc2VsZWN0ZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbTXVsdGlTZWxlY3QsVGFiUGFuZWwsVGFiVmlldyxCdXR0b24sQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdERlbW8ge1xuXG4gICAgY2FyczogU2VsZWN0SXRlbVtdO1xuXG4gICAgc2VsZWN0ZWRDYXJzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FycyA9IFtdO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdBdWRpJywgdmFsdWU6ICdBdWRpJ30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdCTVcnLCB2YWx1ZTogJ0JNVyd9KTtcbiAgICAgICAgdGhpcy5jYXJzLnB1c2goe2xhYmVsOiAnRmlhdCcsIHZhbHVlOiAnRmlhdCd9KTtcbiAgICAgICAgdGhpcy5jYXJzLnB1c2goe2xhYmVsOiAnRm9yZCcsIHZhbHVlOiAnRm9yZCd9KTtcbiAgICAgICAgdGhpcy5jYXJzLnB1c2goe2xhYmVsOiAnSG9uZGEnLCB2YWx1ZTogJ0hvbmRhJ30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdKYWd1YXInLCB2YWx1ZTogJ0phZ3Vhcid9KTtcbiAgICAgICAgdGhpcy5jYXJzLnB1c2goe2xhYmVsOiAnTWVyY2VkZXMnLCB2YWx1ZTogJ01lcmNlZGVzJ30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdSZW5hdWx0JywgdmFsdWU6ICdSZW5hdWx0J30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdWVycsIHZhbHVlOiAnVlcnfSk7XG4gICAgICAgIHRoaXMuY2Fycy5wdXNoKHtsYWJlbDogJ1ZvbHZvJywgdmFsdWU6ICdWb2x2byd9KTtcbiAgICB9XG59Il19
