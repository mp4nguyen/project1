"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_deprecated_1 = require('angular2/router-deprecated');
var HomePageComponent = (function () {
    function HomePageComponent() {
    }
    HomePageComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"ContentSideSections overHidden\">\n            <div class=\"Content33 floatLeft overHidden TextShadow\">\n                <div class=\"defaultTopic\">PrimeNG</div>\n                <div class=\"defaultText\">PrimeNG is a collection of rich UI components for AngularJS2. PrimeNG is a sibling of the popular JavaServer Faces Component Suite, <a href=\"http://www.primefaces.org\">PrimeFaces</a>.</div>\n                <br />\n                <div class=\"defaultText\">All widgets are open source and free to use under Apache License 2.0, a commercial friendly license.</div>\n                <br />\n                <div class=\"defaultText\">PrimeNG is developed by <a href=\"http://www.primetek.com.tr\">PrimeTek Informatics</a>, a company with years of expertise in developing open source UI components.\n                 For project news and updates, follow us on <a href=\"https://twitter.com/prime_ng\">twitter.</a></div>\n                 <br />\n                <a [routerLink]=\"['Setup']\" class=\"BigButton TextShadowNone YellowBtn\"> <span class=\"floatLeft\">Download</span> <img src=\"showcase/resources/images/btnArrow.svg\" style=\"float:right\"/></a>\n                <a href=\"https://github.com/primefaces/primeng\" class=\"BigButton TextShadowNone OrangeBtn\"> <span class=\"floatLeft\">View on GitHub</span> <img src=\"showcase/resources/images/btnDocumenticon.svg\" style=\"float:right\"/></a>\n            </div>\n            <div class=\"Content66 floatRight overHidden\">\n                <div class=\"PropertyBox TextShadow\">\n                    <img src=\"showcase/resources/images/ajaxFramework.svg\" />\n                    <span class=\"PropertyTopic\">PRIMEFACES UI</span>\n                    <span class=\"PropertyText\">Derived from the mighty PrimeFaces</span>\n                </div>\n                <div class=\"PropertyBox TextShadow\">\n                    <img src=\"showcase/resources/images/components.svg\" />\n                    <span class=\"PropertyTopic\">WIDGETS</span>\n                    <span class=\"PropertyText\">60+ Components<br />Easy to Use<br />Accessible</span>\n                </div>\n                <div class=\"PropertyBox TextShadow\">\n                    <img src=\"showcase/resources/images/productivity.svg\" />\n                    <span class=\"PropertyTopic\">PRODUCTIVITY</span>\n                    <span class=\"PropertyText\">Simple<br />Lightweight<br />Powerful</span>\n                </div>\n                <div class=\"PropertyBox TextShadow\">\n                    <img src=\"showcase/resources/images/mobile.svg\" />\n                    <span class=\"PropertyTopic\">MOBILE</span>\n                    <span class=\"PropertyText\">Responsive<br />Cross Browser<br />Touch Optimized</span>\n                </div>\n                <div class=\"PropertyBox TextShadow\">\n                    <img src=\"showcase/resources/images/community.svg\"/>\n                    <span class=\"PropertyTopic\">COMMUNITY</span>\n                    <span class=\"PropertyText\">Active<br />Vibrant<br />Open Source<br /></span>\n                </div>\n                <div class=\"PropertyBox TextShadow\">\n                    <img src=\"showcase/resources/images/themeswitcher.svg\" />\n                    <span class=\"PropertyTopic\">THEMES</span>\n                    <span class=\"PropertyText\">35+ Free Themes<br />Premium Themes<br />Theme Creator Tool<br /></span>\n                </div>\n            </div>\n        </div>\n        \n        \n        <div class=\"ContentSideSections overHidden defaultText\">\n            <span class=\"dispBlock logoBlueText fontSize30\">PrimeNG at Keynote of NG-Conf</span>\n            <p class=\"defaultText\" style=\"margin-bottom:10px\">PrimeNG has been mentioned at keynote of NG-Conf, watch the full keynote <a href=\"https://www.youtube.com/watch?v=gdlpE9vPQFs\">here</a>.</p>\n            <a href=\"https://www.youtube.com/watch?v=gdlpE9vPQFs\">\n                <img src=\"showcase/resources/images/keynote.png\" style=\"width:100%\" />\n            </a>\n        </div>\n\n        <div class=\"ContentSideSections overHidden PFLayouts\">\n            <div class=\"logoBlueText fontSize30\">Premium Layouts and Themes for PrimeNG</div>\n            <p class=\"defaultText\" style=\"margin-bottom:10px\">Create awesome applications in no time, impress your users.</p>\n            <div style=\"padding:30px\">\n                <div class=\"Content50 floatLeft overHidden\">\n                    <a href=\"http://www.primefaces.org/layouts/olympos-primeng\" target=\"_blank\"><img src=\"http://www.primefaces.org/images/highlights/olympos.png\" style=\"width:100%\" /></a>\n                </div>\n                <div class=\"Content50 floatLeft overHidden\">\n                    <a href=\"http://www.primefaces.org/layouts/modena-primeng\" target=\"_blank\"><img src=\"http://www.primefaces.org/images/highlights/modena.png\" style=\"width:100%\" /></a>\n                </div>\n                <div class=\"Content50 floatLeft overHidden\">\n                    <a href=\"http://www.primefaces.org/layouts/rio-primeng\" target=\"_blank\"><img src=\"http://www.primefaces.org/images/highlights/rio.png\" style=\"width:100%\" /></a>\n                </div>\n                <div class=\"Content50 floatLeft overHidden\">\n                    <a href=\"http://www.primefaces.org/layouts/adamantium-primeng\" target=\"_blank\"><img src=\"http://www.primefaces.org/images/highlights/adamantium.png\" style=\"width:100%\" /></a>\n                </div>\n            </div>\n        </div>\n        \n        <div class=\"ContentSideSections overHidden defaultText\">\n            <span class=\"dispBlock logoBlueText fontSize30\">PrimeNG PRO Support</span>\n            <p class=\"defaultText\" style=\"margin-bottom:10px\">With PrimeNG PRO, it's easy to support, tune and add features to PrimeNG as if it were an in-house framework.</p>\n            <p class=\"defaultText\" style=\"margin-bottom:10px\">PrimeNG PRO is a term based commercial support service. With the exclusive services of Pro account, \n                            you no longer need to post your questions in the community forum and your issues to community issue tracker.</p>\n                            \n            <h4>Standard PRO Services</h4>\n\t\t\t<ul>\n\t\t\t\t<li>Access to pro.primefaces.org</li>\n\t\t\t\t<li>Response within 1 business day.</li>\n\t\t\t\t<li>Defect patches.</li>\n\t\t\t\t<li>Private branch management in case you need.</li>\n\t\t\t\t<li>Customized builds.</li>\n\t\t\t\t<li>Unlimited number of cases.</li>\n\t\t\t\t<li>Remote desktop connection.</li>\n\t\t\t\t<li>Conference calls for discussions.</li>\n\t\t\t\t<li>High priority to your issues.</li>\n\t\t\t</ul>\n\t\t\t\t\t\t\n\t\t\t<h4>New Features (Optional)</h4>\t\t\t\n\t\t\t\t\t\t\n\t\t\t<p>New feature and enhancement requests are not available in core services and provided via an hour based model instead.  When you have a feature request we provide an estimate, if you confirm we deliver your request within an estimated timeframe and deduct the amount of work from your hours. These requests can be;</p>\n\n\t\t\t<ul>\n\t\t\t\t<li>New components.</li>\n\t\t\t\t<li>New functionality to existing components.</li>\n\t\t\t\t<li>Changing the way a certain functionality is implemented.</li>\n\t\t\t\t<li>Accessibility improvements.</li>\n\t\t\t\t<li>Proof of Concept implementations of a use case.</li>\n\t\t\t\t<li>Code reviews to offer best practices.</li>\n\t\t\t</ul>\n\t\t\t\n\t\t\t<p>You can purchase additional hours along with the subscription and also anytime during your subscription period. If your subscription term ends with unused hours, they will be added to your new subscription term in case you extend.</p>\n        \n            <div style=\"text-align:center\"><a href=\"mailto:primeng@primetek.com.tr\"><img src=\"showcase/resources/images/quote.png\" alt=\"Get a Quote\"></a></div>\n        </div>\n    ",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2hvbWVwYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLGtDQUE2Qyw0QkFBNEIsQ0FBQyxDQUFBO0FBc0gxRTtJQUFBO0lBRUEsQ0FBQztJQXRIRDtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsMjJQQWdIVDtZQUNELFVBQVUsRUFBRSxDQUFDLHFDQUFpQixDQUFDO1NBQ2xDLENBQUM7O3lCQUFBO0lBR0Ysd0JBQUM7QUFBRCxDQUZBLEFBRUMsSUFBQTtBQUZZLHlCQUFpQixvQkFFN0IsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9ob21lcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JvdXRlQ29uZmlnLCBST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiQ29udGVudFNpZGVTZWN0aW9ucyBvdmVySGlkZGVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiQ29udGVudDMzIGZsb2F0TGVmdCBvdmVySGlkZGVuIFRleHRTaGFkb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVmYXVsdFRvcGljXCI+UHJpbWVORzwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWZhdWx0VGV4dFwiPlByaW1lTkcgaXMgYSBjb2xsZWN0aW9uIG9mIHJpY2ggVUkgY29tcG9uZW50cyBmb3IgQW5ndWxhckpTMi4gUHJpbWVORyBpcyBhIHNpYmxpbmcgb2YgdGhlIHBvcHVsYXIgSmF2YVNlcnZlciBGYWNlcyBDb21wb25lbnQgU3VpdGUsIDxhIGhyZWY9XCJodHRwOi8vd3d3LnByaW1lZmFjZXMub3JnXCI+UHJpbWVGYWNlczwvYT4uPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlZmF1bHRUZXh0XCI+QWxsIHdpZGdldHMgYXJlIG9wZW4gc291cmNlIGFuZCBmcmVlIHRvIHVzZSB1bmRlciBBcGFjaGUgTGljZW5zZSAyLjAsIGEgY29tbWVyY2lhbCBmcmllbmRseSBsaWNlbnNlLjwvZGl2PlxuICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWZhdWx0VGV4dFwiPlByaW1lTkcgaXMgZGV2ZWxvcGVkIGJ5IDxhIGhyZWY9XCJodHRwOi8vd3d3LnByaW1ldGVrLmNvbS50clwiPlByaW1lVGVrIEluZm9ybWF0aWNzPC9hPiwgYSBjb21wYW55IHdpdGggeWVhcnMgb2YgZXhwZXJ0aXNlIGluIGRldmVsb3Bpbmcgb3BlbiBzb3VyY2UgVUkgY29tcG9uZW50cy5cbiAgICAgICAgICAgICAgICAgRm9yIHByb2plY3QgbmV3cyBhbmQgdXBkYXRlcywgZm9sbG93IHVzIG9uIDxhIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL3ByaW1lX25nXCI+dHdpdHRlci48L2E+PC9kaXY+XG4gICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIlsnU2V0dXAnXVwiIGNsYXNzPVwiQmlnQnV0dG9uIFRleHRTaGFkb3dOb25lIFllbGxvd0J0blwiPiA8c3BhbiBjbGFzcz1cImZsb2F0TGVmdFwiPkRvd25sb2FkPC9zcGFuPiA8aW1nIHNyYz1cInNob3djYXNlL3Jlc291cmNlcy9pbWFnZXMvYnRuQXJyb3cuc3ZnXCIgc3R5bGU9XCJmbG9hdDpyaWdodFwiLz48L2E+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9wcmltZWZhY2VzL3ByaW1lbmdcIiBjbGFzcz1cIkJpZ0J1dHRvbiBUZXh0U2hhZG93Tm9uZSBPcmFuZ2VCdG5cIj4gPHNwYW4gY2xhc3M9XCJmbG9hdExlZnRcIj5WaWV3IG9uIEdpdEh1Yjwvc3Bhbj4gPGltZyBzcmM9XCJzaG93Y2FzZS9yZXNvdXJjZXMvaW1hZ2VzL2J0bkRvY3VtZW50aWNvbi5zdmdcIiBzdHlsZT1cImZsb2F0OnJpZ2h0XCIvPjwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIkNvbnRlbnQ2NiBmbG9hdFJpZ2h0IG92ZXJIaWRkZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiUHJvcGVydHlCb3ggVGV4dFNoYWRvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cInNob3djYXNlL3Jlc291cmNlcy9pbWFnZXMvYWpheEZyYW1ld29yay5zdmdcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIlByb3BlcnR5VG9waWNcIj5QUklNRUZBQ0VTIFVJPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIlByb3BlcnR5VGV4dFwiPkRlcml2ZWQgZnJvbSB0aGUgbWlnaHR5IFByaW1lRmFjZXM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIlByb3BlcnR5Qm94IFRleHRTaGFkb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJzaG93Y2FzZS9yZXNvdXJjZXMvaW1hZ2VzL2NvbXBvbmVudHMuc3ZnXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJQcm9wZXJ0eVRvcGljXCI+V0lER0VUUzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJQcm9wZXJ0eVRleHRcIj42MCsgQ29tcG9uZW50czxiciAvPkVhc3kgdG8gVXNlPGJyIC8+QWNjZXNzaWJsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiUHJvcGVydHlCb3ggVGV4dFNoYWRvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cInNob3djYXNlL3Jlc291cmNlcy9pbWFnZXMvcHJvZHVjdGl2aXR5LnN2Z1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiUHJvcGVydHlUb3BpY1wiPlBST0RVQ1RJVklUWTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJQcm9wZXJ0eVRleHRcIj5TaW1wbGU8YnIgLz5MaWdodHdlaWdodDxiciAvPlBvd2VyZnVsPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJQcm9wZXJ0eUJveCBUZXh0U2hhZG93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwic2hvd2Nhc2UvcmVzb3VyY2VzL2ltYWdlcy9tb2JpbGUuc3ZnXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJQcm9wZXJ0eVRvcGljXCI+TU9CSUxFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIlByb3BlcnR5VGV4dFwiPlJlc3BvbnNpdmU8YnIgLz5Dcm9zcyBCcm93c2VyPGJyIC8+VG91Y2ggT3B0aW1pemVkPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJQcm9wZXJ0eUJveCBUZXh0U2hhZG93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwic2hvd2Nhc2UvcmVzb3VyY2VzL2ltYWdlcy9jb21tdW5pdHkuc3ZnXCIvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIlByb3BlcnR5VG9waWNcIj5DT01NVU5JVFk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiUHJvcGVydHlUZXh0XCI+QWN0aXZlPGJyIC8+VmlicmFudDxiciAvPk9wZW4gU291cmNlPGJyIC8+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJQcm9wZXJ0eUJveCBUZXh0U2hhZG93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwic2hvd2Nhc2UvcmVzb3VyY2VzL2ltYWdlcy90aGVtZXN3aXRjaGVyLnN2Z1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiUHJvcGVydHlUb3BpY1wiPlRIRU1FUzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJQcm9wZXJ0eVRleHRcIj4zNSsgRnJlZSBUaGVtZXM8YnIgLz5QcmVtaXVtIFRoZW1lczxiciAvPlRoZW1lIENyZWF0b3IgVG9vbDxiciAvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwiQ29udGVudFNpZGVTZWN0aW9ucyBvdmVySGlkZGVuIGRlZmF1bHRUZXh0XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRpc3BCbG9jayBsb2dvQmx1ZVRleHQgZm9udFNpemUzMFwiPlByaW1lTkcgYXQgS2V5bm90ZSBvZiBORy1Db25mPC9zcGFuPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJkZWZhdWx0VGV4dFwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbToxMHB4XCI+UHJpbWVORyBoYXMgYmVlbiBtZW50aW9uZWQgYXQga2V5bm90ZSBvZiBORy1Db25mLCB3YXRjaCB0aGUgZnVsbCBrZXlub3RlIDxhIGhyZWY9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWdkbHBFOXZQUUZzXCI+aGVyZTwvYT4uPC9wPlxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9Z2RscEU5dlBRRnNcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cInNob3djYXNlL3Jlc291cmNlcy9pbWFnZXMva2V5bm90ZS5wbmdcIiBzdHlsZT1cIndpZHRoOjEwMCVcIiAvPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiQ29udGVudFNpZGVTZWN0aW9ucyBvdmVySGlkZGVuIFBGTGF5b3V0c1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvZ29CbHVlVGV4dCBmb250U2l6ZTMwXCI+UHJlbWl1bSBMYXlvdXRzIGFuZCBUaGVtZXMgZm9yIFByaW1lTkc8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZGVmYXVsdFRleHRcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206MTBweFwiPkNyZWF0ZSBhd2Vzb21lIGFwcGxpY2F0aW9ucyBpbiBubyB0aW1lLCBpbXByZXNzIHlvdXIgdXNlcnMuPC9wPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6MzBweFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJDb250ZW50NTAgZmxvYXRMZWZ0IG92ZXJIaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly93d3cucHJpbWVmYWNlcy5vcmcvbGF5b3V0cy9vbHltcG9zLXByaW1lbmdcIiB0YXJnZXQ9XCJfYmxhbmtcIj48aW1nIHNyYz1cImh0dHA6Ly93d3cucHJpbWVmYWNlcy5vcmcvaW1hZ2VzL2hpZ2hsaWdodHMvb2x5bXBvcy5wbmdcIiBzdHlsZT1cIndpZHRoOjEwMCVcIiAvPjwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiQ29udGVudDUwIGZsb2F0TGVmdCBvdmVySGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwOi8vd3d3LnByaW1lZmFjZXMub3JnL2xheW91dHMvbW9kZW5hLXByaW1lbmdcIiB0YXJnZXQ9XCJfYmxhbmtcIj48aW1nIHNyYz1cImh0dHA6Ly93d3cucHJpbWVmYWNlcy5vcmcvaW1hZ2VzL2hpZ2hsaWdodHMvbW9kZW5hLnBuZ1wiIHN0eWxlPVwid2lkdGg6MTAwJVwiIC8+PC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJDb250ZW50NTAgZmxvYXRMZWZ0IG92ZXJIaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly93d3cucHJpbWVmYWNlcy5vcmcvbGF5b3V0cy9yaW8tcHJpbWVuZ1wiIHRhcmdldD1cIl9ibGFua1wiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5wcmltZWZhY2VzLm9yZy9pbWFnZXMvaGlnaGxpZ2h0cy9yaW8ucG5nXCIgc3R5bGU9XCJ3aWR0aDoxMDAlXCIgLz48L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIkNvbnRlbnQ1MCBmbG9hdExlZnQgb3ZlckhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL3d3dy5wcmltZWZhY2VzLm9yZy9sYXlvdXRzL2FkYW1hbnRpdW0tcHJpbWVuZ1wiIHRhcmdldD1cIl9ibGFua1wiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5wcmltZWZhY2VzLm9yZy9pbWFnZXMvaGlnaGxpZ2h0cy9hZGFtYW50aXVtLnBuZ1wiIHN0eWxlPVwid2lkdGg6MTAwJVwiIC8+PC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cIkNvbnRlbnRTaWRlU2VjdGlvbnMgb3ZlckhpZGRlbiBkZWZhdWx0VGV4dFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaXNwQmxvY2sgbG9nb0JsdWVUZXh0IGZvbnRTaXplMzBcIj5QcmltZU5HIFBSTyBTdXBwb3J0PC9zcGFuPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJkZWZhdWx0VGV4dFwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbToxMHB4XCI+V2l0aCBQcmltZU5HIFBSTywgaXQncyBlYXN5IHRvIHN1cHBvcnQsIHR1bmUgYW5kIGFkZCBmZWF0dXJlcyB0byBQcmltZU5HIGFzIGlmIGl0IHdlcmUgYW4gaW4taG91c2UgZnJhbWV3b3JrLjwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZGVmYXVsdFRleHRcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206MTBweFwiPlByaW1lTkcgUFJPIGlzIGEgdGVybSBiYXNlZCBjb21tZXJjaWFsIHN1cHBvcnQgc2VydmljZS4gV2l0aCB0aGUgZXhjbHVzaXZlIHNlcnZpY2VzIG9mIFBybyBhY2NvdW50LCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5b3Ugbm8gbG9uZ2VyIG5lZWQgdG8gcG9zdCB5b3VyIHF1ZXN0aW9ucyBpbiB0aGUgY29tbXVuaXR5IGZvcnVtIGFuZCB5b3VyIGlzc3VlcyB0byBjb21tdW5pdHkgaXNzdWUgdHJhY2tlci48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8aDQ+U3RhbmRhcmQgUFJPIFNlcnZpY2VzPC9oND5cblx0XHRcdDx1bD5cblx0XHRcdFx0PGxpPkFjY2VzcyB0byBwcm8ucHJpbWVmYWNlcy5vcmc8L2xpPlxuXHRcdFx0XHQ8bGk+UmVzcG9uc2Ugd2l0aGluIDEgYnVzaW5lc3MgZGF5LjwvbGk+XG5cdFx0XHRcdDxsaT5EZWZlY3QgcGF0Y2hlcy48L2xpPlxuXHRcdFx0XHQ8bGk+UHJpdmF0ZSBicmFuY2ggbWFuYWdlbWVudCBpbiBjYXNlIHlvdSBuZWVkLjwvbGk+XG5cdFx0XHRcdDxsaT5DdXN0b21pemVkIGJ1aWxkcy48L2xpPlxuXHRcdFx0XHQ8bGk+VW5saW1pdGVkIG51bWJlciBvZiBjYXNlcy48L2xpPlxuXHRcdFx0XHQ8bGk+UmVtb3RlIGRlc2t0b3AgY29ubmVjdGlvbi48L2xpPlxuXHRcdFx0XHQ8bGk+Q29uZmVyZW5jZSBjYWxscyBmb3IgZGlzY3Vzc2lvbnMuPC9saT5cblx0XHRcdFx0PGxpPkhpZ2ggcHJpb3JpdHkgdG8geW91ciBpc3N1ZXMuPC9saT5cblx0XHRcdDwvdWw+XG5cdFx0XHRcdFx0XHRcblx0XHRcdDxoND5OZXcgRmVhdHVyZXMgKE9wdGlvbmFsKTwvaDQ+XHRcdFx0XG5cdFx0XHRcdFx0XHRcblx0XHRcdDxwPk5ldyBmZWF0dXJlIGFuZCBlbmhhbmNlbWVudCByZXF1ZXN0cyBhcmUgbm90IGF2YWlsYWJsZSBpbiBjb3JlIHNlcnZpY2VzIGFuZCBwcm92aWRlZCB2aWEgYW4gaG91ciBiYXNlZCBtb2RlbCBpbnN0ZWFkLiAgV2hlbiB5b3UgaGF2ZSBhIGZlYXR1cmUgcmVxdWVzdCB3ZSBwcm92aWRlIGFuIGVzdGltYXRlLCBpZiB5b3UgY29uZmlybSB3ZSBkZWxpdmVyIHlvdXIgcmVxdWVzdCB3aXRoaW4gYW4gZXN0aW1hdGVkIHRpbWVmcmFtZSBhbmQgZGVkdWN0IHRoZSBhbW91bnQgb2Ygd29yayBmcm9tIHlvdXIgaG91cnMuIFRoZXNlIHJlcXVlc3RzIGNhbiBiZTs8L3A+XG5cblx0XHRcdDx1bD5cblx0XHRcdFx0PGxpPk5ldyBjb21wb25lbnRzLjwvbGk+XG5cdFx0XHRcdDxsaT5OZXcgZnVuY3Rpb25hbGl0eSB0byBleGlzdGluZyBjb21wb25lbnRzLjwvbGk+XG5cdFx0XHRcdDxsaT5DaGFuZ2luZyB0aGUgd2F5IGEgY2VydGFpbiBmdW5jdGlvbmFsaXR5IGlzIGltcGxlbWVudGVkLjwvbGk+XG5cdFx0XHRcdDxsaT5BY2Nlc3NpYmlsaXR5IGltcHJvdmVtZW50cy48L2xpPlxuXHRcdFx0XHQ8bGk+UHJvb2Ygb2YgQ29uY2VwdCBpbXBsZW1lbnRhdGlvbnMgb2YgYSB1c2UgY2FzZS48L2xpPlxuXHRcdFx0XHQ8bGk+Q29kZSByZXZpZXdzIHRvIG9mZmVyIGJlc3QgcHJhY3RpY2VzLjwvbGk+XG5cdFx0XHQ8L3VsPlxuXHRcdFx0XG5cdFx0XHQ8cD5Zb3UgY2FuIHB1cmNoYXNlIGFkZGl0aW9uYWwgaG91cnMgYWxvbmcgd2l0aCB0aGUgc3Vic2NyaXB0aW9uIGFuZCBhbHNvIGFueXRpbWUgZHVyaW5nIHlvdXIgc3Vic2NyaXB0aW9uIHBlcmlvZC4gSWYgeW91ciBzdWJzY3JpcHRpb24gdGVybSBlbmRzIHdpdGggdW51c2VkIGhvdXJzLCB0aGV5IHdpbGwgYmUgYWRkZWQgdG8geW91ciBuZXcgc3Vic2NyaXB0aW9uIHRlcm0gaW4gY2FzZSB5b3UgZXh0ZW5kLjwvcD5cbiAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXJcIj48YSBocmVmPVwibWFpbHRvOnByaW1lbmdAcHJpbWV0ZWsuY29tLnRyXCI+PGltZyBzcmM9XCJzaG93Y2FzZS9yZXNvdXJjZXMvaW1hZ2VzL3F1b3RlLnBuZ1wiIGFsdD1cIkdldCBhIFF1b3RlXCI+PC9hPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZVBhZ2VDb21wb25lbnQge1xuXG59Il19
