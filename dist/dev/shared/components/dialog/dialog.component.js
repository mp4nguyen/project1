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
var core_1 = require("angular2/core");
var Observable_1 = require('rxjs/Observable');
var KEY_ESC = 27;
var DialogComponent = (function () {
    function DialogComponent(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._isBackgroundClicked = false;
        this._isMainModalClicked = false;
    }
    DialogComponent.prototype.activate = function () {
        var _this = this;
        console.log('dialog -> activate !');
        var obs = new Observable_1.Observable(function (o) { return _this.observer = o; });
        this._show();
        return obs;
    };
    DialogComponent.prototype.close = function (func) {
        if (typeof func === "function") {
            func();
        }
        this.observer.next('CLOSE');
        this._hideDialog();
    };
    DialogComponent.prototype.cancel = function (func) {
        if (typeof func === "function") {
            func();
        }
        this.observer.next('CANCEL');
        this._hideDialog();
    };
    DialogComponent.prototype.ok = function (func) {
        if (typeof func === "function") {
            func();
        }
        this.observer.next('OK');
        this._hideDialog();
    };
    DialogComponent.prototype._show = function () {
        var _this = this;
        document.onkeyup = null;
        this._renderer.setElementStyle(this.myDialog.nativeElement, 'opacity', '1');
        this._renderer.setElementStyle(this.myDialog.nativeElement, 'zIndex', '9999');
        document.onkeyup = function (e) {
            if (e.which == KEY_ESC) {
                _this.close(null);
            }
        };
    };
    DialogComponent.prototype._hideDialog = function () {
        var _this = this;
        document.onkeyup = null;
        this._renderer.setElementStyle(this.myDialog.nativeElement, 'opacity', '0');
        window.setTimeout(function () { return _this._renderer.setElementStyle(_this.myDialog.nativeElement, 'zIndex', '-1'); }, 400);
    };
    DialogComponent.prototype.backgroundClicked = function (event) {
        if (!this._isMainModalClicked) {
            this.close(null);
        }
        this._isMainModalClicked = false;
    };
    DialogComponent.prototype.mainClicked = function (event) {
        this._isMainModalClicked = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DialogComponent.prototype, "disableClose", void 0);
    __decorate([
        core_1.ViewChild('myDialog'), 
        __metadata('design:type', core_1.ElementRef)
    ], DialogComponent.prototype, "myDialog", void 0);
    DialogComponent = __decorate([
        core_1.Component({
            selector: 'my-dialog',
            template: "\n    <div #myDialog id=\"backGroundModal\" class=\"dialog-container\" (click)=\"backgroundClicked($event)\">\n       <div id=\"mainModal\" class=\"mdl-card mdl-shadow--16dp\" (click)=\"mainClicked($event)\">\n           <ng-content></ng-content>\n       </div>\n    </div>\n    \n    ",
            styleUrls: ['./shared/components/dialog/dialog.component.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DialogComponent);
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNEQsZUFBZSxDQUFDLENBQUE7QUFDNUUsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFHM0MsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBZ0JuQjtJQVlJLHlCQUFvQixHQUFlLEVBQVUsU0FBbUI7UUFBNUMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFIeEQseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLHdCQUFtQixHQUFZLEtBQUssQ0FBQztJQUk3QyxDQUFDO0lBR0Qsa0NBQVEsR0FBUjtRQUFBLGlCQUtDO1FBSkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BDLElBQUksR0FBRyxHQUFHLElBQUksdUJBQVUsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCwrQkFBSyxHQUFMLFVBQU0sSUFBUTtRQUNWLEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFDM0IsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxnQ0FBTSxHQUFOLFVBQU8sSUFBUTtRQUNYLEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFDM0IsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw0QkFBRSxHQUFGLFVBQUcsSUFBUTtRQUNQLEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFDM0IsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTywrQkFBSyxHQUFiO1FBQUEsaUJBYUM7UUFYRyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTlFLFFBQVEsQ0FBQyxPQUFPLEdBQUcsVUFBQyxDQUFLO1lBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQyxDQUFDO0lBRU4sQ0FBQztJQUVPLHFDQUFXLEdBQW5CO1FBQUEsaUJBSUM7UUFIRyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDNUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUEzRSxDQUEyRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFHRCwyQ0FBaUIsR0FBakIsVUFBa0IsS0FBSztRQUVuQixFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFZLEtBQUs7UUFFYixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUEvRUQ7UUFBQyxZQUFLLEVBQUU7O3lEQUFBO0lBQ1I7UUFBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQzs7cURBQUE7SUFqQjFCO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFDUiwrUkFPQztZQUNELFNBQVMsRUFBRSxDQUFDLGlEQUFpRCxDQUFDO1NBQ2pFLENBQUM7O3VCQUFBO0lBb0ZGLHNCQUFDO0FBQUQsQ0FsRkEsQUFrRkMsSUFBQTtBQWxGWSx1QkFBZSxrQkFrRjNCLENBQUEiLCJmaWxlIjoic2hhcmVkL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxJbnB1dCxWaWV3Q2hpbGQsRWxlbWVudFJlZixSZW5kZXJlcn0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbi8vaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzLyc7XG5cbmNvbnN0IEtFWV9FU0MgPSAyNztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1kaWFsb2cnLFxuICAgIHRlbXBsYXRlOiBcbiAgICBgXG4gICAgPGRpdiAjbXlEaWFsb2cgaWQ9XCJiYWNrR3JvdW5kTW9kYWxcIiBjbGFzcz1cImRpYWxvZy1jb250YWluZXJcIiAoY2xpY2spPVwiYmFja2dyb3VuZENsaWNrZWQoJGV2ZW50KVwiPlxuICAgICAgIDxkaXYgaWQ9XCJtYWluTW9kYWxcIiBjbGFzcz1cIm1kbC1jYXJkIG1kbC1zaGFkb3ctLTE2ZHBcIiAoY2xpY2spPVwibWFpbkNsaWNrZWQoJGV2ZW50KVwiPlxuICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgYFxuICAgIHN0eWxlVXJsczogWycuL3NoYXJlZC9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29tcG9uZW50e1xuXG4gICAgQElucHV0KCkgZGlzYWJsZUNsb3NlOiBib29sZWFuO1xuICAgIEBWaWV3Q2hpbGQoJ215RGlhbG9nJykgbXlEaWFsb2c6RWxlbWVudFJlZjtcbiAgICBwcml2YXRlIG9ic2VydmVyOmFueTtcbiAgICBwcml2YXRlIF9iYWNrZ3JvdW5kRWxlbWVudDphbnk7XG4gICAgcHJpdmF0ZSBfbWFpbkVsZW1lbnQ6YW55O1xuICAgIHByaXZhdGUgX2NhbmNlbEJ1dHRvbjphbnk7XG4gICAgcHJpdmF0ZSBfb2tCdXR0b246YW55O1xuICAgIHByaXZhdGUgX2lzQmFja2dyb3VuZENsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pc01haW5Nb2RhbENsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIpIHtcblxuICAgIH1cbiAgICBcblxuICAgIGFjdGl2YXRlKCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RpYWxvZyAtPiBhY3RpdmF0ZSAhJyk7XG4gICAgICAgIGxldCBvYnMgPSBuZXcgT2JzZXJ2YWJsZShvID0+IHRoaXMub2JzZXJ2ZXIgPSBvKTtcbiAgICAgICAgdGhpcy5fc2hvdygpO1xuICAgICAgICByZXR1cm4gb2JzOyAgICAgICAgXG4gICAgfVxuXG4gICAgY2xvc2UoZnVuYzphbnkpe1xuICAgICAgICBpZih0eXBlb2YgZnVuYyA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICAgICAgICAgIGZ1bmMoKTsgICAgXG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICB0aGlzLm9ic2VydmVyLm5leHQoJ0NMT1NFJyk7XG4gICAgICAgIHRoaXMuX2hpZGVEaWFsb2coKTsgICAgICAgIFxuICAgIH1cblxuICAgIGNhbmNlbChmdW5jOmFueSl7XG4gICAgICAgIGlmKHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCIpe1xuICAgICAgICAgICAgZnVuYygpOyAgICBcbiAgICAgICAgfSAgICAgICAgXG4gICAgICAgIHRoaXMub2JzZXJ2ZXIubmV4dCgnQ0FOQ0VMJyk7XG4gICAgICAgIHRoaXMuX2hpZGVEaWFsb2coKTsgICAgICAgIFxuICAgIH1cblxuICAgIG9rKGZ1bmM6YW55KXtcbiAgICAgICAgaWYodHlwZW9mIGZ1bmMgPT09IFwiZnVuY3Rpb25cIil7XG4gICAgICAgICAgICBmdW5jKCk7ICAgIFxuICAgICAgICB9ICAgICAgICBcbiAgICAgICAgdGhpcy5vYnNlcnZlci5uZXh0KCdPSycpO1xuICAgICAgICB0aGlzLl9oaWRlRGlhbG9nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvdygpIHtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5dXAgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLm15RGlhbG9nLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzEnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMubXlEaWFsb2cubmF0aXZlRWxlbWVudCwgJ3pJbmRleCcsICc5OTk5Jyk7XG5cbiAgICAgICAgZG9jdW1lbnQub25rZXl1cCA9IChlOmFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUud2hpY2ggPT0gS0VZX0VTQykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgIH1cblxuICAgIHByaXZhdGUgX2hpZGVEaWFsb2coKSB7XG4gICAgICAgIGRvY3VtZW50Lm9ua2V5dXAgPSBudWxsO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUodGhpcy5teURpYWxvZy5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcwJyk7ICAgICAgICAgICAgICAgXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuX3JlbmRlcmVyLnNldEVsZW1lbnRTdHlsZSh0aGlzLm15RGlhbG9nLm5hdGl2ZUVsZW1lbnQsICd6SW5kZXgnLCAnLTEnKSwgNDAwKTtcbiAgICB9XG5cblxuICAgIGJhY2tncm91bmRDbGlja2VkKGV2ZW50KXtcbiAgICAgICAgXG4gICAgICAgIGlmKCF0aGlzLl9pc01haW5Nb2RhbENsaWNrZWQpe1xuICAgICAgICAgICAgdGhpcy5jbG9zZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc01haW5Nb2RhbENsaWNrZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBtYWluQ2xpY2tlZChldmVudCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9pc01haW5Nb2RhbENsaWNrZWQgPSB0cnVlO1xuICAgIH1cbn0iXX0=
