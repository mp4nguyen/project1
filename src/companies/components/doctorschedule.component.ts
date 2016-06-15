
import {OnInit, Component,ViewChild,Input,Output,EventEmitter} from "angular2/core";
import {ControlGroup,Control} from "angular2/common";
import {Calendar} from 'primeng/primeng';

import {Schedule} from '../../shared/components/schedule/schedule';

import {DialogComponent} from "../../shared/components/dialog/dialog.component";
import {MyLogger} from '../../shared/services/logging.service';
import {Doctor} from '../models/doctor.model';
import {People}  from '../../people/models/people.model';
import {InputComponent}  from '../../shared/components/input/input.component';
import {CompaniesService} from '../services/companies.services';


/*<p-schedule [resources]="resources" [header]="header" defaultDate="2016-01-12" [eventLimit]="4" [editable]="true" (onDayClick)="handleDayClick($event)" (onEventClick)="handleEventClick($event)"></p-schedule>*/

@Component({
    selector: 'doctor-schedule',
    directives: [DialogComponent,InputComponent,Schedule],
    template: 
    `    
    <p-schedule [events]="events" [defaultView]="'month'" [header]="header" [eventLimit]="4" [editable]="true" (onDayClick)="handleDayClick($event)" (onEventClick)="handleEventClick($event)"></p-schedule>
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
                                <div class="col-md-6">
                                    <my-input [isSubmitted]="isSubmitted" [options]="components[0]"></my-input>
                                </div>
                                <div class="col-md-6">
                                    <my-input [isSubmitted]="isSubmitted" [options]="components[1]"></my-input>
                                </div>                                                                
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <my-input [isSubmitted]="isSubmitted" [options]="components[2]"></my-input>
                                </div>
                                <div class="col-md-6">
                                    <my-input [isSubmitted]="isSubmitted" [options]="components[3]"></my-input>
                                </div>                                                                
                            </div>                            
                            <div class="row">
                                <div class="col-md-6">
                                    <my-input [isSubmitted]="isSubmitted" [options]="components[4]"></my-input>
                                </div>
                                <div class="col-md-6">
                                    <my-input [isSubmitted]="isSubmitted" [options]="components[5]"></my-input>
                                </div>                                                                
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <my-input [isSubmitted]="isSubmitted" [options]="components[6]"></my-input>
                                </div>
                                <div class="col-md-6">
                                    <my-input [isSubmitted]="isSubmitted" [options]="components[7]"></my-input>
                                </div>                                                                                            
                            </div>
                        </div>
                    </form>
                </div>
        </div>
        <div class="modal-footer">
            <button (click)="myDialog.cancel()" type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
            <button (click)="saveEvent()" type="button" class="btn green">Add</button>
        </div>
    </my-dialog>    
    `
})

export class DoctorScheduleComponent implements OnInit {

    @ViewChild('myDialog') myDialog: DialogComponent;
    @Input() events: any[];
    @Input() workingSites: any[];
    @Input() bookingTypes: any[];
    @Output() addedEvent: EventEmitter = new EventEmitter();

    //private events: any[]=[];    
    private resources:any[]=[];
    private header: any;
    
    private event: MyEvent;
    
    private dialogVisible: boolean = false;
    
    private idGen: number = 100;
    
    private components: Array<Object> = new Array<Object>();
    private myForm: ControlGroup;

