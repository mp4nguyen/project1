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
var accordion_1 = require('../../../components/accordion/accordion');
var accordiontab_1 = require('../../../components/accordion/accordiontab');
var growl_1 = require('../../../components/growl/growl');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var AccordionDemo = (function () {
    function AccordionDemo() {
    }
    AccordionDemo.prototype.onTabClose = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index });
    };
    AccordionDemo.prototype.onTabOpen = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index });
    };
    AccordionDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/accordion/accordiondemo.html',
            directives: [accordion_1.Accordion, accordiontab_1.AccordionTab, growl_1.Growl, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], AccordionDemo);
    return AccordionDemo;
}());
exports.AccordionDemo = AccordionDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vYWNjb3JkaW9uL2FjY29yZGlvbmRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QywwQkFBd0IseUNBQXlDLENBQUMsQ0FBQTtBQUNsRSw2QkFBMkIsNENBQTRDLENBQUMsQ0FBQTtBQUN4RSxzQkFBb0IsaUNBQWlDLENBQUMsQ0FBQTtBQUN0RCxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUU5RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU03RDtJQUFBO0lBYUEsQ0FBQztJQVRHLGtDQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRCxpQ0FBUyxHQUFULFVBQVUsS0FBSztRQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBaEJMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSw0Q0FBNEM7WUFDekQsVUFBVSxFQUFFLENBQUMscUJBQVMsRUFBQywyQkFBWSxFQUFDLGFBQUssRUFBQyxpQkFBTyxFQUFDLG1CQUFRLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUNoRyxDQUFDOztxQkFBQTtJQWNGLG9CQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSxxQkFBYSxnQkFhekIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2FjY29yZGlvbi9hY2NvcmRpb25kZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtBY2NvcmRpb259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYWNjb3JkaW9uL2FjY29yZGlvbic7XG5pbXBvcnQge0FjY29yZGlvblRhYn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hY2NvcmRpb24vYWNjb3JkaW9udGFiJztcbmltcG9ydCB7R3Jvd2x9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZ3Jvd2wvZ3Jvd2wnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL21lc3NhZ2UnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vYWNjb3JkaW9uL2FjY29yZGlvbmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0FjY29yZGlvbixBY2NvcmRpb25UYWIsR3Jvd2wsVGFiVmlldyxUYWJQYW5lbCxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvbkRlbW8ge1xuXG4gICAgbXNnczogTWVzc2FnZVtdO1xuXG4gICAgb25UYWJDbG9zZShldmVudCkge1xuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OidpbmZvJywgc3VtbWFyeTonVGFiIENsb3NlZCcsIGRldGFpbDogJ0luZGV4OiAnICsgZXZlbnQuaW5kZXh9KTtcbiAgICB9XG4gICAgXG4gICAgb25UYWJPcGVuKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidUYWIgRXhwYW5kZWQnLCBkZXRhaWw6ICdJbmRleDogJyArIGV2ZW50LmluZGV4fSk7XG4gICAgfVxufSJdfQ==
