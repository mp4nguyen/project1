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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbmllcy9tb2RlbHMvYm9va2luZ3R5cGUubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0lBVUMscUJBQVksR0FBUztRQUVwQixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQztRQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsSUFBRSxHQUFHLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQztJQUN2RCxDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQXBCQSxBQW9CQyxJQUFBO0FBcEJZLG1CQUFXLGNBb0J2QixDQUFBIiwiZmlsZSI6ImNvbXBhbmllcy9tb2RlbHMvYm9va2luZ3R5cGUubW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQm9va2luZ1R5cGV7XG5cdFxuXHRib29raW5nVHlwZUlkOiBudW1iZXI7XG4gICAgYm9va2luZ1R5cGVOYW1lOiBzdHJpbmc7XG4gICAgaXNlbmFibGU6IG51bWJlcjtcbiAgICBjcmVhdGVkQnk6IG51bWJlcjtcbiAgICBjcmVhdGlvbkRhdGU6IERhdGU7XG4gICAgbGFzdFVwZGF0ZWRCeTogbnVtYmVyO1xuICAgIGxhc3RVcGRhdGVEYXRlOiBEYXRlO1xuXG5cdGNvbnN0cnVjdG9yKG9iaiA6IGFueSkge1xuXHRcdC8vIGNvZGUuLi5cblx0XHR0aGlzLmJvb2tpbmdUeXBlSWQgPSBvYmomJm9iai5ib29raW5nVHlwZUlkIHx8IG51bGw7XG5cdFx0dGhpcy5ib29raW5nVHlwZU5hbWUgPSBvYmomJm9iai5ib29raW5nVHlwZU5hbWUgfHwgbnVsbDtcblx0XHR0aGlzLmlzZW5hYmxlID0gb2JqJiZvYmouaXNlbmFibGUgfHwgbnVsbDtcblx0XHR0aGlzLmNyZWF0ZWRCeSA9IG9iaiYmb2JqLmNyZWF0ZWRCeSB8fCBudWxsO1xuXHRcdHRoaXMuY3JlYXRpb25EYXRlID0gb2JqJiZvYmouY3JlYXRpb25EYXRlIHx8IG51bGw7XG5cdFx0dGhpcy5sYXN0VXBkYXRlZEJ5ID0gb2JqJiZvYmoubGFzdFVwZGF0ZWRCeSB8fCBudWxsO1xuXHRcdHRoaXMubGFzdFVwZGF0ZURhdGUgPSBvYmomJm9iai5sYXN0VXBkYXRlRGF0ZSB8fCBudWxsO1xuXHR9XG59Il19