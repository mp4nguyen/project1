import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {NameListService} from '../../shared/services/name-list.service';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {AboutComponent} from '../../about/components/about.component';
import {CompaniesComponent} from '../../companies/components/companies.component';


@Component({
  selector: 'sd-home',
  templateUrl: './home/components/home.component.html',
  styleUrls: ['./home/components/home.component.css'],
  viewProviders: [NameListService],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,RouterOutlet]
})

@RouteConfig([
  {path:'/',    name: 'About',   component: AboutComponent},  
  {path:'/Companies/...',    name: 'Companies',   component: CompaniesComponent, useAsDefault: true},
])

export class HomeComponent {
  newName: string;
  constructor(public nameListService: NameListService) {}

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName);
    this.newName = '';
    return false;
  }
}
