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
var Messages = (function () {
    function Messages() {
        this.closable = true;
    }
    Messages.prototype.hasMessages = function () {
        return this.value && this.value.length > 0;
    };
    Messages.prototype.getSeverityClass = function () {
        return this.value[0].severity;
    };
    Messages.prototype.clear = function (event) {
        this.value.splice(0, this.value.length);
        event.preventDefault();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Messages.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Messages.prototype, "closable", void 0);
    Messages = __decorate([
        core_1.Component({
            selector: 'p-messages',
            template: "\n        <div *ngIf=\"hasMessages()\" class=\"ui-messages ui-widget ui-corner-all\" style=\"display:block\"\n                    [ngClass]=\"{'ui-messages-info':(value[0].severity === 'info'),'ui-messages-warn':(value[0].severity === 'warn'),'ui-messages-error':(value[0].severity === 'error')}\">\n            <a href=\"#\" class=\"ui-messages-close\" (click)=\"clear($event)\" *ngIf=\"closable\">\n                <i class=\"fa fa-close\"></i>\n            </a>\n            <span class=\"ui-messages-icon fa fa-2x fa-info-circle\"></span>\n            <ul>\n                <li *ngFor=\"let msg of value\">\n                    <span class=\"ui-messages-summary\">{{msg.summary}}</span>\n                    <span class=\"ui-messages-detail\">{{msg.detail}}</span>\n                </li>\n            </ul>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Messages);
    return Messages;
}());
exports.Messages = Messages;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvbWVzc2FnZXMvbWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErRixlQUFlLENBQUMsQ0FBQTtBQXFCL0c7SUFBQTtRQUlhLGFBQVEsR0FBWSxJQUFJLENBQUM7SUFldEMsQ0FBQztJQWJHLDhCQUFXLEdBQVg7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELG1DQUFnQixHQUFoQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsd0JBQUssR0FBTCxVQUFNLEtBQUs7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQWhCRDtRQUFDLFlBQUssRUFBRTs7MkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUF0Qlo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLGswQkFjVDtTQUNKLENBQUM7O2dCQUFBO0lBb0JGLGVBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLGdCQUFRLFdBbUJwQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvbWVzc2FnZXMvbWVzc2FnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LE9uQ2hhbmdlcyxJbnB1dCxPdXRwdXQsU2ltcGxlQ2hhbmdlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vYXBpL21lc3NhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVzc2FnZXMnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgKm5nSWY9XCJoYXNNZXNzYWdlcygpXCIgY2xhc3M9XCJ1aS1tZXNzYWdlcyB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktbWVzc2FnZXMtaW5mbyc6KHZhbHVlWzBdLnNldmVyaXR5ID09PSAnaW5mbycpLCd1aS1tZXNzYWdlcy13YXJuJzoodmFsdWVbMF0uc2V2ZXJpdHkgPT09ICd3YXJuJyksJ3VpLW1lc3NhZ2VzLWVycm9yJzoodmFsdWVbMF0uc2V2ZXJpdHkgPT09ICdlcnJvcicpfVwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInVpLW1lc3NhZ2VzLWNsb3NlXCIgKGNsaWNrKT1cImNsZWFyKCRldmVudClcIiAqbmdJZj1cImNsb3NhYmxlXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jbG9zZVwiPjwvaT5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVzc2FnZXMtaWNvbiBmYSBmYS0yeCBmYS1pbmZvLWNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG1zZyBvZiB2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lc3NhZ2VzLXN1bW1hcnlcIj57e21zZy5zdW1tYXJ5fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVzc2FnZXMtZGV0YWlsXCI+e3ttc2cuZGV0YWlsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZXMge1xuXG4gICAgQElucHV0KCkgdmFsdWU6IE1lc3NhZ2VbXTtcblxuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGhhc01lc3NhZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0U2V2ZXJpdHlDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVbMF0uc2V2ZXJpdHk7XG4gICAgfVxuXG4gICAgY2xlYXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy52YWx1ZS5zcGxpY2UoMCwgdGhpcy52YWx1ZS5sZW5ndGgpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufSJdfQ==
