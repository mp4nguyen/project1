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
var InputText = (function () {
    function InputText(el) {
        this.el = el;
    }
    InputText.prototype.onMouseover = function (e) {
        this.hover = true;
    };
    InputText.prototype.onMouseout = function (e) {
        this.hover = false;
    };
    InputText.prototype.onFocus = function (e) {
        this.focus = true;
    };
    InputText.prototype.onBlur = function (e) {
        this.focus = false;
    };
    InputText.prototype.isDisabled = function () {
        return this.el.nativeElement.disabled;
    };
    __decorate([
        core_1.HostListener('mouseover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputText.prototype, "onMouseover", null);
    __decorate([
        core_1.HostListener('mouseout', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputText.prototype, "onMouseout", null);
    __decorate([
        core_1.HostListener('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputText.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputText.prototype, "onBlur", null);
    InputText = __decorate([
        core_1.Directive({
            selector: '[pInputText]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-hover]': 'hover',
                '[class.ui-state-focus]': 'focus',
                '[class.ui-state-disabled]': 'isDisabled()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], InputText);
    return InputText;
}());
exports.InputText = InputText;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvaW5wdXR0ZXh0L2lucHV0dGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXNELGVBQWUsQ0FBQyxDQUFBO0FBY3RFO0lBTUksbUJBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUd0QywrQkFBVyxHQUFYLFVBQVksQ0FBQztRQUNULElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFHRCw4QkFBVSxHQUFWLFVBQVcsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFHRCwyQkFBTyxHQUFQLFVBQVEsQ0FBQztRQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFHRCwwQkFBTSxHQUFOLFVBQU8sQ0FBQztRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw4QkFBVSxHQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUMxQyxDQUFDO0lBdEJEO1FBQUMsbUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztnREFBQTtJQUt0QztRQUFDLG1CQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7K0NBQUE7SUFLckM7UUFBQyxtQkFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzRDQUFBO0lBS2xDO1FBQUMsbUJBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OzsyQ0FBQTtJQW5DckM7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsSUFBSSxFQUFFO2dCQUNGLHNCQUFzQixFQUFFLE1BQU07Z0JBQzlCLHVCQUF1QixFQUFFLE1BQU07Z0JBQy9CLDBCQUEwQixFQUFFLE1BQU07Z0JBQ2xDLG1CQUFtQixFQUFFLE1BQU07Z0JBQzNCLHdCQUF3QixFQUFFLE9BQU87Z0JBQ2pDLHdCQUF3QixFQUFFLE9BQU87Z0JBQ2pDLDJCQUEyQixFQUFFLGNBQWM7YUFDOUM7U0FDSixDQUFDOztpQkFBQTtJQWdDRixnQkFBQztBQUFELENBL0JBLEFBK0JDLElBQUE7QUEvQlksaUJBQVMsWUErQnJCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9pbnB1dHRleHQvaW5wdXR0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsRWxlbWVudFJlZixIb3N0TGlzdGVuZXIsSW5wdXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twSW5wdXRUZXh0XScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnVpLWlucHV0dGV4dF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktY29ybmVyLWFsbF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZGVmYXVsdF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktd2lkZ2V0XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1ob3Zlcl0nOiAnaG92ZXInLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWZvY3VzXSc6ICdmb2N1cycsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZGlzYWJsZWRdJzogJ2lzRGlzYWJsZWQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIElucHV0VGV4dCB7XG5cbiAgICBob3ZlcjogYm9vbGVhbjtcbiAgICBcbiAgICBmb2N1czogYm9vbGVhbjtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicsIFsnJGV2ZW50J10pIFxuICAgIG9uTW91c2VvdmVyKGUpIHtcbiAgICAgICAgdGhpcy5ob3ZlciA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JywgWyckZXZlbnQnXSkgXG4gICAgb25Nb3VzZW91dChlKSB7XG4gICAgICAgIHRoaXMuaG92ZXIgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbJyRldmVudCddKSBcbiAgICBvbkZvY3VzKGUpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKSBcbiAgICBvbkJsdXIoZSkge1xuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGlzRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgfVxufSJdfQ==
