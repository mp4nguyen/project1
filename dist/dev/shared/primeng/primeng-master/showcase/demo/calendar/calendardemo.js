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
var calendar_1 = require('../../../components/calendar/calendar');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var CalendarDemo = (function () {
    function CalendarDemo() {
    }
    CalendarDemo.prototype.ngOnInit = function () {
        this.es = {
            closeText: "Cerrar",
            prevText: "&#x3C;Ant",
            nextText: "Sig&#x3E;",
            currentText: "Hoy",
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun",
                "jul", "ago", "sep", "oct", "nov", "dic"],
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            weekHeader: "Sm",
            dateFormat: "dd/mm/yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
    };
    CalendarDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/calendar/calendardemo.html',
            directives: [calendar_1.Calendar, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarDemo);
    return CalendarDemo;
}());
exports.CalendarDemo = CalendarDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2FsZW5kYXIvY2FsZW5kYXJkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0QsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFBQTtJQW1EQSxDQUFDO0lBckJHLCtCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHO1lBQ04sU0FBUyxFQUFFLFFBQVE7WUFDdEIsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsVUFBVSxFQUFFLENBQUUsT0FBTyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxPQUFPO2dCQUM5RCxPQUFPLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLFdBQVcsQ0FBRTtZQUNqRSxlQUFlLEVBQUUsQ0FBRSxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUs7Z0JBQ3RELEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFFO1lBQ3JDLFFBQVEsRUFBRSxDQUFFLFNBQVMsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFFBQVEsQ0FBRTtZQUNoRixhQUFhLEVBQUUsQ0FBRSxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUU7WUFDNUQsV0FBVyxFQUFFLENBQUUsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFFO1lBQzVDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsS0FBSyxFQUFFLEtBQUs7WUFDWixrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLFVBQVUsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNOLENBQUM7SUF0REw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxVQUFVLEVBQUUsQ0FBQyxtQkFBUSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQzVFLENBQUM7O29CQUFBO0lBb0RGLG1CQUFDO0FBQUQsQ0FuREEsQUFtREMsSUFBQTtBQW5EWSxvQkFBWSxlQW1EeEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2NhbGVuZGFyL2NhbGVuZGFyZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q2FsZW5kYXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY2FsZW5kYXIvY2FsZW5kYXInO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9jYWxlbmRhci9jYWxlbmRhcmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0NhbGVuZGFyLFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRlbW8ge1xuXG4gICAgZGF0ZTE6IHN0cmluZztcblxuICAgIGRhdGUyOiBzdHJpbmc7XG5cbiAgICBkYXRlMzogc3RyaW5nO1xuXG4gICAgZGF0ZTQ6IHN0cmluZztcblxuICAgIGRhdGU1OiBzdHJpbmc7XG5cbiAgICBkYXRlNjogc3RyaW5nO1xuXG4gICAgZGF0ZTc6IHN0cmluZztcblxuICAgIGRhdGU4OiBzdHJpbmc7XG5cbiAgICBkYXRlOTogc3RyaW5nO1xuXG4gICAgZGF0ZTEwOiBzdHJpbmc7XG4gICAgXG4gICAgZGF0ZTExOiBzdHJpbmc7XG4gICAgXG4gICAgZGF0ZTEyOiBzdHJpbmc7XG4gICAgXG4gICAgZGF0ZTEzOiBzdHJpbmc7XG4gICAgXG4gICAgZXM6IGFueTtcbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lcyA9IHtcbiAgICAgICAgICAgIGNsb3NlVGV4dDogXCJDZXJyYXJcIixcbiAgICAgICAgXHRwcmV2VGV4dDogXCImI3gzQztBbnRcIixcbiAgICAgICAgXHRuZXh0VGV4dDogXCJTaWcmI3gzRTtcIixcbiAgICAgICAgXHRjdXJyZW50VGV4dDogXCJIb3lcIixcbiAgICAgICAgXHRtb250aE5hbWVzOiBbIFwiZW5lcm9cIixcImZlYnJlcm9cIixcIm1hcnpvXCIsXCJhYnJpbFwiLFwibWF5b1wiLFwianVuaW9cIixcbiAgICAgICAgXHRcImp1bGlvXCIsXCJhZ29zdG9cIixcInNlcHRpZW1icmVcIixcIm9jdHVicmVcIixcIm5vdmllbWJyZVwiLFwiZGljaWVtYnJlXCIgXSxcbiAgICAgICAgXHRtb250aE5hbWVzU2hvcnQ6IFsgXCJlbmVcIixcImZlYlwiLFwibWFyXCIsXCJhYnJcIixcIm1heVwiLFwianVuXCIsXG4gICAgICAgIFx0XCJqdWxcIixcImFnb1wiLFwic2VwXCIsXCJvY3RcIixcIm5vdlwiLFwiZGljXCIgXSxcbiAgICAgICAgXHRkYXlOYW1lczogWyBcImRvbWluZ29cIixcImx1bmVzXCIsXCJtYXJ0ZXNcIixcIm1pw6lyY29sZXNcIixcImp1ZXZlc1wiLFwidmllcm5lc1wiLFwic8OhYmFkb1wiIF0sXG4gICAgICAgIFx0ZGF5TmFtZXNTaG9ydDogWyBcImRvbVwiLFwibHVuXCIsXCJtYXJcIixcIm1pw6lcIixcImp1ZVwiLFwidmllXCIsXCJzw6FiXCIgXSxcbiAgICAgICAgXHRkYXlOYW1lc01pbjogWyBcIkRcIixcIkxcIixcIk1cIixcIlhcIixcIkpcIixcIlZcIixcIlNcIiBdLFxuICAgICAgICBcdHdlZWtIZWFkZXI6IFwiU21cIixcbiAgICAgICAgXHRkYXRlRm9ybWF0OiBcImRkL21tL3l5XCIsXG4gICAgICAgIFx0Zmlyc3REYXk6IDEsXG4gICAgICAgIFx0aXNSVEw6IGZhbHNlLFxuICAgICAgICBcdHNob3dNb250aEFmdGVyWWVhcjogZmFsc2UsXG4gICAgICAgIFx0eWVhclN1ZmZpeDogXCJcIiBcbiAgICAgICAgfTtcbiAgICB9XG59Il19
