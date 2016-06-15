import {People} from '../../people/models/people.model';
import {Clinic} from './clinic.model';
import {Roster} from './roster.model';
import {BookingType} from './bookingtype.model';

export class Doctor extends People{
	
    doctorId: number;
    companyId: number;
    userId: number;
    personId: number;
    signature: string;
    timeInterval: number;
    isenable: number;
    createdBy: number;
    creationDate: Date;
    lastUpdatedBy: number;
    lastUpdateDate: Date;
    person : People;
    bookingTypes: BookingType[]=[];
    clinics: Clinic[]=[];
    rosters: Roster[]=[];

	constructor(obj: any){
		
		if(obj&&obj.Person){
			super(obj.Person);
		}else{
			super(null);
		}
		
		this.doctorId = obj&&obj.doctorId || null;
		this.personId = obj&&obj.personId || null;
		this.isenable = obj&&obj.isenable || null;
		this.companyId = obj&&obj.companyId || null;
		this.userId = obj&&obj.userId || null;
		this.signature = obj&&obj.signature || null;
		this.timeInterval = obj&&obj.timeInterval || null;
		this.createdBy = obj&&obj.createdBy || null;
		this.creationDate = obj&&obj.creationDate || null;
		this.lastUpdatedBy = obj&&obj.lastUpdatedBy || null;
		this.lastUpdateDate = obj&&obj.lastUpdateDate || null;
		
		if(obj&&obj.Person){
			this.person = new People(obj.Person);
		}

		if(obj&&obj.BookingTypes){
			for(var b of obj.BookingTypes){
				this.bookingTypes.push(new BookingType(b));	
			}			
		}

		if(obj&&obj.Clinics){
			for(var c of obj.Clinics){
				this.clinics.push(new Clinic(c));	
			}			
		}

		if(obj&&obj.Rosters){
			for(var c of obj.Rosters){
				this.rosters.push(new Roster(c));	
			}			
		}
	}

	setPerson(person:People){
		this.person = person;
	}
}