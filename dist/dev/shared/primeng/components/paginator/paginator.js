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
var Paginator = (function () {
    function Paginator() {
        this.rows = 0;
        this.first = 0;
        this.pageLinkSize = 5;
        this.onPageChange = new core_1.EventEmitter();
        this._totalRecords = 0;
    }
    Object.defineProperty(Paginator.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.updatePageLinks();
        },
        enumerable: true,
        configurable: true
    });
    Paginator.prototype.isFirstPage = function () {
        return this.getPage() === 0;
    };
    Paginator.prototype.isLastPage = function () {
        return this.getPage() === this.getPageCount() - 1;
    };
    Paginator.prototype.getPageCount = function () {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    };
    Paginator.prototype.calculatePageLinkBoundaries = function () {
        var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    };
    Paginator.prototype.updatePageLinks = function () {
        this.pageLinks = [];
        var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (var i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    };
    Paginator.prototype.changePage = function (p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this.first = this.rows * p;
            var state = {
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
        }
    };
    Paginator.prototype.getPage = function () {
        return Math.floor(this.first / this.rows);
    };
    Paginator.prototype.changePageToFirst = function () {
        this.changePage(0);
    };
    Paginator.prototype.changePageToPrev = function () {
        this.changePage(this.getPage() - 1);
    };
    Paginator.prototype.changePageToNext = function () {
        this.changePage(this.getPage() + 1);
    };
    Paginator.prototype.changePageToLast = function () {
        this.changePage(this.getPageCount() - 1);
    };
    Paginator.prototype.onRppChange = function (event) {
        this.rows = this.rowsPerPageOptions[event.target.selectedIndex];
        this.changePageToFirst();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "first", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "pageLinkSize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Paginator.prototype, "onPageChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Paginator.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Paginator.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Paginator.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Paginator.prototype, "totalRecords", null);
    Paginator = __decorate([
        core_1.Component({
            selector: 'p-paginator',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'ui-paginator ui-widget-header ui-unselectable-text':true}\">\n            <span #firstlink class=\"ui-paginator-first ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                        (click)=\"changePageToFirst()\" [ngClass]=\"{'ui-state-disabled':isFirstPage(),'ui-state-hover':(firstlink === hoveredItem && !isFirstPage())}\">\n                <span class=\"fa fa-step-backward\"></span>\n            </span>\n            <span #prevlink class=\"ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                    (click)=\"changePageToPrev()\" [ngClass]=\"{'ui-state-disabled':isFirstPage(),'ui-state-hover':(prevlink === hoveredItem && !isFirstPage())}\">\n                <span class=\"fa fa-backward\"></span>\n            </span>\n            <span class=\"ui-paginator-pages\">\n                <span #plink *ngFor=\"let pageLink of pageLinks\" class=\"ui-paginator-page ui-paginator-element ui-state-default ui-corner-all\"\n                    (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\" (click)=\"changePage(pageLink - 1)\"\n                    [ngClass]=\"{'ui-state-hover':(plink === hoveredItem), 'ui-state-active': (pageLink-1 == getPage())}\">{{pageLink}}</span>\n            </span>\n            <span #nextlink class=\"ui-paginator-next ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                    (click)=\"changePageToNext()\" [ngClass]=\"{'ui-state-disabled':isLastPage(),'ui-state-hover':(nextlink === hoveredItem  && !isLastPage())}\">\n                <span class=\"fa fa-forward\"></span>\n            </span>\n            <span #lastlink class=\"ui-paginator-last ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                    (click)=\"changePageToLast()\" [ngClass]=\"{'ui-state-disabled':isLastPage(),'ui-state-hover':(lastlink === hoveredItem  && !isLastPage())}\">\n                <span class=\"fa fa-step-forward\"></span>\n            </span>\n            <select class=\"ui-paginator-rpp-options ui-widget ui-state-default\" *ngIf=\"rowsPerPageOptions\" (change)=\"onRppChange($event)\">\n                <option *ngFor=\"let opt of rowsPerPageOptions\" [value]=\"opt\" [selected]=\"rows == opt\">{{opt}}</option>\n            </select>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Paginator);
    return Paginator;
}());
exports.Paginator = Paginator;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvcGFnaW5hdG9yL3BhZ2luYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBFLGVBQWUsQ0FBQyxDQUFBO0FBaUMxRjtJQUFBO1FBRWEsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUVqQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGlCQUFZLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBVS9ELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO0lBMEY5QixDQUFDO0lBeEZZLHNCQUFJLG1DQUFZO2FBQWhCO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLEdBQVU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUxBO0lBT0QsK0JBQVcsR0FBWDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCw4QkFBVSxHQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxnQ0FBWSxHQUFaO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCwrQ0FBMkIsR0FBM0I7UUFDSSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQ3ZDLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7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QixDQUFDO0lBekdEO1FBQUMsWUFBSyxFQUFFOzsyQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzttREFBQTtJQUVSO1FBQUMsYUFBTSxFQUFFOzttREFBQTtJQUVUO1FBQUMsWUFBSyxFQUFFOzs0Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzt5REFBQTtJQU1SO1FBQUMsWUFBSyxFQUFFOztpREFBQTtJQW5EWjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUscW9GQTJCVDtTQUNKLENBQUM7O2lCQUFBO0lBNkdGLGdCQUFDO0FBQUQsQ0E1R0EsQUE0R0MsSUFBQTtBQTVHWSxpQkFBUyxZQTRHckIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL3BhZ2luYXRvci9wYWdpbmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLElucHV0LE91dHB1dCxTaW1wbGVDaGFuZ2UsRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXBhZ2luYXRvcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwieyd1aS1wYWdpbmF0b3IgdWktd2lkZ2V0LWhlYWRlciB1aS11bnNlbGVjdGFibGUtdGV4dCc6dHJ1ZX1cIj5cbiAgICAgICAgICAgIDxzcGFuICNmaXJzdGxpbmsgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItZmlyc3QgdWktcGFnaW5hdG9yLWVsZW1lbnQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgKG1vdXNlZW50ZXIpPVwiaG92ZXJlZEl0ZW0gPSAkZXZlbnQudGFyZ2V0XCIgKG1vdXNlbGVhdmUpPVwiaG92ZXJlZEl0ZW0gPSBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9GaXJzdCgpXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXNGaXJzdFBhZ2UoKSwndWktc3RhdGUtaG92ZXInOihmaXJzdGxpbmsgPT09IGhvdmVyZWRJdGVtICYmICFpc0ZpcnN0UGFnZSgpKX1cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLXN0ZXAtYmFja3dhcmRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAjcHJldmxpbmsgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItcHJldiB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiAobW91c2VlbnRlcik9XCJob3ZlcmVkSXRlbSA9ICRldmVudC50YXJnZXRcIiAobW91c2VsZWF2ZSk9XCJob3ZlcmVkSXRlbSA9IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlUGFnZVRvUHJldigpXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXNGaXJzdFBhZ2UoKSwndWktc3RhdGUtaG92ZXInOihwcmV2bGluayA9PT0gaG92ZXJlZEl0ZW0gJiYgIWlzRmlyc3RQYWdlKCkpfVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtYmFja3dhcmRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhZ2luYXRvci1wYWdlc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuICNwbGluayAqbmdGb3I9XCJsZXQgcGFnZUxpbmsgb2YgcGFnZUxpbmtzXCIgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItcGFnZSB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJob3ZlcmVkSXRlbSA9ICRldmVudC50YXJnZXRcIiAobW91c2VsZWF2ZSk9XCJob3ZlcmVkSXRlbSA9IG51bGxcIiAoY2xpY2spPVwiY2hhbmdlUGFnZShwYWdlTGluayAtIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1ob3Zlcic6KHBsaW5rID09PSBob3ZlcmVkSXRlbSksICd1aS1zdGF0ZS1hY3RpdmUnOiAocGFnZUxpbmstMSA9PSBnZXRQYWdlKCkpfVwiPnt7cGFnZUxpbmt9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICNuZXh0bGluayBjbGFzcz1cInVpLXBhZ2luYXRvci1uZXh0IHVpLXBhZ2luYXRvci1lbGVtZW50IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIChtb3VzZWVudGVyKT1cImhvdmVyZWRJdGVtID0gJGV2ZW50LnRhcmdldFwiIChtb3VzZWxlYXZlKT1cImhvdmVyZWRJdGVtID0gbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9OZXh0KClcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppc0xhc3RQYWdlKCksJ3VpLXN0YXRlLWhvdmVyJzoobmV4dGxpbmsgPT09IGhvdmVyZWRJdGVtICAmJiAhaXNMYXN0UGFnZSgpKX1cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWZvcndhcmRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAjbGFzdGxpbmsgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItbGFzdCB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiAobW91c2VlbnRlcik9XCJob3ZlcmVkSXRlbSA9ICRldmVudC50YXJnZXRcIiAobW91c2VsZWF2ZSk9XCJob3ZlcmVkSXRlbSA9IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlUGFnZVRvTGFzdCgpXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXNMYXN0UGFnZSgpLCd1aS1zdGF0ZS1ob3Zlcic6KGxhc3RsaW5rID09PSBob3ZlcmVkSXRlbSAgJiYgIWlzTGFzdFBhZ2UoKSl9XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1zdGVwLWZvcndhcmRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwidWktcGFnaW5hdG9yLXJwcC1vcHRpb25zIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0XCIgKm5nSWY9XCJyb3dzUGVyUGFnZU9wdGlvbnNcIiAoY2hhbmdlKT1cIm9uUnBwQ2hhbmdlKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHQgb2Ygcm93c1BlclBhZ2VPcHRpb25zXCIgW3ZhbHVlXT1cIm9wdFwiIFtzZWxlY3RlZF09XCJyb3dzID09IG9wdFwiPnt7b3B0fX08L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRvciB7XG5cbiAgICBASW5wdXQoKSByb3dzOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgZmlyc3Q6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBwYWdlTGlua1NpemU6IG51bWJlciA9IDU7XG5cbiAgICBAT3V0cHV0KCkgb25QYWdlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgcm93c1BlclBhZ2VPcHRpb25zOiBudW1iZXJbXTtcblxuICAgIHBhZ2VMaW5rczogbnVtYmVyW107XG5cbiAgICBfdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgZ2V0IHRvdGFsUmVjb3JkcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG90YWxSZWNvcmRzO1xuICAgIH1cblxuICAgIHNldCB0b3RhbFJlY29yZHModmFsOm51bWJlcikge1xuICAgICAgICB0aGlzLl90b3RhbFJlY29yZHMgPSB2YWw7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG4gICAgfVxuXG4gICAgaXNGaXJzdFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2UoKSA9PT0gMDtcbiAgICB9XG5cbiAgICBpc0xhc3RQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYWdlKCkgPT09IHRoaXMuZ2V0UGFnZUNvdW50KCkgLSAxO1xuICAgIH1cblxuICAgIGdldFBhZ2VDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsUmVjb3Jkcy90aGlzLnJvd3MpfHwxO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVBhZ2VMaW5rQm91bmRhcmllcygpIHtcbiAgICAgICAgbGV0IG51bWJlck9mUGFnZXMgPSB0aGlzLmdldFBhZ2VDb3VudCgpLFxuICAgICAgICB2aXNpYmxlUGFnZXMgPSBNYXRoLm1pbih0aGlzLnBhZ2VMaW5rU2l6ZSwgbnVtYmVyT2ZQYWdlcyk7XG5cbiAgICAgICAgLy9jYWxjdWxhdGUgcmFuZ2UsIGtlZXAgY3VycmVudCBpbiBtaWRkbGUgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGxldCBzdGFydCA9IE1hdGgubWF4KDAsIE1hdGguY2VpbCh0aGlzLmdldFBhZ2UoKSAtICgodmlzaWJsZVBhZ2VzKSAvIDIpKSksXG4gICAgICAgIGVuZCA9IE1hdGgubWluKG51bWJlck9mUGFnZXMgLSAxLCBzdGFydCArIHZpc2libGVQYWdlcyAtIDEpO1xuXG4gICAgICAgIC8vY2hlY2sgd2hlbiBhcHByb2FjaGluZyB0byBsYXN0IHBhZ2VcbiAgICAgICAgdmFyIGRlbHRhID0gdGhpcy5wYWdlTGlua1NpemUgLSAoZW5kIC0gc3RhcnQgKyAxKTtcbiAgICAgICAgc3RhcnQgPSBNYXRoLm1heCgwLCBzdGFydCAtIGRlbHRhKTtcblxuICAgICAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICAgIH1cblxuICAgIHVwZGF0ZVBhZ2VMaW5rcygpIHtcbiAgICAgICAgdGhpcy5wYWdlTGlua3MgPSBbXTtcbiAgICAgICAgbGV0IGJvdW5kYXJpZXMgPSB0aGlzLmNhbGN1bGF0ZVBhZ2VMaW5rQm91bmRhcmllcygpLFxuICAgICAgICBzdGFydCA9IGJvdW5kYXJpZXNbMF0sXG4gICAgICAgIGVuZCA9IGJvdW5kYXJpZXNbMV07XG5cbiAgICAgICAgZm9yKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGFnZUxpbmtzLnB1c2goaSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZShwIDpudW1iZXIpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcy5nZXRQYWdlQ291bnQoKTtcblxuICAgICAgICBpZihwID49IDAgJiYgcCA8IHBjKSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy5yb3dzICogcDtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICAgICAgcGFnZUNvdW50OiBwY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG5cbiAgICAgICAgICAgIHRoaXMub25QYWdlQ2hhbmdlLmVtaXQoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgXG4gICAgZ2V0UGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmZpcnN0IC8gdGhpcy5yb3dzKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlVG9GaXJzdCgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKDApO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb1ByZXYoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSAtIDEpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb05leHQoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSAgKyAxKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlVG9MYXN0KCkge1xuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UodGhpcy5nZXRQYWdlQ291bnQoKSAtIDEpO1xuICAgIH1cbiAgICBcbiAgICBvblJwcENoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLnJvd3MgPSB0aGlzLnJvd3NQZXJQYWdlT3B0aW9uc1tldmVudC50YXJnZXQuc2VsZWN0ZWRJbmRleF07XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZVRvRmlyc3QoKTtcbiAgICB9XG59XG4iXX0=
