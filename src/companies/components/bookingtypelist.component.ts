import {Component,Input,Output,EventEmitter,OnChanges} from 'angular2/core';
import {BookingType} from '../models/bookingtype.model';
import {MyTableComponent} from '../../shared/components/table/table.component';

@Component({
  selector: 'bookingtype-list',
  templateUrl: './companies/components/bookingtypelist.component.html',
  providers: [],
  directives: [MyTableComponent]
})
export class BookingTypeListComponent implements OnChanges{
	@Input() bookingTypes: BookingType[];
	@Output() rowClicked: EventEmitter = new EventEmitter();

  	public columns:Object[] = [{title:'Booking Type Name',fieldName:'bookingTypeName'}];

	constructor(){}

	fireRowClicked(row:any){
		this.rowClicked.next(row);
	}

	ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {

	    for (let propName in changes) {
	      let prop = changes[propName];
	      let cur  = JSON.stringify(prop.currentValue);
	      let prev = JSON.stringify(prop.previousValue);
	      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);    	        
	    }
  	}
}