    private rosterIdControl:Control;
    private doctorIdControl:Control;
    private dayOfWeekControl:Control;
    private fromTimeControl:Control;
    private toTimeControl:Control;    
    private fromDateControl:Control;
    private toDateControl:Control;
    private workingSiteIdControl:Control;
    private bookingTypeIdControl:Control;
    private timeIntervalControl:Control;   
    private repeatTypeControl:Control;
    private isenableControl:Control;   
    private repeatTypes: any[] = [
                                    {name:'DAILY'},
                                    {name:'MONTHLY'},
                                    {name:'WEEKLY'},                                    
                                    {name:'2WEEKLY'},
                                    {name:'3WEEKLY'},
                                    {name:'4WEEKLY'},
                                    {name:'5WEEKLY'},
                                    {name:'6WEEKLY'},
                                    {name:'7WEEKLY'},
                                    {name:'8WEEKLY'}
                                    ];
    constructor(private _log: MyLogger) { 

        this.rosterIdControl = new Control();
        this.doctorIdControl = new Control();
        this.dayOfWeekControl = new Control();
        this.fromTimeControl = new Control();
        this.toTimeControl = new Control();        
        this.fromDateControl = new Control();
        this.toDateControl = new Control();
        this.workingSiteIdControl = new Control();
        this.bookingTypeIdControl = new Control();
        this.timeIntervalControl = new Control();
        this.repeatTypeControl = new Control();    	
        this.isenableControl = new Control();        

        this.components.push({control: this.fromTimeControl, type:'text', title: 'From Time', placeholder: 'From time', isRequired: true,requiredMsg: 'Address is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
        this.components.push({control: this.toTimeControl, type:'text', title: 'To Time', placeholder: 'To time', isRequired: true,requiredMsg: 'Address is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
        this.components.push({control: this.fromDateControl, type:'text', title: 'From date', placeholder: 'From date', isRequired: true,requiredMsg: 'Address is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
        this.components.push({control: this.toDateControl, type:'text', title: 'To date', placeholder: 'To date', isRequired: true,requiredMsg: 'Address is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
        this.components.push({control: this.workingSiteIdControl, type:'option', title: 'Site', placeholder: 'Site', isRequired: false,requiredMsg: 'Ward is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.workingSites,displayProperty:'clinicName',returnProperty:'clinicId'});
        this.components.push({control: this.bookingTypeIdControl, type:'option', title: 'Type', placeholder: 'Type', isRequired: true,requiredMsg: 'District is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.bookingTypes,displayProperty:'bookingTypeName',returnProperty:'bookingTypeId'});
        this.components.push({control: this.timeIntervalControl, type:'number', title: 'Time Interval', placeholder: 'Time interval', isRequired: true,requiredMsg: 'Province is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9'});
        this.components.push({control: this.repeatTypeControl, type:'option', title: 'Repeat Type', placeholder: 'Repeat type', isRequired: true,requiredMsg: 'Country is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.repeatTypes,displayProperty:'name',returnProperty:'name'});

        this.myForm = new ControlGroup({
                                        rosterId: this.rosterIdControl,
                                        doctorId: this.doctorIdControl,
                                        dayOfWeek: this.dayOfWeekControl,
                                        fromTime: this.fromTimeControl,
                                        toTime: this.toTimeControl,                                        
                                        fromDate: this.fromDateControl,
                                        toDate: this.toDateControl,
                                        workingSiteId: this.workingSiteIdControl,
                                        bookingTypeId: this.bookingTypeIdControl,
                                        timeInterval: this.timeIntervalControl,
                                        repeatType: this.repeatTypeControl,
                                        isenable: this.isenableControl
                                        });
        
/*        this.events = [
            {
                "title": "All Day Event",
                "start": "2016-05-01"
            },
            {
                "title": "Long Event",
                "start": "2016-01-07",
                "end": "2016-05-10"
            },
            {
                "title": "Repeating Event",
                "start": "2016-05-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2016-05-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2016-05-11",
                "end": "2016-05-13"
            }
        ];*/

        this.resources =[
            {
                id: 'a',
                title: 'Room A'
            },
            {
                id: 'b',
                title: 'Room B'
            }
        ];

        this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
    }

    ngOnInit() {

        this.components[4] = ({control: this.workingSiteIdControl, type:'option', title: 'Site', placeholder: 'Site', isRequired: false,requiredMsg: 'Ward is required',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.workingSites,displayProperty:'clinicName',returnProperty:'clinicId'});
        this.components[5] = ({control: this.bookingTypeIdControl, type:'option', title: 'Type', placeholder: 'Type', isRequired: true,requiredMsg: 'District is required !!!',labelColumnClass:'col-md-3 control-label',inputColumnClass:'col-md-9',values:this.bookingTypes,displayProperty:'bookingTypeName',returnProperty:'bookingTypeId'});        

    }
    
    handleDayClick(event:any) {
        // this.event = new MyEvent();
        // this.event.start = event.date.format();
        // this.dialogVisible = true;
        
        // //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        
        // this.cd.detectChanges();
        this.fromTimeControl.updateValue('08:00');
        this.toTimeControl.updateValue('17:00');
        this.fromDateControl.updateValue(event.date.format('YYYY-MM-DD'));
        this.toDateControl.updateValue(event.date.format('YYYY-MM-DD'));
        this.timeIntervalControl.updateValue('15');
        this.repeatTypeControl.updateValue('WEEKLY');

        console.log('handleDayClick events = ',this.events,this.bookingTypes,this.workingSites);
        console.log('handleDayClick event = ',event);
        this.myDialog.activate().subscribe(
            rs => {
                this._log.log(' dialog result = ',rs);
            }
            );
    }
    
    handleEventClick(e:any) {
        console.log('handleEventClick e =',e);
/*        this.event = new MyEvent();
        this.event.title = e.calEvent.title;
        
        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if(e.view.name === 'month') {
            start.stripTime();
        }
        
        if(end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;*/
    }
    
    saveEvent() {
        //this.events.push({title:'test',start:this.fromDateControl.value,end:this.toDateControl.value});
        this._log.log(this.myForm.value);
        this.addedEvent.next(this.myForm.value);
        this.myDialog.ok(null);
    }
    
    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if(index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }
    
    findEventIndexById(id: number) {
        let index = -1;
        for(let i = 0; i < this.events.length; i++) {
            if(id == this.events[i].id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
}
