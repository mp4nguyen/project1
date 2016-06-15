"use strict";
var clinic_model_1 = require('./clinic.model');
var doctor_model_1 = require('./doctor.model');
var Company = (function () {
    function Company(obj) {
        this.clinics = [];
        this.doctors = [];
        this.companyId = obj && obj.companyId || null;
        this.companyName = obj && obj.companyName || null;
        this.isenable = obj && obj.isenable || null;
        this.address = obj && obj.address || null;
        this.suburbDistrict = obj && obj.suburbDistrict || null;
        this.ward = obj && obj.ward || null;
        this.postcode = obj && obj.postcode || null;
        this.stateProvince = obj && obj.stateProvince || null;
        this.country = obj && obj.country || null;
        this.description = obj && obj.description || null;
        this.policy = obj && obj.policy || null;
        this.conditionToBook = obj && obj.conditionToBook || null;
        this.logoPath = obj && obj.logoPath || null;
        this.createdBy = obj && obj.createdBy || null;
        this.creationDate = obj && obj.creationDate || null;
        this.lastUpdatedBy = obj && obj.lastUpdatedBy || null;
        this.lastUpdateDate = obj && obj.lastUpdateDate || null;
        if (obj && obj.Clinics) {
            for (var _i = 0, _a = obj.Clinics; _i < _a.length; _i++) {
                var c = _a[_i];
                this.pushClinic(c);
            }
        }
        if (obj && obj.Doctors) {
            for (var _b = 0, _c = obj.Doctors; _b < _c.length; _b++) {
                var c = _c[_b];
                this.pushDoctor(c);
            }
        }
    }
    Company.prototype.pushClinic = function (obj) {
        this.clinics.push(new clinic_model_1.Clinic(obj));
    };
    Company.prototype.pushDoctor = function (obj) {
        this.doctors.push(new doctor_model_1.Doctor(obj));
    };
    return Company;
}());
exports.Company = Company;
//# sourceMappingURL=company.model.js.map