import {Component,Input,Output,AfterContentInit,QueryList,Query} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,NgClass,NgForm} from 'angular2/common';
import {TabComponent} from './tab.component';
import {ROUTER_DIRECTIVES,RouteConfig,Router} from 'angular2/router';

@Component({
selector: 'tabset',
directives:[ROUTER_DIRECTIVES],
template: 
`
<div class="tabbable-line">
    <ul class="nav nav-tabs ">
        <li *ngFor="#tab of tabs" [class.active]="tab.active">
            <a (click)="setActive(tab)" data-toggle="tab"> {{tab.title}} </a>
        </li>
    </ul>
    <div class="tab-content">
    		
    		<ng-content></ng-content>
    		<router-outlet></router-outlet>     
    </div>
</div>  
` 
})




export class TabsetComponent implements AfterContentInit { 
	tabs: QueryList<TabComponent>;

	constructor(@Query(TabComponent) tabs:QueryList<TabComponent>,private _router: Router) { 
		this.tabs = tabs;
	}
  
  	ngAfterContentInit() {
    	this.tabs.toArray()[0].active = true;
	}

  	setActive(tab: TabComponent) {
    	this.tabs.toArray().forEach((t) => t.active = false);
    	tab.active = true;
    	//If there is routeName => will route 
    	if(tab.routeName && tab.routeName.length > 0){
	    	console.log("will go to route: ",tab.routeName);
	    	this._router.navigate([tab.routeName]);    		
    	}
	} 
}