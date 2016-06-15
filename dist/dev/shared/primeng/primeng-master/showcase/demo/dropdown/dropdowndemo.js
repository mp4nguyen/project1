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
var dropdown_1 = require('../../../components/dropdown/dropdown');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var DropdownDemo = (function () {
    function DropdownDemo() {
        this.selectedCar = 'BMW';
        this.cities = [];
        this.cities.push({ label: 'Select City', value: '' });
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
    DropdownDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/dropdown/dropdown.html',
            directives: [dropdown_1.Dropdown, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DropdownDemo);
    return DropdownDemo;
}());
exports.DropdownDemo = DropdownDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZHJvcGRvd24vZHJvcGRvd25kZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0QsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFFekQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFVSTtRQUZBLGdCQUFXLEdBQVcsS0FBSyxDQUFDO1FBR3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFsQ0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxVQUFVLEVBQUUsQ0FBQyxtQkFBUSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxlQUFNLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUNuRixDQUFDOztvQkFBQTtJQWlDRixtQkFBQztBQUFELENBaENBLEFBZ0NDLElBQUE7QUFoQ1ksb0JBQVksZUFnQ3hCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9kcm9wZG93bi9kcm9wZG93bmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0Ryb3Bkb3dufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge1NlbGVjdEl0ZW19IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL3NlbGVjdGl0ZW0nO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vZHJvcGRvd24vZHJvcGRvd24uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0Ryb3Bkb3duLFRhYlBhbmVsLFRhYlZpZXcsQnV0dG9uLENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25EZW1vIHtcblxuICAgIGNpdGllczogU2VsZWN0SXRlbVtdO1xuXG4gICAgc2VsZWN0ZWRDaXR5OiBzdHJpbmc7XG5cbiAgICBjYXJzOiBTZWxlY3RJdGVtW107XG5cbiAgICBzZWxlY3RlZENhcjogc3RyaW5nID0gJ0JNVyc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jaXRpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh7bGFiZWw6J1NlbGVjdCBDaXR5JywgdmFsdWU6Jyd9KTtcbiAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh7bGFiZWw6J05ldyBZb3JrJywgdmFsdWU6J05ldyBZb3JrJ30pO1xuICAgICAgICB0aGlzLmNpdGllcy5wdXNoKHtsYWJlbDonUm9tZScsIHZhbHVlOidSb21lJ30pO1xuICAgICAgICB0aGlzLmNpdGllcy5wdXNoKHtsYWJlbDonTG9uZG9uJywgdmFsdWU6J0xvbmRvbid9KTtcbiAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh7bGFiZWw6J0lzdGFuYnVsJywgdmFsdWU6J0lzdGFuYnVsJ30pO1xuICAgICAgICB0aGlzLmNpdGllcy5wdXNoKHtsYWJlbDonUGFyaXMnLCB2YWx1ZTonUGFyaXMnfSk7XG5cbiAgICAgICAgdGhpcy5jYXJzID0gW107XG4gICAgICAgIHRoaXMuY2Fycy5wdXNoKHtsYWJlbDogJ0F1ZGknLCB2YWx1ZTogJ0F1ZGknfSk7XG4gICAgICAgIHRoaXMuY2Fycy5wdXNoKHtsYWJlbDogJ0JNVycsIHZhbHVlOiAnQk1XJ30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdGaWF0JywgdmFsdWU6ICdGaWF0J30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdGb3JkJywgdmFsdWU6ICdGb3JkJ30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdIb25kYScsIHZhbHVlOiAnSG9uZGEnfSk7XG4gICAgICAgIHRoaXMuY2Fycy5wdXNoKHtsYWJlbDogJ0phZ3VhcicsIHZhbHVlOiAnSmFndWFyJ30pO1xuICAgICAgICB0aGlzLmNhcnMucHVzaCh7bGFiZWw6ICdNZXJjZWRlcycsIHZhbHVlOiAnTWVyY2VkZXMnfSk7XG4gICAgICAgIHRoaXMuY2Fycy5wdXNoKHtsYWJlbDogJ1JlbmF1bHQnLCB2YWx1ZTogJ1JlbmF1bHQnfSk7XG4gICAgICAgIHRoaXMuY2Fycy5wdXNoKHtsYWJlbDogJ1ZXJywgdmFsdWU6ICdWVyd9KTtcbiAgICAgICAgdGhpcy5jYXJzLnB1c2goe2xhYmVsOiAnVm9sdm8nLCB2YWx1ZTogJ1ZvbHZvJ30pO1xuICAgIH1cbiAgICBcbn0iXX0=
