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
var domhandler_1 = require('../dom/domhandler');
var INPUTSWITCH_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return InputSwitch; }),
    multi: true
});
var InputSwitch = (function () {
    function InputSwitch(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onLabel = 'On';
        this.offLabel = 'Off';
        this.onChange = new core_1.EventEmitter();
        this.checked = false;
        this.focused = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.initialized = false;
    }
    InputSwitch.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        this.handle = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-inputswitch-handle');
        this.onContainer = this.domHandler.findSingle(this.container, 'div.ui-inputswitch-on');
        this.offContainer = this.domHandler.findSingle(this.container, 'div.ui-inputswitch-off');
        this.onLabelChild = this.domHandler.findSingle(this.onContainer, 'span.ui-inputswitch-onlabel');
        this.offLabelChild = this.domHandler.findSingle(this.offContainer, 'span.ui-inputswitch-offlabel');
        var onContainerWidth = this.domHandler.width(this.onContainer), offContainerWidth = this.domHandler.width(this.offContainer), spanPadding = this.domHandler.innerWidth(this.offLabelChild) - this.domHandler.width(this.offLabelChild), handleMargins = this.domHandler.getOuterWidth(this.handle) - this.domHandler.innerWidth(this.handle);
        var containerWidth = (onContainerWidth > offContainerWidth) ? onContainerWidth : offContainerWidth, handleWidth = containerWidth;
        this.handle.style.width = handleWidth + 'px';
        handleWidth = this.domHandler.width(this.handle);
        containerWidth = containerWidth + handleWidth + 6;
        var labelWidth = containerWidth - handleWidth - spanPadding - handleMargins;
        this.container.style.width = containerWidth + 'px';
        this.onLabelChild.style.width = labelWidth + 'px';
        this.offLabelChild.style.width = labelWidth + 'px';
        this.offContainer.style.width = (this.domHandler.width(this.container) - 5) + 'px';
        this.offset = this.domHandler.width(this.container) - this.domHandler.getOuterWidth(this.handle);
        if (this.checked) {
            this.handle.style.left = this.offset + 'px';
            this.onContainer.style.width = this.offset + 'px';
            this.offLabelChild.style.marginRight = -this.offset + 'px';
        }
        else {
            this.onContainer.style.width = 0 + 'px';
            this.onLabelChild.style.marginLeft = -this.offset + 'px';
        }
        this.initialized = true;
    };
    InputSwitch.prototype.toggle = function (event, checkbox) {
        if (!this.disabled) {
            if (this.checked) {
                this.checked = false;
                this.uncheckUI();
            }
            else {
                this.checked = true;
                this.checkUI();
            }
            this.onModelChange(this.checked);
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            checkbox.focus();
        }
    };
    InputSwitch.prototype.checkUI = function () {
        this.onContainer.style.width = this.offset + 'px';
        this.onLabelChild.style.marginLeft = 0 + 'px';
        this.offLabelChild.style.marginRight = -this.offset + 'px';
        this.handle.style.left = this.offset + 'px';
    };
    InputSwitch.prototype.uncheckUI = function () {
        this.onContainer.style.width = 0 + 'px';
        this.onLabelChild.style.marginLeft = -this.offset + 'px';
        this.offLabelChild.style.marginRight = 0 + 'px';
        this.handle.style.left = 0 + 'px';
    };
    InputSwitch.prototype.onFocus = function (event) {
        this.focused = true;
    };
    InputSwitch.prototype.onBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
    };
    InputSwitch.prototype.writeValue = function (checked) {
        this.checked = checked;
        if (this.initialized) {
            if (this.checked === true)
                this.checkUI();
            else
                this.uncheckUI();
        }
    };
    InputSwitch.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    InputSwitch.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputSwitch.prototype, "onLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputSwitch.prototype, "offLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InputSwitch.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputSwitch.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputSwitch.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InputSwitch.prototype, "onChange", void 0);
    InputSwitch = __decorate([
        core_1.Component({
            selector: 'p-inputSwitch',
            template: "\n        <div [ngClass]=\"{'ui-inputswitch ui-widget ui-widget-content ui-corner-all': true,\n            'ui-state-disabled': disabled}\" (click)=\"toggle($event, in)\"\n            [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inputswitch-off\">\n                <span class=\"ui-inputswitch-offlabel\">{{offLabel}}</span>\n            </div>\n            <div class=\"ui-inputswitch-on\">\n                <span class=\"ui-inputswitch-onlabel\">{{onLabel}}</span>\n            </div>\n            <div [ngClass]=\"{'ui-inputswitch-handle ui-state-default':true, 'ui-state-focus':focused}\"></div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"checkbox\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" readonly=\"readonly\"/>\n            </div>\n        </div>\n    ",
            providers: [INPUTSWITCH_VALUE_ACCESSOR, domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], InputSwitch);
    return InputSwitch;
}());
exports.InputSwitch = InputSwitch;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvaW5wdXRzd2l0Y2gvaW5wdXRzd2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5RyxlQUFlLENBQUMsQ0FBQTtBQUN6SCx1QkFBcUQsaUJBQWlCLENBQUMsQ0FBQTtBQUN2RSwyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQUU3QyxJQUFNLDBCQUEwQixHQUFhLElBQUksZUFBUSxDQUFDLDBCQUFpQixFQUFFO0lBQ3pFLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxXQUFXLEVBQVgsQ0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBc0JIO0lBc0NJLHFCQUFvQixFQUFjLEVBQVUsVUFBc0I7UUFBOUMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFwQ3pELFlBQU8sR0FBVyxJQUFJLENBQUM7UUFFdkIsYUFBUSxHQUFXLEtBQUssQ0FBQztRQVF4QixhQUFRLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRTNELFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixrQkFBYSxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFnQnBDLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBRXdDLENBQUM7SUFFdEUscUNBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsV0FBVyxHQUFH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Z0JBQ0EsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQWdCLEdBQWhCLFVBQWlCLEVBQVk7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELHVDQUFpQixHQUFqQixVQUFrQixFQUFZO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUE5SUQ7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O2lEQUFBO0lBaENiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxvMUJBZVQ7WUFDRCxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsRUFBQyx1QkFBVSxDQUFDO1NBQ3JELENBQUM7O21CQUFBO0lBa0pGLGtCQUFDO0FBQUQsQ0FqSkEsQUFpSkMsSUFBQTtBQWpKWSxtQkFBVyxjQWlKdkIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2lucHV0c3dpdGNoL2lucHV0c3dpdGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uQ2hhbmdlcyxJbnB1dCxmb3J3YXJkUmVmLFByb3ZpZGVyLEV2ZW50RW1pdHRlcixPdXRwdXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUixDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAnLi4vZG9tL2RvbWhhbmRsZXInO1xuXG5jb25zdCBJTlBVVFNXSVRDSF9WQUxVRV9BQ0NFU1NPUjogUHJvdmlkZXIgPSBuZXcgUHJvdmlkZXIoTkdfVkFMVUVfQUNDRVNTT1IsIHtcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dFN3aXRjaCksXG4gICAgbXVsdGk6IHRydWVcbn0pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtaW5wdXRTd2l0Y2gnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1pbnB1dHN3aXRjaCB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc6IHRydWUsXG4gICAgICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiAoY2xpY2spPVwidG9nZ2xlKCRldmVudCwgaW4pXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1pbnB1dHN3aXRjaC1vZmZcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWlucHV0c3dpdGNoLW9mZmxhYmVsXCI+e3tvZmZMYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaW5wdXRzd2l0Y2gtb25cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWlucHV0c3dpdGNoLW9ubGFiZWxcIj57e29uTGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLWlucHV0c3dpdGNoLWhhbmRsZSB1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlLCAndWktc3RhdGUtZm9jdXMnOmZvY3VzZWR9XCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbiB0eXBlPVwiY2hlY2tib3hcIiAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyKCRldmVudClcIiByZWFkb25seT1cInJlYWRvbmx5XCIvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbSU5QVVRTV0lUQ0hfVkFMVUVfQUNDRVNTT1IsRG9tSGFuZGxlcl1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRTd2l0Y2ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBvbkxhYmVsOiBzdHJpbmcgPSAnT24nO1xuXG4gICAgQElucHV0KCkgb2ZmTGFiZWw6IHN0cmluZyA9ICdPZmYnO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHByaXZhdGUgY29udGFpbmVyOiBhbnk7XG5cbiAgICBwcml2YXRlIGhhbmRsZTogYW55O1xuXG4gICAgcHJpdmF0ZSBvbkNvbnRhaW5lcjogYW55O1xuXG4gICAgcHJpdmF0ZSBvZmZDb250YWluZXI6IGFueTtcblxuICAgIHByaXZhdGUgb25MYWJlbENoaWxkOiBhbnk7XG5cbiAgICBwcml2YXRlIG9mZkxhYmVsQ2hpbGQ6IGFueTtcblxuICAgIHByaXZhdGUgb2Zmc2V0OiBhbnk7XG4gICAgXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgZG9tSGFuZGxlcjogRG9tSGFuZGxlcikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICAgIHRoaXMuaGFuZGxlID0gdGhpcy5kb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGl2LnVpLWlucHV0c3dpdGNoLWhhbmRsZScpO1xuICAgICAgICB0aGlzLm9uQ29udGFpbmVyID0gdGhpcy5kb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsJ2Rpdi51aS1pbnB1dHN3aXRjaC1vbicpO1xuICAgICAgICB0aGlzLm9mZkNvbnRhaW5lciA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCdkaXYudWktaW5wdXRzd2l0Y2gtb2ZmJyk7XG4gICAgICAgIHRoaXMub25MYWJlbENoaWxkID0gdGhpcy5kb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5vbkNvbnRhaW5lciwnc3Bhbi51aS1pbnB1dHN3aXRjaC1vbmxhYmVsJyk7XG4gICAgICAgIHRoaXMub2ZmTGFiZWxDaGlsZCA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMub2ZmQ29udGFpbmVyLCdzcGFuLnVpLWlucHV0c3dpdGNoLW9mZmxhYmVsJyk7XG5cbiAgICAgICAgbGV0XHRvbkNvbnRhaW5lcldpZHRoID0gIHRoaXMuZG9tSGFuZGxlci53aWR0aCh0aGlzLm9uQ29udGFpbmVyKSxcbiAgICAgICAgICAgIG9mZkNvbnRhaW5lcldpZHRoID0gdGhpcy5kb21IYW5kbGVyLndpZHRoKHRoaXMub2ZmQ29udGFpbmVyKSxcbiAgICAgICAgICAgIHNwYW5QYWRkaW5nXHQ9IHRoaXMuZG9tSGFuZGxlci5pbm5lcldpZHRoKHRoaXMub2ZmTGFiZWxDaGlsZCkgLSB0aGlzLmRvbUhhbmRsZXIud2lkdGgodGhpcy5vZmZMYWJlbENoaWxkKSxcbiAgICAgICAgICAgIGhhbmRsZU1hcmdpbnMgPSB0aGlzLmRvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmhhbmRsZSkgLSB0aGlzLmRvbUhhbmRsZXIuaW5uZXJXaWR0aCh0aGlzLmhhbmRsZSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgY29udGFpbmVyV2lkdGggPSAob25Db250YWluZXJXaWR0aCA+IG9mZkNvbnRhaW5lcldpZHRoKSA/IG9uQ29udGFpbmVyV2lkdGggOiBvZmZDb250YWluZXJXaWR0aCxcbiAgICAgICAgICAgIGhhbmRsZVdpZHRoID0gY29udGFpbmVyV2lkdGg7XG5cbiAgICAgICAgdGhpcy5oYW5kbGUuc3R5bGUud2lkdGggPSBoYW5kbGVXaWR0aCArICdweCc7XG4gICAgICAgIGhhbmRsZVdpZHRoID0gdGhpcy5kb21IYW5kbGVyLndpZHRoKHRoaXMuaGFuZGxlKTtcbiAgICAgICAgY29udGFpbmVyV2lkdGggPSBjb250YWluZXJXaWR0aCArIGhhbmRsZVdpZHRoICsgNjtcblxuICAgICAgICB2YXIgbGFiZWxXaWR0aCA9IGNvbnRhaW5lcldpZHRoIC0gaGFuZGxlV2lkdGggLSBzcGFuUGFkZGluZyAtIGhhbmRsZU1hcmdpbnM7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSBjb250YWluZXJXaWR0aCArICdweCc7XG4gICAgICAgIHRoaXMub25MYWJlbENoaWxkLnN0eWxlLndpZHRoID0gbGFiZWxXaWR0aCArICdweCc7XG4gICAgICAgIHRoaXMub2ZmTGFiZWxDaGlsZC5zdHlsZS53aWR0aCA9IGxhYmVsV2lkdGggKyAncHgnO1xuICAgICAgICBcbiAgICAgICAgLy9wb3NpdGlvblxuICAgICAgICB0aGlzLm9mZkNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICh0aGlzLmRvbUhhbmRsZXIud2lkdGgodGhpcy5jb250YWluZXIpIC0gNSkgKyAncHgnO1xuICAgICAgICB0aGlzLm9mZnNldCA9IHRoaXMuZG9tSGFuZGxlci53aWR0aCh0aGlzLmNvbnRhaW5lcikgLSB0aGlzLmRvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmhhbmRsZSk7XG5cbiAgICAgICAgLy9kZWZhdWx0IHZhbHVlXG4gICAgICAgIGlmKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGUuc3R5bGUubGVmdCA9IHRoaXMub2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMub25Db250YWluZXIuc3R5bGUud2lkdGggPSB0aGlzLm9mZnNldCArICdweCc7XG4gICAgICAgICAgICB0aGlzLm9mZkxhYmVsQ2hpbGQuc3R5bGUubWFyZ2luUmlnaHQgPSAtdGhpcy5vZmZzZXQgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lci5zdHlsZS53aWR0aCA9IDAgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5vbkxhYmVsQ2hpbGQuc3R5bGUubWFyZ2luTGVmdCA9IC10aGlzLm9mZnNldCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRvZ2dsZShldmVudCxjaGVja2JveCkge1xuICAgICAgICBpZighdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy51bmNoZWNrVUkoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVUkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRoaXMuY2hlY2tlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjaGVja2JveC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tVSSgpIHtcbiAgICAgICAgdGhpcy5vbkNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHRoaXMub2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgdGhpcy5vbkxhYmVsQ2hpbGQuc3R5bGUubWFyZ2luTGVmdCA9IDAgKyAncHgnO1xuICAgICAgICB0aGlzLm9mZkxhYmVsQ2hpbGQuc3R5bGUubWFyZ2luUmlnaHQgPSAtdGhpcy5vZmZzZXQgKyAncHgnO1xuICAgICAgICB0aGlzLmhhbmRsZS5zdHlsZS5sZWZ0ID0gdGhpcy5vZmZzZXQgKyAncHgnO1xuICAgIH1cblxuICAgIHVuY2hlY2tVSSgpIHtcbiAgICAgICAgdGhpcy5vbkNvbnRhaW5lci5zdHlsZS53aWR0aCA9IDAgKyAncHgnO1xuICAgICAgICB0aGlzLm9uTGFiZWxDaGlsZC5zdHlsZS5tYXJnaW5MZWZ0ID0gLXRoaXMub2Zmc2V0ICsgJ3B4JztcbiAgICAgICAgdGhpcy5vZmZMYWJlbENoaWxkLnN0eWxlLm1hcmdpblJpZ2h0ID0gMCArICdweCc7XG4gICAgICAgIHRoaXMuaGFuZGxlLnN0eWxlLmxlZnQgPSAwICsgJ3B4JztcbiAgICB9XG5cbiAgICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZShjaGVja2VkOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBpZih0aGlzLmNoZWNrZWQgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1VJKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy51bmNoZWNrVUkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxufVxuIl19
