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
//# sourceMappingURL=lbservices_.js.map