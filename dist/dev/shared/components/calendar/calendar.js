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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBdUksZUFBZSxDQUFDLENBQUE7QUFDdkosdUJBQXFCLGtCQUFrQixDQUFDLENBQUE7QUFDeEMsdUJBQXNELGlCQUFpQixDQUFDLENBQUE7QUFFeEUsSUFBTSx1QkFBdUIsR0FBYSxJQUFJLGVBQVEsQ0FBQywwQkFBaUIsRUFBRTtJQUN0RSxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsUUFBUSxFQUFSLENBQVEsQ0FBQztJQUN2QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQWlCSDtJQXNHSSxrQkFBb0IsRUFBYyxFQUFVLElBQVc7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLFNBQUksR0FBSixJQUFJLENBQU87UUF4RjlDLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFrQ3hCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFFckIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFFcEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUVyQixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFFdkIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBRXZCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFFckIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBY3RCLFdBQU0sR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFL0MsYUFBUSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUkzRCxrQkFBYSxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFXaEMs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QUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O29EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O29EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3VEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzRDQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7OzRDQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7OzhDQUFBO0lBckdiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRyxvNkJBU1Y7WUFDRCxVQUFVLEVBQUUsQ0FBQyxlQUFNLENBQUM7WUFDcEIsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDdkMsQ0FBQzs7Z0JBQUE7SUE2TUYsZUFBQztBQUFELENBNU1BLEFBNE1DLElBQUE7QUE1TVksZ0JBQVEsV0E0TXBCLENBQUEiLCJmaWxlIjoic2hhcmVkL2NvbXBvbmVudHMvY2FsZW5kYXIvY2FsZW5kYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LE9uQ2hhbmdlcyxJbnB1dCxPdXRwdXQsU2ltcGxlQ2hhbmdlLEV2ZW50RW1pdHRlcixmb3J3YXJkUmVmLFByb3ZpZGVyLE5nWm9uZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcblxuY29uc3QgQ0FMRU5EQVJfVkFMVUVfQUNDRVNTT1I6IFByb3ZpZGVyID0gbmV3IFByb3ZpZGVyKE5HX1ZBTFVFX0FDQ0VTU09SLCB7XG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2FsZW5kYXIpLFxuICAgIG11bHRpOiB0cnVlXG59KTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNhbGVuZGFyJyxcbiAgICB0ZW1wbGF0ZTogIGBcbiAgICAgICAgPHNwYW4gW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cIid1aS1jYWxlbmRhcidcIiAqbmdJZj1cIiFpbmxpbmVcIj5cbiAgICAgICAgPGlucHV0ICNpbiB0eXBlPVwidGV4dFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZXx8JydcIiAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQpXCIgW3JlYWRvbmx5XT1cInJlYWRvbmx5SW5wdXRcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChtb3VzZWVudGVyKT1cImhvdmVyZWQ9dHJ1ZVwiIChtb3VzZWxlYXZlKT1cImhvdmVyZWQ9ZmFsc2VcIiAoZm9jdXMpPVwiZm9jdXNlZD10cnVlXCIgKGJsdXIpPVwiaGFuZGxlQmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCc6IHRydWUsICd1aS1jb3JuZXItYWxsJzogIXNob3dJY29uLCAndWktY29ybmVyLWxlZnQnOiBzaG93SWNvbixcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWhvdmVyJzpob3ZlcmVkLCd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXNlZCwndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkfVwiXG4gICAgICAgID48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpY29uPVwiZmEtY2FsZW5kYXJcIiBwQnV0dG9uICpuZ0lmPVwic2hvd0ljb25cIiAoY2xpY2spPVwib25CdXR0b25DbGljaygkZXZlbnQsaW4pXCIgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLXRyaWdnZXJcIj48L2J1dHRvbj48L3NwYW4+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJpbmxpbmVcIj48L2Rpdj5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtCdXR0b25dLFxuICAgIHByb3ZpZGVyczogW0NBTEVOREFSX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25DaGFuZ2VzLE9uRGVzdHJveSxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSByZWFkb25seUlucHV0OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNob3dBbmltOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkYXRlRm9ybWF0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzaG93QnV0dG9uUGFuZWw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBtb250aE5hdmlnYXRvcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHllYXJOYXZpZ2F0b3I6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBudW1iZXJPZk1vbnRoczogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgc2hvd1dlZWs6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzaG93T3RoZXJNb250aHM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzZWxlY3RPdGhlck1vbnRoczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRlZmF1bHREYXRlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBtaW5EYXRlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBtYXhEYXRlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHNob3dJY29uOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIHRpbWVGb3JtYXQ6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSB0aW1lT25seTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBzdGVwSG91cjogbnVtYmVyID0gMTtcbiAgICBcbiAgICBASW5wdXQoKSBzdGVwTWludXRlOiBudW1iZXIgPSAxO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0ZXBTZWNvbmQ6IG51bWJlciA9IDE7XG4gICAgXG4gICAgQElucHV0KCkgaG91ck1pbjogbnVtYmVyID0gMDtcbiAgICAgICAgXG4gICAgQElucHV0KCkgaG91ck1heDogbnVtYmVyID0gMjM7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIG1pbnV0ZU1pbjogbnVtYmVyID0gMDtcbiAgICBcbiAgICBASW5wdXQoKSBtaW51dGVNYXg6IG51bWJlciA9IDU5O1xuICAgIFxuICAgIEBJbnB1dCgpIHNlY29uZE1pbjogbnVtYmVyID0gMDtcbiAgICBcbiAgICBASW5wdXQoKSBzZWNvbmRNYXg6IG51bWJlciA9IDU5O1xuICAgIFxuICAgIEBJbnB1dCgpIGhvdXJHcmlkOiBudW1iZXIgPSAwO1xuICAgIFxuICAgIEBJbnB1dCgpIG1pbnV0ZUdyaWQ6IG51bWJlciA9IDA7XG4gICAgXG4gICAgQElucHV0KCkgc2Vjb25kR3JpZDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHRpbWVDb250cm9sVHlwZTogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGhvcml6b250YWxUaW1lQ29udHJvbHM6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgbWluVGltZTogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIG1heFRpbWU6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSB0aW1lem9uZUxpc3Q6IHN0cmluZ1tdO1xuICAgIFxuICAgIEBJbnB1dCgpIGxvY2FsZTogYW55O1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgaG92ZXJlZDogYm9vbGVhbjtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcbiAgICBcbiAgICBjYWxlbmRhckVsZW1lbnQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgem9uZTpOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhckVsZW1lbnQgPSB0aGlzLmlubGluZSA/IGpRdWVyeSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0pIDogalF1ZXJ5KHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXSk7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgc2hvd0FuaW06IHRoaXMuc2hvd0FuaW0sXG4gICAgICAgICAgICBkYXRlRm9ybWF0OiB0aGlzLmRhdGVGb3JtYXQsXG4gICAgICAgICAgICBzaG93QnV0dG9uUGFuZWw6IHRoaXMuc2hvd0J1dHRvblBhbmVsLFxuICAgICAgICAgICAgY2hhbmdlTW9udGg6IHRoaXMubW9udGhOYXZpZ2F0b3IsXG4gICAgICAgICAgICBjaGFuZ2VZZWFyOiB0aGlzLnllYXJOYXZpZ2F0b3IsXG4gICAgICAgICAgICBudW1iZXJPZk1vbnRoczogdGhpcy5udW1iZXJPZk1vbnRocyxcbiAgICAgICAgICAgIHNob3dXZWVrOiB0aGlzLnNob3dXZWVrLFxuICAgICAgICAgICAgc2hvd090aGVyTW9udGhzOiB0aGlzLnNob3dPdGhlck1vbnRocyxcbiAgICAgICAgICAgIHNlbGVjdE90aGVyTW9udGhzOiB0aGlzLnNlbGVjdE90aGVyTW9udGhzLFxuICAgICAgICAgICAgZGVmYXVsdERhdGU6IHRoaXMuZGVmYXVsdERhdGUsXG4gICAgICAgICAgICBtaW5EYXRlOiB0aGlzLm1pbkRhdGUsXG4gICAgICAgICAgICBtYXhEYXRlOiB0aGlzLm1heERhdGUsXG4gICAgICAgICAgICBvblNlbGVjdDogKGRhdGVUZXh0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGVUZXh0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICBmb3IodmFyIHByb3AgaW4gdGhpcy5sb2NhbGUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zW3Byb3BdID0gdGhpcy5sb2NhbGVbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMudGltZUZvcm1hdHx8dGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgb3B0aW9uc1sndGltZUZvcm1hdCddID0gdGhpcy50aW1lRm9ybWF0O1xuICAgICAgICAgICAgb3B0aW9uc1sndGltZU9ubHknXSA9IHRoaXMudGltZU9ubHk7XG4gICAgICAgICAgICBvcHRpb25zWydzdGVwSG91ciddID0gdGhpcy5zdGVwSG91cjtcbiAgICAgICAgICAgIG9wdGlvbnNbJ3N0ZXBNaW51dGUnXSA9IHRoaXMuc3RlcE1pbnV0ZTtcbiAgICAgICAgICAgIG9wdGlvbnNbJ3N0ZXBTZWNvbmQnXSA9IHRoaXMuc3RlcFNlY29uZDtcbiAgICAgICAgICAgIG9wdGlvbnNbJ2hvdXJNaW4nXSA9IHRoaXMuaG91ck1pbjtcbiAgICAgICAgICAgIG9wdGlvbnNbJ2hvdXJNYXgnXSA9IHRoaXMuaG91ck1heDtcbiAgICAgICAgICAgIG9wdGlvbnNbJ21pbnV0ZU1pbiddID0gdGhpcy5taW51dGVNaW47XG4gICAgICAgICAgICBvcHRpb25zWydtaW51dGVNYXgnXSA9IHRoaXMubWludXRlTWF4O1xuICAgICAgICAgICAgb3B0aW9uc1snc2Vjb25kTWluJ10gPSB0aGlzLnNlY29uZE1pbjtcbiAgICAgICAgICAgIG9wdGlvbnNbJ3NlY29uZE1heCddID0gdGhpcy5zZWNvbmRNYXg7XG4gICAgICAgICAgICBvcHRpb25zWydob3VyR3JpZCddID0gdGhpcy5ob3VyR3JpZDtcbiAgICAgICAgICAgIG9wdGlvbnNbJ21pbnV0ZUdyaWQnXSA9IHRoaXMubWludXRlR3JpZDtcbiAgICAgICAgICAgIG9wdGlvbnNbJ3NlY29uZEdyaWQnXSA9IHRoaXMuc2Vjb25kR3JpZDtcbiAgICAgICAgICAgIG9wdGlvbnNbJ2NvbnRyb2xUeXBlJ10gPSB0aGlzLnRpbWVDb250cm9sVHlwZTtcbiAgICAgICAgICAgIG9wdGlvbnNbJ29uZUxpbmUnXSA9IHRoaXMuaG9yaXpvbnRhbFRpbWVDb250cm9scztcbiAgICAgICAgICAgIG9wdGlvbnNbJ21pblRpbWUnXSA9IHRoaXMubWluVGltZTtcbiAgICAgICAgICAgIG9wdGlvbnNbJ21heFRpbWUnXSA9IHRoaXMubWF4VGltZTtcbiAgICAgICAgICAgIG9wdGlvbnNbJ3RpbWV6b25lTGlzdCddID0gdGhpcy50aW1lem9uZUxpc3Q7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyRWxlbWVudC5kYXRldGltZXBpY2tlcihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyRWxlbWVudC5kYXRlcGlja2VyKG9wdGlvbnMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIG9uSW5wdXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgfVxuICAgIFxuICAgIGhhbmRsZUJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmZvY3VzZWQ9ZmFsc2U7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyRWxlbWVudC5kYXRlcGlja2VyKCdvcHRpb24nLCBrZXksIGNoYW5nZXNba2V5XS5jdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJFbGVtZW50LmRhdGVwaWNrZXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5jYWxlbmRhckVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIG9uQnV0dG9uQ2xpY2soZXZlbnQsaW5wdXQpIHtcbiAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICB9XG59XG5cbiJdfQ==
