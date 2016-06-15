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
var Droppable = (function () {
    function Droppable(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onDragEnter = new core_1.EventEmitter();
        this.onDragLeave = new core_1.EventEmitter();
        this.onDrop = new core_1.EventEmitter();
        this.onDragOver = new core_1.EventEmitter();
    }
    Droppable.prototype.drop = function (event) {
        event.preventDefault();
        this.onDrop.emit(event);
    };
    Droppable.prototype.dragEnter = function (event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        this.onDragEnter.emit(event);
    };
    Droppable.prototype.dragLeave = function (event) {
        event.preventDefault();
        this.onDragLeave.emit(event);
    };
    Droppable.prototype.dragOver = function (event) {
        if (this.allowDrop(event)) {
            event.preventDefault();
            this.onDragOver.emit(event);
        }
    };
    Droppable.prototype.allowDrop = function (event) {
        var allow = false;
        var types = event.dataTransfer.types;
        if (types && types.length) {
            for (var i = 0; i < types.length; i++) {
                if (types[i] == this.scope) {
                    allow = true;
                    break;
                }
            }
        }
        return allow;
    };
    __decorate([
        core_1.Input('pDroppable'), 
        __metadata('design:type', String)
    ], Droppable.prototype, "scope", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Droppable.prototype, "dropEffect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Droppable.prototype, "onDragEnter", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Droppable.prototype, "onDragLeave", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Droppable.prototype, "onDrop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Droppable.prototype, "onDragOver", void 0);
    __decorate([
        core_1.HostListener('drop', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Droppable.prototype, "drop", null);
    __decorate([
        core_1.HostListener('dragenter', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Droppable.prototype, "dragEnter", null);
    __decorate([
        core_1.HostListener('dragleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Droppable.prototype, "dragLeave", null);
    __decorate([
        core_1.HostListener('dragover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Droppable.prototype, "dragOver", null);
    Droppable = __decorate([
        core_1.Directive({
            selector: '[pDroppable]',
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Droppable);
    return Droppable;
}());
exports.Droppable = Droppable;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZHJhZ2Ryb3AvZHJvcHBhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMEUsZUFBZSxDQUFDLENBQUE7QUFDMUYsMkJBQXlCLG1CQUFtQixDQUFDLENBQUE7QUFNN0M7SUFjSSxtQkFBb0IsRUFBYyxFQUFVLFVBQXNCO1FBQTlDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUnhELGdCQUFXLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXBELGdCQUFXLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXBELFdBQU0sR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFL0MsZUFBVSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUVRLENBQUM7SUFHdEUsd0JBQUksR0FBSixVQUFLLEtBQUs7UUFDTixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUdELDZCQUFTLEdBQVQsVUFBVSxLQUFLO1FBQ1gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEQsQ0FBQztRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFHRCw2QkFBUyxHQUFULFVBQVUsS0FBSztRQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBR0QsNEJBQVEsR0FBUixVQUFTLEtBQUs7UUFDVixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFFRCw2QkFBUyxHQUFULFVBQVUsS0FBSztRQUNYLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNyQyxFQUFFLENBQUEsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkIsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDYixLQUFLLENBQUM7Z0JBQ1YsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBMUREO1FBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQzs7NENBQUE7SUFFcEI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O2tEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O2tEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7OzZDQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O2lEQUFBO0lBSVQ7UUFBQyxtQkFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3lDQUFBO0lBTWpDO1FBQUMsbUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs4Q0FBQTtJQVd0QztRQUFDLG1CQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OENBQUE7SUFPdEM7UUFBQyxtQkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OzZDQUFBO0lBNUN6QztRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1NBQzFCLENBQUM7O2lCQUFBO0lBOERGLGdCQUFDO0FBQUQsQ0E3REEsQUE2REMsSUFBQTtBQTdEWSxpQkFBUyxZQTZEckIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2RyYWdkcm9wL2Ryb3BwYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BEcm9wcGFibGVdJyxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBEcm9wcGFibGUge1xuICAgIFxuICAgIEBJbnB1dCgncERyb3BwYWJsZScpIHNjb3BlOiBzdHJpbmc7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIGRyb3BFZmZlY3Q6IHN0cmluZztcbiAgICAgICAgXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25EcmFnTGVhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkRyb3A6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkRyYWdPdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgZG9tSGFuZGxlcjogRG9tSGFuZGxlcikge31cbiAgICAgICAgICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICAgIGRyb3AoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5vbkRyb3AuZW1pdChldmVudCk7XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbnRlcicsIFsnJGV2ZW50J10pIFxuICAgIGRyYWdFbnRlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5kcm9wRWZmZWN0KSB7XG4gICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IHRoaXMuZHJvcEVmZmVjdDtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLm9uRHJhZ0VudGVyLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKSBcbiAgICBkcmFnTGVhdmUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgdGhpcy5vbkRyYWdMZWF2ZS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKSBcbiAgICBkcmFnT3ZlcihldmVudCkge1xuICAgICAgICBpZih0aGlzLmFsbG93RHJvcChldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm9uRHJhZ092ZXIuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYWxsb3dEcm9wKGV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBhbGxvdyA9IGZhbHNlO1xuICAgICAgICBsZXQgdHlwZXMgPSBldmVudC5kYXRhVHJhbnNmZXIudHlwZXM7XG4gICAgICAgIGlmKHR5cGVzICYmIHR5cGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYodHlwZXNbaV0gPT0gdGhpcy5zY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBhbGxvdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxsb3c7XG4gICAgfVxufSJdfQ==
