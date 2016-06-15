
export class People{

    personId: number;
    isenable: number;
    title: string;
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    phone: string;
    mobile: string;
    occupation: string;
    address: string;
    suburbDistrict: string;
    ward: string;
    postcode: string;
    stateProvince: string;
    country: string;
    ispatient: number;
    isdoctor: number;
    image: string;
    createdBy: number;
    creationDate: Date;
    lastUpdatedBy: number;
    lastUpdateDate: Date;

    constructor(obj: any){
    	
    	this.personId = obj&&obj.personId || null;
    	this.isenable = obj&&obj.isenable || null;
    	this.title = obj&&obj.title || null;
    	this.firstName = obj&&obj.firstName || null;
    	this.lastName = obj&&obj.lastName || null;

    	this.dob = obj&&obj.dob || null;
    	this.gender = obj&&obj.gender || null;
    	this.phone = obj&&obj.phone || null;
    	this.mobile = obj&&obj.mobile || null;

    	this.occupation = obj&&obj.occupation || null;
    	this.address = obj&&obj.address || null;
    	this.suburbDistrict = obj&&obj.suburbDistrict || null;
    	this.ward = obj&&obj.ward || null;

        this.postcode = obj&&obj.postcode || null;
        this.stateProvince = obj&&obj.stateProvince || null;
        this.country = obj&&obj.country || null;
        this.ispatient = obj&&obj.ispatient || null;
        this.isdoctor = obj&&obj.isdoctor || null;
        this.image = obj&&obj.image || null;

    	this.createdBy = obj&&obj.createdBy || null;
    	this.creationDate = obj&&obj.creationDate || null;
    	this.lastUpdatedBy = obj&&obj.lastUpdatedBy || null;
    	this.lastUpdateDate = obj&&obj.lastUpdateDate || null;
    
    }

}