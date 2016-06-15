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
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var schedule_1 = require('../../shared/components/schedule/schedule');
var dialog_component_1 = require("../../shared/components/dialog/dialog.component");
var logging_service_1 = require('../../shared/services/logging.service');
var input_component_1 = require('../../shared/components/input/input.component');
var DoctorScheduleComponent = (function () {
    function DoctorScheduleComponent(_log) {
        this._log = _log;
        this.addedEvent = new core_1.EventEmitter();
        this.resources = [];
        this.dialogVisible = false;
        this.idGen = 100;
        this.components = new Array();
        this.repeatTypes = [
            { name: 'DAILY' },
            { name: 'MONTHLY' },
            { name: 'WEEKLY' },
            { name: '2WEEKLY' },
            { name: '3WEEKLY' },
            { name: '4WEEKLY' },
            { name: '5WEEKLY' },
            { name: '6WEEKLY' },
            { name: '7WEEKLY' },
            { name: '8WEEKLY' }
        ];
        this.rosterIdControl = new common_1.Control();
        this.doctorIdControl = new common_1.Control();
        this.dayOfWeekControl = new common_1.Control();
        this.fromTimeControl = new common_1.Control();
        this.toTimeControl = new common_1.Control();
        this.fromDateControl = new common_1.Control();
        this.toDateControl = new common_1.Control();
        this.workingSiteIdControl = new common_1.Control();
        this.bookingTypeIdControl = new common_1.Control();
        this.timeIntervalControl = new common_1.Control();
        this.repeatTypeControl = new common_1.Control();
        this.isenableControl = new common_1.Control();
        this.components.push({ control: this.fromTimeControl, type: 'text', title: 'From Time', placeholder: 'From time', isRequired: true, requiredMsg: 'Address is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.toTimeControl, type: 'text', title: 'To Time', placeholder: 'To time', isRequired: true, requiredMsg: 'Address is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.fromDateControl, type: 'text', title: 'From date', placeholder: 'From date', isRequired: true, requiredMsg: 'Address is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.toDateControl, type: 'text', title: 'To date', placeholder: 'To date', isRequired: true, requiredMsg: 'Address is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.workingSiteIdControl, type: 'option', title: 'Site', placeholder: 'Site', isRequired: false, requiredMsg: 'Ward is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.workingSites, displayProperty: 'clinicName', returnProperty: 'clinicId' });
        this.components.push({ control: this.bookingTypeIdControl, type: 'option', title: 'Type', placeholder: 'Type', isRequired: true, requiredMsg: 'District is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.bookingTypes, displayProperty: 'bookingTypeName', returnProperty: 'bookingTypeId' });
        this.components.push({ control: this.timeIntervalControl, type: 'number', title: 'Time Interval', placeholder: 'Time interval', isRequired: true, requiredMsg: 'Province is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.repeatTypeControl, type: 'option', title: 'Repeat Type', placeholder: 'Repeat type', isRequired: true, requiredMsg: 'Country is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.repeatTypes, displayProperty: 'name', returnProperty: 'name' });
        this.myForm = new common_1.ControlGroup({
            rosterId: this.rosterIdControl,
            doctorId: this.doctorIdControl,
            dayOfWeek: this.dayOfWeekControl,
            fromTime: this.fromTimeControl,
            toTime: this.toTimeControl,
            fromDate: this.fromDateControl,
            toDate: this.toDateControl,
            workingSiteId: this.workingSiteIdControl,
            bookingTypeId: this.bookingTypeIdControl,
            timeInterval: this.timeIntervalControl,
            repeatType: this.repeatTypeControl,
            isenable: this.isenableControl
        });
        this.resources = [
            {
                id: 'a',
                title: 'Room A'
            },
            {
                id: 'b',
                title: 'Room B'
            }
        ];
        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }
    DoctorScheduleComponent.prototype.ngOnInit = function () {
        this.components[4] = ({ control: this.workingSiteIdControl, type: 'option', title: 'Site', placeholder: 'Site', isRequired: false, requiredMsg: 'Ward is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.workingSites, displayProperty: 'clinicName', returnProperty: 'clinicId' });
        this.components[5] = ({ control: this.bookingTypeIdControl, type: 'option', title: 'Type', placeholder: 'Type', isRequired: true, requiredMsg: 'District is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.bookingTypes, displayProperty: 'bookingTypeName', returnProperty: 'bookingTypeId' });
    };
    DoctorScheduleComponent.prototype.handleDayClick = function (event) {
        var _this = this;
        this.fromTimeControl.updateValue('08:00');
        this.toTimeControl.updateValue('17:00');
        this.fromDateControl.updateValue(event.date.format('YYYY-MM-DD'));
        this.toDateControl.updateValue(event.date.format('YYYY-MM-DD'));
        this.timeIntervalControl.updateValue('15');
        this.repeatTypeControl.updateValue('WEEKLY');
        console.log('handleDayClick events = ', this.events, this.bookingTypes, this.workingSites);
        console.log('handleDayClick event = ', event);
        this.myDialog.activate().subscribe(function (rs) {
            _this._log.log(' dialog result = ', rs);
        });
    };
    DoctorScheduleComponent.prototype.handleEventClick = function (e) {
        console.log('handleEventClick e =', e);
    };
    DoctorScheduleComponent.prototype.saveEvent = function () {
        this._log.log(this.myForm.value);
        this.addedEvent.next(this.myForm.value);
        this.myDialog.ok(null);
    };
    DoctorScheduleComponent.prototype.deleteEvent = function () {
        var index = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    };
    DoctorScheduleComponent.prototype.findEventIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.events.length; i++) {
            if (id == this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    __decorate([
        core_1.ViewChild('myDialog'), 
        __metadata('design:type', dialog_component_1.DialogComponent)
    ], DoctorScheduleComponent.prototype, "myDialog", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DoctorScheduleComponent.prototype, "events", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DoctorScheduleComponent.prototype, "workingSites", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DoctorScheduleComponent.prototype, "bookingTypes", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DoctorScheduleComponent.prototype, "addedEvent", void 0);
    DoctorScheduleComponent = __decorate([
        core_1.Component({
            selector: 'doctor-schedule',
            directives: [dialog_component_1.DialogComponent, input_component_1.InputComponent, schedule_1.Schedule, Growl],
            template: "    \n    <p-schedule [events]=\"events\" [defaultView]=\"'month'\" [header]=\"header\" [eventLimit]=\"4\" [editable]=\"true\" (onDayClick)=\"handleDayClick($event)\" (onEventClick)=\"handleEventClick($event)\"></p-schedule>\n    <my-dialog #myDialog>\n        <div class=\"modal-header\">\n            <button type=\"button\" (click)=\"myDialog.close()\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"></button>\n            <h4 class=\"modal-title\">Booking Type</h4>\n        </div>\n        <div class=\"modal-body\"> \n             <div class=\"portlet-body form\">\n                    <form role=\"form\">\n                        <div class=\"form-body\">\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[0]\"></my-input>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[1]\"></my-input>\n                                </div>                                                                \n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[2]\"></my-input>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[3]\"></my-input>\n                                </div>                                                                \n                            </div>                            \n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[4]\"></my-input>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[5]\"></my-input>\n                                </div>                                                                \n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-md-6\">\n                                    <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[6]\"></my-input>\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[7]\"></my-input>\n                                </div>                                                                                            \n                            </div>\n                        </div>\n                    </form>\n                </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button (click)=\"myDialog.cancel()\" type=\"button\" class=\"btn dark btn-outline\" data-dismiss=\"modal\">Close</button>\n            <button (click)=\"saveEvent()\" type=\"button\" class=\"btn green\">Add</button>\n        </div>\n    </my-dialog>    \n    "
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger])
    ], DoctorScheduleComponent);
    return DoctorScheduleComponent;
}());
exports.DoctorScheduleComponent = DoctorScheduleComponent;
var MyEvent = (function () {
    function MyEvent() {
        this.allDay = true;
    }
    return MyEvent;
}());
exports.MyEvent = MyEvent;
//# sourceMappingURL=doctorschedule.component.js.map