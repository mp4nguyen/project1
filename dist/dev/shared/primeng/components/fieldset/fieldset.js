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
var Fieldset = (function () {
    function Fieldset() {
        this.collapsed = false;
        this.onBeforeToggle = new core_1.EventEmitter();
        this.onAfterToggle = new core_1.EventEmitter();
    }
    Fieldset.prototype.onLegendMouseenter = function (event) {
        if (this.toggleable) {
            this.hover = true;
        }
    };
    Fieldset.prototype.onLegendMouseleave = function (event) {
        if (this.toggleable) {
            this.hover = false;
        }
    };
    Fieldset.prototype.toggle = function (event) {
        if (this.toggleable) {
            this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
            this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        }
    };
    Fieldset.prototype.expand = function (event) {
        this.collapsed = false;
    };
    Fieldset.prototype.collapse = function (event) {
        this.collapsed = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Fieldset.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Fieldset.prototype, "toggleable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Fieldset.prototype, "collapsed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Fieldset.prototype, "onBeforeToggle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Fieldset.prototype, "onAfterToggle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Fieldset.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Fieldset.prototype, "styleClass", void 0);
    Fieldset = __decorate([
        core_1.Component({
            selector: 'p-fieldset',
            template: "\n        <fieldset [ngClass]=\"{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text\" \n                (mouseenter)=\"onLegendMouseenter($event)\" (mouseleave)=\"onLegendMouseleave($event)\" (click)=\"toggle($event)\" [ngClass]=\"{'ui-state-hover':hover}\">\n                <span *ngIf=\"toggleable\" class=\"ui-fieldset-toggler fa fa-w\" [ngClass]=\"{'fa-minus': !collapsed,'fa-plus':collapsed}\"></span>\n                {{legend}}\n            </legend>\n            <div class=\"ui-fieldset-content\" [style.display]=\"collapsed ? 'none' : 'block'\">\n                <ng-content></ng-content>\n            </div>\n        </fieldset>\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], Fieldset);
    return Fieldset;
}());
exports.Fieldset = Fieldset;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZmllbGRzZXQvZmllbGRzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFrRCxlQUFlLENBQUMsQ0FBQTtBQWlCbEU7SUFBQTtRQU1hLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFMUIsbUJBQWMsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFdkQsa0JBQWEsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUF5Q3BFLENBQUM7SUFqQ0cscUNBQWtCLEdBQWxCLFVBQW1CLEtBQUs7UUFDcEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFFRCxxQ0FBa0IsR0FBbEIsVUFBbUIsS0FBSztRQUNwQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUVELHlCQUFNLEdBQU4sVUFBTyxLQUFLO1FBQ1IsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztZQUU1RSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsSUFBSTtnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXpCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFDL0UsQ0FBQztJQUNMLENBQUM7SUFFRCx5QkFBTSxHQUFOLFVBQU8sS0FBSztRQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCwyQkFBUSxHQUFSLFVBQVMsS0FBSztRQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUEvQ0Q7UUFBQyxZQUFLLEVBQUU7OzRDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O29EQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O21EQUFBO0lBRVQ7UUFBQyxZQUFLLEVBQUU7OzJDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBN0JaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSw0MEJBV1Q7U0FDSixDQUFDOztnQkFBQTtJQW9ERixlQUFDO0FBQUQsQ0FuREEsQUFtREMsSUFBQTtBQW5EWSxnQkFBUSxXQW1EcEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2ZpZWxkc2V0L2ZpZWxkc2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1maWVsZHNldCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGZpZWxkc2V0IFtuZ0NsYXNzXT1cInsndWktZmllbGRzZXQgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktZmllbGRzZXQtdG9nZ2xlYWJsZSc6IHRvZ2dsZWFibGV9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGxlZ2VuZCBjbGFzcz1cInVpLWZpZWxkc2V0LWxlZ2VuZCB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHQgdWktdW5zZWxlY3RhYmxlLXRleHRcIiBcbiAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkxlZ2VuZE1vdXNlZW50ZXIoJGV2ZW50KVwiIChtb3VzZWxlYXZlKT1cIm9uTGVnZW5kTW91c2VsZWF2ZSgkZXZlbnQpXCIgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1ob3Zlcic6aG92ZXJ9XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0b2dnbGVhYmxlXCIgY2xhc3M9XCJ1aS1maWVsZHNldC10b2dnbGVyIGZhIGZhLXdcIiBbbmdDbGFzc109XCJ7J2ZhLW1pbnVzJzogIWNvbGxhcHNlZCwnZmEtcGx1cyc6Y29sbGFwc2VkfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7e2xlZ2VuZH19XG4gICAgICAgICAgICA8L2xlZ2VuZD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1maWVsZHNldC1jb250ZW50XCIgW3N0eWxlLmRpc3BsYXldPVwiY29sbGFwc2VkID8gJ25vbmUnIDogJ2Jsb2NrJ1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIEZpZWxkc2V0IHtcblxuICAgIEBJbnB1dCgpIGxlZ2VuZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdG9nZ2xlYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIG9uQmVmb3JlVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkFmdGVyVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgICAgICBcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmdcbiAgICBcbiAgICBwcml2YXRlIGhvdmVyOiBib29sZWFuO1xuICAgIFxuICAgIG9uTGVnZW5kTW91c2VlbnRlcihldmVudCkge1xuICAgICAgICBpZih0aGlzLnRvZ2dsZWFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSBcbiAgICBcbiAgICBvbkxlZ2VuZE1vdXNlbGVhdmUoZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy50b2dnbGVhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmhvdmVyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMudG9nZ2xlYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVRvZ2dsZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLmNvbGxhcHNlZClcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZChldmVudCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZShldmVudCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm9uQWZ0ZXJUb2dnbGUuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZWR9KTsgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBleHBhbmQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgY29sbGFwc2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuICAgIH1cblxufSJdfQ==
