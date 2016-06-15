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
var autocomplete_1 = require('../../../components/autocomplete/autocomplete');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var countryservice_1 = require('../service/countryservice');
var router_deprecated_1 = require('angular2/router-deprecated');
var http_1 = require('angular2/http');
var AutoCompleteDemo = (function () {
    function AutoCompleteDemo(countryService) {
        this.countryService = countryService;
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
    }
    AutoCompleteDemo.prototype.filterCountrySingle = function (event) {
        var _this = this;
        var query = event.query;
        this.countryService.getCountries().then(function (countries) {
            _this.filteredCountriesSingle = _this.filterCountry(query, countries);
        });
    };
    AutoCompleteDemo.prototype.filterCountryMultiple = function (event) {
        var _this = this;
        var query = event.query;
        this.countryService.getCountries().then(function (countries) {
            _this.filteredCountriesMultiple = _this.filterCountry(query, countries);
        });
    };
    AutoCompleteDemo.prototype.filterCountry = function (query, countries) {
        var filtered = [];
        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    };
    AutoCompleteDemo.prototype.filterBrands = function (event) {
        this.filteredBrands = [];
        for (var i = 0; i < this.brands.length; i++) {
            var brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    };
    AutoCompleteDemo.prototype.handleDropdownClick = function () {
        var _this = this;
        this.filteredBrands = [];
        setTimeout(function () {
            _this.filteredBrands = _this.brands;
        }, 100);
    };
    AutoCompleteDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/autocomplete/autocompletedemo.html',
            directives: [autocomplete_1.AutoComplete, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, countryservice_1.CountryService]
        }), 
        __metadata('design:paramtypes', [countryservice_1.CountryService])
    ], AutoCompleteDemo);
    return AutoCompleteDemo;
}());
exports.AutoCompleteDemo = AutoCompleteDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZWRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyw2QkFBMkIsK0NBQStDLENBQUMsQ0FBQTtBQUMzRSxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCwrQkFBNkIsMkJBQTJCLENBQUMsQ0FBQTtBQUN6RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFPaEQ7SUFnQkksMEJBQW9CLGNBQThCO1FBQTlCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQU5sRCxXQUFNLEdBQWEsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQztJQU03QyxDQUFDO0lBRXZELDhDQUFtQixHQUFuQixVQUFvQixLQUFLO1FBQXpCLGlCQUtDO1FBSkcsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVM7WUFDN0MsS0FBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdEQUFxQixHQUFyQixVQUFzQixLQUFLO1FBQTNCLGlCQUtDO1FBSkcsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVM7WUFDN0MsS0FBSSxDQUFDLHlCQUF5QixHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHdDQUFhLEdBQWIsVUFBYyxLQUFLLEVBQUUsU0FBZ0I7UUFFakMsSUFBSSxRQUFRLEdBQVcsRUFBRSxDQUFDO1FBQzFCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsdUNBQVksR0FBWixVQUFhLEtBQUs7UUFDZCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCw4Q0FBbUIsR0FBbkI7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3pCLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQztRQUN0QyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDWCxDQUFDO0lBbEVMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSxrREFBa0Q7WUFDL0QsVUFBVSxFQUFFLENBQUMsMkJBQVksRUFBQyxpQkFBTyxFQUFDLG1CQUFRLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztZQUM3RSxTQUFTLEVBQUUsQ0FBQyxxQkFBYyxFQUFDLCtCQUFjLENBQUM7U0FDN0MsQ0FBQzs7d0JBQUE7SUErREYsdUJBQUM7QUFBRCxDQTlEQSxBQThEQyxJQUFBO0FBOURZLHdCQUFnQixtQkE4RDVCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7QXV0b0NvbXBsZXRlfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0NvdW50cnlTZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2NvdW50cnlzZXJ2aWNlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9ICAgIGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZWRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0F1dG9Db21wbGV0ZSxUYWJWaWV3LFRhYlBhbmVsLENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU10sXG4gICAgcHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlMsQ291bnRyeVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZURlbW8ge1xuXG4gICAgY291bnRyeTogYW55O1xuICAgIFxuICAgIGNvdW50cmllczogYW55W107XG4gICAgICAgIFxuICAgIGZpbHRlcmVkQ291bnRyaWVzU2luZ2xlOiBhbnlbXTtcbiAgICBcbiAgICBmaWx0ZXJlZENvdW50cmllc011bHRpcGxlOiBhbnlbXTtcbiAgICBcbiAgICBicmFuZHM6IHN0cmluZ1tdID0gWydBdWRpJywnQk1XJywnRmlhdCcsJ0ZvcmQnLCdIb25kYScsJ0phZ3VhcicsJ01lcmNlZGVzJywnUmVuYXVsdCcsJ1ZvbHZvJywnVlcnXTtcbiAgICBcbiAgICBmaWx0ZXJlZEJyYW5kczogYW55W107XG4gICAgXG4gICAgYnJhbmQ6IHN0cmluZztcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvdW50cnlTZXJ2aWNlOiBDb3VudHJ5U2VydmljZSkgeyB9XG4gICAgXG4gICAgZmlsdGVyQ291bnRyeVNpbmdsZShldmVudCkge1xuICAgICAgICBsZXQgcXVlcnkgPSBldmVudC5xdWVyeTsgICAgICAgIFxuICAgICAgICB0aGlzLmNvdW50cnlTZXJ2aWNlLmdldENvdW50cmllcygpLnRoZW4oY291bnRyaWVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRDb3VudHJpZXNTaW5nbGUgPSB0aGlzLmZpbHRlckNvdW50cnkocXVlcnksIGNvdW50cmllcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBmaWx0ZXJDb3VudHJ5TXVsdGlwbGUoZXZlbnQpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gZXZlbnQucXVlcnk7XG4gICAgICAgIHRoaXMuY291bnRyeVNlcnZpY2UuZ2V0Q291bnRyaWVzKCkudGhlbihjb3VudHJpZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZENvdW50cmllc011bHRpcGxlID0gdGhpcy5maWx0ZXJDb3VudHJ5KHF1ZXJ5LCBjb3VudHJpZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgZmlsdGVyQ291bnRyeShxdWVyeSwgY291bnRyaWVzOiBhbnlbXSk6YW55W10ge1xuICAgICAgICAvL2luIGEgcmVhbCBhcHBsaWNhdGlvbiwgbWFrZSBhIHJlcXVlc3QgdG8gYSByZW1vdGUgdXJsIHdpdGggdGhlIHF1ZXJ5IGFuZCByZXR1cm4gZmlsdGVyZWQgcmVzdWx0cywgZm9yIGRlbW8gd2UgZmlsdGVyIGF0IGNsaWVudCBzaWRlXG4gICAgICAgIGxldCBmaWx0ZXJlZCA6IGFueVtdID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb3VudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gY291bnRyaWVzW2ldO1xuICAgICAgICAgICAgaWYoY291bnRyeS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeS50b0xvd2VyQ2FzZSgpKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWQucHVzaChjb3VudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgfVxuICAgICAgICBcbiAgICBmaWx0ZXJCcmFuZHMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJlZEJyYW5kcyA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5icmFuZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBicmFuZCA9IHRoaXMuYnJhbmRzW2ldO1xuICAgICAgICAgICAgaWYoYnJhbmQudG9Mb3dlckNhc2UoKS5pbmRleE9mKGV2ZW50LnF1ZXJ5LnRvTG93ZXJDYXNlKCkpID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkQnJhbmRzLnB1c2goYnJhbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGhhbmRsZURyb3Bkb3duQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyZWRCcmFuZHMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIC8vbWltaWMgcmVtb3RlIGNhbGxcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkQnJhbmRzID0gdGhpcy5icmFuZHM7XG4gICAgICAgIH0sIDEwMClcbiAgICB9XG59Il19
