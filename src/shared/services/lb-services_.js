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
//# sourceMappingURL=lb-services_.js.map