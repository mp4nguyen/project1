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
var common_1 = require('angular2/common');
var router_deprecated_1 = require('angular2/router-deprecated');
var PanelMenuSub = (function () {
    function PanelMenuSub(router, location) {
        this.router = router;
        this.location = location;
        this.activeItems = [];
    }
    PanelMenuSub.prototype.onClick = function (event, item) {
        if (item.items) {
            var index = this.activeItems.indexOf(item);
            if (index == -1)
                this.activeItems.push(item);
            else
                this.activeItems.splice(index, 1);
            event.preventDefault();
        }
        else {
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
        }
    };
    PanelMenuSub.prototype.isActive = function (item) {
        return this.activeItems.indexOf(item) != -1;
    };
    PanelMenuSub.prototype.getItemUrl = function (item) {
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
    ], PanelMenuSub.prototype, "item", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PanelMenuSub.prototype, "expanded", void 0);
    PanelMenuSub = __decorate([
        core_1.Component({
            selector: 'p-panelMenuSub',
            template: "\n        <ul class=\"ui-menu-list ui-helper-reset\" [style.display]=\"expanded ? 'block' : 'none'\">\n            <li *ngFor=\"let child of item.items\" class=\"ui-menuitem ui-corner-all\" [ngClass]=\"{'ui-menu-parent':child.items}\">\n                <a #link [href]=\"getItemUrl(item)\" class=\"ui-menuitem-link ui-corner-all\" \n                    [ngClass]=\"{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-hover':(hoveredLink==link)}\" (click)=\"onClick($event,child)\"\n                    (mouseenter)=\"hoveredLink=link\" (mouseleave)=\"hoveredLink=null\">\n                    <span class=\"ui-panelmenu-icon fa fa-fw\" [ngClass]=\"{'fa-caret-right':!isActive(child),'fa-caret-down':isActive(child)}\" *ngIf=\"child.items\"></span>\n                    <span class=\"ui-menuitem-icon fa fa-fw\" [ngClass]=\"child.icon\" *ngIf=\"child.icon\"></span>\n                    <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                </a>\n                <p-panelMenuSub [item]=\"child\" [expanded]=\"isActive(child)\" *ngIf=\"child.items\"></p-panelMenuSub>\n            </li>\n        </ul>\n    ",
            directives: [PanelMenuSub]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _b) || Object])
    ], PanelMenuSub);
    return PanelMenuSub;
    var _a, _b;
}());
exports.PanelMenuSub = PanelMenuSub;
var PanelMenu = (function () {
    function PanelMenu(el) {
        this.el = el;
        this.activeItems = [];
    }
    PanelMenu.prototype.headerClick = function (event, item) {
        var index = this.activeItems.indexOf(item);
        if (index == -1)
            this.activeItems.push(item);
        else
            this.activeItems.splice(index, 1);
        event.preventDefault();
    };
    PanelMenu.prototype.unsubscribe = function (item) {
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
    PanelMenu.prototype.isActive = function (item) {
        return this.activeItems.indexOf(item) != -1;
    };
    PanelMenu.prototype.ngOnDestroy = function () {
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
    ], PanelMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PanelMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PanelMenu.prototype, "styleClass", void 0);
    PanelMenu = __decorate([
        core_1.Component({
            selector: 'p-panelMenu',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-panelmenu ui-widget'\">\n            <div *ngFor=\"let item of model\" class=\"ui-menuitem-panel\">\n                <div tabindex=\"0\" [ngClass]=\"{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-all':!isActive(item),\n                    'ui-state-active ui-corner-top':isActive(item),'ui-state-hover':(item == hoveredItem)}\">\n                    <span class=\"ui-panelmenu-icon fa fa-fw\" [ngClass]=\"{'fa-caret-right':!isActive(item),'fa-caret-down':isActive(item)}\"></span>\n                    <a [href]=\"item.url||'#'\" [ngClass]=\"{'ui-panelmenu-headerlink-hasicon':item.icon}\" (click)=\"headerClick($event,item)\"\n                        (mouseenter)=\"hoveredItem=item\" (mouseleave)=\"hoveredItem=null\">\n                        <span class=\"ui-menuitem-icon fa fa-fw\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                        <span>{{item.label}}</span>\n                    </a>\n                </div>\n                <div class=\"ui-panelmenu-content ui-widget-content\" [style.display]=\"isActive(item) ? 'block' : 'none'\">\n                    <p-panelMenuSub [item]=\"item\" [expanded]=\"true\"></p-panelMenuSub>\n                </div>\n            </div>\n        </div>\n    ",
            directives: [PanelMenuSub]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PanelMenu);
    return PanelMenu;
}());
exports.PanelMenu = PanelMenu;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvcGFuZWxtZW51L3BhbmVsbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWdFLGVBQWUsQ0FBQyxDQUFBO0FBRWhGLHVCQUF1QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pDLGtDQUFxQiw0QkFBNEIsQ0FBQyxDQUFBO0FBb0JsRDtJQU1JLHNCQUFvQixNQUFjLEVBQVUsUUFBa0I7UUFBMUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFOUQsZ0JBQVcsR0FBZSxFQUFFLENBQUM7SUFGb0MsQ0FBQztJQUlsRSw4QkFBTyxHQUFQLFVBQVEsS0FBSyxFQUFDLElBQWM7UUFDeEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUzQyxFQUFFLENBQUEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSTtnQkFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUks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Q0FBQztJQUVELCtCQUFXLEdBQVg7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNaLEdBQUcsQ0FBQSxDQUFhLFVBQVUsRUFBVixLQUFBLElBQUksQ0FBQyxLQUFLLEVBQVYsY0FBVSxFQUFWLElBQVUsQ0FBQztnQkFBdkIsSUFBSSxJQUFJLFNBQUE7Z0JBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQjtRQUNMLENBQUM7SUFDTCxDQUFDO0lBN0NEO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQTVCWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsd3lDQWlCVDtZQUNELFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQztTQUM3QixDQUFDOztpQkFBQTtJQWtERixnQkFBQztBQUFELENBakRBLEFBaURDLElBQUE7QUFqRFksaUJBQVMsWUFpRHJCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9wYW5lbG1lbnUvcGFuZWxtZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksSW5wdXQsRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJy4uL2FwaS9tZW51bW9kZWwnO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnVTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBjbGFzcz1cInVpLW1lbnUtbGlzdCB1aS1oZWxwZXItcmVzZXRcIiBbc3R5bGUuZGlzcGxheV09XCJleHBhbmRlZCA/ICdibG9jaycgOiAnbm9uZSdcIj5cbiAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY2hpbGQgb2YgaXRlbS5pdGVtc1wiIGNsYXNzPVwidWktbWVudWl0ZW0gdWktY29ybmVyLWFsbFwiIFtuZ0NsYXNzXT1cInsndWktbWVudS1wYXJlbnQnOmNoaWxkLml0ZW1zfVwiPlxuICAgICAgICAgICAgICAgIDxhICNsaW5rIFtocmVmXT1cImdldEl0ZW1VcmwoaXRlbSlcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIFxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW1lbnVpdGVtLWxpbmstaGFzaWNvbic6Y2hpbGQuaWNvbiYmY2hpbGQuaXRlbXMsJ3VpLXN0YXRlLWhvdmVyJzooaG92ZXJlZExpbms9PWxpbmspfVwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudCxjaGlsZClcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJob3ZlcmVkTGluaz1saW5rXCIgKG1vdXNlbGVhdmUpPVwiaG92ZXJlZExpbms9bnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhbmVsbWVudS1pY29uIGZhIGZhLWZ3XCIgW25nQ2xhc3NdPVwieydmYS1jYXJldC1yaWdodCc6IWlzQWN0aXZlKGNoaWxkKSwnZmEtY2FyZXQtZG93bic6aXNBY3RpdmUoY2hpbGQpfVwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvbiBmYSBmYS1md1wiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPHAtcGFuZWxNZW51U3ViIFtpdGVtXT1cImNoaWxkXCIgW2V4cGFuZGVkXT1cImlzQWN0aXZlKGNoaWxkKVwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3AtcGFuZWxNZW51U3ViPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtQYW5lbE1lbnVTdWJdXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudVN1YiB7XG4gICAgXG4gICAgQElucHV0KCkgaXRlbTogTWVudUl0ZW07XG4gICAgXG4gICAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHt9XG4gICAgICAgIFxuICAgIGFjdGl2ZUl0ZW1zOiBNZW51SXRlbVtdID0gW107XG4gICAgICAgIFxuICAgIG9uQ2xpY2soZXZlbnQsaXRlbTogTWVudUl0ZW0pIHtcbiAgICAgICAgaWYoaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5hY3RpdmVJdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihpbmRleCA9PSAtMSlcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0uZXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmV2ZW50RW1pdHRlci5zdWJzY3JpYmUoaXRlbS5jb21tYW5kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIuZW1pdChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFpdGVtLnVybCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaXNBY3RpdmUoaXRlbTogTWVudUl0ZW0pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlSXRlbXMuaW5kZXhPZihpdGVtKSAhPSAtMTtcbiAgICB9XG4gICAgXG4gICAgZ2V0SXRlbVVybChpdGVtOiBNZW51SXRlbSk6IHN0cmluZyB7XG4gICAgICAgIGlmKGl0ZW0udXJsKSB7XG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KGl0ZW0udXJsKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5yb3V0ZXIuZ2VuZXJhdGUoaXRlbS51cmwpLnRvTGlua1VybCgpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS51cmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyMnO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWxNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCIndWktcGFuZWxtZW51IHVpLXdpZGdldCdcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWxcIiBjbGFzcz1cInVpLW1lbnVpdGVtLXBhbmVsXCI+XG4gICAgICAgICAgICAgICAgPGRpdiB0YWJpbmRleD1cIjBcIiBbbmdDbGFzc109XCJ7J3VpLXdpZGdldCB1aS1wYW5lbG1lbnUtaGVhZGVyIHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsJ3VpLWNvcm5lci1hbGwnOiFpc0FjdGl2ZShpdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWFjdGl2ZSB1aS1jb3JuZXItdG9wJzppc0FjdGl2ZShpdGVtKSwndWktc3RhdGUtaG92ZXInOihpdGVtID09IGhvdmVyZWRJdGVtKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYW5lbG1lbnUtaWNvbiBmYSBmYS1md1wiIFtuZ0NsYXNzXT1cInsnZmEtY2FyZXQtcmlnaHQnOiFpc0FjdGl2ZShpdGVtKSwnZmEtY2FyZXQtZG93bic6aXNBY3RpdmUoaXRlbSl9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YSBbaHJlZl09XCJpdGVtLnVybHx8JyMnXCIgW25nQ2xhc3NdPVwieyd1aS1wYW5lbG1lbnUtaGVhZGVybGluay1oYXNpY29uJzppdGVtLmljb259XCIgKGNsaWNrKT1cImhlYWRlckNsaWNrKCRldmVudCxpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJob3ZlcmVkSXRlbT1pdGVtXCIgKG1vdXNlbGVhdmUpPVwiaG92ZXJlZEl0ZW09bnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uIGZhIGZhLWZ3XCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtY29udGVudCB1aS13aWRnZXQtY29udGVudFwiIFtzdHlsZS5kaXNwbGF5XT1cImlzQWN0aXZlKGl0ZW0pID8gJ2Jsb2NrJyA6ICdub25lJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8cC1wYW5lbE1lbnVTdWIgW2l0ZW1dPVwiaXRlbVwiIFtleHBhbmRlZF09XCJ0cnVlXCI+PC9wLXBhbmVsTWVudVN1Yj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtQYW5lbE1lbnVTdWJdXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudSB7XG4gICAgXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIGFjdGl2ZUl0ZW1zOiBNZW51SXRlbVtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1zID0gW107XG4gICAgfVxuXG4gICAgaGVhZGVyQ2xpY2soZXZlbnQsIGl0ZW0gKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuYWN0aXZlSXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGluZGV4ID09IC0xKVxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAgICAgXG4gICAgdW5zdWJzY3JpYmUoaXRlbTogYW55KSB7XG4gICAgICAgIGlmKGl0ZW0uZXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICBpdGVtLmV2ZW50RW1pdHRlci51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICBmb3IobGV0IGNoaWxkSXRlbSBvZiBpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZShjaGlsZEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlzQWN0aXZlKGl0ZW06IE1lbnVJdGVtKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUl0ZW1zLmluZGV4T2YoaXRlbSkgIT0gLTE7XG4gICAgfVxuICAgICAgICBcbiAgICBuZ09uRGVzdHJveSgpIHsgICAgICAgIFxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
