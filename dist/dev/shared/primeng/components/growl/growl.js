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
var Growl = (function () {
    function Growl(el, domHandler, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.sticky = false;
        this.life = 3000;
        this.differ = differs.find([]).create(null);
        this.zIndex = domhandler_1.DomHandler.zindex;
    }
    Growl.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
    };
    Growl.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.stopDoCheckPropagation) {
                this.stopDoCheckPropagation = false;
            }
            else if (this.value && this.value.length) {
                this.zIndex = ++domhandler_1.DomHandler.zindex;
                this.domHandler.fadeIn(this.container, 250);
                if (!this.sticky) {
                    if (this.timeout) {
                        clearTimeout(this.timeout);
                    }
                    this.timeout = setTimeout(function () {
                        _this.removeAll();
                    }, this.life);
                }
            }
        }
    };
    Growl.prototype.remove = function (msg, msgel) {
        var _this = this;
        this.stopDoCheckPropagation = true;
        this.domHandler.fadeOut(msgel, 250);
        setTimeout(function () {
            _this.value.splice(_this.findMessageIndex(msg), 1);
        }, 250);
    };
    Growl.prototype.removeAll = function () {
        var _this = this;
        if (this.value && this.value.length) {
            this.stopDoCheckPropagation = true;
            this.domHandler.fadeOut(this.container, 250);
            setTimeout(function () {
                _this.value.splice(0, _this.value.length);
            }, 250);
        }
    };
    Growl.prototype.findMessageIndex = function (msg) {
        var index = -1;
        if (this.value && this.value.length) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == msg) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Growl.prototype.ngOnDestroy = function () {
        if (!this.sticky) {
            clearTimeout(this.timeout);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Growl.prototype, "sticky", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Growl.prototype, "life", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Growl.prototype, "value", void 0);
    Growl = __decorate([
        core_1.Component({
            selector: 'p-growl',
            template: "\n            <div class=\"ui-growl ui-widget\" [style.zIndex]=\"zIndex\">\n            <div #msgel *ngFor=\"#msg of value\" class=\"ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow\" aria-live=\"polite\"\n                [ngClass]=\"{'ui-growl-message-info ':msg.severity == 'info','ui-growl-message-warn':msg.severity == 'warn','ui-growl-message-error':msg.severity == 'error'}\">\n                <div class=\"ui-growl-item\">\n                     <div class=\"ui-growl-icon-close fa fa-close\" (click)=\"remove(msg,msgel)\"></div>\n                     <span class=\"ui-growl-image fa fa-2x ui-growl-image-info\"\n                        [ngClass]=\"{'fa-info-circle':msg.severity == 'info','fa-warning':msg.severity == 'warn','fa-close':msg.severity == 'error'}\"></span>\n                     <div class=\"ui-growl-message\">\n                        <span class=\"ui-growl-title\">{{msg.summary}}</span>\n                        <p>{{msg.detail}}</p>\n                     </div>\n                     <div style=\"clear: both;\"></div>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers])
    ], Growl);
    return Growl;
}());
exports.Growl = Growl;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZ3Jvd2wvZ3Jvd2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFnRyxlQUFlLENBQUMsQ0FBQTtBQUdoSCwyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQTBCN0M7SUFvQkksZUFBb0IsRUFBYyxFQUFVLFVBQXNCLEVBQUUsT0FBd0I7UUFBeEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFqQnpELFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsU0FBSSxHQUFXLElBQUksQ0FBQztRQWdCekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLHVCQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFRCwrQkFBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELHlCQUFTLEdBQVQ7UUFBQSxpQkFxQkM7UUFwQkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDVCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1lBQ3hDLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JB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MG1DQWdCVDtZQUNELFNBQVMsRUFBRSxDQUFDLHVCQUFVLENBQUM7U0FFMUIsQ0FBQzs7YUFBQTtJQWtHRixZQUFDO0FBQUQsQ0FoR0EsQUFnR0MsSUFBQTtBQWhHWSxhQUFLLFFBZ0dqQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZ3Jvd2wvZ3Jvd2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsRG9DaGVjayxPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEl0ZXJhYmxlRGlmZmVyc30gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4vL2ltcG9ydCB7bmdGb3J9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4uL2FwaS9tZXNzYWdlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAnLi4vZG9tL2RvbWhhbmRsZXInO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1ncm93bCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1ncm93bCB1aS13aWRnZXRcIiBbc3R5bGUuekluZGV4XT1cInpJbmRleFwiPlxuICAgICAgICAgICAgPGRpdiAjbXNnZWwgKm5nRm9yPVwiI21zZyBvZiB2YWx1ZVwiIGNsYXNzPVwidWktZ3Jvd2wtaXRlbS1jb250YWluZXIgdWktc3RhdGUtaGlnaGxpZ2h0IHVpLWNvcm5lci1hbGwgdWktc2hhZG93XCIgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWdyb3dsLW1lc3NhZ2UtaW5mbyAnOm1zZy5zZXZlcml0eSA9PSAnaW5mbycsJ3VpLWdyb3dsLW1lc3NhZ2Utd2Fybic6bXNnLnNldmVyaXR5ID09ICd3YXJuJywndWktZ3Jvd2wtbWVzc2FnZS1lcnJvcic6bXNnLnNldmVyaXR5ID09ICdlcnJvcid9XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWdyb3dsLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1ncm93bC1pY29uLWNsb3NlIGZhIGZhLWNsb3NlXCIgKGNsaWNrKT1cInJlbW92ZShtc2csbXNnZWwpXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWdyb3dsLWltYWdlIGZhIGZhLTJ4IHVpLWdyb3dsLWltYWdlLWluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydmYS1pbmZvLWNpcmNsZSc6bXNnLnNldmVyaXR5ID09ICdpbmZvJywnZmEtd2FybmluZyc6bXNnLnNldmVyaXR5ID09ICd3YXJuJywnZmEtY2xvc2UnOm1zZy5zZXZlcml0eSA9PSAnZXJyb3InfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1ncm93bC1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWdyb3dsLXRpdGxlXCI+e3ttc2cuc3VtbWFyeX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+e3ttc2cuZGV0YWlsfX08L3A+XG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJjbGVhcjogYm90aDtcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG4vLyAgICBkaXJlY3RpdmVzOiBbbmdGb3JdXG59KVxuXG5leHBvcnQgY2xhc3MgR3Jvd2wgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LERvQ2hlY2ssT25EZXN0cm95IHtcblxuXG4gICAgQElucHV0KCkgc3RpY2t5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBsaWZlOiBudW1iZXIgPSAzMDAwO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IE1lc3NhZ2VbXTtcblxuICAgICAgICBcbiAgICBkaWZmZXI6IGFueTtcbiAgICBcbiAgICB6SW5kZXg6IG51bWJlcjtcbiAgICBcbiAgICBjb250YWluZXI6IGFueTtcbiAgICBcbiAgICBzdG9wRG9DaGVja1Byb3BhZ2F0aW9uOiBib29sZWFuO1xuICAgIFxuICAgIHRpbWVvdXQ6IGFueTtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyLCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgICAgICAgdGhpcy5kaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy56SW5kZXggPSBEb21IYW5kbGVyLnppbmRleDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cbiAgICBcbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGxldCBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLnZhbHVlKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc3RvcERvQ2hlY2tQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcERvQ2hlY2tQcm9wYWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56SW5kZXggPSArK0RvbUhhbmRsZXIuemluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5mYWRlSW4odGhpcy5jb250YWluZXIsIDI1MCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuc3RpY2t5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLmxpZmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZW1vdmUobXNnOiBNZXNzYWdlLCBtc2dlbDogYW55KSB7XG4gICAgICAgIHRoaXMuc3RvcERvQ2hlY2tQcm9wYWdhdGlvbiA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRvbUhhbmRsZXIuZmFkZU91dChtc2dlbCwgMjUwKTtcbiAgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5zcGxpY2UodGhpcy5maW5kTWVzc2FnZUluZGV4KG1zZyksIDEpO1xuICAgICAgICB9LCAyNTApO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlQWxsKCkge1xuICAgICAgICBpZih0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BEb0NoZWNrUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuZmFkZU91dCh0aGlzLmNvbnRhaW5lciwgMjUwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5zcGxpY2UoMCwgdGhpcy52YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmaW5kTWVzc2FnZUluZGV4KG1zZzogTWVzc2FnZSkge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgICAgIGlmKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgIDwgdGhpcy52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudmFsdWVbaV0gPT0gbXNnKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmKCF0aGlzLnN0aWNreSkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=
