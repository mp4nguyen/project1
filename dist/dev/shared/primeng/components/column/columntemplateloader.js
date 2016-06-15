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
var ColumnTemplateLoader = (function () {
    function ColumnTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnTemplateLoader.prototype.ngOnInit = function () {
        var view = this.viewContainer.createEmbeddedView(this.column.template, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ColumnTemplateLoader.prototype, "column", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ColumnTemplateLoader.prototype, "rowData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ColumnTemplateLoader.prototype, "rowIndex", void 0);
    ColumnTemplateLoader = __decorate([
        core_1.Component({
            selector: 'p-columnTemplateLoader',
            template: ""
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], ColumnTemplateLoader);
    return ColumnTemplateLoader;
}());
exports.ColumnTemplateLoader = ColumnTemplateLoader;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvY29sdW1uL2NvbHVtbnRlbXBsYXRlbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkksZUFBZSxDQUFDLENBQUE7QUFRN0o7SUFRSSw4QkFBb0IsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO0lBQUcsQ0FBQztJQUV2RCx1Q0FBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNuRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDekIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUM1QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBZEQ7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzBEQUFBO0lBVlo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7OzRCQUFBO0lBa0JGLDJCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSw0QkFBb0IsdUJBaUJoQyxDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvY29sdW1uL2NvbHVtbnRlbXBsYXRlbG9hZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LERvQ2hlY2ssSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDb250ZW50Q2hpbGQsSXRlcmFibGVEaWZmZXJzLFRlbXBsYXRlUmVmLFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtIZWFkZXJ9IGZyb20gJy4uL2NvbW1vbi9oZWFkZXInO1xuaW1wb3J0IHtGb290ZXJ9IGZyb20gJy4uL2NvbW1vbi9mb290ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY29sdW1uVGVtcGxhdGVMb2FkZXInLFxuICAgIHRlbXBsYXRlOiBgYFxufSlcbmV4cG9ydCBjbGFzcyBDb2x1bW5UZW1wbGF0ZUxvYWRlciB7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIGNvbHVtbjogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHJvd0RhdGE6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSByb3dJbmRleDogbnVtYmVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuY29sdW1uLnRlbXBsYXRlLCB7XG4gICAgICAgICAgICAnXFwkaW1wbGljaXQnOiB0aGlzLmNvbHVtbixcbiAgICAgICAgICAgICdyb3dEYXRhJzogdGhpcy5yb3dEYXRhLFxuICAgICAgICAgICAgJ3Jvd0luZGV4JzogdGhpcy5yb3dJbmRleFxuICAgICAgICB9KTtcbiAgICB9XG59Il19
