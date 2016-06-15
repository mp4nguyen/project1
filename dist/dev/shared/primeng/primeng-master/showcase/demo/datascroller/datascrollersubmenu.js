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
var router_deprecated_1 = require('angular2/router-deprecated');
var DataScrollerSubMenu = (function () {
    function DataScrollerSubMenu() {
    }
    DataScrollerSubMenu = __decorate([
        core_1.Component({
            selector: 'datascroller-demos',
            template: "\n        <div id=\"datatable-submenu\" class=\"ContentSideSections SubSubMenu ui-helper-clearfix\">\n            <ul>\n                <li><a [routerLink]=\"['DataScrollerDemo']\">&#9679; Window</a></li>\n                <li><a [routerLink]=\"['DataScrollerInlineDemo']\">&#9679; Inline</a></li>\n                <li><a [routerLink]=\"['DataScrollerLoaderDemo']\">&#9679; Loader</a></li>\n                <li><a [routerLink]=\"['DataScrollerInfiniteDemo']\">&#9679; Infinite</a></li>\n            </ul>\n        </div>\n    ",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DataScrollerSubMenu);
    return DataScrollerSubMenu;
}());
exports.DataScrollerSubMenu = DataScrollerSubMenu;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXNjcm9sbGVyL2RhdGFzY3JvbGxlcnN1Ym1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QyxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQWdCN0Q7SUFBQTtJQUNBLENBQUM7SUFmRDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFFBQVEsRUFBRSwrZ0JBU1Q7WUFDRCxVQUFVLEVBQUUsQ0FBQyxxQ0FBaUIsQ0FBQztTQUNsQyxDQUFDOzsyQkFBQTtJQUVGLDBCQUFDO0FBQUQsQ0FEQSxBQUNDLElBQUE7QUFEWSwyQkFBbUIsc0JBQy9CLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9kYXRhc2Nyb2xsZXIvZGF0YXNjcm9sbGVyc3VibWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkYXRhc2Nyb2xsZXItZGVtb3MnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgaWQ9XCJkYXRhdGFibGUtc3VibWVudVwiIGNsYXNzPVwiQ29udGVudFNpZGVTZWN0aW9ucyBTdWJTdWJNZW51IHVpLWhlbHBlci1jbGVhcmZpeFwiPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ0RhdGFTY3JvbGxlckRlbW8nXVwiPiYjOTY3OTsgV2luZG93PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnRGF0YVNjcm9sbGVySW5saW5lRGVtbyddXCI+JiM5Njc5OyBJbmxpbmU8L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8bGk+PGEgW3JvdXRlckxpbmtdPVwiWydEYXRhU2Nyb2xsZXJMb2FkZXJEZW1vJ11cIj4mIzk2Nzk7IExvYWRlcjwvYT48L2xpPlxuICAgICAgICAgICAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ0RhdGFTY3JvbGxlckluZmluaXRlRGVtbyddXCI+JiM5Njc5OyBJbmZpbml0ZTwvYT48L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTY3JvbGxlclN1Yk1lbnUge1xufVxuIl19
