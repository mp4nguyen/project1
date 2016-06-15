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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var domhandler_1 = require('../dom/domhandler');
var common_1 = require('angular2/common');
var router_deprecated_1 = require('angular2/router-deprecated');
var SlideMenuSub = (function () {
    function SlideMenuSub(slideMenu, router, location) {
        this.slideMenu = slideMenu;
        this.router = router;
        this.location = location;
        this.backLabel = 'Back';
        this.effectDuration = '1s';
        this.easing = 'ease-out';
    }
    SlideMenuSub.prototype.itemClick = function (event, item, listitem) {
        this.activeItem = listitem;
        if (item.command) {
            if (!item.eventEmitter && item.command) {
                item.eventEmitter = new core_1.EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            item.eventEmitter.emit(event);
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.items) {
            this.slideMenu.left -= this.slideMenu.menuWidth;
        }
    };
    SlideMenuSub.prototype.getItemUrl = function (item) {
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
    SlideMenuSub.prototype.ngOnDestroy = function () {
        this.hoveredLink = null;
        this.activeItem = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SlideMenuSub.prototype, "root", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenuSub.prototype, "backLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenuSub.prototype, "menuWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideMenuSub.prototype, "effectDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenuSub.prototype, "easing", void 0);
    SlideMenuSub = __decorate([
        core_1.Component({
            selector: 'p-slideMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-helper-reset ui-menu-rootlist':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child':!root}\" class=\"ui-menu-list\"\n            [style.width.px]=\"menuWidth\" [style.left.px]=\"root ? slideMenu.left : slideMenu.menuWidth\" \n            [style.transitionProperty]=\"root ? 'left' : 'none'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\">\n            <template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li #listitem [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':listitem==activeItem}\">\n                    <a #link [href]=\"getItemUrl(child)\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==hoveredLink,'ui-menuitem-link-parent':child.items}\" \n                        (click)=\"itemClick($event, child, listitem)\" (mouseenter)=\"hoveredLink=link\" (mouseleave)=\"hoveredLink=null\">\n                        <span class=\"ui-submenu-icon fa fa-fw fa-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-slideMenuSub class=\"ui-submenu\" [item]=\"child\" [menuWidth]=\"menuWidth\" *ngIf=\"child.items\"></p-slideMenuSub>\n                </li>\n            </template>\n        </ul>\n    ",
            directives: [SlideMenuSub]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return SlideMenu; }))), 
        __metadata('design:paramtypes', [SlideMenu, (typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _b) || Object])
    ], SlideMenuSub);
    return SlideMenuSub;
    var _a, _b;
}());
exports.SlideMenuSub = SlideMenuSub;
var SlideMenu = (function () {
    function SlideMenu(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.menuWidth = 180;
        this.viewportHeight = 175;
        this.effectDuration = '500ms';
        this.easing = 'ease-out';
        this.backLabel = 'Back';
        this.left = 0;
    }
    SlideMenu.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.el.nativeElement.children[0];
        if (this.popup) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
                if (!_this.preventDocumentDefault) {
                    _this.hide();
                }
                _this.preventDocumentDefault = false;
            });
        }
    };
    SlideMenu.prototype.toggle = function (event) {
        if (this.container.offsetParent)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    };
    SlideMenu.prototype.show = function (event) {
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.target);
        this.domHandler.fadeIn(this.container, 250);
    };
    SlideMenu.prototype.hide = function () {
        this.container.style.display = 'none';
    };
    SlideMenu.prototype.unsubscribe = function (item) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        if (item.items) {
            for (var _i = 0, _a = item.items; _i < _a.length; _i++) {
                var childItem = _a[_i];
                this.unsubscribe(childItem);
            }
        }
    };
    SlideMenu.prototype.onClick = function (event) {
        this.preventDocumentDefault = true;
    };
    SlideMenu.prototype.goBack = function () {
        this.left += this.menuWidth;
    };
    SlideMenu.prototype.ngOnDestroy = function () {
        if (this.popup) {
            this.documentClickListener();
        }
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                this.unsubscribe(item);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SlideMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SlideMenu.prototype, "popup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenu.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SlideMenu.prototype, "menuWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SlideMenu.prototype, "viewportHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideMenu.prototype, "effectDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenu.prototype, "easing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SlideMenu.prototype, "backLabel", void 0);
    SlideMenu = __decorate([
        core_1.Component({
            selector: 'p-slideMenu',
            template: "\n        <div [ngClass]=\"{'ui-menu ui-slidemenu ui-widget ui-widget-content ui-corner-all':true,'ui-menu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onClick($event)\">\n            <div class=\"ui-slidemenu-wrapper\" [style.height.px]=\"viewportHeight\">\n                <div class=\"ui-slidemenu-content\" [style.height.px]=\"viewportHeight - 30\">\n                    <p-slideMenuSub [item]=\"model\" root=\"root\" [menuWidth]=\"menuWidth\" [effectDuration]=\"effectDuration\" [easing]=\"easing\"></p-slideMenuSub>\n                </div>\n                <div class=\"ui-slidemenu-backward ui-widget-header ui-corner-all\" [style.display]=\"left ? 'block' : 'none'\" (click)=\"goBack()\">\n                    <span class=\"fa fa-fw fa-caret-left\"></span>{{backLabel}}\n                </div>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler],
            directives: [SlideMenuSub]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], SlideMenu);
    return SlideMenu;
}());
exports.SlideMenu = SlideMenu;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvc2xpZGVtZW51L3NsaWRlbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBQWdILGVBQWUsQ0FBQyxDQUFBO0FBQ2hJLDJCQUF5QixtQkFBbUIsQ0FBQyxDQUFBO0FBRTdDLHVCQUF1QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pDLGtDQUFxQiw0QkFBNEIsQ0FBQyxDQUFBO0FBdUJsRDtJQWNJLHNCQUF5RCxTQUFvQixFQUFVLE1BQWMsRUFBVSxRQUFrQjtRQUF4RSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFSeEgsY0FBUyxHQUFXLE1BQU0sQ0FBQztRQUkzQixtQkFBYyxHQUFRLElBQUksQ0FBQztRQUUzQixXQUFNLEdBQVcsVUFBVSxDQUFDO0lBRStGLENBQUM7SUFNckksZ0NBQVMsR0FBVCxVQUFVLEtBQUssRUFBRSxJQUFjLEVBQUUsUUFBYTtRQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUUzQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLENBQUM7WUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNYLEtBQUssQ0FB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dS9zbGlkZW1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxSZW5kZXJlcixFdmVudEVtaXR0ZXIsSW5qZWN0LGZvcndhcmRSZWZ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICcuLi9hcGkvbWVudW1vZGVsJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2xpZGVNZW51U3ViJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItcmVzZXQgdWktbWVudS1yb290bGlzdCc6cm9vdCwgJ3VpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWNsZWFyZml4IHVpLW1lbnUtY2hpbGQnOiFyb290fVwiIGNsYXNzPVwidWktbWVudS1saXN0XCJcbiAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJtZW51V2lkdGhcIiBbc3R5bGUubGVmdC5weF09XCJyb290ID8gc2xpZGVNZW51LmxlZnQgOiBzbGlkZU1lbnUubWVudVdpZHRoXCIgXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvblByb3BlcnR5XT1cInJvb3QgPyAnbGVmdCcgOiAnbm9uZSdcIiBbc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uXT1cImVmZmVjdER1cmF0aW9uXCIgW3N0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbl09XCJlYXNpbmdcIj5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgW25nRm9yT2ZdPVwiKHJvb3QgPyBpdGVtIDogaXRlbS5pdGVtcylcIj5cbiAgICAgICAgICAgICAgICA8bGkgI2xpc3RpdGVtIFtuZ0NsYXNzXT1cInsndWktbWVudWl0ZW0gdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLW1lbnUtcGFyZW50JzpjaGlsZC5pdGVtcywndWktbWVudWl0ZW0tYWN0aXZlJzpsaXN0aXRlbT09YWN0aXZlSXRlbX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgI2xpbmsgW2hyZWZdPVwiZ2V0SXRlbVVybChjaGlsZClcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtaG92ZXInOmxpbms9PWhvdmVyZWRMaW5rLCd1aS1tZW51aXRlbS1saW5rLXBhcmVudCc6Y2hpbGQuaXRlbXN9XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgY2hpbGQsIGxpc3RpdGVtKVwiIChtb3VzZWVudGVyKT1cImhvdmVyZWRMaW5rPWxpbmtcIiAobW91c2VsZWF2ZSk9XCJob3ZlcmVkTGluaz1udWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXN1Ym1lbnUtaWNvbiBmYSBmYS1mdyBmYS1jYXJldC1yaWdodFwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb24gZmEgZmEtZndcIiAqbmdJZj1cImNoaWxkLmljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxwLXNsaWRlTWVudVN1YiBjbGFzcz1cInVpLXN1Ym1lbnVcIiBbaXRlbV09XCJjaGlsZFwiIFttZW51V2lkdGhdPVwibWVudVdpZHRoXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvcC1zbGlkZU1lbnVTdWI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvdWw+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbU2xpZGVNZW51U3ViXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZU1lbnVTdWIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaXRlbTogTWVudUl0ZW07XG4gICAgXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBiYWNrTGFiZWw6IHN0cmluZyA9ICdCYWNrJztcbiAgICBcbiAgICBASW5wdXQoKSBtZW51V2lkdGg6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBlZmZlY3REdXJhdGlvbjogYW55ID0gJzFzJztcbiAgICAgICAgXG4gICAgQElucHV0KCkgZWFzaW5nOiBzdHJpbmcgPSAnZWFzZS1vdXQnO1xuICAgICAgICBcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gU2xpZGVNZW51KSkgcHJpdmF0ZSBzbGlkZU1lbnU6IFNsaWRlTWVudSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHt9XG4gICAgXG4gICAgYWN0aXZlSXRlbTogYW55O1xuICAgICAgICBcbiAgICBob3ZlcmVkTGluazogYW55O1xuICAgICAgICAgICAgICAgIFxuICAgIGl0ZW1DbGljayhldmVudCwgaXRlbTogTWVudUl0ZW0sIGxpc3RpdGVtOiBhbnkpwqB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGxpc3RpdGVtO1xuICAgICAgICBcbiAgICAgICAgaWYoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpZighaXRlbS5ldmVudEVtaXR0ZXIgJiYgaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIuc3Vic2NyaWJlKGl0ZW0uY29tbWFuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGl0ZW0uZXZlbnRFbWl0dGVyLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZighaXRlbS51cmwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVNZW51LmxlZnQgLT0gdGhpcy5zbGlkZU1lbnUubWVudVdpZHRoO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGdldEl0ZW1VcmwoaXRlbTogTWVudUl0ZW0pOiBzdHJpbmcge1xuICAgICAgICBpZihpdGVtLnVybCkge1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShpdGVtLnVybCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYXRpb24ucHJlcGFyZUV4dGVybmFsVXJsKHRoaXMucm91dGVyLmdlbmVyYXRlKGl0ZW0udXJsKS50b0xpbmtVcmwoKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcjJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ob3ZlcmVkTGluayA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2xpZGVNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktbWVudSB1aS1zbGlkZW1lbnUgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLW1lbnUtZHluYW1pYyB1aS1zaGFkb3cnOnBvcHVwfVwiIFxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1zbGlkZW1lbnUtd3JhcHBlclwiIFtzdHlsZS5oZWlnaHQucHhdPVwidmlld3BvcnRIZWlnaHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktc2xpZGVtZW51LWNvbnRlbnRcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cInZpZXdwb3J0SGVpZ2h0IC0gMzBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAtc2xpZGVNZW51U3ViIFtpdGVtXT1cIm1vZGVsXCIgcm9vdD1cInJvb3RcIiBbbWVudVdpZHRoXT1cIm1lbnVXaWR0aFwiIFtlZmZlY3REdXJhdGlvbl09XCJlZmZlY3REdXJhdGlvblwiIFtlYXNpbmddPVwiZWFzaW5nXCI+PC9wLXNsaWRlTWVudVN1Yj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktc2xpZGVtZW51LWJhY2t3YXJkIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbFwiIFtzdHlsZS5kaXNwbGF5XT1cImxlZnQgPyAnYmxvY2snIDogJ25vbmUnXCIgKGNsaWNrKT1cImdvQmFjaygpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtZncgZmEtY2FyZXQtbGVmdFwiPjwvc3Bhbj57e2JhY2tMYWJlbH19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXSxcbiAgICBkaXJlY3RpdmVzOiBbU2xpZGVNZW51U3ViXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZU1lbnUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBtb2RlbDogTWVudUl0ZW1bXTtcblxuICAgIEBJbnB1dCgpIHBvcHVwOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBtZW51V2lkdGg6IG51bWJlciA9IDE4MDtcbiAgICBcbiAgICBASW5wdXQoKSB2aWV3cG9ydEhlaWdodDogbnVtYmVyID0gMTc1O1xuICAgIFxuICAgIEBJbnB1dCgpIGVmZmVjdER1cmF0aW9uOiBhbnkgPSAnNTAwbXMnO1xuICAgICAgICBcbiAgICBASW5wdXQoKSBlYXNpbmc6IHN0cmluZyA9ICdlYXNlLW91dCc7XG4gICAgXG4gICAgQElucHV0KCkgYmFja0xhYmVsOiBzdHJpbmcgPSAnQmFjayc7XG4gICAgXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IGFueTtcbiAgICBcbiAgICBwcml2YXRlIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xuICAgIFxuICAgIHByaXZhdGUgcHJldmVudERvY3VtZW50RGVmYXVsdDogYW55O1xuICAgICAgICBcbiAgICBwdWJsaWMgbGVmdDogbnVtYmVyID0gMDtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnBvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdib2R5JywgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuY29udGFpbmVyLm9mZnNldFBhcmVudClcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnNob3coZXZlbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIHNob3coZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHRoaXMuZG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMuY29udGFpbmVyLCBldmVudC50YXJnZXQpO1xuICAgICAgICB0aGlzLmRvbUhhbmRsZXIuZmFkZUluKHRoaXMuY29udGFpbmVyLCAyNTApO1xuICAgIH1cbiAgICBcbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIHVuc3Vic2NyaWJlKGl0ZW06IGFueSkge1xuICAgICAgICBpZihpdGVtLmV2ZW50RW1pdHRlcikge1xuICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZEl0ZW0gb2YgaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoY2hpbGRJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgdGhpcy5sZWZ0ICs9IHRoaXMubWVudVdpZHRoO1xuICAgIH1cbiAgICAgICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmKHRoaXMucG9wdXApIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==
