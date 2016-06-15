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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9tb2RlbHMvZG9jdG9yLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDZCQUFxQixrQ0FBa0MsQ0FBQyxDQUFBO0FBQ3hELDZCQUFxQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3RDLDZCQUFxQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3RDLGtDQUEwQixxQkFBcUIsQ0FBQyxDQUFBO0FBRWhEO0lBQTRCLDBCQUFNO0lBa0JqQyxnQkFBWSxHQUFRO1FBSmpCLGlCQUFZLEdBQWdCLEVBQUUsQ0FBQztRQUMvQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFJdkIsRUFBRSxDQUFBLENBQUMsR0FBRyxJQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQ25CLGtCQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDTCxrQkFBTSxJQUFJLENBQUMsQ0FBQztRQUNiLENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQztRQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQztRQUV0RCxFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHFCQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUM7WUFDekIsR0FBRyxDQUFBLENBQVUsVUFBZ0IsRUFBaEIsS0FBQSxHQUFHLENBQUMsWUFBWSxFQUFoQixjQUFnQixFQUFoQixJQUFnQixDQUFDO2dCQUExQixJQUFJLENBQUMsU0FBQTtnQkFDUixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLCtCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQztRQUNGLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7WUFDcEIsR0FBRyxDQUFBLENBQVUsVUFBVyxFQUFYLEtBQUEsR0FBRyxDQUFDLE9BQU8sRUFBWCxjQUFXLEVBQVgsSUFBVyxDQUFDO2dCQUFyQixJQUFJLENBQUMsU0FBQTtnQkFDUixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztRQUNGLENBQUM7UUFFRCxFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7WUFDcEIsR0FBRyxDQUFBLENBQVUsVUFBVyxFQUFYLEtBQUEsR0FBRyxDQUFDLE9BQU8sRUFBWCxjQUFXLEVBQVgsSUFBVyxDQUFDO2dCQUFyQixJQUFJLENBQUMsU0FBQTtnQkFDUixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztRQUNGLENBQUM7SUFDRixDQUFDO0lBRUQsMEJBQVMsR0FBVCxVQUFVLE1BQWE7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQWhFQSxBQWdFQyxDQWhFMkIscUJBQU0sR0FnRWpDO0FBaEVZLGNBQU0sU0FnRWxCLENBQUEiLCJmaWxlIjoiY29tcGFuaWVzL21vZGVscy9kb2N0b3IubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Blb3BsZX0gZnJvbSAnLi4vLi4vcGVvcGxlL21vZGVscy9wZW9wbGUubW9kZWwnO1xuaW1wb3J0IHtDbGluaWN9IGZyb20gJy4vY2xpbmljLm1vZGVsJztcbmltcG9ydCB7Um9zdGVyfSBmcm9tICcuL3Jvc3Rlci5tb2RlbCc7XG5pbXBvcnQge0Jvb2tpbmdUeXBlfSBmcm9tICcuL2Jvb2tpbmd0eXBlLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIERvY3RvciBleHRlbmRzIFBlb3BsZXtcblx0XG4gICAgZG9jdG9ySWQ6IG51bWJlcjtcbiAgICBjb21wYW55SWQ6IG51bWJlcjtcbiAgICB1c2VySWQ6IG51bWJlcjtcbiAgICBwZXJzb25JZDogbnVtYmVyO1xuICAgIHNpZ25hdHVyZTogc3RyaW5nO1xuICAgIHRpbWVJbnRlcnZhbDogbnVtYmVyO1xuICAgIGlzZW5hYmxlOiBudW1iZXI7XG4gICAgY3JlYXRlZEJ5OiBudW1iZXI7XG4gICAgY3JlYXRpb25EYXRlOiBEYXRlO1xuICAgIGxhc3RVcGRhdGVkQnk6IG51bWJlcjtcbiAgICBsYXN0VXBkYXRlRGF0ZTogRGF0ZTtcbiAgICBwZXJzb24gOiBQZW9wbGU7XG4gICAgYm9va2luZ1R5cGVzOiBCb29raW5nVHlwZVtdPVtdO1xuICAgIGNsaW5pY3M6IENsaW5pY1tdPVtdO1xuICAgIHJvc3RlcnM6IFJvc3RlcltdPVtdO1xuXG5cdGNvbnN0cnVjdG9yKG9iajogYW55KXtcblx0XHRcblx0XHRpZihvYmomJm9iai5QZXJzb24pe1xuXHRcdFx0c3VwZXIob2JqLlBlcnNvbik7XG5cdFx0fWVsc2V7XG5cdFx0XHRzdXBlcihudWxsKTtcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5kb2N0b3JJZCA9IG9iaiYmb2JqLmRvY3RvcklkIHx8IG51bGw7XG5cdFx0dGhpcy5wZXJzb25JZCA9IG9iaiYmb2JqLnBlcnNvbklkIHx8IG51bGw7XG5cdFx0dGhpcy5pc2VuYWJsZSA9IG9iaiYmb2JqLmlzZW5hYmxlIHx8IG51bGw7XG5cdFx0dGhpcy5jb21wYW55SWQgPSBvYmomJm9iai5jb21wYW55SWQgfHwgbnVsbDtcblx0XHR0aGlzLnVzZXJJZCA9IG9iaiYmb2JqLnVzZXJJZCB8fCBudWxsO1xuXHRcdHRoaXMuc2lnbmF0dXJlID0gb2JqJiZvYmouc2lnbmF0dXJlIHx8IG51bGw7XG5cdFx0dGhpcy50aW1lSW50ZXJ2YWwgPSBvYmomJm9iai50aW1lSW50ZXJ2YWwgfHwgbnVsbDtcblx0XHR0aGlzLmNyZWF0ZWRCeSA9IG9iaiYmb2JqLmNyZWF0ZWRCeSB8fCBudWxsO1xuXHRcdHRoaXMuY3JlYXRpb25EYXRlID0gb2JqJiZvYmouY3JlYXRpb25EYXRlIHx8IG51bGw7XG5cdFx0dGhpcy5sYXN0VXBkYXRlZEJ5ID0gb2JqJiZvYmoubGFzdFVwZGF0ZWRCeSB8fCBudWxsO1xuXHRcdHRoaXMubGFzdFVwZGF0ZURhdGUgPSBvYmomJm9iai5sYXN0VXBkYXRlRGF0ZSB8fCBudWxsO1xuXHRcdFxuXHRcdGlmKG9iaiYmb2JqLlBlcnNvbil7XG5cdFx0XHR0aGlzLnBlcnNvbiA9IG5ldyBQZW9wbGUob2JqLlBlcnNvbik7XG5cdFx0fVxuXG5cdFx0aWYob2JqJiZvYmouQm9va2luZ1R5cGVzKXtcblx0XHRcdGZvcih2YXIgYiBvZiBvYmouQm9va2luZ1R5cGVzKXtcblx0XHRcdFx0dGhpcy5ib29raW5nVHlwZXMucHVzaChuZXcgQm9va2luZ1R5cGUoYikpO1x0XG5cdFx0XHR9XHRcdFx0XG5cdFx0fVxuXG5cdFx0aWYob2JqJiZvYmouQ2xpbmljcyl7XG5cdFx0XHRmb3IodmFyIGMgb2Ygb2JqLkNsaW5pY3Mpe1xuXHRcdFx0XHR0aGlzLmNsaW5pY3MucHVzaChuZXcgQ2xpbmljKGMpKTtcdFxuXHRcdFx0fVx0XHRcdFxuXHRcdH1cblxuXHRcdGlmKG9iaiYmb2JqLlJvc3RlcnMpe1xuXHRcdFx0Zm9yKHZhciBjIG9mIG9iai5Sb3N0ZXJzKXtcblx0XHRcdFx0dGhpcy5yb3N0ZXJzLnB1c2gobmV3IFJvc3RlcihjKSk7XHRcblx0XHRcdH1cdFx0XHRcblx0XHR9XG5cdH1cblxuXHRzZXRQZXJzb24ocGVyc29uOlBlb3BsZSl7XG5cdFx0dGhpcy5wZXJzb24gPSBwZXJzb247XG5cdH1cbn0iXX0=
