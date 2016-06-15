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
var Galleria = (function () {
    function Galleria(el, domHandler, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.panelWidth = 600;
        this.panelHeight = 400;
        this.frameWidth = 60;
        this.frameHeight = 40;
        this.activeIndex = 0;
        this.showFilmstrip = true;
        this.autoPlay = true;
        this.transitionInterval = 4000;
        this.showCaption = true;
        this.onImageClicked = new core_1.EventEmitter();
        this.stripLeft = 0;
        this.differ = differs.find([]).create(null);
    }
    Galleria.prototype.ngAfterViewChecked = function () {
        if (this.imagesChanged) {
            this.stopSlideshow();
            this.render();
            this.imagesChanged = false;
        }
    };
    Galleria.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.images);
        if (changes && this.initialized) {
            this.activeIndex = 0;
            this.imagesChanged = true;
        }
    };
    Galleria.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        this.panelWrapper = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-galleria-panel-wrapper');
        this.initialized = true;
        if (this.showFilmstrip) {
            this.stripWrapper = this.domHandler.findSingle(this.container, 'div.ui-galleria-filmstrip-wrapper');
            this.strip = this.domHandler.findSingle(this.stripWrapper, 'ul.ui-galleria-filmstrip');
        }
        if (this.images && this.images.length) {
            this.render();
        }
    };
    Galleria.prototype.render = function () {
        this.panels = this.domHandler.find(this.panelWrapper, 'li.ui-galleria-panel');
        if (this.showFilmstrip) {
            this.frames = this.domHandler.find(this.strip, 'li.ui-galleria-frame');
            this.stripWrapper.style.width = this.domHandler.width(this.panelWrapper) - 50 + 'px';
            this.stripWrapper.style.height = this.frameHeight + 'px';
        }
        if (this.showCaption) {
            this.caption = this.domHandler.findSingle(this.container, 'div.ui-galleria-caption');
            this.caption.style.bottom = this.showFilmstrip ? this.domHandler.getOuterHeight(this.stripWrapper, true) + 'px' : 0 + 'px';
            this.caption.style.width = this.domHandler.width(this.panelWrapper) + 'px';
        }
        if (this.autoPlay) {
            this.startSlideshow();
        }
        this.container.style.visibility = 'visible';
    };
    Galleria.prototype.startSlideshow = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.next();
        }, this.transitionInterval);
        this.slideshowActive = true;
    };
    Galleria.prototype.stopSlideshow = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.slideshowActive = false;
    };
    Galleria.prototype.clickNavRight = function () {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.next();
    };
    Galleria.prototype.clickNavLeft = function () {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.prev();
    };
    Galleria.prototype.frameClick = function (frame) {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.select(this.domHandler.index(frame), false);
    };
    Galleria.prototype.prev = function () {
        if (this.activeIndex !== 0) {
            this.select(this.activeIndex - 1, true);
        }
    };
    Galleria.prototype.next = function () {
        if (this.activeIndex !== (this.panels.length - 1)) {
            this.select(this.activeIndex + 1, true);
        }
        else {
            this.select(0, false);
            this.stripLeft = 0;
        }
    };
    Galleria.prototype.select = function (index, reposition) {
        if (index !== this.activeIndex) {
            var oldPanel = this.panels[this.activeIndex], newPanel = this.panels[index];
            this.domHandler.fadeIn(newPanel, 500);
            if (this.showFilmstrip) {
                var oldFrame = this.frames[this.activeIndex], newFrame = this.frames[index];
                if (reposition === undefined || reposition === true) {
                    var frameLeft = newFrame.offsetLeft, stepFactor = this.frameWidth + parseInt(getComputedStyle(newFrame)['margin-right'], 10), stripLeft = this.strip.offsetLeft, frameViewportLeft = frameLeft + stripLeft, frameViewportRight = frameViewportLeft + this.frameWidth;
                    if (frameViewportRight > this.domHandler.width(this.stripWrapper))
                        this.stripLeft -= stepFactor;
                    else if (frameViewportLeft < 0)
                        this.stripLeft += stepFactor;
                }
            }
            this.activeIndex = index;
        }
    };
    Galleria.prototype.clickImage = function (event, image, i) {
        this.onImageClicked.emit({ originalEvent: event, image: image, index: i });
    };
    Galleria.prototype.ngOnDestroy = function () {
        this.stopSlideshow();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Galleria.prototype, "images", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Galleria.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Galleria.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Galleria.prototype, "panelWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Galleria.prototype, "panelHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Galleria.prototype, "frameWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Galleria.prototype, "frameHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Galleria.prototype, "activeIndex", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Galleria.prototype, "showFilmstrip", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Galleria.prototype, "autoPlay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Galleria.prototype, "transitionInterval", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Galleria.prototype, "showCaption", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Galleria.prototype, "onImageClicked", void 0);
    Galleria = __decorate([
        core_1.Component({
            selector: 'p-galleria',
            template: "\n        <div [ngClass]=\"{'ui-galleria ui-widget ui-widget-content ui-corner-all':true}\" [ngStyle]=\"style\" [class]=\"styleClass\" [style.width.px]=\"panelWidth\">\n            <ul class=\"ui-galleria-panel-wrapper\" [style.width.px]=\"panelWidth\" [style.height.px]=\"panelHeight\">\n                <li *ngFor=\"let image of images;let i=index\" class=\"ui-galleria-panel\" [ngClass]=\"{'ui-helper-hidden':i!=activeIndex}\"\n                    [style.width.px]=\"panelWidth\" [style.height.px]=\"panelHeight\" (click)=\"clickImage($event,image,i)\">\n                    <img class=\"ui-panel-images\" [src]=\"image.source\" [alt]=\"image.alt\" [title]=\"image.title\"/>\n                </li>\n            </ul>\n            <div [ngClass]=\"{'ui-galleria-filmstrip-wrapper':true}\" *ngIf=\"showFilmstrip\">\n                <ul class=\"ui-galleria-filmstrip\" style=\"transition:left 1s\" [style.left.px]=\"stripLeft\">\n                    <li #frame *ngFor=\"let image of images;let i=index\" [ngClass]=\"{'ui-galleria-frame-active':i==activeIndex}\" class=\"ui-galleria-frame\" (click)=\"frameClick(frame)\"\n                        [style.width.px]=\"frameWidth\" [style.height.px]=\"frameHeight\" [style.transition]=\"'opacity 0.75s ease'\">\n                        <div class=\"ui-galleria-frame-content\">\n                            <img [src]=\"image.source\" [alt]=\"image.alt\" [title]=\"image.title\" class=\"ui-galleria-frame-image\"\n                                [style.width.px]=\"frameWidth\" [style.height.px]=\"frameHeight\">\n                        </div>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"ui-galleria-nav-prev fa fa-fw fa-chevron-circle-left\" (click)=\"clickNavLeft()\" [style.bottom.px]=\"frameHeight/2\" *ngIf=\"activeIndex !== 0\"></div>\n            <div class=\"ui-galleria-nav-next fa fa-fw fa-chevron-circle-right\" (click)=\"clickNavRight()\" [style.bottom.px]=\"frameHeight/2\"></div>\n            <div class=\"ui-galleria-caption\" *ngIf=\"showCaption&&images\" style=\"display:block\">\n                <h4>{{images[activeIndex]?.title}}</h4><p>{{images[activeIndex]?.alt}}</p>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers])
    ], Galleria);
    return Galleria;
}());
exports.Galleria = Galleria;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZ2FsbGVyaWEvZ2FsbGVyaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFzSCxlQUFlLENBQUMsQ0FBQTtBQUN0SSwyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQWdDN0M7SUFzREksa0JBQW9CLEVBQWMsRUFBVSxVQUFzQixFQUFFLE9BQXdCO1FBQXhFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBOUN6RCxlQUFVLEdBQVcsR0FBRyxDQUFDO1FBRXpCLGdCQUFXLEdBQVcsR0FBRyxDQUFDO1FBRTFCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFFekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFOUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6Qix1QkFBa0IsR0FBVyxJQUFJLENBQUM7UUFFbEMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFM0IsbUJBQWMsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQXNCdEMsY0FBUyxHQUFXLENBQUMsQ0FBQztRQU8xQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxxQ0FBa0IsR0FBbEI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTVDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUVELGtDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLDhCQUE4QixDQUFDLENBQUM7UUFDdEcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFeEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDbkcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDMUYsQ0FBQztRQUVELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO0lBQ0wsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUU5RSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDckYsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzdELENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzFILElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQy9FLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFDeEIsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQsZ0NBQWEsR0FBYjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2YsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsK0JBQVksR0FBWjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsS0FBSztRQUNaLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsdUJBQUksR0FBSjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUJBQUksR0FBSjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUVELHlCQUFNLEdBQU4sVUFBTyxLQUFLLEVBQUUsVUFBVTtRQUNwQixFQUFFLENBQUEsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQzVDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTlCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUV0QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQzVDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUU5QixFQUFFLENBQUEsQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUNuQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3ZGLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFDakMsaUJBQWlCLEdBQUcsU0FBUyxHQUFHLFNBQVMsRUFDekMsa0JBQWtCLEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFFekQsRUFBRSxDQUFBLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUM3RCxJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQztvQkFDakMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQztJQUNMLENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFBO0lBQzVFLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUF2TUQ7UUFBQyxZQUFLLEVBQUU7OzRDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzJDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O29EQUFBO0lBeERiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxzckVBeUJUO1lBQ0QsU0FBUyxFQUFFLENBQUMsdUJBQVUsQ0FBQztTQUMxQixDQUFDOztnQkFBQTtJQTRNRixlQUFDO0FBQUQsQ0EzTUEsQUEyTUMsSUFBQTtBQTNNWSxnQkFBUSxXQTJNcEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2dhbGxlcmlhL2dhbGxlcmlhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdDaGVja2VkLEFmdGVyVmlld0luaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxJdGVyYWJsZURpZmZlcnMsRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAnLi4vZG9tL2RvbWhhbmRsZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZ2FsbGVyaWEnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1nYWxsZXJpYSB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc6dHJ1ZX1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW3N0eWxlLndpZHRoLnB4XT1cInBhbmVsV2lkdGhcIj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLWdhbGxlcmlhLXBhbmVsLXdyYXBwZXJcIiBbc3R5bGUud2lkdGgucHhdPVwicGFuZWxXaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwicGFuZWxIZWlnaHRcIj5cbiAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlcztsZXQgaT1pbmRleFwiIGNsYXNzPVwidWktZ2FsbGVyaWEtcGFuZWxcIiBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOmkhPWFjdGl2ZUluZGV4fVwiXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJwYW5lbFdpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJwYW5lbEhlaWdodFwiIChjbGljayk9XCJjbGlja0ltYWdlKCRldmVudCxpbWFnZSxpKVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwidWktcGFuZWwtaW1hZ2VzXCIgW3NyY109XCJpbWFnZS5zb3VyY2VcIiBbYWx0XT1cImltYWdlLmFsdFwiIFt0aXRsZV09XCJpbWFnZS50aXRsZVwiLz5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1nYWxsZXJpYS1maWxtc3RyaXAtd3JhcHBlcic6dHJ1ZX1cIiAqbmdJZj1cInNob3dGaWxtc3RyaXBcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJ1aS1nYWxsZXJpYS1maWxtc3RyaXBcIiBzdHlsZT1cInRyYW5zaXRpb246bGVmdCAxc1wiIFtzdHlsZS5sZWZ0LnB4XT1cInN0cmlwTGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgI2ZyYW1lICpuZ0Zvcj1cImxldCBpbWFnZSBvZiBpbWFnZXM7bGV0IGk9aW5kZXhcIiBbbmdDbGFzc109XCJ7J3VpLWdhbGxlcmlhLWZyYW1lLWFjdGl2ZSc6aT09YWN0aXZlSW5kZXh9XCIgY2xhc3M9XCJ1aS1nYWxsZXJpYS1mcmFtZVwiIChjbGljayk9XCJmcmFtZUNsaWNrKGZyYW1lKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwiZnJhbWVXaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwiZnJhbWVIZWlnaHRcIiBbc3R5bGUudHJhbnNpdGlvbl09XCInb3BhY2l0eSAwLjc1cyBlYXNlJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWdhbGxlcmlhLWZyYW1lLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2Uuc291cmNlXCIgW2FsdF09XCJpbWFnZS5hbHRcIiBbdGl0bGVdPVwiaW1hZ2UudGl0bGVcIiBjbGFzcz1cInVpLWdhbGxlcmlhLWZyYW1lLWltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImZyYW1lV2lkdGhcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cImZyYW1lSGVpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ2FsbGVyaWEtbmF2LXByZXYgZmEgZmEtZncgZmEtY2hldnJvbi1jaXJjbGUtbGVmdFwiIChjbGljayk9XCJjbGlja05hdkxlZnQoKVwiIFtzdHlsZS5ib3R0b20ucHhdPVwiZnJhbWVIZWlnaHQvMlwiICpuZ0lmPVwiYWN0aXZlSW5kZXggIT09IDBcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nYWxsZXJpYS1uYXYtbmV4dCBmYSBmYS1mdyBmYS1jaGV2cm9uLWNpcmNsZS1yaWdodFwiIChjbGljayk9XCJjbGlja05hdlJpZ2h0KClcIiBbc3R5bGUuYm90dG9tLnB4XT1cImZyYW1lSGVpZ2h0LzJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nYWxsZXJpYS1jYXB0aW9uXCIgKm5nSWY9XCJzaG93Q2FwdGlvbiYmaW1hZ2VzXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCI+XG4gICAgICAgICAgICAgICAgPGg0Pnt7aW1hZ2VzW2FjdGl2ZUluZGV4XT8udGl0bGV9fTwvaDQ+PHA+e3tpbWFnZXNbYWN0aXZlSW5kZXhdPy5hbHR9fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcmlhIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCxBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG4gICAgXG4gICAgQElucHV0KCkgaW1hZ2VzOiBhbnlbXTtcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcGFuZWxXaWR0aDogbnVtYmVyID0gNjAwO1xuXG4gICAgQElucHV0KCkgcGFuZWxIZWlnaHQ6IG51bWJlciA9IDQwMDtcblxuICAgIEBJbnB1dCgpIGZyYW1lV2lkdGg6IG51bWJlciA9IDYwO1xuICAgIFxuICAgIEBJbnB1dCgpIGZyYW1lSGVpZ2h0OiBudW1iZXIgPSA0MDtcblxuICAgIEBJbnB1dCgpIGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgc2hvd0ZpbG1zdHJpcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBhdXRvUGxheTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uSW50ZXJ2YWw6IG51bWJlciA9IDQwMDA7XG5cbiAgICBASW5wdXQoKSBzaG93Q2FwdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uSW1hZ2VDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIGRpZmZlcjogYW55O1xuICAgIFxuICAgIHNsaWRlc2hvd0FjdGl2ZTogYm9vbGVhbjtcbiAgICBcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogYW55O1xuICAgIFxuICAgIHByaXZhdGUgcGFuZWxXcmFwcGVyOiBhbnk7XG4gICAgXG4gICAgcHJpdmF0ZSBwYW5lbHM6IGFueTtcbiAgICBcbiAgICBwcml2YXRlIGNhcHRpb246IGFueTtcbiAgICBcbiAgICBwcml2YXRlIHN0cmlwV3JhcHBlcjogYW55O1xuICAgIFxuICAgIHByaXZhdGUgc3RyaXA6IGFueTtcbiAgICBcbiAgICBwcml2YXRlIGZyYW1lczogYW55O1xuICAgIFxuICAgIHByaXZhdGUgaW50ZXJ2YWw6IGFueTtcbiAgICBcbiAgICBwcml2YXRlIHN0cmlwTGVmdDogbnVtYmVyID0gMDtcbiAgICBcbiAgICBwcml2YXRlIGltYWdlc0NoYW5nZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgZG9tSGFuZGxlcjogRG9tSGFuZGxlciwgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzKSB7XG4gICAgICAgIHRoaXMuZGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYodGhpcy5pbWFnZXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BTbGlkZXNob3coKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLmltYWdlc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGxldCBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLmltYWdlcyk7XG4gICAgICAgIFxuICAgICAgICBpZihjaGFuZ2VzICYmIHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5pbWFnZXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgICB0aGlzLnBhbmVsV3JhcHBlciA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VsLnVpLWdhbGxlcmlhLXBhbmVsLXdyYXBwZXInKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnNob3dGaWxtc3RyaXApIHtcbiAgICAgICAgICAgIHRoaXMuc3RyaXBXcmFwcGVyID0gdGhpcy5kb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsJ2Rpdi51aS1nYWxsZXJpYS1maWxtc3RyaXAtd3JhcHBlcicpO1xuICAgICAgICAgICAgdGhpcy5zdHJpcCA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuc3RyaXBXcmFwcGVyLCd1bC51aS1nYWxsZXJpYS1maWxtc3RyaXAnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5pbWFnZXMgJiYgdGhpcy5pbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9IFxuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMucGFuZWxzID0gdGhpcy5kb21IYW5kbGVyLmZpbmQodGhpcy5wYW5lbFdyYXBwZXIsICdsaS51aS1nYWxsZXJpYS1wYW5lbCcpOyBcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2hvd0ZpbG1zdHJpcCkge1xuICAgICAgICAgICAgdGhpcy5mcmFtZXMgPSB0aGlzLmRvbUhhbmRsZXIuZmluZCh0aGlzLnN0cmlwLCdsaS51aS1nYWxsZXJpYS1mcmFtZScpO1xuICAgICAgICAgICAgdGhpcy5zdHJpcFdyYXBwZXIuc3R5bGUud2lkdGggPSB0aGlzLmRvbUhhbmRsZXIud2lkdGgodGhpcy5wYW5lbFdyYXBwZXIpIC0gNTAgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5zdHJpcFdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5mcmFtZUhlaWdodCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2hvd0NhcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2FwdGlvbiA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCdkaXYudWktZ2FsbGVyaWEtY2FwdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5jYXB0aW9uLnN0eWxlLmJvdHRvbSA9IHRoaXMuc2hvd0ZpbG1zdHJpcCA/IHRoaXMuZG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnN0cmlwV3JhcHBlcix0cnVlKSArICdweCcgOiAwICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY2FwdGlvbi5zdHlsZS53aWR0aCA9IHRoaXMuZG9tSGFuZGxlci53aWR0aCh0aGlzLnBhbmVsV3JhcHBlcikgKyAncHgnO1xuICAgICAgICB9XG4gICBcbiAgICAgICAgaWYodGhpcy5hdXRvUGxheSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydFNsaWRlc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIH1cbiAgICBcbiAgICBzdGFydFNsaWRlc2hvdygpIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9LCB0aGlzLnRyYW5zaXRpb25JbnRlcnZhbCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNsaWRlc2hvd0FjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgICAgICBcbiAgICBzdG9wU2xpZGVzaG93KCkge1xuICAgICAgICBpZih0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNsaWRlc2hvd0FjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBjbGlja05hdlJpZ2h0KCkge1xuICAgICAgICBpZih0aGlzLnNsaWRlc2hvd0FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVzaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfSBcbiAgICBcbiAgICBjbGlja05hdkxlZnQoKSB7XG4gICAgICAgIGlmKHRoaXMuc2xpZGVzaG93QWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BTbGlkZXNob3coKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXYoKTtcbiAgICB9XG4gICAgXG4gICAgZnJhbWVDbGljayhmcmFtZSkge1xuICAgICAgICBpZih0aGlzLnNsaWRlc2hvd0FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVzaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuZG9tSGFuZGxlci5pbmRleChmcmFtZSksIGZhbHNlKTtcbiAgICB9XG4gICAgXG4gICAgcHJldigpIHtcbiAgICAgICAgaWYodGhpcy5hY3RpdmVJbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QodGhpcy5hY3RpdmVJbmRleCAtIDEsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5leHQoKSB7XG4gICAgICAgIGlmKHRoaXMuYWN0aXZlSW5kZXggIT09ICh0aGlzLnBhbmVscy5sZW5ndGgtMSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuYWN0aXZlSW5kZXggKyAxLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KDAsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuc3RyaXBMZWZ0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgc2VsZWN0KGluZGV4LCByZXBvc2l0aW9uKSB7XG4gICAgICAgIGlmKGluZGV4ICE9PSB0aGlzLmFjdGl2ZUluZGV4KSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgb2xkUGFuZWwgPSB0aGlzLnBhbmVsc1t0aGlzLmFjdGl2ZUluZGV4XSxcbiAgICAgICAgICAgIG5ld1BhbmVsID0gdGhpcy5wYW5lbHNbaW5kZXhdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuZmFkZUluKG5ld1BhbmVsLCA1MDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLnNob3dGaWxtc3RyaXApIHtcbiAgICAgICAgICAgICAgICBsZXQgb2xkRnJhbWUgPSB0aGlzLmZyYW1lc1t0aGlzLmFjdGl2ZUluZGV4XSxcbiAgICAgICAgICAgICAgICBuZXdGcmFtZSA9IHRoaXMuZnJhbWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihyZXBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcmVwb3NpdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJhbWVMZWZ0ID0gbmV3RnJhbWUub2Zmc2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcEZhY3RvciA9IHRoaXMuZnJhbWVXaWR0aCArIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUobmV3RnJhbWUpWydtYXJnaW4tcmlnaHQnXSwgMTApLFxuICAgICAgICAgICAgICAgICAgICBzdHJpcExlZnQgPSB0aGlzLnN0cmlwLm9mZnNldExlZnQsXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lVmlld3BvcnRMZWZ0ID0gZnJhbWVMZWZ0ICsgc3RyaXBMZWZ0LFxuICAgICAgICAgICAgICAgICAgICBmcmFtZVZpZXdwb3J0UmlnaHQgPSBmcmFtZVZpZXdwb3J0TGVmdCArIHRoaXMuZnJhbWVXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKGZyYW1lVmlld3BvcnRSaWdodCA+IHRoaXMuZG9tSGFuZGxlci53aWR0aCh0aGlzLnN0cmlwV3JhcHBlcikpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0cmlwTGVmdCAtPSBzdGVwRmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGZyYW1lVmlld3BvcnRMZWZ0IDwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RyaXBMZWZ0ICs9IHN0ZXBGYWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY2xpY2tJbWFnZShldmVudCwgaW1hZ2UsIGkpIHtcbiAgICAgICAgdGhpcy5vbkltYWdlQ2xpY2tlZC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgaW1hZ2U6IGltYWdlLCBpbmRleDogaX0pXG4gICAgfVxuICAgICAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdG9wU2xpZGVzaG93KCk7XG4gICAgfVxuXG59Il19
