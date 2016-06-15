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
var common_1 = require('angular2/common');
var common_2 = require('angular2/common');
var calendar_1 = require('../calendar/calendar');
var InputComponent = (function () {
    function InputComponent() {
    }
    InputComponent.prototype.ngOnInit = function () {
        this.htmlElementType = this.computeHtmlElementType();
    };
    InputComponent.prototype.computeHtmlElementType = function () {
        if (this.options.type == "boolean" || this.options.type == "checkbox") {
            return "checkbox";
        }
        else if (this.options.type == "option") {
            return "option";
        }
        else if (this.options.type == "date") {
            return "date";
        }
        else if (this.options.type == "time") {
            return "time";
        }
        else if (this.options.type == "text" || this.options.type == "email" || this.options.type == "number") {
            return "input";
        }
        else {
            return "unknown";
        }
    };
    InputComponent.prototype.computeInputSubType = function () {
        if (this.options.type == "text") {
            return "text";
        }
        else if (this.options.type == "email") {
            return "email";
        }
        else if (this.options.type == "number") {
            return "number";
        }
        else {
            return "text";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InputComponent.prototype, "isSubmitted", void 0);
    InputComponent = __decorate([
        core_1.Component({
            selector: 'my-input',
            templateUrl: './shared/components/input/input.component.html',
            directives: [common_1.FORM_DIRECTIVES, common_1.CORE_DIRECTIVES, common_2.NgSwitch, common_2.NgSwitchWhen, common_2.NgSwitchDefault, common_1.NgClass, common_1.NgForm, calendar_1.Calendar]
        }), 
        __metadata('design:paramtypes', [])
    ], InputComponent);
    return InputComponent;
}());
exports.InputComponent = InputComponent;
//# sourceMappingURL=input.component.js.map