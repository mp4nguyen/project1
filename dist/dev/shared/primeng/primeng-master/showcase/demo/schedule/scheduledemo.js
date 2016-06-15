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
var http_1 = require('angular2/http');
var schedule_1 = require('../../../components/schedule/schedule');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var calendar_1 = require('../../../components/calendar/calendar');
var button_1 = require('../../../components/button/button');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var dialog_1 = require('../../../components/dialog/dialog');
var checkbox_1 = require('../../../components/checkbox/checkbox');
var eventservice_1 = require('../service/eventservice');
var router_deprecated_1 = require('angular2/router-deprecated');
var ScheduleDemo = (function () {
    function ScheduleDemo(eventService, cd) {
        this.eventService = eventService;
        this.cd = cd;
        this.dialogVisible = false;
        this.idGen = 100;
    }
    ScheduleDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.eventService.getEvents().then(function (events) { _this.events = events; });
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    };
    ScheduleDemo.prototype.handleDayClick = function (event) {
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
        this.cd.detectChanges();
    };
    ScheduleDemo.prototype.handleEventClick = function (e) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;
        var start = e.calEvent.start;
        var end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }
        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }
        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    };
    ScheduleDemo.prototype.saveEvent = function () {
        if (this.event.id) {
            var index = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
            }
        }
        else {
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }
        this.dialogVisible = false;
    };
    ScheduleDemo.prototype.deleteEvent = function () {
        var index = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    };
    ScheduleDemo.prototype.findEventIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.events.length; i++) {
            if (id == this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    ScheduleDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/schedule/scheduledemo.html',
            directives: [schedule_1.Schedule, button_1.Button, inputtext_1.InputText, calendar_1.Calendar, dialog_1.Dialog, checkbox_1.Checkbox, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, eventservice_1.EventService],
            styles: ["\n        .ui-grid-row div {\n          padding: 4px 10px\n        }\n        \n        .ui-grid-row div label {\n          font-weight: bold;\n        }\n  "]
        }), 
        __metadata('design:paramtypes', [eventservice_1.EventService, core_1.ChangeDetectorRef])
    ], ScheduleDemo);
    return ScheduleDemo;
}());
exports.ScheduleDemo = ScheduleDemo;
var MyEvent = (function () {
    function MyEvent() {
        this.allDay = true;
    }
    return MyEvent;
}());
exports.MyEvent = MyEvent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vc2NoZWR1bGUvc2NoZWR1bGVkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBaUQsZUFBZSxDQUFDLENBQUE7QUFDakUscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBQ2hELHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELDZCQUEyQix5QkFBeUIsQ0FBQyxDQUFBO0FBQ3JELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBZ0I3RDtJQVlJLHNCQUFvQixZQUEwQixFQUFVLEVBQXFCO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFKN0Usa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsVUFBSyxHQUFXLEdBQUcsQ0FBQztJQUU2RCxDQUFDO0lBRWxGLCtCQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFLLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNuQixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsS0FBSyxFQUFFLDRCQUE0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LElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2YsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLEVBQUUsQ0FBQSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ1YsS0FBSyxDQUFDO1lBQ1YsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUF4R0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxVQUFVLEVBQUUsQ0FBQyxtQkFBUSxFQUFDLGVBQU0sRUFBQyxxQkFBUyxFQUFDLG1CQUFRLEVBQUMsZUFBTSxFQUFDLG1CQUFRLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGVBQU0sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1lBQzFILFNBQVMsRUFBRSxDQUFDLHFCQUFjLEVBQUMsMkJBQVksQ0FBQztZQUN4QyxNQUFNLEVBQUUsQ0FBQywrSkFRVixDQUFDO1NBQ0gsQ0FBQzs7b0JBQUE7SUE0RkYsbUJBQUM7QUFBRCxDQTNGQSxBQTJGQyxJQUFBO0FBM0ZZLG9CQUFZLGVBMkZ4QixDQUFBO0FBRUQ7SUFBQTtRQUtJLFdBQU0sR0FBWSxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUFELGNBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQU5ZLGVBQU8sVUFNbkIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL3NjaGVkdWxlL3NjaGVkdWxlZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdCxDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSAgICBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCB7U2NoZWR1bGV9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc2NoZWR1bGUvc2NoZWR1bGUnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0NhbGVuZGFyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtJbnB1dFRleHR9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXR0ZXh0L2lucHV0dGV4dCc7XG5pbXBvcnQge0RpYWxvZ30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nJztcbmltcG9ydCB7Q2hlY2tib3h9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY2hlY2tib3gvY2hlY2tib3gnO1xuaW1wb3J0IHtFdmVudFNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvZXZlbnRzZXJ2aWNlJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL3NjaGVkdWxlL3NjaGVkdWxlZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbU2NoZWR1bGUsQnV0dG9uLElucHV0VGV4dCxDYWxlbmRhcixEaWFsb2csQ2hlY2tib3gsVGFiUGFuZWwsVGFiVmlldyxCdXR0b24sQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBwcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSUyxFdmVudFNlcnZpY2VdLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLnVpLWdyaWQtcm93IGRpdiB7XG4gICAgICAgICAgcGFkZGluZzogNHB4IDEwcHhcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLnVpLWdyaWQtcm93IGRpdiBsYWJlbCB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIH1cbiAgYF1cbn0pXG5leHBvcnQgY2xhc3MgU2NoZWR1bGVEZW1vIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGV2ZW50czogYW55W107XG4gICAgXG4gICAgaGVhZGVyOiBhbnk7XG4gICAgXG4gICAgZXZlbnQ6IE15RXZlbnQ7XG4gICAgXG4gICAgZGlhbG9nVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgIGlkR2VuOiBudW1iZXIgPSAxMDA7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldEV2ZW50cygpLnRoZW4oZXZlbnRzID0+IHt0aGlzLmV2ZW50cyA9IGV2ZW50czt9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGVhZGVyID0ge1xuXHRcdFx0bGVmdDogJ3ByZXYsbmV4dCB0b2RheScsXG5cdFx0XHRjZW50ZXI6ICd0aXRsZScsXG5cdFx0XHRyaWdodDogJ21vbnRoLGFnZW5kYVdlZWssYWdlbmRhRGF5J1xuXHRcdH07XG4gICAgfVxuICAgIFxuICAgIGhhbmRsZURheUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSBuZXcgTXlFdmVudCgpO1xuICAgICAgICB0aGlzLmV2ZW50LnN0YXJ0ID0gZXZlbnQuZGF0ZS5mb3JtYXQoKTtcbiAgICAgICAgdGhpcy5kaWFsb2dWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIC8vdHJpZ2dlciBkZXRlY3Rpb24gbWFudWFsbHkgYXMgc29tZWhvdyBvbmx5IG1vdmluZyB0aGUgbW91c2UgcXVpY2tseSBhZnRlciBjbGljayB0cmlnZ2VycyB0aGUgYXV0b21hdGljIGRldGVjdGlvblxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlRXZlbnRDbGljayhlKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSBuZXcgTXlFdmVudCgpO1xuICAgICAgICB0aGlzLmV2ZW50LnRpdGxlID0gZS5jYWxFdmVudC50aXRsZTtcbiAgICAgICAgXG4gICAgICAgIGxldCBzdGFydCA9IGUuY2FsRXZlbnQuc3RhcnQ7XG4gICAgICAgIGxldCBlbmQgPSBlLmNhbEV2ZW50LmVuZDtcbiAgICAgICAgaWYoZS52aWV3Lm5hbWUgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIHN0YXJ0LnN0cmlwVGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihlbmQpIHtcbiAgICAgICAgICAgIGVuZC5zdHJpcFRpbWUoKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnQuZW5kID0gZW5kLmZvcm1hdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ldmVudC5pZCA9IGUuY2FsRXZlbnQuaWQ7XG4gICAgICAgIHRoaXMuZXZlbnQuc3RhcnQgPSBzdGFydC5mb3JtYXQoKTtcbiAgICAgICAgdGhpcy5ldmVudC5hbGxEYXkgPSBlLmNhbEV2ZW50LmFsbERheTtcbiAgICAgICAgdGhpcy5kaWFsb2dWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgc2F2ZUV2ZW50KCkge1xuICAgICAgICAvL3VwZGF0ZVxuICAgICAgICBpZih0aGlzLmV2ZW50LmlkKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuZmluZEV2ZW50SW5kZXhCeUlkKHRoaXMuZXZlbnQuaWQpO1xuICAgICAgICAgICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzW2luZGV4XSA9IHRoaXMuZXZlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9uZXdcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50LmlkID0gdGhpcy5pZEdlbjtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnB1c2godGhpcy5ldmVudCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kaWFsb2dWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZUV2ZW50KCkge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuZmluZEV2ZW50SW5kZXhCeUlkKHRoaXMuZXZlbnQuaWQpO1xuICAgICAgICBpZihpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBmaW5kRXZlbnRJbmRleEJ5SWQoaWQ6IG51bWJlcinCoHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoaWQgPT0gdGhpcy5ldmVudHNbaV0uaWQpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNeUV2ZW50IHtcbiAgICBpZDogbnVtYmVyO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc3RhcnQ6IHN0cmluZztcbiAgICBlbmQ6IHN0cmluZztcbiAgICBhbGxEYXk6IGJvb2xlYW4gPSB0cnVlO1xufSJdfQ==
