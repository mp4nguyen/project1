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
var DataList = (function () {
    function DataList(el, differs) {
        this.el = el;
        this.pageLinks = 5;
        this.onLazyLoad = new core_1.EventEmitter();
        this.first = 0;
        this.page = 0;
        this.differ = differs.find([]).create(null);
    }
    DataList.prototype.ngAfterViewInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows
            });
        }
    };
    DataList.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.paginator) {
                this.updatePaginator();
            }
            this.updateDataToRender(this.value);
        }
    };
    DataList.prototype.updatePaginator = function () {
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataList.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.updateDataToRender(this.value);
        }
    };
    DataList.prototype.updateDataToRender = function (datasource) {
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
    DataList.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataList.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataList.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataList.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataList.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataList.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataList.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataList.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataList.prototype, "lazy", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataList.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataList.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataList.prototype, "styleClass", void 0);
    __decorate([
        core_1.ContentChild(header_1.Header), 
        __metadata('design:type', Object)
    ], DataList.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(footer_1.Footer), 
        __metadata('design:type', Object)
    ], DataList.prototype, "footer", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataList.prototype, "itemTemplate", void 0);
    DataList = __decorate([
        core_1.Component({
            selector: 'p-dataList',
            template: "\n        <div [ngClass]=\"'ui-datalist ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-datalist-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-datalist-content ui-widget-content\">\n                <ul class=\"ui-datalist-data\">\n                    <template ngFor [ngForOf]=\"dataToRender\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" \n            (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator\"></p-paginator>\n            <div class=\"ui-datalist-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
            directives: [paginator_1.Paginator]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], DataList);
    return DataList;
}());
exports.DataList = DataList;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFtSixlQUFlLENBQUMsQ0FBQTtBQUNuSyx1QkFBcUIsa0JBQWtCLENBQUMsQ0FBQTtBQUN4Qyx1QkFBcUIsa0JBQWtCLENBQUMsQ0FBQTtBQUN4QywwQkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQXVCakQ7SUFvQ0ksa0JBQW9CLEVBQWMsRUFBRSxPQUF3QjtRQUF4QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBMUJ6QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBTXJCLGVBQVUsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFjckQsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBS3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGtDQUFlLEdBQWY7UUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNsQixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNULEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMs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REFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzt3REFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzswQ0FBQTtJQUVSO1FBQUMsYUFBTSxFQUFFOztnREFBQTtJQUVUO1FBQUMsWUFBSyxFQUFFOzsyQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztnREFBQTtJQUVSO1FBQUMsbUJBQVksQ0FBQyxlQUFNLENBQUM7OzRDQUFBO0lBRXJCO1FBQUMsbUJBQVksQ0FBQyxlQUFNLENBQUM7OzRDQUFBO0lBRXJCO1FBQUMsbUJBQVksQ0FBQyxrQkFBVyxDQUFDOztrREFBQTtJQS9DOUI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLHNnQ0FnQlQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxxQkFBUyxDQUFDO1NBQzFCLENBQUM7O2dCQUFBO0lBK0dGLGVBQUM7QUFBRCxDQTlHQSxBQThHQyxJQUFBO0FBOUdZLGdCQUFRLFdBOEdwQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZGF0YWxpc3QvZGF0YWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LERvQ2hlY2ssSW5wdXQsT3V0cHV0LFNpbXBsZUNoYW5nZSxFdmVudEVtaXR0ZXIsQ29udGVudENoaWxkLEl0ZXJhYmxlRGlmZmVycyxUZW1wbGF0ZVJlZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0hlYWRlcn0gZnJvbSAnLi4vY29tbW9uL2hlYWRlcic7XG5pbXBvcnQge0Zvb3Rlcn0gZnJvbSAnLi4vY29tbW9uL2Zvb3Rlcic7XG5pbXBvcnQge1BhZ2luYXRvcn0gZnJvbSAnLi4vcGFnaW5hdG9yL3BhZ2luYXRvcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1kYXRhTGlzdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktZGF0YWxpc3QgdWktd2lkZ2V0J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kYXRhbGlzdC1oZWFkZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItdG9wXCIgKm5nSWY9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJoZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kYXRhbGlzdC1jb250ZW50IHVpLXdpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktZGF0YWxpc3QtZGF0YVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiZGF0YVRvUmVuZGVyXCIgW25nRm9yVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCI+PC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1wYWdpbmF0b3IgW3Jvd3NdPVwicm93c1wiIFtmaXJzdF09XCJmaXJzdFwiIFt0b3RhbFJlY29yZHNdPVwidG90YWxSZWNvcmRzXCIgW3BhZ2VMaW5rU2l6ZV09XCJwYWdlTGlua3NcIiBcbiAgICAgICAgICAgIChvblBhZ2VDaGFuZ2UpPVwicGFnaW5hdGUoJGV2ZW50KVwiIHN0eWxlQ2xhc3M9XCJ1aS1wYWdpbmF0b3ItYm90dG9tXCIgW3Jvd3NQZXJQYWdlT3B0aW9uc109XCJyb3dzUGVyUGFnZU9wdGlvbnNcIiAqbmdJZj1cInBhZ2luYXRvclwiPjwvcC1wYWdpbmF0b3I+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YWxpc3QtZm9vdGVyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWJvdHRvbVwiICpuZ0lmPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW1BhZ2luYXRvcl1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YUxpc3QgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LERvQ2hlY2sge1xuXG4gICAgQElucHV0KCkgdmFsdWU6IGFueVtdO1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcm93czogbnVtYmVyO1xuICAgIFxuICAgIEBJbnB1dCgpIHRvdGFsUmVjb3JkczogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcGFnZUxpbmtzOiBudW1iZXIgPSA1O1xuICAgIFxuICAgIEBJbnB1dCgpIHJvd3NQZXJQYWdlT3B0aW9uczogbnVtYmVyW107XG5cbiAgICBASW5wdXQoKSBsYXp5OiBib29sZWFuO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkxhenlMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgICAgIFxuICAgIEBDb250ZW50Q2hpbGQoSGVhZGVyKSBoZWFkZXI7XG5cbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyO1xuICAgIFxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHByaXZhdGUgZGF0YVRvUmVuZGVyOiBhbnlbXTtcblxuICAgIHByaXZhdGUgZmlyc3Q6IG51bWJlciA9IDA7XG4gICAgXG4gICAgcHJpdmF0ZSBwYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgZGlmZmVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgICAgICAgdGhpcy5kaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQoe1xuICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgICAgIHJvd3M6IHRoaXMucm93c1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBsZXQgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgaWYoY2hhbmdlcykge1xuICAgICAgICAgICAgaWYodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlUGFnaW5hdG9yKCkge1xuICAgICAgICAvL3RvdGFsIHJlY29yZHNcbiAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLmxhenkgPyB0aGlzLnRvdGFsUmVjb3JkcyA6ICh0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS5sZW5ndGg6IDApO1xuICAgICAgICBcbiAgICAgICAgLy9maXJzdFxuICAgICAgICBpZih0aGlzLnRvdGFsUmVjb3JkcyAmJiB0aGlzLmZpcnN0ID49IHRoaXMudG90YWxSZWNvcmRzKSB7XG4gICAgICAgICAgICBsZXQgbnVtYmVyT2ZQYWdlcyA9IE1hdGguY2VpbCh0aGlzLnRvdGFsUmVjb3Jkcy90aGlzLnJvd3MpO1xuICAgICAgICAgICAgdGhpcy5maXJzdCA9IE1hdGgubWF4KChudW1iZXJPZlBhZ2VzLTEpICogdGhpcy5yb3dzLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhZ2luYXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlyc3QgPSBldmVudC5maXJzdDtcbiAgICAgICAgdGhpcy5yb3dzID0gZXZlbnQucm93cztcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhVG9SZW5kZXIoZGF0YXNvdXJjZSkge1xuICAgICAgICBpZih0aGlzLnBhZ2luYXRvciAmJiBkYXRhc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFUb1JlbmRlciA9IFtdO1xuICAgICAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSB0aGlzLmxhenkgPyAwIDogdGhpcy5maXJzdDtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCAoc3RhcnRJbmRleCsgdGhpcy5yb3dzKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYoaSA+PSBkYXRhc291cmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFUb1JlbmRlci5wdXNoKGRhdGFzb3VyY2VbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhVG9SZW5kZXIgPSBkYXRhc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmRhdGFUb1JlbmRlcnx8KHRoaXMuZGF0YVRvUmVuZGVyLmxlbmd0aCA9PSAwKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpOiBhbnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICByb3dzOiB0aGlzLnJvd3NcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=
