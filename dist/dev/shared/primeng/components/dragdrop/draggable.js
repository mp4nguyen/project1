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
var Draggable = (function () {
    function Draggable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragStart = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        this.onDrag = new core_1.EventEmitter();
    }
    Draggable.prototype.dragStart = function (event) {
        if (this.allowDrag()) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData(this.scope, this.scope);
            this.onDragStart.emit(event);
        }
        else {
            event.preventDefault();
        }
    };
    Draggable.prototype.drag = function (event) {
        this.onDrag.emit(event);
    };
    Draggable.prototype.dragEnd = function (event) {
        this.onDragEnd.emit(event);
    };
    Draggable.prototype.mouseover = function (event) {
        this.handle = event.target;
    };
    Draggable.prototype.mouseleave = function (event) {
        this.handle = null;
    };
    Draggable.prototype.allowDrag = function () {
        if (this.dragHandle && this.handle)
            return this.domHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    };
    __decorate([
        core_1.Input('pDraggable'), 
        __metadata('design:type', String)
    ], Draggable.prototype, "scope", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Draggable.prototype, "dragEffect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Draggable.prototype, "dragHandle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragEnd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDrag", void 0);
    __decorate([
        core_1.HostListener('dragstart', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "dragStart", null);
    __decorate([
        core_1.HostListener('drag', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "drag", null);
    __decorate([
        core_1.HostListener('dragend', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "dragEnd", null);
    __decorate([
        core_1.HostListener('mouseover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "mouseover", null);
    __decorate([
        core_1.HostListener('mouseleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "mouseleave", null);
    Draggable = __decorate([
        core_1.Directive({
            selector: '[pDraggable]',
            host: {
                '[draggable]': 'true'
            },
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Draggable);
    return Draggable;
}());
exports.Draggable = Draggable;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZHJhZ2Ryb3AvZHJhZ2dhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMEUsZUFBZSxDQUFDLENBQUE7QUFDMUYsMkJBQXlCLG1CQUFtQixDQUFDLENBQUE7QUFTN0M7SUFnQkksbUJBQW9CLEVBQWMsRUFBVSxVQUFzQjtRQUE5QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVJ4RCxnQkFBVyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUVwRCxjQUFTLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRWxELFdBQU0sR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFJWSxDQUFDO0lBR3RFLDZCQUFTLEdBQVQsVUFBVSxLQUFLO1FBQ1gsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUN2RCxDQUFDO1lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLENBQUM7SUFDTCxDQUFDO0lBR0Qsd0JBQUksR0FBSixVQUFLLEtBQUs7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBR0QsMkJBQU8sR0FBUCxVQUFRLEtBQUs7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBR0QsNkJBQVMsR0FBVCxVQUFVLEtBQUs7UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUdELDhCQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELDZCQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLElBQUk7WUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUF4REQ7UUFBQyxZQUFLLENBQUMsWUFBWSxDQUFDOzs0Q0FBQTtJQUVwQjtRQUFDLFlBQUssRUFBRTs7aURBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7aURBQUE7SUFFUjtRQUFDLGFBQU0sRUFBRTs7a0RBQUE7SUFFVDtRQUFDLGFBQU0sRUFBRTs7Z0RBQUE7SUFFVDtRQUFDLGFBQU0sRUFBRTs7NkNBQUE7SUFNVDtRQUFDLG1CQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OENBQUE7SUFldEM7UUFBQyxtQkFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3lDQUFBO0lBS2pDO1FBQUMsbUJBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs0Q0FBQTtJQUtwQztRQUFDLG1CQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OENBQUE7SUFLdEM7UUFBQyxtQkFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OytDQUFBO0lBdkQzQztRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixJQUFJLEVBQUU7Z0JBQ0YsYUFBYSxFQUFFLE1BQU07YUFDeEI7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1NBQzFCLENBQUM7O2lCQUFBO0lBNkRGLGdCQUFDO0FBQUQsQ0E1REEsQUE0REMsSUFBQTtBQTVEWSxpQkFBUyxZQTREckIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2RyYWdkcm9wL2RyYWdnYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BEcmFnZ2FibGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbZHJhZ2dhYmxlXSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl1cbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlIHtcbiAgICBcbiAgICBASW5wdXQoJ3BEcmFnZ2FibGUnKSBzY29wZTogc3RyaW5nO1xuICAgICAgICBcbiAgICBASW5wdXQoKSBkcmFnRWZmZWN0OiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgZHJhZ0hhbmRsZTogc3RyaW5nO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkRyYWdTdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRHJhZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgcHJpdmF0ZSBoYW5kbGU6IGFueTtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyKSB7fVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pIFxuICAgIGRyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZih0aGlzLmFsbG93RHJhZygpKSB7XG4gICAgICAgICAgICBpZih0aGlzLmRyYWdFZmZlY3QpIHtcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9IHRoaXMuZHJhZ0VmZmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKHRoaXMuc2NvcGUsIHRoaXMuc2NvcGUpO1xuICAgICAgICAgICAgdGhpcy5vbkRyYWdTdGFydC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZycsIFsnJGV2ZW50J10pIFxuICAgIGRyYWcoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkRyYWcuZW1pdChldmVudCk7XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKSBcbiAgICBkcmFnRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25EcmFnRW5kLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZW92ZXInLCBbJyRldmVudCddKSBcbiAgICBtb3VzZW92ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGUgPSBldmVudC50YXJnZXQ7XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBbJyRldmVudCddKSBcbiAgICBtb3VzZWxlYXZlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGFuZGxlID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgYWxsb3dEcmFnKCkgOiBib29sZWFuIHtcbiAgICAgICAgaWYodGhpcy5kcmFnSGFuZGxlICYmIHRoaXMuaGFuZGxlKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9tSGFuZGxlci5tYXRjaGVzKHRoaXMuaGFuZGxlLCB0aGlzLmRyYWdIYW5kbGUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgXG59Il19
