"use strict";
var bookingtype_model_1 = require('./bookingtype.model');
var doctor_model_1 = require('./doctor.model');
var Clinic = (function () {
    function Clinic(obj) {
        this.bookingTypes = [];
        this.doctors = [];
        this.clinicId = obj && obj.clinicId || null;
        this.clinicName = obj && obj.clinicName || null;
        this.isenable = obj && obj.isenable || null;
        this.companyId = obj && obj.companyId || null;
        this.isbookable = obj && obj.isbookable || null;
        this.istelehealth = obj && obj.istelehealth || null;
        this.iscalendar = obj && obj.iscalendar || null;
        this.description = obj && obj.description || null;
        this.address = obj && obj.address || null;
        this.suburbDistrict = obj && obj.suburbDistrict || null;
        this.ward = obj && obj.ward || null;
        this.postcode = obj && obj.postcode || null;
        this.stateProvince = obj && obj.stateProvince || null;
        this.country = obj && obj.country || null;
        this.createdBy = obj && obj.createdBy || null;
        this.creationDate = obj && obj.creationDate || null;
        this.lastUpdatedBy = obj && obj.lastUpdatedBy || null;
        this.lastUpdateDate = obj && obj.lastUpdateDate || null;
        if (obj && obj.BookingTypes) {
            for (var _i = 0, _a = obj.BookingTypes; _i < _a.length; _i++) {
                var c = _a[_i];
                this.pushBookingTypes(c);
            }
        }
        if (obj && obj.Doctors) {
            for (var _b = 0, _c = obj.Doctors; _b < _c.length; _b++) {
                var c = _c[_b];
                this.pushDoctor(c);
            }
        }
    }
    Clinic.prototype.setBookingTypes = function (bookingtypes) {
        for (var _i = 0, bookingtypes_1 = bookingtypes; _i < bookingtypes_1.length; _i++) {
            var bt = bookingtypes_1[_i];
            this.bookingTypes.push(new bookingtype_model_1.BookingType(bt));
        }
    };
    Clinic.prototype.pushBookingTypes = function (bookingtype) {
        this.bookingTypes.push(new bookingtype_model_1.BookingType(bookingtype));
    };
    Clinic.prototype.pushDoctor = function (doctor) {
        this.doctors.push(new doctor_model_1.Doctor(doctor));
    };
    return Clinic;
}());
exports.Clinic = Clinic;
//# sourceMappingURL=clinic.model.js.map