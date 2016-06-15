import {Injectable,Injector} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';
import * as _ from 'underscore/underscore';

import {CCompaniesApi} from '../../shared/services/lbservices';
import {CBookingTypesApi} from '../../shared/services/lbservices';
import {MyLogger} from '../../shared/services/logging.service';
import {Company} from '../models/company.model';
import {Clinic} from '../models/clinic.model';
import {Doctor} from '../models/doctor.model';
import {BookingType} from '../models/bookingtype.model';
import {People} from '../../people/models/people.model';
import {Roster} from '../models/roster.model';

@Injectable()
export class CompaniesService {
  
  private companies: Company[];
  private bookingTypes: BookingType[];
  private canSelectingBookingTypes: BookingType[];  
  private canSelectingDoctors: Doctor[];
  private canSelectingClinic: Clinic[];
  private currentCompany: Company;
  private currentClinic: Clinic;
  private currentDoctor: Doctor;
  private countConstructor:number = 0;
  private injector:any = Injector.resolveAndCreate([CBookingTypesApi,CCompaniesApi,MyLogger,HTTP_PROVIDERS]);  
  private _companies:CCompaniesApi = this.injector.get(CCompaniesApi);
  private _bookingtypes:CBookingTypesApi = this.injector.get(CBookingTypesApi);
  private _log:MyLogger = this.injector.get(MyLogger);

  constructor(){//private _companies:CCompaniesApi,private _log: MyLogger
    this._log.log('CompaniesService -----------------> constructor count = ',this.countConstructor);  
  }
  
  getCompanies():Observable<Company> {
 
    let obs =  new Observable(observer => 
      {
        if(this.companies){
          this._log.log('Get companies from memory');
          observer.next(this.companies);
        }else{
          this._companies.find({include:[
                                          {relation:'Clinics',scope:{include:[
                                                                                {relation:'BookingTypes'},
                                                                                {relation:'Doctors',scope:{include:'Person'}}
                                                                             ]}},
                                          {relation:'Doctors',scope:{include:[
                                                                                {relation:'Person'},
                                                                                {relation:'Clinics'},
                                                                                {relation:'BookingTypes'},
                                                                                {relation:'Rosters',scope:{include:['BookingType','Clinic']}}
                                                                             ]}}
                                        ]})
          .map((res)=>{ 
            let companies: Array<Company> = [];
            this._log.log('Get companies from server at service = ',res);
            for(var c of res){            
              //this._log.log('object = ',c)  
              let company:Company = new Company(c);              
              //this._log.log('ended object');              
              companies.push( company );
            }
            //this._log.log('Ended transforming data to object model.');
            return companies;
          })
          .subscribe(
            data => {
              this._log.log("Get from server after convert to company objects = ",data);
              this.companies = data;
              observer.next(data);
            },
            err => console.error(err),
            () => console.log('done')        
          );  
        }
    });
    return obs;
  }

  private getCanselectingBTs(selectedBTs:BookingType[],bts:BookingType[]) : Array<BookingType>{
    let returnArray: BookingType[] = _.clone(bts);
    if(selectedBTs){
      for(var bt of selectedBTs){
        let index = _.findIndex(returnArray,{bookingTypeId:bt.bookingTypeId});
        returnArray.splice(index,1);
      }
    }
    
    return returnArray;    
  }

  getCanselectingDoctors() : Array<Doctor>{
    let returnArray: Doctor[] = _.clone(this.currentCompany.doctors);
    if(this.currentClinic){
      for(var bt of this.currentClinic.doctors){
        let index = _.findIndex(returnArray,{doctorId:bt.doctorId});
        returnArray.splice(index,1);
      }
    }    
    return returnArray;    
  }

  getCanselectingClinics() : Array<Clinic>{
    let returnArray: Clinic[] = _.clone(this.currentCompany.clinics);
    if(this.currentDoctor){
      for(var bt of this.currentDoctor.clinics){
        let index = _.findIndex(returnArray,{clinicId:bt.clinicId});
        returnArray.splice(index,1);
      }
    }    
    return returnArray;    
  }

