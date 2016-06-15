import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {HomeComponent} from '../../home/components/home.component';
import {LoginComponent} from '../../login/components/login.component';

@Component({
  selector: 'sd-app',
  templateUrl: './app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, LoginComponent,HomeComponent]
})

@RouteConfig([
  { path: '/',      name: 'Login',  component: LoginComponent  ,useAsDefault: true},
  { path: '/Home/...',      name: 'Home',  component: HomeComponent  },
])

export class AppComponent {}
