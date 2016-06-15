import {Component,OnInit,ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,NgClass,NgForm,FormBuilder} from 'angular2/common';
import {Control, Validators, NgFormModel, ControlGroup}  from 'angular2/common';
import {RouteConfig} from 'angular2/router';

import {CompaniesService} from '../services/companies.services'
import {MyLogger}  from '../../shared/services/logging.service';
import {InputComponent}  from '../../shared/components/input/input.component';
import {Clinic} from '../models/clinic.model';
import {AddressComponent} from '../../shared/components/address/address.component';
import {TabComponent} from '../../shared/components/tab/tab.component';
import {TabsetComponent} from '../../shared/components/tab/tabset.component';
import {BookingTypeListComponent} from './bookingtypelist.component';
import {DoctorListComponent} from './doctorlist2.component';
import {SelectBookingTypeComponent} from './selectbookingtypes.component';
import {SelectDoctorComponent} from './selectdoctors.component';

@Component({
  selector: 'clinic-detail',
  templateUrl: './companies/components/clinicdetail.component.html',
  providers: [],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,InputComponent,AddressComponent,TabComponent,TabsetComponent,BookingTypeListComponent,DoctorListComponent,SelectBookingTypeComponent,SelectDoctorComponent]
})


export class ClinicDetailComponent implements OnInit{
  
  @ViewChild('btDialog')btDialog: SelectBookingTypeComponent;
  @ViewChild('doctorDialog')doctorDialog: SelectDoctorComponent;

  public clinic : Clinic;
  public isSubmitted : boolean = false;
  public components: Array<Object> = new Array<Object>();
  public myForm: ControlGroup;

  private clinicNameControl:Control;   
  private addressControl:Control;
  private wardControl:Control;
  private suburbDistrictControl:Control;
  private stateProvinceControl:Control;
  private countryControl:Control;
  private descriptionControl:Control;
  private isenableControl:Control;
  private isbookableControl:Control;
  private istelehealthControl:Control;
  private iscalendarControl:Control;

  private addressObject: Object = {};

  private wards:string[] = ['1','2','3','4','abc']; 

  constructor(
            private _companiesService: CompaniesService,
            private _log: MyLogger,
            private _fb: FormBuilder
            ){

    this.clinicNameControl = new Control("", Validators.required );
    this.addressControl = new Control("", Validators.required );
    this.wardControl = new Control("", Validators.required );
    this.suburbDistrictControl = new Control("", Validators.required );
    this.stateProvinceControl = new Control("", Validators.required );
    this.countryControl = new Control("", Validators.required );
    this.descriptionControl = new Control("");
    this.isenableControl = new Control("");
    this.isbookableControl = new Control("");
    this.istelehealthControl = new Control("");
    this.iscalendarControl = new Control("");

    this.components.push({control: this.clinicNameControl, type:'text',title: 'Clinic Name', placeholder: 'Clinic Name', isRequired: true,requiredMsg: 'Clinic name is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    
    this.components.push({control: this.isenableControl, type:'boolean', title: 'Enable', placeholder: 'Company Name', isRequired: false,requiredMsg: 'Company name is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});    

    this.components.push({control: this.isbookableControl, type:'boolean', title: 'Book', placeholder: 'Company Name', isRequired: false,requiredMsg: 'Company name is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});    
    this.components.push({control: this.istelehealthControl, type:'boolean', title: 'Telehealth', placeholder: 'Company Name', isRequired: false,requiredMsg: 'Company name is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});    
    this.components.push({control: this.iscalendarControl, type:'boolean', title: 'Calendar', placeholder: 'Company Name', isRequired: false,requiredMsg: 'Company name is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});    

    this.myForm = new ControlGroup({
                                    clinicName: this.clinicNameControl,
                                    address: this.addressControl,
                                    ward: this.wardControl,
                                    suburbDistrict: this.suburbDistrictControl,
                                    stateProvince: this.stateProvinceControl,
                                    country: this.countryControl,
                                    description: this.descriptionControl,
                                    isenable: this.isenableControl,
                                    isbookable: this.isbookableControl,
                                    istelehealth: this.istelehealthControl,
                                    iscalendar: this.iscalendarControl,                                                                        
                                    });
  }

  ngOnInit(){

    this.setClinicData();


    this.myForm.valueChanges
        .subscribe((value) => {
           this._log.log("Model Driven Form : " + JSON.stringify(value));
        });
    /*
    this.form.valueChanges
        .map((value) => {
            value.firstName = value.firstName.toUpperCase();
            return value;
        })
        .filter((value) => this.form.valid)
        .subscribe((value) => {
           alert("Model Driven Form valid value: vm = " +         JSON.stringify(value));
        });
    */    
  }

  addressControlGroup(addressControlGroup: ControlGroup){    
    //this.person = personControlGroup;
    
    this.myForm.addControl('addressGroup',this._fb.group(addressControlGroup.controls));
    //this._log.log("people detail control group =",this.myForm);
  }

  private setClinicData(){
    this.clinic = this._companiesService.getCurrentClinic();    
    this._log.log("Get data from clinic ",this.clinic);

    if(this.clinic){
      this.clinicNameControl.updateValue(this.clinic.clinicName);
      this.addressControl.updateValue(this.clinic.address);
      this.wardControl.updateValue(this.clinic.ward);
      this.suburbDistrictControl.updateValue(this.clinic.suburbDistrict);
      this.stateProvinceControl.updateValue(this.clinic.stateProvince);
      this.countryControl.updateValue(this.clinic.country);   
      this.isenableControl.updateValue(this.clinic.isenable);
      this.isbookableControl.updateValue(this.clinic.isbookable);
      this.istelehealthControl.updateValue(this.clinic.istelehealth);
      this.iscalendarControl.updateValue(this.clinic.iscalendar);      

      this.addressObject.address = this.clinic.address;
      this.addressObject.ward = this.clinic.ward;
      this.addressObject.suburbDistrict = this.clinic.suburbDistrict;
      this.addressObject.stateProvince = this.clinic.stateProvince;
      this.addressObject.postcode = this.clinic.postcode;
      this.addressObject.country = this.clinic.country;
    }
  }

  submit(){
    this.isSubmitted = true;
    this.wards.push('Added more');
    console.log('submiting...',this.myForm);
    this._companiesService.saveClinic(this.myForm.value).subscribe(
        data => {this._log.log("form",data); this.setClinicData(); },
        err => {this._log.log(err);},
        () => {this._log.log('created !');}
        );
  }

  fireClinicRowClicked(row){
    this._log.log('row = ',row)
    this.doctorDialog.openDialog(row);
  }

  fireBTRowClicked(row){
    this._log.log('row = ',row)
    this.btDialog.openDialog(row,'CLINIC');
  }

}
