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
var MenubarSub = (function () {
    function MenubarSub(domHandler, router, location) {
        this.domHandler = domHandler;
        this.router = router;
        this.location = location;
    }
    MenubarSub.prototype.onItemMouseEnter = function (event, item) {
        this.activeItem = item;
        this.activeLink = item.children[0];
        var nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            var sublist = nextElement.children[0];
            sublist.style.zIndex = ++domhandler_1.DomHandler.zindex;
            if (this.root) {
                sublist.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                sublist.style.left = '0px';
            }
            else {
                sublist.style.top = '0px';
                sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    };
    MenubarSub.prototype.onItemMouseLeave = function (event, link) {
        this.activeItem = null;
        this.activeLink = null;
    };
    MenubarSub.prototype.itemClick = function (event, item) {
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
        this.activeItem = null;
        this.activeLink = null;
    };
    MenubarSub.prototype.getItemUrl = function (item) {
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
    MenubarSub.prototype.listClick = function (event) {
        this.activeItem = null;
        this.activeLink = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenubarSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MenubarSub.prototype, "root", void 0);
    MenubarSub = __decorate([
        core_1.Component({
            selector: 'p-menubarSub',
            template: "\n        <ul [ngClass]=\"{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}\" class=\"ui-menu-list\"\n            (click)=\"listClick($event)\">\n            <template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li #item [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}\"\n                    (mouseenter)=\"onItemMouseEnter($event, item)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n                    <a #link [href]=\"getItemUrl(child)\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==activeLink}\" (click)=\"itemClick($event, child)\">\n                        <span class=\"ui-submenu-icon fa fa-fw\" *ngIf=\"child.items\" [ngClass]=\"{'fa-caret-down':root,'fa-caret-right':!root}\"></span>\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-menubarSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\"></p-menubarSub>\n                </li>\n            </template>\n        </ul>\n    ",
            directives: [MenubarSub],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [domhandler_1.DomHandler, (typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _b) || Object])
    ], MenubarSub);
    return MenubarSub;
    var _a, _b;
}());
exports.MenubarSub = MenubarSub;
var Menubar = (function () {
    function Menubar(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
    }
    Menubar.prototype.unsubscribe = function (item) {
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
    Menubar.prototype.ngOnDestroy = function () {
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
    ], Menubar.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Menubar.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Menubar.prototype, "styleClass", void 0);
    Menubar = __decorate([
        core_1.Component({
            selector: 'p-menubar',
            template: "\n        <div [ngClass]=\"{'ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-menubarSub [item]=\"model\" root=\"root\"></p-menubarSub>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler],
            directives: [MenubarSub]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], Menubar);
    return Menubar;
}());
exports.Menubar = Menubar;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvbWVudWJhci9tZW51YmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBOEYsZUFBZSxDQUFDLENBQUE7QUFDOUcsMkJBQXlCLG1CQUFtQixDQUFDLENBQUE7QUFFN0MsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMsa0NBQXFCLDRCQUE0QixDQUFDLENBQUE7QUF1QmxEO0lBTUksb0JBQW9CLFVBQXNCLEVBQVUsTUFBYyxFQUFVLFFBQWtCO1FBQTFFLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7SUFNbEcscUNBQWdCLEdBQWhCLFVBQWlCLEtBQUssRUFBRSxJQUFJO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLFdBQVcsR0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO1FBQ3ZELEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsdUJBQVUsQ0FBQyxNQUFNLENBQUM7WUFFM0MsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDNUUsT0FBTyxDQUFD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QUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNaLEdBQUcsQ0FBQSxDQUFrQixVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVLENBQUM7Z0JBQTVCLElBQUksU0FBUyxTQUFBO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0I7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELDZCQUFXLEdBQVg7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNaLEdBQUcsQ0FBQSxDQUFhLFVBQVUsRUFBVixLQUFBLElBQUksQ0FBQyxLQUFLLEVBQVYsY0FBVSxFQUFWLElBQVUsQ0FBQztnQkFBdkIsSUFBSSxJQUFJLFNBQUE7Z0JBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQjtRQUNMLENBQUM7SUFDTCxDQUFDO0lBMUJEO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQWpCWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsaVJBS1Q7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1lBQ3ZCLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQztTQUMzQixDQUFDOztlQUFBO0lBK0JGLGNBQUM7QUFBRCxDQTlCQSxBQThCQyxJQUFBO0FBOUJZLGVBQU8sVUE4Qm5CLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9tZW51YmFyL21lbnViYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxSZW5kZXJlcixFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICcuLi9hcGkvbWVudW1vZGVsJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVudWJhclN1YicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHVsIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLXJlc2V0Jzpyb290LCAndWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItY2xlYXJmaXggdWktbWVudS1jaGlsZCB1aS1zaGFkb3cnOiFyb290fVwiIGNsYXNzPVwidWktbWVudS1saXN0XCJcbiAgICAgICAgICAgIChjbGljayk9XCJsaXN0Q2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPHRlbXBsYXRlIG5nRm9yIGxldC1jaGlsZCBbbmdGb3JPZl09XCIocm9vdCA/IGl0ZW0gOiBpdGVtLml0ZW1zKVwiPlxuICAgICAgICAgICAgICAgIDxsaSAjaXRlbSBbbmdDbGFzc109XCJ7J3VpLW1lbnVpdGVtIHVpLXdpZGdldCB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1tZW51LXBhcmVudCc6Y2hpbGQuaXRlbXMsJ3VpLW1lbnVpdGVtLWFjdGl2ZSc6aXRlbT09YWN0aXZlSXRlbX1cIlxuICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKCRldmVudCwgaXRlbSlcIiAobW91c2VsZWF2ZSk9XCJvbkl0ZW1Nb3VzZUxlYXZlKCRldmVudCwgaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgI2xpbmsgW2hyZWZdPVwiZ2V0SXRlbVVybChjaGlsZClcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtaG92ZXInOmxpbms9PWFjdGl2ZUxpbmt9XCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGNoaWxkKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdWJtZW51LWljb24gZmEgZmEtZndcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCIgW25nQ2xhc3NdPVwieydmYS1jYXJldC1kb3duJzpyb290LCdmYS1jYXJldC1yaWdodCc6IXJvb3R9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uIGZhIGZhLWZ3XCIgKm5nSWY9XCJjaGlsZC5pY29uXCIgW25nQ2xhc3NdPVwiY2hpbGQuaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8cC1tZW51YmFyU3ViIGNsYXNzPVwidWktc3VibWVudVwiIFtpdGVtXT1cImNoaWxkXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvcC1tZW51YmFyU3ViPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW01lbnViYXJTdWJdLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG59KVxuZXhwb3J0IGNsYXNzIE1lbnViYXJTdWIge1xuXG4gICAgQElucHV0KCkgaXRlbTogTWVudUl0ZW07XG4gICAgXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uKSB7fVxuICAgIFxuICAgIGFjdGl2ZUl0ZW06IGFueTtcbiAgICBcbiAgICBhY3RpdmVMaW5rOiBhbnk7XG4gICAgICAgICAgICBcbiAgICBvbkl0ZW1Nb3VzZUVudGVyKGV2ZW50LCBpdGVtKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGl0ZW07XG4gICAgICAgIHRoaXMuYWN0aXZlTGluayA9IGl0ZW0uY2hpbGRyZW5bMF07XG4gICAgICAgIGxldCBuZXh0RWxlbWVudCA9ICBpdGVtLmNoaWxkcmVuWzBdLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgaWYobmV4dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBzdWJsaXN0ID0gbmV4dEVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnpJbmRleCA9ICsrRG9tSGFuZGxlci56aW5kZXg7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMucm9vdCkge1xuICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUudG9wID0gdGhpcy5kb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcbiAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSAnMHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSB0aGlzLmRvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aChpdGVtLmNoaWxkcmVuWzBdKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25JdGVtTW91c2VMZWF2ZShldmVudCwgbGluaykge1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLmFjdGl2ZUxpbmsgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBpdGVtQ2xpY2soZXZlbnQsIGl0ZW06IE1lbnVJdGVtKcKge1xuICAgICAgICBpZihpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGlmKCFpdGVtLmV2ZW50RW1pdHRlcikge1xuICAgICAgICAgICAgICAgIGl0ZW0uZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAgICAgICAgIGl0ZW0uZXZlbnRFbWl0dGVyLnN1YnNjcmliZShpdGVtLmNvbW1hbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpdGVtLmV2ZW50RW1pdHRlci5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZighaXRlbS51cmwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlTGluayA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGdldEl0ZW1VcmwoaXRlbTogTWVudUl0ZW0pOiBzdHJpbmcge1xuICAgICAgICBpZihpdGVtLnVybCkge1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShpdGVtLnVybCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYXRpb24ucHJlcGFyZUV4dGVybmFsVXJsKHRoaXMucm91dGVyLmdlbmVyYXRlKGl0ZW0udXJsKS50b0xpbmtVcmwoKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcjJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsaXN0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5hY3RpdmVMaW5rID0gbnVsbDtcbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW1lbnViYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1tZW51YmFyIHVpLW1lbnUgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWNsZWFyZml4Jzp0cnVlfVwiIFxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICAgICAgPHAtbWVudWJhclN1YiBbaXRlbV09XCJtb2RlbFwiIHJvb3Q9XCJyb290XCI+PC9wLW1lbnViYXJTdWI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl0sXG4gICAgZGlyZWN0aXZlczogW01lbnViYXJTdWJdXG59KVxuZXhwb3J0IGNsYXNzIE1lbnViYXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgICAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cbiAgICBcbiAgICB1bnN1YnNjcmliZShpdGVtOiBhbnkpIHtcbiAgICAgICAgaWYoaXRlbS5ldmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgIGl0ZW0uZXZlbnRFbWl0dGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgY2hpbGRJdGVtIG9mIGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKGNoaWxkSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIG5nT25EZXN0cm95KCkgeyAgICAgICAgXG4gICAgICAgIGlmKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==
