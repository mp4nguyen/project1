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
var RowExpansionLoader = (function () {
    function RowExpansionLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    RowExpansionLoader.prototype.ngOnInit = function () {
        var view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.rowData
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], RowExpansionLoader.prototype, "template", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RowExpansionLoader.prototype, "rowData", void 0);
    RowExpansionLoader = __decorate([
        core_1.Component({
            selector: 'p-rowExpansionLoader',
            template: ""
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], RowExpansionLoader);
    return RowExpansionLoader;
}());
exports.RowExpansionLoader = RowExpansionLoader;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZGF0YXRhYmxlL3Jvd2V4cGFuc2lvbmxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTZJLGVBQWUsQ0FBQyxDQUFBO0FBUTdKO0lBTUksNEJBQW9CLGFBQStCO1FBQS9CLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtJQUFHLENBQUM7SUFFdkQscUNBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM1RCxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDN0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQVZEO1FBQUMsWUFBSyxFQUFFOzt3REFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzt1REFBQTtJQVJaO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDOzswQkFBQTtJQWNGLHlCQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSwwQkFBa0IscUJBYTlCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9kYXRhdGFibGUvcm93ZXhwYW5zaW9ubG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LERvQ2hlY2ssSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDb250ZW50Q2hpbGQsSXRlcmFibGVEaWZmZXJzLFRlbXBsYXRlUmVmLFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtIZWFkZXJ9IGZyb20gJy4uL2NvbW1vbi9oZWFkZXInO1xuaW1wb3J0IHtGb290ZXJ9IGZyb20gJy4uL2NvbW1vbi9mb290ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atcm93RXhwYW5zaW9uTG9hZGVyJyxcbiAgICB0ZW1wbGF0ZTogYGBcbn0pXG5leHBvcnQgY2xhc3MgUm93RXhwYW5zaW9uTG9hZGVyIHtcbiAgICAgICAgXG4gICAgQElucHV0KCkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgXG4gICAgQElucHV0KCkgcm93RGF0YTogYW55O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUsIHtcbiAgICAgICAgICAgICdcXCRpbXBsaWNpdCc6IHRoaXMucm93RGF0YVxuICAgICAgICB9KTtcbiAgICB9XG59Il19
