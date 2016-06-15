import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';


import {CompanyListComponent}  from './companylist.component';
import {CompanyDetailComponent}  from './companyDetail.component';
import {ClinicDetailComponent}  from './clinicDetail.component';
import {DoctorDetailComponent}  from './doctorDetail.component';
import {CompaniesService} from '../services/companies.services';
import {PeopleService} from '../../people/services/people.services';
//import {CCompaniesApi,CPeopleApi} from '../../shared/services/lbservices';


import {PeopleComponent} from '../../people/components/people.component';

@Component({
  selector: 'companies',
  templateUrl: './companies/components/companies.component.html',
  styleUrls: ['./companies/components/companies.component.css'],
  providers: [CompaniesService,PeopleService],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,RouterOutlet,CompanyListComponent,PeopleComponent]
})

@RouteConfig([
  {path:'/',    name: 'CompanyList',   component: CompanyListComponent, useAsDefault: true},  
  {path:'/Detail',    name: 'CompanyDetail',   component: CompanyDetailComponent},
  {path:'/ClinicDetail',    name: 'ClinicDetail',   component: ClinicDetailComponent},
  {path:'/DoctorDetail',    name: 'DoctorDetail',   component: DoctorDetailComponent},
])

export class CompaniesComponent {
  newName: string;
  constructor() {
    
  }

}
