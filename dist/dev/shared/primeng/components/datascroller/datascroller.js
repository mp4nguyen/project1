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
var header_1 = require('../common/header');
var footer_1 = require('../common/footer');
var domhandler_1 = require('../dom/domhandler');
var DataScroller = (function () {
    function DataScroller(el, differs, renderer, domHandler) {
        this.el = el;
        this.renderer = renderer;
        this.domHandler = domHandler;
        this.onLazyLoad = new core_1.EventEmitter();
        this.buffer = 0.9;
        this.dataToRender = [];
        this.first = 0;
        this.differ = differs.find([]).create(null);
    }
    DataScroller.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.lazy) {
            this.load();
        }
        if (this.loader) {
            this.scrollFunction = this.renderer.listen(this.loader, 'click', function () {
                _this.load();
            });
        }
        else {
            this.bindScrollListener();
        }
    };
    DataScroller.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.lazy)
                this.dataToRender = this.value;
            else
                this.load();
        }
    };
    DataScroller.prototype.load = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
        else {
            for (var i = this.first; i < (this.first + this.rows); i++) {
                if (i >= this.value.length) {
                    break;
                }
                this.dataToRender.push(this.value[i]);
            }
        }
        this.first = this.first + this.rows;
    };
    DataScroller.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataScroller.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    DataScroller.prototype.bindScrollListener = function () {
        var _this = this;
        if (this.inline) {
            this.contentElement = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-datascroller-content');
            this.scrollFunction = this.renderer.listen(this.contentElement, 'scroll', function () {
                var scrollTop = _this.contentElement.scrollTop;
                var scrollHeight = _this.contentElement.scrollHeight;
                var viewportHeight = _this.contentElement.clientHeight;
                if ((scrollTop >= ((scrollHeight * _this.buffer) - (viewportHeight)))) {
                    _this.load();
                }
            });
        }
        else {
            this.scrollFunction = this.renderer.listenGlobal('window', 'scroll', function () {
                var docBody = document.body;
                var docElement = document.documentElement;
                var scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
                var winHeight = docElement.clientHeight;
                var docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);
                if (scrollTop >= ((docHeight * _this.buffer) - winHeight)) {
                    _this.load();
                }
            });
        }
    };
    DataScroller.prototype.ngOnDestroy = function () {
        if (this.scrollFunction) {
            this.scrollFunction();
            this.contentElement = null;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataScroller.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataScroller.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataScroller.prototype, "lazy", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataScroller.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataScroller.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataScroller.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataScroller.prototype, "buffer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataScroller.prototype, "inline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataScroller.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.ContentChild(header_1.Header), 
        __metadata('design:type', Object)
    ], DataScroller.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(footer_1.Footer), 
        __metadata('design:type', Object)
    ], DataScroller.prototype, "footer", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataScroller.prototype, "itemTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataScroller.prototype, "loader", void 0);
    DataScroller = __decorate([
        core_1.Component({
            selector: 'p-dataScroller',
            template: "\n    <div [ngClass]=\"{'ui-datascroller ui-widget': true, 'ui-datascroller-inline': inline}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n        <div class=\"ui-datascroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n            <ng-content select=\"header\"></ng-content>\n        </div>\n        <div class=\"ui-datascroller-content ui-widget-content\" [ngStyle]=\"{'max-height': scrollHeight}\">\n            <ul class=\"ui-datascroller-list\">\n                <template ngFor [ngForOf]=\"dataToRender\" [ngForTemplate]=\"itemTemplate\"></template>\n            </ul>\n        </div>\n        <div class=\"ui-datascroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n            <ng-content select=\"footer\"></ng-content>\n        </div>\n    </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers, core_1.Renderer, domhandler_1.DomHandler])
    ], DataScroller);
    return DataScroller;
}());
exports.DataScroller = DataScroller;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZGF0YXNjcm9sbGVyL2RhdGFzY3JvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQStJLGVBQWUsQ0FBQyxDQUFBO0FBQy9KLHVCQUFxQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3hDLHVCQUFxQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3hDLDJCQUF5QixtQkFBbUIsQ0FBQyxDQUFBO0FBcUI3QztJQXNDSSxzQkFBb0IsRUFBYyxFQUFFLE9BQXdCLEVBQVUsUUFBa0IsRUFBVSxVQUFzQjtRQUFwRyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQW9DLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBOUI5RyxlQUFVLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBTXBELFdBQU0sR0FBVyxHQUFHLENBQUM7UUFjdEIsaUJBQVksR0FBVSxFQUFFLENBQUM7UUFFekIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQVN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxzQ0FBZSxHQUFmO1FBQUEsaUJBYUM7UUFaRyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBRUQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFO2dCQUM3RCxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNULEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDO0lBRUQsMkJBQUksR0FBSjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2xCLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDeEQsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDeEIsS0FBSyxDQUFDO2dCQUNWLENBQUM7Z0JBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVELDhCQUFPLEdBQVA7UUFDSSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELDZDQUFzQixHQUF0QjtRQUNJLE1BQU0sQ0FBQztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEIsQ0FBQztJQUNOLENBQUM7SUFFRCx5Q0FBa0IsR0FBbEI7UUFBQSxpQkE0QkM7UUEzQkcsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLDZCQUE2QixDQUFDLENBQUM7WUFFdkcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRTtnQkFDdEUsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Z0JBQzlDLElBQUksWUFBWSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO2dCQUNwRCxJQUFJLGNBQWMsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQztnQkFFdEQsRUFBRSxDQUFBLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRSxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRTtnQkFDakUsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDNUIsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztnQkFDMUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pFLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFbEksRUFBRSxDQUFBLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBRUwsQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFFSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFwSUQ7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O29EQUFBO0lBRVQ7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O29EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3NEQUFBO0lBRVI7UUFBQyxtQkFBWSxDQUFDLGVBQU0sQ0FBQzs7Z0RBQUE7SUFFckI7UUFBQyxtQkFBWSxDQUFDLGVBQU0sQ0FBQzs7Z0RBQUE7SUFFckI7UUFBQyxtQkFBWSxDQUFDLGtCQUFXLENBQUM7O3NEQUFBO0lBRTFCO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQTdDWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSw4eEJBY1Q7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1NBQzFCLENBQUM7O29CQUFBO0lBd0lGLG1CQUFDO0FBQUQsQ0F2SUEsQUF1SUMsSUFBQTtBQXZJWSxvQkFBWSxlQXVJeEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2RhdGFzY3JvbGxlci9kYXRhc2Nyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LERvQ2hlY2ssSW5wdXQsT3V0cHV0LFJlbmRlcmVyLEV2ZW50RW1pdHRlcixDb250ZW50Q2hpbGQsSXRlcmFibGVEaWZmZXJzLFRlbXBsYXRlUmVmfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7SGVhZGVyfSBmcm9tICcuLi9jb21tb24vaGVhZGVyJztcbmltcG9ydCB7Rm9vdGVyfSBmcm9tICcuLi9jb21tb24vZm9vdGVyJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAnLi4vZG9tL2RvbWhhbmRsZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZGF0YVNjcm9sbGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1kYXRhc2Nyb2xsZXIgdWktd2lkZ2V0JzogdHJ1ZSwgJ3VpLWRhdGFzY3JvbGxlci1pbmxpbmUnOiBpbmxpbmV9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXNjcm9sbGVyLWhlYWRlciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci10b3BcIiAqbmdJZj1cImhlYWRlclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGFzY3JvbGxlci1jb250ZW50IHVpLXdpZGdldC1jb250ZW50XCIgW25nU3R5bGVdPVwieydtYXgtaGVpZ2h0Jzogc2Nyb2xsSGVpZ2h0fVwiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktZGF0YXNjcm9sbGVyLWxpc3RcIj5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiZGF0YVRvUmVuZGVyXCIgW25nRm9yVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCI+PC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXNjcm9sbGVyLWZvb3RlciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1ib3R0b21cIiAqbmdJZj1cImZvb3RlclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFTY3JvbGxlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsRG9DaGVjayxPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdmFsdWU6IGFueVtdO1xuXG4gICAgQElucHV0KCkgcm93czogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbGF6eTogYm9vbGVhbjtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25MYXp5TG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGJ1ZmZlcjogbnVtYmVyID0gMC45O1xuICAgIFxuICAgIEBJbnB1dCgpIGlubGluZTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IGFueTtcbiAgICAgICAgXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlcjtcblxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXI7XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIFxuICAgIEBJbnB1dCgpIGxvYWRlcjogYW55O1xuXG4gICAgcHJpdmF0ZSBkYXRhVG9SZW5kZXI6IGFueVtdID0gW107XG5cbiAgICBwcml2YXRlIGZpcnN0OiBudW1iZXIgPSAwO1xuICAgIFxuICAgIGRpZmZlcjogYW55O1xuICAgIFxuICAgIHNjcm9sbEZ1bmN0aW9uOiBhbnk7XG4gICAgXG4gICAgY29udGVudEVsZW1lbnQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIsIHByaXZhdGUgZG9tSGFuZGxlcjogRG9tSGFuZGxlcikge1xuICAgICAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5sb2FkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRnVuY3Rpb24gPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmxvYWRlciwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgbGV0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIGlmKGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubGF6eSlcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFUb1JlbmRlciA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbG9hZCgpIHtcbiAgICAgICAgaWYodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICAgICAgcm93czogdGhpcy5yb3dzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHRoaXMuZmlyc3Q7IGkgPCAodGhpcy5maXJzdCArIHRoaXMucm93cyk7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmKGkgPj0gdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhVG9SZW5kZXIucHVzaCh0aGlzLnZhbHVlW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy5maXJzdCArIHRoaXMucm93cztcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuZGF0YVRvUmVuZGVyfHwodGhpcy5kYXRhVG9SZW5kZXIubGVuZ3RoID09IDApO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgIHJvd3M6IHRoaXMucm93c1xuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBiaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmKHRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRFbGVtZW50ID0gdGhpcy5kb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZGl2LnVpLWRhdGFzY3JvbGxlci1jb250ZW50Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsRnVuY3Rpb24gPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmNvbnRlbnRFbGVtZW50LCAnc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzY3JvbGxUb3AgPSB0aGlzLmNvbnRlbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5jb250ZW50RWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgbGV0IHZpZXdwb3J0SGVpZ2h0ID0gdGhpcy5jb250ZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBpZigoc2Nyb2xsVG9wID49ICgoc2Nyb2xsSGVpZ2h0ICogdGhpcy5idWZmZXIpIC0gKHZpZXdwb3J0SGVpZ2h0KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxGdW5jdGlvbiA9IHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCd3aW5kb3cnLCAnc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkb2NCb2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgICAgICBsZXQgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsVG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgICAgICAgICAgICAgbGV0IHdpbkhlaWdodCA9IGRvY0VsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgICAgIGxldCBkb2NIZWlnaHQgPSBNYXRoLm1heChkb2NCb2R5LnNjcm9sbEhlaWdodCwgZG9jQm9keS5vZmZzZXRIZWlnaHQsIHdpbkhlaWdodCwgZG9jRWxlbWVudC5zY3JvbGxIZWlnaHQsIGRvY0VsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihzY3JvbGxUb3AgPj0gKChkb2NIZWlnaHQgKiB0aGlzLmJ1ZmZlcikgLSB3aW5IZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy91bmJpbmRcbiAgICAgICAgaWYodGhpcy5zY3JvbGxGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxGdW5jdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50RWxlbWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
