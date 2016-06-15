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
var lightbox_1 = require('../../../components/lightbox/lightbox');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var LightboxDemo = (function () {
    function LightboxDemo() {
        this.images = [];
        this.images.push({ source: 'showcase/resources/demo/images/sopranos/sopranos1.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos1_small.jpg', title: 'Sopranos 1' });
        this.images.push({ source: 'showcase/resources/demo/images/sopranos/sopranos2.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos2_small.jpg', title: 'Sopranos 2' });
        this.images.push({ source: 'showcase/resources/demo/images/sopranos/sopranos3.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos3_small.jpg', title: 'Sopranos 3' });
        this.images.push({ source: 'showcase/resources/demo/images/sopranos/sopranos4.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos4_small.jpg', title: 'Sopranos 4' });
    }
    LightboxDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/lightbox/lightboxdemo.html',
            directives: [lightbox_1.Lightbox, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], LightboxDemo);
    return LightboxDemo;
}());
exports.LightboxDemo = LightboxDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbGlnaHRib3gvbGlnaHRib3hkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0QsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFJSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLHVEQUF1RCxFQUFFLFNBQVMsRUFBRSw2REFBNkQsRUFBRSxLQUFLLEVBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztRQUNqTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBQyx1REFBdUQsRUFBRSxTQUFTLEVBQUUsNkRBQTZELEVBQUUsS0FBSyxFQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7UUFDakwsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUMsdURBQXVELEVBQUUsU0FBUyxFQUFFLDZEQUE2RCxFQUFFLEtBQUssRUFBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1FBQ2pMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFDLHVEQUF1RCxFQUFFLFNBQVMsRUFBRSw2REFBNkQsRUFBRSxLQUFLLEVBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUNyTCxDQUFDO0lBZEw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxVQUFVLEVBQUUsQ0FBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsbUJBQVEsRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQzVFLENBQUM7O29CQUFBO0lBWUYsbUJBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLG9CQUFZLGVBV3hCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9saWdodGJveC9saWdodGJveGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0xpZ2h0Ym94fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2xpZ2h0Ym94L2xpZ2h0Ym94JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vbGlnaHRib3gvbGlnaHRib3hkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtMaWdodGJveCxUYWJWaWV3LFRhYlBhbmVsLENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgTGlnaHRib3hEZW1vIHtcblxuICAgIGltYWdlczogYW55W107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaCh7c291cmNlOidzaG93Y2FzZS9yZXNvdXJjZXMvZGVtby9pbWFnZXMvc29wcmFub3Mvc29wcmFub3MxLmpwZycsIHRodW1ibmFpbDogJ3Nob3djYXNlL3Jlc291cmNlcy9kZW1vL2ltYWdlcy9zb3ByYW5vcy9zb3ByYW5vczFfc21hbGwuanBnJywgdGl0bGU6J1NvcHJhbm9zIDEnfSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goe3NvdXJjZTonc2hvd2Nhc2UvcmVzb3VyY2VzL2RlbW8vaW1hZ2VzL3NvcHJhbm9zL3NvcHJhbm9zMi5qcGcnLCB0aHVtYm5haWw6ICdzaG93Y2FzZS9yZXNvdXJjZXMvZGVtby9pbWFnZXMvc29wcmFub3Mvc29wcmFub3MyX3NtYWxsLmpwZycsIHRpdGxlOidTb3ByYW5vcyAyJ30pO1xuICAgICAgICB0aGlzLmltYWdlcy5wdXNoKHtzb3VyY2U6J3Nob3djYXNlL3Jlc291cmNlcy9kZW1vL2ltYWdlcy9zb3ByYW5vcy9zb3ByYW5vczMuanBnJywgdGh1bWJuYWlsOiAnc2hvd2Nhc2UvcmVzb3VyY2VzL2RlbW8vaW1hZ2VzL3NvcHJhbm9zL3NvcHJhbm9zM19zbWFsbC5qcGcnLCB0aXRsZTonU29wcmFub3MgMyd9KTtcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaCh7c291cmNlOidzaG93Y2FzZS9yZXNvdXJjZXMvZGVtby9pbWFnZXMvc29wcmFub3Mvc29wcmFub3M0LmpwZycsIHRodW1ibmFpbDogJ3Nob3djYXNlL3Jlc291cmNlcy9kZW1vL2ltYWdlcy9zb3ByYW5vcy9zb3ByYW5vczRfc21hbGwuanBnJywgdGl0bGU6J1NvcHJhbm9zIDQnfSk7XG4gICAgfVxufSJdfQ==
