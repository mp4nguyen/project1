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
var common_1 = require('angular2/common');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var password_1 = require('../../../components/password/password');
var panel_1 = require('../../../components/panel/panel');
var button_1 = require('../../../components/button/button');
var dropdown_1 = require('../../../components/dropdown/dropdown');
var inputtextarea_1 = require('../../../components/inputtextarea/inputtextarea');
var ValidationDemo = (function () {
    function ValidationDemo(fb) {
        this.form = fb.group({
            "firstName": new common_1.Control("", common_1.Validators.required),
            "lastName": new common_1.Control("", common_1.Validators.required),
            "password": new common_1.Control("", common_1.Validators.required)
        });
        this.genders = [];
        this.genders.push({ label: 'Select Gender', value: '' });
        this.genders.push({ label: 'Male', value: 'Male' });
        this.genders.push({ label: 'Female', value: 'Female' });
    }
    ValidationDemo.prototype.onSubmit = function (value) {
        this.submitted = true;
    };
    ValidationDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/validation/validationdemo.html',
            directives: [inputtext_1.InputText, password_1.Password, panel_1.Panel, button_1.Button, dropdown_1.Dropdown, inputtextarea_1.InputTextarea, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], ValidationDemo);
    return ValidationDemo;
}());
exports.ValidationDemo = ValidationDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdmFsaWRhdGlvbi92YWxpZGF0aW9uZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHVCQUEyRSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzdGLDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELHNCQUFvQixpQ0FBaUMsQ0FBQyxDQUFBO0FBQ3RELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBRS9ELDhCQUE0QixpREFBaUQsQ0FBQyxDQUFBO0FBTTlFO0lBWUksd0JBQVksRUFBZTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDakIsV0FBVyxFQUFFLElBQUksZ0JBQU8sQ0FBQyxFQUFFLEVBQUUsbUJBQVUsQ0FBQyxRQUFRLENBQUM7WUFDakQsVUFBVSxFQUFFLElBQUksZ0JBQU8sQ0FBQyxFQUFFLEVBQUUsbUJBQVUsQ0FBQyxRQUFRLENBQUM7WUFDaEQsVUFBVSxFQUFFLElBQUksZ0JBQU8sQ0FBQyxFQUFFLEVBQUUsbUJBQVUsQ0FBQyxRQUFRLENBQUM7U0FDbkQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsZUFBZSxFQUFFLEtBQUssRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUEvQkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDhDQUE4QztZQUMzRCxVQUFVLEVBQUUsQ0FBQyxxQkFBUyxFQUFDLG1CQUFRLEVBQUMsYUFBSyxFQUFDLGVBQU0sRUFBQyxtQkFBUSxFQUFDLDZCQUFhLEVBQUMsd0JBQWUsQ0FBQztTQUN2RixDQUFDOztzQkFBQTtJQThCRixxQkFBQztBQUFELENBN0JBLEFBNkJDLElBQUE7QUE3Qlksc0JBQWMsaUJBNkIxQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdmFsaWRhdGlvbi92YWxpZGF0aW9uZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Rk9STV9ESVJFQ1RJVkVTLFZhbGlkYXRvcnMsIEZvcm1CdWlsZGVyLENvbnRyb2wsQ29udHJvbEdyb3VwfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuaW1wb3J0IHtJbnB1dFRleHR9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXR0ZXh0L2lucHV0dGV4dCc7XG5pbXBvcnQge1Bhc3N3b3JkfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Bhc3N3b3JkL3Bhc3N3b3JkJztcbmltcG9ydCB7UGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge0Ryb3Bkb3dufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duJztcbmltcG9ydCB7U2VsZWN0SXRlbX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvc2VsZWN0aXRlbSc7XG5pbXBvcnQge0lucHV0VGV4dGFyZWF9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvaW5wdXR0ZXh0YXJlYS9pbnB1dHRleHRhcmVhJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL3ZhbGlkYXRpb24vdmFsaWRhdGlvbmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0lucHV0VGV4dCxQYXNzd29yZCxQYW5lbCxCdXR0b24sRHJvcGRvd24sSW5wdXRUZXh0YXJlYSxGT1JNX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25EZW1vIHtcbiAgICBcbiAgICBmb3JtOiBDb250cm9sR3JvdXA7XG4gICAgXG4gICAgc3VibWl0dGVkOiBib29sZWFuO1xuICAgIFxuICAgIGdlbmRlcnM6IFNlbGVjdEl0ZW1bXTtcbiAgICBcbiAgICBzZWxlY3RlZEdlbmRlcjogc3RyaW5nO1xuICAgIFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgXG4gICAgY29uc3RydWN0b3IoZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgICAgIHRoaXMuZm9ybSA9IGZiLmdyb3VwKHtcbiAgICAgICAgICAgIFwiZmlyc3ROYW1lXCI6IG5ldyBDb250cm9sKFwiXCIsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgICAgICAgXCJsYXN0TmFtZVwiOiBuZXcgQ29udHJvbChcIlwiLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSxcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogbmV3IENvbnRyb2woXCJcIiwgVmFsaWRhdG9ycy5yZXF1aXJlZClcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdlbmRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5nZW5kZXJzLnB1c2goe2xhYmVsOidTZWxlY3QgR2VuZGVyJywgdmFsdWU6Jyd9KTtcbiAgICAgICAgdGhpcy5nZW5kZXJzLnB1c2goe2xhYmVsOidNYWxlJywgdmFsdWU6J01hbGUnfSk7XG4gICAgICAgIHRoaXMuZ2VuZGVycy5wdXNoKHtsYWJlbDonRmVtYWxlJywgdmFsdWU6J0ZlbWFsZSd9KTtcbiAgICB9XG4gICAgXG4gICAgb25TdWJtaXQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnN1Ym1pdHRlZCA9IHRydWU7XG4gICAgfVxuICAgIFxufSJdfQ==
