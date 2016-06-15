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
var Carousel = (function () {
    function Carousel(el, domHandler, differs, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.numVisible = 3;
        this.firstVisible = 0;
        this.circular = false;
        this.breakpoint = 560;
        this.responsive = true;
        this.autoplayInterval = 0;
        this.effectDuration = '1s';
        this.easing = 'ease-out';
        this.pageLinks = 3;
        this.left = 0;
        this.differ = differs.find([]).create(null);
    }
    Carousel.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.value && this.value.length) {
                if (this.value.length && this.firstVisible >= this.value.length) {
                    this.setPage(this.totalPages - 1);
                }
            }
            else {
                this.setPage(0);
            }
            this.valuesChanged = true;
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
            this.updateMobileDropdown();
            this.updateLinks();
            this.updateDropdown();
        }
    };
    Carousel.prototype.ngAfterViewChecked = function () {
        if (this.valuesChanged) {
            this.render();
            this.valuesChanged = false;
        }
    };
    Carousel.prototype.ngOnInit = function () {
        if (window.innerWidth <= this.breakpoint) {
            this.shrinked = true;
            this.columns = 1;
        }
        else {
            this.shrinked = false;
            this.columns = this.numVisible;
        }
        this.page = Math.floor(this.firstVisible / this.columns);
    };
    Carousel.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.el.nativeElement.children[0];
        this.viewport = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-carousel-viewport');
        this.itemsContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-carousel-items');
        if (this.responsive) {
            this.documentResponsiveListener = this.renderer.listenGlobal('window', 'resize', function (event) {
                _this.updateState();
            });
        }
        if (this.value && this.value.length) {
            this.render();
        }
    };
    Carousel.prototype.updateLinks = function () {
        this.anchorPageLinks = [];
        for (var i = 0; i < this.totalPages; i++) {
            this.anchorPageLinks.push(i);
        }
    };
    Carousel.prototype.updateDropdown = function () {
        this.selectDropdownOptions = [];
        for (var i = 0; i < this.totalPages; i++) {
            this.selectDropdownOptions.push(i);
        }
    };
    Carousel.prototype.updateMobileDropdown = function () {
        this.mobileDropdownOptions = [];
        for (var i = 0; i < this.value.length; i++) {
            this.mobileDropdownOptions.push(i);
        }
    };
    Carousel.prototype.render = function () {
        this.items = this.domHandler.find(this.itemsContainer, 'li');
        this.calculateItemWidths();
        if (!this.responsive) {
            this.container.style.width = (this.domHandler.width(this.container)) + 'px';
        }
        if (this.autoplayInterval) {
            this.circular = true;
            this.startAutoplay();
        }
    };
    Carousel.prototype.calculateItemWidths = function () {
        var firstItem = (this.items && this.items.length) ? this.items[0] : null;
        if (firstItem) {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].style.width = ((this.domHandler.innerWidth(this.viewport) - (this.domHandler.getHorizontalMargin(firstItem) * this.columns)) / this.columns) + 'px';
            }
        }
    };
    Carousel.prototype.onNextNav = function () {
        var lastPage = (this.page === (this.totalPages - 1));
        if (!lastPage)
            this.setPage(this.page + 1);
        else if (this.circular)
            this.setPage(0);
    };
    Carousel.prototype.onPrevNav = function () {
        if (this.page !== 0)
            this.setPage(this.page - 1);
        else if (this.circular)
            this.setPage(this.totalPages - 1);
    };
    Carousel.prototype.setPage = function (p, enforce) {
        if (p !== this.page || enforce) {
            this.page = p;
            this.left = (-1 * (this.domHandler.innerWidth(this.viewport) * this.page));
            this.firstVisible = this.page * this.columns;
        }
    };
    Carousel.prototype.onDropdownChange = function (val) {
        this.setPage(parseInt(val));
    };
    Object.defineProperty(Carousel.prototype, "displayPageLinks", {
        get: function () {
            return (this.totalPages <= this.pageLinks && !this.shrinked);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "displayPageDropdown", {
        get: function () {
            return (this.totalPages > this.pageLinks && !this.shrinked);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "totalPages", {
        get: function () {
            return (this.value && this.value.length) ? Math.ceil(this.value.length / this.columns) : 0;
        },
        enumerable: true,
        configurable: true
    });
    Carousel.prototype.routerDisplay = function () {
        var win = window;
        if (win.innerWidth <= this.breakpoint)
            return true;
        else
            return false;
    };
    Carousel.prototype.updateState = function () {
        var win = window;
        if (win.innerWidth <= this.breakpoint) {
            this.shrinked = true;
            this.columns = 1;
        }
        else if (this.shrinked) {
            this.shrinked = false;
            this.columns = this.numVisible;
            this.updateLinks();
            this.updateDropdown();
        }
        this.calculateItemWidths();
        this.setPage(Math.floor(this.firstVisible / this.columns), true);
    };
    Carousel.prototype.startAutoplay = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.page === (_this.totalPages - 1))
                _this.setPage(0);
            else
                _this.setPage(_this.page + 1);
        }, this.autoplayInterval);
    };
    Carousel.prototype.stopAutoplay = function () {
        clearInterval(this.interval);
    };
    Carousel.prototype.ngOnDestroy = function () {
        if (this.responsive) {
            this.documentResponsiveListener();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Carousel.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "numVisible", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "firstVisible", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Carousel.prototype, "headerText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Carousel.prototype, "circular", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "breakpoint", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Carousel.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "autoplayInterval", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Carousel.prototype, "effectDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Carousel.prototype, "easing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Carousel.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Carousel.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Carousel.prototype, "styleClass", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Carousel.prototype, "itemTemplate", void 0);
    Carousel = __decorate([
        core_1.Component({
            selector: 'p-carousel',
            template: "\n        <div [ngClass]=\"{'ui-carousel ui-widget ui-widget-content ui-corner-all':true}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-carousel-header ui-widget-header\">\n                <div class=\"ui-carousel-header-title\">{{headerText}}</div>\n                <span class=\"ui-carousel-button ui-carousel-next-button fa fa-arrow-circle-right\" (click)=\"onNextNav()\" \n                        [ngClass]=\"{'ui-state-disabled':(page === (totalPages-1)) && !circular}\"></span>\n                <span class=\"ui-carousel-button ui-carousel-prev-button fa fa-arrow-circle-left\" (click)=\"onPrevNav()\" \n                        [ngClass]=\"{'ui-state-disabled':(page === 0 && !circular)}\"></span>\n                <div *ngIf=\"displayPageLinks\" class=\"ui-carousel-page-links\">\n                    <a href=\"#\" class=\"ui-carousel-page-link fa fa-circle-o\" *ngFor=\"let links of anchorPageLinks;let i=index\" [ngClass]=\"{'fa-dot-circle-o':page===i}\"></a>\n                </div>\n                <select *ngIf=\"displayPageDropdown\" class=\"ui-carousel-dropdown ui-widget ui-state-default ui-corner-left\" [value]=\"page\" (change)=\"onDropdownChange($event.target.value)\">\n                    <option *ngFor=\"let option of selectDropdownOptions\" [value]=\"option\" [selected]=\"value == option\">{{option+1}}</option>\n                </select>\n                <select *ngIf=\"responsive\" class=\"ui-carousel-mobiledropdown ui-widget ui-state-default ui-corner-left\" [value]=\"page\" (change)=\"onDropdownChange($event.target.value)\"\n                    [style.display]=\"shrinked ? 'block' : 'none'\">\n                    <option *ngFor=\"let option of mobileDropdownOptions\" [value]=\"option\" [selected]=\"value == option\">{{option+1}}</option>\n                </select>\n            </div>\n            <div class=\"ui-carousel-viewport\">\n                <ul class=\"ui-carousel-items\" [style.left.px]=\"left\" [style.transitionProperty]=\"'left'\" \n                            [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\">\n                    <template ngFor [ngForOf]=\"value\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers, core_1.Renderer])
    ], Carousel);
    return Carousel;
}());
exports.Carousel = Carousel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEwSixlQUFlLENBQUMsQ0FBQTtBQUMxSywyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQWlDN0M7SUE0REksa0JBQW9CLEVBQWMsRUFBVSxVQUFzQixFQUFFLE9BQXdCLEVBQVUsUUFBa0I7UUFBcEcsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBb0MsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXhEL0csZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUl6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLGVBQVUsR0FBVyxHQUFHLENBQUM7UUFFekIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFFN0IsbUJBQWMsR0FBUSxJQUFJLENBQUM7UUFFM0IsV0FBTSxHQUFXLFVBQVUsQ0FBQztRQUU1QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBVXZCLFNBQUksR0FBUSxDQUFDLENBQUM7UUE2QmxCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNULEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUEsQ0FBQyxJQUFJ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REFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztzREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztvREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzsyQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQUVSO1FBQUMsbUJBQVksQ0FBQyxrQkFBVyxDQUFDOztrREFBQTtJQTNEOUI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLCt2RUEwQlQ7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1NBQzFCLENBQUM7O2dCQUFBO0lBa1FGLGVBQUM7QUFBRCxDQWpRQSxBQWlRQyxJQUFBO0FBalFZLGdCQUFRLFdBaVFwQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLE9uSW5pdCxBZnRlclZpZXdJbml0LEFmdGVyVmlld0NoZWNrZWQsRG9DaGVjayxPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEl0ZXJhYmxlRGlmZmVycyxUZW1wbGF0ZVJlZixDb250ZW50Q2hpbGQsUmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jYXJvdXNlbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1oZWFkZXIgdWktd2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1oZWFkZXItdGl0bGVcIj57e2hlYWRlclRleHR9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2Fyb3VzZWwtYnV0dG9uIHVpLWNhcm91c2VsLW5leHQtYnV0dG9uIGZhIGZhLWFycm93LWNpcmNsZS1yaWdodFwiIChjbGljayk9XCJvbk5leHROYXYoKVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6KHBhZ2UgPT09ICh0b3RhbFBhZ2VzLTEpKSAmJiAhY2lyY3VsYXJ9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2Fyb3VzZWwtYnV0dG9uIHVpLWNhcm91c2VsLXByZXYtYnV0dG9uIGZhIGZhLWFycm93LWNpcmNsZS1sZWZ0XCIgKGNsaWNrKT1cIm9uUHJldk5hdigpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzoocGFnZSA9PT0gMCAmJiAhY2lyY3VsYXIpfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZGlzcGxheVBhZ2VMaW5rc1wiIGNsYXNzPVwidWktY2Fyb3VzZWwtcGFnZS1saW5rc1wiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwidWktY2Fyb3VzZWwtcGFnZS1saW5rIGZhIGZhLWNpcmNsZS1vXCIgKm5nRm9yPVwibGV0IGxpbmtzIG9mIGFuY2hvclBhZ2VMaW5rcztsZXQgaT1pbmRleFwiIFtuZ0NsYXNzXT1cInsnZmEtZG90LWNpcmNsZS1vJzpwYWdlPT09aX1cIj48L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCAqbmdJZj1cImRpc3BsYXlQYWdlRHJvcGRvd25cIiBjbGFzcz1cInVpLWNhcm91c2VsLWRyb3Bkb3duIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1sZWZ0XCIgW3ZhbHVlXT1cInBhZ2VcIiAoY2hhbmdlKT1cIm9uRHJvcGRvd25DaGFuZ2UoJGV2ZW50LnRhcmdldC52YWx1ZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHNlbGVjdERyb3Bkb3duT3B0aW9uc1wiIFt2YWx1ZV09XCJvcHRpb25cIiBbc2VsZWN0ZWRdPVwidmFsdWUgPT0gb3B0aW9uXCI+e3tvcHRpb24rMX19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCAqbmdJZj1cInJlc3BvbnNpdmVcIiBjbGFzcz1cInVpLWNhcm91c2VsLW1vYmlsZWRyb3Bkb3duIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1sZWZ0XCIgW3ZhbHVlXT1cInBhZ2VcIiAoY2hhbmdlKT1cIm9uRHJvcGRvd25DaGFuZ2UoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJzaHJpbmtlZCA/ICdibG9jaycgOiAnbm9uZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG1vYmlsZURyb3Bkb3duT3B0aW9uc1wiIFt2YWx1ZV09XCJvcHRpb25cIiBbc2VsZWN0ZWRdPVwidmFsdWUgPT0gb3B0aW9uXCI+e3tvcHRpb24rMX19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC12aWV3cG9ydFwiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLWNhcm91c2VsLWl0ZW1zXCIgW3N0eWxlLmxlZnQucHhdPVwibGVmdFwiIFtzdHlsZS50cmFuc2l0aW9uUHJvcGVydHldPVwiJ2xlZnQnXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25EdXJhdGlvbl09XCJlZmZlY3REdXJhdGlvblwiIFtzdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25dPVwiZWFzaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJ2YWx1ZVwiIFtuZ0ZvclRlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiPjwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsIGltcGxlbWVudHMgT25Jbml0LEFmdGVyVmlld0NoZWNrZWQsQWZ0ZXJWaWV3SW5pdCxEb0NoZWNrLE9uRGVzdHJveXtcbiAgICBcbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W107XG5cbiAgICBASW5wdXQoKSBudW1WaXNpYmxlOiBudW1iZXIgPSAzO1xuXG4gICAgQElucHV0KCkgZmlyc3RWaXNpYmxlOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgaGVhZGVyVGV4dDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY2lyY3VsYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGJyZWFrcG9pbnQ6IG51bWJlciA9IDU2MDtcblxuICAgIEBJbnB1dCgpIHJlc3BvbnNpdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYXV0b3BsYXlJbnRlcnZhbDogbnVtYmVyID0gMDtcbiAgICBcbiAgICBASW5wdXQoKSBlZmZlY3REdXJhdGlvbjogYW55ID0gJzFzJztcbiAgICAgICAgXG4gICAgQElucHV0KCkgZWFzaW5nOiBzdHJpbmcgPSAnZWFzZS1vdXQnO1xuXG4gICAgQElucHV0KCkgcGFnZUxpbmtzOiBudW1iZXIgPSAzO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgICAgIFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBhbnk7ICAgIFxuICAgIFxuICAgIHByaXZhdGUgbGVmdDogYW55ID0gMDtcbiAgICBcbiAgICBwcml2YXRlIHZpZXdwb3J0OiBhbnk7XG4gICAgXG4gICAgcHJpdmF0ZSBpdGVtc0NvbnRhaW5lcjogYW55O1xuICAgIFxuICAgIHByaXZhdGUgaXRlbXM6IGFueTtcbiAgICBcbiAgICBwcml2YXRlIGNvbHVtbnM6IGFueTtcbiAgICAgICAgXG4gICAgcHJpdmF0ZSBwYWdlOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgIHByaXZhdGUgdmFsdWVzQ2hhbmdlZDogYW55O1xuICAgIFxuICAgIHByaXZhdGUgaW50ZXJ2YWw6IGFueTtcbiAgICBcbiAgICBwcml2YXRlIGFuY2hvclBhZ2VMaW5rczogYW55W107XG4gICAgXG4gICAgcHJpdmF0ZSBtb2JpbGVEcm9wZG93bk9wdGlvbnM6IGFueVtdO1xuICAgIFxuICAgIHByaXZhdGUgc2VsZWN0RHJvcGRvd25PcHRpb25zOiBhbnlbXTtcbiAgICBcbiAgICBwcml2YXRlIHNocmlua2VkOiBib29sZWFuO1xuICAgIFxuICAgIGRvY3VtZW50UmVzcG9uc2l2ZUxpc3RlbmVyOiBhbnk7XG4gICAgXG4gICAgZGlmZmVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIsIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5kaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBsZXQgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy52YWx1ZSk7XG4gICAgICAgIFxuICAgICAgICBpZihjaGFuZ2VzKSB7XG4gICAgICAgICAgICBpZih0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy52YWx1ZS5sZW5ndGggJiYgdGhpcy5maXJzdFZpc2libGUgPj0gdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMudG90YWxQYWdlcyAtIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFnZSgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52YWx1ZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2JpbGVEcm9wZG93bigpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYodGhpcy52YWx1ZXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IHRoaXMuYnJlYWtwb2ludCkge1xuICAgICAgICAgICAgdGhpcy5zaHJpbmtlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaHJpbmtlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy5udW1WaXNpYmxlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZSA9IE1hdGguZmxvb3IodGhpcy5maXJzdFZpc2libGUgLyB0aGlzLmNvbHVtbnMpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICAgIHRoaXMudmlld3BvcnQgPSB0aGlzLmRvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXYudWktY2Fyb3VzZWwtdmlld3BvcnQnKTtcbiAgICAgICAgdGhpcy5pdGVtc0NvbnRhaW5lciA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VsLnVpLWNhcm91c2VsLWl0ZW1zJyk7ICAgIFxuXG4gICAgICAgIGlmKHRoaXMucmVzcG9uc2l2ZSkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc3BvbnNpdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCd3aW5kb3cnLCAncmVzaXplJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlTGlua3MoKSB7XG4gICAgICAgIHRoaXMuYW5jaG9yUGFnZUxpbmtzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYW5jaG9yUGFnZUxpbmtzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlRHJvcGRvd24oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0RHJvcGRvd25PcHRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbFBhZ2VzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RHJvcGRvd25PcHRpb25zLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlTW9iaWxlRHJvcGRvd24oKSB7XG4gICAgICAgIHRoaXMubW9iaWxlRHJvcGRvd25PcHRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tb2JpbGVEcm9wZG93bk9wdGlvbnMucHVzaChpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmRvbUhhbmRsZXIuZmluZCh0aGlzLml0ZW1zQ29udGFpbmVyLCdsaScpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUl0ZW1XaWR0aHMoKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCF0aGlzLnJlc3BvbnNpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gKHRoaXMuZG9tSGFuZGxlci53aWR0aCh0aGlzLmNvbnRhaW5lcikpICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLmNpcmN1bGFyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvcGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNhbGN1bGF0ZUl0ZW1XaWR0aHMgKCkge1xuICAgICAgICBsZXQgZmlyc3RJdGVtID0gKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGgpID8gdGhpcy5pdGVtc1swXSA6IG51bGw7XG4gICAgICAgIGlmKGZpcnN0SXRlbSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5zdHlsZS53aWR0aCA9ICgodGhpcy5kb21IYW5kbGVyLmlubmVyV2lkdGgodGhpcy52aWV3cG9ydCkgLSAodGhpcy5kb21IYW5kbGVyLmdldEhvcml6b250YWxNYXJnaW4oZmlyc3RJdGVtKSAqIHRoaXMuY29sdW1ucykpIC8gdGhpcy5jb2x1bW5zKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25OZXh0TmF2KCkge1xuICAgICAgICBsZXQgbGFzdFBhZ2UgPSAodGhpcy5wYWdlID09PSAodGhpcy50b3RhbFBhZ2VzIC0gMSkpO1xuXG4gICAgICAgIGlmKCFsYXN0UGFnZSlcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2UgKyAxKTtcbiAgICAgICAgZWxzZSBpZih0aGlzLmNpcmN1bGFyKVxuICAgICAgICAgICAgdGhpcy5zZXRQYWdlKDApO1xuICAgIH1cbiAgICBcbiAgICBvblByZXZOYXYoKSB7XG4gICAgICAgIGlmKHRoaXMucGFnZSAhPT0gMClcbiAgICAgICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLnBhZ2UgLSAxKTtcbiAgICAgICAgZWxzZSBpZih0aGlzLmNpcmN1bGFyKVxuICAgICAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMudG90YWxQYWdlcyAtIDEpO1xuICAgIH1cbiAgICBcbiAgICBzZXRQYWdlKHAsIGVuZm9yY2U/OiBib29sZWFuKSB7XG4gICAgICAgIGlmKHAgIT09IHRoaXMucGFnZSB8fCBlbmZvcmNlKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBwO1xuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gKC0xICogKHRoaXMuZG9tSGFuZGxlci5pbm5lcldpZHRoKHRoaXMudmlld3BvcnQpICogdGhpcy5wYWdlKSk7XG4gICAgICAgICAgICB0aGlzLmZpcnN0VmlzaWJsZSA9IHRoaXMucGFnZSAqIHRoaXMuY29sdW1ucztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkRyb3Bkb3duQ2hhbmdlKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZShwYXJzZUludCh2YWwpKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRpc3BsYXlQYWdlTGlua3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy50b3RhbFBhZ2VzIDw9IHRoaXMucGFnZUxpbmtzICYmICF0aGlzLnNocmlua2VkKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRpc3BsYXlQYWdlRHJvcGRvd24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy50b3RhbFBhZ2VzID4gdGhpcy5wYWdlTGlua3MgJiYgIXRoaXMuc2hyaW5rZWQpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGgpID8gTWF0aC5jZWlsKHRoaXMudmFsdWUubGVuZ3RoIC8gdGhpcy5jb2x1bW5zKSA6IDA7XG4gICAgfVxuICAgICAgICBcbiAgICByb3V0ZXJEaXNwbGF5ICgpIHtcbiAgICAgICAgbGV0IHdpbiA9IHdpbmRvdztcbiAgICAgICAgaWYod2luLmlubmVyV2lkdGggPD0gdGhpcy5icmVha3BvaW50KVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU3RhdGUoKSB7XG4gICAgICAgIGxldCB3aW4gPSB3aW5kb3c7XG4gICAgICAgIGlmKHdpbi5pbm5lcldpZHRoIDw9IHRoaXMuYnJlYWtwb2ludCkge1xuICAgICAgICAgICAgdGhpcy5zaHJpbmtlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5zaHJpbmtlZCkge1xuICAgICAgICAgICAgdGhpcy5zaHJpbmtlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy5udW1WaXNpYmxlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUl0ZW1XaWR0aHMoKTtcbiAgICAgICAgdGhpcy5zZXRQYWdlKE1hdGguZmxvb3IodGhpcy5maXJzdFZpc2libGUgLyB0aGlzLmNvbHVtbnMpLCB0cnVlKTtcbiAgICB9XG4gICAgXG4gICAgc3RhcnRBdXRvcGxheSgpIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFnZSA9PT0gKHRoaXMudG90YWxQYWdlcyAtIDEpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFnZSgwKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5wYWdlICsgMSk7XG4gICAgICAgIH0sIFxuICAgICAgICB0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIHN0b3BBdXRvcGxheSgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmKHRoaXMucmVzcG9uc2l2ZSkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc3BvbnNpdmVMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG59Il19
