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
var splitbuttonitem_1 = require('./splitbuttonitem');
var domhandler_1 = require('../dom/domhandler');
var router_deprecated_1 = require('angular2/router-deprecated');
var common_1 = require('angular2/common');
var SplitButton = (function () {
    function SplitButton(el, domHandler, renderer, router, location) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.router = router;
        this.location = location;
        this.iconPos = 'left';
        this.onClick = new core_1.EventEmitter();
        this.menuVisible = false;
    }
    SplitButton.prototype.ngOnInit = function () {
        var _this = this;
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            _this.menuVisible = false;
        });
    };
    SplitButton.prototype.onDefaultButtonClick = function (event) {
        this.onClick.emit(event);
    };
    SplitButton.prototype.onDropdownClick = function (event, menu, container) {
        this.menuVisible = !this.menuVisible;
        this.domHandler.relativePosition(menu, container);
        this.domHandler.fadeIn(menu, 25);
        event.stopPropagation();
    };
    SplitButton.prototype.onItemClick = function (event, item) {
        item.onClick.emit(event);
        this.hoveredItem = null;
        if (!item.url) {
            event.preventDefault();
        }
    };
    SplitButton.prototype.getItemUrl = function (item) {
        if (item.url) {
            if (Array.isArray(item.url))
                return this.location.prepareExternalUrl(this.router.generate(item.url).toLinkUrl());
            else
                return item.url;
        }
        else {
            return '#';
        }
    };
    SplitButton.prototype.ngOnDestroy = function () {
        this.documentClickListener();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "icon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "iconPos", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "label", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SplitButton.prototype, "onClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SplitButton.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SplitButton.prototype, "menuStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitButton.prototype, "menuStyleClass", void 0);
    __decorate([
        core_1.ContentChildren(splitbuttonitem_1.SplitButtonItem), 
        __metadata('design:type', core_1.QueryList)
    ], SplitButton.prototype, "items", void 0);
    SplitButton = __decorate([
        core_1.Component({
            selector: 'p-splitButton',
            template: "\n        <div #container [ngClass]=\"'ui-splitbutton ui-buttonset ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn type=\"button\" class=\"ui-button ui-widget ui-state-default ui-corner-left\"\n                [ngClass]=\"{'ui-button-text-only':(!icon&&label),'ui-button-icon-only':(icon&&!label),\n                'ui-button-text-icon-left':(icon&&label&&iconPos=='left'),'ui-button-text-icon-right':(icon&&label&&iconPos=='right'),\n                'ui-state-hover':hoverDefaultBtn,'ui-state-focus':focusDefaultBtn,'ui-state-active':activeDefaultBtn}\"\n                (mouseenter)=\"hoverDefaultBtn=true\" (mouseleave)=\"hoverDefaultBtn=false\"  (focus)=\"focusDefaultBtn=true\" (blur)=\"focusDefaultBtn=false\"\n                (mousedown)=\"activeDefaultBtn=true\" (mouseup)=\"activeDefaultBtn=false\" (click)=\"onDefaultButtonClick($event)\">\n                <span [ngClass]=\"'ui-button-icon-left ui-c fa fa-fw'\" [class]=\"icon\"></span>\n                <span class=\"ui-button-text ui-c\">{{label}}</span>\n            </button>\n            <button class=\"ui-splitbutton-menubutton ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right\" type=\"button\"\n                [ngClass]=\"{'ui-state-hover':hoverDropdown,'ui-state-focus':focusDropdown,'ui-state-active':activeDropdown}\"\n                (mouseenter)=\"hoverDropdown=true\" (mouseleave)=\"hoverDropdown=false\" (focus)=\"focusDropdown=true\" (blur)=\"focusDropdown=false\"\n                (mousedown)=\"activeDropdown=true\" (mouseup)=\"activeDropdown=false\" (click)=\"onDropdownClick($event,menu,container)\">\n                <span class=\"ui-button-icon-left ui-c fa fa-fw fa-caret-down\"></span>\n                <span class=\"ui-button-text ui-c\">ui-button</span>\n            </button>\n            <div #menu [ngClass]=\"'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'\" [style.display]=\"menuVisible ? 'block' : 'none'\"\n                    [ngStyle]=\"menuStyle\" [class]=\"menuStyleClass\">\n                <ul class=\"ui-menu-list ui-helper-reset\">\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\" role=\"menuitem\" *ngFor=\"let item of items\" [ngClass]=\"{'ui-state-hover':(hoveredItem==item)}\"\n                        (mouseenter)=\"hoveredItem=item\" (mouseleave)=\"hoveredItem=null\">\n                        <a [href]=\"getItemUrl(item)\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"onItemClick($event,item)\">\n                            <span [ngClass]=\"'ui-menuitem-icon fa fa-fw'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, (typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _b) || Object])
    ], SplitButton);
    return SplitButton;
    var _a, _b;
}());
exports.SplitButton = SplitButton;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvc3BsaXRidXR0b24vc3BsaXRidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFpSCxlQUFlLENBQUMsQ0FBQTtBQUNqSSxnQ0FBOEIsbUJBQW1CLENBQUMsQ0FBQTtBQUNsRCwyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQUM3QyxrQ0FBbUQsNEJBQTRCLENBQUMsQ0FBQTtBQUNoRix1QkFBdUIsaUJBQWlCLENBQUMsQ0FBQTtBQXVDekM7SUFzQ0kscUJBQW9CLEVBQWMsRUFBVSxVQUFzQixFQUFVLFFBQWtCLEVBQVUsTUFBYyxFQUFVLFFBQWtCO1FBQTlILE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBbEN6SSxZQUFPLEdBQVcsTUFBTSxDQUFDO1FBSXhCLFlBQU8sR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUEwQmxELGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBSWdILENBQUM7SUFFdEosOEJBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUU7WUFDckUsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMENBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHFDQUFlLEdBQWYsVUFBZ0IsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGlDQUFXLEdBQVgsVUFBWSxLQUFLLEVBQUMsSUFBcUI7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFeEIsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxJQUFxQjtRQUM1QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN4RixJQUFJO2dCQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDO0lBQ0wsQ0FBQztJQUVELGlDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBOUVEO1FBQUMsWUFBSyxFQUFFOzs2Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQUVSO1FBQUMsYUFBTSxFQUFFOztnREFBQTtJQUVUO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzttREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzt1REFBQTtJQUVSO1FBQUMsc0JBQWUsQ0FBQyxpQ0FBZSxDQUFDOzs4Q0FBQTtJQXZEckM7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLHEwRkErQlQ7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1lBQ3ZCLFVBQVUsRUFBRSxDQUFDLHFDQUFpQixDQUFDO1NBQ2xDLENBQUM7O21CQUFBO0lBa0ZGLGtCQUFDOztBQUFELENBakZBLEFBaUZDLElBQUE7QUFqRlksbUJBQVcsY0FpRnZCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9zcGxpdGJ1dHRvbi9zcGxpdGJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LEVsZW1lbnRSZWYsT25Jbml0LE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZHJlbixRdWVyeUxpc3QsUmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTcGxpdEJ1dHRvbkl0ZW19IGZyb20gJy4vc3BsaXRidXR0b25pdGVtJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAnLi4vZG9tL2RvbWhhbmRsZXInO1xuaW1wb3J0IHtSb3V0ZXIsUm91dGVDb25maWcsUk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zcGxpdEJ1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cIid1aS1zcGxpdGJ1dHRvbiB1aS1idXR0b25zZXQgdWktd2lkZ2V0J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxidXR0b24gI2RlZmF1bHRidG4gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1sZWZ0XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWJ1dHRvbi10ZXh0LW9ubHknOighaWNvbiYmbGFiZWwpLCd1aS1idXR0b24taWNvbi1vbmx5JzooaWNvbiYmIWxhYmVsKSxcbiAgICAgICAgICAgICAgICAndWktYnV0dG9uLXRleHQtaWNvbi1sZWZ0JzooaWNvbiYmbGFiZWwmJmljb25Qb3M9PSdsZWZ0JyksJ3VpLWJ1dHRvbi10ZXh0LWljb24tcmlnaHQnOihpY29uJiZsYWJlbCYmaWNvblBvcz09J3JpZ2h0JyksXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWhvdmVyJzpob3ZlckRlZmF1bHRCdG4sJ3VpLXN0YXRlLWZvY3VzJzpmb2N1c0RlZmF1bHRCdG4sJ3VpLXN0YXRlLWFjdGl2ZSc6YWN0aXZlRGVmYXVsdEJ0bn1cIlxuICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cImhvdmVyRGVmYXVsdEJ0bj10cnVlXCIgKG1vdXNlbGVhdmUpPVwiaG92ZXJEZWZhdWx0QnRuPWZhbHNlXCIgIChmb2N1cyk9XCJmb2N1c0RlZmF1bHRCdG49dHJ1ZVwiIChibHVyKT1cImZvY3VzRGVmYXVsdEJ0bj1mYWxzZVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJhY3RpdmVEZWZhdWx0QnRuPXRydWVcIiAobW91c2V1cCk9XCJhY3RpdmVEZWZhdWx0QnRuPWZhbHNlXCIgKGNsaWNrKT1cIm9uRGVmYXVsdEJ1dHRvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCIndWktYnV0dG9uLWljb24tbGVmdCB1aS1jIGZhIGZhLWZ3J1wiIFtjbGFzc109XCJpY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYnV0dG9uLXRleHQgdWktY1wiPnt7bGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInVpLXNwbGl0YnV0dG9uLW1lbnVidXR0b24gdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWJ1dHRvbi1pY29uLW9ubHkgdWktY29ybmVyLXJpZ2h0XCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1ob3Zlcic6aG92ZXJEcm9wZG93biwndWktc3RhdGUtZm9jdXMnOmZvY3VzRHJvcGRvd24sJ3VpLXN0YXRlLWFjdGl2ZSc6YWN0aXZlRHJvcGRvd259XCJcbiAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJob3ZlckRyb3Bkb3duPXRydWVcIiAobW91c2VsZWF2ZSk9XCJob3ZlckRyb3Bkb3duPWZhbHNlXCIgKGZvY3VzKT1cImZvY3VzRHJvcGRvd249dHJ1ZVwiIChibHVyKT1cImZvY3VzRHJvcGRvd249ZmFsc2VcIlxuICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwiYWN0aXZlRHJvcGRvd249dHJ1ZVwiIChtb3VzZXVwKT1cImFjdGl2ZURyb3Bkb3duPWZhbHNlXCIgKGNsaWNrKT1cIm9uRHJvcGRvd25DbGljaygkZXZlbnQsbWVudSxjb250YWluZXIpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1idXR0b24taWNvbi1sZWZ0IHVpLWMgZmEgZmEtZncgZmEtY2FyZXQtZG93blwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWJ1dHRvbi10ZXh0IHVpLWNcIj51aS1idXR0b248L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgI21lbnUgW25nQ2xhc3NdPVwiJ3VpLW1lbnUgdWktbWVudS1keW5hbWljIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHVpLWhlbHBlci1jbGVhcmZpeCB1aS1zaGFkb3cnXCIgW3N0eWxlLmRpc3BsYXldPVwibWVudVZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwibWVudVN0eWxlXCIgW2NsYXNzXT1cIm1lbnVTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktbWVudS1saXN0IHVpLWhlbHBlci1yZXNldFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1tZW51aXRlbSB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiIHJvbGU9XCJtZW51aXRlbVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1ob3Zlcic6KGhvdmVyZWRJdGVtPT1pdGVtKX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwiaG92ZXJlZEl0ZW09aXRlbVwiIChtb3VzZWxlYXZlKT1cImhvdmVyZWRJdGVtPW51bGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIFtocmVmXT1cImdldEl0ZW1VcmwoaXRlbSlcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCIndWktbWVudWl0ZW0taWNvbiBmYSBmYS1mdydcIiBbY2xhc3NdPVwiaXRlbS5pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdLFxuICAgIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRCdXR0b24gaW1wbGVtZW50cyBPbkluaXQsT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGljb25Qb3M6IHN0cmluZyA9ICdsZWZ0JztcbiAgICAgICAgXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcbiAgICBcbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgbWVudVN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgbWVudVN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBAQ29udGVudENoaWxkcmVuKFNwbGl0QnV0dG9uSXRlbSkgaXRlbXMgOiBRdWVyeUxpc3Q8U3BsaXRCdXR0b25JdGVtPjtcbiAgICBcbiAgICBwcml2YXRlIGhvdmVyRGVmYXVsdEJ0bjogYm9vbGVhbjtcbiAgICBcbiAgICBwcml2YXRlIGZvY3VzRGVmYXVsdEJ0bjogYm9vbGVhbjtcbiAgICBcbiAgICBwcml2YXRlIGFjdGl2ZURlZmF1bHRCdG46IGJvb2xlYW47XG4gICAgXG4gICAgcHJpdmF0ZSBob3ZlckRyb3Bkb3duOiBib29sZWFuO1xuICAgIFxuICAgIHByaXZhdGUgZm9jdXNEcm9wZG93bjogYm9vbGVhbjtcbiAgICBcbiAgICBwcml2YXRlIGFjdGl2ZURyb3Bkb3duOiBib29sZWFuO1xuICAgIFxuICAgIHByaXZhdGUgaG92ZXJlZEl0ZW06IGFueTtcbiAgICBcbiAgICBwcml2YXRlIG1lbnVWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgcHJpdmF0ZSBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgZG9tSGFuZGxlcjogRG9tSGFuZGxlciwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uKSB7fVxuICAgIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdib2R5JywgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tZW51VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgb25EZWZhdWx0QnV0dG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBvbkRyb3Bkb3duQ2xpY2soZXZlbnQsIG1lbnUsIGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLm1lbnVWaXNpYmxlPSAhdGhpcy5tZW51VmlzaWJsZTtcbiAgICAgICAgdGhpcy5kb21IYW5kbGVyLnJlbGF0aXZlUG9zaXRpb24obWVudSwgY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5kb21IYW5kbGVyLmZhZGVJbihtZW51LDI1KTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIG9uSXRlbUNsaWNrKGV2ZW50LGl0ZW06IFNwbGl0QnV0dG9uSXRlbSkge1xuICAgICAgICBpdGVtLm9uQ2xpY2suZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMuaG92ZXJlZEl0ZW0gPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9ICAgICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBnZXRJdGVtVXJsKGl0ZW06IFNwbGl0QnV0dG9uSXRlbSk6IHN0cmluZyB7XG4gICAgICAgIGlmKGl0ZW0udXJsKSB7XG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KGl0ZW0udXJsKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5yb3V0ZXIuZ2VuZXJhdGUoaXRlbS51cmwpLnRvTGlua1VybCgpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS51cmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyMnO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgIH1cbn0iXX0=
