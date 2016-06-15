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
var ContextMenuSub = (function () {
    function ContextMenuSub(domHandler, router, location) {
        this.domHandler = domHandler;
        this.router = router;
        this.location = location;
    }
    ContextMenuSub.prototype.onItemMouseEnter = function (event, item) {
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
    ContextMenuSub.prototype.onItemMouseLeave = function (event, link) {
        this.activeItem = null;
        this.activeLink = null;
    };
    ContextMenuSub.prototype.itemClick = function (event, item) {
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
    ContextMenuSub.prototype.listClick = function (event) {
        this.activeItem = null;
        this.activeLink = null;
    };
    ContextMenuSub.prototype.getItemUrl = function (item) {
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
    ], ContextMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ContextMenuSub.prototype, "root", void 0);
    ContextMenuSub = __decorate([
        core_1.Component({
            selector: 'p-contextMenuSub',
            template: "\n        <ul [ngClass]=\"{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}\" class=\"ui-menu-list\"\n            (click)=\"listClick($event)\">\n            <template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li #item [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}\"\n                    (mouseenter)=\"onItemMouseEnter($event, item)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n                    <a #link [href]=\"getItemUrl(child)\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==activeLink}\" (click)=\"itemClick($event, child)\">\n                        <span class=\"ui-submenu-icon fa fa-fw fa-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-contextMenuSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\"></p-contextMenuSub>\n                </li>\n            </template>\n        </ul>\n    ",
            directives: [ContextMenuSub],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [domhandler_1.DomHandler, (typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _b) || Object])
    ], ContextMenuSub);
    return ContextMenuSub;
    var _a, _b;
}());
exports.ContextMenuSub = ContextMenuSub;
var ContextMenu = (function () {
    function ContextMenu(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
    }
    ContextMenu.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.el.nativeElement.children[0];
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            _this.hide();
        });
        this.documentRightClickListener = this.renderer.listenGlobal('body', 'contextmenu', function (event) {
            _this.show(event);
            event.preventDefault();
        });
    };
    ContextMenu.prototype.toggle = function (event) {
        if (this.container.offsetParent)
            this.hide();
        else
            this.show(event);
    };
    ContextMenu.prototype.show = function (event) {
        this.left = event.pageX;
        this.top = event.pageY;
        this.visible = true;
        this.domHandler.fadeIn(this.container, 250);
    };
    ContextMenu.prototype.hide = function () {
        this.visible = false;
    };
    ContextMenu.prototype.unsubscribe = function (item) {
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
    ContextMenu.prototype.ngOnDestroy = function () {
        this.documentClickListener();
        this.documentRightClickListener();
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
    ], ContextMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ContextMenu.prototype, "global", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ContextMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ContextMenu.prototype, "styleClass", void 0);
    ContextMenu = __decorate([
        core_1.Component({
            selector: 'p-contextMenu',
            template: "\n        <div [ngClass]=\"'ui-contextmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-dynamic ui-shadow'\" \n            [class]=\"styleClass\" [ngStyle]=\"style\" [style.display]=\"visible ? 'block' : 'none'\" [style.left.px]=\"left\" [style.top.px]=\"top\">\n            <p-contextMenuSub [item]=\"model\" root=\"root\"></p-contextMenuSub>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler],
            directives: [ContextMenuSub]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], ContextMenu);
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvY29udGV4dG1lbnUvY29udGV4dG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE4RixlQUFlLENBQUMsQ0FBQTtBQUM5RywyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQUU3Qyx1QkFBdUIsaUJBQWlCLENBQUMsQ0FBQTtBQUN6QyxrQ0FBcUIsNEJBQTRCLENBQUMsQ0FBQTtBQXVCbEQ7SUFNSSx3QkFBb0IsVUFBc0IsRUFBVSxNQUFjLEVBQVUsUUFBa0I7UUFBMUUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQztJQU1sRyx5Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBSyxFQUFFLElBQUk7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksV0FBVyxHQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUM7UUFDdkQsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSx1QkFBVSxDQUFDLE1BQU0sQ0FBQztZQUUzQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNoRixDQUFDO0lB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QUFYO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFFbEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixHQUFHLENBQUEsQ0FBYSxVQUFVLEVBQVYsS0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLGNBQVUsRUFBVixJQUFVLENBQUM7Z0JBQXZCLElBQUksSUFBSSxTQUFBO2dCQUNSLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUI7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQTFFRDtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7K0NBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7bURBQUE7SUFuQlo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLCtZQUtUO1lBQ0QsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztZQUN2QixVQUFVLEVBQUUsQ0FBQyxjQUFjLENBQUM7U0FDL0IsQ0FBQzs7bUJBQUE7SUErRUYsa0JBQUM7QUFBRCxDQTlFQSxBQThFQyxJQUFBO0FBOUVZLG1CQUFXLGNBOEV2QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvY29udGV4dG1lbnUvY29udGV4dG1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxSZW5kZXJlcixFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICcuLi9hcGkvbWVudW1vZGVsJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY29udGV4dE1lbnVTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1yZXNldCc6cm9vdCwgJ3VpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWNsZWFyZml4IHVpLW1lbnUtY2hpbGQgdWktc2hhZG93Jzohcm9vdH1cIiBjbGFzcz1cInVpLW1lbnUtbGlzdFwiXG4gICAgICAgICAgICAoY2xpY2spPVwibGlzdENsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgW25nRm9yT2ZdPVwiKHJvb3QgPyBpdGVtIDogaXRlbS5pdGVtcylcIj5cbiAgICAgICAgICAgICAgICA8bGkgI2l0ZW0gW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbSB1aS13aWRnZXQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktbWVudS1wYXJlbnQnOmNoaWxkLml0ZW1zLCd1aS1tZW51aXRlbS1hY3RpdmUnOml0ZW09PWFjdGl2ZUl0ZW19XCJcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25JdGVtTW91c2VFbnRlcigkZXZlbnQsIGl0ZW0pXCIgKG1vdXNlbGVhdmUpPVwib25JdGVtTW91c2VMZWF2ZSgkZXZlbnQsIGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhICNsaW5rIFtocmVmXT1cImdldEl0ZW1VcmwoY2hpbGQpXCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGxcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWhvdmVyJzpsaW5rPT1hY3RpdmVMaW5rfVwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjaGlsZClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3VibWVudS1pY29uIGZhIGZhLWZ3IGZhLWNhcmV0LXJpZ2h0XCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvbiBmYSBmYS1md1wiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NoaWxkLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPHAtY29udGV4dE1lbnVTdWIgY2xhc3M9XCJ1aS1zdWJtZW51XCIgW2l0ZW1dPVwiY2hpbGRcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCI+PC9wLWNvbnRleHRNZW51U3ViPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3VsPlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW0NvbnRleHRNZW51U3ViXSxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudVN1YiB7XG5cbiAgICBASW5wdXQoKSBpdGVtOiBNZW51SXRlbTtcbiAgICBcbiAgICBASW5wdXQoKSByb290OiBib29sZWFuO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9tSGFuZGxlcjogRG9tSGFuZGxlciwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHt9XG4gICAgXG4gICAgYWN0aXZlSXRlbTogYW55O1xuICAgIFxuICAgIGFjdGl2ZUxpbms6IGFueTtcbiAgICAgICAgICAgIFxuICAgIG9uSXRlbU1vdXNlRW50ZXIoZXZlbnQsIGl0ZW0pIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gaXRlbTtcbiAgICAgICAgdGhpcy5hY3RpdmVMaW5rID0gaXRlbS5jaGlsZHJlblswXTtcbiAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gIGl0ZW0uY2hpbGRyZW5bMF0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBpZihuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgbGV0IHN1Ymxpc3QgPSBuZXh0RWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUuekluZGV4ID0gKytEb21IYW5kbGVyLnppbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgc3VibGlzdC5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUubGVmdCA9IHRoaXMuZG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkl0ZW1Nb3VzZUxlYXZlKGV2ZW50LCBsaW5rKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlTGluayA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGl0ZW1DbGljayhldmVudCwgaXRlbTogTWVudUl0ZW0pwqB7XG4gICAgICAgIGlmKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaWYoIWl0ZW0uZXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIuc3Vic2NyaWJlKGl0ZW0uY29tbWFuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGl0ZW0uZXZlbnRFbWl0dGVyLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZighaXRlbS51cmwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbGlzdENsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlTGluayA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGdldEl0ZW1VcmwoaXRlbTogTWVudUl0ZW0pOiBzdHJpbmcge1xuICAgICAgICBpZihpdGVtLnVybCkge1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShpdGVtLnVybCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYXRpb24ucHJlcGFyZUV4dGVybmFsVXJsKHRoaXMucm91dGVyLmdlbmVyYXRlKGl0ZW0udXJsKS50b0xpbmtVcmwoKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcjJztcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY29udGV4dE1lbnUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLWNvbnRleHRtZW51IHVpLW1lbnUgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWNsZWFyZml4IHVpLW1lbnUtZHluYW1pYyB1aS1zaGFkb3cnXCIgXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW3N0eWxlLmRpc3BsYXldPVwidmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIiBbc3R5bGUubGVmdC5weF09XCJsZWZ0XCIgW3N0eWxlLnRvcC5weF09XCJ0b3BcIj5cbiAgICAgICAgICAgIDxwLWNvbnRleHRNZW51U3ViIFtpdGVtXT1cIm1vZGVsXCIgcm9vdD1cInJvb3RcIj48L3AtY29udGV4dE1lbnVTdWI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlcl0sXG4gICAgZGlyZWN0aXZlczogW0NvbnRleHRNZW51U3ViXVxufSlcbmV4cG9ydCBjbGFzcyBDb250ZXh0TWVudSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xuICAgIFxuICAgIEBJbnB1dCgpIGdsb2JhbDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcbiAgICBcbiAgICBsZWZ0OiBudW1iZXI7XG4gICAgXG4gICAgdG9wOiBudW1iZXI7XG4gICAgXG4gICAgY29udGFpbmVyOiBhbnk7XG4gICAgXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG4gICAgXG4gICAgZG9jdW1lbnRSaWdodENsaWNrTGlzdGVuZXI6IGFueTtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdib2R5JywgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5kb2N1bWVudFJpZ2h0Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdib2R5JywgJ2NvbnRleHRtZW51JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3coZXZlbnQpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZShldmVudCkge1xuICAgICAgICBpZih0aGlzLmNvbnRhaW5lci5vZmZzZXRQYXJlbnQpXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zaG93KGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgc2hvdyhldmVudCkge1xuICAgICAgICB0aGlzLmxlZnQgPSBldmVudC5wYWdlWDtcbiAgICAgICAgdGhpcy50b3AgPSBldmVudC5wYWdlWTtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kb21IYW5kbGVyLmZhZGVJbih0aGlzLmNvbnRhaW5lciwgMjUwKTtcbiAgICB9XG4gICAgXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdW5zdWJzY3JpYmUoaXRlbTogYW55KSB7XG4gICAgICAgIGlmKGl0ZW0uZXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICBpdGVtLmV2ZW50RW1pdHRlci51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICBmb3IobGV0IGNoaWxkSXRlbSBvZiBpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZShjaGlsZEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5kb2N1bWVudFJpZ2h0Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59Il19
