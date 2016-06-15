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
var InputTextarea = (function () {
    function InputTextarea(el) {
        this.el = el;
    }
    InputTextarea.prototype.ngOnInit = function () {
        this.rowsDefault = this.rows;
        this.colsDefault = this.cols;
    };
    InputTextarea.prototype.onMouseover = function (e) {
        this.hover = true;
    };
    InputTextarea.prototype.onMouseout = function (e) {
        this.hover = false;
    };
    InputTextarea.prototype.onFocus = function (e) {
        this.focus = true;
        if (this.autoResize) {
            this.resize();
        }
    };
    InputTextarea.prototype.onBlur = function (e) {
        this.focus = false;
        if (this.autoResize) {
            this.resize();
        }
    };
    InputTextarea.prototype.isDisabled = function () {
        return this.el.nativeElement.disabled;
    };
    InputTextarea.prototype.onKeyup = function (e) {
        if (this.autoResize) {
            this.resize();
        }
    };
    InputTextarea.prototype.resize = function () {
        var linesCount = 0, lines = this.el.nativeElement.value.split('\n');
        for (var i = lines.length - 1; i >= 0; --i) {
            linesCount += Math.floor((lines[i].length / this.colsDefault) + 1);
        }
        this.rows = (linesCount >= this.rowsDefault) ? (linesCount + 1) : this.rowsDefault;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InputTextarea.prototype, "autoResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InputTextarea.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InputTextarea.prototype, "cols", void 0);
    __decorate([
        core_1.HostListener('mouseover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputTextarea.prototype, "onMouseover", null);
    __decorate([
        core_1.HostListener('mouseout', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputTextarea.prototype, "onMouseout", null);
    __decorate([
        core_1.HostListener('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputTextarea.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputTextarea.prototype, "onBlur", null);
    __decorate([
        core_1.HostListener('keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], InputTextarea.prototype, "onKeyup", null);
    InputTextarea = __decorate([
        core_1.Directive({
            selector: '[pInputTextarea]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-hover]': 'hover',
                '[class.ui-state-focus]': 'focus',
                '[class.ui-state-disabled]': 'isDisabled()',
                '[attr.rows]': 'rows',
                '[attr.cols]': 'cols'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], InputTextarea);
    return InputTextarea;
}());
exports.InputTextarea = InputTextarea;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvaW5wdXR0ZXh0YXJlYS9pbnB1dHRleHRhcmVhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkQsZUFBZSxDQUFDLENBQUE7QUFnQjdFO0lBZ0JJLHVCQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUFHLENBQUM7SUFFdEMsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDakMsQ0FBQztJQUdELG1DQUFXLEdBQVgsVUFBWSxDQUFDO1FBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUdELGtDQUFVLEdBQVYsVUFBVyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUdELCtCQUFPLEdBQVAsVUFBUSxDQUFDO1FBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0lBR0QsOEJBQU0sR0FBTixVQUFPLENBQUM7UUFDSixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztJQUNMLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUMxQyxDQUFDO0lBR0QsK0JBQU8sR0FBUCxVQUFRLENBQUM7UUFDTCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztJQUNMLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUNsQixLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdkMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN2RixDQUFDO0lBckVEO1FBQUMsWUFBSyxFQUFFOztxREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQWlCUjtRQUFDLG1CQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7b0RBQUE7SUFLdEM7UUFBQyxtQkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O21EQUFBO0lBS3JDO1FBQUMsbUJBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztnREFBQTtJQVNsQztRQUFDLG1CQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7K0NBQUE7SUFhakM7UUFBQyxtQkFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O2dEQUFBO0lBckV0QztRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLElBQUksRUFBRTtnQkFDRixzQkFBc0IsRUFBRSxNQUFNO2dCQUM5Qix1QkFBdUIsRUFBRSxNQUFNO2dCQUMvQiwwQkFBMEIsRUFBRSxNQUFNO2dCQUNsQyxtQkFBbUIsRUFBRSxNQUFNO2dCQUMzQix3QkFBd0IsRUFBRSxPQUFPO2dCQUNqQyx3QkFBd0IsRUFBRSxPQUFPO2dCQUNqQywyQkFBMkIsRUFBRSxjQUFjO2dCQUMzQyxhQUFhLEVBQUUsTUFBTTtnQkFDckIsYUFBYSxFQUFFLE1BQU07YUFDeEI7U0FDSixDQUFDOztxQkFBQTtJQXlFRixvQkFBQztBQUFELENBeEVBLEFBd0VDLElBQUE7QUF4RVkscUJBQWEsZ0JBd0V6QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvaW5wdXR0ZXh0YXJlYS9pbnB1dHRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsRWxlbWVudFJlZixIb3N0TGlzdGVuZXIsSW5wdXQsT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcElucHV0VGV4dGFyZWFdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MudWktaW5wdXR0ZXh0XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS1jb3JuZXItYWxsXSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1kZWZhdWx0XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS13aWRnZXRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWhvdmVyXSc6ICdob3ZlcicsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZm9jdXNdJzogJ2ZvY3VzJyxcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1kaXNhYmxlZF0nOiAnaXNEaXNhYmxlZCgpJyxcbiAgICAgICAgJ1thdHRyLnJvd3NdJzogJ3Jvd3MnLFxuICAgICAgICAnW2F0dHIuY29sc10nOiAnY29scydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIElucHV0VGV4dGFyZWEgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIFxuICAgIEBJbnB1dCgpIGF1dG9SZXNpemU6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgcm93czogbnVtYmVyO1xuICAgIFxuICAgIEBJbnB1dCgpIGNvbHM6IG51bWJlcjtcblxuICAgIGhvdmVyOiBib29sZWFuO1xuICAgIFxuICAgIGZvY3VzOiBib29sZWFuO1xuICAgIFxuICAgIHJvd3NEZWZhdWx0OiBudW1iZXI7XG4gICAgXG4gICAgY29sc0RlZmF1bHQ6IG51bWJlcjtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yb3dzRGVmYXVsdCA9IHRoaXMucm93cztcbiAgICAgICAgdGhpcy5jb2xzRGVmYXVsdCA9IHRoaXMuY29scztcbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSkgXG4gICAgb25Nb3VzZW92ZXIoZSkge1xuICAgICAgICB0aGlzLmhvdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VvdXQnLCBbJyRldmVudCddKSBcbiAgICBvbk1vdXNlb3V0KGUpIHtcbiAgICAgICAgdGhpcy5ob3ZlciA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pIFxuICAgIG9uRm9jdXMoZSkge1xuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuYXV0b1Jlc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSkgXG4gICAgb25CbHVyKGUpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5hdXRvUmVzaXplKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlzRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSkgXG4gICAgb25LZXl1cChlKSB7XG4gICAgICAgIGlmKHRoaXMuYXV0b1Jlc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXNpemUgKCkge1xuICAgICAgICBsZXQgbGluZXNDb3VudCA9IDAsXG4gICAgICAgIGxpbmVzID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLnNwbGl0KCdcXG4nKTtcblxuICAgICAgICBmb3IobGV0IGkgPSBsaW5lcy5sZW5ndGgtMTsgaSA+PSAwIDsgLS1pKSB7XG4gICAgICAgICAgICBsaW5lc0NvdW50ICs9IE1hdGguZmxvb3IoKGxpbmVzW2ldLmxlbmd0aCAvIHRoaXMuY29sc0RlZmF1bHQpICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvd3MgPSAobGluZXNDb3VudCA+PSB0aGlzLnJvd3NEZWZhdWx0KSA/IChsaW5lc0NvdW50ICsgMSkgOiB0aGlzLnJvd3NEZWZhdWx0O1xuICAgIH1cbn0iXX0=
