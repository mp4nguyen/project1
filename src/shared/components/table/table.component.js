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
//# sourceMappingURL=table.component.js.map