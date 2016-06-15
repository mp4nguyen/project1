export class BookingType{
	
	bookingTypeId: number;
    bookingTypeName: string;
    isenable: number;
    createdBy: number;
    creationDate: Date;
    lastUpdatedBy: number;
    lastUpdateDate: Date;

	constructor(obj : any) {
		// code...
		this.bookingTypeId = obj&&obj.bookingTypeId || null;
		this.bookingTypeName = obj&&obj.bookingTypeName || null;
		this.isenable = obj&&obj.isenable || null;
		this.createdBy = obj&&obj.createdBy || null;
		this.creationDate = obj&&obj.creationDate || null;
		this.lastUpdatedBy = obj&&obj.lastUpdatedBy || null;
		this.lastUpdateDate = obj&&obj.lastUpdateDate || null;
	}
}