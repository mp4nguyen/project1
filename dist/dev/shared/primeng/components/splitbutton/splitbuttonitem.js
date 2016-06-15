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
var SplitButtonItem = (function () {
    function SplitButtonItem() {
        this.onClick = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButtonItem.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButtonItem.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SplitButtonItem.prototype, "url", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SplitButtonItem.prototype, "onClick", void 0);
    SplitButtonItem = __decorate([
        core_1.Component({
            selector: 'p-splitButtonItem',
            template: "\n        \n    "
        }), 
        __metadata('design:paramtypes', [])
    ], SplitButtonItem);
    return SplitButtonItem;
}());
exports.SplitButtonItem = SplitButtonItem;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvc3BsaXRidXR0b24vc3BsaXRidXR0b25pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkUsZUFBZSxDQUFDLENBQUE7QUFRM0Y7SUFBQTtRQVFjLFlBQU8sR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFFOUQsQ0FBQztJQVJHO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQUVSO1FBQUMsYUFBTSxFQUFFOztvREFBQTtJQWRiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLGtCQUVUO1NBQ0osQ0FBQzs7dUJBQUE7SUFXRixzQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBVlksdUJBQWUsa0JBVTNCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9zcGxpdGJ1dHRvbi9zcGxpdGJ1dHRvbml0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zcGxpdEJ1dHRvbkl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIFxuICAgIGAgXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0QnV0dG9uSXRlbSB7XG5cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgdXJsOiBhbnk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAgICAgXG59Il19
