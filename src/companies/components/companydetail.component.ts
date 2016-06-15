import {Component,OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,NgClass,NgForm,NgSwitch,NgSwitchWhen,NgSwitchDefault} from 'angular2/common';
import {Control, Validators, NgFormModel, ControlGroup,FormBuilder}  from 'angular2/common';
import {ROUTER_DIRECTIVES,RouteConfig,Router} from 'angular2/router';
//Router,RouteConfig,RouterOutlet
import {CompaniesService} from '../services/companies.services';
import {MyLogger}  from '../../shared/services/logging.service';
import {InputComponent}  from '../../shared/components/input/input.component';
import {Company} from '../models/company.model';
import {Clinic} from '../models/clinic.model';
import {Doctor} from '../models/doctor.model';
import {People} from '../../people/models/people.model';


import {ClinicListComponent} from './cliniclist.component';
//import {DoctorListComponent} from './doctorlist.component';
import {DoctorListComponent} from './doctorlist2.component';
import {AddressComponent} from '../../shared/components/address/address.component';
import {TabComponent} from '../../shared/components/tab/tab.component';
import {TabsetComponent} from '../../shared/components/tab/tabset.component';

@Component({
  selector: 'company-detail',
  templateUrl: './companies/components/companydetail.component.html',
  providers: [],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,ROUTER_DIRECTIVES,NgClass,NgForm,InputComponent,NgSwitch,NgSwitchWhen,NgSwitchDefault,TabComponent,TabsetComponent,ClinicListComponent,DoctorListComponent,AddressComponent]
})

/*
@RouteConfig([
  {path:'/clinic',    name: 'ClinicList',   component: ClinicListComponent, useAsDefault: true},  
  {path:'/Doctor',    name: 'DoctorList',   component: DoctorListComponent},  
])
*/

export class CompanyDetailComponent implements OnInit{

  public company : Company;
  public clinics : Clinic[];
  public doctors : Doctor[];
  public isSubmitted : boolean = false;
  public components: Array<Object> = new Array<Object>();
  public myForm: ControlGroup;
  
  private companyIdControl:Control;
  private companyNameControl:Control;   
  private addressControl:Control;
  private wardControl:Control;
  private suburbDistrictControl:Control;
  private stateProvinceControl:Control;
  private countryControl:Control;
  private descriptionControl:Control;
  private isenableControl:Control;
  private policyControl:Control;
  private conditionToBookControl:Control;
  private wards:string[] = ['1','2','3','4','abc']; 

  private addressObject:Object = {};

  constructor(
            private _companiesService: CompaniesService,
            private _log: MyLogger,
            private _router: Router,
            private _fb: FormBuilder
            ){

    this.companyIdControl = new Control();
    this.companyNameControl = new Control("", Validators.required );
    this.addressControl = new Control("", Validators.required );
    this.wardControl = new Control("", Validators.required );
    this.suburbDistrictControl = new Control("", Validators.required );
    this.stateProvinceControl = new Control("", Validators.required );
    this.countryControl = new Control("", Validators.required );
    this.descriptionControl = new Control("");
    this.isenableControl = new Control("");
    this.policyControl = new Control("");
    this.conditionToBookControl = new Control("");    


    this.components.push({control: this.companyNameControl, type:'text',title: 'Company Name', placeholder: 'Company Name', isRequired: true,requiredMsg: 'Company name is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    
    this.components.push({control: this.addressControl, type:'text', title: 'Address', placeholder: 'Address', isRequired: true,requiredMsg: 'Address is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.wardControl, type:'option', title: 'Ward', placeholder: 'Ward', isRequired: false,requiredMsg: 'Ward is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values: this.wards});
    this.components.push({control: this.suburbDistrictControl, type:'text', title: 'District', placeholder: 'District', isRequired: true,requiredMsg: 'District is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});

    this.components.push({control: this.stateProvinceControl, type:'text', title: 'Province', placeholder: 'Province', isRequired: true,requiredMsg: 'Province is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.countryControl, type:'text', title: 'Country', placeholder: 'Country', isRequired: true,requiredMsg: 'Country is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.isenableControl, type:'boolean', title: 'Enable', placeholder: 'Company Name', isRequired: false,requiredMsg: 'Company name is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});    

    this.components.push({control: this.descriptionControl, type:'text', title: 'Description', placeholder: 'Description', isRequired: false,requiredMsg: 'Company name is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});    
    this.components.push({control: this.policyControl, type:'text', title: 'Policy', placeholder: 'Policy', isRequired: false,requiredMsg: 'Company name is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.conditionToBookControl, type:'text', title: 'Condition to book', placeholder: 'Condition to book', isRequired: false,requiredMsg: 'Company name is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});

    this.myForm = new ControlGroup({
                                    companyId: this.companyIdControl,
                                    companyName: this.companyNameControl,
                                    address: this.addressControl,
                                    ward: this.wardControl,
                                    suburbDistrict: this.suburbDistrictControl,
                                    stateProvince: this.stateProvinceControl,
                                    country: this.countryControl,
                                    description: this.descriptionControl,
                                    isenable: this.isenableControl,
                                    policy: this.policyControl,
                                    conditionToBook: this.conditionToBookControl,                                    
                                    });
  }

  ngOnInit(){

    this.setCompanyData();      
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

  save(){
    this.isSubmitted = true;
    console.log('submiting...',this.myForm.value);
    this._companiesService.saveCompany(this.myForm.value).subscribe(
        data => {this._log.log("form",data); this.setCompanyData(); },
        err => {this._log.log(err);},
        () => {this._log.log('created !');}
        );
  }

  showFormControls(form:NgForm){
    console.log(this.myForm);    
  }

  public newOrEditClinicDetail(clinic:any){    
    this._companiesService.setCurrentClinic(clinic);
    this._log.log("company = ",clinic);
    this._router.navigate(['ClinicDetail']);
  }

  public newOrEditDoctorDetail(doctor:People){    
    this._log.log("clicked on doctor = ",doctor);
    this._companiesService.setCurrentDoctor(doctor);    
    this._router.navigate(['DoctorDetail']);
  }

  private setCompanyData(){
    this.company = this._companiesService.getCurrentCompany();
    this._log.log("Get data from company list = ",this.company,this.clinics);
    if(this.company){
      this.clinics = this.company.clinics;  
      this.doctors = this.company.doctors;
      this.companyIdControl.updateValue(this.company.companyId);
      this.companyNameControl.updateValue(this.company.companyName);
      this.addressControl.updateValue(this.company.address);
      this.wardControl.updateValue(this.company.ward);
      this.suburbDistrictControl.updateValue(this.company.suburbDistrict);
      this.stateProvinceControl.updateValue(this.company.stateProvince);
      this.countryControl.updateValue(this.company.country);
      this.descriptionControl.updateValue(this.company.description);
      this.isenableControl.updateValue(this.company.isenable);
      this.policyControl.updateValue(this.company.policy);
      this.conditionToBookControl.updateValue(this.company.conditionToBook);    

      this.addressObject.address = this.company.address;
      this.addressObject.ward = this.company.ward;
      this.addressObject.suburbDistrict = this.company.suburbDistrict;
      this.addressObject.stateProvince = this.company.stateProvince;
      this.addressObject.postcode = this.company.postcode;
      this.addressObject.country = this.company.country;

    }    
  }
}
