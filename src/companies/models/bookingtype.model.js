"use strict";
var BookingType = (function () {
    function BookingType(obj) {
        this.bookingTypeId = obj && obj.bookingTypeId || null;
        this.bookingTypeName = obj && obj.bookingTypeName || null;
        this.isenable = obj && obj.isenable || null;
        this.createdBy = obj && obj.createdBy || null;
        this.creationDate = obj && obj.creationDate || null;
        this.lastUpdatedBy = obj && obj.lastUpdatedBy || null;
        this.lastUpdateDate = obj && obj.lastUpdateDate || null;
    }
    return BookingType;
}());
exports.BookingType = BookingType;
//# sourceMappingURL=bookingtype.model.js.map