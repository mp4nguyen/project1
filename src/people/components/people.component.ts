import {Component,OnInit,Input,Output,EventEmitter,OnChanges,Injector} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,NgClass,NgForm,NgSwitch,NgSwitchWhen,NgSwitchDefault} from 'angular2/common';
import {Control, Validators, NgFormModel, ControlGroup,FormBuilder}  from 'angular2/common';
import {ROUTER_DIRECTIVES,RouteConfig,Router} from 'angular2/router';
import {Observable} from 'rxjs/Observable';


import {MyLogger}  from '../../shared/services/logging.service';
import {InputComponent}  from '../../shared/components/input/input.component';
import {AddressComponent}  from '../../shared/components/address/address.component';
import {People} from '../models/people.model';
import {PeopleService} from '../services/people.services'

@Component({
  selector: 'people',
  templateUrl: './people/components/people.component.html',
  providers: [],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,ROUTER_DIRECTIVES,NgClass,NgForm,InputComponent,AddressComponent]
})


export class PeopleComponent implements OnInit{

  @Input() person: People;
  @Output() personControlGroup: EventEmitter = new EventEmitter();
  
  //private injector:any = Injector.resolveAndCreate([PeopleService]);
  //private _peopleService = this.injector.get(PeopleService);

  
  public isSubmitted : boolean = false;
  public components: Array<Object> = new Array<Object>();
  public myForm: ControlGroup;
  public myOwnForm: ControlGroup;

  private personIdControl:Control;
  private titleControl:Control;
  private firstNameControl:Control;   
  private lastNameControl:Control;
  private dobControl:Control;
  private genderControl:Control;
  private phoneControl:Control;
  private mobileControl:Control;
  private occupationControl:Control;
  private isenableControl:Control;
  private addressControl:Control;
  private suburbDistrictControl:Control;
  
  private wardControl:Control;
  private postcodeControl:Control;
  private stateProvinceControl:Control;
  private countryControl:Control;
  private ispatientControl:Control;
  private isdoctorControl:Control;
  private imageControl:Control;
  private addressObject: Object = {};