  getBookingTypes(type:string):Observable<BookingType> {
    let selectedBTs:BookingType[] = []
    if(type == 'DOCTOR' && this.currentDoctor){
      selectedBTs = this.currentDoctor.bookingTypes;
    }else if(type == 'CLINIC' && this.currentClinic){
      selectedBTs = this.currentClinic.bookingTypes;
    }
    
    let obs =  new Observable(observer => 
      {
        if(this.bookingTypes){
          this._log.log('Get booking types from memory');
          observer.next(this.getCanselectingBTs(selectedBTs, this.bookingTypes));
        }else{
          this._bookingtypes.find({where:{isenable:1}})
          .map((res)=>{ 
            let bts: Array<BookingType> = [];
            this._log.log('Get booking types from server at service = ',res);
            for(var c of res){            
              //this._log.log('object = ',c)  
              let bt:BookingType = new BookingType(c);              
              //this._log.log('ended object');              
              bts.push( bt );
            }
            //this._log.log('Ended transforming data to object model.');
            return bts;
          })
          .subscribe(
            data => {
              this._log.log("Get from server after convert to booking type objects = ",data);
              this.bookingTypes = data;              
              observer.next(this.getCanselectingBTs(selectedBTs, this.bookingTypes));
            },
            err => console.error(err),
            () => console.log('done')        
          );  
        }
    });
    return obs;
  }

  setCurrentCompany(company: Company): void{    
    this.currentCompany = company;
    console.log("set current company = ",this.currentCompany);
  }

  getCurrentCompany(): Company {
    return this.currentCompany;
  }

  setCurrentClinic(clinic: Clinic): void{    
    this.currentClinic = clinic;
  }

  getCurrentClinic(): Clinic {
    return this.currentClinic;
  }

  setCurrentDoctor(person: People): void{    
    //this._log.log('doctor index = ', );
    if(person && person.personId){
      let doctorIndex = _.findIndex(this.currentCompany.doctors, {personId: person.personId});
      if(doctorIndex >=0 ){
        this.currentDoctor = this.currentCompany.doctors[doctorIndex];
        this.currentDoctor.setPerson(person);
      }
    }else{
      this.currentDoctor = new Doctor();
    }
  }

  getCurrentDoctor(): Doctor{
    return this.currentDoctor;
  }

  saveCompany(companyObject): Observable<any>{
    let observer:any;
    let obs = new Observable(o => observer = o);
    if(this.currentCompany && this.currentCompany.companyId){
      let address = companyObject.addressGroup;
      
      this._log.log("Company service.address = ",address);
      //in the form; address is a subform, it contains address,ward,district,province,country; we need to copy all properties to father object      
      companyObject.address = address.address;
      companyObject.ward = address.ward;
      companyObject.suburbDistrict = address.suburbDistrict;
      companyObject.stateProvince = address.stateProvince;
      companyObject.postcode = address.postcode;
      companyObject.country = address.country;
      //update
      this._log.log("will update this company",companyObject);
      this._companies.updateAttributes(this.currentCompany.companyId,companyObject).subscribe(
        data => {
          this._log.log(data);
          let updatedCompany = new Company(data)
          this.setCurrentCompany(updatedCompany);
          let companyIndex = _.findIndex(this.companies, {companyId: data.companyId});

          this._log.log(" will find the company with id = ",data.companyId);
          this._log.log(" find company position = " ,companyIndex);
          this.companies[companyIndex] = updatedCompany;
          observer.next(data);          
        },
        err => {this._log.log(err);},
        () => {this._log.log('updated !');}
        );
    }else{
      //create      
      companyObject.companyId = 0;
      let address = companyObject.addressGroup;
      
      this._log.log("Company service.address = ",address);
      //in the form; address is a subform, it contains address,ward,district,province,country; we need to copy all properties to father object      
      companyObject.address = address.address;
      companyObject.ward = address.ward;
      companyObject.suburbDistrict = address.suburbDistrict;
      companyObject.stateProvince = address.stateProvince;
      companyObject.postcode = address.postcode;
      companyObject.country = address.country;
      this._log.log("Will create this company",companyObject);
      this._companies.create(companyObject).subscribe(
        data => {
          let updatedCompany = new Company(data)
          this._log.log(data); 
          this.setCurrentCompany(updatedCompany); 
          observer.next(data); 
          this.companies.push(updatedCompany);
        },
        err => {this._log.log(err);},
        () => {this._log.log('created !');}
        );
    }
    return obs;
  }

