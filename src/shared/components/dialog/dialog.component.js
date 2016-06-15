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
//# sourceMappingURL=dialog.component.js.map