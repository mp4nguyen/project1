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
//# sourceMappingURL=doctorbookingtype.component.js.map