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
var TreeNodeTemplateLoader = (function () {
    function TreeNodeTemplateLoader(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TreeNodeTemplateLoader.prototype.ngOnInit = function () {
        var view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.node
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeNodeTemplateLoader.prototype, "node", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], TreeNodeTemplateLoader.prototype, "template", void 0);
    TreeNodeTemplateLoader = __decorate([
        core_1.Component({
            selector: 'p-treeNodeTemplateLoader',
            template: ""
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], TreeNodeTemplateLoader);
    return TreeNodeTemplateLoader;
}());
exports.TreeNodeTemplateLoader = TreeNodeTemplateLoader;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdHJlZS90cmVlbm9kZXRlbXBsYXRlbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBc0ksZUFBZSxDQUFDLENBQUE7QUFNdEo7SUFNSSxnQ0FBb0IsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO0lBQUcsQ0FBQztJQUV2RCx5Q0FBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVELFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUMxQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBVkQ7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzREQUFBO0lBUlo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7OzhCQUFBO0lBY0YsNkJBQUM7QUFBRCxDQWJBLEFBYUMsSUFBQTtBQWJZLDhCQUFzQix5QkFhbEMsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL3RyZWUvdHJlZW5vZGV0ZW1wbGF0ZWxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LEVsZW1lbnRSZWYsT25Jbml0LERvQ2hlY2ssSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDb250ZW50Q2hpbGQsSXRlcmFibGVEaWZmZXJzLFRlbXBsYXRlUmVmLFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZU5vZGVUZW1wbGF0ZUxvYWRlcicsXG4gICAgdGVtcGxhdGU6IGBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlVGVtcGxhdGVMb2FkZXIgaW1wbGVtZW50cyBPbkluaXQge1xuICAgICAgICBcbiAgICBASW5wdXQoKSBub2RlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUsIHtcbiAgICAgICAgICAgICdcXCRpbXBsaWNpdCc6IHRoaXMubm9kZVxuICAgICAgICB9KTtcbiAgICB9XG59Il19
