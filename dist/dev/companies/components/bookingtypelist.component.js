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
var table_component_1 = require('../../shared/components/table/table.component');
var BookingTypeListComponent = (function () {
    function BookingTypeListComponent() {
        this.rowClicked = new core_1.EventEmitter();
        this.columns = [{ title: 'Booking Type Name', fieldName: 'bookingTypeName' }];
    }
    BookingTypeListComponent.prototype.fireRowClicked = function (row) {
        this.rowClicked.next(row);
    };
    BookingTypeListComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var prop = changes[propName];
            var cur = JSON.stringify(prop.currentValue);
            var prev = JSON.stringify(prop.previousValue);
            console.log(propName + ": currentValue = " + cur + ", previousValue = " + prev);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BookingTypeListComponent.prototype, "bookingTypes", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BookingTypeListComponent.prototype, "rowClicked", void 0);
    BookingTypeListComponent = __decorate([
        core_1.Component({
            selector: 'bookingtype-list',
            templateUrl: './companies/components/bookingtypelist.component.html',
            providers: [],
            directives: [table_component_1.MyTableComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], BookingTypeListComponent);
    return BookingTypeListComponent;
}());
exports.BookingTypeListComponent = BookingTypeListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9jb21wb25lbnRzL2Jvb2tpbmd0eXBlbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE0RCxlQUFlLENBQUMsQ0FBQTtBQUU1RSxnQ0FBK0IsK0NBQStDLENBQUMsQ0FBQTtBQVEvRTtJQU1DO1FBSlUsZUFBVSxHQUFpQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUUvQyxZQUFPLEdBQVksQ0FBQyxFQUFDLEtBQUssRUFBQyxtQkFBbUIsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDO0lBRXhFLENBQUM7SUFFZixpREFBYyxHQUFkLFVBQWUsR0FBTztRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsOENBQVcsR0FBWCxVQUFZLE9BQStDO1FBRXZELEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLElBQUksR0FBRyxHQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUksUUFBUSx5QkFBb0IsR0FBRywwQkFBcUIsSUFBTSxDQUFDLENBQUM7UUFDN0UsQ0FBQztJQUNILENBQUM7SUFuQkg7UUFBQyxZQUFLLEVBQUU7O2tFQUFBO0lBQ1I7UUFBQyxhQUFNLEVBQUU7O2dFQUFBO0lBUlY7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsdURBQXVEO1lBQ3BFLFNBQVMsRUFBRSxFQUFFO1lBQ2IsVUFBVSxFQUFFLENBQUMsa0NBQWdCLENBQUM7U0FDL0IsQ0FBQzs7Z0NBQUE7SUFzQkYsK0JBQUM7QUFBRCxDQXJCQSxBQXFCQyxJQUFBO0FBckJZLGdDQUF3QiwyQkFxQnBDLENBQUEiLCJmaWxlIjoiY29tcGFuaWVzL2NvbXBvbmVudHMvYm9va2luZ3R5cGVsaXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsT25DaGFuZ2VzfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Qm9va2luZ1R5cGV9IGZyb20gJy4uL21vZGVscy9ib29raW5ndHlwZS5tb2RlbCc7XG5pbXBvcnQge015VGFibGVDb21wb25lbnR9IGZyb20gJy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Jvb2tpbmd0eXBlLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29tcGFuaWVzL2NvbXBvbmVudHMvYm9va2luZ3R5cGVsaXN0LmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZGlyZWN0aXZlczogW015VGFibGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEJvb2tpbmdUeXBlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlc3tcblx0QElucHV0KCkgYm9va2luZ1R5cGVzOiBCb29raW5nVHlwZVtdO1xuXHRAT3V0cHV0KCkgcm93Q2xpY2tlZDogRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIFx0cHVibGljIGNvbHVtbnM6T2JqZWN0W10gPSBbe3RpdGxlOidCb29raW5nIFR5cGUgTmFtZScsZmllbGROYW1lOidib29raW5nVHlwZU5hbWUnfV07XG5cblx0Y29uc3RydWN0b3IoKXt9XG5cblx0ZmlyZVJvd0NsaWNrZWQocm93OmFueSl7XG5cdFx0dGhpcy5yb3dDbGlja2VkLm5leHQocm93KTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IHtbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG5cblx0ICAgIGZvciAobGV0IHByb3BOYW1lIGluIGNoYW5nZXMpIHtcblx0ICAgICAgbGV0IHByb3AgPSBjaGFuZ2VzW3Byb3BOYW1lXTtcblx0ICAgICAgbGV0IGN1ciAgPSBKU09OLnN0cmluZ2lmeShwcm9wLmN1cnJlbnRWYWx1ZSk7XG5cdCAgICAgIGxldCBwcmV2ID0gSlNPTi5zdHJpbmdpZnkocHJvcC5wcmV2aW91c1ZhbHVlKTtcblx0ICAgICAgY29uc29sZS5sb2coYCR7cHJvcE5hbWV9OiBjdXJyZW50VmFsdWUgPSAke2N1cn0sIHByZXZpb3VzVmFsdWUgPSAke3ByZXZ9YCk7ICAgIFx0ICAgICAgICBcblx0ICAgIH1cbiAgXHR9XG59XG4iXX0=