  saveClinic(clinicObject): Observable<any>{
    let observer:any;
    let obs = new Observable(o => observer = o);

    if(this.currentClinic && this.currentClinic.clinicId){
      //update
      let address = clinicObject.addressGroup;
      
      this._log.log("Company service.address = ",address);
      //in the form; address is a subform, it contains address,ward,district,province,country; we need to copy all properties to father object      
      clinicObject.address = address.address;
      clinicObject.ward = address.ward;
      clinicObject.suburbDistrict = address.suburbDistrict;
      clinicObject.stateProvince = address.stateProvince;
      clinicObject.postcode = address.postcode;
      clinicObject.country = address.country;

      this._log.log("will update this clinic",clinicObject);
      this._companies.__updateById__Clinics(this.currentCompany.companyId,this.currentClinic.clinicId,clinicObject).subscribe(
        data => {
          let updatedClinic = new Clinic(data)
          this._log.log(data);
          this.setCurrentClinic(updatedClinic);
          let clinicIndex = _.findIndex(this.currentCompany.clinics, {clinicId: data.clinicId});

          this._log.log(" will find the company with id = ",data.clinicId);
          this._log.log(" find company position = " ,clinicIndex);
          this.currentCompany.clinics[clinicIndex] = updatedClinic;
          observer.next(data);          
        },
        err => {this._log.log(err);},
        () => {this._log.log('updated !');}
        );
    }else{
      //create      
      let address = clinicObject.addressGroup;
      
      this._log.log("Company service.address = ",address);
      //in the form; address is a subform, it contains address,ward,district,province,country; we need to copy all properties to father object      
      clinicObject.address = address.address;
      clinicObject.ward = address.ward;
      clinicObject.suburbDistrict = address.suburbDistrict;
      clinicObject.stateProvince = address.stateProvince;
      clinicObject.postcode = address.postcode;
      clinicObject.country = address.country;

      clinicObject.companyId = this.currentCompany.companyId;
      clinicObject.clinicId = 0;
      this._log.log("Will create this company",clinicObject);
      this._companies.__create__Clinics(this.currentCompany.companyId,clinicObject).subscribe(
        data => {
          let updatedClinic = new Clinic(data)
          this._log.log(data); 
          this.setCurrentClinic(updatedClinic);
          observer.next(data); 
          console.log("created clinc, current company =",this.currentCompany);
          this.currentCompany.clinics.push(updatedClinic);
        },
        err => {this._log.log(err);},
        () => {this._log.log('created !');}
        );
    }
    return obs;
  }

  saveDoctor(doctorObject: Doctor,person:People): Observable<any>{
    let observer:any;
    let obs = new Observable(o => observer = o);

    if(doctorObject && doctorObject.doctorId){
      //update
      this._log.log("will update this doctor",doctorObject);
      this._companies.__updateById__Doctors(this.currentCompany.companyId,doctorObject.doctorId,doctorObject).subscribe(
        data => {
          let updatedDoctor = new Doctor(data);
          updatedDoctor.setPerson(person);
          this._log.log(data);
          this.setCurrentDoctor(person);          
          let doctorIndex = _.findIndex(this.currentCompany.doctors, {doctorId: data.doctorId});

          this._log.log(" will find the doctor with id = ",data.doctorId);
          this._log.log(" find doctor position = " ,doctorIndex);
          this.currentCompany.doctors[doctorIndex] = updatedDoctor;
          observer.next(data);          
        },
        err => {this._log.log(err);},
        () => {this._log.log('updated !');}
        );
    }else{
      //create      
      doctorObject.companyId = this.currentCompany.companyId;
      doctorObject.doctorId = 0;
      doctorObject.personId = person.personId;
      this._log.log("Will create this doctor",doctorObject);
      this._companies.__create__Doctors(this.currentCompany.companyId,doctorObject).subscribe(
        data => {          
          let newDoctor = new Doctor(data);
          newDoctor.setPerson(person);
          this._log.log("created new doctor = ",newDoctor);           
          this.currentCompany.doctors.push(newDoctor);
          observer.next(data);           
          this.setCurrentDoctor(person);
        },
        err => {this._log.log(err);},
        () => {this._log.log('created !');}
        );
    }
    return obs;
  }

