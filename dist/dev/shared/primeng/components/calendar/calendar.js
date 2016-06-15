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
var button_1 = require('../button/button');
var common_1 = require('angular2/common');
var CALENDAR_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Calendar; }),
    multi: true
});
var Calendar = (function () {
    function Calendar(el, zone) {
        this.el = el;
        this.zone = zone;
        this.inline = false;
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.hourMin = 0;
        this.hourMax = 23;
        this.minuteMin = 0;
        this.minuteMax = 59;
        this.secondMin = 0;
        this.secondMax = 59;
        this.hourGrid = 0;
        this.minuteGrid = 0;
        this.secondGrid = 0;
        this.onBlur = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.initialized = false;
    }
    Calendar.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.calendarElement = this.inline ? jQuery(this.el.nativeElement.children[0]) : jQuery(this.el.nativeElement.children[0].children[0]);
        var options = {
            showAnim: this.showAnim,
            dateFormat: this.dateFormat,
            showButtonPanel: this.showButtonPanel,
            changeMonth: this.monthNavigator,
            changeYear: this.yearNavigator,
            numberOfMonths: this.numberOfMonths,
            showWeek: this.showWeek,
            showOtherMonths: this.showOtherMonths,
            selectOtherMonths: this.selectOtherMonths,
            defaultDate: this.defaultDate,
            minDate: this.minDate,
            maxDate: this.maxDate,
            onSelect: function (dateText) {
                _this.zone.run(function () {
                    _this.value = dateText;
                    _this.onModelChange(_this.value);
                    _this.onSelect.emit(_this.value);
                });
            }
        };
        if (this.locale) {
            for (var prop in this.locale) {
                options[prop] = this.locale[prop];
            }
        }
        if (this.timeFormat || this.timeOnly) {
            options['timeFormat'] = this.timeFormat;
            options['timeOnly'] = this.timeOnly;
            options['stepHour'] = this.stepHour;
            options['stepMinute'] = this.stepMinute;
            options['stepSecond'] = this.stepSecond;
            options['hourMin'] = this.hourMin;
            options['hourMax'] = this.hourMax;
            options['minuteMin'] = this.minuteMin;
            options['minuteMax'] = this.minuteMax;
            options['secondMin'] = this.secondMin;
            options['secondMax'] = this.secondMax;
            options['hourGrid'] = this.hourGrid;
            options['minuteGrid'] = this.minuteGrid;
            options['secondGrid'] = this.secondGrid;
            options['controlType'] = this.timeControlType;
            options['oneLine'] = this.horizontalTimeControls;
            options['minTime'] = this.minTime;
            options['maxTime'] = this.maxTime;
            options['timezoneList'] = this.timezoneList;
            this.calendarElement.datetimepicker(options);
        }
        else
            this.calendarElement.datepicker(options);
        this.initialized = true;
    };
    Calendar.prototype.onInput = function (event) {
        this.onModelChange(event.target.value);
    };
    Calendar.prototype.handleBlur = function (event) {
        this.value = event.target.value;
        this.onModelTouched();
        this.focused = false;
        this.onBlur.emit(event);
    };
    Calendar.prototype.writeValue = function (value) {
        this.value = value;
    };
    Calendar.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Calendar.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Calendar.prototype.ngOnChanges = function (changes) {
        if (this.initialized) {
            for (var key in changes) {
                this.calendarElement.datepicker('option', key, changes[key].currentValue);
            }
        }
    };
    Calendar.prototype.ngOnDestroy = function () {
        this.calendarElement.datepicker('destroy');
        this.calendarElement = null;
        this.initialized = false;
    };
    Calendar.prototype.onButtonClick = function (event, input) {
        input.focus();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "readonlyInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "inline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "showAnim", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "dateFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showButtonPanel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "monthNavigator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "yearNavigator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "numberOfMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showWeek", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showOtherMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "selectOtherMonths", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "showIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "timeFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "timeOnly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "stepHour", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "stepMinute", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "stepSecond", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "hourMin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "hourMax", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "minuteMin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "minuteMax", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "secondMin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "secondMax", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "hourGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "minuteGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Calendar.prototype, "secondGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "timeControlType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Calendar.prototype, "horizontalTimeControls", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "minTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Calendar.prototype, "maxTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Calendar.prototype, "timezoneList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Calendar.prototype, "locale", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Calendar.prototype, "onBlur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Calendar.prototype, "onSelect", void 0);
    Calendar = __decorate([
        core_1.Component({
            selector: 'p-calendar',
            template: "\n        <span [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"'ui-calendar'\" *ngIf=\"!inline\">\n        <input #in type=\"text\" [attr.placeholder]=\"placeholder\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\"\n                [value]=\"value||''\" (input)=\"onInput($event)\" [readonly]=\"readonlyInput\"\n                [disabled]=\"disabled\" (mouseenter)=\"hovered=true\" (mouseleave)=\"hovered=false\" (focus)=\"focused=true\" (blur)=\"handleBlur($event)\"\n                [ngClass]=\"{'ui-inputtext ui-widget ui-state-default': true, 'ui-corner-all': !showIcon, 'ui-corner-left': showIcon,\n                    'ui-state-hover':hovered,'ui-state-focus':focused,'ui-state-disabled':disabled}\"\n        ><button type=\"button\" icon=\"fa-calendar\" pButton *ngIf=\"showIcon\" (click)=\"onButtonClick($event,in)\" class=\"ui-datepicker-trigger\"></button></span>\n        <div *ngIf=\"inline\"></div>\n    ",
            directives: [button_1.Button],
            providers: [CALENDAR_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
    ], Calendar);
    return Calendar;
}());
exports.Calendar = Calendar;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvY2FsZW5kYXIvY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF1SSxlQUFlLENBQUMsQ0FBQTtBQUN2Six1QkFBcUIsa0JBQWtCLENBQUMsQ0FBQTtBQUN4Qyx1QkFBc0QsaUJBQWlCLENBQUMsQ0FBQTtBQUV4RSxJQUFNLHVCQUF1QixHQUFhLElBQUksZUFBUSxDQUFDLDBCQUFpQixFQUFFO0lBQ3RFLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxRQUFRLEVBQVIsQ0FBUSxDQUFDO0lBQ3ZDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBaUJIO0lBc0dJLGtCQUFvQixFQUFjLEVBQVUsSUFBVztRQUFuQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTztRQXhGOUMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQWtDeEIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBRXJCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFFdEIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUV2QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFFdkIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFjdEIsV0FBTSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUUvQyxhQUFRLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBSTNELGtCQUFhLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxjQUFPLENBQUMsQ0FBQztRQVdoQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsa0NBQWUsR0FBZjtRQUFBLGlCQXdEQztRQXZERyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkksSUFBSSxPQUFPLEdBQUc7WUFDVixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDaEMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQzlCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUI7WUFDekMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLFVBQUMsUUFBZ0I7Z0JBQ3ZCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNWLEtBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO29CQUN0QixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDL0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7U0FDSixDQUFDO1FBRUYsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixHQUFHLENBQUEsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsQ0FBQztRQUNMLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7WUFDakQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELElBQUk7WUFDQSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsMEJBQU8sR0FBUCxVQUFRLEtBQUs7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxtQ0FBZ0IsR0FBaEIsVUFBaUIsRUFBWTtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLEVBQVk7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELDhCQUFXLEdBQVgsVUFBWSxPQUFzQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5RSxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELGdDQUFhLEdBQWIsVUFBYyxLQUFLLEVBQUMsS0FBSztRQUNyQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQXpNRDtRQUFDLFlBQUssRUFBRTs7bURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7MkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7cURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7aURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7cURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7b0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7bURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7b0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7cURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7dURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7aURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7K0NBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7K0NBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7K0NBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7K0NBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7cURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NERBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7a0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLGFBQU0sRUFBRTs7NENBQUE7SUFFVDtRQUFDLGFBQU0sRUFBRTs7OENBQUE7SUFyR2I7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFHLG82QkFTVjtZQUNELFVBQVUsRUFBRSxDQUFDLGVBQU0sQ0FBQztZQUNwQixTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUN2QyxDQUFDOztnQkFBQTtJQTZNRixlQUFDO0FBQUQsQ0E1TUEsQUE0TUMsSUFBQTtBQTVNWSxnQkFBUSxXQTRNcEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uRGVzdHJveSxPbkNoYW5nZXMsSW5wdXQsT3V0cHV0LFNpbXBsZUNoYW5nZSxFdmVudEVtaXR0ZXIsZm9yd2FyZFJlZixQcm92aWRlcixOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5cbmNvbnN0IENBTEVOREFSX1ZBTFVFX0FDQ0VTU09SOiBQcm92aWRlciA9IG5ldyBQcm92aWRlcihOR19WQUxVRV9BQ0NFU1NPUiwge1xuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENhbGVuZGFyKSxcbiAgICBtdWx0aTogdHJ1ZVxufSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jYWxlbmRhcicsXG4gICAgdGVtcGxhdGU6ICBgXG4gICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdDbGFzc109XCIndWktY2FsZW5kYXInXCIgKm5nSWY9XCIhaW5saW5lXCI+XG4gICAgICAgIDxpbnB1dCAjaW4gdHlwZT1cInRleHRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIiBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbdmFsdWVdPVwidmFsdWV8fCcnXCIgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiIFtyZWFkb25seV09XCJyZWFkb25seUlucHV0XCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAobW91c2VlbnRlcik9XCJob3ZlcmVkPXRydWVcIiAobW91c2VsZWF2ZSk9XCJob3ZlcmVkPWZhbHNlXCIgKGZvY3VzKT1cImZvY3VzZWQ9dHJ1ZVwiIChibHVyKT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOiB0cnVlLCAndWktY29ybmVyLWFsbCc6ICFzaG93SWNvbiwgJ3VpLWNvcm5lci1sZWZ0Jzogc2hvd0ljb24sXG4gICAgICAgICAgICAgICAgICAgICd1aS1zdGF0ZS1ob3Zlcic6aG92ZXJlZCwndWktc3RhdGUtZm9jdXMnOmZvY3VzZWQsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIlxuICAgICAgICA+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWNvbj1cImZhLWNhbGVuZGFyXCIgcEJ1dHRvbiAqbmdJZj1cInNob3dJY29uXCIgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soJGV2ZW50LGluKVwiIGNsYXNzPVwidWktZGF0ZXBpY2tlci10cmlnZ2VyXCI+PC9idXR0b24+PC9zcGFuPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiaW5saW5lXCI+PC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbQnV0dG9uXSxcbiAgICBwcm92aWRlcnM6IFtDQUxFTkRBUl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uQ2hhbmdlcyxPbkRlc3Ryb3ksQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHlJbnB1dDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaW5saW5lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzaG93QW5pbTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGF0ZUZvcm1hdDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2hvd0J1dHRvblBhbmVsOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbW9udGhOYXZpZ2F0b3I6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB5ZWFyTmF2aWdhdG9yOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbnVtYmVyT2ZNb250aHM6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHNob3dXZWVrOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvd090aGVyTW9udGhzOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2VsZWN0T3RoZXJNb250aHM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBkZWZhdWx0RGF0ZTogYW55O1xuXG4gICAgQElucHV0KCkgbWluRGF0ZTogYW55O1xuXG4gICAgQElucHV0KCkgbWF4RGF0ZTogYW55O1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBzaG93SWNvbjogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSB0aW1lRm9ybWF0OiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgdGltZU9ubHk6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgc3RlcEhvdXI6IG51bWJlciA9IDE7XG4gICAgXG4gICAgQElucHV0KCkgc3RlcE1pbnV0ZTogbnVtYmVyID0gMTtcbiAgICBcbiAgICBASW5wdXQoKSBzdGVwU2Vjb25kOiBudW1iZXIgPSAxO1xuICAgIFxuICAgIEBJbnB1dCgpIGhvdXJNaW46IG51bWJlciA9IDA7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIGhvdXJNYXg6IG51bWJlciA9IDIzO1xuICAgICAgICBcbiAgICBASW5wdXQoKSBtaW51dGVNaW46IG51bWJlciA9IDA7XG4gICAgXG4gICAgQElucHV0KCkgbWludXRlTWF4OiBudW1iZXIgPSA1OTtcbiAgICBcbiAgICBASW5wdXQoKSBzZWNvbmRNaW46IG51bWJlciA9IDA7XG4gICAgXG4gICAgQElucHV0KCkgc2Vjb25kTWF4OiBudW1iZXIgPSA1OTtcbiAgICBcbiAgICBASW5wdXQoKSBob3VyR3JpZDogbnVtYmVyID0gMDtcbiAgICBcbiAgICBASW5wdXQoKSBtaW51dGVHcmlkOiBudW1iZXIgPSAwO1xuICAgIFxuICAgIEBJbnB1dCgpIHNlY29uZEdyaWQ6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSB0aW1lQ29udHJvbFR5cGU6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBob3Jpem9udGFsVGltZUNvbnRyb2xzOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIG1pblRpbWU6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgdGltZXpvbmVMaXN0OiBzdHJpbmdbXTtcbiAgICBcbiAgICBASW5wdXQoKSBsb2NhbGU6IGFueTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIGhvdmVyZWQ6IGJvb2xlYW47XG5cbiAgICBmb2N1c2VkOiBib29sZWFuO1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgY2FsZW5kYXJFbGVtZW50OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHpvbmU6Tmdab25lKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJFbGVtZW50ID0gdGhpcy5pbmxpbmUgPyBqUXVlcnkodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKSA6IGpRdWVyeSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0pO1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHNob3dBbmltOiB0aGlzLnNob3dBbmltLFxuICAgICAgICAgICAgZGF0ZUZvcm1hdDogdGhpcy5kYXRlRm9ybWF0LFxuICAgICAgICAgICAgc2hvd0J1dHRvblBhbmVsOiB0aGlzLnNob3dCdXR0b25QYW5lbCxcbiAgICAgICAgICAgIGNoYW5nZU1vbnRoOiB0aGlzLm1vbnRoTmF2aWdhdG9yLFxuICAgICAgICAgICAgY2hhbmdlWWVhcjogdGhpcy55ZWFyTmF2aWdhdG9yLFxuICAgICAgICAgICAgbnVtYmVyT2ZNb250aHM6IHRoaXMubnVtYmVyT2ZNb250aHMsXG4gICAgICAgICAgICBzaG93V2VlazogdGhpcy5zaG93V2VlayxcbiAgICAgICAgICAgIHNob3dPdGhlck1vbnRoczogdGhpcy5zaG93T3RoZXJNb250aHMsXG4gICAgICAgICAgICBzZWxlY3RPdGhlck1vbnRoczogdGhpcy5zZWxlY3RPdGhlck1vbnRocyxcbiAgICAgICAgICAgIGRlZmF1bHREYXRlOiB0aGlzLmRlZmF1bHREYXRlLFxuICAgICAgICAgICAgbWluRGF0ZTogdGhpcy5taW5EYXRlLFxuICAgICAgICAgICAgbWF4RGF0ZTogdGhpcy5tYXhEYXRlLFxuICAgICAgICAgICAgb25TZWxlY3Q6IChkYXRlVGV4dDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBkYXRlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgZm9yKHZhciBwcm9wIGluIHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uc1twcm9wXSA9IHRoaXMubG9jYWxlW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnRpbWVGb3JtYXR8fHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgIG9wdGlvbnNbJ3RpbWVGb3JtYXQnXSA9IHRoaXMudGltZUZvcm1hdDtcbiAgICAgICAgICAgIG9wdGlvbnNbJ3RpbWVPbmx5J10gPSB0aGlzLnRpbWVPbmx5O1xuICAgICAgICAgICAgb3B0aW9uc1snc3RlcEhvdXInXSA9IHRoaXMuc3RlcEhvdXI7XG4gICAgICAgICAgICBvcHRpb25zWydzdGVwTWludXRlJ10gPSB0aGlzLnN0ZXBNaW51dGU7XG4gICAgICAgICAgICBvcHRpb25zWydzdGVwU2Vjb25kJ10gPSB0aGlzLnN0ZXBTZWNvbmQ7XG4gICAgICAgICAgICBvcHRpb25zWydob3VyTWluJ10gPSB0aGlzLmhvdXJNaW47XG4gICAgICAgICAgICBvcHRpb25zWydob3VyTWF4J10gPSB0aGlzLmhvdXJNYXg7XG4gICAgICAgICAgICBvcHRpb25zWydtaW51dGVNaW4nXSA9IHRoaXMubWludXRlTWluO1xuICAgICAgICAgICAgb3B0aW9uc1snbWludXRlTWF4J10gPSB0aGlzLm1pbnV0ZU1heDtcbiAgICAgICAgICAgIG9wdGlvbnNbJ3NlY29uZE1pbiddID0gdGhpcy5zZWNvbmRNaW47XG4gICAgICAgICAgICBvcHRpb25zWydzZWNvbmRNYXgnXSA9IHRoaXMuc2Vjb25kTWF4O1xuICAgICAgICAgICAgb3B0aW9uc1snaG91ckdyaWQnXSA9IHRoaXMuaG91ckdyaWQ7XG4gICAgICAgICAgICBvcHRpb25zWydtaW51dGVHcmlkJ10gPSB0aGlzLm1pbnV0ZUdyaWQ7XG4gICAgICAgICAgICBvcHRpb25zWydzZWNvbmRHcmlkJ10gPSB0aGlzLnNlY29uZEdyaWQ7XG4gICAgICAgICAgICBvcHRpb25zWydjb250cm9sVHlwZSddID0gdGhpcy50aW1lQ29udHJvbFR5cGU7XG4gICAgICAgICAgICBvcHRpb25zWydvbmVMaW5lJ10gPSB0aGlzLmhvcml6b250YWxUaW1lQ29udHJvbHM7XG4gICAgICAgICAgICBvcHRpb25zWydtaW5UaW1lJ10gPSB0aGlzLm1pblRpbWU7XG4gICAgICAgICAgICBvcHRpb25zWydtYXhUaW1lJ10gPSB0aGlzLm1heFRpbWU7XG4gICAgICAgICAgICBvcHRpb25zWyd0aW1lem9uZUxpc3QnXSA9IHRoaXMudGltZXpvbmVMaXN0O1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhckVsZW1lbnQuZGF0ZXRpbWVwaWNrZXIob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhckVsZW1lbnQuZGF0ZXBpY2tlcihvcHRpb25zKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBvbklucHV0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkPWZhbHNlO1xuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczoge1trZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhckVsZW1lbnQuZGF0ZXBpY2tlcignb3B0aW9uJywga2V5LCBjaGFuZ2VzW2tleV0uY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyRWxlbWVudC5kYXRlcGlja2VyKCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBvbkJ1dHRvbkNsaWNrKGV2ZW50LGlucHV0KSB7XG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxufSJdfQ==
