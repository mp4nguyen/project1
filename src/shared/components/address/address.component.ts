import {Component,Input,Output,EventEmitter,OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,ControlGroup,Control} from 'angular2/common';
import {InputComponent} from '../input/input.component';
import {MyLogger}  from '../../services/logging.service';

@Component({
selector: 'address',
directives: [InputComponent],
template: 
`
    <div class="row">
        <div class="col-md-4">
            <my-input [isSubmitted]="isSubmitted" [options]="components[0]"></my-input>
        </div>
        <div class="col-md-4">    
            <my-input [isSubmitted]="isSubmitted" [options]="components[1]"></my-input>
        </div>
        <div class="col-md-4">    
            <my-input [isSubmitted]="isSubmitted" [options]="components[2]"></my-input>
        </div>    
    </div> 
    <div class="row">
        <div class="col-md-4">
            <my-input [isSubmitted]="isSubmitted" [options]="components[3]"></my-input>
        </div>
        <div class="col-md-4">    
            <my-input [isSubmitted]="isSubmitted" [options]="components[4]"></my-input>
        </div>    
    </div> 
` 
})


export class AddressComponent implements OnInit{
  @Input() address: Object;
  @Output() addressControlGroup: EventEmitter = new EventEmitter();

  public components: Array<Object> = new Array<Object>();
  public myForm: ControlGroup;
  
  private addressControl:Control;
  private suburbDistrictControl:Control; 
  private wardControl:Control;
  private postcodeControl:Control;
  private stateProvinceControl:Control;
  private countryControl:Control;
  
  constructor(private _log: MyLogger){

    this.addressControl = new Control("");
    this.suburbDistrictControl = new Control("");    
    this.wardControl = new Control("");    
    this.postcodeControl = new Control("");    
    this.stateProvinceControl = new Control("");    
    this.countryControl = new Control("");    

    this.components.push({control: this.addressControl, type:'text', title: 'Address', placeholder: 'Address', isRequired: true,requiredMsg: 'Address is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.wardControl, type:'option', title: 'Ward', placeholder: 'Ward', isRequired: false,requiredMsg: 'Ward is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values: this.wards});
    this.components.push({control: this.suburbDistrictControl, type:'text', title: 'District', placeholder: 'District', isRequired: true,requiredMsg: 'District is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.stateProvinceControl, type:'text', title: 'Province', placeholder: 'Province', isRequired: true,requiredMsg: 'Province is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.countryControl, type:'text', title: 'Country', placeholder: 'Country', isRequired: true,requiredMsg: 'Country is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    

    this.myForm = new ControlGroup({
                                    address: this.addressControl,
                                    suburbDistrict: this.suburbDistrictControl,
                                    ward: this.wardControl,
                                    postcode: this.postcodeControl,
                                    stateProvince: this.stateProvinceControl,
                                    country: this.countryControl,
                                    });    
    this._log.log("address contructor -> addressForm = ",this.myForm);
    /*
    this.myForm.valueChanges
        .subscribe((value) => {
           this._log.log("address -> Model Driven Form : " + JSON.stringify(value));
           
        });
    */
  }

  ngOnInit(){

    if(this.address){
      this.addressControl.updateValue(this.address.address);    
      this.wardControl.updateValue(this.address.ward);
      this.suburbDistrictControl.updateValue(this.address.suburbDistrict);
      this.stateProvinceControl.updateValue(this.address.stateProvince);
      this.countryControl.updateValue(this.address.country);    
    }
    this.addressControlGroup.next(this.myForm);
  }

  fireRowClickedEvent(row){
  	this.rowClickedEvent.next(row);
  }
}