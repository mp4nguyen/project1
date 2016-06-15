import {MysqlDate} from '../../shared/services/mysqldate.service';
import * as moment from 'moment';

export class Roster{
	
	rosterId: number;
	doctorId: number;	
    bookingTypeId: number;
    bookingTypeName: string;
    workingSiteId: number;
    workingSiteName: string;
    fromDate: string;
    toDate: string;
    start: string;
    end: string;
    timeInterval: number;
    repeatType: string;
    dayOfWeek: string;
    createdBy: number;
    creationDate: Date;
    lastUpdatedBy: number;
    lastUpdateDate: Date;
    title: string;

    private mysqlDate: MysqlDate = new MysqlDate();

	constructor(obj : any) {
		// code...
		this.rosterId = obj&&obj.rosterId || null;
		this.doctorId = obj&&obj.doctorId || null;
		this.bookingTypeId = obj&&obj.bookingTypeId || null;
		this.workingSiteId = obj&&obj.workingSiteId || null;
		this.fromDate = obj&&obj.fromDate || null;
		this.toDate = obj&&obj.toDate || null;
		this.timeInterval = obj&&obj.timeInterval || null;
		this.repeatType = obj&&obj.repeatType || null;
		this.dayOfWeek = obj&&obj.dayOfWeek || null;		
		this.createdBy = obj&&obj.createdBy || null;
		this.creationDate = obj&&obj.creationDate || null;
		this.lastUpdatedBy = obj&&obj.lastUpdatedBy || null;
		this.lastUpdateDate = obj&&obj.lastUpdateDate || null;
		this.workingSiteName = obj&&obj&&obj.Clinic&&obj.Clinic.clinicName || null; 
		this.bookingTypeName = obj&&obj.BookingType&&obj.BookingType.bookingTypeName || null; 
		//console.log('from date = ',this.fromDate,' to date = ',this.toDate,' ',this.mysqlDate.mysqlDate(this.fromDate));
		this.start = moment(this.mysqlDate.mysqlDate(this.fromDate)).format('YYYY-MM-DDTHH:mm:ss');
		this.end = moment(this.mysqlDate.mysqlDate(this.toDate)).format('YYYY-MM-DDTHH:mm:ss');
		this.title = this.workingSiteName + ' for ' + this.bookingTypeName;

	}
}