"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var people_model_1 = require('../../people/models/people.model');
var clinic_model_1 = require('./clinic.model');
var roster_model_1 = require('./roster.model');
var bookingtype_model_1 = require('./bookingtype.model');
var Doctor = (function (_super) {
    __extends(Doctor, _super);
    function Doctor(obj) {
        this.bookingTypes = [];
        this.clinics = [];
        this.rosters = [];
        if (obj && obj.Person) {
            _super.call(this, obj.Person);
        }
        else {
            _super.call(this, null);
        }
        this.doctorId = obj && obj.doctorId || null;
        this.personId = obj && obj.personId || null;
        this.isenable = obj && obj.isenable || null;
        this.companyId = obj && obj.companyId || null;
        this.userId = obj && obj.userId || null;
        this.signature = obj && obj.signature || null;
        this.timeInterval = obj && obj.timeInterval || null;
        this.createdBy = obj && obj.createdBy || null;
        this.creationDate = obj && obj.creationDate || null;
        this.lastUpdatedBy = obj && obj.lastUpdatedBy || null;
        this.lastUpdateDate = obj && obj.lastUpdateDate || null;
        if (obj && obj.Person) {
            this.person = new people_model_1.People(obj.Person);
        }
        if (obj && obj.BookingTypes) {
            for (var _i = 0, _a = obj.BookingTypes; _i < _a.length; _i++) {
                var b = _a[_i];
                this.bookingTypes.push(new bookingtype_model_1.BookingType(b));
            }
        }
        if (obj && obj.Clinics) {
            for (var _b = 0, _c = obj.Clinics; _b < _c.length; _b++) {
                var c = _c[_b];
                this.clinics.push(new clinic_model_1.Clinic(c));
            }
        }
        if (obj && obj.Rosters) {
            for (var _d = 0, _e = obj.Rosters; _d < _e.length; _d++) {
                var c = _e[_d];
                this.rosters.push(new roster_model_1.Roster(c));
            }
        }
    }
    Doctor.prototype.setPerson = function (person) {
        this.person = person;
    };
    return Doctor;
}(people_model_1.People));
exports.Doctor = Doctor;
//# sourceMappingURL=doctor.model.js.map