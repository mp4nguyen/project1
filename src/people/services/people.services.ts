import {Injectable,Injector} from 'angular2/core';
import {Http, Headers, Request, Response,ConnectionBackend,RequestOptions,HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
//import 'rxjs/Rx';
import * as _ from 'underscore/underscore';

import {CPeopleApi} from '../../shared/services/lbservices';
import {MyLogger} from '../../shared/services/logging.service';
import {People} from '../models/people.model';


@Injectable()
export class PeopleService {
  
  private people: People[];
  private currentPeople: People;
  private injector:any = Injector.resolveAndCreate([CPeopleApi,MyLogger,HTTP_PROVIDERS]);  
  private _people:CPeopleApi = this.injector.get(CPeopleApi);
  private _log:MyLogger = this.injector.get(MyLogger);
  private countContructor: number=0;
  constructor(){//private _people: CPeopleApi, private _log: MyLogger
    this.countContructor++;

    console.log('People server constructor ....................................................................',this.countContructor);
  }
    
  getPeople(personIds: number[]):Observable<People> {
 
    let obs =  new Observable(observer => 
      {
        if(this.people){
          observer.next(this.people);
        }else{
          this._people.find({where:{personId:{inq: personIds}}})
          .map((res)=>{ 
            let people: Array<People> = [];
            for(var c of res){
              let person:People = new People(c);              
              people.push(person);
            }
            return people;
          })
          .subscribe(
            data => {console.log("Get from server = ",data);this.people = data;observer.next(data);},
            err => console.error(err),
            () => console.log('done')        
          );  
        }
    });
    return obs;
  }

  savePerson(personObject:People): Observable<any>{
    let observer:any;
    let obs = new Observable(o => observer = o);
    if(personObject && personObject.personId){
      //update
      let address = personObject.addressGroup;
      
      this._log.log("People service.address = ",address);
      //in the form; address is a subform, it contains address,ward,district,province,country; we need to copy all properties to father object      
      personObject.address = address.address;
      personObject.ward = address.ward;
      personObject.suburbDistrict = address.suburbDistrict;
      personObject.stateProvince = address.stateProvince;
      personObject.postcode = address.postcode;
      personObject.country = address.country;
      
      this._log.log("will update this person",personObject);
      this._people.updateAttributes(personObject.personId,personObject).subscribe(
        data => {
          this._log.log(data);
/*          let updatedPerson = new People(data);
          //this.setCurrentCompany(updatedCompany);
          let personIndex = _.findIndex(this.people, {personId: data.personId});

          this._log.log(" will find the company with id = ",data.personId);
          this._log.log(" find company position = " ,personIndex);
          this.people[personIndex] = updatedPerson;*/
          observer.next(data);          
        },
        err => {this._log.log(err);},
        () => {this._log.log('updated !');}
        );
    }else{
      //create      
      personObject.personId = 0;

      let address = personObject.addressGroup;      
      this._log.log("People service.address = ",address);
      //in the form; address is a subform, it contains address,ward,district,province,country; we need to copy all properties to father object
      personObject.address = address.address;
      personObject.ward = address.ward;
      personObject.suburbDistrict = address.suburbDistrict;
      personObject.stateProvince = address.stateProvince;
      personObject.postcode = address.postcode;
      personObject.country = address.country;

      this._log.log("Will create this person",personObject);
      this._people.create(personObject).subscribe(
        data => {
/*          let updatedPerson = new People(data)
          this._log.log("created new person = ",updatedPerson); 
          //this.setCurrentCompany(updatedCompany);           
          this.people.push(updatedPerson);*/
          observer.next(data); 
        },
        err => {this._log.log(err);},
        () => {this._log.log('created !');}
        );
    }
    return obs;
  }

  /*
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

  saveCompany(companyObject): Observable<any>{
    let observer:any;
    let obs = new Observable(o => observer = o);
    if(this.currentCompany && this.currentCompany.companyId){
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
  */
}
