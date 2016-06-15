"use strict";
var mysqldate_service_1 = require('../../shared/services/mysqldate.service');
var moment = require('moment');
var Roster = (function () {
    function Roster(obj) {
        this.mysqlDate = new mysqldate_service_1.MysqlDate();
        this.rosterId = obj && obj.rosterId || null;
        this.doctorId = obj && obj.doctorId || null;
        this.bookingTypeId = obj && obj.bookingTypeId || null;
        this.workingSiteId = obj && obj.workingSiteId || null;
        this.fromDate = obj && obj.fromDate || null;
        this.toDate = obj && obj.toDate || null;
        this.timeInterval = obj && obj.timeInterval || null;
        this.repeatType = obj && obj.repeatType || null;
        this.dayOfWeek = obj && obj.dayOfWeek || null;
        this.createdBy = obj && obj.createdBy || null;
        this.creationDate = obj && obj.creationDate || null;
        this.lastUpdatedBy = obj && obj.lastUpdatedBy || null;
        this.lastUpdateDate = obj && obj.lastUpdateDate || null;
        this.workingSiteName = obj && obj.Clinic.clinicName || null;
        this.bookingTypeName = obj && obj.BookingType.bookingTypeName || null;
        this.start = moment(this.mysqlDate.mysqlDate(this.fromDate)).format('YYYY-MM-DDTHH:mm:ss');
        this.end = moment(this.mysqlDate.mysqlDate(this.toDate)).format('YYYY-MM-DDTHH:mm:ss');
        this.title = this.workingSiteName + ' for ' + this.bookingTypeName;
    }
    return Roster;
}());
exports.Roster = Roster;
//# sourceMappingURL=roster.model.js.map