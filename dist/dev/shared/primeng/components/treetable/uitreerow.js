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
var treetable_1 = require('./treetable');
var columntemplateloader_1 = require('../column/columntemplateloader');
var UITreeRow = (function () {
    function UITreeRow(treeTable) {
        this.treeTable = treeTable;
        this.level = 0;
        this.expanded = false;
    }
    UITreeRow.prototype.toggle = function (event) {
        if (this.expanded)
            this.treeTable.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        else
            this.treeTable.onNodeExpand.emit({ originalEvent: event, node: this.node });
        this.expanded = !this.expanded;
    };
    UITreeRow.prototype.isLeaf = function () {
        return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
    };
    UITreeRow.prototype.isSelected = function () {
        return this.treeTable.isSelected(this.node);
    };
    UITreeRow.prototype.onRowClick = function (event) {
        this.treeTable.onRowClick(event, this.node);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UITreeRow.prototype, "node", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], UITreeRow.prototype, "level", void 0);
    UITreeRow = __decorate([
        core_1.Component({
            selector: '[pTreeRow]',
            template: "\n        <div class=\"ui-treetable-row\" [ngClass]=\"{'ui-state-hover':hover&&treeTable.selectionMode,'ui-state-highlight':isSelected(node)}\">\n            <td *ngFor=\"let col of treeTable.columns; let i=index\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\"\n                (mouseenter)=\"hover=true\" (mouseleave)=\"hover=false\" (click)=\"onRowClick($event)\">\n                <span *ngIf=\"i==0\" class=\"ui-treetable-toggler fa fa-fw ui-c\" [ngClass]=\"{'fa-caret-down':expanded,'fa-caret-right':!expanded}\"\n                    [ngStyle]=\"{'margin-left':level*16 + 'px','visibility': isLeaf() ? 'hidden' : 'visible'}\"\n                    (click)=\"toggle($event)\"></span>\n                <span *ngIf=\"!col.template\">{{node.data[col.field]}}</span>\n                <p-columnTemplateLoader [column]=\"col\" [rowData]=\"node\" *ngIf=\"col.template\"></p-columnTemplateLoader>\n            </td>\n        </div>\n        <div *ngIf=\"node.children\" class=\"ui-treetable-row\" [style.display]=\"expanded ? 'table-row' : 'none'\">\n            <td [attr.colspan]=\"treeTable.columns.length\" class=\"ui-treetable-child-table-container\">\n                <table>\n                    <tbody pTreeRow *ngFor=\"let childNode of node.children\" [node]=\"childNode\" [level]=\"level+1\"></tbody>\n                </table>\n            </td>\n        </div>\n    ",
            directives: [UITreeRow, columntemplateloader_1.ColumnTemplateLoader]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return treetable_1.TreeTable; }))), 
        __metadata('design:paramtypes', [treetable_1.TreeTable])
    ], UITreeRow);
    return UITreeRow;
}());
exports.UITreeRow = UITreeRow;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdHJlZXRhYmxlL3VpdHJlZXJvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBQXlFLGVBQWUsQ0FBQyxDQUFBO0FBQ3pGLDBCQUF3QixhQUFhLENBQUMsQ0FBQTtBQUV0QyxxQ0FBbUMsZ0NBQWdDLENBQUMsQ0FBQTtBQXlCcEU7SUFVSSxtQkFBeUQsU0FBbUI7UUFBbkIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQU5uRSxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRTNCLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFJcUQsQ0FBQztJQUVoRiwwQkFBTSxHQUFOLFVBQU8sS0FBSztRQUNSLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNoRixJQUFJO1lBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFFOUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVELDBCQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELDhCQUFVLEdBQVY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCw4QkFBVSxHQUFWLFVBQVcsS0FBSztRQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQTdCRDtRQUFDLFlBQUssRUFBRTs7MkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUEzQlo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLG0yQ0FrQlQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUMsMkNBQW9CLENBQUM7U0FDL0MsQ0FBQzttQkFXZSxhQUFNLENBQUMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEscUJBQVMsRUFBVCxDQUFTLENBQUMsQ0FBQzs7aUJBWGxEO0lBaUNGLGdCQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtBQWhDWSxpQkFBUyxZQWdDckIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL3RyZWV0YWJsZS91aXRyZWVyb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLEluamVjdCxmb3J3YXJkUmVmLEhvc3R9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtUcmVlVGFibGV9IGZyb20gJy4vdHJlZXRhYmxlJztcbmltcG9ydCB7VHJlZU5vZGV9IGZyb20gJy4uL2FwaS90cmVlbm9kZSc7XG5pbXBvcnQge0NvbHVtblRlbXBsYXRlTG9hZGVyfSBmcm9tICcuLi9jb2x1bW4vY29sdW1udGVtcGxhdGVsb2FkZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1twVHJlZVJvd10nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVldGFibGUtcm93XCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1ob3Zlcic6aG92ZXImJnRyZWVUYWJsZS5zZWxlY3Rpb25Nb2RlLCd1aS1zdGF0ZS1oaWdobGlnaHQnOmlzU2VsZWN0ZWQobm9kZSl9XCI+XG4gICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbCBvZiB0cmVlVGFibGUuY29sdW1uczsgbGV0IGk9aW5kZXhcIiBbbmdTdHlsZV09XCJjb2wuc3R5bGVcIiBbY2xhc3NdPVwiY29sLnN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cImhvdmVyPXRydWVcIiAobW91c2VsZWF2ZSk9XCJob3Zlcj1mYWxzZVwiIChjbGljayk9XCJvblJvd0NsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImk9PTBcIiBjbGFzcz1cInVpLXRyZWV0YWJsZS10b2dnbGVyIGZhIGZhLWZ3IHVpLWNcIiBbbmdDbGFzc109XCJ7J2ZhLWNhcmV0LWRvd24nOmV4cGFuZGVkLCdmYS1jYXJldC1yaWdodCc6IWV4cGFuZGVkfVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnbWFyZ2luLWxlZnQnOmxldmVsKjE2ICsgJ3B4JywndmlzaWJpbGl0eSc6IGlzTGVhZigpID8gJ2hpZGRlbicgOiAndmlzaWJsZSd9XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWNvbC50ZW1wbGF0ZVwiPnt7bm9kZS5kYXRhW2NvbC5maWVsZF19fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8cC1jb2x1bW5UZW1wbGF0ZUxvYWRlciBbY29sdW1uXT1cImNvbFwiIFtyb3dEYXRhXT1cIm5vZGVcIiAqbmdJZj1cImNvbC50ZW1wbGF0ZVwiPjwvcC1jb2x1bW5UZW1wbGF0ZUxvYWRlcj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibm9kZS5jaGlsZHJlblwiIGNsYXNzPVwidWktdHJlZXRhYmxlLXJvd1wiIFtzdHlsZS5kaXNwbGF5XT1cImV4cGFuZGVkID8gJ3RhYmxlLXJvdycgOiAnbm9uZSdcIj5cbiAgICAgICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cInRyZWVUYWJsZS5jb2x1bW5zLmxlbmd0aFwiIGNsYXNzPVwidWktdHJlZXRhYmxlLWNoaWxkLXRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPHRib2R5IHBUcmVlUm93ICpuZ0Zvcj1cImxldCBjaGlsZE5vZGUgb2Ygbm9kZS5jaGlsZHJlblwiIFtub2RlXT1cImNoaWxkTm9kZVwiIFtsZXZlbF09XCJsZXZlbCsxXCI+PC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbVUlUcmVlUm93LENvbHVtblRlbXBsYXRlTG9hZGVyXVxufSlcbmV4cG9ydCBjbGFzcyBVSVRyZWVSb3cge1xuXG4gICAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XG4gICAgXG4gICAgQElucHV0KCkgbGV2ZWw6IG51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgXG4gICAgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBob3ZlcjogYm9vbGVhbjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gVHJlZVRhYmxlKSkgcHJpdmF0ZSB0cmVlVGFibGU6VHJlZVRhYmxlKSB7fVxuICAgIFxuICAgIHRvZ2dsZShldmVudCkge1xuICAgICAgICBpZih0aGlzLmV4cGFuZGVkKVxuICAgICAgICAgICAgdGhpcy50cmVlVGFibGUub25Ob2RlQ29sbGFwc2UuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IHRoaXMubm9kZX0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnRyZWVUYWJsZS5vbk5vZGVFeHBhbmQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IHRoaXMubm9kZX0pO1xuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB9XG4gICAgXG4gICAgaXNMZWFmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmxlYWYgPT0gZmFsc2UgPyBmYWxzZSA6ICEodGhpcy5ub2RlLmNoaWxkcmVuJiZ0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICB9XG4gICAgXG4gICAgaXNTZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZVRhYmxlLmlzU2VsZWN0ZWQodGhpcy5ub2RlKTtcbiAgICB9XG4gICAgXG4gICAgb25Sb3dDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLnRyZWVUYWJsZS5vblJvd0NsaWNrKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbn0iXX0=
