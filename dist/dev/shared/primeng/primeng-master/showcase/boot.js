"use strict";
var platform_browser_dynamic_1 = require('angular2/platform-browser-dynamic');
var core_1 = require('angular2/core');
var app_component_1 = require('./app.component');
var router_deprecated_1 = require('angular2/router-deprecated');
var common_1 = require('angular2/common');
require('rxjs/Rx');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_deprecated_1.ROUTER_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy })
]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2Jvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELHFCQUFzQixlQUFlLENBQUMsQ0FBQTtBQUN0Qyw4QkFBMkIsaUJBQzNCLENBQUMsQ0FEMkM7QUFDNUMsa0NBQStCLDRCQUE0QixDQUFDLENBQUE7QUFFNUQsdUJBQW9ELGlCQUFpQixDQUFDLENBQUE7QUFDdEUsUUFBTyxTQUFTLENBQUMsQ0FBQTtBQUdqQixvQ0FBUyxDQUFDLDRCQUFZLEVBQUU7SUFDdEIsb0NBQWdCO0lBQ2hCLGNBQU8sQ0FBQyx5QkFBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2QkFBb0IsRUFBQyxDQUFDO0NBQzVELENBQUMsQ0FBQyIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9ib290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYyc7XG5pbXBvcnQge3Byb3ZpZGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gJy4vYXBwLmNvbXBvbmVudCdcbmltcG9ydCB7Uk9VVEVSX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtlbmFibGVQcm9kTW9kZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3ksSGFzaExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQgJ3J4anMvUngnO1xuXG4vL2VuYWJsZVByb2RNb2RlKCk7XG5ib290c3RyYXAoQXBwQ29tcG9uZW50LCBbXG4gIFJPVVRFUl9QUk9WSURFUlMsXG4gIHByb3ZpZGUoTG9jYXRpb25TdHJhdGVneSwge3VzZUNsYXNzOiBIYXNoTG9jYXRpb25TdHJhdGVneX0pXG5dKTsiXX0=
