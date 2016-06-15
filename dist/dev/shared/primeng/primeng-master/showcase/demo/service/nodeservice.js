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
var NodeService = (function () {
    function NodeService(http) {
        this.http = http;
    }
    NodeService.prototype.getFiles = function () {
        return this.http.get('showcase/resources/data/files.json')
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    NodeService.prototype.getLazyFiles = function () {
        return this.http.get('showcase/resources/data/files-lazy.json')
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    NodeService.prototype.getFilesystem = function () {
        return this.http.get('showcase/resources/data/filesystem.json')
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    NodeService.prototype.getLazyFilesystem = function () {
        return this.http.get('showcase/resources/data/filesystem-lazy.json')
            .toPromise()
            .then(function (res) { return res.json().data; })
            .then(function (data) { return data; });
    };
    NodeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NodeService);
    return NodeService;
}());
exports.NodeService = NodeService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vc2VydmljZS9ub2Rlc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLHFCQUE2QixlQUFlLENBQUMsQ0FBQTtBQUk3QztJQUVJLHFCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFHLENBQUM7SUFFbEMsOEJBQVEsR0FBUjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQzthQUM3QyxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBYSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUE1QixDQUE0QixDQUFDO2FBQ3pDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGtDQUFZLEdBQVo7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUM7YUFDbEQsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQWEsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBNUIsQ0FBNEIsQ0FBQzthQUN6QyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDO2FBQ2xELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFhLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQTVCLENBQTRCLENBQUM7YUFDekMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsdUNBQWlCLEdBQWpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxDQUFDO2FBQ3ZELFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFhLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQTVCLENBQTRCLENBQUM7YUFDekMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBL0JMO1FBQUMsaUJBQVUsRUFBRTs7bUJBQUE7SUFnQ2Isa0JBQUM7QUFBRCxDQS9CQSxBQStCQyxJQUFBO0FBL0JZLG1CQUFXLGNBK0J2QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vc2VydmljZS9ub2Rlc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0h0dHAsIFJlc3BvbnNlfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCB7VHJlZU5vZGV9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL3RyZWVub2RlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vZGVTZXJ2aWNlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHt9XG5cbiAgICBnZXRGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ3Nob3djYXNlL3Jlc291cmNlcy9kYXRhL2ZpbGVzLmpzb24nKVxuICAgICAgICAgICAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IDxUcmVlTm9kZVtdPiByZXMuanNvbigpLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4geyByZXR1cm4gZGF0YTsgfSk7XG4gICAgfVxuICAgIFxuICAgIGdldExhenlGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ3Nob3djYXNlL3Jlc291cmNlcy9kYXRhL2ZpbGVzLWxhenkuanNvbicpXG4gICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gPFRyZWVOb2RlW10+IHJlcy5qc29uKCkuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7IHJldHVybiBkYXRhOyB9KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0RmlsZXN5c3RlbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ3Nob3djYXNlL3Jlc291cmNlcy9kYXRhL2ZpbGVzeXN0ZW0uanNvbicpXG4gICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gPFRyZWVOb2RlW10+IHJlcy5qc29uKCkuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7IHJldHVybiBkYXRhOyB9KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0TGF6eUZpbGVzeXN0ZW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdzaG93Y2FzZS9yZXNvdXJjZXMvZGF0YS9maWxlc3lzdGVtLWxhenkuanNvbicpXG4gICAgICAgICAgICAgICAgICAgIC50b1Byb21pc2UoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gPFRyZWVOb2RlW10+IHJlcy5qc29uKCkuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7IHJldHVybiBkYXRhOyB9KTtcbiAgICB9XG59Il19
