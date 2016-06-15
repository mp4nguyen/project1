import {Component,OnInit,Injector,Input,Output,EventEmitter} from 'angular2/core';
import {ROUTER_DIRECTIVES,RouteConfig,Router} from 'angular2/router';
//Router,RouteConfig,RouterOutlet

import {PeopleService} from '../services/people.services'
import {MyLogger}  from '../../shared/services/logging.service';
import {MyTableComponent}  from '../../shared/components/table/table.component';
import {People} from '../models/people.model';

@Component({
  selector: 'people-list',
  templateUrl: './people/components/peoplelist.component.html',
  providers: [],
  directives: [MyTableComponent]
})

export class PeopleListComponent implements OnInit{
  @Input() tableTitle: string;
  @Input() buttonLabel: string; 
  @Input() personIds: number[];
  @Output() rowClicked: EventEmitter = new EventEmitter();

  //private injector:any = Injector.resolveAndCreate([PeopleService]);
  //private _peopleService = this.injector.get(PeopleService);
  public people : People[];
  public columns:Object[] = 
                            [{title:'First Name',fieldName:'firstName'},
                            {title:'Last Name',fieldName:'lastName'},
                            {title:'Mobile',fieldName:'mobile'},
                            {title:'Address',fieldName:'address'}];

  constructor(
            private _log: MyLogger,
            private _router: Router,
            private _peopleService: PeopleService
            ){

  }

  ngOnInit(){
    this._peopleService.getPeople(this.personIds).subscribe(data => {this.people = data});
    this._log.log('will view personIds = ',this.personIds);
  }

  fireRowClicked(row:People){
    this._log.log("People -> clicked row = ",row);
    this.rowClicked.next(row);
  }


  private setCompanyData(){
    
  }
}
