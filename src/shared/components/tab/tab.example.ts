import {Component,Input,Output,OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,NgClass,NgForm} from 'angular2/common';
import {TabsetComponent} from './tabset.component';
import {TabComponent} from './tab.component';



@Component({
selector: 'tabs-sample-app', 
directives: [TabsetComponent, TabComponent], 
template: 
`
<tabset>
<tab title="First tab" routeName="ClinicList">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam magni quia ut harum facilis, ullam deleniti porro dignissimos quasi at molestiae sapiente natus, neque voluptatum ad consequuntur cupiditate nemo sunt.
</tab>
<tab *ngFor="#tab of tabs" [title]="tab.title" [routeName]="tab.routeName">
{{ tab.content }} </tab>
</tabset>
` 
})


export class TabsSampleApp {
  tabs: any;
  constructor() {
    this.tabs = [
      { title: 'About', content: 'This is the About tab' ,routeName:'DoctorList'},
      { title: 'Blog', content: 'This is our blog' ,routeName:'DoctorList'},
      { title: 'Contact us', content: 'Contact us here' ,routeName:'DoctorList'},
]; }
}