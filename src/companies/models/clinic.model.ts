import {BookingType} from './bookingtype.model';
import {Doctor} from './doctor.model';

export class Clinic{
	
	clinicId: number;
    clinicName: string;
    isenable: number;
    companyId: number;
    isbookable: number;
    istelehealth: number;
    iscalendar: number;
    description: string;
    address: string;
    suburbDistrict: string;
    ward: string;
    postcode: string;
    stateProvince: string;
    country: string;
    createdBy: number;
    creationDate: Date;
    lastUpdatedBy: number;
    lastUpdateDate: Date;
    bookingTypes: BookingType[] = [];
    doctors: Doctor[] = [];

	constructor(obj : any) {
		// code...
		this.clinicId = obj&&obj.clinicId || null;
		this.clinicName = obj&&obj.clinicName || null;
		this.isenable = obj&&obj.isenable || null;
		this.companyId = obj&&obj.companyId || null;
		this.isbookable = obj&&obj.isbookable || null;
		this.istelehealth = obj&&obj.istelehealth || null;
		this.iscalendar = obj&&obj.iscalendar || null;
		this.description = obj&&obj.description || null;
		this.address = obj&&obj.address || null;
		this.suburbDistrict = obj&&obj.suburbDistrict || null;
		this.ward = obj&&obj.ward || null;
		this.postcode = obj&&obj.postcode || null;
		this.stateProvince = obj&&obj.stateProvince || null;
		this.country = obj&&obj.country || null;
		this.createdBy = obj&&obj.createdBy || null;
		this.creationDate = obj&&obj.creationDate || null;
		this.lastUpdatedBy = obj&&obj.lastUpdatedBy || null;
		this.lastUpdateDate = obj&&obj.lastUpdateDate || null;

		if(obj && obj.BookingTypes){
    		for(var c of obj.BookingTypes){
    			//console.log('---------->',c);
    			this.pushBookingTypes(c);
    		}
    	}

		if(obj && obj.Doctors){
    		for(var c of obj.Doctors){
    			//console.log('---------->',c);
    			this.pushDoctor(c);
    		}
    	}
	}

	setBookingTypes(bookingtypes:any){
		for(var bt of bookingtypes){
			this.bookingTypes.push(new BookingType(bt));
		}
	}

	pushBookingTypes(bookingtype:any){
		this.bookingTypes.push(new BookingType(bookingtype));		
	}

	pushDoctor(doctor:any){
		this.doctors.push(new Doctor(doctor));		
	}
}