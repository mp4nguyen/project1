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
var Schedule = (function () {
    function Schedule(el, differs) {
        this.el = el;
        this.aspectRatio = 1.35;
        this.defaultView = 'month';
        this.allDaySlot = true;
        this.slotDuration = '00:30:00';
        this.scrollTime = '06:00:00';
        this.minTime = '00:00:00';
        this.maxTime = '24:00:00';
        this.slotEventOverlap = true;
        this.dragRevertDuration = 500;
        this.dragOpacity = .75;
        this.dragScroll = true;
        this.onDayClick = new core_1.EventEmitter();
        this.onEventClick = new core_1.EventEmitter();
        this.onEventMouseover = new core_1.EventEmitter();
        this.onEventMouseout = new core_1.EventEmitter();
        this.onEventDragStart = new core_1.EventEmitter();
        this.onEventDragStop = new core_1.EventEmitter();
        this.onEventDrop = new core_1.EventEmitter();
        this.onEventResizeStart = new core_1.EventEmitter();
        this.onEventResizeStop = new core_1.EventEmitter();
        this.onEventResize = new core_1.EventEmitter();
        this.differ = differs.find([]).create(null);
        this.initialized = false;
    }
    Schedule.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.schedule = jQuery(this.el.nativeElement.children[0]);
        var options = {
            theme: true,
            header: this.header,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
            fixedWeekCount: this.fixedWeekCount,
            weekNumbers: this.weekNumbers,
            businessHours: this.businessHours,
            height: this.height,
            contentHeight: this.contentHeight,
            aspectRatio: this.aspectRatio,
            eventLimit: this.eventLimit,
            defaultDate: this.defaultDate,
            editable: this.editable,
            eventStartEditable: this.eventStartEditable,
            eventDurationEditable: this.eventDurationEditable,
            defaultView: this.defaultView,
            allDayslot: this.allDaySlot,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotLabelInterval,
            snapDuration: this.snapDuration,
            scrollTime: this.scrollTime,
            minTime: this.minTime,
            maxTime: this.maxTime,
            slotEventOverlap: this.slotEventOverlap,
            nowIndicator: this.nowIndicator,
            dragRevertDuration: this.dragRevertDuration,
            dragOpacity: this.dragOpacity,
            dragScroll: this.dragScroll,
            eventOverlap: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            events: function (start, end, timezone, callback) {
                callback(_this.events);
            },
            dayClick: function (date, jsEvent, view) {
                _this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventClick: function (calEvent, jsEvent, view) {
                _this.onEventClick.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: function (calEvent, jsEvent, view) {
                _this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: function (calEvent, jsEvent, view) {
                _this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: function (event, jsEvent, ui, view) {
                _this.onEventDragStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: function (event, jsEvent, ui, view) {
                _this.onEventDragStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
                _this.onEventDrop.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: function (event, jsEvent, ui, view) {
                _this.onEventResizeStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: function (event, jsEvent, ui, view) {
                _this.onEventResizeStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
                _this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            }
        };
        if (this.locale) {
            for (var prop in this.locale) {
                options[prop] = this.locale[prop];
            }
        }
        this.schedule.fullCalendar(options);
        this.initialized = true;
    };
    Schedule.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.events);
        if (this.schedule && changes) {
            this.schedule.fullCalendar('refetchEvents');
        }
    };
    Schedule.prototype.ngOnDestroy = function () {
        jQuery(this.el.nativeElement.children[0]).fullCalendar('destroy');
        this.initialized = false;
        this.schedule = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Schedule.prototype, "events", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Schedule.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "rtl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "weekends", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Schedule.prototype, "hiddenDays", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "fixedWeekCount", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "weekNumbers", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "businessHours", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "contentHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Schedule.prototype, "aspectRatio", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "eventLimit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "defaultDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "editable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "eventStartEditable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "eventDurationEditable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Schedule.prototype, "defaultView", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "allDaySlot", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "slotDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "slotLabelInterval", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "snapDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "scrollTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "minTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "maxTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "slotEventOverlap", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "nowIndicator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Schedule.prototype, "dragRevertDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Schedule.prototype, "dragOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Schedule.prototype, "dragScroll", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "eventOverlap", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "eventConstraint", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Schedule.prototype, "locale", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onDayClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventMouseover", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventMouseout", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventDragStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventDragStop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventDrop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventResizeStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventResizeStop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Schedule.prototype, "onEventResize", void 0);
    Schedule = __decorate([
        core_1.Component({
            selector: 'p-schedule',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\"></div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
    ], Schedule);
    return Schedule;
}());
exports.Schedule = Schedule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvc2NoZWR1bGUvc2NoZWR1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE2RyxlQUFlLENBQUMsQ0FBQTtBQVM3SDtJQWtHSSxrQkFBb0IsRUFBYyxFQUFFLE9BQXdCO1FBQXhDLE9BQUUsR0FBRixFQUFFLENBQVk7UUF4RXpCLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBWTNCLGdCQUFXLEdBQVcsT0FBTyxDQUFDO1FBRTlCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsaUJBQVksR0FBUSxVQUFVLENBQUM7UUFNL0IsZUFBVSxHQUFRLFVBQVUsQ0FBQztRQUU3QixZQUFPLEdBQVEsVUFBVSxDQUFDO1FBRTFCLFlBQU8sR0FBUSxVQUFVLENBQUM7UUFFMUIscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBSWpDLHVCQUFrQixHQUFXLEdBQUcsQ0FBQztRQUVqQyxnQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUUxQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBUTFCLGVBQVUsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFbkQsaUJBQVksR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFckQscUJBQWdCLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXpELG9CQUFlLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXhELHFCQUFnQixHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUV6RCxvQkFBZSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUV4RCxnQkFBVyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUVwRCx1QkFBa0IsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFM0Qsc0JBQWlCLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRTFELGtCQUFhLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBVzVELElBQUksQ0FBQyxN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QUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3VEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzZDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3NEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzRDQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O2dEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O2tEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O3NEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O3FEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O3NEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O3FEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O2lEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O3dEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O3VEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O21EQUFBO0lBOUZiO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSx3RUFFVDtTQUNKLENBQUM7O2dCQUFBO0lBaVBGLGVBQUM7QUFBRCxDQWhQQSxBQWdQQyxJQUFBO0FBaFBZLGdCQUFRLFdBZ1BwQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvc2NoZWR1bGUvc2NoZWR1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LERvQ2hlY2ssSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixJdGVyYWJsZURpZmZlcnN9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICcuLi9hcGkvc2VsZWN0aXRlbSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zY2hlZHVsZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+PC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBTY2hlZHVsZSB7XG4gICAgXG4gICAgQElucHV0KCkgZXZlbnRzOiBhbnlbXTtcbiAgICBcbiAgICBASW5wdXQoKSBoZWFkZXI6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgcnRsOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIHdlZWtlbmRzOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGhpZGRlbkRheXM6IG51bWJlcltdO1xuICAgICAgICBcbiAgICBASW5wdXQoKSBmaXhlZFdlZWtDb3VudDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSB3ZWVrTnVtYmVyczogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBidXNpbmVzc0hvdXJzOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgaGVpZ2h0OiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgY29udGVudEhlaWdodDogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGFzcGVjdFJhdGlvOiBudW1iZXIgPSAxLjM1O1xuICAgIFxuICAgIEBJbnB1dCgpIGV2ZW50TGltaXQ6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBkZWZhdWx0RGF0ZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGV2ZW50U3RhcnRFZGl0YWJsZTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBldmVudER1cmF0aW9uRWRpdGFibGU6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgZGVmYXVsdFZpZXc6IHN0cmluZyA9ICdtb250aCc7XG4gICAgXG4gICAgQElucHV0KCkgYWxsRGF5U2xvdDogYm9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgQElucHV0KCkgc2xvdER1cmF0aW9uOiBhbnkgPSAnMDA6MzA6MDAnO1xuICAgIFxuICAgIEBJbnB1dCgpIHNsb3RMYWJlbEludGVydmFsOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc25hcER1cmF0aW9uOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc2Nyb2xsVGltZTogYW55ID0gJzA2OjAwOjAwJztcbiAgICBcbiAgICBASW5wdXQoKSBtaW5UaW1lOiBhbnkgPSAnMDA6MDA6MDAnO1xuICAgICAgICBcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBhbnkgPSAnMjQ6MDA6MDAnO1xuICAgIFxuICAgIEBJbnB1dCgpIHNsb3RFdmVudE92ZXJsYXA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBJbnB1dCgpIG5vd0luZGljYXRvcjogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBkcmFnUmV2ZXJ0RHVyYXRpb246IG51bWJlciA9IDUwMDtcbiAgICBcbiAgICBASW5wdXQoKSBkcmFnT3BhY2l0eTogbnVtYmVyID0gLjc1O1xuICAgIFxuICAgIEBJbnB1dCgpIGRyYWdTY3JvbGw6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBJbnB1dCgpIGV2ZW50T3ZlcmxhcDogYW55O1xuICAgICAgICBcbiAgICBASW5wdXQoKSBldmVudENvbnN0cmFpbnQ6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBsb2NhbGU6IGFueTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25EYXlDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRXZlbnRDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIFxuICAgIEBPdXRwdXQoKSBvbkV2ZW50TW91c2VvdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgICAgIFxuICAgIEBPdXRwdXQoKSBvbkV2ZW50TW91c2VvdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkV2ZW50RHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkV2ZW50RHJhZ1N0b3A6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkV2ZW50RHJvcDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRXZlbnRSZXNpemVTdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRXZlbnRSZXNpemVTdG9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25FdmVudFJlc2l6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgc3RvcE5nT25DaGFuZ2VzUHJvcGFnYXRpb246IGJvb2xlYW47XG4gICAgXG4gICAgZGlmZmVyOiBhbnk7XG4gICAgXG4gICAgc2NoZWR1bGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xuICAgICAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlID0galF1ZXJ5KHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSk7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGhlbWU6IHRydWUsXG4gICAgICAgICAgICBoZWFkZXI6IHRoaXMuaGVhZGVyLFxuICAgICAgICAgICAgaXNSVEw6IHRoaXMucnRsLFxuICAgICAgICAgICAgd2Vla2VuZHM6IHRoaXMud2Vla2VuZHMsXG4gICAgICAgICAgICBoaWRkZW5EYXlzOiB0aGlzLmhpZGRlbkRheXMsXG4gICAgICAgICAgICBmaXhlZFdlZWtDb3VudDogdGhpcy5maXhlZFdlZWtDb3VudCxcbiAgICAgICAgICAgIHdlZWtOdW1iZXJzOiB0aGlzLndlZWtOdW1iZXJzLFxuICAgICAgICAgICAgYnVzaW5lc3NIb3VyczogdGhpcy5idXNpbmVzc0hvdXJzLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgIGNvbnRlbnRIZWlnaHQ6IHRoaXMuY29udGVudEhlaWdodCxcbiAgICAgICAgICAgIGFzcGVjdFJhdGlvOiB0aGlzLmFzcGVjdFJhdGlvLFxuICAgICAgICAgICAgZXZlbnRMaW1pdDogdGhpcy5ldmVudExpbWl0LFxuICAgICAgICAgICAgZGVmYXVsdERhdGU6IHRoaXMuZGVmYXVsdERhdGUsXG4gICAgICAgICAgICBlZGl0YWJsZTogdGhpcy5lZGl0YWJsZSxcbiAgICAgICAgICAgIGV2ZW50U3RhcnRFZGl0YWJsZTogdGhpcy5ldmVudFN0YXJ0RWRpdGFibGUsXG4gICAgICAgICAgICBldmVudER1cmF0aW9uRWRpdGFibGU6IHRoaXMuZXZlbnREdXJhdGlvbkVkaXRhYmxlLFxuICAgICAgICAgICAgZGVmYXVsdFZpZXc6IHRoaXMuZGVmYXVsdFZpZXcsXG4gICAgICAgICAgICBhbGxEYXlzbG90OiB0aGlzLmFsbERheVNsb3QsXG4gICAgICAgICAgICBzbG90RHVyYXRpb246IHRoaXMuc2xvdER1cmF0aW9uLFxuICAgICAgICAgICAgc2xvdExhYmVsSW50ZXJ2YWw6IHRoaXMuc2xvdExhYmVsSW50ZXJ2YWwsXG4gICAgICAgICAgICBzbmFwRHVyYXRpb246IHRoaXMuc25hcER1cmF0aW9uLFxuICAgICAgICAgICAgc2Nyb2xsVGltZTogdGhpcy5zY3JvbGxUaW1lLFxuICAgICAgICAgICAgbWluVGltZTogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgbWF4VGltZTogdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgc2xvdEV2ZW50T3ZlcmxhcDogdGhpcy5zbG90RXZlbnRPdmVybGFwLFxuICAgICAgICAgICAgbm93SW5kaWNhdG9yOiB0aGlzLm5vd0luZGljYXRvcixcbiAgICAgICAgICAgIGRyYWdSZXZlcnREdXJhdGlvbjogdGhpcy5kcmFnUmV2ZXJ0RHVyYXRpb24sXG4gICAgICAgICAgICBkcmFnT3BhY2l0eTogdGhpcy5kcmFnT3BhY2l0eSxcbiAgICAgICAgICAgIGRyYWdTY3JvbGw6IHRoaXMuZHJhZ1Njcm9sbCxcbiAgICAgICAgICAgIGV2ZW50T3ZlcmxhcDogdGhpcy5ldmVudE92ZXJsYXAsXG4gICAgICAgICAgICBldmVudENvbnN0cmFpbnQ6IHRoaXMuZXZlbnRDb25zdHJhaW50LFxuICAgICAgICAgICAgZXZlbnRzOiAoc3RhcnQsIGVuZCwgdGltZXpvbmUsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5ldmVudHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRheUNsaWNrOiAoZGF0ZSwganNFdmVudCwgdmlldykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25EYXlDbGljay5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGUnOiBkYXRlLFxuICAgICAgICAgICAgICAgICAgICAnanNFdmVudCc6IGpzRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICd2aWV3Jzogdmlld1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50Q2xpY2s6IChjYWxFdmVudCwganNFdmVudCwgdmlldykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FdmVudENsaWNrLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAnY2FsRXZlbnQnOiBjYWxFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ2pzRXZlbnQnOiBqc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAndmlldyc6IHZpZXdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudE1vdXNlb3ZlcjogKGNhbEV2ZW50LCBqc0V2ZW50LCB2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkV2ZW50TW91c2VvdmVyLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAnY2FsRXZlbnQnOiBjYWxFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ2pzRXZlbnQnOiBqc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAndmlldyc6IHZpZXdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudE1vdXNlb3V0OiAoY2FsRXZlbnQsIGpzRXZlbnQsIHZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXZlbnRNb3VzZW92ZXIuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICdjYWxFdmVudCc6IGNhbEV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAnanNFdmVudCc6IGpzRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICd2aWV3Jzogdmlld1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50RHJhZ1N0YXJ0OiAoZXZlbnQsIGpzRXZlbnQsIHVpLCB2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkV2ZW50RHJhZ1N0YXJ0LmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAnZXZlbnQnOiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ2pzRXZlbnQnOiBqc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAndmlldyc6IHZpZXdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudERyYWdTdG9wOiAoZXZlbnQsIGpzRXZlbnQsIHVpLCB2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkV2ZW50RHJhZ1N0b3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICdldmVudCc6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAnanNFdmVudCc6IGpzRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICd2aWV3Jzogdmlld1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50RHJvcDogKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXZlbnREcm9wLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAnZXZlbnQnOiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ2RlbHRhJzogZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgICdyZXZlcnRGdW5jJzogcmV2ZXJ0RnVuYyxcbiAgICAgICAgICAgICAgICAgICAgJ2pzRXZlbnQnOiBqc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAndmlldyc6IHZpZXdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudFJlc2l6ZVN0YXJ0OiAoZXZlbnQsIGpzRXZlbnQsIHVpLCB2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkV2ZW50UmVzaXplU3RhcnQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICdldmVudCc6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAnanNFdmVudCc6IGpzRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICd2aWV3Jzogdmlld1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50UmVzaXplU3RvcDogKGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FdmVudFJlc2l6ZVN0b3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICdldmVudCc6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAnanNFdmVudCc6IGpzRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICd2aWV3Jzogdmlld1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50UmVzaXplOiAoZXZlbnQsIGRlbHRhLCByZXZlcnRGdW5jLCBqc0V2ZW50LCB1aSwgdmlldykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FdmVudFJlc2l6ZS5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgJ2V2ZW50JzogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICdkZWx0YSc6IGRlbHRhLFxuICAgICAgICAgICAgICAgICAgICAncmV2ZXJ0RnVuYyc6IHJldmVydEZ1bmMsXG4gICAgICAgICAgICAgICAgICAgICdqc0V2ZW50JzoganNFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ3ZpZXcnOiB2aWV3XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgZm9yKHZhciBwcm9wIGluIHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uc1twcm9wXSA9IHRoaXMubG9jYWxlW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjaGVkdWxlLmZ1bGxDYWxlbmRhcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBsZXQgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5ldmVudHMpO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5zY2hlZHVsZSAmJiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlLmZ1bGxDYWxlbmRhcigncmVmZXRjaEV2ZW50cycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGpRdWVyeSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0pLmZ1bGxDYWxlbmRhcignZGVzdHJveScpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUgPSBudWxsO1xuICAgIH1cblxufVxuIl19
