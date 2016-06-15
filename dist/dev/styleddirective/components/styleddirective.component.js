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
var StyledDirective = (function () {
    function StyledDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
        console.log("running...");
    }
    StyledDirective = __decorate([
        core_1.Directive({
            selector: '[styled]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], StyledDirective);
    return StyledDirective;
}());
exports.StyledDirective = StyledDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlZGRpcmVjdGl2ZS9jb21wb25lbnRzL3N0eWxlZGRpcmVjdGl2ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE4QyxlQUFlLENBQUMsQ0FBQTtBQU05RDtJQUNFLHlCQUFtQixFQUFjLEVBQVMsUUFBa0I7UUFBekMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFMUQsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQVRIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1NBQ3JCLENBQUM7O3VCQUFBO0lBUUYsc0JBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQU5ZLHVCQUFlLGtCQU0zQixDQUFBIiwiZmlsZSI6InN0eWxlZGRpcmVjdGl2ZS9jb21wb25lbnRzL3N0eWxlZGRpcmVjdGl2ZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc3R5bGVkXScsXG59KVxuXG5leHBvcnQgY2xhc3MgU3R5bGVkRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyKSB7XG4gICAgLy8gZWwubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcbiAgICByZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZWwubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmRDb2xvcicsICd5ZWxsb3cnKTtcbiAgICBjb25zb2xlLmxvZyhcInJ1bm5pbmcuLi5cIik7XG4gIH1cbn1cbiJdfQ==
