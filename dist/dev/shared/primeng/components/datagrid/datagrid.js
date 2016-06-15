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
var paginator_1 = require('../paginator/paginator');
var DataGrid = (function () {
    function DataGrid(el, differs) {
        this.el = el;
        this.columns = 3;
        this.pageLinks = 5;
        this.onLazyLoad = new core_1.EventEmitter();
        this.first = 0;
        this.page = 0;
        this.differ = differs.find([]).create(null);
    }
    DataGrid.prototype.ngAfterViewInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    };
    DataGrid.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.paginator) {
                this.updatePaginator();
            }
            this.updateDataToRender(this.value);
        }
    };
    DataGrid.prototype.updatePaginator = function () {
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataGrid.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
    };
    DataGrid.prototype.updateDataToRender = function (datasource) {
        if (this.paginator && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            for (var i = startIndex; i < (startIndex + this.rows); i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    };
    DataGrid.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataGrid.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataGrid.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataGrid.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataGrid.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataGrid.prototype, "columns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataGrid.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataGrid.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataGrid.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataGrid.prototype, "lazy", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataGrid.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataGrid.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataGrid.prototype, "styleClass", void 0);
    __decorate([
        core_1.ContentChild(header_1.Header), 
        __metadata('design:type', Object)
    ], DataGrid.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(footer_1.Footer), 
        __metadata('design:type', Object)
    ], DataGrid.prototype, "footer", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataGrid.prototype, "itemTemplate", void 0);
    DataGrid = __decorate([
        core_1.Component({
            selector: 'p-dataGrid',
            template: "\n        <div [ngClass]=\"'ui-datagrid ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-datagrid-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-datagrid-content ui-widget-content\" [ngClass]=\"'ui-datagrid-col-' + columns\">\n                <template ngFor [ngForOf]=\"dataToRender\" [ngForTemplate]=\"itemTemplate\"></template>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" \n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator\"></p-paginator>\n            <div class=\"ui-datagrid-footer ui-widget-header ui-corner-top\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
            directives: [paginator_1.Paginator]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], DataGrid);
    return DataGrid;
}());
exports.DataGrid = DataGrid;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZGF0YWdyaWQvZGF0YWdyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFtSixlQUFlLENBQUMsQ0FBQTtBQUNuSyx1QkFBcUIsa0JBQWtCLENBQUMsQ0FBQTtBQUN4Qyx1QkFBcUIsa0JBQWtCLENBQUMsQ0FBQTtBQUN4QywwQkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQXFCakQ7SUFzQ0ksa0JBQW9CLEVBQWMsRUFBRSxPQUF3QjtRQUF4QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBOUJ6QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBSXBCLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFNckIsZUFBVSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQWNyRCxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFLckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsa0NBQWUsR0FBZjtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2xCLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxD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QUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzBDQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O2dEQUFBO0lBRVQ7UUFBQyxZQUFLLEVBQUU7OzJDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxtQkFBWSxDQUFDLGVBQU0sQ0FBQzs7NENBQUE7SUFFckI7UUFBQyxtQkFBWSxDQUFDLGVBQU0sQ0FBQzs7NENBQUE7SUFFckI7UUFBQyxtQkFBWSxDQUFDLGtCQUFXLENBQUM7O2tEQUFBO0lBL0M5QjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUscytCQWNUO1lBQ0QsVUFBVSxFQUFFLENBQUMscUJBQVMsQ0FBQztTQUMxQixDQUFDOztnQkFBQTtJQWlIRixlQUFDO0FBQUQsQ0FoSEEsQUFnSEMsSUFBQTtBQWhIWSxnQkFBUSxXQWdIcEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2RhdGFncmlkL2RhdGFncmlkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uRGVzdHJveSxEb0NoZWNrLElucHV0LE91dHB1dCxTaW1wbGVDaGFuZ2UsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZCxJdGVyYWJsZURpZmZlcnMsVGVtcGxhdGVSZWZ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtIZWFkZXJ9IGZyb20gJy4uL2NvbW1vbi9oZWFkZXInO1xuaW1wb3J0IHtGb290ZXJ9IGZyb20gJy4uL2NvbW1vbi9mb290ZXInO1xuaW1wb3J0IHtQYWdpbmF0b3J9IGZyb20gJy4uL3BhZ2luYXRvci9wYWdpbmF0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZGF0YUdyaWQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLWRhdGFncmlkIHVpLXdpZGdldCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YWdyaWQtaGVhZGVyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRvcFwiICpuZ0lmPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YWdyaWQtY29udGVudCB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cIid1aS1kYXRhZ3JpZC1jb2wtJyArIGNvbHVtbnNcIj5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiZGF0YVRvUmVuZGVyXCIgW25nRm9yVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCI+PC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAtcGFnaW5hdG9yIFtyb3dzXT1cInJvd3NcIiBbZmlyc3RdPVwiZmlyc3RcIiBbdG90YWxSZWNvcmRzXT1cInRvdGFsUmVjb3Jkc1wiIFtwYWdlTGlua1NpemVdPVwicGFnZUxpbmtzXCIgXG4gICAgICAgICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJwYWdpbmF0ZSgkZXZlbnQpXCIgc3R5bGVDbGFzcz1cInVpLXBhZ2luYXRvci1ib3R0b21cIiBbcm93c1BlclBhZ2VPcHRpb25zXT1cInJvd3NQZXJQYWdlT3B0aW9uc1wiICpuZ0lmPVwicGFnaW5hdG9yXCI+PC9wLXBhZ2luYXRvcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kYXRhZ3JpZC1mb290ZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItdG9wXCIgKm5nSWY9XCJmb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJmb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUGFnaW5hdG9yXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhR3JpZCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsRG9DaGVjayB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W107XG5cbiAgICBASW5wdXQoKSBwYWdpbmF0b3I6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSByb3dzOiBudW1iZXI7XG4gICAgXG4gICAgQElucHV0KCkgY29sdW1uczogbnVtYmVyID0gMztcblxuICAgIEBJbnB1dCgpIHRvdGFsUmVjb3JkczogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcGFnZUxpbmtzOiBudW1iZXIgPSA1O1xuICAgIFxuICAgIEBJbnB1dCgpIHJvd3NQZXJQYWdlT3B0aW9uczogbnVtYmVyW107XG5cbiAgICBASW5wdXQoKSBsYXp5OiBib29sZWFuO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkxhenlMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgICAgIFxuICAgIEBDb250ZW50Q2hpbGQoSGVhZGVyKSBoZWFkZXI7XG5cbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyO1xuICAgIFxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHByaXZhdGUgZGF0YVRvUmVuZGVyOiBhbnlbXTtcblxuICAgIHByaXZhdGUgZmlyc3Q6IG51bWJlciA9IDA7XG4gICAgXG4gICAgcHJpdmF0ZSBwYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgZGlmZmVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgICAgICAgdGhpcy5kaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQoe1xuICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgICAgIHJvd3M6IHRoaXMucm93c1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBsZXQgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgaWYoY2hhbmdlcykge1xuICAgICAgICAgICAgaWYodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlUGFnaW5hdG9yKCkge1xuICAgICAgICAvL3RvdGFsIHJlY29yZHNcbiAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLmxhenkgPyB0aGlzLnRvdGFsUmVjb3JkcyA6ICh0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS5sZW5ndGg6IDApO1xuICAgICAgICBcbiAgICAgICAgLy9maXJzdFxuICAgICAgICBpZih0aGlzLnRvdGFsUmVjb3JkcyAmJiB0aGlzLmZpcnN0ID49IHRoaXMudG90YWxSZWNvcmRzKSB7XG4gICAgICAgICAgICBsZXQgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbCh0aGlzLnRvdGFsUmVjb3Jkcy90aGlzLnJvd3MpO1xuICAgICAgICAgICAgdGhpcy5maXJzdCA9IE1hdGgubWF4KChudW1iZXJPZlBhZ2VzLTEpICogdGhpcy5yb3dzLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhZ2luYXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlyc3QgPSBldmVudC5maXJzdDtcbiAgICAgICAgdGhpcy5yb3dzID0gZXZlbnQucm93cztcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhVG9SZW5kZXIoZGF0YXNvdXJjZSkge1xuICAgICAgICBpZih0aGlzLnBhZ2luYXRvciAmJiBkYXRhc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFUb1JlbmRlciA9IFtdO1xuICAgICAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSB0aGlzLmxhenkgPyAwIDogdGhpcy5maXJzdDtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCAoc3RhcnRJbmRleCsgdGhpcy5yb3dzKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYoaSA+PSBkYXRhc291cmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFUb1JlbmRlci5wdXNoKGRhdGFzb3VyY2VbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhVG9SZW5kZXIgPSBkYXRhc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmRhdGFUb1JlbmRlcnx8KHRoaXMuZGF0YVRvUmVuZGVyLmxlbmd0aCA9PSAwKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpOiBhbnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICByb3dzOiB0aGlzLnJvd3NcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=
