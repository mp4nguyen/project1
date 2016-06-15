
import {Clinic} from './clinic.model';
import {Doctor} from './doctor.model';

export class Company{
  	public companyId: number;
    public companyName: string;
    public isenable: number;
    public address: string;
    public suburbDistrict: string;
    public ward: string;
    public postcode: string;
    public stateProvince: string;
    public country: string;
    public description: string;
    public policy: string;
    public conditionToBook: string;
    public logoPath: string;
    public createdBy: number;
    public creationDate: Date;
    public lastUpdatedBy: number;
    public lastUpdateDate: Date;
    public clinics: Clinic[]=[];
    public doctors: Doctor[]=[];

    constructor(obj: any){
    	
    	this.companyId = obj&&obj.companyId || null;
    	this.companyName = obj&&obj.companyName || null;
    	this.isenable = obj&&obj.isenable || null;
    	this.address = obj&&obj.address || null;
    	this.suburbDistrict = obj&&obj.suburbDistrict || null;
    	this.ward = obj&&obj.ward || null;
    	this.postcode = obj&&obj.postcode || null;
    	this.stateProvince = obj&&obj.stateProvince || null;
    	this.country = obj&&obj.country || null;
    	this.description = obj&&obj.description || null;
    	this.policy = obj&&obj.policy || null;
    	this.conditionToBook = obj&&obj.conditionToBook || null;
    	this.logoPath = obj&&obj.logoPath || null;
    	this.createdBy = obj&&obj.createdBy || null;
    	this.creationDate = obj&&obj.creationDate || null;
    	this.lastUpdatedBy = obj&&obj.lastUpdatedBy || null;
    	this.lastUpdateDate = obj&&obj.lastUpdateDate || null;

    	if(obj && obj.Clinics){
    		for(var c of obj.Clinics){
    			this.pushClinic(c);
    		}
    	}

        if(obj && obj.Doctors){
            for(var c of obj.Doctors){
                this.pushDoctor(c);
            }
        }
    }

    public pushClinic(obj:any){    	
    	this.clinics.push(new Clinic(obj));
    }

    public pushDoctor(obj:any){        
        this.doctors.push(new Doctor(obj));
    }
}