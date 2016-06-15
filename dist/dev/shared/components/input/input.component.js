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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTRDLGVBQWUsQ0FBQyxDQUFBO0FBQzVELHVCQUE4RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hGLHVCQUFzRCxpQkFDdEQsQ0FBQyxDQURzRTtBQUN2RSx5QkFBd0Isc0JBQXNCLENBQUMsQ0FBQTtBQVEvQztJQU1DO0lBRUEsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFQywrQ0FBc0IsR0FBdEI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksVUFBVyxDQUFDLENBQUMsQ0FBQztZQUN2RSxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3BCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQ3JHLE1BQU0sQ0FBQyxPQUFPLENBQUE7UUFDaEIsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0osTUFBTSxDQUFDLFNBQVMsQ0FBQTtRQUNsQixDQUFDO0lBQ0gsQ0FBQztJQUVELDRDQUFtQixHQUFuQjtRQUNFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFBLENBQUM7WUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFBLENBQUM7WUFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDeEMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNsQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDO0lBdENIO1FBQUMsWUFBSyxFQUFFOzttREFBQTtJQUNQO1FBQUMsWUFBSyxFQUFFOzt1REFBQTtJQVZWO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxnREFBZ0Q7WUFDN0QsVUFBVSxFQUFFLENBQUMsd0JBQWUsRUFBRSx3QkFBZSxFQUFDLGlCQUFRLEVBQUUscUJBQVksRUFBRSx3QkFBZSxFQUFDLGdCQUFPLEVBQUMsZUFBTSxFQUFDLG1CQUFRLENBQUM7U0FDL0csQ0FBQzs7c0JBQUE7SUE0Q0YscUJBQUM7QUFBRCxDQTFDQSxBQTBDQyxJQUFBO0FBMUNZLHNCQUFjLGlCQTBDMUIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvY29tcG9uZW50cy9pbnB1dC9pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxJbnB1dCxPdXRwdXQsT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTLCBGT1JNX0RJUkVDVElWRVMsTmdDbGFzcyxOZ0Zvcm19IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQge05nU3dpdGNoLCBOZ1N3aXRjaFdoZW4sIE5nU3dpdGNoRGVmYXVsdH0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJ1xuaW1wb3J0IHtDYWxlbmRhcn0gIGZyb20gJy4uL2NhbGVuZGFyL2NhbGVuZGFyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXktaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2hhcmVkL2NvbXBvbmVudHMvaW5wdXQvaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBkaXJlY3RpdmVzOiBbRk9STV9ESVJFQ1RJVkVTLCBDT1JFX0RJUkVDVElWRVMsTmdTd2l0Y2gsIE5nU3dpdGNoV2hlbiwgTmdTd2l0Y2hEZWZhdWx0LE5nQ2xhc3MsTmdGb3JtLENhbGVuZGFyXVxufSlcblxuZXhwb3J0IGNsYXNzIElucHV0Q29tcG9uZW50IHtcblxuXHRwdWJsaWMgaHRtbEVsZW1lbnRUeXBlOiBzdHJpbmc7XG5cdEBJbnB1dCgpIG9wdGlvbnM6T2JqZWN0O1xuIFx0QElucHV0KCkgaXNTdWJtaXR0ZWQ6Ym9vbGVhbjsgLy8gc3RvcmVkIHZhbHVlXG4gIFx0XHRcblx0Y29uc3RydWN0b3IoKXtcblxuXHR9XG5cblx0bmdPbkluaXQoKXtcblx0XHR0aGlzLmh0bWxFbGVtZW50VHlwZSA9IHRoaXMuY29tcHV0ZUh0bWxFbGVtZW50VHlwZSgpO1xuXHR9XG5cbiAgXHRjb21wdXRlSHRtbEVsZW1lbnRUeXBlKCk6IHN0cmluZyB7XG5cdCAgICBpZiAodGhpcy5vcHRpb25zLnR5cGUgPT0gXCJib29sZWFuXCIgfHwgdGhpcy5vcHRpb25zLnR5cGUgPT0gXCJjaGVja2JveFwiICkge1xuXHQgICAgICByZXR1cm4gXCJjaGVja2JveFwiO1xuXHQgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudHlwZSA9PSBcIm9wdGlvblwiKSB7XG5cdCAgICAgIHJldHVybiBcIm9wdGlvblwiO1xuXHQgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMudHlwZSA9PSBcImRhdGVcIikge1xuXHQgICAgICByZXR1cm4gXCJkYXRlXCI7XG5cdCAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy50eXBlID09IFwidGltZVwiKSB7XG5cdCAgICAgIHJldHVybiBcInRpbWVcIjtcblx0ICAgIH0gXHQgICAgIFxuXHQgICAgZWxzZSBpZiAodGhpcy5vcHRpb25zLnR5cGUgPT0gXCJ0ZXh0XCIgfHwgdGhpcy5vcHRpb25zLnR5cGUgPT0gXCJlbWFpbFwiIHx8IHRoaXMub3B0aW9ucy50eXBlID09IFwibnVtYmVyXCIpe1xuXHQgICAgICByZXR1cm4gXCJpbnB1dFwiXG5cdCAgICB9ZWxzZXtcblx0ICAgICAgcmV0dXJuIFwidW5rbm93blwiXG5cdCAgICB9XG4gIFx0fVxuICBcbiAgXHRjb21wdXRlSW5wdXRTdWJUeXBlKCl7XG5cdCAgICBpZih0aGlzLm9wdGlvbnMudHlwZSA9PSBcInRleHRcIil7XG5cdCAgICAgIHJldHVybiBcInRleHRcIjtcblx0ICAgIH0gZWxzZSBpZih0aGlzLm9wdGlvbnMudHlwZSA9PSBcImVtYWlsXCIpe1xuXHQgICAgICByZXR1cm4gXCJlbWFpbFwiO1xuXHQgICAgfSBlbHNlIGlmKCB0aGlzLm9wdGlvbnMudHlwZSA9PSBcIm51bWJlclwiKXtcblx0ICAgICAgcmV0dXJuIFwibnVtYmVyXCI7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXR1cm4gXCJ0ZXh0XCI7XG5cdCAgICB9XG4gIFx0fVx0XG59XG4iXX0=
