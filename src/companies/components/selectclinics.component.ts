import {OnInit, Component,ViewChild,Input} from "angular2/core";
import {Control, Validators, NgFormModel, ControlGroup,FormBuilder}  from 'angular2/common';

import {DialogComponent} from "../../shared/components/dialog/dialog.component";
import {MyLogger} from '../../shared/services/logging.service';
import {Clinic} from '../models/clinic.model';
import {InputComponent}  from '../../shared/components/input/input.component';
import {CompaniesService} from '../services/companies.services';

@Component({
    selector: 'select-clinic',
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

export class SelectClinicComponent implements OnInit {

    @ViewChild('myDialog')myDialog:DialogComponent;

    private clinic: Clinic = new Clinic(null);    
    public components: Array<Object> = new Array<Object>();
    public myForm: ControlGroup;

    private clinicIdControl:Control;   
    private clinics: Clinic[]=[];
    private isNew: boolean = true;    

    constructor(private _log:MyLogger,private _companyServices: CompaniesService){

        this.clinicIdControl = new Control();
       
        this.components.push({control: this.clinicIdControl, type:'option',title: 'Clinic', placeholder: 'Booking Type', isRequired: true,requiredMsg: 'Booking type is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.clinics,displayProperty:'clinicName',returnProperty:'clinicId'});

        this.myForm = new ControlGroup({
                                          doctorId: this.clinicIdControl
                                        });        

        this.myForm.valueChanges.subscribe(
            data => { this._log.log('clinic form = ', JSON.stringify(this.myForm.value));}
            );
    }

    ngOnInit(){




    }

    openDialog(clinic:Clinic){
        
        this.clinics = this._companyServices.getCanselectingClinics(); 

        this._log.log(' get doctors be able to select = ' , this.clinics);
        
        this.components[0] = {control: this.clinicIdControl, type:'option',title: 'Clinic', placeholder: 'Booking Type', isRequired: true,requiredMsg: 'Booking type is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.clinics,displayProperty:'clinicName',returnProperty:'clinicId'};

        if(clinic){
            this.isNew = false;
            this.clinic = clinic;    
            this.updateView();
        }else{
            this.isNew = true;
            this.clinic = new Clinic(null);    
            this.updateView();
        }
        
        this.myDialog.activate().subscribe(
            code => {this._log.log('dialog return code =',code);},
            err =>  {this._log.log('dialog return err =',err);},
            () =>  {this._log.log('dialog completed');},
            );
    }

    updateView(){
        this.clinicIdControl.updateValue(this.clinic.clinicId);
    }

    remove(){        
        this._companyServices.doctorRemoveClinic(this.clinicIdControl.value);
        this.myDialog.ok(null);
    }

    add(){        
        //this._log.log('bt = ',this.bookingTypeIdControl.value);
        this._companyServices.doctorAddClinic(this.clinicIdControl.value);
        this.myDialog.ok(null);
    }
}
