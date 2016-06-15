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
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var GridDemo = (function () {
    function GridDemo() {
    }
    GridDemo = __decorate([
        core_1.Component({
            styles: ["\n        .ui-grid {\n            margin-bottom: 10px;\n        }\n\n        .ui-grid .ui-grid-row div {\n            background-color: #cccccc;\n            text-align: center;\n            border: 1px solid #dddddd;\n            padding: 10px 0px;\n        }\n    "],
            templateUrl: 'showcase/demo/grid/griddemo.html',
            directives: [tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter]
        }), 
        __metadata('design:paramtypes', [])
    ], GridDemo);
    return GridDemo;
}());
exports.GridDemo = GridDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZ3JpZC9ncmlkZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBa0JwRjtJQUFBO0lBRUEsQ0FBQztJQWxCRDtRQUFDLGdCQUFTLENBQUU7WUFDUixNQUFNLEVBQUMsQ0FBQyw0UUFXUCxDQUFDO1lBQ0YsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxVQUFVLEVBQUUsQ0FBQyxpQkFBTyxFQUFDLG1CQUFRLEVBQUMsaUNBQWUsQ0FBQztTQUNqRCxDQUFDOztnQkFBQTtJQUdGLGVBQUM7QUFBRCxDQUZBLEFBRUMsSUFBQTtBQUZZLGdCQUFRLFdBRXBCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9ncmlkL2dyaWRkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5cbkBDb21wb25lbnQgKHtcbiAgICBzdHlsZXM6W2BcbiAgICAgICAgLnVpLWdyaWQge1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC51aS1ncmlkIC51aS1ncmlkLXJvdyBkaXYge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2NjY2NjYztcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGRkZGQ7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDBweDtcbiAgICAgICAgfVxuICAgIGBdLFxuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9ncmlkL2dyaWRkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtUYWJWaWV3LFRhYlBhbmVsLENvZGVIaWdobGlnaHRlcl1cbn0pXG5leHBvcnQgY2xhc3MgR3JpZERlbW8ge1xuXG59Il19
