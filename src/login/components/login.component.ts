import {Component, OnInit, OnDestroy} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {Router, RouteParams} from 'angular2/router';
import { BrowserDomAdapter } from 'angular2/platform/browser';

@Component({
  selector: 'login',
  templateUrl: './login/components/login.component.html',
  directives: [ROUTER_DIRECTIVES]
})


export class LoginComponent implements OnInit, OnDestroy {
	constructor(    
    			private _router: Router,
    			private _dom: BrowserDomAdapter
    			) {
		
	}

	ngOnInit(){ 
		this._dom.addClass(this._dom.query("body"), "login"); 
	}

  	ngOnDestroy(){ 
  		this._dom.removeClass(this._dom.query("body"), "login"); 
		this._dom.addClass(this._dom.query("body"), "page-container-bg-solid");   		
		this._dom.addClass(this._dom.query("body"), "page-boxed");
  	}

	login(){
		console.log("login into the system...");
		this._router.navigate(['Home']);
	}
}
