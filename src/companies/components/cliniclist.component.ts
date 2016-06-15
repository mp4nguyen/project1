import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {Clinic} from '../models/clinic.model';
import {MyTableComponent} from '../../shared/components/table/table.component';

@Component({
  selector: 'clinic-list',
  templateUrl: './companies/components/cliniclist.component.html',
  providers: [],
  directives: [MyTableComponent]
})

export class ClinicListComponent {
	@Input() clinics: Clinic[];		
	@Output() rowClicked: EventEmitter = new EventEmitter();

  	public columns:Object[] = 
                            [{title:'Clinic Name',fieldName:'clinicName'},
                            {title:'Address',fieldName:'address'},
                            {title:'District',fieldName:'suburbDistrict'},
                            {title:'City/Province',fieldName:'stateProvince'}];

	constructor(){
		console.log("clinic list component....");
	}

	fireRowClicked(row){
		this.rowClicked.next(row);
	}

}
