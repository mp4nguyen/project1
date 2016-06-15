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
var TabPanel = (function () {
    function TabPanel() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabPanel.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabPanel.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabPanel.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabPanel.prototype, "closable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TabPanel.prototype, "headerStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabPanel.prototype, "headerStyleClass", void 0);
    TabPanel = __decorate([
        core_1.Component({
            selector: 'p-tabPanel',
            template: "\n        <div class=\"ui-tabview-panel ui-widget-content\" [style.display]=\"selected ? 'block' : 'none'\" *ngIf=\"!closed\">\n            <ng-content></ng-content>\n        </div>\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], TabPanel);
    return TabPanel;
}());
exports.TabPanel = TabPanel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQThCLGVBQWUsQ0FBQyxDQUFBO0FBVzlDO0lBQUE7SUFpQkEsQ0FBQztJQWZHO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztzREFBQTtJQXBCWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsNkxBSVQ7U0FDSixDQUFDOztnQkFBQTtJQWtCRixlQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSxnQkFBUSxXQWlCcEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxJbnB1dH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4vdGFidmlldyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRhYnZpZXctcGFuZWwgdWktd2lkZ2V0LWNvbnRlbnRcIiBbc3R5bGUuZGlzcGxheV09XCJzZWxlY3RlZCA/ICdibG9jaycgOiAnbm9uZSdcIiAqbmdJZj1cIiFjbG9zZWRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgVGFiUGFuZWwge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZWxlY3RlZDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGhlYWRlclN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBwdWJsaWMgaG92ZXJIZWFkZXI6IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIGNsb3NlZDogYm9vbGVhbjtcbn0iXX0=
