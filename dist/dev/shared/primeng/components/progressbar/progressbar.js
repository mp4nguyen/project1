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
var ProgressBar = (function () {
    function ProgressBar() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProgressBar.prototype, "value", void 0);
    ProgressBar = __decorate([
        core_1.Component({
            selector: 'p-progressBar',
            template: "\n        <div class=\"ui-progressbar ui-widget ui-widget-content ui-corner-all\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\">\n            <div class=\"ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div class=\"ui-progressbar-label\" [style.display]=\"value ? 'block' : 'none'\">{{value}}%</div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressBar);
    return ProgressBar;
}());
exports.ProgressBar = ProgressBar;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE4QixlQUFlLENBQUMsQ0FBQTtBQVc5QztJQUFBO0lBSUEsQ0FBQztJQUZHO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQVhaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxpZUFLVDtTQUNKLENBQUM7O21CQUFBO0lBS0Ysa0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLG1CQUFXLGNBSXZCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LElucHV0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXByb2dyZXNzQmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktcHJvZ3Jlc3NiYXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGxcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbWluPVwiMFwiIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcHJvZ3Jlc3NiYXItdmFsdWUgdWktcHJvZ3Jlc3NiYXItdmFsdWUtYW5pbWF0ZSB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIiBbc3R5bGUud2lkdGhdPVwidmFsdWUgKyAnJSdcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wcm9ncmVzc2Jhci1sYWJlbFwiIFtzdHlsZS5kaXNwbGF5XT1cInZhbHVlID8gJ2Jsb2NrJyA6ICdub25lJ1wiPnt7dmFsdWV9fSU8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG59Il19
