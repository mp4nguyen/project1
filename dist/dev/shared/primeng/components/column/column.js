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
var Column = (function () {
    function Column() {
        this.sortFunction = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "footer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Column.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Column.prototype, "editable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Column.prototype, "filter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "filterMatchMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Column.prototype, "rowspan", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Column.prototype, "colspan", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Column.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Column.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Column.prototype, "hidden", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Column.prototype, "expander", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Column.prototype, "sortFunction", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Column.prototype, "template", void 0);
    Column = __decorate([
        core_1.Component({
            selector: 'p-column',
            template: ""
        }), 
        __metadata('design:paramtypes', [])
    ], Column);
    return Column;
}());
exports.Column = Column;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvY29sdW1uL2NvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTRILGVBQWUsQ0FBQyxDQUFBO0FBUTVJO0lBQUE7UUFlYyxpQkFBWSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUduRSxDQUFDO0lBaEJHO1FBQUMsWUFBSyxFQUFFOzt5Q0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzttREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsyQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzsyQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzt5Q0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUNSO1FBQUMsYUFBTSxFQUFFOztnREFBQTtJQUNUO1FBQUMsbUJBQVksQ0FBQyxrQkFBVyxDQUFDOzs0Q0FBQTtJQXBCOUI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDOztjQUFBO0lBbUJGLGFBQUM7QUFBRCxDQWxCQSxBQWtCQyxJQUFBO0FBbEJZLGNBQU0sU0FrQmxCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9jb2x1bW4vY29sdW1uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LERvQ2hlY2ssSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDb250ZW50Q2hpbGQsSXRlcmFibGVEaWZmZXJzLFRlbXBsYXRlUmVmfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SGVhZGVyfSBmcm9tICcuLi9jb21tb24vaGVhZGVyJztcbmltcG9ydCB7Rm9vdGVyfSBmcm9tICcuLi9jb21tb24vZm9vdGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNvbHVtbicsXG4gICAgdGVtcGxhdGU6IGBgXG59KVxuZXhwb3J0IGNsYXNzIENvbHVtbiB7XG4gICAgXG4gICAgQElucHV0KCkgZmllbGQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBmb290ZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBzb3J0YWJsZTogYW55O1xuICAgIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGZpbHRlcjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBmaWx0ZXJNYXRjaE1vZGU6IHN0cmluZztcbiAgICBASW5wdXQoKSByb3dzcGFuOiBudW1iZXI7XG4gICAgQElucHV0KCkgY29sc3BhbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGhpZGRlbjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBleHBhbmRlcjogYm9vbGVhbjtcbiAgICBAT3V0cHV0KCkgc29ydEZ1bmN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBcbn0iXX0=