  doctorRemoveBT(btId:number,type:string){
    this._log.log('Will remove this bt : ',btId);
    if(type=='DOCTOR'){
      this._companies.__unlink__Doctors__BookingTypes(this.currentCompany.companyId,this.currentDoctor.doctorId,btId)
          .subscribe(
            data => {
              this._log.log('unlink doctor - booking type =',data);
              let btIndex = _.findIndex(this.currentDoctor.bookingTypes,{bookingTypeId:btId});
              this.currentDoctor.bookingTypes.splice(btIndex,1);
            },
            err => {this._log.log('unlink doctor - booking type =',err);},
            () => {this._log.log('unlink doctor - booking completed');}
            );      
    }else if(type=='CLINIC'){
      this._companies.__unlink__Clinics__BookingTypes(this.currentCompany.companyId,this.currentClinic.clinicId,btId)
          .subscribe(
            data => {
              this._log.log('unlink clinic - booking type =',data);
              let btIndex = _.findIndex(this.currentClinic.bookingTypes,{bookingTypeId:btId});
              this.currentClinic.bookingTypes.splice(btIndex,1);
            },
            err => {this._log.log('unlink clinic - booking type =',err);},
            () => {this._log.log('unlink clinic - booking completed');}
            );      
    }else{
      this._log.log('the service do not know the type = ',type);
    }
  }

  doctorAddBT(btId:number,type:string){
    this._log.log('Will add this bt : ',btId);
    if(type=='DOCTOR'){
      this._companies.__link__Doctors__BookingTypes(this.currentCompany.companyId,this.currentDoctor.doctorId,btId,{doctorId:this.currentDoctor.doctorId,bookingTypeId:btId,isenable:1})
          .subscribe(
            data => {
              this._log.log('link doctor - booking type =',data);
              let btIndex = _.findIndex(this.bookingTypes,{bookingTypeId:data.bookingTypeId});
              this._log.log('btId = ',btId,'btIndex = ',btIndex,' bt = ',this.bookingTypes[btIndex],' bts = ',this.bookingTypes);
              this.currentDoctor.bookingTypes.push(this.bookingTypes[btIndex]);
            },
            err => {this._log.log('link doctor - booking type =',err);},
            () => {this._log.log('link doctor - booking completed');}
            );
    }else if(type=='CLINIC'){
      this._companies.__link__Clinics__BookingTypes(this.currentCompany.companyId,this.currentClinic.clinicId,btId,{clinicId:this.currentClinic.clinicId,bookingTypeId:btId,isenable:1})
          .subscribe(
            data => {
              this._log.log('link clinic - booking type =',data);
              let btIndex = _.findIndex(this.bookingTypes,{bookingTypeId:data.bookingTypeId});
              this._log.log('btId = ',btId,'btIndex = ',btIndex,' bt = ',this.bookingTypes[btIndex],' bts = ',this.bookingTypes);
              this.currentClinic.bookingTypes.push(this.bookingTypes[btIndex]);
            },
            err => {this._log.log('link clinic - booking type =',err);},
            () => {this._log.log('link clinic - booking completed');}
            );
    }else{
      this._log.log('the service do not know the type = ',type);
    }    
  }

  clinicRemoveDoctor(doctorId:number){
      this._log.log('Will remove this bt : ',doctorId);
      if(this.currentClinic){
        this._companies.__unlink__Clinics__Doctors(this.currentCompany.companyId,this.currentClinic.clinicId,doctorId)
            .subscribe(
              data => {                
                let btIndex = _.findIndex(this.currentClinic.doctors,{doctorId:doctorId});
                this.currentClinic.doctors.splice(btIndex,1);
                this._log.log('unlink doctor - booking type =',data,'currentClinic=',this.currentClinic);
              },
              err => {this._log.log('unlink doctor - booking type =',err);},
              () => {this._log.log('unlink doctor - booking completed');}
              );      
      }    
  }

