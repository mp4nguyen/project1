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
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var inputtextarea_1 = require('../../../components/inputtextarea/inputtextarea');
var button_1 = require('../../../components/button/button');
var dropdown_1 = require('../../../components/dropdown/dropdown');
var listbox_1 = require('../../../components/listbox/listbox');
var dialog_1 = require('../../../components/dialog/dialog');
var panel_1 = require('../../../components/panel/panel');
var datatable_1 = require('../../../components/datatable/datatable');
var datagrid_1 = require('../../../components/datagrid/datagrid');
var autocomplete_1 = require('../../../components/autocomplete/autocomplete');
var calendar_1 = require('../../../components/calendar/calendar');
var splitbutton_1 = require('../../../components/splitbutton/splitbutton');
var splitbuttonitem_1 = require('../../../components/splitbutton/splitbuttonitem');
var password_1 = require('../../../components/password/password');
var radiobutton_1 = require('../../../components/radiobutton/radiobutton');
var linechart_1 = require('../../../components/chart/linechart/linechart');
var tree_1 = require('../../../components/tree/tree');
var menu_1 = require('../../../components/menu/menu');
var panelmenu_1 = require('../../../components/panelmenu/panelmenu');
var picklist_1 = require('../../../components/picklist/picklist');
var carousel_1 = require('../../../components/carousel/carousel');
var orderlist_1 = require('../../../components/orderlist/orderlist');
var uitreenode_1 = require('../../../components/tree/uitreenode');
var treenodetemplateloader_1 = require('../../../components/tree/treenodetemplateloader');
var header_1 = require('../../../components/common/header');
var column_1 = require('../../../components/column/column');
var carservice_1 = require('../service/carservice');
var nodeservice_1 = require('../service/nodeservice');
var countryservice_1 = require('../service/countryservice');
var http_1 = require('angular2/http');
var ResponsiveDemo = (function () {
    function ResponsiveDemo(carService, countryService, nodeService) {
        this.carService = carService;
        this.countryService = countryService;
        this.nodeService = nodeService;
        this.display = false;
        this.cars2 = [
            { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
            { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
            { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
            { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
            { vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
            { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
            { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
            { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
            { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
        ];
        this.cities = [];
        this.cities.push({ label: 'Select Cities', value: 'Select Cities' });
        this.cities.push({ label: 'New York', value: 'New York' });
        this.cities.push({ label: 'Rome', value: 'Rome' });
        this.cities.push({ label: 'London', value: 'London' });
        this.cities.push({ label: 'Istanbul', value: 'Istanbul' });
        this.cities.push({ label: 'Paris', value: 'Paris' });
        this.options = [];
        this.options.push({ label: 'Option 1', value: 'Option 1' });
        this.options.push({ label: 'Option 2', value: 'Option 2' });
        this.options.push({ label: 'Option 3', value: 'Option 3' });
        this.options.push({ label: 'Option 4', value: 'Option 4' });
        this.options.push({ label: 'Option 5', value: 'Option 5' });
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fillColor: 'rgba(220,220,220,0.2)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    fillColor: 'rgba(151,187,205,0.2)',
                    strokeColor: 'rgba(151,187,205,1)',
                    pointColor: 'rgba(151,187,205,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
    }
    ResponsiveDemo.prototype.showDialog = function () {
        this.display = true;
    };
    ResponsiveDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsMedium().then(function (cars) { return _this.cars = cars; });
        this.nodeService.getFiles().then(function (files) { return _this.files = files; });
        this.carService.getCarsSmall().then(function (cars1) { return _this.cars1 = cars1; });
        this.carService.getCarsSmall().then(function (cars3) { return _this.sourceCars = cars3; });
        this.targetCars = [];
        this.items1 = [{
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
        this.items2 = [
            {
                label: 'File',
                icon: 'fa-file-o',
                items: [{
                        label: 'New',
                        icon: 'fa-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    { label: 'Undo', icon: 'fa-mail-forward' },
                    { label: 'Redo', icon: 'fa-mail-reply' }
                ]
            },
            {
                label: 'Help',
                icon: 'fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search',
                        icon: 'fa-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                        ] }
                ]
            },
            {
                label: 'Actions',
                icon: 'fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa-refresh',
                        items: [
                            { label: 'Save', icon: 'fa-save' },
                            { label: 'Update', icon: 'fa-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa-phone',
                        items: [
                            { label: 'Delete', icon: 'fa-minus' }
                        ]
                    }
                ]
            }
        ];
    };
    ResponsiveDemo.prototype.filterCountrySingle = function (event) {
        var _this = this;
        var query = event.query;
        this.countryService.getCountries().then(function (countries) {
            _this.filteredCountriesSingle = _this.filterCountry(query, countries);
        });
    };
    ResponsiveDemo.prototype.filterCountry = function (query, countries) {
        var filtered = [];
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    };
    ResponsiveDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/responsive/responsivedemo.html',
            directives: [panelmenu_1.PanelMenu, menu_1.Menu, picklist_1.PickList, carousel_1.Carousel, orderlist_1.OrderList, tree_1.Tree, treenodetemplateloader_1.TreeNodeTemplateLoader, uitreenode_1.UITreeNode, linechart_1.LineChart, radiobutton_1.RadioButton, password_1.Password, splitbutton_1.SplitButton, splitbuttonitem_1.SplitButtonItem, autocomplete_1.AutoComplete, header_1.Header, datagrid_1.DataGrid, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES, inputtext_1.InputText, inputtextarea_1.InputTextarea, button_1.Button, dropdown_1.Dropdown, listbox_1.Listbox, dialog_1.Dialog, panel_1.Panel, datatable_1.DataTable, column_1.Column, calendar_1.Calendar],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService, countryservice_1.CountryService, nodeservice_1.NodeService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService, countryservice_1.CountryService, nodeservice_1.NodeService])
    ], ResponsiveDemo);
    return ResponsiveDemo;
}());
exports.ResponsiveDemo = ResponsiveDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vcmVzcG9uc2l2ZS9yZXNwb25zaXZlZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBQzdELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLDhCQUE0QixpREFBaUQsQ0FBQyxDQUFBO0FBQzlFLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBRS9ELHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHNCQUFvQixpQ0FBaUMsQ0FBQyxDQUFBO0FBQ3RELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELDZCQUEyQiwrQ0FBK0MsQ0FBQyxDQUFBO0FBQzNFLHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELDRCQUEwQiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQ3hFLGdDQUE4QixpREFBaUQsQ0FBQyxDQUFBO0FBQ2hGLHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELDRCQUEwQiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQ3hFLDBCQUF3QiwrQ0FBK0MsQ0FBQyxDQUFBO0FBQ3hFLHFCQUFtQiwrQkFBK0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUFtQiwrQkFBK0IsQ0FBQyxDQUFBO0FBQ25ELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBRWxFLDJCQUF5QixxQ0FBcUMsQ0FBQyxDQUFBO0FBQy9ELHVDQUFxQyxpREFBaUQsQ0FBQyxDQUFBO0FBQ3ZGLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBRXpELDJCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELDRCQUEwQix3QkFBd0IsQ0FBQyxDQUFBO0FBQ25ELCtCQUE2QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3pELHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQVFoRDtJQTRDSSx3QkFBb0IsVUFBc0IsRUFBVSxjQUE4QixFQUFVLFdBQXdCO1FBQWhHLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXhCcEgsWUFBTyxHQUFZLEtBQUssQ0FBQztRQXlCckIsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQztZQUMzRCxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7WUFDMUQsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDO1lBQzNELEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQztZQUM5RCxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7WUFDdkQsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDO1lBQzVELEVBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQztZQUM1RCxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7WUFDL0QsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDO1NBQzlELENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxlQUFlLEVBQUUsS0FBSyxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENB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Qyx1QkFBVSxFQUFDLCtCQUFjLEVBQUMseUJBQVcsQ0FBQztTQUNwRSxDQUFDOztzQkFBQTtJQXNORixxQkFBQztBQUFELENBck5BLEFBcU5DLElBQUE7QUFyTlksc0JBQWMsaUJBcU4xQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vcmVzcG9uc2l2ZS9yZXNwb25zaXZlZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7SW5wdXRUZXh0fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2lucHV0dGV4dC9pbnB1dHRleHQnO1xuaW1wb3J0IHtJbnB1dFRleHRhcmVhfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2lucHV0dGV4dGFyZWEvaW5wdXR0ZXh0YXJlYSc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7RHJvcGRvd259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd24nO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9zZWxlY3RpdGVtJztcbmltcG9ydCB7TGlzdGJveH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9saXN0Ym94L2xpc3Rib3gnO1xuaW1wb3J0IHtEaWFsb2d9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZyc7XG5pbXBvcnQge1BhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3BhbmVsL3BhbmVsJztcbmltcG9ydCB7RGF0YVRhYmxlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RhdGF0YWJsZS9kYXRhdGFibGUnO1xuaW1wb3J0IHtEYXRhR3JpZH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kYXRhZ3JpZC9kYXRhZ3JpZCc7XG5pbXBvcnQge0F1dG9Db21wbGV0ZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7Q2FsZW5kYXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY2FsZW5kYXIvY2FsZW5kYXInO1xuaW1wb3J0IHtTcGxpdEJ1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9zcGxpdGJ1dHRvbi9zcGxpdGJ1dHRvbic7XG5pbXBvcnQge1NwbGl0QnV0dG9uSXRlbX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9zcGxpdGJ1dHRvbi9zcGxpdGJ1dHRvbml0ZW0nO1xuaW1wb3J0IHtQYXNzd29yZH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9wYXNzd29yZC9wYXNzd29yZCc7XG5pbXBvcnQge1JhZGlvQnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3JhZGlvYnV0dG9uL3JhZGlvYnV0dG9uJztcbmltcG9ydCB7TGluZUNoYXJ0fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NoYXJ0L2xpbmVjaGFydC9saW5lY2hhcnQnO1xuaW1wb3J0IHtUcmVlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUvdHJlZSc7XG5pbXBvcnQge01lbnV9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbWVudS9tZW51JztcbmltcG9ydCB7UGFuZWxNZW51fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3BhbmVsbWVudS9wYW5lbG1lbnUnO1xuaW1wb3J0IHtQaWNrTGlzdH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9waWNrbGlzdC9waWNrbGlzdCc7XG5pbXBvcnQge0Nhcm91c2VsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2Nhcm91c2VsL2Nhcm91c2VsJztcbmltcG9ydCB7T3JkZXJMaXN0fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL29yZGVybGlzdC9vcmRlcmxpc3QnO1xuaW1wb3J0IHtUcmVlTm9kZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvdHJlZW5vZGUnO1xuaW1wb3J0IHtVSVRyZWVOb2RlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUvdWl0cmVlbm9kZSc7XG5pbXBvcnQge1RyZWVOb2RlVGVtcGxhdGVMb2FkZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS90cmVlbm9kZXRlbXBsYXRlbG9hZGVyJztcbmltcG9ydCB7SGVhZGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbi9oZWFkZXInO1xuaW1wb3J0IHtDb2x1bW59IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29sdW1uL2NvbHVtbic7XG5pbXBvcnQge0Nhcn0gZnJvbSAnLi4vZG9tYWluL2Nhcic7XG5pbXBvcnQge0NhclNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvY2Fyc2VydmljZSc7XG5pbXBvcnQge05vZGVTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL25vZGVzZXJ2aWNlJztcbmltcG9ydCB7Q291bnRyeVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvY291bnRyeXNlcnZpY2UnO1xuaW1wb3J0IHtIVFRQX1BST1ZJREVSU30gICAgZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9tZW51bW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vcmVzcG9uc2l2ZS9yZXNwb25zaXZlZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbUGFuZWxNZW51LE1lbnUsUGlja0xpc3QsQ2Fyb3VzZWwsT3JkZXJMaXN0LFRyZWUsVHJlZU5vZGVUZW1wbGF0ZUxvYWRlcixVSVRyZWVOb2RlLExpbmVDaGFydCxSYWRpb0J1dHRvbixQYXNzd29yZCxTcGxpdEJ1dHRvbixTcGxpdEJ1dHRvbkl0ZW0sQXV0b0NvbXBsZXRlLEhlYWRlcixEYXRhR3JpZCxUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFUyxJbnB1dFRleHQsSW5wdXRUZXh0YXJlYSxCdXR0b24sRHJvcGRvd24sTGlzdGJveCxEaWFsb2csUGFuZWwsRGF0YVRhYmxlLENvbHVtbixDYWxlbmRhcl0sXG4gICAgcHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlMsQ2FyU2VydmljZSxDb3VudHJ5U2VydmljZSxOb2RlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUmVzcG9uc2l2ZURlbW8gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY2l0aWVzOiBTZWxlY3RJdGVtW107XG5cbiAgICBmaWxlczogVHJlZU5vZGVbXTtcblxuICAgIHNvdXJjZUNhcnM6IENhcltdO1xuXG4gICAgdGFyZ2V0Q2FyczogQ2FyW107XG5cbiAgICBkYXRhOiBhbnk7XG5cbiAgICBzZWxlY3RlZENpdHk6IHN0cmluZztcblxuICAgIHZhbDogc3RyaW5nO1xuXG4gICAgb3B0aW9uczogU2VsZWN0SXRlbVtdO1xuXG4gICAgc2VsZWN0ZWRPcHRpb246IHN0cmluZztcblxuICAgIGRpc3BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNhcnM6IENhcltdO1xuXG4gICAgY2FyczE6IENhcltdO1xuXG4gICAgY2FyczI6IENhcltdO1xuXG4gICAgY2FyczM6IENhcltdO1xuXG4gICAgZGF0ZTogc3RyaW5nO1xuXG4gICAgdGV4dDogc3RyaW5nO1xuXG4gICAgZmlsdGVyZWRDb3VudHJpZXNTaW5nbGU6IGFueVtdO1xuICAgIFxuICAgIGl0ZW1zMTogTWVudUl0ZW1bXTtcbiAgICBcbiAgICBpdGVtczI6IE1lbnVJdGVtW107XG5cbiAgICBzaG93RGlhbG9nKCkge1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FyU2VydmljZTogQ2FyU2VydmljZSwgcHJpdmF0ZSBjb3VudHJ5U2VydmljZTogQ291bnRyeVNlcnZpY2UsIHByaXZhdGUgbm9kZVNlcnZpY2U6IE5vZGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuY2FyczIgPSBbXG4gICAgICAgICAgICB7dmluOiAncjMyNzhyMicsIHllYXI6IDIwMTAsIGJyYW5kOiAnQXVkaScsIGNvbG9yOiAnQmxhY2snfSxcbiAgICAgICAgICAgIHt2aW46ICdqaHRvMmcyJywgeWVhcjogMjAxNSwgYnJhbmQ6ICdCTVcnLCBjb2xvcjogJ1doaXRlJ30sXG4gICAgICAgICAgICB7dmluOiAnaDQ1M3c1NCcsIHllYXI6IDIwMTIsIGJyYW5kOiAnSG9uZGEnLCBjb2xvcjogJ0JsdWUnfSxcbiAgICAgICAgICAgIHt2aW46ICdnNDNnd3dnJywgeWVhcjogMTk5OCwgYnJhbmQ6ICdSZW5hdWx0JywgY29sb3I6ICdXaGl0ZSd9LFxuICAgICAgICAgICAge3ZpbjogJ2dmNDV3ZzUnLCB5ZWFyOiAyMDExLCBicmFuZDogJ1ZXJywgY29sb3I6ICdSZWQnfSxcbiAgICAgICAgICAgIHt2aW46ICdiaHY1eTV3JywgeWVhcjogMjAxNSwgYnJhbmQ6ICdKYWd1YXInLCBjb2xvcjogJ0JsdWUnfSxcbiAgICAgICAgICAgIHt2aW46ICd5Ync1ZnNkJywgeWVhcjogMjAxMiwgYnJhbmQ6ICdGb3JkJywgY29sb3I6ICdZZWxsb3cnfSxcbiAgICAgICAgICAgIHt2aW46ICc0NTY2NWU1JywgeWVhcjogMjAxMSwgYnJhbmQ6ICdNZXJjZWRlcycsIGNvbG9yOiAnQnJvd24nfSxcbiAgICAgICAgICAgIHt2aW46ICdoZTZzYjV2JywgeWVhcjogMjAxNSwgYnJhbmQ6ICdGb3JkJywgY29sb3I6ICdCbGFjayd9XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5jaXRpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh7bGFiZWw6J1NlbGVjdCBDaXRpZXMnLCB2YWx1ZTonU2VsZWN0IENpdGllcyd9KTtcbiAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh7bGFiZWw6J05ldyBZb3JrJywgdmFsdWU6J05ldyBZb3JrJ30pO1xuICAgICAgICB0aGlzLmNpdGllcy5wdXNoKHtsYWJlbDonUm9tZScsIHZhbHVlOidSb21lJ30pO1xuICAgICAgICB0aGlzLmNpdGllcy5wdXNoKHtsYWJlbDonTG9uZG9uJywgdmFsdWU6J0xvbmRvbid9KTtcbiAgICAgICAgdGhpcy5jaXRpZXMucHVzaCh7bGFiZWw6J0lzdGFuYnVsJywgdmFsdWU6J0lzdGFuYnVsJ30pO1xuICAgICAgICB0aGlzLmNpdGllcy5wdXNoKHtsYWJlbDonUGFyaXMnLCB2YWx1ZTonUGFyaXMnfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gW107XG4gICAgICAgIHRoaXMub3B0aW9ucy5wdXNoKHtsYWJlbDonT3B0aW9uIDEnLCB2YWx1ZTonT3B0aW9uIDEnfSk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5wdXNoKHtsYWJlbDonT3B0aW9uIDInLCB2YWx1ZTonT3B0aW9uIDInfSk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5wdXNoKHtsYWJlbDonT3B0aW9uIDMnLCB2YWx1ZTonT3B0aW9uIDMnfSk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5wdXNoKHtsYWJlbDonT3B0aW9uIDQnLCB2YWx1ZTonT3B0aW9uIDQnfSk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5wdXNoKHtsYWJlbDonT3B0aW9uIDUnLCB2YWx1ZTonT3B0aW9uIDUnfSk7XG5cbiAgICAgICAgdGhpcy5kYXRhID0ge1xuICAgICAgICAgICAgbGFiZWxzOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseSddLFxuICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTXkgRmlyc3QgZGF0YXNldCcsXG4gICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogJ3JnYmEoMjIwLDIyMCwyMjAsMC4yKScsXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZUNvbG9yOiAncmdiYSgyMjAsMjIwLDIyMCwxKScsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6ICdyZ2JhKDIyMCwyMjAsMjIwLDEpJyxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodEZpbGw6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6ICdyZ2JhKDIyMCwyMjAsMjIwLDEpJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogWzY1LCA1OSwgODAsIDgxLCA1NiwgNTUsIDQwXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ015IFNlY29uZCBkYXRhc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiAncmdiYSgxNTEsMTg3LDIwNSwwLjIpJyxcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICdyZ2JhKDE1MSwxODcsMjA1LDEpJyxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRDb2xvcjogJ3JnYmEoMTUxLDE4NywyMDUsMSknLFxuICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICBwb2ludEhpZ2hsaWdodFN0cm9rZTogJ3JnYmEoMTUxLDE4NywyMDUsMSknLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbMjgsIDQ4LCA0MCwgMTksIDg2LCAyNywgOTBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2FyU2VydmljZS5nZXRDYXJzTWVkaXVtKCkudGhlbihjYXJzID0+IHRoaXMuY2FycyA9IGNhcnMpO1xuICAgICAgICB0aGlzLm5vZGVTZXJ2aWNlLmdldEZpbGVzKCkudGhlbihmaWxlcyA9PiB0aGlzLmZpbGVzID0gZmlsZXMpO1xuICAgICAgICB0aGlzLmNhclNlcnZpY2UuZ2V0Q2Fyc1NtYWxsKCkudGhlbihjYXJzMSA9PiB0aGlzLmNhcnMxID0gY2FyczEpO1xuICAgICAgICB0aGlzLmNhclNlcnZpY2UuZ2V0Q2Fyc1NtYWxsKCkudGhlbihjYXJzMyA9PiB0aGlzLnNvdXJjZUNhcnMgPSBjYXJzMyk7XG4gICAgICAgIHRoaXMudGFyZ2V0Q2FycyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pdGVtczEgPSBbe1xuICAgICAgICAgICAgbGFiZWw6ICdGaWxlJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAge2xhYmVsOiAnTmV3JywgaWNvbjogJ2ZhLXBsdXMnfSxcbiAgICAgICAgICAgICAgICB7bGFiZWw6ICdPcGVuJywgaWNvbjogJ2ZhLWRvd25sb2FkJ31cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdFZGl0JyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAge2xhYmVsOiAnVW5kbycsIGljb246ICdmYS1yZWZyZXNoJ30sXG4gICAgICAgICAgICAgICAge2xhYmVsOiAnUmVkbycsIGljb246ICdmYS1yZXBlYXQnfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaXRlbXMyID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnRmlsZScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhLWZpbGUtbycsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ05ldycsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2ZhLXBsdXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdQcm9qZWN0J30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnT3RoZXInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnT3Blbid9LFxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdRdWl0J31cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnRWRpdCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhLWVkaXQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1VuZG8nLCBpY29uOiAnZmEtbWFpbC1mb3J3YXJkJ30sXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1JlZG8nLCBpY29uOiAnZmEtbWFpbC1yZXBseSd9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0hlbHAnLFxuICAgICAgICAgICAgICAgIGljb246ICdmYS1xdWVzdGlvbicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdDb250ZW50cydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTZWFyY2gnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmYS1zZWFyY2gnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1RleHQnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1dvcmtzcGFjZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0ZpbGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdBY3Rpb25zJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnZmEtZ2VhcicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdFZGl0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmYS1yZWZyZXNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnU2F2ZScsIGljb246ICdmYS1zYXZlJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnVXBkYXRlJywgaWNvbjogJ2ZhLXNhdmUnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdPdGhlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZmEtcGhvbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdEZWxldGUnLCBpY29uOiAnZmEtbWludXMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGZpbHRlckNvdW50cnlTaW5nbGUoZXZlbnQpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gZXZlbnQucXVlcnk7XG4gICAgICAgIHRoaXMuY291bnRyeVNlcnZpY2UuZ2V0Q291bnRyaWVzKCkudGhlbihjb3VudHJpZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZENvdW50cmllc1NpbmdsZSA9IHRoaXMuZmlsdGVyQ291bnRyeShxdWVyeSwgY291bnRyaWVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlsdGVyQ291bnRyeShxdWVyeSwgY291bnRyaWVzOiBhbnlbXSk6YW55W10ge1xuICAgICAgICAvL2luIGEgcmVhbCBhcHBsaWNhdGlvbiwgbWFrZSBhIHJlcXVlc3QgdG8gYSByZW1vdGUgdXJsIHdpdGggdGhlIHF1ZXJ5IGFuZCByZXR1cm4gZmlsdGVyZWQgcmVzdWx0cywgZm9yIGRlbW8gd2UgZmlsdGVyIGF0IGNsaWVudCBzaWRlXG4gICAgICAgIGxldCBmaWx0ZXJlZCA6IGFueVtdID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb3VudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gY291bnRyaWVzW2ldO1xuICAgICAgICAgICAgaWYoY291bnRyeS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeS50b0xvd2VyQ2FzZSgpKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWQucHVzaChjb3VudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgfVxuXG59XG4iXX0=
