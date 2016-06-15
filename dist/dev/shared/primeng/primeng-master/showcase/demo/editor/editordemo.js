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
var editor_1 = require('../../../components/editor/editor');
var header_1 = require('../../../components/common/header');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var router_deprecated_1 = require('angular2/router-deprecated');
var EditorDemo = (function () {
    function EditorDemo() {
        this.text1 = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
    }
    EditorDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/editor/editordemo.html',
            directives: [editor_1.Editor, header_1.Header, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], EditorDemo);
    return EditorDemo;
}());
exports.EditorDemo = EditorDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZWRpdG9yL2VkaXRvcmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCx3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRixrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU03RDtJQUFBO1FBRUksVUFBSyxHQUFXLDhFQUE4RSxDQUFDO0lBR25HLENBQUM7SUFURDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsc0NBQXNDO1lBQ25ELFVBQVUsRUFBRSxDQUFDLGVBQU0sRUFBQyxlQUFNLEVBQUMsZUFBTSxFQUFDLGlCQUFPLEVBQUMsbUJBQVEsRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQ3hGLENBQUM7O2tCQUFBO0lBTUYsaUJBQUM7QUFBRCxDQUxBLEFBS0MsSUFBQTtBQUxZLGtCQUFVLGFBS3RCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9lZGl0b3IvZWRpdG9yZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7RWRpdG9yfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2VkaXRvci9lZGl0b3InO1xuaW1wb3J0IHtIZWFkZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2hlYWRlcic7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vZWRpdG9yL2VkaXRvcmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0VkaXRvcixIZWFkZXIsQnV0dG9uLFRhYlZpZXcsVGFiUGFuZWwsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0b3JEZW1vIHtcblxuICAgIHRleHQxOiBzdHJpbmcgPSAnPGRpdj5IZWxsbyBXb3JsZCE8L2Rpdj48ZGl2PlByaW1lTkcgPGI+RWRpdG9yPC9iPiBSb2NrczwvZGl2PjxkaXY+PGJyPjwvZGl2Pic7XG4gICAgXG4gICAgdGV4dDI6IHN0cmluZztcbn0iXX0=
