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
var treetable_1 = require('../../../components/treetable/treetable');
var column_1 = require('../../../components/column/column');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var http_1 = require('angular2/http');
var nodeservice_1 = require('../service/nodeservice');
var growl_1 = require('../../../components/growl/growl');
var header_1 = require('../../../components/common/header');
var TreeTableDemo = (function () {
    function TreeTableDemo(nodeService) {
        this.nodeService = nodeService;
    }
    TreeTableDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.nodeService.getFilesystem().then(function (files) { return _this.files = files; });
        this.nodeService.getLazyFilesystem().then(function (files) { return _this.lazyFiles = files; });
    };
    TreeTableDemo.prototype.nodeSelect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
    };
    TreeTableDemo.prototype.nodeUnselect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Unselected', detail: event.node.data.name });
    };
    TreeTableDemo.prototype.nodeExpand = function (event) {
        if (event.node) {
            this.nodeService.getLazyFilesystem().then(function (nodes) { return event.node.children = nodes; });
        }
    };
    TreeTableDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/treetable/treetabledemo.html',
            directives: [treetable_1.TreeTable, column_1.Column, tabview_1.TabView, growl_1.Growl, tabpanel_1.TabPanel, header_1.Header, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, nodeservice_1.NodeService]
        }), 
        __metadata('design:paramtypes', [nodeservice_1.NodeService])
    ], TreeTableDemo);
    return TreeTableDemo;
}());
exports.TreeTableDemo = TreeTableDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdHJlZXRhYmxlL3RyZWV0YWJsZWRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUErQixlQUFlLENBQUMsQ0FBQTtBQUMvQywwQkFBd0IseUNBQXlDLENBQUMsQ0FBQTtBQUNsRSx1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUV6RCxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQUM3RCxxQkFBZ0MsZUFBZSxDQUFDLENBQUE7QUFDaEQsNEJBQTBCLHdCQUF3QixDQUFDLENBQUE7QUFDbkQsc0JBQW9CLGlDQUFpQyxDQUFDLENBQUE7QUFFdEQsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFPekQ7SUFZSSx1QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBSSxDQUFDO0lBRWpELGdDQUFRLEdBQVI7UUFBQSxpQkFHQztRQUZHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLEVBQXRCLENBQXNCLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLEtBQUs7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRCxvQ0FBWSxHQUFaLFVBQWEsS0FBSztRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLEtBQUs7UUFDWixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVaLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQTNCLENBQTJCLENBQUMsQ0FBQztRQUNwRixDQUFDO0lBQ0wsQ0FBQztJQXZDTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsNENBQTRDO1lBQ3pELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsZUFBTSxFQUFDLGlCQUFPLEVBQUMsYUFBSyxFQUFDLG1CQUFRLEVBQUMsZUFBTSxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7WUFDOUYsU0FBUyxFQUFFLENBQUMscUJBQWMsRUFBQyx5QkFBVyxDQUFDO1NBQzFDLENBQUM7O3FCQUFBO0lBb0NGLG9CQUFDO0FBQUQsQ0FuQ0EsQUFtQ0MsSUFBQTtBQW5DWSxxQkFBYSxnQkFtQ3pCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby90cmVldGFibGUvdHJlZXRhYmxlZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1RyZWVUYWJsZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90cmVldGFibGUvdHJlZXRhYmxlJztcbmltcG9ydCB7Q29sdW1ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbHVtbi9jb2x1bW4nO1xuaW1wb3J0IHtUcmVlTm9kZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvdHJlZW5vZGUnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSAgICBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCB7Tm9kZVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2Uvbm9kZXNlcnZpY2UnO1xuaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL21lc3NhZ2UnO1xuaW1wb3J0IHtIZWFkZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2hlYWRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby90cmVldGFibGUvdHJlZXRhYmxlZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbVHJlZVRhYmxlLENvbHVtbixUYWJWaWV3LEdyb3dsLFRhYlBhbmVsLEhlYWRlcixDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdLFxuICAgIHByb3ZpZGVyczogW0hUVFBfUFJPVklERVJTLE5vZGVTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlVGFibGVEZW1vIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBcbiAgICBtc2dzOiBNZXNzYWdlW107XG4gICAgXG4gICAgZmlsZXM6IFRyZWVOb2RlW107XG4gICAgXG4gICAgbGF6eUZpbGVzOiBUcmVlTm9kZVtdO1xuICAgICAgICBcbiAgICBzZWxlY3RlZEZpbGU6IFRyZWVOb2RlO1xuICAgIFxuICAgIHNlbGVjdGVkRmlsZXM6IFRyZWVOb2RlW107XG4gICAgICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm9kZVNlcnZpY2U6IE5vZGVTZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5vZGVTZXJ2aWNlLmdldEZpbGVzeXN0ZW0oKS50aGVuKGZpbGVzID0+IHRoaXMuZmlsZXMgPSBmaWxlcyk7XG4gICAgICAgIHRoaXMubm9kZVNlcnZpY2UuZ2V0TGF6eUZpbGVzeXN0ZW0oKS50aGVuKGZpbGVzID0+IHRoaXMubGF6eUZpbGVzID0gZmlsZXMpO1xuICAgIH1cbiAgICBcbiAgICBub2RlU2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6ICdpbmZvJywgc3VtbWFyeTogJ05vZGUgU2VsZWN0ZWQnLCBkZXRhaWw6IGV2ZW50Lm5vZGUuZGF0YS5uYW1lfSk7XG4gICAgfVxuICAgIFxuICAgIG5vZGVVbnNlbGVjdChldmVudCkge1xuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OiAnaW5mbycsIHN1bW1hcnk6ICdOb2RlIFVuc2VsZWN0ZWQnLCBkZXRhaWw6IGV2ZW50Lm5vZGUuZGF0YS5uYW1lfSk7XG4gICAgfVxuICAgIFxuICAgIG5vZGVFeHBhbmQoZXZlbnQpIHtcbiAgICAgICAgaWYoZXZlbnQubm9kZSkge1xuICAgICAgICAgICAgLy9pbiBhIHJlYWwgYXBwbGljYXRpb24sIG1ha2UgYSBjYWxsIHRvIGEgcmVtb3RlIHVybCB0byBsb2FkIGNoaWxkcmVuIG9mIHRoZSBjdXJyZW50IG5vZGUgYW5kIGFkZCB0aGUgbmV3IG5vZGVzIGFzIGNoaWxkcmVuXG4gICAgICAgICAgICB0aGlzLm5vZGVTZXJ2aWNlLmdldExhenlGaWxlc3lzdGVtKCkudGhlbihub2RlcyA9PiBldmVudC5ub2RlLmNoaWxkcmVuID0gbm9kZXMpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
