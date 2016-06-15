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
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var core_1 = require('angular/core');
var DoctorBookingTypeComponent = (function () {
    function DoctorBookingTypeComponent() {
    }
    DoctorBookingTypeComponent.prototype.close = function () {
        this.modal.close();
    };
    DoctorBookingTypeComponent.prototype.open = function () {
        this.modal.open();
    };
    __decorate([
        core_1.ViewChild('myModal'), 
        __metadata('design:type', Object)
    ], DoctorBookingTypeComponent.prototype, "modal", void 0);
    DoctorBookingTypeComponent = __decorate([
        core_1.Component({
            selector: 'doctor-bookingtype',
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES],
            template: "\n        <modal #myModal>\n            ...\n        </modal>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DoctorBookingTypeComponent);
    return DoctorBookingTypeComponent;
}());
exports.DoctorBookingTypeComponent = DoctorBookingTypeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9jb21wb25lbnRzL2RvY3RvcmJvb2tpbmd0eXBlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsOEJBQWlDLDZCQUE2QixDQUFDLENBQUE7QUFDL0QscUJBQXFDLGNBQWMsQ0FBQyxDQUFBO0FBWXBEO0lBQUE7SUFXQSxDQUFDO0lBUEcsMENBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHlDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFURDtRQUFDLGdCQUFTLENBQUMsU0FBUyxDQUFDOzs2REFBQTtJQVZ6QjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFVBQVUsRUFBRSxDQUFDLGdDQUFnQixDQUFDO1lBQzlCLFFBQVEsRUFBRSxxRUFJVDtTQUNKLENBQUM7O2tDQUFBO0lBWUYsaUNBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLGtDQUEwQiw2QkFXdEMsQ0FBQSIsImZpbGUiOiJjb21wYW5pZXMvY29tcG9uZW50cy9kb2N0b3Jib29raW5ndHlwZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNT0RBTF9ESVJFQ1RJVkVTIH0gZnJvbSAnbmcyLWJzMy1tb2RhbC9uZzItYnMzLW1vZGFsJztcbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkIH0gZnJvbSAnYW5ndWxhci9jb3JlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2RvY3Rvci1ib29raW5ndHlwZScsXG4gICAgZGlyZWN0aXZlczogW01PREFMX0RJUkVDVElWRVNdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxtb2RhbCAjbXlNb2RhbD5cbiAgICAgICAgICAgIC4uLlxuICAgICAgICA8L21vZGFsPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgRG9jdG9yQm9va2luZ1R5cGVDb21wb25lbnQge1xuICAgIEBWaWV3Q2hpbGQoJ215TW9kYWwnKVxuICAgIG1vZGFsOiBNb2RhbENvbXBvbmVudDtcblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLm1vZGFsLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5vcGVuKCk7XG4gICAgfVxufSJdfQ==
