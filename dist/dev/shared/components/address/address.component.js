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
var input_component_1 = require('../input/input.component');
var logging_service_1 = require('../../services/logging.service');
var AddressComponent = (function () {
    function AddressComponent(_log) {
        this._log = _log;
        this.addressControlGroup = new core_1.EventEmitter();
        this.components = new Array();
        this.addressControl = new common_1.Control("");
        this.suburbDistrictControl = new common_1.Control("");
        this.wardControl = new common_1.Control("");
        this.postcodeControl = new common_1.Control("");
        this.stateProvinceControl = new common_1.Control("");
        this.countryControl = new common_1.Control("");
        this.components.push({ control: this.addressControl, type: 'text', title: 'Address', placeholder: 'Address', isRequired: true, requiredMsg: 'Address is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.wardControl, type: 'option', title: 'Ward', placeholder: 'Ward', isRequired: false, requiredMsg: 'Ward is required', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9', values: this.wards });
        this.components.push({ control: this.suburbDistrictControl, type: 'text', title: 'District', placeholder: 'District', isRequired: true, requiredMsg: 'District is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.stateProvinceControl, type: 'text', title: 'Province', placeholder: 'Province', isRequired: true, requiredMsg: 'Province is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.components.push({ control: this.countryControl, type: 'text', title: 'Country', placeholder: 'Country', isRequired: true, requiredMsg: 'Country is required !!!', labelColumnClass: 'col-md-3 control-label', inputColumnClass: 'col-md-9' });
        this.myForm = new common_1.ControlGroup({
            address: this.addressControl,
            suburbDistrict: this.suburbDistrictControl,
            ward: this.wardControl,
            postcode: this.postcodeControl,
            stateProvince: this.stateProvinceControl,
            country: this.countryControl,
        });
        this._log.log("address contructor -> addressForm = ", this.myForm);
    }
    AddressComponent.prototype.ngOnInit = function () {
        if (this.address) {
            this.addressControl.updateValue(this.address.address);
            this.wardControl.updateValue(this.address.ward);
            this.suburbDistrictControl.updateValue(this.address.suburbDistrict);
            this.stateProvinceControl.updateValue(this.address.stateProvince);
            this.countryControl.updateValue(this.address.country);
        }
        this.addressControlGroup.next(this.myForm);
    };
    AddressComponent.prototype.fireRowClickedEvent = function (row) {
        this.rowClickedEvent.next(row);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddressComponent.prototype, "address", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AddressComponent.prototype, "addressControlGroup", void 0);
    AddressComponent = __decorate([
        core_1.Component({
            selector: 'address',
            directives: [input_component_1.InputComponent],
            template: "\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[0]\"></my-input>\n        </div>\n        <div class=\"col-md-4\">    \n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[1]\"></my-input>\n        </div>\n        <div class=\"col-md-4\">    \n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[2]\"></my-input>\n        </div>    \n    </div> \n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[3]\"></my-input>\n        </div>\n        <div class=\"col-md-4\">    \n            <my-input [isSubmitted]=\"isSubmitted\" [options]=\"components[4]\"></my-input>\n        </div>    \n    </div> \n"
        }), 
        __metadata('design:paramtypes', [logging_service_1.MyLogger])
    ], AddressComponent);
    return AddressComponent;
}());
exports.AddressComponent = AddressComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL2FkZHJlc3MvYWRkcmVzcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5RCxlQUFlLENBQUMsQ0FBQTtBQUN6RSx1QkFBb0UsaUJBQWlCLENBQUMsQ0FBQTtBQUN0RixnQ0FBNkIsMEJBQTBCLENBQUMsQ0FBQTtBQUN4RCxnQ0FBd0IsZ0NBQWdDLENBQUMsQ0FBQTtBQThCekQ7SUFjRSwwQkFBb0IsSUFBYztRQUFkLFNBQUksR0FBSixJQUFJLENBQVU7UUFaeEIsd0JBQW1CLEdBQWlCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRTFELGVBQVUsR0FBa0IsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQVlyRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksZ0JBQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxnQkFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxnQkFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxnQkFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLGdCQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGdCQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLFdBQVcsRUFBRSxxQkFBcUIsRUFBQyxnQkFBZ0IsRUFBQyx3QkFBd0IsRUFBQyxnQkFBZ0IsRUFBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsZ0JBQWdCLEVBQUMsd0JBQXdCLEVBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNqUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxXQUFXLEVBQUUsMEJBQTBCLEVBQUMsZ0JBQWdCLEVBQUMsd0JBQXdCLEVBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztRQUNyUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxXQUFXLEVBQUUsMEJBQTBCLEVBQUMsZ0JBQWdCLEVBQUMsd0JBQXdCLEVBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztRQUNwUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsV0FBVyxFQUFFLHlCQUF5QixFQUFDLGdCQUFnQixFQUFDLHdCQUF3QixFQUFDLGdCQUFnQixFQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7UUFHM08sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHFCQUFZLENBQUM7WUFDQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDNUIsY0FBYyxFQUFFLElBQUksQ0FBQyxxQkFBcUI7WUFDMUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3RCLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUM5QixhQUFhLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtZQUN4QyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDM0IsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQVFwRSxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUVFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO1lBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDhDQUFtQixHQUFuQixVQUFvQixHQUFHO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUE3REQ7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBQ1I7UUFBQyxhQUFNLEVBQUU7O2lFQUFBO0lBOUJYO1FBQUMsZ0JBQVMsQ0FBQztZQUNYLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFVBQVUsRUFBRSxDQUFDLGdDQUFjLENBQUM7WUFDNUIsUUFBUSxFQUNSLCt5QkFvQkM7U0FDQSxDQUFDOzt3QkFBQTtJQWtFRix1QkFBQztBQUFELENBL0RBLEFBK0RDLElBQUE7QUEvRFksd0JBQWdCLG1CQStENUIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvY29tcG9uZW50cy9hZGRyZXNzL2FkZHJlc3MuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtDT1JFX0RJUkVDVElWRVMsIEZPUk1fRElSRUNUSVZFUyxDb250cm9sR3JvdXAsQ29udHJvbH0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7SW5wdXRDb21wb25lbnR9IGZyb20gJy4uL2lucHV0L2lucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQge015TG9nZ2VyfSAgZnJvbSAnLi4vLi4vc2VydmljZXMvbG9nZ2luZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG5zZWxlY3RvcjogJ2FkZHJlc3MnLFxuZGlyZWN0aXZlczogW0lucHV0Q29tcG9uZW50XSxcbnRlbXBsYXRlOiBcbmBcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNFwiPlxuICAgICAgICAgICAgPG15LWlucHV0IFtpc1N1Ym1pdHRlZF09XCJpc1N1Ym1pdHRlZFwiIFtvcHRpb25zXT1cImNvbXBvbmVudHNbMF1cIj48L215LWlucHV0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+ICAgIFxuICAgICAgICAgICAgPG15LWlucHV0IFtpc1N1Ym1pdHRlZF09XCJpc1N1Ym1pdHRlZFwiIFtvcHRpb25zXT1cImNvbXBvbmVudHNbMV1cIj48L215LWlucHV0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+ICAgIFxuICAgICAgICAgICAgPG15LWlucHV0IFtpc1N1Ym1pdHRlZF09XCJpc1N1Ym1pdHRlZFwiIFtvcHRpb25zXT1cImNvbXBvbmVudHNbMl1cIj48L215LWlucHV0PlxuICAgICAgICA8L2Rpdj4gICAgXG4gICAgPC9kaXY+IFxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC00XCI+XG4gICAgICAgICAgICA8bXktaW5wdXQgW2lzU3VibWl0dGVkXT1cImlzU3VibWl0dGVkXCIgW29wdGlvbnNdPVwiY29tcG9uZW50c1szXVwiPjwvbXktaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTRcIj4gICAgXG4gICAgICAgICAgICA8bXktaW5wdXQgW2lzU3VibWl0dGVkXT1cImlzU3VibWl0dGVkXCIgW29wdGlvbnNdPVwiY29tcG9uZW50c1s0XVwiPjwvbXktaW5wdXQ+XG4gICAgICAgIDwvZGl2PiAgICBcbiAgICA8L2Rpdj4gXG5gIFxufSlcblxuXG5leHBvcnQgY2xhc3MgQWRkcmVzc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgQElucHV0KCkgYWRkcmVzczogT2JqZWN0O1xuICBAT3V0cHV0KCkgYWRkcmVzc0NvbnRyb2xHcm91cDogRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBjb21wb25lbnRzOiBBcnJheTxPYmplY3Q+ID0gbmV3IEFycmF5PE9iamVjdD4oKTtcbiAgcHVibGljIG15Rm9ybTogQ29udHJvbEdyb3VwO1xuICBcbiAgcHJpdmF0ZSBhZGRyZXNzQ29udHJvbDpDb250cm9sO1xuICBwcml2YXRlIHN1YnVyYkRpc3RyaWN0Q29udHJvbDpDb250cm9sOyBcbiAgcHJpdmF0ZSB3YXJkQ29udHJvbDpDb250cm9sO1xuICBwcml2YXRlIHBvc3Rjb2RlQ29udHJvbDpDb250cm9sO1xuICBwcml2YXRlIHN0YXRlUHJvdmluY2VDb250cm9sOkNvbnRyb2w7XG4gIHByaXZhdGUgY291bnRyeUNvbnRyb2w6Q29udHJvbDtcbiAgXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2xvZzogTXlMb2dnZXIpe1xuXG4gICAgdGhpcy5hZGRyZXNzQ29udHJvbCA9IG5ldyBDb250cm9sKFwiXCIpO1xuICAgIHRoaXMuc3VidXJiRGlzdHJpY3RDb250cm9sID0gbmV3IENvbnRyb2woXCJcIik7ICAgIFxuICAgIHRoaXMud2FyZENvbnRyb2wgPSBuZXcgQ29udHJvbChcIlwiKTsgICAgXG4gICAgdGhpcy5wb3N0Y29kZUNvbnRyb2wgPSBuZXcgQ29udHJvbChcIlwiKTsgICAgXG4gICAgdGhpcy5zdGF0ZVByb3ZpbmNlQ29udHJvbCA9IG5ldyBDb250cm9sKFwiXCIpOyAgICBcbiAgICB0aGlzLmNvdW50cnlDb250cm9sID0gbmV3IENvbnRyb2woXCJcIik7ICAgIFxuXG4gICAgdGhpcy5jb21wb25lbnRzLnB1c2goe2NvbnRyb2w6IHRoaXMuYWRkcmVzc0NvbnRyb2wsIHR5cGU6J3RleHQnLCB0aXRsZTogJ0FkZHJlc3MnLCBwbGFjZWhvbGRlcjogJ0FkZHJlc3MnLCBpc1JlcXVpcmVkOiB0cnVlLHJlcXVpcmVkTXNnOiAnQWRkcmVzcyBpcyByZXF1aXJlZCcsbGFiZWxDb2x1bW5DbGFzczonY29sLW1kLTMgY29udHJvbC1sYWJlbCcsaW5wdXRDb2x1bW5DbGFzczonY29sLW1kLTknfSk7XG4gICAgdGhpcy5jb21wb25lbnRzLnB1c2goe2NvbnRyb2w6IHRoaXMud2FyZENvbnRyb2wsIHR5cGU6J29wdGlvbicsIHRpdGxlOiAnV2FyZCcsIHBsYWNlaG9sZGVyOiAnV2FyZCcsIGlzUmVxdWlyZWQ6IGZhbHNlLHJlcXVpcmVkTXNnOiAnV2FyZCBpcyByZXF1aXJlZCcsbGFiZWxDb2x1bW5DbGFzczonY29sLW1kLTMgY29udHJvbC1sYWJlbCcsaW5wdXRDb2x1bW5DbGFzczonY29sLW1kLTknLHZhbHVlczogdGhpcy53YXJkc30pO1xuICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKHtjb250cm9sOiB0aGlzLnN1YnVyYkRpc3RyaWN0Q29udHJvbCwgdHlwZTondGV4dCcsIHRpdGxlOiAnRGlzdHJpY3QnLCBwbGFjZWhvbGRlcjogJ0Rpc3RyaWN0JywgaXNSZXF1aXJlZDogdHJ1ZSxyZXF1aXJlZE1zZzogJ0Rpc3RyaWN0IGlzIHJlcXVpcmVkICEhIScsbGFiZWxDb2x1bW5DbGFzczonY29sLW1kLTMgY29udHJvbC1sYWJlbCcsaW5wdXRDb2x1bW5DbGFzczonY29sLW1kLTknfSk7XG4gICAgdGhpcy5jb21wb25lbnRzLnB1c2goe2NvbnRyb2w6IHRoaXMuc3RhdGVQcm92aW5jZUNvbnRyb2wsIHR5cGU6J3RleHQnLCB0aXRsZTogJ1Byb3ZpbmNlJywgcGxhY2Vob2xkZXI6ICdQcm92aW5jZScsIGlzUmVxdWlyZWQ6IHRydWUscmVxdWlyZWRNc2c6ICdQcm92aW5jZSBpcyByZXF1aXJlZCAhISEnLGxhYmVsQ29sdW1uQ2xhc3M6J2NvbC1tZC0zIGNvbnRyb2wtbGFiZWwnLGlucHV0Q29sdW1uQ2xhc3M6J2NvbC1tZC05J30pO1xuICAgIHRoaXMuY29tcG9uZW50cy5wdXNoKHtjb250cm9sOiB0aGlzLmNvdW50cnlDb250cm9sLCB0eXBlOid0ZXh0JywgdGl0bGU6ICdDb3VudHJ5JywgcGxhY2Vob2xkZXI6ICdDb3VudHJ5JywgaXNSZXF1aXJlZDogdHJ1ZSxyZXF1aXJlZE1zZzogJ0NvdW50cnkgaXMgcmVxdWlyZWQgISEhJyxsYWJlbENvbHVtbkNsYXNzOidjb2wtbWQtMyBjb250cm9sLWxhYmVsJyxpbnB1dENvbHVtbkNsYXNzOidjb2wtbWQtOSd9KTtcbiAgICBcblxuICAgIHRoaXMubXlGb3JtID0gbmV3IENvbnRyb2xHcm91cCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidXJiRGlzdHJpY3Q6IHRoaXMuc3VidXJiRGlzdHJpY3RDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FyZDogdGhpcy53YXJkQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3Rjb2RlOiB0aGlzLnBvc3Rjb2RlQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlUHJvdmluY2U6IHRoaXMuc3RhdGVQcm92aW5jZUNvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmNvdW50cnlDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICAgIFxuICAgIHRoaXMuX2xvZy5sb2coXCJhZGRyZXNzIGNvbnRydWN0b3IgLT4gYWRkcmVzc0Zvcm0gPSBcIix0aGlzLm15Rm9ybSk7XG4gICAgLypcbiAgICB0aGlzLm15Rm9ybS52YWx1ZUNoYW5nZXNcbiAgICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgdGhpcy5fbG9nLmxvZyhcImFkZHJlc3MgLT4gTW9kZWwgRHJpdmVuIEZvcm0gOiBcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAqL1xuICB9XG5cbiAgbmdPbkluaXQoKXtcblxuICAgIGlmKHRoaXMuYWRkcmVzcyl7XG4gICAgICB0aGlzLmFkZHJlc3NDb250cm9sLnVwZGF0ZVZhbHVlKHRoaXMuYWRkcmVzcy5hZGRyZXNzKTsgICAgXG4gICAgICB0aGlzLndhcmRDb250cm9sLnVwZGF0ZVZhbHVlKHRoaXMuYWRkcmVzcy53YXJkKTtcbiAgICAgIHRoaXMuc3VidXJiRGlzdHJpY3RDb250cm9sLnVwZGF0ZVZhbHVlKHRoaXMuYWRkcmVzcy5zdWJ1cmJEaXN0cmljdCk7XG4gICAgICB0aGlzLnN0YXRlUHJvdmluY2VDb250cm9sLnVwZGF0ZVZhbHVlKHRoaXMuYWRkcmVzcy5zdGF0ZVByb3ZpbmNlKTtcbiAgICAgIHRoaXMuY291bnRyeUNvbnRyb2wudXBkYXRlVmFsdWUodGhpcy5hZGRyZXNzLmNvdW50cnkpOyAgICBcbiAgICB9XG4gICAgdGhpcy5hZGRyZXNzQ29udHJvbEdyb3VwLm5leHQodGhpcy5teUZvcm0pO1xuICB9XG5cbiAgZmlyZVJvd0NsaWNrZWRFdmVudChyb3cpe1xuICBcdHRoaXMucm93Q2xpY2tlZEV2ZW50Lm5leHQocm93KTtcbiAgfVxufSJdfQ==