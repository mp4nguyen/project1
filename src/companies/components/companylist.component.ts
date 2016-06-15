import {Component,ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,NgSwitch,NgSwitchWhen,NgSwitchDefault} from 'angular2/common';
import {RouteConfig,Router} from 'angular2/router';

import {CompaniesService} from '../services/companies.services'
import {MyLogger} from '../../shared/services/logging.service';
import {Company} from '../models/company.model';
import {MyTableComponent} from '../../shared/components/table/table.component';

import {DialogComponent} from '../../shared/components/dialog/dialog.component';
import {DoctorScheduleComponent} from './doctorschedule.component';
import {Calendar}  from '../../shared/components/calendar/calendar';
//import {Growl} from '../../shared/primeng/components/growl/growl';
//import {Message} from '../../shared/primeng/components/messages/messages';

//declare var jQuery: JQueryStatic;

@Component({
  selector: 'company-list',
  templateUrl: './companies/components/companylist.component.html',
  providers: [],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,NgSwitch,NgSwitchWhen,NgSwitchDefault,MyTableComponent,DialogComponent,DoctorScheduleComponent,Calendar]
})


export class CompanyListComponent {
  
  @ViewChild('myDialog')myDialog:DialogComponent;
  newName: string;
  public companies: Company[];

  public columns:Object[] = 
                          [{title:'Company Name',fieldName:'companyName'},
                          {title:'Address',fieldName:'address'},
                          {title:'District',fieldName:'suburbDistrict'},
                          {title:'City/Province',fieldName:'stateProvince'}];

    date1: string;

    date2: string;

    date3: string;

    date4: string;

    date5: string;

    date6: string;

    date7: string;

    date8: string;

    date9: string;

    date10: string;
    
    date11: string;
    
    date12: string;
    
    date13: string;
    
    es: any;



  constructor(	
          private _companiesService: CompaniesService,
  				private _router: Router,
  				private _log: MyLogger
          ) {
        
this.es = {
            closeText: "Cerrar",
          prevText: "<Ant",
          nextText: "Sig>",
          currentText: "Hoy",
          monthNames: [ "enero","febrero","marzo","abril","mayo","junio",
          "julio","agosto","septiembre","octubre","noviembre","diciembre" ],
          monthNamesShort: [ "ene","feb","mar","abr","may","jun",
          "jul","ago","sep","oct","nov","dic" ],
          dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
          dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
          dayNamesMin: [ "D","L","M","X","J","V","S" ],
          weekHeader: "Sm",
          dateFormat: "dd/mm/yy",
          firstDay: 1,
          isRTL: false,
          showMonthAfterYear: false,
          yearSuffix: "" 
        };

            
  	_companiesService.getCompanies().subscribe(
  		data => {
        this.companies = data;
        this._log.log("CompanyListComponent = ",this.companies);
      },
  		err => console.log(err),
  		() => console.log("finished"));
  	
  }

  public newOrEditDetail(company:Company){
  	this._companiesService.setCurrentCompany(company);
  	this._log.log("company = ",company);
  	this._router.navigate(['CompanyDetail']);
  }
  
  showConfirmDialog() {
      this.myDialog.activate().subscribe(
          data => {this._log.log('dialog return = ',data)},
          err => {this._log.log('dialog err = ',err)},
          () => {this._log.log('dialog closed = ')}
        );
  }

  cancelDialog(){
    this.myDialog.cancel(function(){
      console.log('i hit close button !');
      return true;
    });
  }

  showMsg(){
    console.log('show msg');
/*    this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
    this.msgs.push({severity:'warn', summary:'Warn Message', detail:'There are unsaved changes'});*/
  }
}
