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
var common_1 = require('angular2/common');
var router_deprecated_1 = require('angular2/router-deprecated');
var TieredMenuSub = (function () {
    function TieredMenuSub(domHandler, router, location) {
        this.domHandler = domHandler;
        this.router = router;
        this.location = location;
    }
    TieredMenuSub.prototype.onItemMouseEnter = function (event, item) {
        this.activeItem = item;
        this.activeLink = item.children[0];
        var nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            var sublist = nextElement.children[0];
            sublist.style.zIndex = ++domhandler_1.DomHandler.zindex;
            sublist.style.top = '0px';
            sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
        }
    };
    TieredMenuSub.prototype.onItemMouseLeave = function (event, link) {
        this.activeItem = null;
        this.activeLink = null;
    };
    TieredMenuSub.prototype.itemClick = function (event, item) {
        if (item.command) {
            if (!item.eventEmitter) {
                item.eventEmitter = new core_1.EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            item.eventEmitter.emit(event);
        }
        if (!item.url) {
            event.preventDefault();
        }
    };
    TieredMenuSub.prototype.listClick = function (event) {
        this.activeItem = null;
        this.activeLink = null;
    };
    TieredMenuSub.prototype.getItemUrl = function (item) {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TieredMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TieredMenuSub.prototype, "root", void 0);
    TieredMenuSub = __decorate([
        core_1.Component({
            selector: 'p-tieredMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}\" class=\"ui-menu-list\"\n            (click)=\"listClick($event)\">\n            <template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li #item [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}\"\n                    (mouseenter)=\"onItemMouseEnter($event, item)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n                    <a #link [href]=\"getItemUrl(child)\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==activeLink}\" (click)=\"itemClick($event, child)\">\n                        <span class=\"ui-submenu-icon fa fa-fw fa-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-tieredMenuSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\"></p-tieredMenuSub>\n                </li>\n            </template>\n        </ul>\n    ",
            directives: [TieredMenuSub],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [domhandler_1.DomHandler, (typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _b) || Object])
    ], TieredMenuSub);
    return TieredMenuSub;
    var _a, _b;
}());
exports.TieredMenuSub = TieredMenuSub;
var TieredMenu = (function () {
    function TieredMenu(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
    }
    TieredMenu.prototype.ngAfterViewInit = function () {
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
    TieredMenu.prototype.toggle = function (event) {
        if (this.container.offsetParent)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    };
    TieredMenu.prototype.show = function (event) {
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.target);
        this.domHandler.fadeIn(this.container, 250);
    };
    TieredMenu.prototype.hide = function () {
        this.container.style.display = 'none';
    };
    TieredMenu.prototype.unsubscribe = function (item) {
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
    TieredMenu.prototype.ngOnDestroy = function () {
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
    ], TieredMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TieredMenu.prototype, "popup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TieredMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TieredMenu.prototype, "styleClass", void 0);
    TieredMenu = __decorate([
        core_1.Component({
            selector: 'p-tieredMenu',
            template: "\n        <div [ngClass]=\"{'ui-tieredmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-menu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-tieredMenuSub [item]=\"model\" root=\"root\"></p-tieredMenuSub>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler],
            directives: [TieredMenuSub]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], TieredMenu);
    return TieredMenu;
}());
exports.TieredMenu = TieredMenu;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdGllcmVkbWVudS90aWVyZWRtZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBOEYsZUFBZSxDQUFDLENBQUE7QUFDOUcsMkJBQXlCLG1CQUFtQixDQUFDLENBQUE7QUFFN0MsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMsa0NBQXFCLDRCQUE0QixDQUFDLENBQUE7QUF1QmxEO0lBTUksdUJBQW9CLFVBQXNCLEVBQVUsTUFBYyxFQUFVLFFBQWtCO1FBQTFFLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7SUFNbEcsd0NBQWdCLEdBQWhCLFVBQWlCLEtBQUssRUFBRSxJQUFJO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLFdBQVcsR0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZELEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsdUJBQVUsQ0FBQyxNQUFNLENBQUM7WUFFM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDaEYsQ0FBQztJQUNM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QUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBQ0ksRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNqQyxDQUFDO1FBRUQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixHQUFHLENBQUEsQ0FBYSxVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVLENBQUM7Z0JBQXZCLElBQUksSUFBSSxTQUFBO2dCQUNSLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUI7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQXRFRDtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7a0RBQUE7SUFuQlo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLDRUQUtUO1lBQ0QsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztZQUN2QixVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDOUIsQ0FBQzs7a0JBQUE7SUEyRUYsaUJBQUM7QUFBRCxDQTFFQSxBQTBFQyxJQUFBO0FBMUVZLGtCQUFVLGFBMEV0QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdGllcmVkbWVudS90aWVyZWRtZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsUmVuZGVyZXIsRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAnLi4vZG9tL2RvbWhhbmRsZXInO1xuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAnLi4vYXBpL21lbnVtb2RlbCc7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRpZXJlZE1lbnVTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1yZXNldCc6cm9vdCwgJ3VpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWNsZWFyZml4IHVpLW1lbnUtY2hpbGQgdWktc2hhZG93Jzohcm9vdH1cIiBjbGFzcz1cInVpLW1lbnUtbGlzdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwibGlzdENsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgW25nRm9yT2ZdPVwiKHJvb3QgPyBpdGVtIDogaXRlbS5pdGVtcylcIj5cbiAgICAgICAgICAgICAgICA8bGkgI2l0ZW0gW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbSB1aS13aWRnZXQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktbWVudS1wYXJlbnQnOmNoaWxkLml0ZW1zLCd1aS1tZW51aXRlbS1hY3RpdmUnOml0ZW09PWFjdGl2ZUl0ZW19XCJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25JdGVtTW91c2VFbnRlcigkZXZlbnQsIGl0ZW0pXCIgKG1vdXNlbGVhdmUpPVwib25JdGVtTW91c2VMZWF2ZSgkZXZlbnQsIGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhICNsaW5rIFtocmVmXT1cImdldEl0ZW1VcmwoY2hpbGQpXCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGxcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWhvdmVyJzpsaW5rPT1hY3RpdmVMaW5rfVwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjaGlsZClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3VibWVudS1pY29uIGZhIGZhLWZ3IGZhLWNhcmV0LXJpZ2h0XCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvbiBmYSBmYS1md1wiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NoaWxkLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPHAtdGllcmVkTWVudVN1YiBjbGFzcz1cInVpLXN1Ym1lbnVcIiBbaXRlbV09XCJjaGlsZFwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3AtdGllcmVkTWVudVN1Yj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC91bD5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtUaWVyZWRNZW51U3ViXSxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBUaWVyZWRNZW51U3ViIHtcblxuICAgIEBJbnB1dCgpIGl0ZW06IE1lbnVJdGVtO1xuICAgIFxuICAgIEBJbnB1dCgpIHJvb3Q6IGJvb2xlYW47XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge31cbiAgICBcbiAgICBhY3RpdmVJdGVtOiBhbnk7XG4gICAgXG4gICAgYWN0aXZlTGluazogYW55O1xuICAgICAgICAgICAgXG4gICAgb25JdGVtTW91c2VFbnRlcihldmVudCwgaXRlbSkge1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpdGVtO1xuICAgICAgICB0aGlzLmFjdGl2ZUxpbmsgPSBpdGVtLmNoaWxkcmVuWzBdO1xuICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSAgaXRlbS5jaGlsZHJlblswXS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGlmKG5leHRFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgc3VibGlzdCA9IG5leHRFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgc3VibGlzdC5zdHlsZS56SW5kZXggPSArK0RvbUhhbmRsZXIuemluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gdGhpcy5kb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uSXRlbU1vdXNlTGVhdmUoZXZlbnQsIGxpbmspIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5hY3RpdmVMaW5rID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgaXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBNZW51SXRlbSnCoHtcbiAgICAgICAgaWYoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpZighaXRlbS5ldmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICBpdGVtLmV2ZW50RW1pdHRlci5zdWJzY3JpYmUoaXRlbS5jb21tYW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGxpc3RDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLmFjdGl2ZUxpbmsgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBnZXRJdGVtVXJsKGl0ZW06IE1lbnVJdGVtKTogc3RyaW5nIHtcbiAgICAgICAgaWYoaXRlbS51cmwpIHtcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoaXRlbS51cmwpKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2F0aW9uLnByZXBhcmVFeHRlcm5hbFVybCh0aGlzLnJvdXRlci5nZW5lcmF0ZShpdGVtLnVybCkudG9MaW5rVXJsKCkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnVybDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnIyc7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRpZXJlZE1lbnUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS10aWVyZWRtZW51IHVpLW1lbnUgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWNsZWFyZml4Jzp0cnVlLCd1aS1tZW51LWR5bmFtaWMgdWktc2hhZG93Jzpwb3B1cH1cIiBcbiAgICAgICAgICAgIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIj5cbiAgICAgICAgICAgIDxwLXRpZXJlZE1lbnVTdWIgW2l0ZW1dPVwibW9kZWxcIiByb290PVwicm9vdFwiPjwvcC10aWVyZWRNZW51U3ViPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdLFxuICAgIGRpcmVjdGl2ZXM6IFtUaWVyZWRNZW51U3ViXVxufSlcbmV4cG9ydCBjbGFzcyBUaWVyZWRNZW51IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBwb3B1cDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgY29udGFpbmVyOiBhbnk7XG4gICAgXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG4gICAgXG4gICAgcHJldmVudERvY3VtZW50RGVmYXVsdDogYW55O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgZG9tSGFuZGxlcjogRG9tSGFuZGxlciwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5wb3B1cCkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbkdsb2JhbCgnYm9keScsICdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZShldmVudCkge1xuICAgICAgICBpZih0aGlzLmNvbnRhaW5lci5vZmZzZXRQYXJlbnQpXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zaG93KGV2ZW50KTtcbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBzaG93KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbih0aGlzLmNvbnRhaW5lciwgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgdGhpcy5kb21IYW5kbGVyLmZhZGVJbih0aGlzLmNvbnRhaW5lciwgMjUwKTtcbiAgICB9XG4gICAgXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICB1bnN1YnNjcmliZShpdGVtOiBhbnkpIHtcbiAgICAgICAgaWYoaXRlbS5ldmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgIGl0ZW0uZXZlbnRFbWl0dGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgY2hpbGRJdGVtIG9mIGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKGNoaWxkSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZih0aGlzLnBvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=
