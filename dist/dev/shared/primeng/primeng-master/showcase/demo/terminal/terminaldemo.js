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
var terminal_1 = require('../../../components/terminal/terminal');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var TerminalDemo = (function () {
    function TerminalDemo() {
    }
    TerminalDemo.prototype.onCommand = function (event) {
        if (event.command === 'date')
            this.response = new Date().toDateString();
        else
            this.response = 'Unknown command: ' + event.command;
    };
    TerminalDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/terminal/terminaldemo.html',
            directives: [terminal_1.Terminal, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TerminalDemo);
    return TerminalDemo;
}());
exports.TerminalDemo = TerminalDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdGVybWluYWwvdGVybWluYWxkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0QsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFBQTtJQVVBLENBQUM7SUFORyxnQ0FBUyxHQUFULFVBQVUsS0FBSztRQUNYLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM5QyxJQUFJO1lBQ0EsSUFBSSxDQUFDLFFBQVEsR0FBRyxtQkFBbUIsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzVELENBQUM7SUFiTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsMENBQTBDO1lBQ3ZELFVBQVUsRUFBRSxDQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxtQkFBUSxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDNUUsQ0FBQzs7b0JBQUE7SUFXRixtQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBVlksb0JBQVksZUFVeEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL3Rlcm1pbmFsL3Rlcm1pbmFsZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7VGVybWluYWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGVybWluYWwvdGVybWluYWwnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby90ZXJtaW5hbC90ZXJtaW5hbGRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1Rlcm1pbmFsLFRhYlZpZXcsVGFiUGFuZWwsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBUZXJtaW5hbERlbW8ge1xuICAgIFxuICAgIHJlc3BvbnNlOiBzdHJpbmc7XG5cbiAgICBvbkNvbW1hbmQoZXZlbnQpIHtcbiAgICAgICAgaWYoZXZlbnQuY29tbWFuZCA9PT0gJ2RhdGUnKVxuICAgICAgICAgICAgdGhpcy5yZXNwb25zZSA9IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSAnVW5rbm93biBjb21tYW5kOiAnICsgZXZlbnQuY29tbWFuZDtcbiAgICB9XG59Il19
