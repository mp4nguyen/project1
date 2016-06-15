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
var domhandler_1 = require('../dom/domhandler');
var Terminal = (function () {
    function Terminal(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.responseChange = new core_1.EventEmitter();
        this.handler = new core_1.EventEmitter();
        this.commands = [];
    }
    Terminal.prototype.ngAfterViewInit = function () {
        this.container = this.domHandler.find(this.el.nativeElement, '.ui-terminal')[0];
    };
    Terminal.prototype.ngAfterViewChecked = function () {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    };
    Object.defineProperty(Terminal.prototype, "response", {
        set: function (value) {
            if (value) {
                this.commands.push({ text: this.command, response: value });
                this.command = null;
                this.commandProcessed = true;
                this.responseChange.emit(null);
            }
        },
        enumerable: true,
        configurable: true
    });
    Terminal.prototype.handleCommand = function (event, container) {
        if (event.keyCode == 13) {
            this.handler.emit({ originalEvent: event, command: this.command });
        }
    };
    Terminal.prototype.focus = function (element) {
        element.focus();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Terminal.prototype, "welcomeMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Terminal.prototype, "prompt", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Terminal.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Terminal.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Terminal.prototype, "responseChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Terminal.prototype, "handler", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], Terminal.prototype, "response", null);
    Terminal = __decorate([
        core_1.Component({
            selector: 'p-terminal',
            template: "\n        <div [ngClass]=\"'ui-terminal ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"focus(in)\">\n            <div *ngIf=\"welcomeMessage\">{{welcomeMessage}}</div>\n            <div class=\"ui-terminal-content\">\n                <div *ngFor=\"let command of commands\">\n                    <span>{{prompt}}</span>\n                    <span class=\"ui-terminal-command\">{{command.text}}</span>\n                    <div>{{command.response}}</div>\n                </div>\n            </div>\n            <div>\n                <span class=\"ui-terminal-content-prompt\">{{prompt}}</span>\n                <input #in type=\"text\" [(ngModel)]=\"command\" class=\"ui-terminal-input\" autocomplete=\"off\" (keydown)=\"handleCommand($event,container)\" autofocus>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], Terminal);
    return Terminal;
}());
exports.Terminal = Terminal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdGVybWluYWwvdGVybWluYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE0RyxlQUFlLENBQUMsQ0FBQTtBQUM1SCwyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQXNCN0M7SUFzQkksa0JBQW9CLEVBQWMsRUFBVSxVQUFzQjtRQUE5QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVp4RCxtQkFBYyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUV2RCxZQUFPLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRTFELGFBQVEsR0FBVSxFQUFFLENBQUM7SUFRZ0QsQ0FBQztJQUV0RSxrQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQscUNBQWtCLEdBQWxCO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLENBQUM7SUFDTCxDQUFDO0lBR0Qsc0JBQUksOEJBQVE7YUFBWixVQUFhLEtBQWE7WUFDdEIsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBRUQsZ0NBQWEsR0FBYixVQUFjLEtBQUssRUFBQyxTQUFTO1FBQ3pCLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBRUQsd0JBQUssR0FBTCxVQUFNLE9BQU87UUFDVCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQW5ERDtRQUFDLFlBQUssRUFBRTs7b0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7MkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLGFBQU0sRUFBRTs7b0RBQUE7SUFFVDtRQUFDLGFBQU0sRUFBRTs7NkNBQUE7SUF1QlQ7UUFBQyxZQUFLLEVBQUU7Ozs0Q0FBQTtJQXZEWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsNjFCQWVUO1lBQ0QsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztTQUMxQixDQUFDOztnQkFBQTtJQXdERixlQUFDO0FBQUQsQ0F2REEsQUF1REMsSUFBQTtBQXZEWSxnQkFBUSxXQXVEcEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL3Rlcm1pbmFsL3Rlcm1pbmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsQWZ0ZXJWaWV3SW5pdCxBZnRlclZpZXdDaGVja2VkLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsUXVlcnksUXVlcnlMaXN0LEVsZW1lbnRSZWZ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10ZXJtaW5hbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktdGVybWluYWwgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIChjbGljayk9XCJmb2N1cyhpbilcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJ3ZWxjb21lTWVzc2FnZVwiPnt7d2VsY29tZU1lc3NhZ2V9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRlcm1pbmFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjb21tYW5kIG9mIGNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7cHJvbXB0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdGVybWluYWwtY29tbWFuZFwiPnt7Y29tbWFuZC50ZXh0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e3tjb21tYW5kLnJlc3BvbnNlfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRlcm1pbmFsLWNvbnRlbnQtcHJvbXB0XCI+e3twcm9tcHR9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2luIHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJjb21tYW5kXCIgY2xhc3M9XCJ1aS10ZXJtaW5hbC1pbnB1dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIChrZXlkb3duKT1cImhhbmRsZUNvbW1hbmQoJGV2ZW50LGNvbnRhaW5lcilcIiBhdXRvZm9jdXM+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBUZXJtaW5hbCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgICBASW5wdXQoKSB3ZWxjb21lTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcHJvbXB0OiBzdHJpbmc7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBAT3V0cHV0KCkgcmVzcG9uc2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIGhhbmRsZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICBcbiAgICBjb21tYW5kczogYW55W10gPSBbXTtcbiAgICBcbiAgICBjb21tYW5kOiBzdHJpbmc7XG4gICAgXG4gICAgY29udGFpbmVyOiBhbnk7XG4gICAgXG4gICAgY29tbWFuZFByb2Nlc3NlZDogYm9vbGVhbjtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIpIHt9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZG9tSGFuZGxlci5maW5kKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy51aS10ZXJtaW5hbCcpWzBdO1xuICAgIH1cbiAgICBcbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmKHRoaXMuY29tbWFuZFByb2Nlc3NlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5jb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kUHJvY2Vzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgQElucHV0KClcbiAgICBzZXQgcmVzcG9uc2UodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZih2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5wdXNoKHt0ZXh0OiB0aGlzLmNvbW1hbmQsIHJlc3BvbnNlOiB2YWx1ZX0pO1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZFByb2Nlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ29tbWFuZChldmVudCxjb250YWluZXIpIHtcbiAgICAgICAgaWYoZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBjb21tYW5kOiB0aGlzLmNvbW1hbmR9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmb2N1cyhlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgXG59Il19
