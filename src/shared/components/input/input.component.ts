import {Component,Input,Output,OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,NgClass,NgForm} from 'angular2/common';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common'
import {Calendar}  from '../calendar/calendar';

@Component({
  selector: 'my-input',
  templateUrl: './shared/components/input/input.component.html',
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,NgSwitch, NgSwitchWhen, NgSwitchDefault,NgClass,NgForm,Calendar]
})

export class InputComponent {

	public htmlElementType: string;
	@Input() options:Object;
 	@Input() isSubmitted:boolean; // stored value
  		
	constructor(){

	}

	ngOnInit(){
		this.htmlElementType = this.computeHtmlElementType();
	}

  	computeHtmlElementType(): string {
	    if (this.options.type == "boolean" || this.options.type == "checkbox" ) {
	      return "checkbox";
	    } else if (this.options.type == "option") {
	      return "option";
	    } else if (this.options.type == "date") {
	      return "date";
	    } else if (this.options.type == "time") {
	      return "time";
	    } 	     
	    else if (this.options.type == "text" || this.options.type == "email" || this.options.type == "number"){
	      return "input"
	    }else{
	      return "unknown"
	    }
  	}
  
  	computeInputSubType(){
	    if(this.options.type == "text"){
	      return "text";
	    } else if(this.options.type == "email"){
	      return "email";
	    } else if( this.options.type == "number"){
	      return "number";
	    } else {
	      return "text";
	    }
  	}	
}
