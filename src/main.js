"use strict";
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var browser_2 = require('angular2/platform/browser');
var app_component_1 = require('./app/components/app.component');
var logging_service_1 = require('./shared/services/logging.service');
var mysqldate_service_1 = require('./shared/services/mysqldate.service');
if ('<%= ENV %>' === 'prod') {
    core_1.enableProdMode();
}
browser_1.bootstrap(app_component_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    browser_2.BrowserDomAdapter,
    http_1.HTTP_PROVIDERS,
    logging_service_1.LOGGING_PROVIDERS,
    mysqldate_service_1.MysqlDate,
    core_1.provide(router_1.APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
]);
//# sourceMappingURL=main.js.map