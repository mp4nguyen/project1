import {OnInit, Component,ViewChild,Input} from "angular2/core";
import {Control, Validators, NgFormModel, ControlGroup,FormBuilder}  from 'angular2/common';

import {DialogComponent} from "../../shared/components/dialog/dialog.component";
import {MyLogger} from '../../shared/services/logging.service';
import {Doctor} from '../models/doctor.model';
import {People}  from '../../people/models/people.model';
import {InputComponent}  from '../../shared/components/input/input.component';
import {CompaniesService} from '../services/companies.services';

@Component({
    selector: 'select-doctor',
    directives: [DialogComponent,InputComponent],
    template: 
    `
    <my-dialog #myDialog>
        <div class="modal-header">
            <button type="button" (click)="myDialog.close()" class="close" data-dismiss="modal" aria-hidden="true"></button>
            <h4 class="modal-title">Booking Type</h4>
        </div>
        <div class="modal-body"> 
             <div class="portlet-body form">
                    <form role="form">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12">
                                    
                                    <div *ngIf="isNew"><my-input [isSubmitted]="isSubmitted" [options]="components[0]"></my-input></div>                                    
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
        <div class="modal-footer">
            <button (click)="myDialog.cancel()" type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
            <button *ngIf="!isNew" (click)="remove()" type="button" class="btn red">Remove</button>
            <button *ngIf="isNew" (click)="add()" type="button" class="btn green">Add</button>
        </div>
    </my-dialog>    
    `
})

export class SelectDoctorComponent implements OnInit {

    @ViewChild('myDialog')myDialog:DialogComponent;

    private doctor: Doctor = new Doctor(null);    
    public components: Array<Object> = new Array<Object>();
    public myForm: ControlGroup;

    private doctorIdControl:Control;
    private bookingTypeNameControl:Control;
    private isenableControl:Control;   
    private doctors: Doctor[]=[];
    private people: People[] = [];
    private isNew: boolean = true;    
    private type:string;//this type = [DOCTOR,CLINIC]; as this component is used in 2 those forms, and each form has the different methods like : link,unlink; so need to know the type to call correct methods 

    constructor(private _log:MyLogger,private _companyServices: CompaniesService){

        this.doctorIdControl = new Control();
        this.bookingTypeNameControl = new Control();
        this.isenableControl = new Control();

        
        this.components.push({control: this.doctorIdControl, type:'option',title: 'Doctor', placeholder: 'Booking Type', isRequired: true,requiredMsg: 'Booking type is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.doctors,displayProperty:'bookingTypeName',returnProperty:'doctorId'});
        this.components.push({control: this.isenableControl, type:'boolean',title: 'Enable', placeholder: 'Clinic Name', isRequired: true,requiredMsg: 'Clinic name is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});

        this.myForm = new ControlGroup({
                                          doctorId: this.doctorIdControl,
                                          isenable: this.isenableControl
                                        });        

        this.myForm.valueChanges.subscribe(
            data => { this._log.log('booking type form = ', JSON.stringify(this.myForm.value));}
            );
    }

    ngOnInit(){




    }

    openDialog(doctor:Doctor){
        
        this.doctors = this._companyServices.getCanselectingDoctors(); 
        this.people = [];
        for(var dt of this.doctors){
            dt.person.doctorId = dt.doctorId;
            dt.person.doctorName = dt.person.firstName + ' ' + dt.person.lastName;
            this.people.push(dt.person);
        }
        this._log.log(' get doctors be able to select = ' , this.doctors,this.people);
        this.components[0] = {control: this.doctorIdControl, type:'option',title: 'Doctor', placeholder: 'Booking Type', isRequired: true,requiredMsg: 'Booking type is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.people,displayProperty:'doctorName',returnProperty:'doctorId'};

        if(doctor){
            this.isNew = false;
            this.doctor = doctor;    
            this.updateView();
        }else{
            this.isNew = true;
            this.doctor = new Doctor(null);    
            this.updateView();
        }
        
        this.myDialog.activate().subscribe(
            code => {this._log.log('dialog return code =',code);},
            err =>  {this._log.log('dialog return err =',err);},
            () =>  {this._log.log('dialog completed');},
            );
    }

    updateView(){
        this.doctorIdControl.updateValue(this.doctor.doctorId);
        this.isenableControl.updateValue(this.doctor.isenable);
    }

    remove(){        
        this._companyServices.clinicRemoveDoctor(this.doctorIdControl.value);
        this.myDialog.ok(null);
    }

    add(){        
        //this._log.log('bt = ',this.bookingTypeIdControl.value);
        this._companyServices.clinicAddDoctor(this.doctorIdControl.value);
        this.myDialog.ok(null);
    }
}
