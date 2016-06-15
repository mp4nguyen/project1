"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (auth.getAccessTokenId()) {
            headers.append('Authorization', auth.getAccessTokenId());
        }
        var requestUrl = url;
        var key;
        for (key in urlParams) {
            requestUrl = requestUrl.replace(new RegExp(":" + key + "(\/|$)", "g"), urlParams[key] + "$1");
        }
        var parameters = [];
        for (var param in params) {
            parameters.push(param + '=' + (typeof params[param] === 'object' ? JSON.stringify(params[param]) : params[param]));
        }
        requestUrl += (parameters ? '?' : '') + parameters.join('&');
        var request = new http_1.Request({
            headers: headers,
            method: method,
            url: requestUrl,
            body: data ? JSON.stringify(data) : undefined
        });
        return this.http.request(request)
            .map(function (res) { return (res.text() != "" ? res.json() : {}); })
            .catch(this.errorHandler.handleError);
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
var UserApi = (function (_super) {
    __extends(UserApi, _super);
    function UserApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    UserApi.prototype.__findById__accessTokens = function (id, fk) {
        var method = "GET";
        var url = this.getPath() + "/Users/:id/accessTokens/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.__destroyById__accessTokens = function (id, fk) {
        var method = "DELETE";
        var url = this.getPath() + "/Users/:id/accessTokens/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.__updateById__accessTokens = function (id, fk, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/Users/:id/accessTokens/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    UserApi.prototype.__get__accessTokens = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/Users/:id/accessTokens";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.__create__accessTokens = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/Users/:id/accessTokens";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    UserApi.prototype.__delete__accessTokens = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/Users/:id/accessTokens";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.__count__accessTokens = function (id, where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/Users/:id/accessTokens/count";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/Users";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    UserApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/Users";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    UserApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/Users";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    UserApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/Users/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/Users/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/Users";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/Users/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/Users/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    UserApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/Users/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/Users/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/Users/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    UserApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/Users/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    UserApi.prototype.login = function (credentials, include) {
        if (include === void 0) { include = "user"; }
        var method = "POST";
        var url = this.getPath() + "/Users/login";
        var urlParams = {};
        var params = {};
        if (include !== undefined) {
            params.include = include;
        }
        var result = this.request(method, url, urlParams, params, credentials)
            .share();
        result.subscribe(function (response) {
            auth.setUser(response.id, response.userId, response.user);
            auth.setRememberMe(true);
            auth.save();
        }, function () { return null; });
        return result;
    };
    UserApi.prototype.logout = function () {
        var method = "POST";
        var url = this.getPath() + "/Users/logout";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params)
            .share();
        result.subscribe(function () {
            auth.clearUser();
            auth.clearStorage();
        }, function () { return null; });
        return result;
    };
    UserApi.prototype.confirm = function (uid, token, redirect) {
        if (redirect === void 0) { redirect = undefined; }
        var method = "GET";
        var url = this.getPath() + "/Users/confirm";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    UserApi.prototype.resetPassword = function (options) {
        var method = "POST";
        var url = this.getPath() + "/Users/reset";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    UserApi.prototype.getCurrent = function () {
        var method = "GET";
        var url = this.getPath() + "/Users" + "/:id";
        var id = auth.getCurrentUserId();
        if (id == null) {
            id = '__anonymous__';
        }
        var urlParams = {
            id: id
        };
        var result = this.request(method, url, urlParams)
            .share();
        result.subscribe(function (response) {
            auth.setCurrentUserData(response);
        }, function () { return null; });
        return result;
    };
    UserApi.prototype.getCachedCurrent = function () {
        return auth.getCurrentUserData();
    };
    UserApi.prototype.isAuthenticated = function () {
        return this.getCurrentId() != null;
    };
    UserApi.prototype.getCurrentId = function () {
        return auth.getCurrentUserId();
    };
    UserApi.prototype.getModelName = function () {
        return "User";
    };
    UserApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], UserApi);
    return UserApi;
}(BaseLoopBackApi));
exports.UserApi = UserApi;
var CBookingTypesApi = (function (_super) {
    __extends(CBookingTypesApi, _super);
    function CBookingTypesApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CBookingTypesApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CBookingTypes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CBookingTypesApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CBookingTypes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CBookingTypesApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CBookingTypes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CBookingTypesApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CBookingTypes/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CBookingTypesApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CBookingTypes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CBookingTypesApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CBookingTypes";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CBookingTypesApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CBookingTypes/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CBookingTypesApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CBookingTypes/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CBookingTypesApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CBookingTypes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CBookingTypesApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CBookingTypes/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CBookingTypesApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CBookingTypes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CBookingTypesApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CBookingTypes/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CBookingTypesApi.prototype.getModelName = function () {
        return "CBookingTypes";
    };
    CBookingTypesApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CBookingTypesApi);
    return CBookingTypesApi;
}(BaseLoopBackApi));
exports.CBookingTypesApi = CBookingTypesApi;
var CClinicBookingTypesApi = (function (_super) {
    __extends(CClinicBookingTypesApi, _super);
    function CClinicBookingTypesApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CClinicBookingTypesApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CClinicBookingTypes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicBookingTypesApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CClinicBookingTypes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicBookingTypesApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CClinicBookingTypes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicBookingTypesApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CClinicBookingTypes/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicBookingTypesApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CClinicBookingTypes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicBookingTypesApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CClinicBookingTypes";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicBookingTypesApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CClinicBookingTypes/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicBookingTypesApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CClinicBookingTypes/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicBookingTypesApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CClinicBookingTypes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicBookingTypesApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CClinicBookingTypes/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicBookingTypesApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CClinicBookingTypes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicBookingTypesApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CClinicBookingTypes/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CClinicBookingTypesApi.prototype.getModelName = function () {
        return "CClinicBookingTypes";
    };
    CClinicBookingTypesApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CClinicBookingTypesApi);
    return CClinicBookingTypesApi;
}(BaseLoopBackApi));
exports.CClinicBookingTypesApi = CClinicBookingTypesApi;
var CDoctorBookingTypesApi = (function (_super) {
    __extends(CDoctorBookingTypesApi, _super);
    function CDoctorBookingTypesApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CDoctorBookingTypesApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctorBookingTypes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorBookingTypesApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctorBookingTypes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorBookingTypesApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CDoctorBookingTypes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorBookingTypesApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CDoctorBookingTypes/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorBookingTypesApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctorBookingTypes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorBookingTypesApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctorBookingTypes";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorBookingTypesApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctorBookingTypes/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorBookingTypesApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctorBookingTypes/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorBookingTypesApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CDoctorBookingTypes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorBookingTypesApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctorBookingTypes/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorBookingTypesApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CDoctorBookingTypes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorBookingTypesApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctorBookingTypes/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CDoctorBookingTypesApi.prototype.getModelName = function () {
        return "CDoctorBookingTypes";
    };
    CDoctorBookingTypesApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CDoctorBookingTypesApi);
    return CDoctorBookingTypesApi;
}(BaseLoopBackApi));
exports.CDoctorBookingTypesApi = CDoctorBookingTypesApi;
var CDoctorClinicsApi = (function (_super) {
    __extends(CDoctorClinicsApi, _super);
    function CDoctorClinicsApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CDoctorClinicsApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctorClinics";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorClinicsApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctorClinics";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorClinicsApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CDoctorClinics";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorClinicsApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CDoctorClinics/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorClinicsApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctorClinics/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorClinicsApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctorClinics";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorClinicsApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctorClinics/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorClinicsApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctorClinics/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorClinicsApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CDoctorClinics/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorClinicsApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctorClinics/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorClinicsApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CDoctorClinics/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorClinicsApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctorClinics/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CDoctorClinicsApi.prototype.getModelName = function () {
        return "CDoctorClinics";
    };
    CDoctorClinicsApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CDoctorClinicsApi);
    return CDoctorClinicsApi;
}(BaseLoopBackApi));
exports.CDoctorClinicsApi = CDoctorClinicsApi;
var CDoctorsApi = (function (_super) {
    __extends(CDoctorsApi, _super);
    function CDoctorsApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CDoctorsApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctors";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorsApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctors";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorsApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CDoctors";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorsApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CDoctors/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorsApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctors/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorsApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctors";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorsApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctors/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorsApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctors/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorsApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CDoctors/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorsApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CDoctors/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CDoctorsApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CDoctors/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CDoctorsApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CDoctors/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CDoctorsApi.prototype.getModelName = function () {
        return "CDoctors";
    };
    CDoctorsApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CDoctorsApi);
    return CDoctorsApi;
}(BaseLoopBackApi));
exports.CDoctorsApi = CDoctorsApi;
var CGalleryApi = (function (_super) {
    __extends(CGalleryApi, _super);
    function CGalleryApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CGalleryApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CGalleries";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CGalleryApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CGalleries";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CGalleryApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CGalleries";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CGalleryApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CGalleries/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CGalleries/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CGalleries";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CGalleries/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CGalleries/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CGalleryApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CGalleries/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CGalleries/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CGalleries/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CGalleryApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CGalleries/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CGalleryApi.prototype.__findById__CCompanies__Galleries = function (id, fk) {
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Galleries/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.__destroyById__CCompanies__Galleries = function (id, fk) {
        var method = "DELETE";
        var url = this.getPath() + "/CCompanies/:id/Galleries/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.__updateById__CCompanies__Galleries = function (id, fk, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CCompanies/:id/Galleries/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CGalleryApi.prototype.__get__CCompanies__Galleries = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Galleries";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.__create__CCompanies__Galleries = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies/:id/Galleries";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CGalleryApi.prototype.__createMany__CCompanies__Galleries = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies/:id/Galleries";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CGalleryApi.prototype.__delete__CCompanies__Galleries = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CCompanies/:id/Galleries";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.__count__CCompanies__Galleries = function (id, where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Galleries/count";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CGalleryApi.prototype.getModelName = function () {
        return "CGallery";
    };
    CGalleryApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CGalleryApi);
    return CGalleryApi;
}(BaseLoopBackApi));
exports.CGalleryApi = CGalleryApi;
var CPeopleApi = (function (_super) {
    __extends(CPeopleApi, _super);
    function CPeopleApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CPeopleApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CPeople";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CPeopleApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CPeople";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CPeopleApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CPeople";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CPeopleApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CPeople/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CPeopleApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CPeople/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CPeopleApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CPeople";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CPeopleApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CPeople/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CPeopleApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CPeople/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CPeopleApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CPeople/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CPeopleApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CPeople/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CPeopleApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CPeople/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CPeopleApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CPeople/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CPeopleApi.prototype.getModelName = function () {
        return "CPeople";
    };
    CPeopleApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CPeopleApi);
    return CPeopleApi;
}(BaseLoopBackApi));
exports.CPeopleApi = CPeopleApi;
var CRosterDaysApi = (function (_super) {
    __extends(CRosterDaysApi, _super);
    function CRosterDaysApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CRosterDaysApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterDays";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterDaysApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterDays";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterDaysApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CRosterDays";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterDaysApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CRosterDays/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterDaysApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterDays/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterDaysApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterDays";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterDaysApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterDays/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterDaysApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterDays/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterDaysApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CRosterDays/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterDaysApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterDays/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterDaysApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CRosterDays/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterDaysApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterDays/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CRosterDaysApi.prototype.getModelName = function () {
        return "CRosterDays";
    };
    CRosterDaysApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CRosterDaysApi);
    return CRosterDaysApi;
}(BaseLoopBackApi));
exports.CRosterDaysApi = CRosterDaysApi;
var CRosterPlacesApi = (function (_super) {
    __extends(CRosterPlacesApi, _super);
    function CRosterPlacesApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CRosterPlacesApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterPlaces";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterPlacesApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterPlaces";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterPlacesApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CRosterPlaces";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterPlacesApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CRosterPlaces/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterPlacesApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterPlaces/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterPlacesApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterPlaces";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterPlacesApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterPlaces/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterPlacesApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterPlaces/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterPlacesApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CRosterPlaces/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterPlacesApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterPlaces/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterPlacesApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CRosterPlaces/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterPlacesApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterPlaces/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CRosterPlacesApi.prototype.getModelName = function () {
        return "CRosterPlaces";
    };
    CRosterPlacesApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CRosterPlacesApi);
    return CRosterPlacesApi;
}(BaseLoopBackApi));
exports.CRosterPlacesApi = CRosterPlacesApi;
var CReviewsApi = (function (_super) {
    __extends(CReviewsApi, _super);
    function CReviewsApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CReviewsApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CReviews";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CReviewsApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CReviews";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CReviewsApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CReviews";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CReviewsApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CReviews/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CReviewsApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CReviews/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CReviewsApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CReviews";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CReviewsApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CReviews/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CReviewsApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CReviews/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CReviewsApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CReviews/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CReviewsApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CReviews/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CReviewsApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CReviews/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CReviewsApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CReviews/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CReviewsApi.prototype.getModelName = function () {
        return "CReviews";
    };
    CReviewsApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CReviewsApi);
    return CReviewsApi;
}(BaseLoopBackApi));
exports.CReviewsApi = CReviewsApi;
var CRosterTimesApi = (function (_super) {
    __extends(CRosterTimesApi, _super);
    function CRosterTimesApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CRosterTimesApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterTimes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterTimesApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterTimes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterTimesApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CRosterTimes";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterTimesApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CRosterTimes/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterTimesApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterTimes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterTimesApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterTimes";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterTimesApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterTimes/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterTimesApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterTimes/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterTimesApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CRosterTimes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterTimesApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CRosterTimes/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CRosterTimesApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CRosterTimes/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CRosterTimesApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CRosterTimes/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CRosterTimesApi.prototype.getModelName = function () {
        return "CRosterTimes";
    };
    CRosterTimesApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CRosterTimesApi);
    return CRosterTimesApi;
}(BaseLoopBackApi));
exports.CRosterTimesApi = CRosterTimesApi;
var CClinicsApi = (function (_super) {
    __extends(CClinicsApi, _super);
    function CClinicsApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CClinicsApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CClinics";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicsApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CClinics";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicsApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CClinics";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicsApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CClinics/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CClinics/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CClinics";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CClinics/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CClinics/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicsApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CClinics/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CClinics/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CClinics/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicsApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CClinics/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CClinicsApi.prototype.__findById__CCompanies__Clinics = function (id, fk) {
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Clinics/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.__destroyById__CCompanies__Clinics = function (id, fk) {
        var method = "DELETE";
        var url = this.getPath() + "/CCompanies/:id/Clinics/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.__updateById__CCompanies__Clinics = function (id, fk, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CCompanies/:id/Clinics/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicsApi.prototype.__get__CCompanies__Clinics = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Clinics";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.__create__CCompanies__Clinics = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies/:id/Clinics";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicsApi.prototype.__createMany__CCompanies__Clinics = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies/:id/Clinics";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CClinicsApi.prototype.__delete__CCompanies__Clinics = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CCompanies/:id/Clinics";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.__count__CCompanies__Clinics = function (id, where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Clinics/count";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CClinicsApi.prototype.getModelName = function () {
        return "CClinics";
    };
    CClinicsApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CClinicsApi);
    return CClinicsApi;
}(BaseLoopBackApi));
exports.CClinicsApi = CClinicsApi;
var CCompaniesApi = (function (_super) {
    __extends(CCompaniesApi, _super);
    function CCompaniesApi(http, errorHandler) {
        _super.call(this, http, errorHandler);
    }
    CCompaniesApi.prototype.__findById__Clinics = function (id, fk) {
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Clinics/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.__destroyById__Clinics = function (id, fk) {
        var method = "DELETE";
        var url = this.getPath() + "/CCompanies/:id/Clinics/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.__updateById__Clinics = function (id, fk, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CCompanies/:id/Clinics/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CCompaniesApi.prototype.__findById__Galleries = function (id, fk) {
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Galleries/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.__destroyById__Galleries = function (id, fk) {
        var method = "DELETE";
        var url = this.getPath() + "/CCompanies/:id/Galleries/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.__updateById__Galleries = function (id, fk, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CCompanies/:id/Galleries/:fk";
        var urlParams = {
            id: id,
            fk: fk
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CCompaniesApi.prototype.__get__Clinics = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Clinics";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.__create__Clinics = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies/:id/Clinics";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CCompaniesApi.prototype.__delete__Clinics = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CCompanies/:id/Clinics";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.__count__Clinics = function (id, where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Clinics/count";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.__get__Galleries = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Galleries";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.__create__Galleries = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies/:id/Galleries";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CCompaniesApi.prototype.__delete__Galleries = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CCompanies/:id/Galleries";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.__count__Galleries = function (id, where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/Galleries/count";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.create = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CCompaniesApi.prototype.createMany = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CCompaniesApi.prototype.upsert = function (data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CCompanies";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CCompaniesApi.prototype.exists = function (id) {
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id/exists";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.findById = function (id, filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.find = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/findOne";
        var urlParams = {};
        var params = {};
        if (filter !== undefined) {
            params.filter = filter;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.updateAll = function (where, data) {
        if (where === void 0) { where = undefined; }
        if (data === void 0) { data = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies/update";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CCompaniesApi.prototype.deleteById = function (id) {
        var method = "DELETE";
        var url = this.getPath() + "/CCompanies/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.count = function (where) {
        if (where === void 0) { where = undefined; }
        var method = "GET";
        var url = this.getPath() + "/CCompanies/count";
        var urlParams = {};
        var params = {};
        if (where !== undefined) {
            params.where = where;
        }
        var result = this.request(method, url, urlParams, params);
        return result;
    };
    CCompaniesApi.prototype.updateAttributes = function (id, data) {
        if (data === void 0) { data = undefined; }
        var method = "PUT";
        var url = this.getPath() + "/CCompanies/:id";
        var urlParams = {
            id: id
        };
        var params = {};
        var result = this.request(method, url, urlParams, params, data);
        return result;
    };
    CCompaniesApi.prototype.createChangeStream = function (options) {
        if (options === void 0) { options = undefined; }
        var method = "POST";
        var url = this.getPath() + "/CCompanies/change-stream";
        var urlParams = {};
        var params = {};
        var result = this.request(method, url, urlParams, params, options);
        return result;
    };
    CCompaniesApi.prototype.getModelName = function () {
        return "CCompanies";
    };
    CCompaniesApi = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __param(1, core_1.Optional()),
        __param(1, core_1.Inject(ErrorHandler)), 
        __metadata('design:paramtypes', [http_1.Http, ErrorHandler])
    ], CCompaniesApi);
    return CCompaniesApi;
}(BaseLoopBackApi));
exports.CCompaniesApi = CCompaniesApi;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9zZXJ2aWNlcy9sYnNlcnZpY2VzXy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFDM0QscUJBQStDLGVBQWUsQ0FBQyxDQUFBO0FBQy9ELDJCQUF5QixpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLFFBQU8sMkJBQTJCLENBQUMsQ0FBQTtBQUNuQyxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFDL0IsUUFBTyx5QkFBeUIsQ0FBQyxDQUFBO0FBQ2pDLFFBQU8seUJBQXlCLENBQUMsQ0FBQTtBQVlqQztJQVFFO1FBRlUsZ0JBQVcsR0FBVyxZQUFZLENBQUM7UUFHM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVNLG9DQUFhLEdBQXBCLFVBQXFCLEtBQWM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSx1Q0FBZ0IsR0FBdkI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRU0seUNBQWtCLEdBQXpCLFVBQTBCLElBQVM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTSx5Q0FBa0IsR0FBekI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRU0sdUNB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LFNBQVMsR0FBUSxFQUNwQixDQUFDO1FBRUYsSUFBSSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBRXJCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQU9NLG9DQUFZLEdBQW5CO1FBQ0UsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBOXhCSDtRQUFDLGlCQUFVLEVBQUU7bUJBSVIsYUFBTSxDQUFDLFdBQUksQ0FBQzttQkFDWixlQUFRLEVBQUU7bUJBQUUsYUFBTSxDQUFDLFlBQVksQ0FBQzs7cUJBTHhCO0lBK3hCYixvQkFBQztBQUFELENBOXhCQSxBQTh4QkMsQ0E5eEJrQyxlQUFlLEdBOHhCakQ7QUE5eEJZLHFCQUFhLGdCQTh4QnpCLENBQUEiLCJmaWxlIjoic2hhcmVkL3NlcnZpY2VzL2xic2VydmljZXNfLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0h0dHAsIEhlYWRlcnMsIFJlcXVlc3QsIFJlc3BvbnNlfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS90aHJvdyc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvb3BCYWNrRmlsdGVySW50ZXJmYWNlIHtcbiAgZmllbGRzPzogYW55O1xuICBpbmNsdWRlPzogYW55O1xuICBsaW1pdD86IGFueTtcbiAgb3JkZXI/OiBhbnk7XG4gIHNraXA/OiBhbnk7XG4gIG9mZnNldD86IGFueTtcbiAgd2hlcmU/OiBhbnk7XG59XG5cbmNsYXNzIExvb3BCYWNrQXV0aCB7XG4gIHByb3RlY3RlZCBhY2Nlc3NUb2tlbklkOiBhbnk7XG4gIHByb3RlY3RlZCBjdXJyZW50VXNlcklkOiBhbnk7XG4gIHByb3RlY3RlZCByZW1lbWJlck1lOiBib29sZWFuO1xuICBwcm90ZWN0ZWQgY3VycmVudFVzZXJEYXRhOiBhbnk7XG5cbiAgcHJvdGVjdGVkIHByb3BzUHJlZml4OiBzdHJpbmcgPSAnJExvb3BCYWNrJCc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbklkID0gdGhpcy5sb2FkKFwiYWNjZXNzVG9rZW5JZFwiKTtcbiAgICB0aGlzLmN1cnJlbnRVc2VySWQgPSB0aGlzLmxvYWQoXCJjdXJyZW50VXNlcklkXCIpO1xuICAgIHRoaXMucmVtZW1iZXJNZSA9IHRoaXMubG9hZChcInJlbWVtYmVyTWVcIik7XG4gICAgdGhpcy5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIHNldFJlbWVtYmVyTWUodmFsdWU6IGJvb2xlYW4pOiBMb29wQmFja0F1dGgge1xuICAgIHRoaXMucmVtZW1iZXJNZSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGdldEN1cnJlbnRVc2VySWQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlcklkO1xuICB9XG5cbiAgcHVibGljIHNldEN1cnJlbnRVc2VyRGF0YShkYXRhOiBhbnkpOiBMb29wQmFja0F1dGgge1xuICAgIHRoaXMuY3VycmVudFVzZXJEYXRhID0gZGF0YTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50VXNlckRhdGEoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlckRhdGE7XG4gIH1cblxuICBwdWJsaWMgZ2V0QWNjZXNzVG9rZW5JZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmFjY2Vzc1Rva2VuSWQ7XG4gIH1cblxuICBwdWJsaWMgc2F2ZSgpIHtcbiAgICB2YXIgc3RvcmFnZSA9IHRoaXMucmVtZW1iZXJNZSA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xuICAgIHRoaXMuc2F2ZVRoaXMoc3RvcmFnZSwgXCJhY2Nlc3NUb2tlbklkXCIsIHRoaXMuYWNjZXNzVG9rZW5JZCk7XG4gICAgdGhpcy5zYXZlVGhpcyhzdG9yYWdlLCBcImN1cnJlbnRVc2VySWRcIiwgdGhpcy5jdXJyZW50VXNlcklkKTtcbiAgICB0aGlzLnNhdmVUaGlzKHN0b3JhZ2UsIFwicmVtZW1iZXJNZVwiLCB0aGlzLnJlbWVtYmVyTWUpO1xuICB9O1xuXG4gIHB1YmxpYyBzZXRVc2VyKGFjY2Vzc1Rva2VuSWQ6IGFueSwgdXNlcklkOiBhbnksIHVzZXJEYXRhOiBhbnkpIHtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xuICAgIHRoaXMuY3VycmVudFVzZXJJZCA9IHVzZXJJZDtcbiAgICB0aGlzLmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICB9XG5cbiAgcHVibGljIGNsZWFyVXNlcigpIHtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIGNsZWFyU3RvcmFnZSgpIHtcbiAgICB0aGlzLnNhdmVUaGlzKHNlc3Npb25TdG9yYWdlLCBcImFjY2Vzc1Rva2VuSWRcIiwgbnVsbCk7XG4gICAgdGhpcy5zYXZlVGhpcyhsb2NhbFN0b3JhZ2UsIFwiYWNjZXNzVG9rZW5JZFwiLCBudWxsKTtcbiAgICB0aGlzLnNhdmVUaGlzKHNlc3Npb25TdG9yYWdlLCBcImN1cnJlbnRVc2VySWRcIiwgbnVsbCk7XG4gICAgdGhpcy5zYXZlVGhpcyhsb2NhbFN0b3JhZ2UsIFwiY3VycmVudFVzZXJJZFwiLCBudWxsKTtcbiAgICB0aGlzLnNhdmVUaGlzKHNlc3Npb25TdG9yYWdlLCBcInJlbWVtYmVyTWVcIiwgbnVsbCk7XG4gICAgdGhpcy5zYXZlVGhpcyhsb2NhbFN0b3JhZ2UsIFwicmVtZW1iZXJNZVwiLCBudWxsKTtcbiAgfTtcblxuICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xuICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gIHByb3RlY3RlZCBzYXZlVGhpcyhzdG9yYWdlOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICB2YXIga2V5ID0gdGhpcy5wcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgfVxuICAgICAgc3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGNhdGNoKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWQobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICB2YXIga2V5ID0gdGhpcy5wcm9wc1ByZWZpeCArIG5hbWU7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgbnVsbDtcbiAgfVxufVxuXG5sZXQgYXV0aCA9IG5ldyBMb29wQmFja0F1dGgoKTtcblxuXG4vKipcbiAqIERlZmF1bHQgZXJyb3IgaGFuZGxlclxuICovXG5leHBvcnQgY2xhc3MgRXJyb3JIYW5kbGVyIHtcbiAgcHVibGljIGhhbmRsZUVycm9yKGVycm9yOiBSZXNwb25zZSkge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKS5lcnJvciB8fCAnU2VydmVyIGVycm9yJyk7XG4gIH1cbn1cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBwcm90ZWN0ZWQgcGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cCkgcHJvdGVjdGVkIGh0dHA6IEh0dHAsIFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgaWYgKCFlcnJvckhhbmRsZXIpIHtcbiAgICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gbmV3IEVycm9ySGFuZGxlcigpO1xuICAgIH1cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcGF0aCBmb3IgYnVpbGRpbmcgcGFydCBvZiBVUkwgZm9yIEFQSVxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldFBhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYXRoO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXQoKSB7XG4gICAgdGhpcy5wYXRoID0gXCJodHRwczovL2xvY2FsaG9zdDozMDAwL2FwaVwiO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgcmVxdWVzdFxuICAgKiBAcGFyYW0gc3RyaW5nICBtZXRob2QgICAgUmVxdWVzdCBtZXRob2QgKEdFVCwgUE9TVCwgUFVUKVxuICAgKiBAcGFyYW0gc3RyaW5nICB1cmwgICAgICAgUmVxdWVzdCB1cmwgKG15LWhvc3QvbXktdXJsLzppZClcbiAgICogQHBhcmFtIGFueSAgICAgdXJsUGFyYW1zIFZhbHVlcyBvZiB1cmwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0gYW55ICAgICBwYXJhbXMgICAgUGFyYW1ldGVycyBmb3IgYnVpbGRpbmcgdXJsIChmaWx0ZXIgYW5kIG90aGVyKVxuICAgKiBAcGFyYW0gYW55ICAgICBkYXRhICAgICAgUmVxdWVzdCBib2R5XG4gICAqL1xuICBwdWJsaWMgcmVxdWVzdChtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIHVybFBhcmFtczogYW55ID0ge30sIFxuICAgICAgICAgICAgICAgICBwYXJhbXM6IGFueSA9IHt9LCBkYXRhOiBhbnkgPSBudWxsKSB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgaWYgKGF1dGguZ2V0QWNjZXNzVG9rZW5JZCgpKSB7XG4gICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIGF1dGguZ2V0QWNjZXNzVG9rZW5JZCgpKTtcbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdFVybCA9IHVybDtcbiAgICBsZXQga2V5OiBzdHJpbmc7XG4gICAgZm9yIChrZXkgaW4gdXJsUGFyYW1zKSB7XG4gICAgICByZXF1ZXN0VXJsID0gcmVxdWVzdFVybC5yZXBsYWNlKG5ldyBSZWdFeHAoXCI6XCIgKyBrZXkgKyBcIihcXC98JClcIiwgXCJnXCIpLCB1cmxQYXJhbXNba2V5XSArIFwiJDFcIik7XG4gICAgfVxuXG4gICAgbGV0IHBhcmFtZXRlcnM6IHN0cmluZ1tdID0gW107XG4gICAgZm9yICh2YXIgcGFyYW0gaW4gcGFyYW1zKSB7XG4gICAgICBwYXJhbWV0ZXJzLnB1c2gocGFyYW0gKyAnPScgKyAodHlwZW9mIHBhcmFtc1twYXJhbV0gPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkocGFyYW1zW3BhcmFtXSkgOiBwYXJhbXNbcGFyYW1dKSk7XG4gICAgfVxuICAgIHJlcXVlc3RVcmwgKz0gKHBhcmFtZXRlcnMgPyAnPycgOiAnJykgKyBwYXJhbWV0ZXJzLmpvaW4oJyYnKTtcblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJlcXVlc3Qoe1xuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiByZXF1ZXN0VXJsLFxuICAgICAgYm9keTogZGF0YSA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogdW5kZWZpbmVkXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QocmVxdWVzdClcbiAgICAgIC5tYXAocmVzID0+IChyZXMudGV4dCgpICE9IFwiXCIgPyByZXMuanNvbigpIDoge30pKVxuICAgICAgLmNhdGNoKHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKTtcbiAgfVxufVxuXG5cbi8qKlxuICogQXBpIGZvciB0aGUgYFVzZXJgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckFwaSBleHRlbmRzIEJhc2VMb29wQmFja0FwaSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChIdHRwKSBodHRwOiBIdHRwLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICBzdXBlcihodHRwLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIGFjY2Vzc1Rva2Vucy5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBVc2VyIGlkXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgZmsgRm9yZWlnbiBrZXkgZm9yIGFjY2Vzc1Rva2Vuc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBVc2VyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fZmluZEJ5SWRfX2FjY2Vzc1Rva2VucyhpZDogYW55LCBmazogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnMvOmlkL2FjY2Vzc1Rva2Vucy86ZmtcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIGFjY2Vzc1Rva2Vucy5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBVc2VyIGlkXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgZmsgRm9yZWlnbiBrZXkgZm9yIGFjY2Vzc1Rva2Vuc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyBubyBkYXRhLlxuICAgKi9cbiAgcHVibGljIF9fZGVzdHJveUJ5SWRfX2FjY2Vzc1Rva2VucyhpZDogYW55LCBmazogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnMvOmlkL2FjY2Vzc1Rva2Vucy86ZmtcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIGFjY2Vzc1Rva2Vucy5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBVc2VyIGlkXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgZmsgRm9yZWlnbiBrZXkgZm9yIGFjY2Vzc1Rva2Vuc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBVc2VyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fdXBkYXRlQnlJZF9fYWNjZXNzVG9rZW5zKGlkOiBhbnksIGZrOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL1VzZXJzLzppZC9hY2Nlc3NUb2tlbnMvOmZrXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZms6IGZrXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUXVlcmllcyBhY2Nlc3NUb2tlbnMgb2YgVXNlci5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBVc2VyIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgX19nZXRfX2FjY2Vzc1Rva2VucyhpZDogYW55LCBmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnMvOmlkL2FjY2Vzc1Rva2Vuc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBpbiBhY2Nlc3NUb2tlbnMgb2YgdGhpcyBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBVc2VyIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgX19jcmVhdGVfX2FjY2Vzc1Rva2VucyhpZDogYW55LCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnMvOmlkL2FjY2Vzc1Rva2Vuc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGFjY2Vzc1Rva2VucyBvZiB0aGlzIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIFVzZXIgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cbiAgICovXG4gIHB1YmxpYyBfX2RlbGV0ZV9fYWNjZXNzVG9rZW5zKGlkOiBhbnkpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkRFTEVURVwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9Vc2Vycy86aWQvYWNjZXNzVG9rZW5zXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnRzIGFjY2Vzc1Rva2VucyBvZiBVc2VyLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIFVzZXIgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNvdW50YCDigJMgYHtudW1iZXJ9YCAtIFxuICAgKi9cbiAgcHVibGljIF9fY291bnRfX2FjY2Vzc1Rva2VucyhpZDogYW55LCB3aGVyZTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnMvOmlkL2FjY2Vzc1Rva2Vucy9jb3VudFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlKGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9Vc2Vyc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIG1vZGVsIGluc3RhbmNlIG9yIGluc2VydCBhIG5ldyBvbmUgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBzZXJ0KGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL1VzZXJzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgYSBtb2RlbCBpbnN0YW5jZSBleGlzdHMgaW4gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBleGlzdHNgIOKAkyBge2Jvb2xlYW59YCAtIFxuICAgKi9cbiAgcHVibGljIGV4aXN0cyhpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnMvOmlkL2V4aXN0c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzIGFuZCBpbmNsdWRlXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZEJ5SWQoaWQ6IGFueSwgZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL1VzZXJzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IGZpbHRlciBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcywgd2hlcmUsIGluY2x1ZGUsIG9yZGVyLCBvZmZzZXQsIGFuZCBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZChmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGZpcnN0IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IGZpbHRlciBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcywgd2hlcmUsIGluY2x1ZGUsIG9yZGVyLCBvZmZzZXQsIGFuZCBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBVc2VyYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRPbmUoZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL1VzZXJzL2ZpbmRPbmVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhlIG51bWJlciBvZiBpbnN0YW5jZXMgdXBkYXRlZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbCh3aGVyZTogYW55ID0gdW5kZWZpbmVkLCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnMvdXBkYXRlXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgVXNlcmAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBkZWxldGVCeUlkKGlkOiBhbnkpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkRFTEVURVwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9Vc2Vycy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgd2hlcmUgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3Qgd2hlcmUgQ3JpdGVyaWEgdG8gbWF0Y2ggbW9kZWwgaW5zdGFuY2VzXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBjb3VudGAg4oCTIGB7bnVtYmVyfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjb3VudCh3aGVyZTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvVXNlcnMvY291bnRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYXR0cmlidXRlcyBmb3IgYSBtb2RlbCBpbnN0YW5jZSBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBVc2VyIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYFVzZXJgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQXR0cmlidXRlcyhpZDogYW55LCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9Vc2Vycy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjaGFuZ2Ugc3RyZWFtLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgb3B0aW9uc2Ag4oCTIGB7b2JqZWN0fWAgLSBcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNoYW5nZXNgIOKAkyBge1JlYWRhYmxlU3RyZWFtfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDaGFuZ2VTdHJlYW0ob3B0aW9uczogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL1VzZXJzL2NoYW5nZS1zdHJlYW1cIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogTG9naW4gYSB1c2VyIHdpdGggdXNlcm5hbWUvZW1haWwgYW5kIHBhc3N3b3JkLlxuICAgKlxuICAgKiBAcGFyYW0gc3RyaW5nIGluY2x1ZGUgUmVsYXRlZCBvYmplY3RzIHRvIGluY2x1ZGUgaW4gdGhlIHJlc3BvbnNlLiBTZWUgdGhlIGRlc2NyaXB0aW9uIG9mIHJldHVybiB2YWx1ZSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKiAgIERlZmF1bHQgdmFsdWU6IGB1c2VyYC5cbiAgICpcbiAgICogIC0gYHJlbWVtYmVyTWVgIC0gYGJvb2xlYW5gIC0gV2hldGhlciB0aGUgYXV0aGVudGljYXRpb24gY3JlZGVudGlhbHNcbiAgICogICAgIHNob3VsZCBiZSByZW1lbWJlcmVkIGluIGxvY2FsU3RvcmFnZSBhY3Jvc3MgYXBwL2Jyb3dzZXIgcmVzdGFydHMuXG4gICAqICAgICBEZWZhdWx0OiBgdHJ1ZWAuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGUgcmVzcG9uc2UgYm9keSBjb250YWlucyBwcm9wZXJ0aWVzIG9mIHRoZSBBY2Nlc3NUb2tlbiBjcmVhdGVkIG9uIGxvZ2luLlxuICAgKiBEZXBlbmRpbmcgb24gdGhlIHZhbHVlIG9mIGBpbmNsdWRlYCBwYXJhbWV0ZXIsIHRoZSBib2R5IG1heSBjb250YWluIGFkZGl0aW9uYWwgcHJvcGVydGllczpcbiAgICogXG4gICAqICAgLSBgdXNlcmAgLSBge1VzZXJ9YCAtIERhdGEgb2YgdGhlIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlci4gKGBpbmNsdWRlPXVzZXJgKVxuICAgKiBcbiAgICpcbiAgICovXG4gIHB1YmxpYyBsb2dpbihjcmVkZW50aWFsczogYW55LCBpbmNsdWRlOiBhbnkgPSBcInVzZXJcIikge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9Vc2Vycy9sb2dpblwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGluY2x1ZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmluY2x1ZGUgPSBpbmNsdWRlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBjcmVkZW50aWFscylcbiAgICAgIC5zaGFyZSgpO1xuICAgICAgcmVzdWx0LnN1YnNjcmliZShcbiAgICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGF1dGguc2V0VXNlcihyZXNwb25zZS5pZCwgcmVzcG9uc2UudXNlcklkLCByZXNwb25zZS51c2VyKTtcbiAgICAgICAgICBhdXRoLnNldFJlbWVtYmVyTWUodHJ1ZSk7XG4gICAgICAgICAgYXV0aC5zYXZlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG51bGxcbiAgICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dvdXQgYSB1c2VyIHdpdGggYWNjZXNzIHRva2VuLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgYWNjZXNzX3Rva2VuYCDigJMgYHtzdHJpbmd9YCAtIERvIG5vdCBzdXBwbHkgdGhpcyBhcmd1bWVudCwgaXQgaXMgYXV0b21hdGljYWxseSBleHRyYWN0ZWQgZnJvbSByZXF1ZXN0IGhlYWRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIG5vIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgbG9nb3V0KCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9Vc2Vycy9sb2dvdXRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpXG4gICAgICAuc2hhcmUoKTtcbiAgICAgIHJlc3VsdC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBhdXRoLmNsZWFyVXNlcigpO1xuICAgICAgICAgIGF1dGguY2xlYXJTdG9yYWdlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG51bGxcbiAgICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maXJtIGEgdXNlciByZWdpc3RyYXRpb24gd2l0aCBlbWFpbCB2ZXJpZmljYXRpb24gdG9rZW4uXG4gICAqXG4gICAqIEBwYXJhbSBzdHJpbmcgdWlkIFxuICAgKlxuICAgKiBAcGFyYW0gc3RyaW5nIHRva2VuIFxuICAgKlxuICAgKiBAcGFyYW0gc3RyaW5nIHJlZGlyZWN0IFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyBubyBkYXRhLlxuICAgKi9cbiAgcHVibGljIGNvbmZpcm0odWlkOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcsIHJlZGlyZWN0OiBzdHJpbmcgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9Vc2Vycy9jb25maXJtXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHBhc3N3b3JkIGZvciBhIHVzZXIgd2l0aCBlbWFpbC5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cbiAgICovXG4gIHB1YmxpYyByZXNldFBhc3N3b3JkKG9wdGlvbnM6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9Vc2Vycy9yZXNldFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmdkb2MgbWV0aG9kXG4gICAqIEBuYW1lIGxiU2VydmljZXMuVXNlciNnZXRDdXJyZW50XG4gICAqIEBtZXRob2RPZiBsYlNlcnZpY2VzLlVzZXJcbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEdldCBkYXRhIG9mIHRoZSBjdXJyZW50bHkgbG9nZ2VkIHVzZXIuIEZhaWwgd2l0aCBIVFRQIHJlc3VsdCA0MDFcbiAgICogd2hlbiB0aGVyZSBpcyBubyB1c2VyIGxvZ2dlZCBpbi5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0Q3VycmVudCgpOiBhbnkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL1VzZXJzXCIgKyBcIi86aWRcIjtcbiAgICBsZXQgaWQ6IGFueSA9IGF1dGguZ2V0Q3VycmVudFVzZXJJZCgpO1xuICAgIGlmIChpZCA9PSBudWxsKSB7XG4gICAgICBpZCA9ICdfX2Fub255bW91c19fJztcbiAgICB9XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcylcbiAgICAgIC5zaGFyZSgpO1xuICAgICAgcmVzdWx0LnN1YnNjcmliZShcbiAgICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGF1dGguc2V0Q3VycmVudFVzZXJEYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gbnVsbFxuICAgICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRhIG9mIHRoZSBjdXJyZW50bHkgbG9nZ2VkIHVzZXIgdGhhdCB3YXMgcmV0dXJuZWQgYnkgdGhlIGxhc3RcbiAgICogY2FsbCB0byB7QGxpbmsgbGJTZXJ2aWNlcy5Vc2VyI2xvZ2lufSBvclxuICAgKiB7QGxpbmsgbGJTZXJ2aWNlcy5Vc2VyI2dldEN1cnJlbnR9LiBSZXR1cm4gbnVsbCB3aGVuIHRoZXJlXG4gICAqIGlzIG5vIHVzZXIgbG9nZ2VkIGluIG9yIHRoZSBkYXRhIG9mIHRoZSBjdXJyZW50IHVzZXIgd2VyZSBub3QgZmV0Y2hlZFxuICAgKiB5ZXQuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBIFVzZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgZ2V0Q2FjaGVkQ3VycmVudCgpIHtcbiAgICByZXR1cm4gYXV0aC5nZXRDdXJyZW50VXNlckRhdGEoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBsYlNlcnZpY2VzLlVzZXIjaXNBdXRoZW50aWNhdGVkXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBjdXJyZW50IHVzZXIgaXMgYXV0aGVudGljYXRlZCAobG9nZ2VkIGluKS5cbiAgICovXG4gIHB1YmxpYyBpc0F1dGhlbnRpY2F0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVudElkKCkgIT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbmFtZSBsYlNlcnZpY2VzLlVzZXIjZ2V0Q3VycmVudElkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBJZCBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZC1pbiB1c2VyIG9yIG51bGwuXG4gICAqL1xuICBwdWJsaWMgZ2V0Q3VycmVudElkKCkge1xuICAgIHJldHVybiBhdXRoLmdldEN1cnJlbnRVc2VySWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFVzZXJgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJVc2VyXCI7XG4gIH1cbn1cblxuLyoqXG4gKiBBcGkgZm9yIHRoZSBgQ0Jvb2tpbmdUeXBlc2AgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDQm9va2luZ1R5cGVzQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHApIGh0dHA6IEh0dHAsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0Jvb2tpbmdUeXBlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGUoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NCb29raW5nVHlwZXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQm9va2luZ1R5cGVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZU1hbnkoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NCb29raW5nVHlwZXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIG1vZGVsIGluc3RhbmNlIG9yIGluc2VydCBhIG5ldyBvbmUgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENCb29raW5nVHlwZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBzZXJ0KGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NCb29raW5nVHlwZXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBhIG1vZGVsIGluc3RhbmNlIGV4aXN0cyBpbiB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGV4aXN0c2Ag4oCTIGB7Ym9vbGVhbn1gIC0gXG4gICAqL1xuICBwdWJsaWMgZXhpc3RzKGlkOiBhbnkpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQm9va2luZ1R5cGVzLzppZC9leGlzdHNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcyBhbmQgaW5jbHVkZVxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQm9va2luZ1R5cGVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkKGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQm9va2luZ1R5cGVzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IGZpbHRlciBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcywgd2hlcmUsIGluY2x1ZGUsIG9yZGVyLCBvZmZzZXQsIGFuZCBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENCb29raW5nVHlwZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZChmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0Jvb2tpbmdUeXBlc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgZmlyc3QgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENCb29raW5nVHlwZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZE9uZShmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0Jvb2tpbmdUeXBlcy9maW5kT25lXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSB3aGVyZSBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoZSBudW1iZXIgb2YgaW5zdGFuY2VzIHVwZGF0ZWRcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBbGwod2hlcmU6IGFueSA9IHVuZGVmaW5lZCwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NCb29raW5nVHlwZXMvdXBkYXRlXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0Jvb2tpbmdUeXBlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBkZWxldGVCeUlkKGlkOiBhbnkpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkRFTEVURVwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQm9va2luZ1R5cGVzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvdW50IGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSB3aGVyZSBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNvdW50YCDigJMgYHtudW1iZXJ9YCAtIFxuICAgKi9cbiAgcHVibGljIGNvdW50KHdoZXJlOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQm9va2luZ1R5cGVzL2NvdW50XCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGF0dHJpYnV0ZXMgZm9yIGEgbW9kZWwgaW5zdGFuY2UgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQm9va2luZ1R5cGVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENCb29raW5nVHlwZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQXR0cmlidXRlcyhpZDogYW55LCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQm9va2luZ1R5cGVzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNoYW5nZSBzdHJlYW0uXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqICAtIGBvcHRpb25zYCDigJMgYHtvYmplY3R9YCAtIFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY2hhbmdlc2Ag4oCTIGB7UmVhZGFibGVTdHJlYW19YCAtIFxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUNoYW5nZVN0cmVhbShvcHRpb25zOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0Jvb2tpbmdUeXBlcy9jaGFuZ2Utc3RyZWFtXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBDQm9va2luZ1R5cGVzYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQ0Jvb2tpbmdUeXBlc1wiO1xuICB9XG59XG5cbi8qKlxuICogQXBpIGZvciB0aGUgYENDbGluaWNCb29raW5nVHlwZXNgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ0NsaW5pY0Jvb2tpbmdUeXBlc0FwaSBleHRlbmRzIEJhc2VMb29wQmFja0FwaSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChIdHRwKSBodHRwOiBIdHRwLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICBzdXBlcihodHRwLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDbGluaWNCb29raW5nVHlwZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlKGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ2xpbmljQm9va2luZ1R5cGVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NsaW5pY0Jvb2tpbmdUeXBlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVNYW55KGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ2xpbmljQm9va2luZ1R5cGVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhbiBleGlzdGluZyBtb2RlbCBpbnN0YW5jZSBvciBpbnNlcnQgYSBuZXcgb25lIGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ2xpbmljQm9va2luZ1R5cGVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHVwc2VydChkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ2xpbmljQm9va2luZ1R5cGVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgYSBtb2RlbCBpbnN0YW5jZSBleGlzdHMgaW4gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBleGlzdHNgIOKAkyBge2Jvb2xlYW59YCAtIFxuICAgKi9cbiAgcHVibGljIGV4aXN0cyhpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY0Jvb2tpbmdUeXBlcy86aWQvZXhpc3RzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIG1vZGVsIGluc3RhbmNlIGJ5IGlkIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMgYW5kIGluY2x1ZGVcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NsaW5pY0Jvb2tpbmdUeXBlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kQnlJZChpZDogYW55LCBmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY0Jvb2tpbmdUeXBlcy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSBmaWx0ZXIgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMsIHdoZXJlLCBpbmNsdWRlLCBvcmRlciwgb2Zmc2V0LCBhbmQgbGltaXRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ2xpbmljQm9va2luZ1R5cGVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmQoZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDbGluaWNCb29raW5nVHlwZXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGZpcnN0IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IGZpbHRlciBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcywgd2hlcmUsIGluY2x1ZGUsIG9yZGVyLCBvZmZzZXQsIGFuZCBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ2xpbmljQm9va2luZ1R5cGVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRPbmUoZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDbGluaWNCb29raW5nVHlwZXMvZmluZE9uZVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgd2hlcmUgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3Qgd2hlcmUgQ3JpdGVyaWEgdG8gbWF0Y2ggbW9kZWwgaW5zdGFuY2VzXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGUgbnVtYmVyIG9mIGluc3RhbmNlcyB1cGRhdGVkXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQWxsKHdoZXJlOiBhbnkgPSB1bmRlZmluZWQsIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ2xpbmljQm9va2luZ1R5cGVzL3VwZGF0ZVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIG1vZGVsIGluc3RhbmNlIGJ5IGlkIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDbGluaWNCb29raW5nVHlwZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQnlJZChpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY0Jvb2tpbmdUeXBlcy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgd2hlcmUgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3Qgd2hlcmUgQ3JpdGVyaWEgdG8gbWF0Y2ggbW9kZWwgaW5zdGFuY2VzXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBjb3VudGAg4oCTIGB7bnVtYmVyfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjb3VudCh3aGVyZTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY0Jvb2tpbmdUeXBlcy9jb3VudFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhdHRyaWJ1dGVzIGZvciBhIG1vZGVsIGluc3RhbmNlIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENsaW5pY0Jvb2tpbmdUeXBlcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ2xpbmljQm9va2luZ1R5cGVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUF0dHJpYnV0ZXMoaWQ6IGFueSwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQVVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY0Jvb2tpbmdUeXBlcy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjaGFuZ2Ugc3RyZWFtLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgb3B0aW9uc2Ag4oCTIGB7b2JqZWN0fWAgLSBcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNoYW5nZXNgIOKAkyBge1JlYWRhYmxlU3RyZWFtfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDaGFuZ2VTdHJlYW0ob3B0aW9uczogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDbGluaWNCb29raW5nVHlwZXMvY2hhbmdlLXN0cmVhbVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgQ0NsaW5pY0Jvb2tpbmdUeXBlc2AuXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkNDbGluaWNCb29raW5nVHlwZXNcIjtcbiAgfVxufVxuXG4vKipcbiAqIEFwaSBmb3IgdGhlIGBDRG9jdG9yQm9va2luZ1R5cGVzYCBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENEb2N0b3JCb29raW5nVHlwZXNBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cCkgaHR0cDogSHR0cCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDRG9jdG9yQm9va2luZ1R5cGVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvckJvb2tpbmdUeXBlc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENEb2N0b3JCb29raW5nVHlwZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvckJvb2tpbmdUeXBlc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0RvY3RvckJvb2tpbmdUeXBlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cHNlcnQoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQVVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvckJvb2tpbmdUeXBlc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGEgbW9kZWwgaW5zdGFuY2UgZXhpc3RzIGluIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgZXhpc3RzYCDigJMgYHtib29sZWFufWAgLSBcbiAgICovXG4gIHB1YmxpYyBleGlzdHMoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JCb29raW5nVHlwZXMvOmlkL2V4aXN0c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzIGFuZCBpbmNsdWRlXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENEb2N0b3JCb29raW5nVHlwZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZEJ5SWQoaWQ6IGFueSwgZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JCb29raW5nVHlwZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0RvY3RvckJvb2tpbmdUeXBlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9yQm9va2luZ1R5cGVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBmaXJzdCBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSBmaWx0ZXIgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMsIHdoZXJlLCBpbmNsdWRlLCBvcmRlciwgb2Zmc2V0LCBhbmQgbGltaXRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0RvY3RvckJvb2tpbmdUeXBlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT25lKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9yQm9va2luZ1R5cGVzL2ZpbmRPbmVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhlIG51bWJlciBvZiBpbnN0YW5jZXMgdXBkYXRlZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbCh3aGVyZTogYW55ID0gdW5kZWZpbmVkLCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvckJvb2tpbmdUeXBlcy91cGRhdGVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDRG9jdG9yQm9va2luZ1R5cGVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JCb29raW5nVHlwZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnQgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgY291bnQod2hlcmU6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JCb29raW5nVHlwZXMvY291bnRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYXR0cmlidXRlcyBmb3IgYSBtb2RlbCBpbnN0YW5jZSBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBEb2N0b3JCb29raW5nVHlwZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0RvY3RvckJvb2tpbmdUeXBlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVzKGlkOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JCb29raW5nVHlwZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgY2hhbmdlIHN0cmVhbS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogIC0gYG9wdGlvbnNgIOKAkyBge29iamVjdH1gIC0gXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBjaGFuZ2VzYCDigJMgYHtSZWFkYWJsZVN0cmVhbX1gIC0gXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ2hhbmdlU3RyZWFtKG9wdGlvbnM6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9yQm9va2luZ1R5cGVzL2NoYW5nZS1zdHJlYW1cIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYENEb2N0b3JCb29raW5nVHlwZXNgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJDRG9jdG9yQm9va2luZ1R5cGVzXCI7XG4gIH1cbn1cblxuLyoqXG4gKiBBcGkgZm9yIHRoZSBgQ0RvY3RvckNsaW5pY3NgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ0RvY3RvckNsaW5pY3NBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cCkgaHR0cDogSHR0cCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDRG9jdG9yQ2xpbmljc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGUoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JDbGluaWNzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0RvY3RvckNsaW5pY3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvckNsaW5pY3NcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIG1vZGVsIGluc3RhbmNlIG9yIGluc2VydCBhIG5ldyBvbmUgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENEb2N0b3JDbGluaWNzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHVwc2VydChkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9yQ2xpbmljc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGEgbW9kZWwgaW5zdGFuY2UgZXhpc3RzIGluIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgZXhpc3RzYCDigJMgYHtib29sZWFufWAgLSBcbiAgICovXG4gIHB1YmxpYyBleGlzdHMoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JDbGluaWNzLzppZC9leGlzdHNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcyBhbmQgaW5jbHVkZVxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDRG9jdG9yQ2xpbmljc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kQnlJZChpZDogYW55LCBmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvckNsaW5pY3MvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0RvY3RvckNsaW5pY3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZChmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvckNsaW5pY3NcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGZpcnN0IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IGZpbHRlciBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcywgd2hlcmUsIGluY2x1ZGUsIG9yZGVyLCBvZmZzZXQsIGFuZCBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDRG9jdG9yQ2xpbmljc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT25lKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9yQ2xpbmljcy9maW5kT25lXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSB3aGVyZSBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoZSBudW1iZXIgb2YgaW5zdGFuY2VzIHVwZGF0ZWRcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBbGwod2hlcmU6IGFueSA9IHVuZGVmaW5lZCwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JDbGluaWNzL3VwZGF0ZVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIG1vZGVsIGluc3RhbmNlIGJ5IGlkIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENEb2N0b3JDbGluaWNzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JDbGluaWNzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvdW50IGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSB3aGVyZSBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNvdW50YCDigJMgYHtudW1iZXJ9YCAtIFxuICAgKi9cbiAgcHVibGljIGNvdW50KHdoZXJlOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9yQ2xpbmljcy9jb3VudFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhdHRyaWJ1dGVzIGZvciBhIG1vZGVsIGluc3RhbmNlIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIERvY3RvckNsaW5pY3MgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0RvY3RvckNsaW5pY3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQXR0cmlidXRlcyhpZDogYW55LCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9yQ2xpbmljcy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjaGFuZ2Ugc3RyZWFtLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgb3B0aW9uc2Ag4oCTIGB7b2JqZWN0fWAgLSBcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNoYW5nZXNgIOKAkyBge1JlYWRhYmxlU3RyZWFtfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDaGFuZ2VTdHJlYW0ob3B0aW9uczogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JDbGluaWNzL2NoYW5nZS1zdHJlYW1cIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYENEb2N0b3JDbGluaWNzYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQ0RvY3RvckNsaW5pY3NcIjtcbiAgfVxufVxuXG4vKipcbiAqIEFwaSBmb3IgdGhlIGBDRG9jdG9yc2AgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDRG9jdG9yc0FwaSBleHRlbmRzIEJhc2VMb29wQmFja0FwaSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChIdHRwKSBodHRwOiBIdHRwLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICBzdXBlcihodHRwLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENEb2N0b3JzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvcnNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDRG9jdG9yc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVNYW55KGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9yc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0RvY3RvcnNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBzZXJ0KGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgYSBtb2RlbCBpbnN0YW5jZSBleGlzdHMgaW4gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBleGlzdHNgIOKAkyBge2Jvb2xlYW59YCAtIFxuICAgKi9cbiAgcHVibGljIGV4aXN0cyhpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvcnMvOmlkL2V4aXN0c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzIGFuZCBpbmNsdWRlXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENEb2N0b3JzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkKGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9ycy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSBmaWx0ZXIgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMsIHdoZXJlLCBpbmNsdWRlLCBvcmRlciwgb2Zmc2V0LCBhbmQgbGltaXRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDRG9jdG9yc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DRG9jdG9yc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgZmlyc3QgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENEb2N0b3JzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRPbmUoZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JzL2ZpbmRPbmVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhlIG51bWJlciBvZiBpbnN0YW5jZXMgdXBkYXRlZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbCh3aGVyZTogYW55ID0gdW5kZWZpbmVkLCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvcnMvdXBkYXRlXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0RvY3RvcnNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQnlJZChpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvcnMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnQgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgY291bnQod2hlcmU6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JzL2NvdW50XCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGF0dHJpYnV0ZXMgZm9yIGEgbW9kZWwgaW5zdGFuY2UgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgRG9jdG9ycyBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDRG9jdG9yc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVzKGlkOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NEb2N0b3JzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNoYW5nZSBzdHJlYW0uXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqICAtIGBvcHRpb25zYCDigJMgYHtvYmplY3R9YCAtIFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY2hhbmdlc2Ag4oCTIGB7UmVhZGFibGVTdHJlYW19YCAtIFxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUNoYW5nZVN0cmVhbShvcHRpb25zOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0RvY3RvcnMvY2hhbmdlLXN0cmVhbVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgQ0RvY3RvcnNgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJDRG9jdG9yc1wiO1xuICB9XG59XG5cbi8qKlxuICogQXBpIGZvciB0aGUgYENHYWxsZXJ5YCBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENHYWxsZXJ5QXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHApIGh0dHA6IEh0dHAsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0dhbGxlcnlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlKGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DR2FsbGVyaWVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0dhbGxlcnlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0dhbGxlcmllc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0dhbGxlcnlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBzZXJ0KGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NHYWxsZXJpZXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBhIG1vZGVsIGluc3RhbmNlIGV4aXN0cyBpbiB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGV4aXN0c2Ag4oCTIGB7Ym9vbGVhbn1gIC0gXG4gICAqL1xuICBwdWJsaWMgZXhpc3RzKGlkOiBhbnkpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DR2FsbGVyaWVzLzppZC9leGlzdHNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcyBhbmQgaW5jbHVkZVxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDR2FsbGVyeWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kQnlJZChpZDogYW55LCBmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0dhbGxlcmllcy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSBmaWx0ZXIgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMsIHdoZXJlLCBpbmNsdWRlLCBvcmRlciwgb2Zmc2V0LCBhbmQgbGltaXRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDR2FsbGVyeWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DR2FsbGVyaWVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBmaXJzdCBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSBmaWx0ZXIgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMsIHdoZXJlLCBpbmNsdWRlLCBvcmRlciwgb2Zmc2V0LCBhbmQgbGltaXRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0dhbGxlcnlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZE9uZShmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0dhbGxlcmllcy9maW5kT25lXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSB3aGVyZSBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoZSBudW1iZXIgb2YgaW5zdGFuY2VzIHVwZGF0ZWRcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBbGwod2hlcmU6IGFueSA9IHVuZGVmaW5lZCwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NHYWxsZXJpZXMvdXBkYXRlXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0dhbGxlcnlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQnlJZChpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0dhbGxlcmllcy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgd2hlcmUgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3Qgd2hlcmUgQ3JpdGVyaWEgdG8gbWF0Y2ggbW9kZWwgaW5zdGFuY2VzXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBjb3VudGAg4oCTIGB7bnVtYmVyfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjb3VudCh3aGVyZTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0dhbGxlcmllcy9jb3VudFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhdHRyaWJ1dGVzIGZvciBhIG1vZGVsIGluc3RhbmNlIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIEdhbGxlcnkgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0dhbGxlcnlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQXR0cmlidXRlcyhpZDogYW55LCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DR2FsbGVyaWVzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNoYW5nZSBzdHJlYW0uXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqICAtIGBvcHRpb25zYCDigJMgYHtvYmplY3R9YCAtIFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY2hhbmdlc2Ag4oCTIGB7UmVhZGFibGVTdHJlYW19YCAtIFxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUNoYW5nZVN0cmVhbShvcHRpb25zOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0dhbGxlcmllcy9jaGFuZ2Utc3RyZWFtXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIEdhbGxlcmllcy5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIGFueSBmayBGb3JlaWduIGtleSBmb3IgR2FsbGVyaWVzXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENHYWxsZXJ5YCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fZmluZEJ5SWRfX0NDb21wYW5pZXNfX0dhbGxlcmllcyhpZDogYW55LCBmazogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvR2FsbGVyaWVzLzpma1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGZrOiBma1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHJlbGF0ZWQgaXRlbSBieSBpZCBmb3IgR2FsbGVyaWVzLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gYW55IGZrIEZvcmVpZ24ga2V5IGZvciBHYWxsZXJpZXNcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cbiAgICovXG4gIHB1YmxpYyBfX2Rlc3Ryb3lCeUlkX19DQ29tcGFuaWVzX19HYWxsZXJpZXMoaWQ6IGFueSwgZms6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0dhbGxlcmllcy86ZmtcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIEdhbGxlcmllcy5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIGFueSBmayBGb3JlaWduIGtleSBmb3IgR2FsbGVyaWVzXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENHYWxsZXJ5YCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fdXBkYXRlQnlJZF9fQ0NvbXBhbmllc19fR2FsbGVyaWVzKGlkOiBhbnksIGZrOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0dhbGxlcmllcy86ZmtcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBRdWVyaWVzIEdhbGxlcmllcyBvZiBDQ29tcGFuaWVzLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDR2FsbGVyeWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBfX2dldF9fQ0NvbXBhbmllc19fR2FsbGVyaWVzKGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ29tcGFuaWVzLzppZC9HYWxsZXJpZXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgaW4gR2FsbGVyaWVzIG9mIHRoaXMgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENHYWxsZXJ5YCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fY3JlYXRlX19DQ29tcGFuaWVzX19HYWxsZXJpZXMoaWQ6IGFueSwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0dhbGxlcmllc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgaW4gR2FsbGVyaWVzIG9mIHRoaXMgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0dhbGxlcnlgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgX19jcmVhdGVNYW55X19DQ29tcGFuaWVzX19HYWxsZXJpZXMoaWQ6IGFueSwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0dhbGxlcmllc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIEdhbGxlcmllcyBvZiB0aGlzIG1vZGVsLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgcmV0dXJucyBubyBkYXRhLlxuICAgKi9cbiAgcHVibGljIF9fZGVsZXRlX19DQ29tcGFuaWVzX19HYWxsZXJpZXMoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0dhbGxlcmllc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvdW50cyBHYWxsZXJpZXMgb2YgQ0NvbXBhbmllcy5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNvdW50YCDigJMgYHtudW1iZXJ9YCAtIFxuICAgKi9cbiAgcHVibGljIF9fY291bnRfX0NDb21wYW5pZXNfX0dhbGxlcmllcyhpZDogYW55LCB3aGVyZTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvR2FsbGVyaWVzL2NvdW50XCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYENHYWxsZXJ5YC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQ0dhbGxlcnlcIjtcbiAgfVxufVxuXG4vKipcbiAqIEFwaSBmb3IgdGhlIGBDUGVvcGxlYCBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENQZW9wbGVBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cCkgaHR0cDogSHR0cCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUGVvcGxlYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Blb3BsZVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENQZW9wbGVgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Blb3BsZVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Blb3BsZWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cHNlcnQoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQVVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Blb3BsZVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGEgbW9kZWwgaW5zdGFuY2UgZXhpc3RzIGluIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgZXhpc3RzYCDigJMgYHtib29sZWFufWAgLSBcbiAgICovXG4gIHB1YmxpYyBleGlzdHMoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NQZW9wbGUvOmlkL2V4aXN0c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzIGFuZCBpbmNsdWRlXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENQZW9wbGVgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZEJ5SWQoaWQ6IGFueSwgZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NQZW9wbGUvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Blb3BsZWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUGVvcGxlXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBmaXJzdCBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSBmaWx0ZXIgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMsIHdoZXJlLCBpbmNsdWRlLCBvcmRlciwgb2Zmc2V0LCBhbmQgbGltaXRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Blb3BsZWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT25lKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUGVvcGxlL2ZpbmRPbmVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhlIG51bWJlciBvZiBpbnN0YW5jZXMgdXBkYXRlZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbCh3aGVyZTogYW55ID0gdW5kZWZpbmVkLCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Blb3BsZS91cGRhdGVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUGVvcGxlYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NQZW9wbGUvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnQgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgY291bnQod2hlcmU6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NQZW9wbGUvY291bnRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYXR0cmlidXRlcyBmb3IgYSBtb2RlbCBpbnN0YW5jZSBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBQZW9wbGUgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Blb3BsZWAgb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVzKGlkOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NQZW9wbGUvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgY2hhbmdlIHN0cmVhbS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogIC0gYG9wdGlvbnNgIOKAkyBge29iamVjdH1gIC0gXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBjaGFuZ2VzYCDigJMgYHtSZWFkYWJsZVN0cmVhbX1gIC0gXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ2hhbmdlU3RyZWFtKG9wdGlvbnM6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUGVvcGxlL2NoYW5nZS1zdHJlYW1cIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYENQZW9wbGVgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJDUGVvcGxlXCI7XG4gIH1cbn1cblxuLyoqXG4gKiBBcGkgZm9yIHRoZSBgQ1Jvc3RlckRheXNgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ1Jvc3RlckRheXNBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cCkgaHR0cDogSHR0cCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUm9zdGVyRGF5c2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGUoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJEYXlzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlckRheXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlckRheXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIG1vZGVsIGluc3RhbmNlIG9yIGluc2VydCBhIG5ldyBvbmUgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSb3N0ZXJEYXlzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHVwc2VydChkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyRGF5c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGEgbW9kZWwgaW5zdGFuY2UgZXhpc3RzIGluIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgZXhpc3RzYCDigJMgYHtib29sZWFufWAgLSBcbiAgICovXG4gIHB1YmxpYyBleGlzdHMoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJEYXlzLzppZC9leGlzdHNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcyBhbmQgaW5jbHVkZVxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUm9zdGVyRGF5c2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kQnlJZChpZDogYW55LCBmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlckRheXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlckRheXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZChmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlckRheXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGZpcnN0IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IGZpbHRlciBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcywgd2hlcmUsIGluY2x1ZGUsIG9yZGVyLCBvZmZzZXQsIGFuZCBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUm9zdGVyRGF5c2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT25lKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyRGF5cy9maW5kT25lXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSB3aGVyZSBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoZSBudW1iZXIgb2YgaW5zdGFuY2VzIHVwZGF0ZWRcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBbGwod2hlcmU6IGFueSA9IHVuZGVmaW5lZCwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJEYXlzL3VwZGF0ZVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIG1vZGVsIGluc3RhbmNlIGJ5IGlkIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSb3N0ZXJEYXlzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJEYXlzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvdW50IGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSB3aGVyZSBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNvdW50YCDigJMgYHtudW1iZXJ9YCAtIFxuICAgKi9cbiAgcHVibGljIGNvdW50KHdoZXJlOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyRGF5cy9jb3VudFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhdHRyaWJ1dGVzIGZvciBhIG1vZGVsIGluc3RhbmNlIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIFJvc3RlckRheXMgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlckRheXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQXR0cmlidXRlcyhpZDogYW55LCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyRGF5cy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjaGFuZ2Ugc3RyZWFtLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgb3B0aW9uc2Ag4oCTIGB7b2JqZWN0fWAgLSBcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNoYW5nZXNgIOKAkyBge1JlYWRhYmxlU3RyZWFtfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDaGFuZ2VTdHJlYW0ob3B0aW9uczogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJEYXlzL2NoYW5nZS1zdHJlYW1cIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYENSb3N0ZXJEYXlzYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQ1Jvc3RlckRheXNcIjtcbiAgfVxufVxuXG4vKipcbiAqIEFwaSBmb3IgdGhlIGBDUm9zdGVyUGxhY2VzYCBtb2RlbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENSb3N0ZXJQbGFjZXNBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cCkgaHR0cDogSHR0cCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUm9zdGVyUGxhY2VzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlclBsYWNlc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSb3N0ZXJQbGFjZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlclBsYWNlc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlclBsYWNlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cHNlcnQoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQVVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlclBsYWNlc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGEgbW9kZWwgaW5zdGFuY2UgZXhpc3RzIGluIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgZXhpc3RzYCDigJMgYHtib29sZWFufWAgLSBcbiAgICovXG4gIHB1YmxpYyBleGlzdHMoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJQbGFjZXMvOmlkL2V4aXN0c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzIGFuZCBpbmNsdWRlXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSb3N0ZXJQbGFjZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZEJ5SWQoaWQ6IGFueSwgZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJQbGFjZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlclBsYWNlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyUGxhY2VzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBmaXJzdCBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSBmaWx0ZXIgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMsIHdoZXJlLCBpbmNsdWRlLCBvcmRlciwgb2Zmc2V0LCBhbmQgbGltaXRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlclBsYWNlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT25lKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyUGxhY2VzL2ZpbmRPbmVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhlIG51bWJlciBvZiBpbnN0YW5jZXMgdXBkYXRlZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbCh3aGVyZTogYW55ID0gdW5kZWZpbmVkLCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlclBsYWNlcy91cGRhdGVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUm9zdGVyUGxhY2VzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJQbGFjZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnQgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgY291bnQod2hlcmU6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJQbGFjZXMvY291bnRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYXR0cmlidXRlcyBmb3IgYSBtb2RlbCBpbnN0YW5jZSBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBSb3N0ZXJQbGFjZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlclBsYWNlc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVzKGlkOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJQbGFjZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgY2hhbmdlIHN0cmVhbS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogIC0gYG9wdGlvbnNgIOKAkyBge29iamVjdH1gIC0gXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBjaGFuZ2VzYCDigJMgYHtSZWFkYWJsZVN0cmVhbX1gIC0gXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ2hhbmdlU3RyZWFtKG9wdGlvbnM6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyUGxhY2VzL2NoYW5nZS1zdHJlYW1cIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYENSb3N0ZXJQbGFjZXNgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJDUm9zdGVyUGxhY2VzXCI7XG4gIH1cbn1cblxuLyoqXG4gKiBBcGkgZm9yIHRoZSBgQ1Jldmlld3NgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ1Jldmlld3NBcGkgZXh0ZW5kcyBCYXNlTG9vcEJhY2tBcGkge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoSHR0cCkgaHR0cDogSHR0cCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVycm9ySGFuZGxlcikgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgZXJyb3JIYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUmV2aWV3c2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGUoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSZXZpZXdzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jldmlld3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jldmlld3NcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIG1vZGVsIGluc3RhbmNlIG9yIGluc2VydCBhIG5ldyBvbmUgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSZXZpZXdzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHVwc2VydChkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUmV2aWV3c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGEgbW9kZWwgaW5zdGFuY2UgZXhpc3RzIGluIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgZXhpc3RzYCDigJMgYHtib29sZWFufWAgLSBcbiAgICovXG4gIHB1YmxpYyBleGlzdHMoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSZXZpZXdzLzppZC9leGlzdHNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcyBhbmQgaW5jbHVkZVxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUmV2aWV3c2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kQnlJZChpZDogYW55LCBmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jldmlld3MvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jldmlld3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZChmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jldmlld3NcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGZpcnN0IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IGZpbHRlciBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcywgd2hlcmUsIGluY2x1ZGUsIG9yZGVyLCBvZmZzZXQsIGFuZCBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUmV2aWV3c2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT25lKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUmV2aWV3cy9maW5kT25lXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSB3aGVyZSBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoZSBudW1iZXIgb2YgaW5zdGFuY2VzIHVwZGF0ZWRcbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBbGwod2hlcmU6IGFueSA9IHVuZGVmaW5lZCwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSZXZpZXdzL3VwZGF0ZVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIG1vZGVsIGluc3RhbmNlIGJ5IGlkIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSZXZpZXdzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSZXZpZXdzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvdW50IGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSB3aGVyZSBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB3aGVyZSBDcml0ZXJpYSB0byBtYXRjaCBtb2RlbCBpbnN0YW5jZXNcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNvdW50YCDigJMgYHtudW1iZXJ9YCAtIFxuICAgKi9cbiAgcHVibGljIGNvdW50KHdoZXJlOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUmV2aWV3cy9jb3VudFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhdHRyaWJ1dGVzIGZvciBhIG1vZGVsIGluc3RhbmNlIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIFJldmlld3MgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jldmlld3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQXR0cmlidXRlcyhpZDogYW55LCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUmV2aWV3cy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjaGFuZ2Ugc3RyZWFtLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgb3B0aW9uc2Ag4oCTIGB7b2JqZWN0fWAgLSBcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNoYW5nZXNgIOKAkyBge1JlYWRhYmxlU3RyZWFtfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDaGFuZ2VTdHJlYW0ob3B0aW9uczogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSZXZpZXdzL2NoYW5nZS1zdHJlYW1cIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYENSZXZpZXdzYC5cbiAgICovXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQ1Jldmlld3NcIjtcbiAgfVxufVxuXG4vKipcbiAqIEFwaSBmb3IgdGhlIGBDUm9zdGVyVGltZXNgIG1vZGVsLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ1Jvc3RlclRpbWVzQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHApIGh0dHA6IEh0dHAsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlclRpbWVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlclRpbWVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlclRpbWVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZU1hbnkoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJUaW1lc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ1Jvc3RlclRpbWVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIHVwc2VydChkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBVVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyVGltZXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciBhIG1vZGVsIGluc3RhbmNlIGV4aXN0cyBpbiB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGV4aXN0c2Ag4oCTIGB7Ym9vbGVhbn1gIC0gXG4gICAqL1xuICBwdWJsaWMgZXhpc3RzKGlkOiBhbnkpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyVGltZXMvOmlkL2V4aXN0c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzIGFuZCBpbmNsdWRlXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSb3N0ZXJUaW1lc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kQnlJZChpZDogYW55LCBmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlclRpbWVzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhbGwgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IGZpbHRlciBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcywgd2hlcmUsIGluY2x1ZGUsIG9yZGVyLCBvZmZzZXQsIGFuZCBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSb3N0ZXJUaW1lc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyVGltZXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGZpcnN0IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IGZpbHRlciBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgRmlsdGVyIGRlZmluaW5nIGZpZWxkcywgd2hlcmUsIGluY2x1ZGUsIG9yZGVyLCBvZmZzZXQsIGFuZCBsaW1pdFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDUm9zdGVyVGltZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZE9uZShmaWx0ZXI6IExvb3BCYWNrRmlsdGVySW50ZXJmYWNlID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlclRpbWVzL2ZpbmRPbmVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhlIG51bWJlciBvZiBpbnN0YW5jZXMgdXBkYXRlZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbCh3aGVyZTogYW55ID0gdW5kZWZpbmVkLCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ1Jvc3RlclRpbWVzL3VwZGF0ZVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIG1vZGVsIGluc3RhbmNlIGJ5IGlkIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSb3N0ZXJUaW1lc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBkZWxldGVCeUlkKGlkOiBhbnkpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkRFTEVURVwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DUm9zdGVyVGltZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnQgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgY291bnQod2hlcmU6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJUaW1lcy9jb3VudFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKHdoZXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy53aGVyZSA9IHdoZXJlO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhdHRyaWJ1dGVzIGZvciBhIG1vZGVsIGluc3RhbmNlIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIFJvc3RlclRpbWVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENSb3N0ZXJUaW1lc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVzKGlkOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJUaW1lcy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjaGFuZ2Ugc3RyZWFtLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiAgLSBgb3B0aW9uc2Ag4oCTIGB7b2JqZWN0fWAgLSBcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIERhdGEgcHJvcGVydGllczpcbiAgICpcbiAgICogIC0gYGNoYW5nZXNgIOKAkyBge1JlYWRhYmxlU3RyZWFtfWAgLSBcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVDaGFuZ2VTdHJlYW0ob3B0aW9uczogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NSb3N0ZXJUaW1lcy9jaGFuZ2Utc3RyZWFtXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBDUm9zdGVyVGltZXNgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJDUm9zdGVyVGltZXNcIjtcbiAgfVxufVxuXG4vKipcbiAqIEFwaSBmb3IgdGhlIGBDQ2xpbmljc2AgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDQ2xpbmljc0FwaSBleHRlbmRzIEJhc2VMb29wQmFja0FwaSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChIdHRwKSBodHRwOiBIdHRwLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRXJyb3JIYW5kbGVyKSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICBzdXBlcihodHRwLCBlcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDbGluaWNzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY3NcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBtb2RlbCBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ2xpbmljc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVNYW55KGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ2xpbmljc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NsaW5pY3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgdXBzZXJ0KGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDbGluaWNzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgYSBtb2RlbCBpbnN0YW5jZSBleGlzdHMgaW4gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIE1vZGVsIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBleGlzdHNgIOKAkyBge2Jvb2xlYW59YCAtIFxuICAgKi9cbiAgcHVibGljIGV4aXN0cyhpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY3MvOmlkL2V4aXN0c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzIGFuZCBpbmNsdWRlXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDbGluaWNzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkKGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ2xpbmljcy86aWRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIGluc3RhbmNlcyBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSBmaWx0ZXIgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMsIHdoZXJlLCBpbmNsdWRlLCBvcmRlciwgb2Zmc2V0LCBhbmQgbGltaXRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ2xpbmljc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ2xpbmljc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgZmlyc3QgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDbGluaWNzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGZpbmRPbmUoZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDbGluaWNzL2ZpbmRPbmVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhlIG51bWJlciBvZiBpbnN0YW5jZXMgdXBkYXRlZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbCh3aGVyZTogYW55ID0gdW5kZWZpbmVkLCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY3MvdXBkYXRlXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgbW9kZWwgaW5zdGFuY2UgYnkgaWQgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgTW9kZWwgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NsaW5pY3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQnlJZChpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY3MvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnQgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgY291bnQod2hlcmU6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDbGluaWNzL2NvdW50XCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAod2hlcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLndoZXJlID0gd2hlcmU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGF0dHJpYnV0ZXMgZm9yIGEgbW9kZWwgaW5zdGFuY2UgYW5kIHBlcnNpc3QgaXQgaW50byB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ2xpbmljcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ2xpbmljc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVzKGlkOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDbGluaWNzLzppZFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGNoYW5nZSBzdHJlYW0uXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqICAtIGBvcHRpb25zYCDigJMgYHtvYmplY3R9YCAtIFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY2hhbmdlc2Ag4oCTIGB7UmVhZGFibGVTdHJlYW19YCAtIFxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUNoYW5nZVN0cmVhbShvcHRpb25zOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NsaW5pY3MvY2hhbmdlLXN0cmVhbVwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgcmVsYXRlZCBpdGVtIGJ5IGlkIGZvciBDbGluaWNzLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gYW55IGZrIEZvcmVpZ24ga2V5IGZvciBDbGluaWNzXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDbGluaWNzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fZmluZEJ5SWRfX0NDb21wYW5pZXNfX0NsaW5pY3MoaWQ6IGFueSwgZms6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0NsaW5pY3MvOmZrXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZms6IGZrXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgcmVsYXRlZCBpdGVtIGJ5IGlkIGZvciBDbGluaWNzLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gYW55IGZrIEZvcmVpZ24ga2V5IGZvciBDbGluaWNzXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIG5vIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgX19kZXN0cm95QnlJZF9fQ0NvbXBhbmllc19fQ2xpbmljcyhpZDogYW55LCBmazogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvQ2xpbmljcy86ZmtcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIENsaW5pY3MuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgZmsgRm9yZWlnbiBrZXkgZm9yIENsaW5pY3NcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NsaW5pY3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgX191cGRhdGVCeUlkX19DQ29tcGFuaWVzX19DbGluaWNzKGlkOiBhbnksIGZrOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0NsaW5pY3MvOmZrXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZms6IGZrXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUXVlcmllcyBDbGluaWNzIG9mIENDb21wYW5pZXMuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDbGluaWNzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fZ2V0X19DQ29tcGFuaWVzX19DbGluaWNzKGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ29tcGFuaWVzLzppZC9DbGluaWNzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIGluIENsaW5pY3Mgb2YgdGhpcyBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NsaW5pY3NgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgX19jcmVhdGVfX0NDb21wYW5pZXNfX0NsaW5pY3MoaWQ6IGFueSwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0NsaW5pY3NcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIGluIENsaW5pY3Mgb2YgdGhpcyBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ2xpbmljc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBfX2NyZWF0ZU1hbnlfX0NDb21wYW5pZXNfX0NsaW5pY3MoaWQ6IGFueSwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQT1NUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0NsaW5pY3NcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFsbCBDbGluaWNzIG9mIHRoaXMgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIG5vIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgX19kZWxldGVfX0NDb21wYW5pZXNfX0NsaW5pY3MoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0NsaW5pY3NcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3VudHMgQ2xpbmljcyBvZiBDQ29tcGFuaWVzLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgX19jb3VudF9fQ0NvbXBhbmllc19fQ2xpbmljcyhpZDogYW55LCB3aGVyZTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvQ2xpbmljcy9jb3VudFwiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBDQ2xpbmljc2AuXG4gICAqL1xuICBwdWJsaWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkNDbGluaWNzXCI7XG4gIH1cbn1cblxuLyoqXG4gKiBBcGkgZm9yIHRoZSBgQ0NvbXBhbmllc2AgbW9kZWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDQ29tcGFuaWVzQXBpIGV4dGVuZHMgQmFzZUxvb3BCYWNrQXBpIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEh0dHApIGh0dHA6IEh0dHAsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChFcnJvckhhbmRsZXIpIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKGh0dHAsIGVycm9ySGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBhIHJlbGF0ZWQgaXRlbSBieSBpZCBmb3IgQ2xpbmljcy5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIGFueSBmayBGb3JlaWduIGtleSBmb3IgQ2xpbmljc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ29tcGFuaWVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fZmluZEJ5SWRfX0NsaW5pY3MoaWQ6IGFueSwgZms6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0NsaW5pY3MvOmZrXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkLFxuICAgICAgZms6IGZrXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIGEgcmVsYXRlZCBpdGVtIGJ5IGlkIGZvciBDbGluaWNzLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gYW55IGZrIEZvcmVpZ24ga2V5IGZvciBDbGluaWNzXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIG5vIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgX19kZXN0cm95QnlJZF9fQ2xpbmljcyhpZDogYW55LCBmazogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvQ2xpbmljcy86ZmtcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIENsaW5pY3MuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgZmsgRm9yZWlnbiBrZXkgZm9yIENsaW5pY3NcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NvbXBhbmllc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBfX3VwZGF0ZUJ5SWRfX0NsaW5pY3MoaWQ6IGFueSwgZms6IGFueSwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQVVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvQ2xpbmljcy86ZmtcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgcmVsYXRlZCBpdGVtIGJ5IGlkIGZvciBHYWxsZXJpZXMuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgZmsgRm9yZWlnbiBrZXkgZm9yIEdhbGxlcmllc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ29tcGFuaWVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fZmluZEJ5SWRfX0dhbGxlcmllcyhpZDogYW55LCBmazogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvR2FsbGVyaWVzLzpma1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGZrOiBma1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBhIHJlbGF0ZWQgaXRlbSBieSBpZCBmb3IgR2FsbGVyaWVzLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gYW55IGZrIEZvcmVpZ24ga2V5IGZvciBHYWxsZXJpZXNcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cbiAgICovXG4gIHB1YmxpYyBfX2Rlc3Ryb3lCeUlkX19HYWxsZXJpZXMoaWQ6IGFueSwgZms6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL0dhbGxlcmllcy86ZmtcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBmazogZmtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSByZWxhdGVkIGl0ZW0gYnkgaWQgZm9yIEdhbGxlcmllcy5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIGFueSBmayBGb3JlaWduIGtleSBmb3IgR2FsbGVyaWVzXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDb21wYW5pZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgX191cGRhdGVCeUlkX19HYWxsZXJpZXMoaWQ6IGFueSwgZms6IGFueSwgZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQVVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvR2FsbGVyaWVzLzpma1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIGZrOiBma1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXJpZXMgQ2xpbmljcyBvZiBDQ29tcGFuaWVzLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0W10gQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ29tcGFuaWVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIF9fZ2V0X19DbGluaWNzKGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ29tcGFuaWVzLzppZC9DbGluaWNzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIGluIENsaW5pY3Mgb2YgdGhpcyBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NvbXBhbmllc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBfX2NyZWF0ZV9fQ2xpbmljcyhpZDogYW55LCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvQ2xpbmljc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIENsaW5pY3Mgb2YgdGhpcyBtb2RlbC5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJldHVybnMgbm8gZGF0YS5cbiAgICovXG4gIHB1YmxpYyBfX2RlbGV0ZV9fQ2xpbmljcyhpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvQ2xpbmljc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvdW50cyBDbGluaWNzIG9mIENDb21wYW5pZXMuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3Qgd2hlcmUgQ3JpdGVyaWEgdG8gbWF0Y2ggbW9kZWwgaW5zdGFuY2VzXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBjb3VudGAg4oCTIGB7bnVtYmVyfWAgLSBcbiAgICovXG4gIHB1YmxpYyBfX2NvdW50X19DbGluaWNzKGlkOiBhbnksIHdoZXJlOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ29tcGFuaWVzLzppZC9DbGluaWNzL2NvdW50XCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUXVlcmllcyBHYWxsZXJpZXMgb2YgQ0NvbXBhbmllcy5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBmaWx0ZXIgXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NvbXBhbmllc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBfX2dldF9fR2FsbGVyaWVzKGlkOiBhbnksIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ29tcGFuaWVzLzppZC9HYWxsZXJpZXNcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG4gICAgaWYgKGZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuZmlsdGVyID0gZmlsdGVyO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgaW4gR2FsbGVyaWVzIG9mIHRoaXMgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZGF0YSBSZXF1ZXN0IGRhdGEuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4cGVjdHMgYSBzdWJzZXQgb2YgbW9kZWwgcHJvcGVydGllcyBhcyByZXF1ZXN0IHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDb21wYW5pZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgX19jcmVhdGVfX0dhbGxlcmllcyhpZDogYW55LCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvR2FsbGVyaWVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBhbGwgR2FsbGVyaWVzIG9mIHRoaXMgbW9kZWwuXG4gICAqXG4gICAqIEBwYXJhbSBhbnkgaWQgQ29tcGFuaWVzIGlkXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIG5vIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgX19kZWxldGVfX0dhbGxlcmllcyhpZDogYW55KSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJERUxFVEVcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy86aWQvR2FsbGVyaWVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnRzIEdhbGxlcmllcyBvZiBDQ29tcGFuaWVzLlxuICAgKlxuICAgKiBAcGFyYW0gYW55IGlkIENvbXBhbmllcyBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgX19jb3VudF9fR2FsbGVyaWVzKGlkOiBhbnksIHdoZXJlOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ29tcGFuaWVzLzppZC9HYWxsZXJpZXMvY291bnRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgICBpZDogaWRcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ29tcGFuaWVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGFuZCBwZXJzaXN0IGl0IGludG8gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3RbXSBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDb21wYW5pZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlTWFueShkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgbW9kZWwgaW5zdGFuY2Ugb3IgaW5zZXJ0IGEgbmV3IG9uZSBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NvbXBhbmllc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cHNlcnQoZGF0YTogYW55ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IG1ldGhvZDogc3RyaW5nID0gXCJQVVRcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllc1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtczogYW55ID0ge307XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGEgbW9kZWwgaW5zdGFuY2UgZXhpc3RzIGluIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgZXhpc3RzYCDigJMgYHtib29sZWFufWAgLSBcbiAgICovXG4gIHB1YmxpYyBleGlzdHMoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkL2V4aXN0c1wiO1xuICAgIGxldCB1cmxQYXJhbXM6IGFueSA9IHtcbiAgICAgIGlkOiBpZFxuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcblxuICAgIGxldCByZXN1bHQgPSB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHVybFBhcmFtcywgcGFyYW1zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzIGFuZCBpbmNsdWRlXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiA8ZW0+XG4gICAqIChUaGUgcmVtb3RlIG1ldGhvZCBkZWZpbml0aW9uIGRvZXMgbm90IHByb3ZpZGUgYW55IGRlc2NyaXB0aW9uLlxuICAgKiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHJlc3BvbnNlIGlzIGEgYENDb21wYW5pZXNgIG9iamVjdC4pXG4gICAqIDwvZW0+XG4gICAqL1xuICBwdWJsaWMgZmluZEJ5SWQoaWQ6IGFueSwgZmlsdGVyOiBMb29wQmFja0ZpbHRlckludGVyZmFjZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCBpbnN0YW5jZXMgb2YgdGhlIG1vZGVsIG1hdGNoZWQgYnkgZmlsdGVyIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGZpbHRlciBGaWx0ZXIgZGVmaW5pbmcgZmllbGRzLCB3aGVyZSwgaW5jbHVkZSwgb3JkZXIsIG9mZnNldCwgYW5kIGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdFtdIEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NvbXBhbmllc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ29tcGFuaWVzXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBpZiAoZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHBhcmFtcy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBmaXJzdCBpbnN0YW5jZSBvZiB0aGUgbW9kZWwgbWF0Y2hlZCBieSBmaWx0ZXIgZnJvbSB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgZmlsdGVyIEZpbHRlciBkZWZpbmluZyBmaWVsZHMsIHdoZXJlLCBpbmNsdWRlLCBvcmRlciwgb2Zmc2V0LCBhbmQgbGltaXRcbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NvbXBhbmllc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyBmaW5kT25lKGZpbHRlcjogTG9vcEJhY2tGaWx0ZXJJbnRlcmZhY2UgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ29tcGFuaWVzL2ZpbmRPbmVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmIChmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcGFyYW1zLmZpbHRlciA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IGRhdGEgUmVxdWVzdCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBleHBlY3RzIGEgc3Vic2V0IG9mIG1vZGVsIHByb3BlcnRpZXMgYXMgcmVxdWVzdCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhlIG51bWJlciBvZiBpbnN0YW5jZXMgdXBkYXRlZFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZUFsbCh3aGVyZTogYW55ID0gdW5kZWZpbmVkLCBkYXRhOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgbWV0aG9kOiBzdHJpbmcgPSBcIlBPU1RcIjtcblxuICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpICsgXCIvQ0NvbXBhbmllcy91cGRhdGVcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcywgZGF0YSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBtb2RlbCBpbnN0YW5jZSBieSBpZCBmcm9tIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBNb2RlbCBpZFxuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogPGVtPlxuICAgKiAoVGhlIHJlbW90ZSBtZXRob2QgZGVmaW5pdGlvbiBkb2VzIG5vdCBwcm92aWRlIGFueSBkZXNjcmlwdGlvbi5cbiAgICogVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSByZXNwb25zZSBpcyBhIGBDQ29tcGFuaWVzYCBvYmplY3QuKVxuICAgKiA8L2VtPlxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IGFueSkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiREVMRVRFXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ291bnQgaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBtYXRjaGVkIGJ5IHdoZXJlIGZyb20gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHdoZXJlIENyaXRlcmlhIHRvIG1hdGNoIG1vZGVsIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBvYmplY3QgQW4gZW1wdHkgcmVmZXJlbmNlIHRoYXQgd2lsbCBiZVxuICAgKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YSBvbmNlIHRoZSByZXNwb25zZSBpcyByZXR1cm5lZFxuICAgKiAgIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogRGF0YSBwcm9wZXJ0aWVzOlxuICAgKlxuICAgKiAgLSBgY291bnRgIOKAkyBge251bWJlcn1gIC0gXG4gICAqL1xuICBwdWJsaWMgY291bnQod2hlcmU6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvY291bnRcIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIGlmICh3aGVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMud2hlcmUgPSB3aGVyZTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB1cmxQYXJhbXMsIHBhcmFtcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYXR0cmlidXRlcyBmb3IgYSBtb2RlbCBpbnN0YW5jZSBhbmQgcGVyc2lzdCBpdCBpbnRvIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogQHBhcmFtIGFueSBpZCBDb21wYW5pZXMgaWRcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgZXhwZWN0cyBhIHN1YnNldCBvZiBtb2RlbCBwcm9wZXJ0aWVzIGFzIHJlcXVlc3QgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHJldHVybnMgb2JqZWN0IEFuIGVtcHR5IHJlZmVyZW5jZSB0aGF0IHdpbGwgYmVcbiAgICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEgb25jZSB0aGUgcmVzcG9uc2UgaXMgcmV0dXJuZWRcbiAgICogICBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIDxlbT5cbiAgICogKFRoZSByZW1vdGUgbWV0aG9kIGRlZmluaXRpb24gZG9lcyBub3QgcHJvdmlkZSBhbnkgZGVzY3JpcHRpb24uXG4gICAqIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgcmVzcG9uc2UgaXMgYSBgQ0NvbXBhbmllc2Agb2JqZWN0LilcbiAgICogPC9lbT5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVBdHRyaWJ1dGVzKGlkOiBhbnksIGRhdGE6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUFVUXCI7XG5cbiAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFBhdGgoKSArIFwiL0NDb21wYW5pZXMvOmlkXCI7XG4gICAgbGV0IHVybFBhcmFtczogYW55ID0ge1xuICAgICAgaWQ6IGlkXG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIGRhdGEpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgY2hhbmdlIHN0cmVhbS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBkYXRhIFJlcXVlc3QgZGF0YS5cbiAgICpcbiAgICogIC0gYG9wdGlvbnNgIOKAkyBge29iamVjdH1gIC0gXG4gICAqXG4gICAqIEByZXR1cm5zIG9iamVjdCBBbiBlbXB0eSByZWZlcmVuY2UgdGhhdCB3aWxsIGJlXG4gICAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhIG9uY2UgdGhlIHJlc3BvbnNlIGlzIHJldHVybmVkXG4gICAqICAgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEYXRhIHByb3BlcnRpZXM6XG4gICAqXG4gICAqICAtIGBjaGFuZ2VzYCDigJMgYHtSZWFkYWJsZVN0cmVhbX1gIC0gXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQ2hhbmdlU3RyZWFtKG9wdGlvbnM6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCBtZXRob2Q6IHN0cmluZyA9IFwiUE9TVFwiO1xuXG4gICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRQYXRoKCkgKyBcIi9DQ29tcGFuaWVzL2NoYW5nZS1zdHJlYW1cIjtcbiAgICBsZXQgdXJsUGFyYW1zOiBhbnkgPSB7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXM6IGFueSA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdCA9IHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgdXJsUGFyYW1zLCBwYXJhbXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYENDb21wYW5pZXNgLlxuICAgKi9cbiAgcHVibGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJDQ29tcGFuaWVzXCI7XG4gIH1cbn1cblxuXG5cbiJdfQ==