  constructor(
            private _log: MyLogger,
            private _router: Router,
            private _fb: FormBuilder,
            private _peopleService: PeopleService
            ){

    this.personIdControl = new Control();
    this.titleControl = new Control();
    this.firstNameControl = new Control("", Validators.required );
    this.lastNameControl = new Control("", Validators.required );
    this.dobControl = new Control("", Validators.required );
    this.genderControl = new Control("", Validators.required );
    this.phoneControl = new Control("", Validators.required );
    this.mobileControl = new Control("", Validators.required );
    this.occupationControl = new Control("");
    this.isenableControl = new Control("");
    this.addressControl = new Control("");
    this.suburbDistrictControl = new Control("");    
    this.wardControl = new Control("");    
    this.postcodeControl = new Control("");    
    this.stateProvinceControl = new Control("");    
    this.countryControl = new Control("");    
    this.ispatientControl = new Control("");    
    this.isdoctorControl = new Control("");    
    this.imageControl = new Control("");    

    this.components.push({control: this.titleControl, type:'option',title: 'Title', placeholder: 'Company Name', isRequired: true,requiredMsg: 'Title is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:['Mr','Ms','Miss']});
    this.components.push({control: this.firstNameControl, type:'text', title: 'Firstname', placeholder: 'Firstname', isRequired: true,requiredMsg: 'Firstname is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.lastNameControl, type:'text', title: 'Lastname', placeholder: 'Lastname', isRequired: true,requiredMsg: 'Lastname is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.dobControl, type:'text', title: 'DOB', placeholder: 'DOB', isRequired: true,requiredMsg: 'DOB is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});

    this.components.push({control: this.genderControl, type:'option', title: 'Gender', placeholder: 'DOB', isRequired: true,requiredMsg: 'Gender is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:['Male','Female']});
    this.components.push({control: this.phoneControl, type:'text', title: 'Phone', placeholder: 'Phone', isRequired: false,requiredMsg: 'Phone is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.mobileControl, type:'text', title: 'Mobile', placeholder: 'Mobile', isRequired: false,requiredMsg: 'Mobile is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});

    this.components.push({control: this.occupationControl, type:'text', title: 'Occupation', placeholder: 'Occupation', isRequired: false,requiredMsg: 'Mobile is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.isenableControl, type:'boolean', title: 'Enable', placeholder: 'Company Name', isRequired: false,requiredMsg: 'Company name is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});    
    this.components.push({control: this.imageControl, type:'text', title: 'Image', placeholder: 'Image', isRequired: false,requiredMsg: 'Mobile is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});

    this.components.push({control: this.addressControl, type:'text', title: 'Address', placeholder: 'Address', isRequired: true,requiredMsg: 'Address is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.wardControl, type:'option', title: 'Ward', placeholder: 'Ward', isRequired: false,requiredMsg: 'Ward is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values: this.wards});
    this.components.push({control: this.suburbDistrictControl, type:'text', title: 'District', placeholder: 'District', isRequired: true,requiredMsg: 'District is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});

    this.components.push({control: this.stateProvinceControl, type:'text', title: 'Province', placeholder: 'Province', isRequired: true,requiredMsg: 'Province is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.countryControl, type:'text', title: 'Country', placeholder: 'Country', isRequired: true,requiredMsg: 'Country is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    

    this.myForm = new ControlGroup({
                                    personId: this.personIdControl,
                                    isenable: this.isenableControl,
                                    title: this.titleControl,
                                    firstName: this.firstNameControl,
                                    lastName: this.lastNameControl,
                                    dob: this.dobControl,
                                    gender: this.genderControl,
                                    phone: this.phoneControl,
                                    mobile: this.mobileControl,
                                    occupation: this.occupationControl,
                                    ispatient: this.ispatientControl,
                                    isdoctor: this.isdoctorControl,
                                    image: this.imageControl
                                    });

    this._log.log("Person.Contructor ................");
  }

  ngOnInit(){
    this._log.log("Person.ngOnInit ................ isSave = ",this.isSave);
    this.setCompanyData();  

   
    this.myForm.valueChanges
        .subscribe((value) => {
           this._log.log("People -> Model Driven Form : " + JSON.stringify(value));
           //this.personModel.next(value);
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
/*  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    //People component is self-save component; If father component set isSave = true; it will automatically save the newPerson object into the server
    for (let propName in changes) {
      let prop = changes[propName];
      let cur  = JSON.stringify(prop.currentValue);
      let prev = JSON.stringify(prop.previousValue);
      this._log.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);    

      if(this.isSave && this.newPerson){
        this.isSave = false;
        this.isSaveChanged.next(this.isSave);        
        this._log.log("will save person",this.isSave,this.newPerson);
        

      }  
    }

    this._log.log(' people -> issave ',this.isSave,'; person = ',this.newPerson);
  }
*/
  save(person:any): Observable<any>{
    let observer:any;
    let obs = new Observable(o => observer = o);

    this._peopleService.savePerson(person).subscribe(
        data => {
           this._log.log("person component save data = ",data); 
           //return data after save to father component.                                   
           observer.next(new People(data));
        },
        err => {this._log.log(err);},
        () => {this._log.log('created !');}
    );
    return obs;
  }

  addressControlGroup(addressControlGroup: ControlGroup){    
    //this.person = personControlGroup;
    
    this.myForm.addControl('addressGroup',this._fb.group(addressControlGroup.controls));
    this.personControlGroup.next(this.myForm);
    //this._log.log("people detail control group =",this.myForm);
  }


  showFormControls(form:NgForm){
    console.log(this.myForm);    
  }

  public newOrEditDetail(clinic:any){
    

    //this._companiesService.setCurrentClinic(clinic);
    this._log.log("company = ",clinic);
    this._router.navigate(['ClinicDetail']);
  }

  private setCompanyData(){
    
    this._log.log("Get data from father ; doctor  = ",this.person);
    if(this.person){
      
      this.personIdControl.updateValue(this.person.personId);
      this.titleControl.updateValue(this.person.title);
      this.firstNameControl.updateValue(this.person.firstName);
      this.lastNameControl.updateValue(this.person.lastName);
      this.dobControl.updateValue(this.person.dob);
      this.genderControl.updateValue(this.person.gender);
      this.phoneControl.updateValue(this.person.phone);
      this.mobileControl.updateValue(this.person.mobile);
      this.occupationControl.updateValue(this.person.occupation);
      this.isenableControl.updateValue(this.person.isenable);
      this.addressControl.updateValue(this.person.address);
      this.suburbDistrictControl.updateValue(this.person.suburbDistrict);
      this.wardControl.updateValue(this.person.ward);
      this.postcodeControl.updateValue(this.person.postcode);
      this.stateProvinceControl.updateValue(this.person.stateProvince);
      this.countryControl.updateValue(this.person.country);
      this.ispatientControl.updateValue(this.person.ispatient);
      this.isdoctorControl.updateValue(this.person.isdoctor);
      this.imageControl.updateValue(this.person.image);

      this.addressObject.address = this.person.address;
      this.addressObject.ward = this.person.ward;
      this.addressObject.suburbDistrict = this.person.suburbDistrict;
      this.addressObject.stateProvince = this.person.stateProvince;
      this.addressObject.postcode = this.person.postcode;
      this.addressObject.country = this.person.country;
    }    
    
  }
}
