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
var MyTableComponent = (function () {
    function MyTableComponent() {
        this.rowClickedEvent = new core_1.EventEmitter();
    }
    MyTableComponent.prototype.fireRowClickedEvent = function (row) {
        this.rowClickedEvent.next(row);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MyTableComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MyTableComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MyTableComponent.prototype, "rowClickedEvent", void 0);
    MyTableComponent = __decorate([
        core_1.Component({
            selector: 'my-table',
            inputs: ['columns', 'data'],
            template: "\n<!-- BEGIN SAMPLE TABLE PORTLET-->\n<div class=\"portlet\" >\n    <div class=\"portlet-body\">\n        <div class=\"table-scrollable\">\n            <table class=\"table table-striped table-bordered table-hover order-column\" >\n                <thead>\n\t                <tr>\n\t                    <th *ngFor=\"#column of columns\" >{{column.title}}</th>\n\t                </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"#d of data\" (click)=\"fireRowClickedEvent(d)\">\n                        <td *ngFor=\"#column of columns\" >{{d[column.fieldName]}}</td>\n                    </tr>   \n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], MyTableComponent);
    return MyTableComponent;
}());
exports.MyTableComponent = MyTableComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWtELGVBQWUsQ0FBQyxDQUFBO0FBK0JsRTtJQUFBO1FBR1ksb0JBQWUsR0FBaUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFLL0QsQ0FBQztJQUhDLDhDQUFtQixHQUFuQixVQUFvQixHQUFHO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFORDtRQUFDLFlBQUssRUFBRTs7cURBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7a0RBQUE7SUFDUjtRQUFDLGFBQU0sRUFBRTs7NkRBQUE7SUEvQlg7UUFBQyxnQkFBUyxDQUFDO1lBQ1gsUUFBUSxFQUFFLFVBQVU7WUFDcEIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFDLE1BQU0sQ0FBQztZQUMxQixRQUFRLEVBQ1IscXRCQW9CQztTQUNBLENBQUM7O3dCQUFBO0lBV0YsdUJBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQVJZLHdCQUFnQixtQkFRNUIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvY29tcG9uZW50cy90YWJsZS90YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q09SRV9ESVJFQ1RJVkVTLCBGT1JNX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuc2VsZWN0b3I6ICdteS10YWJsZScsXG5pbnB1dHM6IFsnY29sdW1ucycsJ2RhdGEnXSxcbnRlbXBsYXRlOiBcbmBcbjwhLS0gQkVHSU4gU0FNUExFIFRBQkxFIFBPUlRMRVQtLT5cbjxkaXYgY2xhc3M9XCJwb3J0bGV0XCIgPlxuICAgIDxkaXYgY2xhc3M9XCJwb3J0bGV0LWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLXNjcm9sbGFibGVcIj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWQgdGFibGUtaG92ZXIgb3JkZXItY29sdW1uXCIgPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cblx0ICAgICAgICAgICAgICAgIDx0cj5cblx0ICAgICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwiI2NvbHVtbiBvZiBjb2x1bW5zXCIgPnt7Y29sdW1uLnRpdGxlfX08L3RoPlxuXHQgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cIiNkIG9mIGRhdGFcIiAoY2xpY2spPVwiZmlyZVJvd0NsaWNrZWRFdmVudChkKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cIiNjb2x1bW4gb2YgY29sdW1uc1wiID57e2RbY29sdW1uLmZpZWxkTmFtZV19fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+ICAgXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gIFxufSlcblxuXG5leHBvcnQgY2xhc3MgTXlUYWJsZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbHVtbnM6IGFueVtdO1xuICBASW5wdXQoKSBkYXRhOiBhbnlbXTtcbiAgQE91dHB1dCgpIHJvd0NsaWNrZWRFdmVudDogRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGZpcmVSb3dDbGlja2VkRXZlbnQocm93KXtcbiAgXHR0aGlzLnJvd0NsaWNrZWRFdmVudC5uZXh0KHJvdyk7XG4gIH1cbn0iXX0=
