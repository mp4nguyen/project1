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
var tabpanel_1 = require('./tabpanel');
var TabView = (function () {
    function TabView(el, tabPanels) {
        var _this = this;
        this.el = el;
        this.orientation = 'top';
        this.onChange = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        tabPanels.changes.subscribe(function (_) {
            _this.tabs = tabPanels.toArray();
            var selectedTab = _this.findSelectedTab();
            if (!selectedTab && _this.tabs.length) {
                _this.tabs[0].selected = true;
            }
        });
    }
    TabView.prototype.open = function (event, tab) {
        if (tab.disabled) {
            event.preventDefault();
            return;
        }
        if (!tab.selected) {
            var selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            tab.selected = true;
            this.onChange.emit({ originalEvent: event, index: this.findTabIndex(tab) });
        }
        event.preventDefault();
    };
    TabView.prototype.close = function (event, tab) {
        if (tab.selected) {
            tab.selected = false;
            for (var i = 0; i < this.tabs.length; i++) {
                var tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
        this.onClose.emit({ originalEvent: event, index: this.findTabIndex(tab) });
        event.stopPropagation();
    };
    TabView.prototype.findSelectedTab = function () {
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    };
    TabView.prototype.findTabIndex = function (tab) {
        var index = -1;
        for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    };
    TabView.prototype.getDefaultHeaderClass = function (tab) {
        var styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabView.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TabView.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabView.prototype, "styleClass", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TabView.prototype, "onChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TabView.prototype, "onClose", void 0);
    TabView = __decorate([
        core_1.Component({
            selector: 'p-tabView',
            template: "\n        <div [ngClass]=\"'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-tabview-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\">\n                <template ngFor let-tab [ngForOf]=\"tabs\">\n                    <li [class]=\"getDefaultHeaderClass(tab)\" [ngStyle]=\"tab.headerStyle\"\n                        [ngClass]=\"{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-hover': tab.hoverHeader&&!tab.disabled, 'ui-state-disabled': tab.disabled}\"\n                        (mouseenter)=\"tab.hoverHeader=true\" (mouseleave)=\"tab.hoverHeader=false\" (click)=\"open($event,tab)\" *ngIf=\"!tab.closed\">\n                        <a href=\"#\">{{tab.header}}</a><span *ngIf=\"tab.closable\" class=\"fa fa-close\" (click)=\"close($event,tab)\"></span>\n                    </li>\n                </template>\n            </ul>\n            <div class=\"ui-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
        }),
        __param(1, core_1.Query(tabpanel_1.TabPanel)), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.QueryList])
    ], TabView);
    return TabView;
}());
exports.TabView = TabView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkUsZUFBZSxDQUFDLENBQUE7QUFDN0YseUJBQXVCLFlBQVksQ0FBQyxDQUFBO0FBcUJwQztJQWdCSSxpQkFBb0IsRUFBYyxFQUFrQixTQUE4QjtRQWhCdEYsaUJBdUZDO1FBdkV1QixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBZHpCLGdCQUFXLEdBQVcsS0FBSyxDQUFDO1FBTTNCLGFBQVEsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFakQsWUFBTyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU90RCxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDekIsS0FBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMsSUFBSSxXQUFXLEdBQWEsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ25ELEVBQUUsQ0FBQSxDQUFDLENBQUMsV0FBVyxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxzQkFBSSxHQUFKLFVBQUssS0FBSyxFQUFFLEdBQWE7UUFDckIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELEVBQUUsQ0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLFdBQVcsR0FBYSxJQUFJLENBQUMsZUFBZSxF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RCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFwRkQ7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzBDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7OzZDQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7OzRDQUFBO0lBN0JiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxnbENBZVQ7U0FDSixDQUFDO21CQWlCc0MsWUFBSyxDQUFDLG1CQUFRLENBQUM7O2VBakJyRDtJQXdGRixjQUFDO0FBQUQsQ0F2RkEsQUF1RkMsSUFBQTtBQXZGWSxlQUFPLFVBdUZuQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLFF1ZXJ5LFF1ZXJ5TGlzdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuL3RhYnBhbmVsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYlZpZXcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLXRhYnZpZXcgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktdGFidmlldy0nICsgb3JpZW50YXRpb25cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJ1aS10YWJ2aWV3LW5hdiB1aS1oZWxwZXItcmVzZXQgdWktaGVscGVyLWNsZWFyZml4IHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbFwiPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBsZXQtdGFiIFtuZ0Zvck9mXT1cInRhYnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIFtjbGFzc109XCJnZXREZWZhdWx0SGVhZGVyQ2xhc3ModGFiKVwiIFtuZ1N0eWxlXT1cInRhYi5oZWFkZXJTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXRhYnZpZXctc2VsZWN0ZWQgdWktc3RhdGUtYWN0aXZlJzogdGFiLnNlbGVjdGVkLCAndWktc3RhdGUtaG92ZXInOiB0YWIuaG92ZXJIZWFkZXImJiF0YWIuZGlzYWJsZWQsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IHRhYi5kaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwidGFiLmhvdmVySGVhZGVyPXRydWVcIiAobW91c2VsZWF2ZSk9XCJ0YWIuaG92ZXJIZWFkZXI9ZmFsc2VcIiAoY2xpY2spPVwib3BlbigkZXZlbnQsdGFiKVwiICpuZ0lmPVwiIXRhYi5jbG9zZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+e3t0YWIuaGVhZGVyfX08L2E+PHNwYW4gKm5nSWY9XCJ0YWIuY2xvc2FibGVcIiBjbGFzcz1cImZhIGZhLWNsb3NlXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudCx0YWIpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRhYnZpZXctcGFuZWxzXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIFRhYlZpZXcge1xuXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246IHN0cmluZyA9ICd0b3AnO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuICAgIFxuICAgIHRhYnM6IFRhYlBhbmVsW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLEBRdWVyeShUYWJQYW5lbCkgdGFiUGFuZWxzOiBRdWVyeUxpc3Q8VGFiUGFuZWw+KSB7XG4gICAgICAgIHRhYlBhbmVscy5jaGFuZ2VzLnN1YnNjcmliZShfID0+IHtcbiAgICAgICAgICAgIHRoaXMudGFicyA9IHRhYlBhbmVscy50b0FycmF5KCk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRUYWI6IFRhYlBhbmVsID0gdGhpcy5maW5kU2VsZWN0ZWRUYWIoKTtcbiAgICAgICAgICAgIGlmKCFzZWxlY3RlZFRhYiAmJiB0aGlzLnRhYnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJzWzBdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgICAgICAgICAgXG4gICAgb3BlbihldmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICBpZih0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKCF0YWIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRhYjogVGFiUGFuZWwgPSB0aGlzLmZpbmRTZWxlY3RlZFRhYigpO1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWRUYWIpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRhYi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWIuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IHRoaXMuZmluZFRhYkluZGV4KHRhYil9KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICBjbG9zZShldmVudCwgdGFiOiBUYWJQYW5lbCkgeyAgICAgICAgXG4gICAgICAgIGlmKHRhYi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGFiLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhYlBhbmVsID0gdGhpcy50YWJzW2ldO1xuICAgICAgICAgICAgICAgIGlmKCF0YWJQYW5lbC5jbG9zZWQmJiF0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFiUGFuZWwuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRhYi5jbG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiB0aGlzLmZpbmRUYWJJbmRleCh0YWIpfSk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICBcbiAgICBmaW5kU2VsZWN0ZWRUYWIoKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMudGFic1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIFxuICAgIGZpbmRUYWJJbmRleCh0YWI6IFRhYlBhbmVsKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLnRhYnNbaV0gPT0gdGFiKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgXG4gICAgZ2V0RGVmYXVsdEhlYWRlckNsYXNzKHRhYjpUYWJQYW5lbCkge1xuICAgICAgICBsZXQgc3R5bGVDbGFzcyA9ICd1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci0nICsgdGhpcy5vcmllbnRhdGlvbjsgXG4gICAgICAgIGlmKHRhYi5oZWFkZXJTdHlsZUNsYXNzKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArIFwiIFwiICsgdGFiLmhlYWRlclN0eWxlQ2xhc3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlQ2xhc3M7XG4gICAgfVxufSJdfQ==
