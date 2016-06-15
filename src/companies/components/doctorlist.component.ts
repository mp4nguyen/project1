import {Component,Input,Output,EventEmitter,OnInit} from 'angular2/core';
import {Doctor} from '../models/doctor.model';
import {PeopleListComponent} from '../../people/components/peoplelist.component';
import {MyLogger}  from '../../shared/services/logging.service';

@Component({
  selector: 'doctor-list',
  templateUrl: './companies/components/doctorlist.component.html',
  providers: [],
  directives: [PeopleListComponent]
})

export class DoctorListComponent implements OnInit{
	@Input() doctors: Doctor[];		
	@Output() rowClicked: EventEmitter = new EventEmitter();

	private personIds: number[]=[];
  	public columns:Object[] = 
                            [{title:'First Name',fieldName:'firstName'},
                            {title:'Last Name',fieldName:'lastName'},
                            {title:'Mobile',fieldName:'mobile'},
                            {title:'Address',fieldName:'address'}];

	constructor(private _log: MyLogger){
		console.log("doctor list component....");
	}

	fireRowClicked(row){
		this.rowClicked.next(row);
	}

	ngOnInit(){
		for(var d of this.doctors){
			this.personIds.push(d.personId);
		}		
	}
}