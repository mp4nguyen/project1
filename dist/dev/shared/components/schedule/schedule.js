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
        this.defaultView = 'agendaDay';
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
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
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
            resources: this.resources,
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
        __metadata('design:type', Array)
    ], Schedule.prototype, "resources", void 0);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL3NjaGVkdWxlL3NjaGVkdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBNkcsZUFBZSxDQUFDLENBQUE7QUFRN0g7SUFvR0ksa0JBQW9CLEVBQWMsRUFBRSxPQUF3QjtRQUF4QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBeEV6QixnQkFBVyxHQUFXLElBQUksQ0FBQztRQVkzQixnQkFBVyxHQUFXLFdBQVcsQ0FBQztRQUVsQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGlCQUFZLEdBQVEsVUFBVSxDQUFDO1FBTS9CLGVBQVUsR0FBUSxVQUFVLENBQUM7UUFFN0IsWUFBTyxHQUFRLFVBQVUsQ0FBQztRQUUxQixZQUFPLEdBQVEsVUFBVSxDQUFDO1FBRTFCLHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUlqQyx1QkFBa0IsR0FBVyxHQUFHLENBQUM7UUFFakMsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFFMUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQVExQixlQUFVLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRW5ELGlCQUFZLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXJELHFCQUFnQixHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUV6RCxvQkFBZSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUV4RCxxQkFBZ0IsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFekQsb0JBQWUsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFeEQsZ0JBQVcsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFcEQsdUJBQWtCLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRTNELHNCQUFpQixHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUUxRCxrQkFBYSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQVc1RCxJQUFJLENBQUMsTUFBTSxHQUFH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QUFBIiwiZmlsZSI6InNoYXJlZC9jb21wb25lbnRzL3NjaGVkdWxlL3NjaGVkdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uRGVzdHJveSxEb0NoZWNrLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsSXRlcmFibGVEaWZmZXJzfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNjaGVkdWxlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj48L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFNjaGVkdWxlIHtcbiAgICBcbiAgICBASW5wdXQoKSBldmVudHM6IGFueVtdO1xuICAgIFxuICAgIEBJbnB1dCgpIHJlc291cmNlczogYW55W107XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgcnRsOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIHdlZWtlbmRzOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGhpZGRlbkRheXM6IG51bWJlcltdO1xuICAgICAgICBcbiAgICBASW5wdXQoKSBmaXhlZFdlZWtDb3VudDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSB3ZWVrTnVtYmVyczogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBidXNpbmVzc0hvdXJzOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgaGVpZ2h0OiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgY29udGVudEhlaWdodDogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGFzcGVjdFJhdGlvOiBudW1iZXIgPSAxLjM1O1xuICAgIFxuICAgIEBJbnB1dCgpIGV2ZW50TGltaXQ6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBkZWZhdWx0RGF0ZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGV2ZW50U3RhcnRFZGl0YWJsZTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBldmVudER1cmF0aW9uRWRpdGFibGU6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgZGVmYXVsdFZpZXc6IHN0cmluZyA9ICdhZ2VuZGFEYXknOy8vbW9udGhcbiAgICBcbiAgICBASW5wdXQoKSBhbGxEYXlTbG90OiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBzbG90RHVyYXRpb246IGFueSA9ICcwMDozMDowMCc7XG4gICAgXG4gICAgQElucHV0KCkgc2xvdExhYmVsSW50ZXJ2YWw6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBzbmFwRHVyYXRpb246IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBzY3JvbGxUaW1lOiBhbnkgPSAnMDY6MDA6MDAnO1xuICAgIFxuICAgIEBJbnB1dCgpIG1pblRpbWU6IGFueSA9ICcwMDowMDowMCc7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIG1heFRpbWU6IGFueSA9ICcyNDowMDowMCc7XG4gICAgXG4gICAgQElucHV0KCkgc2xvdEV2ZW50T3ZlcmxhcDogYm9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgQElucHV0KCkgbm93SW5kaWNhdG9yOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGRyYWdSZXZlcnREdXJhdGlvbjogbnVtYmVyID0gNTAwO1xuICAgIFxuICAgIEBJbnB1dCgpIGRyYWdPcGFjaXR5OiBudW1iZXIgPSAuNzU7XG4gICAgXG4gICAgQElucHV0KCkgZHJhZ1Njcm9sbDogYm9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgQElucHV0KCkgZXZlbnRPdmVybGFwOiBhbnk7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIGV2ZW50Q29uc3RyYWludDogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGxvY2FsZTogYW55O1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkRheUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25FdmVudENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgXG4gICAgQE91dHB1dCgpIG9uRXZlbnRNb3VzZW92ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAgICAgXG4gICAgQE91dHB1dCgpIG9uRXZlbnRNb3VzZW91dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRXZlbnREcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRXZlbnREcmFnU3RvcDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRXZlbnREcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25FdmVudFJlc2l6ZVN0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25FdmVudFJlc2l6ZVN0b3A6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkV2ZW50UmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcbiAgICBcbiAgICBzdG9wTmdPbkNoYW5nZXNQcm9wYWdhdGlvbjogYm9vbGVhbjtcbiAgICBcbiAgICBkaWZmZXI6IGFueTtcbiAgICBcbiAgICBzY2hlZHVsZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzKSB7XG4gICAgICAgIHRoaXMuZGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUgPSBqUXVlcnkodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBzY2hlZHVsZXJMaWNlbnNlS2V5OiAnR1BMLU15LVByb2plY3QtSXMtT3Blbi1Tb3VyY2UnLFxuICAgICAgICAgICAgdGhlbWU6IHRydWUsXG4gICAgICAgICAgICBoZWFkZXI6IHRoaXMuaGVhZGVyLFxuICAgICAgICAgICAgaXNSVEw6IHRoaXMucnRsLFxuICAgICAgICAgICAgd2Vla2VuZHM6IHRoaXMud2Vla2VuZHMsXG4gICAgICAgICAgICBoaWRkZW5EYXlzOiB0aGlzLmhpZGRlbkRheXMsXG4gICAgICAgICAgICBmaXhlZFdlZWtDb3VudDogdGhpcy5maXhlZFdlZWtDb3VudCxcbiAgICAgICAgICAgIHdlZWtOdW1iZXJzOiB0aGlzLndlZWtOdW1iZXJzLFxuICAgICAgICAgICAgYnVzaW5lc3NIb3VyczogdGhpcy5idXNpbmVzc0hvdXJzLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgIGNvbnRlbnRIZWlnaHQ6IHRoaXMuY29udGVudEhlaWdodCxcbiAgICAgICAgICAgIGFzcGVjdFJhdGlvOiB0aGlzLmFzcGVjdFJhdGlvLFxuICAgICAgICAgICAgZXZlbnRMaW1pdDogdGhpcy5ldmVudExpbWl0LFxuICAgICAgICAgICAgZGVmYXVsdERhdGU6IHRoaXMuZGVmYXVsdERhdGUsXG4gICAgICAgICAgICBlZGl0YWJsZTogdGhpcy5lZGl0YWJsZSxcbiAgICAgICAgICAgIGV2ZW50U3RhcnRFZGl0YWJsZTogdGhpcy5ldmVudFN0YXJ0RWRpdGFibGUsXG4gICAgICAgICAgICBldmVudER1cmF0aW9uRWRpdGFibGU6IHRoaXMuZXZlbnREdXJhdGlvbkVkaXRhYmxlLFxuICAgICAgICAgICAgZGVmYXVsdFZpZXc6IHRoaXMuZGVmYXVsdFZpZXcsXG4gICAgICAgICAgICBhbGxEYXlzbG90OiB0aGlzLmFsbERheVNsb3QsXG4gICAgICAgICAgICBzbG90RHVyYXRpb246IHRoaXMuc2xvdER1cmF0aW9uLFxuICAgICAgICAgICAgc2xvdExhYmVsSW50ZXJ2YWw6IHRoaXMuc2xvdExhYmVsSW50ZXJ2YWwsXG4gICAgICAgICAgICBzbmFwRHVyYXRpb246IHRoaXMuc25hcER1cmF0aW9uLFxuICAgICAgICAgICAgc2Nyb2xsVGltZTogdGhpcy5zY3JvbGxUaW1lLFxuICAgICAgICAgICAgbWluVGltZTogdGhpcy5taW5UaW1lLFxuICAgICAgICAgICAgbWF4VGltZTogdGhpcy5tYXhUaW1lLFxuICAgICAgICAgICAgc2xvdEV2ZW50T3ZlcmxhcDogdGhpcy5zbG90RXZlbnRPdmVybGFwLFxuICAgICAgICAgICAgbm93SW5kaWNhdG9yOiB0aGlzLm5vd0luZGljYXRvcixcbiAgICAgICAgICAgIGRyYWdSZXZlcnREdXJhdGlvbjogdGhpcy5kcmFnUmV2ZXJ0RHVyYXRpb24sXG4gICAgICAgICAgICBkcmFnT3BhY2l0eTogdGhpcy5kcmFnT3BhY2l0eSxcbiAgICAgICAgICAgIGRyYWdTY3JvbGw6IHRoaXMuZHJhZ1Njcm9sbCxcbiAgICAgICAgICAgIGV2ZW50T3ZlcmxhcDogdGhpcy5ldmVudE92ZXJsYXAsXG4gICAgICAgICAgICBldmVudENvbnN0cmFpbnQ6IHRoaXMuZXZlbnRDb25zdHJhaW50LFxuICAgICAgICAgICAgZXZlbnRzOiAoc3RhcnQsIGVuZCwgdGltZXpvbmUsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5ldmVudHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc291cmNlczogdGhpcy5yZXNvdXJjZXMsICAgICAgICAgICAgXG4gICAgICAgICAgICBkYXlDbGljazogKGRhdGUsIGpzRXZlbnQsIHZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF5Q2xpY2suZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICdkYXRlJzogZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgJ2pzRXZlbnQnOiBqc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAndmlldyc6IHZpZXdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudENsaWNrOiAoY2FsRXZlbnQsIGpzRXZlbnQsIHZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXZlbnRDbGljay5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgJ2NhbEV2ZW50JzogY2FsRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICdqc0V2ZW50JzoganNFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ3ZpZXcnOiB2aWV3XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnRNb3VzZW92ZXI6IChjYWxFdmVudCwganNFdmVudCwgdmlldykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FdmVudE1vdXNlb3Zlci5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgJ2NhbEV2ZW50JzogY2FsRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICdqc0V2ZW50JzoganNFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ3ZpZXcnOiB2aWV3XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnRNb3VzZW91dDogKGNhbEV2ZW50LCBqc0V2ZW50LCB2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkV2ZW50TW91c2VvdmVyLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAnY2FsRXZlbnQnOiBjYWxFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ2pzRXZlbnQnOiBqc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAndmlldyc6IHZpZXdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudERyYWdTdGFydDogKGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FdmVudERyYWdTdGFydC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgJ2V2ZW50JzogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICdqc0V2ZW50JzoganNFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ3ZpZXcnOiB2aWV3XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnREcmFnU3RvcDogKGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FdmVudERyYWdTdG9wLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAnZXZlbnQnOiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ2pzRXZlbnQnOiBqc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAndmlldyc6IHZpZXdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudERyb3A6IChldmVudCwgZGVsdGEsIHJldmVydEZ1bmMsIGpzRXZlbnQsIHVpLCB2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkV2ZW50RHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgJ2V2ZW50JzogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICdkZWx0YSc6IGRlbHRhLFxuICAgICAgICAgICAgICAgICAgICAncmV2ZXJ0RnVuYyc6IHJldmVydEZ1bmMsXG4gICAgICAgICAgICAgICAgICAgICdqc0V2ZW50JzoganNFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ3ZpZXcnOiB2aWV3XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnRSZXNpemVTdGFydDogKGV2ZW50LCBqc0V2ZW50LCB1aSwgdmlldykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FdmVudFJlc2l6ZVN0YXJ0LmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAnZXZlbnQnOiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ2pzRXZlbnQnOiBqc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAndmlldyc6IHZpZXdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudFJlc2l6ZVN0b3A6IChldmVudCwganNFdmVudCwgdWksIHZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXZlbnRSZXNpemVTdG9wLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAnZXZlbnQnOiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgJ2pzRXZlbnQnOiBqc0V2ZW50LFxuICAgICAgICAgICAgICAgICAgICAndmlldyc6IHZpZXdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudFJlc2l6ZTogKGV2ZW50LCBkZWx0YSwgcmV2ZXJ0RnVuYywganNFdmVudCwgdWksIHZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXZlbnRSZXNpemUuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICdldmVudCc6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAnZGVsdGEnOiBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgJ3JldmVydEZ1bmMnOiByZXZlcnRGdW5jLFxuICAgICAgICAgICAgICAgICAgICAnanNFdmVudCc6IGpzRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICd2aWV3Jzogdmlld1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5sb2NhbGUpIHtcbiAgICAgICAgICAgIGZvcih2YXIgcHJvcCBpbiB0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnNbcHJvcF0gPSB0aGlzLmxvY2FsZVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zY2hlZHVsZS5mdWxsQ2FsZW5kYXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgbGV0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMuZXZlbnRzKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2NoZWR1bGUgJiYgY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZS5mdWxsQ2FsZW5kYXIoJ3JlZmV0Y2hFdmVudHMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBqUXVlcnkodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKS5mdWxsQ2FsZW5kYXIoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlID0gbnVsbDtcbiAgICB9XG5cbn1cbiJdfQ==
