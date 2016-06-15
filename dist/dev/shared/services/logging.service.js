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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrQyxlQUFlLENBQUMsQ0FBQTtBQUVsRCxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUlqQztJQUVFO0lBRUEsQ0FBQztJQUVNLHNCQUFHLEdBQVY7UUFBVyxjQUFjO2FBQWQsV0FBYyxDQUFkLHNCQUFjLENBQWQsSUFBYztZQUFkLDZCQUFjOztRQUV2QixJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUM7YUFDOUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUM7YUFDMUIsT0FBTyxDQUFDLDRCQUE0QixFQUFFLGdCQUFnQixDQUFDO2FBQ3ZELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO1FBRTlELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBckJIO1FBQUMsaUJBQVUsRUFBRTs7Z0JBQUE7SUF1QmIsZUFBQztBQUFELENBdEJBLEFBc0JDLElBQUE7QUF0QlksZ0JBQVEsV0FzQnBCLENBQUE7QUFFVSx5QkFBaUIsR0FBYztJQUNwQyxjQUFPLENBQUMsUUFBUSxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDO0NBQ3hDLENBQUMiLCJmaWxlIjoic2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgcHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01vbWVudH0gZnJvbSAnbW9tZW50L21vbWVudCc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuLy8gZG8gd2hhdGV2ZXIgeW91IHdhbnQgZm9yIGxvZ2dpbmcgaGVyZSwgYWRkIG1ldGhvZHMgZm9yIGxvZyBsZXZlbHMgZXRjLlxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE15TG9nZ2VyIHtcblxuICBjb25zdHJ1Y3RvciAoKXtcblxuICB9XG5cbiAgcHVibGljIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgIFxuICAgIHZhciBlID0gbmV3IEVycm9yKCdkdW1teScpO1xuICBcdHZhciBzdGFjayA9IGUuc3RhY2sucmVwbGFjZSgvXlteXFwoXSs/W1xcbiRdL2dtLCAnJylcbiAgICAgIC5yZXBsYWNlKC9eXFxzK2F0XFxzKy9nbSwgJycpXG4gICAgICAucmVwbGFjZSgvXk9iamVjdC48YW5vbnltb3VzPlxccypcXCgvZ20sICd7YW5vbnltb3VzfSgpQCcpXG4gICAgICAuc3BsaXQoJ1xcbicpO1xuICBcdGxldCBmdWxsUGF0aCA9IHN0YWNrWzFdO1xuICAgIGxldCBzdWJQYXRoID0gZnVsbFBhdGguc3Vic3RyaW5nKGZ1bGxQYXRoLmluZGV4T2YoJygnKSArIDEgLGZ1bGxQYXRoLmxlbmd0aCAtIDEpO1xuICBcdGNvbnNvbGUubG9nKHN1YlBhdGgpO1xuICAgIGFyZ3Muc3BsaWNlKDAsIDAsIHN1YlBhdGgpO1xuICAgIGFyZ3Muc3BsaWNlKDAsIDAsIG1vbWVudCgpLmZvcm1hdCgnWVlZWS9NTS9ERCBISDptbTpzcy5TU1MnKSk7XG4gIFx0Ly9hcmdzLnB1c2goc3RhY2tbMV0pO1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICB9XG5cbn1cblxuZXhwb3J0IHZhciBMT0dHSU5HX1BST1ZJREVSUzpQcm92aWRlcltdID0gW1xuICAgICAgcHJvdmlkZShNeUxvZ2dlciwge3VzZUNsYXNzOiBNeUxvZ2dlcn0pLFxuICAgIF07Il19
