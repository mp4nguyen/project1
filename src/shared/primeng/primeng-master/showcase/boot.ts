import {bootstrap} from 'angular2/platform-browser-dynamic';
import {provide} from 'angular2/core';
import {AppComponent} from './app.component'
import {ROUTER_PROVIDERS} from 'angular2/router-deprecated';
import {enableProdMode} from 'angular2/core';
import {LocationStrategy,HashLocationStrategy} from 'angular2/common';
import 'rxjs/Rx';

//enableProdMode();
bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);