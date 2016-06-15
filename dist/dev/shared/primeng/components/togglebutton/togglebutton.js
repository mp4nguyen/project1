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
var TOGGLEBUTTON_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return ToggleButton; }),
    multi: true
});
var ToggleButton = (function () {
    function ToggleButton() {
        this.onLabel = 'Yes';
        this.offLabel = 'No';
        this.onChange = new core_1.EventEmitter();
        this.checked = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    ToggleButton.prototype.getIconClass = function () {
        var baseClass = 'ui-button-icon-left fa fa-fw';
        return baseClass + ' ' + (this.checked ? this.onIcon : this.offIcon);
    };
    ToggleButton.prototype.toggle = function (event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
        }
    };
    ToggleButton.prototype.writeValue = function (value) {
        this.checked = value;
    };
    ToggleButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ToggleButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "onLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "offLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "onIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "offIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ToggleButton.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ToggleButton.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ToggleButton.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ToggleButton.prototype, "onChange", void 0);
    ToggleButton = __decorate([
        core_1.Component({
            selector: 'p-toggleButton',
            template: "\n        <div [ngClass]=\"{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon&&!offIcon), 'ui-button-text-icon-left': (onIcon&&offIcon),\n                'ui-state-active': checked, 'ui-state-hover': hover&&!disabled, 'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\" \n                (click)=\"toggle($event)\" (mouseenter)=\"hover=true\" (mouseleave)=\"hover=false\">\n            <span *ngIf=\"onIcon||offIcon\" [class]=\"getIconClass()\"></span>\n            <span class=\"ui-button-text ui-unselectable-text\">{{checked ? onLabel : offLabel}}</span>\n        </div>\n    ",
            providers: [TOGGLEBUTTON_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], ToggleButton);
    return ToggleButton;
}());
exports.ToggleButton = ToggleButton;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdG9nZ2xlYnV0dG9uL3RvZ2dsZWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXNFLGVBQWUsQ0FBQyxDQUFBO0FBQ3RGLHVCQUFzRCxpQkFBaUIsQ0FBQyxDQUFBO0FBRXhFLElBQU0sMkJBQTJCLEdBQWEsSUFBSSxlQUFRLENBQUMsMEJBQWlCLEVBQUU7SUFDMUUsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLFlBQVksRUFBWixDQUFZLENBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFjSDtJQUFBO1FBRWEsWUFBTyxHQUFXLEtBQUssQ0FBQztRQUV4QixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBWXZCLGFBQVEsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFM0QsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixrQkFBYSxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsY0FBTyxDQUFDLENBQUM7SUFnQ3hDLENBQUM7SUE1QkcsbUNBQVksR0FBWjtRQUNJLElBQUksU0FBUyxHQUFHLDhCQUE4QixDQUFDO1FBQy9DLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFPLEtBQUs7UUFDUixFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDZixhQUFhLEVBQUUsS0FBSztnQkFDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2FBQ3hCLENBQUMsQ0FBQTtRQUNOLENBQUM7SUFDTCxDQUFDO0lBRUQsaUNBQVUsR0FBVixVQUFXLEtBQVU7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELHVDQUFnQixHQUFoQixVQUFpQixFQUFZO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCx3Q0FBaUIsR0FBakIsVUFBa0IsRUFBWTtRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBbkREO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztvREFBQTtJQUVSO1FBQUMsYUFBTSxFQUFFOztrREFBQTtJQTVCYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSx1cEJBT1Q7WUFDRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUMzQyxDQUFDOztvQkFBQTtJQXVERixtQkFBQztBQUFELENBdERBLEFBc0RDLElBQUE7QUF0RFksb0JBQVksZUFzRHhCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy90b2dnbGVidXR0b24vdG9nZ2xlYnV0dG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixmb3J3YXJkUmVmLFByb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuXG5jb25zdCBUT0dHTEVCVVRUT05fVkFMVUVfQUNDRVNTT1I6IFByb3ZpZGVyID0gbmV3IFByb3ZpZGVyKE5HX1ZBTFVFX0FDQ0VTU09SLCB7XG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVG9nZ2xlQnV0dG9uKSxcbiAgICBtdWx0aTogdHJ1ZVxufSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10b2dnbGVCdXR0b24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1idXR0b24gdWktdG9nZ2xlYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktYnV0dG9uLXRleHQtb25seSc6ICghb25JY29uJiYhb2ZmSWNvbiksICd1aS1idXR0b24tdGV4dC1pY29uLWxlZnQnOiAob25JY29uJiZvZmZJY29uKSxcbiAgICAgICAgICAgICAgICAndWktc3RhdGUtYWN0aXZlJzogY2hlY2tlZCwgJ3VpLXN0YXRlLWhvdmVyJzogaG92ZXImJiFkaXNhYmxlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzogZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFxuICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiIChtb3VzZWVudGVyKT1cImhvdmVyPXRydWVcIiAobW91c2VsZWF2ZSk9XCJob3Zlcj1mYWxzZVwiPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJvbkljb258fG9mZkljb25cIiBbY2xhc3NdPVwiZ2V0SWNvbkNsYXNzKClcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWJ1dHRvbi10ZXh0IHVpLXVuc2VsZWN0YWJsZS10ZXh0XCI+e3tjaGVja2VkID8gb25MYWJlbCA6IG9mZkxhYmVsfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbVE9HR0xFQlVUVE9OX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBUb2dnbGVCdXR0b24gaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBvbkxhYmVsOiBzdHJpbmcgPSAnWWVzJztcblxuICAgIEBJbnB1dCgpIG9mZkxhYmVsOiBzdHJpbmcgPSAnTm8nO1xuXG4gICAgQElucHV0KCkgb25JY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBvZmZJY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIHByaXZhdGUgaG92ZXI6IGJvb2xlYW47XG5cbiAgICBnZXRJY29uQ2xhc3MoKSB7XG4gICAgICAgIGxldCBiYXNlQ2xhc3MgPSAndWktYnV0dG9uLWljb24tbGVmdCBmYSBmYS1mdyc7XG4gICAgICAgIHJldHVybiBiYXNlQ2xhc3MgKyAnICcgKyAodGhpcy5jaGVja2VkID8gdGhpcy5vbkljb24gOiB0aGlzLm9mZkljb24pO1xuICAgIH1cbiAgICBcbiAgICB0b2dnbGUoZXZlbnQpIHtcbiAgICAgICAgaWYoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogdGhpcy5jaGVja2VkXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxufSJdfQ==
