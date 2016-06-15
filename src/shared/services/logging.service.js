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
var moment = require('moment');
var MyLogger = (function () {
    function MyLogger() {
    }
    MyLogger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var e = new Error('dummy');
        var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
            .split('\n');
        var fullPath = stack[1];
        var subPath = fullPath.substring(fullPath.indexOf('(') + 1, fullPath.length - 1);
        console.log(subPath);
        args.splice(0, 0, subPath);
        args.splice(0, 0, moment().format('YYYY/MM/DD HH:mm:ss.SSS'));
        console.log.apply(console, args);
    };
    MyLogger = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyLogger);
    return MyLogger;
}());
exports.MyLogger = MyLogger;
exports.LOGGING_PROVIDERS = [
    core_1.provide(MyLogger, { useClass: MyLogger }),
];
//# sourceMappingURL=logging.service.js.map