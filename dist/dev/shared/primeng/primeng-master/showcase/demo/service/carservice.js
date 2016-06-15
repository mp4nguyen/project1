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
var http_1 = require('angular2/http');
var CarService = (function () {
    function CarService(http) {
        this.http = http;
    }
    CarService.prototype.getCarsSmall = function () {
        return this.http.get('showcase/resources/data/cars-small.json')
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    CarService.prototype.getCarsMedium = function () {
        return this.http.get('showcase/resources/data/cars-medium.json')
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    CarService.prototype.getCarsLarge = function () {
        return this.http.get('showcase/resources/data/cars-large.json')
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    CarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CarService);
    return CarService;
}());
exports.CarService = CarService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vc2VydmljZS9jYXJzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMscUJBQTZCLGVBQWUsQ0FBQyxDQUFBO0FBSTdDO0lBRUksb0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUcsQ0FBQztJQUVsQyxpQ0FBWSxHQUFaO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDO2FBQ2xELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQXZCLENBQXVCLENBQUM7YUFDcEMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsa0NBQWEsR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQzthQUNuRCxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBUSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUF2QixDQUF1QixDQUFDO2FBQ3BDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGlDQUFZLEdBQVo7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUM7YUFDbEQsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQVEsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBdkIsQ0FBdUIsQ0FBQzthQUNwQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUF4Qkw7UUFBQyxpQkFBVSxFQUFFOztrQkFBQTtJQXlCYixpQkFBQztBQUFELENBeEJBLEFBd0JDLElBQUE7QUF4Qlksa0JBQVUsYUF3QnRCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9zZXJ2aWNlL2NhcnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtIdHRwLCBSZXNwb25zZX0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge0Nhcn0gZnJvbSAnLi4vZG9tYWluL2Nhcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXJTZXJ2aWNlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHt9XG5cbiAgICBnZXRDYXJzU21hbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdzaG93Y2FzZS9yZXNvdXJjZXMvZGF0YS9jYXJzLXNtYWxsLmpzb24nKVxuICAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IDxDYXJbXT4gcmVzLmpzb24oKS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHsgcmV0dXJuIGRhdGE7IH0pO1xuICAgIH1cblxuICAgIGdldENhcnNNZWRpdW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdzaG93Y2FzZS9yZXNvdXJjZXMvZGF0YS9jYXJzLW1lZGl1bS5qc29uJylcbiAgICAgICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiA8Q2FyW10+IHJlcy5qc29uKCkuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7IHJldHVybiBkYXRhOyB9KTtcbiAgICB9XG5cbiAgICBnZXRDYXJzTGFyZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdzaG93Y2FzZS9yZXNvdXJjZXMvZGF0YS9jYXJzLWxhcmdlLmpzb24nKVxuICAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IDxDYXJbXT4gcmVzLmpzb24oKS5kYXRhKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHsgcmV0dXJuIGRhdGE7IH0pO1xuICAgIH1cbn0iXX0=
