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
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/throw');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/share');
var LoopBackAuth = (function () {
    function LoopBackAuth() {
        this.propsPrefix = '$LoopBack$';
        this.accessTokenId = this.load("accessTokenId");
        this.currentUserId = this.load("currentUserId");
        this.rememberMe = this.load("rememberMe");
        this.currentUserData = null;
    }
    LoopBackAuth.prototype.setRememberMe = function (value) {
        this.rememberMe = value;
        return this;
    };
    LoopBackAuth.prototype.getCurrentUserId = function () {
        return this.currentUserId;
    };
    LoopBackAuth.prototype.setCurrentUserData = function (data) {
        this.currentUserData = data;
        return this;
    };
    LoopBackAuth.prototype.getCurrentUserData = function () {
        return this.currentUserData;
    };
    LoopBackAuth.prototype.getAccessTokenId = function () {
        return this.accessTokenId;
    };
    LoopBackAuth.prototype.save = function () {
        var storage = this.rememberMe ? localStorage : sessionStorage;
        this.saveThis(storage, "accessTokenId", this.accessTokenId);
        this.saveThis(storage, "currentUserId", this.currentUserId);
        this.saveThis(storage, "rememberMe", this.rememberMe);
    };
    ;
    LoopBackAuth.prototype.setUser = function (accessTokenId, userId, userData) {
        this.accessTokenId = accessTokenId;
        this.currentUserId = userId;
        this.currentUserData = userData;
    };
    LoopBackAuth.prototype.clearUser = function () {
        this.accessTokenId = null;
        this.currentUserId = null;
        this.currentUserData = null;
    };
    LoopBackAuth.prototype.clearStorage = function () {
        this.saveThis(sessionStorage, "accessTokenId", null);
        this.saveThis(localStorage, "accessTokenId", null);
        this.saveThis(sessionStorage, "currentUserId", null);
        this.saveThis(localStorage, "currentUserId", null);
        this.saveThis(sessionStorage, "rememberMe", null);
        this.saveThis(localStorage, "rememberMe", null);
    };
    ;
    LoopBackAuth.prototype.saveThis = function (storage, name, value) {
        try {
            var key = this.propsPrefix + name;
            if (value == null) {
                value = '';
            }
            storage[key] = value;
        }
        catch (err) {
            console.log('Cannot access local/session storage:', err);
        }
    };
    LoopBackAuth.prototype.load = function (name) {
        var key = this.propsPrefix + name;
        return localStorage[key] || sessionStorage[key] || null;
    };
    return LoopBackAuth;
}());
var auth = new LoopBackAuth();
var ErrorHandler = (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
var LoopBackAuthInstance = (function () {
    function LoopBackAuthInstance() {
    }
    LoopBackAuthInstance = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoopBackAuthInstance);
    return LoopBackAuthInstance;
}());
exports.LoopBackAuthInstance = LoopBackAuthInstance;
var BaseLoopBackApi = (function () {
    function BaseLoopBackApi(http, errorHandler) {
        this.http = http;
        this.errorHandler = errorHandler;
        if (!errorHandler) {
            this.errorHandler = new ErrorHandler();
        }
        this.init();
    }
    BaseLoopBackApi.prototype.getPath = function () {
        return this.path;
    };
    BaseLoopBackApi.prototype.init = function () {
        this.path = "https://localhost:3000/api";
    };
    BaseLoopBackApi.prototype.request = function (method, url, urlParams, params, data) {
        if (urlParams === void 0) { urlParams = {}; }
        if (params === void 0) { params = {}; }
        if (data === void 0) { data = null; }
        var requestUrl = url;
        var key;
        for (key in urlParams) {
            requestUrl = requestUrl.replace(new RegExp(":" + key + "(\/|$)", "g"), urlParams[key] + "$1");
        }
        var parameters = [];
        if (auth.getAccessTokenId()) {
            params.access_token = auth.getAccessTokenId();
        }
        for (var param in params) {
            parameters.push(param + '=' + (typeof params[param] === 'object' ? JSON.stringify(params[param]) : params[param]));
        }
        requestUrl += (parameters ? '?' : '') + parameters.join('&');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var request = new http_1.Request({
            headers: headers,
            method: method,
            url: requestUrl,
            body: data ? JSON.stringify(data) : undefined
        });
        console.log("getAccessTokenId() = ", auth.getAccessTokenId());
        return this.http.request(request)
            .map(function (res) { return (res.text() != "" ? res.json() : {}); })
            .catch(this.errorHandler.handleError);
    };
    BaseLoopBackApi.prototype.intercept = function (observable) {
        return observable.catch(function (err, source) {
            return Observable_1.Observable.throw(err);
        });
    };
    BaseLoopBackApi.prototype.setUser = function (accessTokenId, userId, userData) {
        auth.setUser(accessTokenId, userId, userData);
    };
    BaseLoopBackApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], BaseLoopBackApi);
    return BaseLoopBackApi;
}());
exports.BaseLoopBackApi = BaseLoopBackApi;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9zZXJ2aWNlcy9sYi1zZXJ2aWNlc18udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCxxQkFBK0MsZUFBZSxDQUFDLENBQUE7QUFDL0QsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFDM0MsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBQ25DLFFBQU8sdUJBQXVCLENBQUMsQ0FBQTtBQUMvQixRQUFPLHNCQUFzQixDQUFDLENBQUE7QUFDOUIsUUFBTyx5QkFBeUIsQ0FBQyxDQUFBO0FBQ2pDLFFBQU8seUJBQXlCLENBQUMsQ0FBQTtBQVlqQztJQVFFO1FBRlUsZ0JBQVcsR0FBVyxZQUFZLENBQUM7UUFHM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVNLG9DQUFhLEdBQXBCLFVBQXFCLEtBQWM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSx1Q0FBZ0IsR0FBdkI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRU0seUNBQWtCLEdBQXpCLFVBQTBCLElBQVM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSx5Q0FBa0IsR0FBekI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUs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QyxPQUFPLENBQUM7YUFDOUIsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQzthQUNoRCxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRVMsbUNBQVMsR0FBbkIsVUFBb0IsVUFBZ0M7UUFDbEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFHLEVBQUUsTUFBTTtZQUM1QixNQUFNLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsaUNBQU8sR0FBakIsVUFBa0IsYUFBa0IsRUFBRSxNQUFXLEVBQUUsUUFBYTtRQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQTVFSDtRQUFDLGlCQUFVLEVBQUU7bUJBTVIsYUFBTSxDQUFDLFdBQUksQ0FBQzttQkFDWixlQUFRLEVBQUU7bUJBQUUsYUFBTSxDQUFDLFlBQVksQ0FBQzs7dUJBUHhCO0lBNkViLHNCQUFDO0FBQUQsQ0E1RUEsQUE0RUMsSUFBQTtBQTVFcUIsdUJBQWUsa0JBNEVwQyxDQUFBIiwiZmlsZSI6InNoYXJlZC9zZXJ2aWNlcy9sYi1zZXJ2aWNlc18uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SHR0cCwgSGVhZGVycywgUmVxdWVzdCwgUmVzcG9uc2V9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL3Rocm93JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3NoYXJlJztcblxuZXhwb3J0IGludGVyZmFjZSBMb29wQmFja0ZpbHRlckludGVyZmFjZSB7XG4gIGZpZWxkcz86IGFueTtcbiAgaW5jbHVkZT86IGFueTtcbiAgbGltaXQ/OiBhbnk7XG4gIG9yZGVyPzogYW55O1xuICBza2lwPzogYW55O1xuICBvZmZzZXQ/OiBhbnk7XG4gIHdoZXJlPzogYW55O1xufVxuXG5jbGFzcyBMb29wQmFja0F1dGgge1xuICBwcm90ZWN0ZWQgYWNjZXNzVG9rZW5JZDogYW55O1xuICBwcm90ZWN0ZWQgY3VycmVudFVzZXJJZDogYW55O1xuICBwcm90ZWN0ZWQgcmVtZW1iZXJNZTogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIGN1cnJlbnRVc2VyRGF0YTogYW55O1xuXG4gIHByb3RlY3RlZCBwcm9wc1ByZWZpeDogc3RyaW5nID0gJyRMb29wQmFjayQnO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWNjZXNzVG9rZW5JZCA9IHRoaXMubG9hZChcImFjY2Vzc1Rva2VuSWRcIik7XG4gICAgdGhpcy5jdXJyZW50VXNlcklkID0gdGhpcy5sb2FkKFwiY3VycmVudFVzZXJJZFwiKTtcbiAgICB0aGlzLnJlbWVtYmVyTWUgPSB0aGlzLmxvYWQoXCJyZW1lbWJlck1lXCIpO1xuICAgIHRoaXMuY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSZW1lbWJlck1lKHZhbHVlOiBib29sZWFuKTogTG9vcEJhY2tBdXRoIHtcbiAgICB0aGlzLnJlbWVtYmVyTWUgPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50VXNlcklkKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXJJZDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDdXJyZW50VXNlckRhdGEoZGF0YTogYW55KTogTG9vcEJhY2tBdXRoIHtcbiAgICB0aGlzLmN1cnJlbnRVc2VyRGF0YSA9IGRhdGE7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudFVzZXJEYXRhKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXJEYXRhO1xuICB9XG5cbiAgcHVibGljIGdldEFjY2Vzc1Rva2VuSWQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5hY2Nlc3NUb2tlbklkO1xuICB9XG5cbiAgcHVibGljIHNhdmUoKSB7XG4gICAgdmFyIHN0b3JhZ2UgPSB0aGlzLnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICB0aGlzLnNhdmVUaGlzKHN0b3JhZ2UsIFwiYWNjZXNzVG9rZW5JZFwiLCB0aGlzLmFjY2Vzc1Rva2VuSWQpO1xuICAgIHRoaXMuc2F2ZVRoaXMoc3RvcmFnZSwgXCJjdXJyZW50VXNlcklkXCIsIHRoaXMuY3VycmVudFVzZXJJZCk7XG4gICAgdGhpcy5zYXZlVGhpcyhzdG9yYWdlLCBcInJlbWVtYmVyTWVcIiwgdGhpcy5yZW1lbWJlck1lKTtcbiAgfTtcblxuICBwdWJsaWMgc2V0VXNlcihhY2Nlc3NUb2tlbklkOiBhbnksIHVzZXJJZDogYW55LCB1c2VyRGF0YTogYW55KSB7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICB0aGlzLmN1cnJlbnRVc2VySWQgPSB1c2VySWQ7XG4gICAgdGhpcy5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclVzZXIoKSB7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclN0b3JhZ2UoKSB7XG4gICAgdGhpcy5zYXZlVGhpcyhzZXNzaW9uU3RvcmFnZSwgXCJhY2Nlc3NUb2tlbklkXCIsIG51bGwpO1xuICAgIHRoaXMuc2F2ZVRoaXMobG9jYWxTdG9yYWdlLCBcImFjY2Vzc1Rva2VuSWRcIiwgbnVsbCk7XG4gICAgdGhpcy5zYXZlVGhpcyhzZXNzaW9uU3RvcmFnZSwgXCJjdXJyZW50VXNlcklkXCIsIG51bGwpO1xuICAgIHRoaXMuc2F2ZVRoaXMobG9jYWxTdG9yYWdlLCBcImN1cnJlbnRVc2VySWRcIiwgbnVsbCk7XG4gICAgdGhpcy5zYXZlVGhpcyhzZXNzaW9uU3RvcmFnZSwgXCJyZW1lbWJlck1lXCIsIG51bGwpO1xuICAgIHRoaXMuc2F2ZVRoaXMobG9jYWxTdG9yYWdlLCBcInJlbWVtYmVyTWVcIiwgbnVsbCk7XG4gIH07XG5cbiAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICBwcm90ZWN0ZWQgc2F2ZVRoaXMoc3RvcmFnZTogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGtleSA9IHRoaXMucHJvcHNQcmVmaXggKyBuYW1lO1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICAgIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgdmFyIGtleSA9IHRoaXMucHJvcHNQcmVmaXggKyBuYW1lO1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8IG51bGw7XG4gIH1cbn1cblxubGV0IGF1dGggPSBuZXcgTG9vcEJhY2tBdXRoKCk7XG5cblxuLyoqXG4gKiBEZWZhdWx0IGVycm9yIGhhbmRsZXJcbiAqL1xuZXhwb3J0IGNsYXNzIEVycm9ySGFuZGxlciB7XG4gIHB1YmxpYyBoYW5kbGVFcnJvcihlcnJvcjogUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkuZXJyb3IgfHwgJ1NlcnZlciBlcnJvcicpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb29wQmFja0F1dGhJbnN0YW5jZSB7XG5cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VMb29wQmFja0FwaSB7XG5cbiAgcHJvdGVjdGVkIHBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHApIHByb3RlY3RlZCBodHRwOiBIdHRwLCBcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgcHJvdGVjdGVkIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIGlmICghZXJyb3JIYW5kbGVyKSB7XG4gICAgICB0aGlzLmVycm9ySGFuZGxlciA9IG5ldyBFcnJvckhhbmRsZXIoKTtcbiAgICB9XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHBhdGggZm9yIGJ1aWxkaW5nIHBhcnQgb2YgVVJMIGZvciBBUElcbiAgICogQHJldHVybiBzdHJpbmdcbiAgICovXG4gIHByb3RlY3RlZCBnZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0KCkge1xuICAgIHRoaXMucGF0aCA9IFwiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMC9hcGlcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHJlcXVlc3RcbiAgICogQHBhcmFtIHN0cmluZyAgbWV0aG9kICAgIFJlcXVlc3QgbWV0aG9kIChHRVQsIFBPU1QsIFBVVClcbiAgICogQHBhcmFtIHN0cmluZyAgdXJsICAgICAgIFJlcXVlc3QgdXJsIChteS1ob3N0L215LXVybC86aWQpXG4gICAqIEBwYXJhbSBhbnkgICAgIHVybFBhcmFtcyBWYWx1ZXMgb2YgdXJsIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIGFueSAgICAgcGFyYW1zICAgIFBhcmFtZXRlcnMgZm9yIGJ1aWxkaW5nIHVybCAoZmlsdGVyIGFuZCBvdGhlcilcbiAgICogQHBhcmFtIGFueSAgICAgZGF0YSAgICAgIFJlcXVlc3QgYm9keVxuICAgKi9cbiAgcHVibGljIHJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCB1cmxQYXJhbXM6IGFueSA9IHt9LCBcbiAgICAgICAgICAgICAgICAgcGFyYW1zOiBhbnkgPSB7fSwgZGF0YTogYW55ID0gbnVsbCkge1xuICAgIGxldCByZXF1ZXN0VXJsID0gdXJsO1xuICAgIGxldCBrZXk6IHN0cmluZztcbiAgICBmb3IgKGtleSBpbiB1cmxQYXJhbXMpIHtcbiAgICAgIHJlcXVlc3RVcmwgPSByZXF1ZXN0VXJsLnJlcGxhY2UobmV3IFJlZ0V4cChcIjpcIiArIGtleSArIFwiKFxcL3wkKVwiLCBcImdcIiksIHVybFBhcmFtc1trZXldICsgXCIkMVwiKTtcbiAgICB9XG4gICAgbGV0IHBhcmFtZXRlcnM6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKGF1dGguZ2V0QWNjZXNzVG9rZW5JZCgpKSB7XG4gICAgICBwYXJhbXMuYWNjZXNzX3Rva2VuID0gYXV0aC5nZXRBY2Nlc3NUb2tlbklkKCk7XG4gICAgfVxuICAgIGZvciAodmFyIHBhcmFtIGluIHBhcmFtcykge1xuICAgICAgcGFyYW1ldGVycy5wdXNoKHBhcmFtICsgJz0nICsgKHR5cGVvZiBwYXJhbXNbcGFyYW1dID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHBhcmFtc1twYXJhbV0pIDogcGFyYW1zW3BhcmFtXSkpO1xuICAgIH1cbiAgICByZXF1ZXN0VXJsICs9IChwYXJhbWV0ZXJzID8gJz8nIDogJycpICsgcGFyYW1ldGVycy5qb2luKCcmJyk7XG5cbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHtcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogcmVxdWVzdFVybCxcbiAgICAgIGJvZHk6IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IHVuZGVmaW5lZFxuICAgIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKFwiZ2V0QWNjZXNzVG9rZW5JZCgpID0gXCIsYXV0aC5nZXRBY2Nlc3NUb2tlbklkKCkpO1xuICAgIFxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChyZXF1ZXN0KSAgICAgIFxuICAgICAgLm1hcChyZXMgPT4gKHJlcy50ZXh0KCkgIT0gXCJcIiA/IHJlcy5qc29uKCkgOiB7fSkpICAgICAgICAgICBcbiAgICAgIC5jYXRjaCh0aGlzLmVycm9ySGFuZGxlci5oYW5kbGVFcnJvcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW50ZXJjZXB0KG9ic2VydmFibGU6IE9ic2VydmFibGU8UmVzcG9uc2U+KTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLmNhdGNoKChlcnIsIHNvdXJjZSkgPT4geyAgICAgXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnIpOyAgICAgICAgXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0VXNlcihhY2Nlc3NUb2tlbklkOiBhbnksIHVzZXJJZDogYW55LCB1c2VyRGF0YTogYW55KSB7XG4gICAgYXV0aC5zZXRVc2VyKGFjY2Vzc1Rva2VuSWQsIHVzZXJJZCwgdXNlckRhdGEpO1xuICB9XG59XG4iXX0=
