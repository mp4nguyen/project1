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
var MegaMenu = (function () {
    function MegaMenu(el, domHandler, renderer, router, location) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.router = router;
        this.location = location;
        this.orientation = 'horizontal';
    }
    MegaMenu.prototype.onItemMouseEnter = function (event, item) {
        this.activeItem = item;
        this.activeLink = item.children[0];
        var submenu = item.children[0].nextElementSibling;
        if (submenu) {
            submenu.style.zIndex = ++domhandler_1.DomHandler.zindex;
            if (this.orientation === 'horizontal') {
                submenu.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                submenu.style.left = '0px';
            }
            else if (this.orientation === 'vertical') {
                submenu.style.top = '0px';
                submenu.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    };
    MegaMenu.prototype.onItemMouseLeave = function (event, link) {
        this.activeItem = null;
        this.activeLink = null;
    };
    MegaMenu.prototype.itemClick = function (event, item) {
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
    MegaMenu.prototype.unsubscribe = function (item) {
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
    MegaMenu.prototype.ngOnDestroy = function () {
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                this.unsubscribe(item);
            }
        }
    };
    MegaMenu.prototype.getColumnClass = function (menuitem) {
        var length = menuitem.items ? menuitem.items.length : 0;
        var columnClass;
        switch (length) {
            case 2:
                columnClass = 'ui-grid-col-6';
                break;
            case 3:
                columnClass = 'ui-grid-col-4';
                break;
            case 4:
                columnClass = 'ui-grid-col-3';
                break;
            case 6:
                columnClass = 'ui-grid-col-2';
                break;
            default:
                columnClass = 'ui-grid-col-12';
                break;
        }
        return columnClass;
    };
    MegaMenu.prototype.getItemUrl = function (item) {
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
        __metadata('design:type', Array)
    ], MegaMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MegaMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MegaMenu.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MegaMenu.prototype, "orientation", void 0);
    MegaMenu = __decorate([
        core_1.Component({
            selector: 'p-megaMenu',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\"\n            [ngClass]=\"{'ui-menu ui-menubar ui-megamenu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-megamenu-vertical': orientation == 'vertical'}\">\n            <ul class=\"ui-menu-list ui-helper-reset\">\n                <template ngFor let-category [ngForOf]=\"model\">\n                    <li #item [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':category.items,'ui-menuitem-active':item==activeItem}\"\n                        (mouseenter)=\"onItemMouseEnter($event, item)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n                        <a #link class=\"ui-menuitem-link ui-corner-all ui-submenu-link\" [ngClass]=\"{'ui-state-hover':link==activeLink}\">\n                            <span class=\"ui-submenu-icon fa fa-fw\" [ngClass]=\"{'fa-caret-down':orientation=='horizontal','fa-caret-right':orientation=='vertical'}\"></span>\n                            <span class=\"ui-menuitem-icon fa fa-fw\" [ngClass]=\"category.icon\"></span>\n                            {{category.label}}\n                        </a>\n                        <div class=\"ui-megamenu-panel ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow\">\n                            <div class=\"ui-grid\">\n                                <div class=\"ui-grid-row\">\n                                    <template ngFor let-column [ngForOf]=\"category.items\">\n                                        <div [class]=\"getColumnClass(category)\">\n                                            <template ngFor let-submenu [ngForOf]=\"column\">\n                                                <ul class=\"ui-menu-list ui-helper-reset\">\n                                                    <li class=\"ui-widget-header ui-corner-all\"><h3>{{submenu.label}}</h3></li>\n                                                    <li *ngFor=\"let item of submenu.items\" class=\"ui-menuitem ui-widget ui-corner-all\">\n                                                        <a #link [href]=\"getItemUrl(item)\" class=\"ui-menuitem-link ui-corner-all\" [ngClass]=\"{'ui-state-hover':link==hoveredItem}\"\n                                                            (mouseenter)=\"hoveredItem=$event.target\" (mouseleave)=\"hoveredItem=null\" (click)=\"itemClick($event, item)\">\n                                                            <span class=\"ui-menuitem-icon fa fa-fw\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                                                        </a>\n                                                    </li>\n                                                </ul>\n                                            </template>\n                                        </div>\n                                    </template>\n                                </div>\n                            </div>\n                        </div>\n                    </li>\n                </template>\n            </ul>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, (typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _b) || Object])
    ], MegaMenu);
    return MegaMenu;
    var _a, _b;
}());
exports.MegaMenu = MegaMenu;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvbWVnYW1lbnUvbWVnYW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE4RixlQUFlLENBQUMsQ0FBQTtBQUM5RywyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQUU3Qyx1QkFBdUIsaUJBQWlCLENBQUMsQ0FBQTtBQUN6QyxrQ0FBcUIsNEJBQTRCLENBQUMsQ0FBQTtBQTZDbEQ7SUFjSSxrQkFBb0IsRUFBYyxFQUFVLFVBQXNCLEVBQVUsUUFBa0IsRUFBVSxNQUFjLEVBQVUsUUFBa0I7UUFBOUgsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFOekksZ0JBQVcsR0FBVyxZQUFZLENBQUM7SUFNeUcsQ0FBQztJQUV0SixtQ0FBZ0IsR0FBaEIsVUFBaUIsS0FBSyxFQUFFLElBQUk7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUM7UUFDbkQsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsdUJBQVUsQ0FBQyxNQUFNLENBQUM7WUFFM0MsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLENBQUMsQ0FBRSxDQUFDO2dCQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMs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LElBQUE7QUFySFksZ0JBQVEsV0FxSHBCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9tZWdhbWVudS9tZWdhbWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LFJlbmRlcmVyLEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJy4uL2RvbS9kb21oYW5kbGVyJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJy4uL2FwaS9tZW51bW9kZWwnO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tZWdhTWVudScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktbWVudSB1aS1tZW51YmFyIHVpLW1lZ2FtZW51IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHVpLWhlbHBlci1jbGVhcmZpeCc6dHJ1ZSwndWktbWVnYW1lbnUtdmVydGljYWwnOiBvcmllbnRhdGlvbiA9PSAndmVydGljYWwnfVwiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktbWVudS1saXN0IHVpLWhlbHBlci1yZXNldFwiPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBsZXQtY2F0ZWdvcnkgW25nRm9yT2ZdPVwibW9kZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpICNpdGVtIFtuZ0NsYXNzXT1cInsndWktbWVudWl0ZW0gdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLW1lbnUtcGFyZW50JzpjYXRlZ29yeS5pdGVtcywndWktbWVudWl0ZW0tYWN0aXZlJzppdGVtPT1hY3RpdmVJdGVtfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKCRldmVudCwgaXRlbSlcIiAobW91c2VsZWF2ZSk9XCJvbkl0ZW1Nb3VzZUxlYXZlKCRldmVudCwgaXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICNsaW5rIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsIHVpLXN1Ym1lbnUtbGlua1wiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtaG92ZXInOmxpbms9PWFjdGl2ZUxpbmt9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdWJtZW51LWljb24gZmEgZmEtZndcIiBbbmdDbGFzc109XCJ7J2ZhLWNhcmV0LWRvd24nOm9yaWVudGF0aW9uPT0naG9yaXpvbnRhbCcsJ2ZhLWNhcmV0LXJpZ2h0JzpvcmllbnRhdGlvbj09J3ZlcnRpY2FsJ31cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uIGZhIGZhLWZ3XCIgW25nQ2xhc3NdPVwiY2F0ZWdvcnkuaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2NhdGVnb3J5LmxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tZWdhbWVudS1wYW5lbCB1aS13aWRnZXQtY29udGVudCB1aS1tZW51LWxpc3QgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItY2xlYXJmaXggdWktbWVudS1jaGlsZCB1aS1zaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ3JpZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ3JpZC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBsZXQtY29sdW1uIFtuZ0Zvck9mXT1cImNhdGVnb3J5Lml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBbY2xhc3NdPVwiZ2V0Q29sdW1uQ2xhc3MoY2F0ZWdvcnkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBsZXQtc3VibWVudSBbbmdGb3JPZl09XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLW1lbnUtbGlzdCB1aS1oZWxwZXItcmVzZXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIj48aDM+e3tzdWJtZW51LmxhYmVsfX08L2gzPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN1Ym1lbnUuaXRlbXNcIiBjbGFzcz1cInVpLW1lbnVpdGVtIHVpLXdpZGdldCB1aS1jb3JuZXItYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhICNsaW5rIFtocmVmXT1cImdldEl0ZW1VcmwoaXRlbSlcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtaG92ZXInOmxpbms9PWhvdmVyZWRJdGVtfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJob3ZlcmVkSXRlbT0kZXZlbnQudGFyZ2V0XCIgKG1vdXNlbGVhdmUpPVwiaG92ZXJlZEl0ZW09bnVsbFwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uIGZhIGZhLWZ3XCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBNZWdhTWVudSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBtb2RlbDogTWVudUl0ZW1bXTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246IHN0cmluZyA9ICdob3Jpem9udGFsJztcbiAgICBcbiAgICBhY3RpdmVJdGVtOiBhbnk7XG4gICAgXG4gICAgYWN0aXZlTGluazogYW55O1xuICAgICAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlciwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHt9XG4gICAgXG4gICAgb25JdGVtTW91c2VFbnRlcihldmVudCwgaXRlbSkge1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpdGVtO1xuICAgICAgICB0aGlzLmFjdGl2ZUxpbmsgPSBpdGVtLmNoaWxkcmVuWzBdO1xuICAgICAgICBsZXQgc3VibWVudSA9ICBpdGVtLmNoaWxkcmVuWzBdLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgaWYoc3VibWVudSkge1xuICAgICAgICAgICAgc3VibWVudS5zdHlsZS56SW5kZXggPSArK0RvbUhhbmRsZXIuemluZGV4O1xuXG4gICAgICAgICAgICBpZih0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpICB7XG4gICAgICAgICAgICAgICAgc3VibWVudS5zdHlsZS50b3AgPSB0aGlzLmRvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIHN1Ym1lbnUuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSAge1xuICAgICAgICAgICAgICAgIHN1Ym1lbnUuc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgICAgICAgICAgc3VibWVudS5zdHlsZS5sZWZ0ID0gdGhpcy5kb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uSXRlbU1vdXNlTGVhdmUoZXZlbnQsIGxpbmspIHtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5hY3RpdmVMaW5rID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgaXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBNZW51SXRlbSnCoHtcbiAgICAgICAgaWYoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpZighaXRlbS5ldmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICBpdGVtLmV2ZW50RW1pdHRlci5zdWJzY3JpYmUoaXRlbS5jb21tYW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLmFjdGl2ZUxpbmsgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICB1bnN1YnNjcmliZShpdGVtOiBhbnkpIHtcbiAgICAgICAgaWYoaXRlbS5ldmVudEVtaXR0ZXIpIHtcbiAgICAgICAgICAgIGl0ZW0uZXZlbnRFbWl0dGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgY2hpbGRJdGVtIG9mIGl0ZW0uaXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKGNoaWxkSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7ICAgICAgICBcbiAgICAgICAgaWYodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGdldENvbHVtbkNsYXNzKG1lbnVpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gbWVudWl0ZW0uaXRlbXMgPyBtZW51aXRlbS5pdGVtcy5sZW5ndGg6IDA7XG4gICAgICAgIGxldCBjb2x1bW5DbGFzcztcbiAgICAgICAgc3dpdGNoKGxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAndWktZ3JpZC1jb2wtNic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAndWktZ3JpZC1jb2wtNCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAndWktZ3JpZC1jb2wtMyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAndWktZ3JpZC1jb2wtMic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcz0gJ3VpLWdyaWQtY29sLTEyJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29sdW1uQ2xhc3M7XG4gICAgfVxuICAgIFxuICAgIGdldEl0ZW1VcmwoaXRlbTogTWVudUl0ZW0pOiBzdHJpbmcge1xuICAgICAgICBpZihpdGVtLnVybCkge1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShpdGVtLnVybCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYXRpb24ucHJlcGFyZUV4dGVybmFsVXJsKHRoaXMucm91dGVyLmdlbmVyYXRlKGl0ZW0udXJsKS50b0xpbmtVcmwoKSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcjJztcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==
