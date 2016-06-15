import {OnInit, Component,ViewChild,Input} from "angular2/core";
import {Control, Validators, NgFormModel, ControlGroup,FormBuilder}  from 'angular2/common';

import {DialogComponent} from "../../shared/components/dialog/dialog.component";
import {MyLogger} from '../../shared/services/logging.service';
import {BookingType} from '../models/bookingtype.model';
import {InputComponent}  from '../../shared/components/input/input.component';
import {CompaniesService} from '../services/companies.services';

@Component({
    selector: 'select-booking-type',
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
                                    <p *ngIf="!isNew">{{bt.bookingTypeName}}
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

export class SelectBookingTypeComponent implements OnInit {

    @ViewChild('myDialog')myDialog:DialogComponent;

    private bt: BookingType = new BookingType({bookingTypeName:'',isenable:0});    
    public components: Array<Object> = new Array<Object>();
    public myForm: ControlGroup;

    private bookingTypeIdControl:Control;
    private bookingTypeNameControl:Control;
    private isenableControl:Control;   
    private bts: BookingType[]=[];
    private isNew: boolean = true;    
    private type:string;//this type = [DOCTOR,CLINIC]; as this component is used in 2 those forms, and each form has the different methods like : link,unlink; so need to know the type to call correct methods 

    constructor(private _log:MyLogger,private _companyServices: CompaniesService){

        this.bookingTypeIdControl = new Control();
        this.bookingTypeNameControl = new Control();
        this.isenableControl = new Control();

        
        this.components.push({control: this.bookingTypeIdControl, type:'option',title: 'Booking Type', placeholder: 'Booking Type', isRequired: true,requiredMsg: 'Booking type is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.bts,values:this.bts,displayProperty:'bookingTypeName',returnProperty:'bookingTypeId'});
        this.components.push({control: this.isenableControl, type:'boolean',title: 'Enable', placeholder: 'Clinic Name', isRequired: true,requiredMsg: 'Clinic name is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});

        this.myForm = new ControlGroup({
                                          bookingTypeId: this.bookingTypeIdControl,
                                          bookingTypeName: this.bookingTypeNameControl,
                                          isenable: this.isenableControl
                                        });        

        this.myForm.valueChanges.subscribe(
            data => { this._log.log('booking type form = ', JSON.stringify(this.myForm.value));}
            );
    }

    ngOnInit(){




    }

    openDialog(bt:BookingType,type:string){
        this.type = type;
        this._companyServices.getBookingTypes(type).subscribe(
            data => {
                        this.bts = data;
                        this._log.log('bts = ',data);
                        this.components[0] = {control: this.bookingTypeIdControl, type:'option',title: 'Booking Type', placeholder: 'Booking Type', isRequired: true,requiredMsg: 'Booking type is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.bts,displayProperty:'bookingTypeName',returnProperty:'bookingTypeId'};
                    },
            err => {this._log.log('error = ',err);},
            () => {this._log.log('completed');}
            );

        if(bt){
            this.isNew = false;
            this.bt = bt;    
            this.updateView();
        }else{
            this.isNew = true;
            this.bt = new BookingType({bookingTypeName:'',isenable:0});    
            this.updateView();
        }
        
        this.myDialog.activate().subscribe(
            code => {this._log.log('dialog return code =',code);},
            err =>  {this._log.log('dialog return err =',err);},
            () =>  {this._log.log('dialog completed');},
            );
    }

    updateView(){
        this.bookingTypeIdControl.updateValue(this.bt.bookingTypeId);
        this.bookingTypeNameControl.updateValue(this.bt);
        this.isenableControl.updateValue(this.bt.isenable);
    }

    remove(){        
        this._companyServices.doctorRemoveBT(this.bookingTypeIdControl.value,this.type);
        this.myDialog.ok(null);
    }

    add(){        
        this._log.log('bt = ',this.bookingTypeIdControl.value);
        this._companyServices.doctorAddBT(this.bookingTypeIdControl.value,this.type);
        this.myDialog.ok(null);
    }
}
