import {Component,OnInit,Input,ViewChild} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {Control, Validators, NgFormModel, ControlGroup,FormBuilder}  from 'angular2/common';

import {InputComponent}  from '../../shared/components/input/input.component';
import {CompaniesService} from '../services/companies.services';
import {MyLogger}  from '../../shared/services/logging.service';
import {PeopleComponent} from '../../people/components/people.component';
import {Doctor} from '../models/doctor.model';
import {TabComponent} from '../../shared/components/tab/tab.component';
import {TabsetComponent} from '../../shared/components/tab/tabset.component';
import {BookingTypeListComponent} from './bookingtypelist.component';
import {ClinicListComponent} from './cliniclist.component';
import {SelectBookingTypeComponent} from './selectbookingtypes.component';
import {SelectClinicComponent} from './selectclinics.component';


import {DoctorScheduleComponent} from './doctorschedule.component';
import {Growl} from '../../shared/primeng/components/growl/growl';
import {Message} from '../../shared/primeng/components/messages/messages';


@Component({
  selector: 'clinic-detail',
  templateUrl: './companies/components/doctordetail.component.html',
  providers: [],
  directives: [PeopleComponent,InputComponent,TabComponent,TabsetComponent,BookingTypeListComponent,ClinicListComponent,SelectBookingTypeComponent,SelectClinicComponent,DoctorScheduleComponent,Growl]
})


export class DoctorDetailComponent implements OnInit{
  
  @ViewChild(PeopleComponent)person: PeopleComponent;
  @ViewChild('btDialog')btDialog: SelectBookingTypeComponent;
  @ViewChild('clinicDialog')clinicDialog: SelectClinicComponent;

  private msgs:Message[] =[];
  private doctor: Doctor;
  public components: Array<Object> = new Array<Object>();
  public myForm: ControlGroup;
  
  private dayOfWeekControl:Control;
  private fromDateControl:Control;
  private toDateControl:Control;
  private workingSiteIdControl:Control;
  private bookingTypeIdControl:Control;
  private timeIntervalControl:Control;   
  private repeatTypeControl:Control;
  private isenableControl:Control;   

  constructor(
            private _log: MyLogger,
            private _companyService: CompaniesService,
            private _fb: FormBuilder
            ){
    this.doctorIdControl = new Control();
    this.userIdControl = new Control();
    this.signatureControl = new Control();
    this.timeIntervalControl = new Control();
    this.isenableControl = new Control();

    this.person = _fb.group({});
    this.myForm = _fb.group(
                            {
                              doctorId: this.doctorIdControl,
                              userId: this.userIdControl,
                              signature: this.signatureControl,
                              timeInterval: this.timeIntervalControl,
                              isenable: this.isenableControl,
                              person: this.person
                              });

    this.components.push({control: this.isenableControl, type:'boolean',title: 'Enable', placeholder: 'Clinic Name', isRequired: true,requiredMsg: 'Clinic name is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.timeIntervalControl, type:'number',title: 'Time Interval', placeholder: 'Time Interval', isRequired: true,requiredMsg: 'Clinic name is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    this.components.push({control: this.signatureControl, type:'text',title: 'Signatute', placeholder: 'Time Interval', isRequired: true,requiredMsg: 'Clinic name is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
    
    this.myForm = new ControlGroup({
                                    doctorId: this.doctorIdControl,
                                    userId: this.userIdControl,
                                    signature: this.signatureControl,
                                    timeInterval: this.timeIntervalControl,
                                    isenable: this.isenableControl
                                    });

  }

  ngOnInit(){
    this.doctor = this._companyService.getCurrentDoctor();
    this._log.log('Doctor =',this.doctor);
    if(this.doctor){
      this.doctorIdControl.updateValue(this.doctor.doctorId);
      this.isenableControl.updateValue(this.doctor.isenable);
      this.timeIntervalControl.updateValue(this.doctor.timeInterval);
      this.signatureControl.updateValue(this.doctor.signature);      
    }else{
      this.doctor = new Doctor();
    }
    /*
    this.myForm.valueChanges
        .subscribe((value) => {
           this._log.log("doctor detail -> Model Driven Form : " + JSON.stringify(value));
           
        });
    */
  }  

  save(){
    //person component is sefl-save component, it will save the data of isSave = true ; after save, it will cal personAfterSave method
    this._log.log('doctor detail -> will save data with myForm.person=',this.myForm.value.person);
    this.person.save(this.myForm.value.person).subscribe(
        person => {
          this._log.log(' received data from person component =',person);
          this._companyService.saveDoctor(this.myForm.value,person).subscribe(
              data => {this._log.log("doctor saved successfully ! ",data); },
              err => {this._log.log(err);},
              () => {this._log.log('created !');}
              );                  
        },
        err => {this._log.log('error in saving person = ',err);},
        () => {this._log.log('saved person successfully !');}
      );    
  }


  personControlGroup(personControlGroup: ControlGroup){    
    //this.person = personControlGroup;
    this.myForm.addControl('person',this._fb.group(personControlGroup.controls));
    this._log.log("doctor detail person control group =",personControlGroup,this.myForm);
  }

  fireClinicRowClicked(row){
    this._log.log('row = ',row)
    this.clinicDialog.openDialog(row);
  }

  fireBTRowClicked(row){
    this._log.log('row = ',row)
    this.btDialog.openDialog(row,'DOCTOR');
  }

  addedRosterEvent(data){
    this._log.log(' will add this roster = ',data);
    this._companyService.generateRoster(data).subscribe(
      data => {
        this._log.log(' data = ',data);
      },
      err => {
        this._log.log(' error = ',err);
        this.msgs.push({severity:'error', summary:'Info Message', detail:'There are slots :' + JSON.stringify(err)});

      }      
      );
  }
}
