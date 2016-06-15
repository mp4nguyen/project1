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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9tb2RlbHMvY2xpbmljLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrQ0FBMEIscUJBQXFCLENBQUMsQ0FBQTtBQUNoRCw2QkFBcUIsZ0JBQWdCLENBQUMsQ0FBQTtBQUV0QztJQXVCQyxnQkFBWSxHQUFTO1FBSGxCLGlCQUFZLEdBQWtCLEVBQUUsQ0FBQztRQUNqQyxZQUFPLEdBQWEsRUFBRSxDQUFDO1FBSXpCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1FBQzFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO1FBQ2xELElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDO1FBQ3BELElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxJQUFFLEdBQUcsQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDO1FBRXRELEVBQUUsQ0FBQSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQztZQUN4QixHQUFHLENBQUEsQ0FBVSxVQUFnQixFQUFoQixLQUFBLEdBQUcsQ0FBQyxZQUFZLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCLENBQUM7Z0JBQTFCLElBQUksQ0FBQyxTQUFBO2dCQUVSLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6QjtRQUNGLENBQUM7UUFFSixFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7WUFDbkIsR0FBRyxDQUFBLENBQVUsVUFBVyxFQUFYLEtBQUEsR0FBRyxDQUFDLE9BQU8sRUFBWCxjQUFXLEVBQVgsSUFBVyxDQUFDO2dCQUFyQixJQUFJLENBQUMsU0FBQTtnQkFFUixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25CO1FBQ0YsQ0FBQztJQUNMLENBQUM7SUFFRCxnQ0FBZSxHQUFmLFVBQWdCLFlBQWdCO1FBQy9CLEdBQUcsQ0FBQSxDQUFXLFVBQVksRUFBWiw2QkFBWSxFQUFaLDBCQUFZLEVBQVosSUFBWSxDQUFDO1lBQXZCLElBQUksRUFBRSxxQkFBQTtZQUNULElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksK0JBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVDO0lBQ0YsQ0FBQztJQUVELGlDQUFnQixHQUFoQixVQUFpQixXQUFlO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksK0JBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCwyQkFBVSxHQUFWLFVBQVcsTUFBVTtRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0YsYUFBQztBQUFELENBeEVBLEFBd0VDLElBQUE7QUF4RVksY0FBTSxTQXdFbEIsQ0FBQSIsImZpbGUiOiJjb21wYW5pZXMvbW9kZWxzL2NsaW5pYy5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Qm9va2luZ1R5cGV9IGZyb20gJy4vYm9va2luZ3R5cGUubW9kZWwnO1xuaW1wb3J0IHtEb2N0b3J9IGZyb20gJy4vZG9jdG9yLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIENsaW5pY3tcblx0XG5cdGNsaW5pY0lkOiBudW1iZXI7XG4gICAgY2xpbmljTmFtZTogc3RyaW5nO1xuICAgIGlzZW5hYmxlOiBudW1iZXI7XG4gICAgY29tcGFueUlkOiBudW1iZXI7XG4gICAgaXNib29rYWJsZTogbnVtYmVyO1xuICAgIGlzdGVsZWhlYWx0aDogbnVtYmVyO1xuICAgIGlzY2FsZW5kYXI6IG51bWJlcjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBzdWJ1cmJEaXN0cmljdDogc3RyaW5nO1xuICAgIHdhcmQ6IHN0cmluZztcbiAgICBwb3N0Y29kZTogc3RyaW5nO1xuICAgIHN0YXRlUHJvdmluY2U6IHN0cmluZztcbiAgICBjb3VudHJ5OiBzdHJpbmc7XG4gICAgY3JlYXRlZEJ5OiBudW1iZXI7XG4gICAgY3JlYXRpb25EYXRlOiBEYXRlO1xuICAgIGxhc3RVcGRhdGVkQnk6IG51bWJlcjtcbiAgICBsYXN0VXBkYXRlRGF0ZTogRGF0ZTtcbiAgICBib29raW5nVHlwZXM6IEJvb2tpbmdUeXBlW10gPSBbXTtcbiAgICBkb2N0b3JzOiBEb2N0b3JbXSA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yKG9iaiA6IGFueSkge1xuXHRcdC8vIGNvZGUuLi5cblx0XHR0aGlzLmNsaW5pY0lkID0gb2JqJiZvYmouY2xpbmljSWQgfHwgbnVsbDtcblx0XHR0aGlzLmNsaW5pY05hbWUgPSBvYmomJm9iai5jbGluaWNOYW1lIHx8IG51bGw7XG5cdFx0dGhpcy5pc2VuYWJsZSA9IG9iaiYmb2JqLmlzZW5hYmxlIHx8IG51bGw7XG5cdFx0dGhpcy5jb21wYW55SWQgPSBvYmomJm9iai5jb21wYW55SWQgfHwgbnVsbDtcblx0XHR0aGlzLmlzYm9va2FibGUgPSBvYmomJm9iai5pc2Jvb2thYmxlIHx8IG51bGw7XG5cdFx0dGhpcy5pc3RlbGVoZWFsdGggPSBvYmomJm9iai5pc3RlbGVoZWFsdGggfHwgbnVsbDtcblx0XHR0aGlzLmlzY2FsZW5kYXIgPSBvYmomJm9iai5pc2NhbGVuZGFyIHx8IG51bGw7XG5cdFx0dGhpcy5kZXNjcmlwdGlvbiA9IG9iaiYmb2JqLmRlc2NyaXB0aW9uIHx8IG51bGw7XG5cdFx0dGhpcy5hZGRyZXNzID0gb2JqJiZvYmouYWRkcmVzcyB8fCBudWxsO1xuXHRcdHRoaXMuc3VidXJiRGlzdHJpY3QgPSBvYmomJm9iai5zdWJ1cmJEaXN0cmljdCB8fCBudWxsO1xuXHRcdHRoaXMud2FyZCA9IG9iaiYmb2JqLndhcmQgfHwgbnVsbDtcblx0XHR0aGlzLnBvc3Rjb2RlID0gb2JqJiZvYmoucG9zdGNvZGUgfHwgbnVsbDtcblx0XHR0aGlzLnN0YXRlUHJvdmluY2UgPSBvYmomJm9iai5zdGF0ZVByb3ZpbmNlIHx8IG51bGw7XG5cdFx0dGhpcy5jb3VudHJ5ID0gb2JqJiZvYmouY291bnRyeSB8fCBudWxsO1xuXHRcdHRoaXMuY3JlYXRlZEJ5ID0gb2JqJiZvYmouY3JlYXRlZEJ5IHx8IG51bGw7XG5cdFx0dGhpcy5jcmVhdGlvbkRhdGUgPSBvYmomJm9iai5jcmVhdGlvbkRhdGUgfHwgbnVsbDtcblx0XHR0aGlzLmxhc3RVcGRhdGVkQnkgPSBvYmomJm9iai5sYXN0VXBkYXRlZEJ5IHx8IG51bGw7XG5cdFx0dGhpcy5sYXN0VXBkYXRlRGF0ZSA9IG9iaiYmb2JqLmxhc3RVcGRhdGVEYXRlIHx8IG51bGw7XG5cblx0XHRpZihvYmogJiYgb2JqLkJvb2tpbmdUeXBlcyl7XG4gICAgXHRcdGZvcih2YXIgYyBvZiBvYmouQm9va2luZ1R5cGVzKXtcbiAgICBcdFx0XHQvL2NvbnNvbGUubG9nKCctLS0tLS0tLS0tPicsYyk7XG4gICAgXHRcdFx0dGhpcy5wdXNoQm9va2luZ1R5cGVzKGMpO1xuICAgIFx0XHR9XG4gICAgXHR9XG5cblx0XHRpZihvYmogJiYgb2JqLkRvY3RvcnMpe1xuICAgIFx0XHRmb3IodmFyIGMgb2Ygb2JqLkRvY3RvcnMpe1xuICAgIFx0XHRcdC8vY29uc29sZS5sb2coJy0tLS0tLS0tLS0+JyxjKTtcbiAgICBcdFx0XHR0aGlzLnB1c2hEb2N0b3IoYyk7XG4gICAgXHRcdH1cbiAgICBcdH1cblx0fVxuXG5cdHNldEJvb2tpbmdUeXBlcyhib29raW5ndHlwZXM6YW55KXtcblx0XHRmb3IodmFyIGJ0IG9mIGJvb2tpbmd0eXBlcyl7XG5cdFx0XHR0aGlzLmJvb2tpbmdUeXBlcy5wdXNoKG5ldyBCb29raW5nVHlwZShidCkpO1xuXHRcdH1cblx0fVxuXG5cdHB1c2hCb29raW5nVHlwZXMoYm9va2luZ3R5cGU6YW55KXtcblx0XHR0aGlzLmJvb2tpbmdUeXBlcy5wdXNoKG5ldyBCb29raW5nVHlwZShib29raW5ndHlwZSkpO1x0XHRcblx0fVxuXG5cdHB1c2hEb2N0b3IoZG9jdG9yOmFueSl7XG5cdFx0dGhpcy5kb2N0b3JzLnB1c2gobmV3IERvY3Rvcihkb2N0b3IpKTtcdFx0XG5cdH1cbn0iXX0=
