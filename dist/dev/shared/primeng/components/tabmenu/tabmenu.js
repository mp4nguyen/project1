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
var TabMenu = (function () {
    function TabMenu(router, location) {
        this.router = router;
        this.location = location;
    }
    TabMenu.prototype.ngOnInit = function () {
        if (!this.activeItem && this.model && this.model.length) {
            this.activeItem = this.model[0];
        }
    };
    TabMenu.prototype.itemClick = function (event, item) {
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
        this.activeItem = item;
    };
    TabMenu.prototype.ngOnDestroy = function () {
        if (this.model) {
            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
                var item = _a[_i];
                this.unsubscribe(item);
            }
        }
    };
    TabMenu.prototype.getItemUrl = function (item) {
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
    TabMenu.prototype.unsubscribe = function (item) {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TabMenu.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TabMenu.prototype, "activeItem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TabMenu.prototype, "popup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TabMenu.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabMenu.prototype, "styleClass", void 0);
    TabMenu = __decorate([
        core_1.Component({
            selector: 'p-tabMenu',
            template: "\n        <div [ngClass]=\"'ui-tabmenu ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\" role=\"tablist\">\n                <li *ngFor=\"let item of model\" \n                    [ngClass]=\"{'ui-tabmenuitem ui-state-default ui-corner-top':true,\n                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-hover':hoveredItem==item,'ui-state-active':activeItem==item}\"\n                    (mouseenter)=\"hoveredItem=item\" (mouseleave)=\"hoveredItem=null\">\n                    <a [href]=\"getItemUrl(item)\"class=\"ui-menuitem-link ui-corner-all\" (click)=\"itemClick($event,item)\">\n                        <span class=\"ui-menuitem-icon fa\" [ngClass]=\"item.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_deprecated_1.Router !== 'undefined' && router_deprecated_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof common_1.Location !== 'undefined' && common_1.Location) === 'function' && _b) || Object])
    ], TabMenu);
    return TabMenu;
    var _a, _b;
}());
exports.TabMenu = TabMenu;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdGFibWVudS90YWJtZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBdUUsZUFBZSxDQUFDLENBQUE7QUFDdkYsMkJBQXlCLG1CQUFtQixDQUFDLENBQUE7QUFFN0MsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMsa0NBQXFCLDRCQUE0QixDQUFDLENBQUE7QUFxQmxEO0lBWUksaUJBQW9CLE1BQWMsRUFBVSxRQUFrQjtRQUExQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7SUFJbEUsMEJBQVEsR0FBUjtRQUNJLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQkFBUyxHQUFULFVBQVUsS0FBSyxFQUFFLElBQWM7UUFDM0IsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZCxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUMsQ0FBQztZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1osR0FBRyxDQUFBLENBQWEsVUFBVSxFQUFWLEtBQUEsSUFBSSxDQUFDLEtBQUssRUFBVixjQUFVLEVBQVYsSUFBVSxDQUFDO2dCQUF2QixJQUFJLElBQUksU0FBQTtnQkFDUixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFCO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRCw0QkFBVSxHQUFWLFVBQVcsSUFBYztRQUNyQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNWLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN4RixJQUFJO2dCQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDZixDQUFDO0lBQ0wsQ0FBQztJQUVELDZCQUFXLEdBQVgsVUFBWSxJQUFTO1FBQ2pCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUVELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1osR0FBRyxDQUFBLENBQWtCLFVBQVUsRUFBVixLQUFBLElBQUksQ0FBQyxLQUFLLEVBQVYsY0FBVSxFQUFWLElBQVUsQ0FBQztnQkFBNUIsSUFBSSxTQUFTLFNBQUE7Z0JBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQjtRQUNMLENBQUM7SUFDTCxDQUFDO0lBbkVEO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQTdCWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsZy9CQWNUO1lBQ0QsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztTQUMxQixDQUFDOztlQUFBO0lBd0VGLGNBQUM7O0FBQUQsQ0F2RUEsQUF1RUMsSUFBQTtBQXZFWSxlQUFPLFVBdUVuQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdGFibWVudS90YWJtZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJy4uL2RvbS9kb21oYW5kbGVyJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJy4uL2FwaS9tZW51bW9kZWwnO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS10YWJtZW51IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJ1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLXRhYm1lbnUtbmF2IHVpLWhlbHBlci1yZXNldCB1aS1oZWxwZXItY2xlYXJmaXggdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWxcIiBcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS10YWJtZW51aXRlbSB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci10b3AnOnRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGFibWVudWl0ZW0taGFzaWNvbic6aXRlbS5pY29uLCd1aS1zdGF0ZS1ob3Zlcic6aG92ZXJlZEl0ZW09PWl0ZW0sJ3VpLXN0YXRlLWFjdGl2ZSc6YWN0aXZlSXRlbT09aXRlbX1cIlxuICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJob3ZlcmVkSXRlbT1pdGVtXCIgKG1vdXNlbGVhdmUpPVwiaG92ZXJlZEl0ZW09bnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBbaHJlZl09XCJnZXRJdGVtVXJsKGl0ZW0pXCJjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb24gZmFcIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG59KVxuZXhwb3J0IGNsYXNzIFRhYk1lbnUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG4gICAgXG4gICAgQElucHV0KCkgYWN0aXZlSXRlbTogTWVudUl0ZW07XG5cbiAgICBASW5wdXQoKSBwb3B1cDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHt9XG4gICAgICAgIFxuICAgIGhvdmVyZWRJdGVtOiBNZW51SXRlbTtcbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYoIXRoaXMuYWN0aXZlSXRlbSAmJiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSB0aGlzLm1vZGVsWzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGl0ZW1DbGljayhldmVudCwgaXRlbTogTWVudUl0ZW0pwqB7XG4gICAgICAgIGlmKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaWYoIWl0ZW0uZXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIuc3Vic2NyaWJlKGl0ZW0uY29tbWFuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGl0ZW0uZXZlbnRFbWl0dGVyLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWl0ZW0udXJsKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpdGVtO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHsgICAgICAgIFxuICAgICAgICBpZih0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZ2V0SXRlbVVybChpdGVtOiBNZW51SXRlbSk6IHN0cmluZyB7XG4gICAgICAgIGlmKGl0ZW0udXJsKSB7XG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KGl0ZW0udXJsKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5yb3V0ZXIuZ2VuZXJhdGUoaXRlbS51cmwpLnRvTGlua1VybCgpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS51cmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyMnO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVuc3Vic2NyaWJlKGl0ZW06IGFueSkge1xuICAgICAgICBpZihpdGVtLmV2ZW50RW1pdHRlcikge1xuICAgICAgICAgICAgaXRlbS5ldmVudEVtaXR0ZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZEl0ZW0gb2YgaXRlbS5pdGVtcykge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoY2hpbGRJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==
