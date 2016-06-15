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
var listbox_1 = require('../../../components/listbox/listbox');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var ListboxDemo = (function () {
    function ListboxDemo() {
        this.selectedCar = 'BMW';
        this.cities = [];
        this.cities.push({ label: 'New York', value: 'New York' });
        this.cities.push({ label: 'Rome', value: 'Rome' });
        this.cities.push({ label: 'London', value: 'London' });
        this.cities.push({ label: 'Istanbul', value: 'Istanbul' });
        this.cities.push({ label: 'Paris', value: 'Paris' });
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
    ListboxDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/listbox/listboxdemo.html',
            directives: [listbox_1.Listbox, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ListboxDemo);
    return ListboxDemo;
}());
exports.ListboxDemo = ListboxDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbGlzdGJveC9saXN0Ym94ZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBRXpELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTTdEO0lBWUk7UUFGQSxnQkFBVyxHQUFXLEtBQUssQ0FBQztRQUd4QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFuQ0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHdDQUF3QztZQUNyRCxVQUFVLEVBQUUsQ0FBQyxpQkFBTyxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxlQUFNLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUNsRixDQUFDOzttQkFBQTtJQWlDRixrQkFBQztBQUFELENBaENBLEFBZ0NDLElBQUE7QUFoQ1ksbUJBQVcsY0FnQ3ZCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9saXN0Ym94L2xpc3Rib3hkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtMaXN0Ym94fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2xpc3Rib3gvbGlzdGJveCc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9zZWxlY3RpdGVtJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2xpc3Rib3gvbGlzdGJveGRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0xpc3Rib3gsVGFiUGFuZWwsVGFiVmlldyxCdXR0b24sQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0Ym94RGVtbyB7XG5cbiAgICBjaXRpZXM6IFNlbGVjdEl0ZW1bXTtcblxuICAgIHNlbGVjdGVkQ2l0eTogc3RyaW5nO1xuXG4gICAgc2VsZWN0ZWRDaXRpZXM6IHN0cmluZ1tdO1xuXG4gICAgY2FyczogU2VsZWN0SXRlbVtdO1xuXG4gICAgc2VsZWN0ZWRDYXI6IHN0cmluZyA9ICdCTVcnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2l0aWVzID0gW107XG4gICAgICAgIHRoaXMuY2l0aWVzLnB1c2goe2xhYmVsOidOZXcgWW9yaycsIHZhbHVlOidOZXcgWW9yayd9KTtcbiAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh7bGFiZWw6J1JvbWUnLCB2YWx1ZTonUm9tZSd9KTtcbiAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh7bGFiZWw6J0xvbmRvbicsIHZhbHVlOidMb25kb24nfSk7XG4gICAgICAgIHRoaXMuY2l0aWVzLnB1c2goe2xhYmVsOidJc3RhbmJ1bCcsIHZhbHVlOidJc3RhbmJ1bCd9KTtcbiAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh7bGFiZWw6J1BhcmlzJywgdmFsdWU6J1BhcmlzJ30pO1xuXG4gICAgICAgIHRoaXMuY2FycyA9IFtdO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdBdWRpJywgdmFsdWU6ICdBdWRpJ30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdCTVcnLCB2YWx1ZTogJ0JNVyd9KTtcbiAgICAgICAgdGhpcy5jYXJzLnB1c2goe2xhYmVsOiAnRmlhdCcsIHZhbHVlOiAnRmlhdCd9KTtcbiAgICAgICAgdGhpcy5jYXJzLnB1c2goe2xhYmVsOiAnRm9yZCcsIHZhbHVlOiAnRm9yZCd9KTtcbiAgICAgICAgdGhpcy5jYXJzLnB1c2goe2xhYmVsOiAnSG9uZGEnLCB2YWx1ZTogJ0hvbmRhJ30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdKYWd1YXInLCB2YWx1ZTogJ0phZ3Vhcid9KTtcbiAgICAgICAgdGhpcy5jYXJzLnB1c2goe2xhYmVsOiAnTWVyY2VkZXMnLCB2YWx1ZTogJ01lcmNlZGVzJ30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdSZW5hdWx0JywgdmFsdWU6ICdSZW5hdWx0J30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdWVycsIHZhbHVlOiAnVlcnfSk7XG4gICAgICAgIHRoaXMuY2Fycy5wdXNoKHtsYWJlbDogJ1ZvbHZvJywgdmFsdWU6ICdWb2x2byd9KTtcbiAgICB9XG59Il19
