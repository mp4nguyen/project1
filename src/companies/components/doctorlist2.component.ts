import {Component,Input,Output,EventEmitter,OnInit} from 'angular2/core';

import {MyLogger}  from '../../shared/services/logging.service';
import {Doctor} from '../models/doctor.model';
import {People} from '../../people/models/people.model';
import {MyTableComponent} from '../../shared/components/table/table.component';

@Component({
  selector: 'doctor-list',
  templateUrl: './companies/components/doctorlist2.component.html',
  providers: [],
  directives: [MyTableComponent]
})

export class DoctorListComponent implements OnInit {
	@Input() doctors: Doctor[];			
	@Output() rowClicked: EventEmitter = new EventEmitter();

	private people:People[] = [];
  	public columns:Object[] = 
                            [{title:'First Name',fieldName:'firstName'},
                            {title:'Last Name',fieldName:'lastName'},
                            {title:'Mobile',fieldName:'mobile'},
                            {title:'Address',fieldName:'address'}];


	constructor(private _log:MyLogger){
		
	}

	ngOnInit(){
		this._log.log('Doctor list = ',this.doctors);
		for(var d of this.doctors){
			this.people.push(d.person);
		}
		this._log.log('people list = ',this.people);
	}

	fireRowClicked(row:any){
		this.rowClicked.next(row);
	}

}
