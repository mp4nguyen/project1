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
var rating_1 = require('../../../components/rating/rating');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var RatingDemo = (function () {
    function RatingDemo() {
        this.val4 = 5;
    }
    RatingDemo.prototype.handleRate = function (event) {
        this.msg = "You have rated " + event.value;
    };
    RatingDemo.prototype.handleCancel = function (event) {
        this.msg = "Rating Cancelled";
    };
    RatingDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/rating/ratingdemo.html',
            directives: [rating_1.Rating, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RatingDemo);
    return RatingDemo;
}());
exports.RatingDemo = RatingDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vcmF0aW5nL3JhdGluZ2RlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU03RDtJQUFBO1FBUUksU0FBSSxHQUFXLENBQUMsQ0FBQztJQVdyQixDQUFDO0lBUEcsK0JBQVUsR0FBVixVQUFXLEtBQUs7UUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDL0MsQ0FBQztJQUVELGlDQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2QsSUFBSSxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQztJQUNsQyxDQUFDO0lBdEJMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSxzQ0FBc0M7WUFDbkQsVUFBVSxFQUFFLENBQUMsZUFBTSxFQUFDLGlCQUFPLEVBQUMsbUJBQVEsRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQzFFLENBQUM7O2tCQUFBO0lBb0JGLGlCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSxrQkFBVSxhQW1CdEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL3JhdGluZy9yYXRpbmdkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtSYXRpbmd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvcmF0aW5nL3JhdGluZyc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL3JhdGluZy9yYXRpbmdkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtSYXRpbmcsVGFiVmlldyxUYWJQYW5lbCxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFJhdGluZ0RlbW8ge1xuXG4gICAgdmFsMTogbnVtYmVyO1xuXG4gICAgdmFsMjogbnVtYmVyO1xuXG4gICAgdmFsMzogbnVtYmVyO1xuXG4gICAgdmFsNDogbnVtYmVyID0gNTtcblxuICAgIG1zZzogc3RyaW5nO1xuXG4gICAgaGFuZGxlUmF0ZShldmVudCkge1xuICAgICAgICB0aGlzLm1zZyA9IFwiWW91IGhhdmUgcmF0ZWQgXCIgKyBldmVudC52YWx1ZTtcbiAgICB9XG5cbiAgICBoYW5kbGVDYW5jZWwoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5tc2cgPSBcIlJhdGluZyBDYW5jZWxsZWRcIjtcbiAgICB9XG59Il19
