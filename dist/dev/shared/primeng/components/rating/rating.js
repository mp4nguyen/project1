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
var common_1 = require('angular2/common');
var RATING_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Rating; }),
    multi: true
});
var Rating = (function () {
    function Rating() {
        this.stars = 5;
        this.cancel = true;
        this.onRate = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Rating.prototype.ngOnInit = function () {
        this.starsArray = [];
        for (var i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    };
    Rating.prototype.rate = function (event, i) {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
    };
    Rating.prototype.clear = function (event) {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
    };
    Rating.prototype.writeValue = function (value) {
        this.value = value;
    };
    Rating.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Rating.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Rating.prototype, "stars", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "cancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Rating.prototype, "onRate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Rating.prototype, "onCancel", void 0);
    Rating = __decorate([
        core_1.Component({
            selector: 'p-rating',
            template: "\n        <div class=\"ui-rating\" [ngClass]=\"{'ui-state-disabled': disabled}\">\n            <div class=\"ui-rating-cancel\" *ngIf=\"cancel\" (click)=\"clear($event)\" [ngClass]=\"{'ui-rating-cancel-hover':hoverCancel}\"\n             (mouseenter)=\"hoverCancel=true\" (mouseleave)=\"hoverCancel=false\"><a></a></div>\n            <div class=\"ui-rating-star\" *ngFor=\"let star of starsArray;let i=index\" (click)=\"rate($event,i)\"\n             [ngClass]=\"{'ui-rating-star-on':(i < value)}\"><a></a></div>\n        </div>\n    ",
            providers: [RATING_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], Rating);
    return Rating;
}());
exports.Rating = Rating;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvcmF0aW5nL3JhdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdGLGVBQWUsQ0FBQyxDQUFBO0FBQ3hHLHVCQUFzRCxpQkFBaUIsQ0FBQyxDQUFBO0FBRXhFLElBQU0scUJBQXFCLEdBQWEsSUFBSSxlQUFRLENBQUMsMEJBQWlCLEVBQUU7SUFDcEUsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLE1BQU0sRUFBTixDQUFNLENBQUM7SUFDckMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFjSDtJQUFBO1FBTWEsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixXQUFNLEdBQVksSUFBSSxDQUFDO1FBRXRCLFdBQU0sR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFL0MsYUFBUSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUkzRCxrQkFBYSxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsY0FBTyxDQUFDLENBQUM7SUE2Q3hDLENBQUM7SUF2Q0cseUJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7SUFDTCxDQUFDO0lBRUQscUJBQUksR0FBSixVQUFLLEtBQUssRUFBRSxDQUFTO1FBQ2pCLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNiLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2FBQ2YsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBSyxHQUFMLFVBQU0sS0FBSztRQUNQLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxpQ0FBZ0IsR0FBaEIsVUFBaUIsRUFBWTtRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsa0NBQWlCLEdBQWpCLFVBQWtCLEVBQVk7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQTVERDtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7eUNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7MENBQUE7SUFFUjtRQUFDLGFBQU0sRUFBRTs7MENBQUE7SUFFVDtRQUFDLGFBQU0sRUFBRTs7NENBQUE7SUF4QmI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLHVoQkFPVDtZQUNELFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1NBQ3JDLENBQUM7O2NBQUE7SUFnRUYsYUFBQztBQUFELENBL0RBLEFBK0RDLElBQUE7QUEvRFksY0FBTSxTQStEbEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL3JhdGluZy9yYXRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLE9uSW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5cbmNvbnN0IFJBVElOR19WQUxVRV9BQ0NFU1NPUjogUHJvdmlkZXIgPSBuZXcgUHJvdmlkZXIoTkdfVkFMVUVfQUNDRVNTT1IsIHtcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSYXRpbmcpLFxuICAgIG11bHRpOiB0cnVlXG59KTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXJhdGluZycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLXJhdGluZ1wiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1yYXRpbmctY2FuY2VsXCIgKm5nSWY9XCJjYW5jZWxcIiAoY2xpY2spPVwiY2xlYXIoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsndWktcmF0aW5nLWNhbmNlbC1ob3Zlcic6aG92ZXJDYW5jZWx9XCJcbiAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJob3ZlckNhbmNlbD10cnVlXCIgKG1vdXNlbGVhdmUpPVwiaG92ZXJDYW5jZWw9ZmFsc2VcIj48YT48L2E+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcmF0aW5nLXN0YXJcIiAqbmdGb3I9XCJsZXQgc3RhciBvZiBzdGFyc0FycmF5O2xldCBpPWluZGV4XCIgKGNsaWNrKT1cInJhdGUoJGV2ZW50LGkpXCJcbiAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXJhdGluZy1zdGFyLW9uJzooaSA8IHZhbHVlKX1cIj48YT48L2E+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbUkFUSU5HX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmcgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3RhcnM6IG51bWJlciA9IDU7XG5cbiAgICBASW5wdXQoKSBjYW5jZWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQE91dHB1dCgpIG9uUmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25DYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBwcml2YXRlIHN0YXJzQXJyYXk6IG51bWJlcltdO1xuICAgIFxuICAgIHByaXZhdGUgaG92ZXJDYW5jZWw6IGJvb2xlYW47XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdGFyc0FycmF5ID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXJzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnNBcnJheVtpXSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmF0ZShldmVudCwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmKCF0aGlzLnJlYWRvbmx5JiYhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IChpICsgMSk7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgICAgICB0aGlzLm9uUmF0ZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogKGkrMSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgY2xlYXIoZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYoIXRoaXMucmVhZG9ubHkmJiF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMub25DYW5jZWwuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxufSJdfQ==
