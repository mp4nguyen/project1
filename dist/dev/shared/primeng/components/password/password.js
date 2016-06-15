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
var domhandler_1 = require('../dom/domhandler');
var Password = (function () {
    function Password(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.promptLabel = 'Please enter a password';
        this.weakLabel = 'Weak';
        this.mediumLabel = 'Medium';
        this.strongLabel = 'Strong';
    }
    Password.prototype.ngAfterViewInit = function () {
        this.panel = document.createElement('div');
        this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all ui-helper-hidden ui-password-panel-overlay';
        this.meter = document.createElement('div');
        this.meter.className = 'ui-password-meter';
        this.info = document.createElement('div');
        this.info.className = 'ui-password-info';
        this.info.textContent = this.promptLabel;
        this.panel.appendChild(this.meter);
        this.panel.appendChild(this.info);
        document.body.appendChild(this.panel);
    };
    Password.prototype.onMouseover = function (e) {
        this.hover = true;
    };
    Password.prototype.onMouseout = function (e) {
        this.hover = false;
    };
    Password.prototype.onFocus = function (e) {
        this.focus = true;
        this.domHandler.removeClass(this.panel, 'ui-helper-hidden');
        this.domHandler.absolutePosition(this.panel, this.el.nativeElement);
        this.domHandler.fadeIn(this.panel, 250);
    };
    Password.prototype.onBlur = function (e) {
        this.focus = false;
        this.domHandler.addClass(this.panel, 'ui-helper-hidden');
    };
    Password.prototype.onKeyup = function (e) {
        var value = e.target.value, label = null, meterPos = null;
        if (value.length === 0) {
            label = this.promptLabel;
            meterPos = '0px 0px';
        }
        else {
            var score = this.testStrength(value);
            if (score < 30) {
                label = this.weakLabel;
                meterPos = '0px -10px';
            }
            else if (score >= 30 && score < 80) {
                label = this.mediumLabel;
                meterPos = '0px -20px';
            }
            else if (score >= 80) {
                label = this.strongLabel;
                meterPos = '0px -30px';
            }
        }
        this.meter.style.backgroundPosition = meterPos;
        this.info.textContent = label;
    };
    Password.prototype.testStrength = function (str) {
        var grade = 0;
        var val;
        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
        grade *= str.length / 8;
        return grade > 100 ? 100 : grade;
    };
    Password.prototype.normalize = function (x, y) {
        var diff = x - y;
        if (diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y / 4));
    };
    Password.prototype.isDisabled = function () {
        return this.el.nativeElement.disabled;
    };
    Password.prototype.ngOnDestroy = function () {
        this.panel.removeChild(this.meter);
        this.panel.removeChild(this.info);
        document.body.removeChild(this.panel);
        this.panel = null;
        this.meter = null;
        this.info = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Password.prototype, "promptLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Password.prototype, "weakLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Password.prototype, "mediumLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Password.prototype, "strongLabel", void 0);
    __decorate([
        core_1.HostListener('mouseover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onMouseover", null);
    __decorate([
        core_1.HostListener('mouseout', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onMouseout", null);
    __decorate([
        core_1.HostListener('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onBlur", null);
    __decorate([
        core_1.HostListener('keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Password.prototype, "onKeyup", null);
    Password = __decorate([
        core_1.Directive({
            selector: '[pPassword]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-hover]': 'hover',
                '[class.ui-state-focus]': 'focus',
                '[class.ui-state-disabled]': 'isDisabled()'
            },
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Password);
    return Password;
}());
exports.Password = Password;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvcGFzc3dvcmQvcGFzc3dvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE4RSxlQUFlLENBQUMsQ0FBQTtBQUM5RiwyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQWU3QztJQW9CSSxrQkFBb0IsRUFBYyxFQUFVLFVBQXNCO1FBQTlDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBbEJ6RCxnQkFBVyxHQUFXLHlCQUF5QixDQUFDO1FBRWhELGNBQVMsR0FBVyxNQUFNLENBQUM7UUFFM0IsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFFL0IsZ0JBQVcsR0FBVyxRQUFRLENBQUM7SUFZNkIsQ0FBQztJQUV0RSxrQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHlHQUF5RyxDQUFDO1FBQ2pJLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUV6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLFFB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QU07Z0JBQzNCLHdCQUF3QixFQUFFLE9BQU87Z0JBQ2pDLHdCQUF3QixFQUFFLE9BQU87Z0JBQ2pDLDJCQUEyQixFQUFFLGNBQWM7YUFDOUM7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1NBQzFCLENBQUM7O2dCQUFBO0lBeUlGLGVBQUM7QUFBRCxDQXhJQSxBQXdJQyxJQUFBO0FBeElZLGdCQUFRLFdBd0lwQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvcGFzc3dvcmQvcGFzc3dvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSxFbGVtZW50UmVmLEhvc3RMaXN0ZW5lcixJbnB1dCxBZnRlclZpZXdJbml0LE9uRGVzdHJveX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJy4uL2RvbS9kb21oYW5kbGVyJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFBhc3N3b3JkXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnVpLWlucHV0dGV4dF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktY29ybmVyLWFsbF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZGVmYXVsdF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktd2lkZ2V0XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1ob3Zlcl0nOiAnaG92ZXInLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWZvY3VzXSc6ICdmb2N1cycsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZGlzYWJsZWRdJzogJ2lzRGlzYWJsZWQoKSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG59KVxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgcHJvbXB0TGFiZWw6IHN0cmluZyA9ICdQbGVhc2UgZW50ZXIgYSBwYXNzd29yZCc7XG5cbiAgICBASW5wdXQoKSB3ZWFrTGFiZWw6IHN0cmluZyA9ICdXZWFrJztcblxuICAgIEBJbnB1dCgpIG1lZGl1bUxhYmVsOiBzdHJpbmcgPSAnTWVkaXVtJztcblxuICAgIEBJbnB1dCgpIHN0cm9uZ0xhYmVsOiBzdHJpbmcgPSAnU3Ryb25nJztcblxuICAgIGhvdmVyOiBib29sZWFuO1xuICAgIFxuICAgIGZvY3VzOiBib29sZWFuO1xuICAgIFxuICAgIHBhbmVsOiBhbnk7XG4gICAgXG4gICAgbWV0ZXI6IGFueTtcbiAgICBcbiAgICBpbmZvOiBhbnk7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyKSB7fVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSA9ICd1aS1wYXNzd29yZC1wYW5lbCB1aS13aWRnZXQgdWktc3RhdGUtaGlnaGxpZ2h0IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWhpZGRlbiB1aS1wYXNzd29yZC1wYW5lbC1vdmVybGF5JztcbiAgICAgICAgdGhpcy5tZXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLm1ldGVyLmNsYXNzTmFtZSA9ICd1aS1wYXNzd29yZC1tZXRlcic7XG4gICAgICAgIHRoaXMuaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmluZm8uY2xhc3NOYW1lID0gJ3VpLXBhc3N3b3JkLWluZm8nO1xuICAgICAgICB0aGlzLmluZm8udGV4dENvbnRlbnQgPSB0aGlzLnByb21wdExhYmVsO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLm1ldGVyKTtcbiAgICAgICAgdGhpcy5wYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmluZm8pO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsKTtcbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VvdmVyJywgWyckZXZlbnQnXSkgXG4gICAgb25Nb3VzZW92ZXIoZSkge1xuICAgICAgICB0aGlzLmhvdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VvdXQnLCBbJyRldmVudCddKSBcbiAgICBvbk1vdXNlb3V0KGUpIHtcbiAgICAgICAgdGhpcy5ob3ZlciA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pIFxuICAgIG9uRm9jdXMoZSkge1xuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnBhbmVsLCAndWktaGVscGVyLWhpZGRlbicpO1xuICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbih0aGlzLnBhbmVsLCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmRvbUhhbmRsZXIuZmFkZUluKHRoaXMucGFuZWwsIDI1MCk7XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKSBcbiAgICBvbkJsdXIoZSkge1xuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5wYW5lbCwgJ3VpLWhlbHBlci1oaWRkZW4nKTtcbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxuICAgIG9uS2V5dXAoZSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgbGFiZWwgPSBudWxsLFxuICAgICAgICBtZXRlclBvcyA9IG51bGw7XG5cbiAgICAgICAgaWYodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsYWJlbCA9IHRoaXMucHJvbXB0TGFiZWw7XG4gICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggMHB4JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzY29yZSA9IHRoaXMudGVzdFN0cmVuZ3RoKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYoc2NvcmUgPCAzMCkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy53ZWFrTGFiZWw7XG4gICAgICAgICAgICAgICAgbWV0ZXJQb3MgPSAnMHB4IC0xMHB4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoc2NvcmUgPj0gMzAgJiYgc2NvcmUgPCA4MCkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5tZWRpdW1MYWJlbDtcbiAgICAgICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggLTIwcHgnO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2UgaWYoc2NvcmUgPj0gODApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMuc3Ryb25nTGFiZWw7XG4gICAgICAgICAgICAgICAgbWV0ZXJQb3MgPSAnMHB4IC0zMHB4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWV0ZXIuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gbWV0ZXJQb3M7XG4gICAgICAgIHRoaXMuaW5mby50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgIH1cbiAgICBcbiAgICB0ZXN0U3RyZW5ndGgoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGdyYWRlOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgdmFsO1xuXG4gICAgICAgIHZhbCA9IHN0ci5tYXRjaCgnWzAtOV0nKTtcbiAgICAgICAgZ3JhZGUgKz0gdGhpcy5ub3JtYWxpemUodmFsID8gdmFsLmxlbmd0aCA6IDEvNCwgMSkgKiAyNTtcblxuICAgICAgICB2YWwgPSBzdHIubWF0Y2goJ1thLXpBLVpdJyk7XG4gICAgICAgIGdyYWRlICs9IHRoaXMubm9ybWFsaXplKHZhbCA/IHZhbC5sZW5ndGggOiAxLzIsIDMpICogMTA7XG5cbiAgICAgICAgdmFsID0gc3RyLm1hdGNoKCdbIUAjJCVeJio/X34uLDs9XScpO1xuICAgICAgICBncmFkZSArPSB0aGlzLm5vcm1hbGl6ZSh2YWwgPyB2YWwubGVuZ3RoIDogMS82LCAxKSAqIDM1O1xuXG4gICAgICAgIHZhbCA9IHN0ci5tYXRjaCgnW0EtWl0nKTtcbiAgICAgICAgZ3JhZGUgKz0gdGhpcy5ub3JtYWxpemUodmFsID8gdmFsLmxlbmd0aCA6IDEvNiwgMSkgKiAzMDtcblxuICAgICAgICBncmFkZSAqPSBzdHIubGVuZ3RoIC8gODtcblxuICAgICAgICByZXR1cm4gZ3JhZGUgPiAxMDAgPyAxMDAgOiBncmFkZTtcbiAgICB9XG4gICAgXG4gICAgbm9ybWFsaXplKHgsIHkpIHtcbiAgICAgICAgbGV0IGRpZmYgPSB4IC0geTtcblxuICAgICAgICBpZihkaWZmIDw9IDApXG4gICAgICAgICAgICByZXR1cm4geCAvIHk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAxICsgMC41ICogKHggLyAoeCArIHkvNCkpO1xuICAgIH1cbiAgICBcbiAgICBpc0Rpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRpc2FibGVkO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5wYW5lbC5yZW1vdmVDaGlsZCh0aGlzLm1ldGVyKTtcbiAgICAgICAgdGhpcy5wYW5lbC5yZW1vdmVDaGlsZCh0aGlzLmluZm8pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucGFuZWwpO1xuICAgICAgICB0aGlzLnBhbmVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5tZXRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5mbyA9IG51bGw7XG4gICAgfVxufSJdfQ==