  clinicAddDoctor(doctorId:number){

      this._log.log('Will add this bt : ',doctorId);

      this._companies.__link__Clinics__Doctors(this.currentCompany.companyId,this.currentClinic.clinicId,doctorId,{clinicId:this.currentClinic.clinicId,doctorId:doctorId,isenable:1})
          .subscribe(
            data => {
              this._log.log('link doctor - booking type =',data);
              let btIndex = _.findIndex(this.currentCompany.doctors,{doctorId:data.doctorId});              
              this.currentClinic.doctors.push(this.currentCompany.doctors[btIndex]);
              this._log.log('btId = ',doctorId,'btIndex = ',btIndex,' bt = ',this.currentCompany.doctors[btIndex],' bts = ',this.currentCompany.doctors,'current clinic = ',this.currentClinic);
            },
            err => {this._log.log('link doctor - booking type =',err);},
            () => {this._log.log('link doctor - booking completed');}
            );
  }

  doctorRemoveClinic(clinicId:number){
      this._log.log('Will remove this bt : ',clinicId);
      if(this.currentDoctor){
        this._companies.__unlink__Doctors__Clinics(this.currentCompany.companyId,this.currentDoctor.doctorId,clinicId)
            .subscribe(
              data => {                
                let btIndex = _.findIndex(this.currentDoctor.clinics,{clinicId:clinicId});
                this.currentDoctor.clinics.splice(btIndex,1);
                this._log.log('unlink doctor - clinic =',data,'currentClinic=',this.currentDoctor);
              },
              err => {this._log.log('unlink doctor - booking type =',err);},
              () => {this._log.log('unlink doctor - booking completed');}
              );      
      }    
  }

  doctorAddClinic(clinicId:number){ 

      this._log.log('Will add this bt : ',clinicId);

      this._companies.__link__Doctors__Clinics(this.currentCompany.companyId,this.currentDoctor.doctorId,clinicId,{doctorId:this.currentDoctor.doctorId,clinicId:clinicId,isenable:1})
          .subscribe(
            data => {
              this._log.log('link doctor - booking type =',data);
              let btIndex = _.findIndex(this.currentCompany.clinics,{clinicId:data.clinicId});              
              this.currentDoctor.clinics.push(this.currentCompany.clinics[btIndex]);
              this._log.log('btId = ',clinicId,'btIndex = ',btIndex,' bt = ',this.currentCompany.clinics[btIndex],' bts = ',this.currentCompany.clinics,'current clinic = ',this.currentDoctor);
            },
            err => {this._log.log('link doctor - booking type =',err);},
            () => {this._log.log('link doctor - booking completed');}
            );
  }

  generateRoster(rosterDef:any): Observable<any>{
    let observer:Observer<any>;
    let obs = new Observable(o => observer = o);

    if(this.currentDoctor){
      let clinicIndex = _.findIndex(this.currentDoctor.clinics,{clinicId:parseInt(rosterDef.workingSiteId)});
      let bookingTypeIndex = _.findIndex(this.currentDoctor.bookingTypes,{bookingTypeId:parseInt(rosterDef.bookingTypeId)});
      this._log.log('currentDoctor = ',this.currentDoctor,' clinicIndex = ',clinicIndex,' bookingTypeIndex = ',bookingTypeIndex);
      let workingSiteName = this.currentDoctor.clinics[clinicIndex].clinicName;
      let bookingTypeName = this.currentDoctor.bookingTypes[bookingTypeIndex].bookingTypeName;      
      rosterDef.doctorId = this.currentDoctor.doctorId;
      this._log.log('Will generate the roster following the defination:',rosterDef);
      this._companies.generateRoster(rosterDef).subscribe(
          rosters => {
            this._log.log('generated rosters = ',rosters.rosters);     
            for(var r of rosters.rosters){
              r.Clinic = {clinicName:workingSiteName};
              r.BookingType = {bookingTypeName:bookingTypeName};
              let roster = new Roster(r);              
              this._log.log(r,'clinicIndex = ',clinicIndex,' bookingTypeIndex = ',bookingTypeIndex);
              this._log.log(' roster =',roster)
              this.currentDoctor.rosters.push(roster);
            }
            this._log.log('updated doctor = ',this.currentDoctor);
            observer.next('success');
          },
          err => {
            this._log.log('error during generating doctor rosters',err);
            
            observer.error(err);
           
          }
        );
    }

    return obs;
  }
}
