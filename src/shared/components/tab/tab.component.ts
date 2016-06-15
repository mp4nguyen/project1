import {Component,Input,Output,OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,NgClass,NgForm} from 'angular2/common';

@Component({
selector: 'tab',
inputs: ['title','routeName'],
template: 
			`
			<div class="tab-pane" *ngIf="active"> 
				<ng-content></ng-content>
			</div>
			` 
})


export class TabComponent {
  @Input('title') title: string;
  @Input('routeName') routeName: string;
  active: boolean = false;
  name: string;
}