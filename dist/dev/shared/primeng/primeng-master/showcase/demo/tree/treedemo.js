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
var tree_1 = require('../../../components/tree/tree');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var http_1 = require('angular2/http');
var nodeservice_1 = require('../service/nodeservice');
var growl_1 = require('../../../components/growl/growl');
var TreeDemo = (function () {
    function TreeDemo(nodeService) {
        this.nodeService = nodeService;
    }
    TreeDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.nodeService.getFiles().then(function (files) { return _this.files = files; });
        this.nodeService.getLazyFiles().then(function (files) { return _this.lazyFiles = files; });
    };
    TreeDemo.prototype.nodeSelect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    };
    TreeDemo.prototype.nodeUnselect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
    };
    TreeDemo.prototype.nodeExpand = function (event) {
        if (event.node) {
            this.nodeService.getLazyFiles().then(function (nodes) { return event.node.children = nodes; });
        }
    };
    TreeDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/tree/treedemo.html',
            directives: [tree_1.Tree, tabview_1.TabView, growl_1.Growl, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, nodeservice_1.NodeService]
        }), 
        __metadata('design:paramtypes', [nodeservice_1.NodeService])
    ], TreeDemo);
    return TreeDemo;
}());
exports.TreeDemo = TreeDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdHJlZS90cmVlZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLHFCQUFtQiwrQkFBK0IsQ0FBQyxDQUFBO0FBRW5ELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBQzdELHFCQUFnQyxlQUFlLENBQUMsQ0FBQTtBQUNoRCw0QkFBMEIsd0JBQXdCLENBQUMsQ0FBQTtBQUNuRCxzQkFBb0IsaUNBQWlDLENBQUMsQ0FBQTtBQVF0RDtJQVlJLGtCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFJLENBQUM7SUFFakQsMkJBQVEsR0FBUjtRQUFBLGlCQUdDO1FBRkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLEVBQXRCLENBQXNCLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsNkJBQVUsR0FBVixVQUFXLEtBQUs7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVELCtCQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ1osRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFWixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1FBQy9FLENBQUM7SUFDTCxDQUFDO0lBdkNMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSxrQ0FBa0M7WUFDL0MsVUFBVSxFQUFFLENBQUMsV0FBSSxFQUFDLGlCQUFPLEVBQUMsYUFBSyxFQUFDLG1CQUFRLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztZQUMzRSxTQUFTLEVBQUUsQ0FBQyxxQkFBYyxFQUFDLHlCQUFXLENBQUM7U0FDMUMsQ0FBQzs7Z0JBQUE7SUFvQ0YsZUFBQztBQUFELENBbkNBLEFBbUNDLElBQUE7QUFuQ1ksZ0JBQVEsV0FtQ3BCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby90cmVlL3RyZWVkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90cmVlL3RyZWUnO1xuaW1wb3J0IHtUcmVlTm9kZX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvdHJlZW5vZGUnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSAgICBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCB7Tm9kZVNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2Uvbm9kZXNlcnZpY2UnO1xuaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL21lc3NhZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vdHJlZS90cmVlZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbVHJlZSxUYWJWaWV3LEdyb3dsLFRhYlBhbmVsLENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU10sXG4gICAgcHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlMsTm9kZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVEZW1vIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBcbiAgICBtc2dzOiBNZXNzYWdlW107XG4gICAgXG4gICAgZmlsZXM6IFRyZWVOb2RlW107XG4gICAgXG4gICAgbGF6eUZpbGVzOiBUcmVlTm9kZVtdO1xuICAgIFxuICAgIHNlbGVjdGVkRmlsZTogVHJlZU5vZGU7XG4gICAgXG4gICAgc2VsZWN0ZWRGaWxlczogVHJlZU5vZGVbXTtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub2RlU2VydmljZTogTm9kZVNlcnZpY2UpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubm9kZVNlcnZpY2UuZ2V0RmlsZXMoKS50aGVuKGZpbGVzID0+IHRoaXMuZmlsZXMgPSBmaWxlcyk7XG4gICAgICAgIHRoaXMubm9kZVNlcnZpY2UuZ2V0TGF6eUZpbGVzKCkudGhlbihmaWxlcyA9PiB0aGlzLmxhenlGaWxlcyA9IGZpbGVzKTtcbiAgICB9XG4gICAgXG4gICAgbm9kZVNlbGVjdChldmVudCkge1xuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OiAnaW5mbycsIHN1bW1hcnk6ICdOb2RlIFNlbGVjdGVkJywgZGV0YWlsOiBldmVudC5ub2RlLmxhYmVsfSk7XG4gICAgfVxuICAgIFxuICAgIG5vZGVVbnNlbGVjdChldmVudCkge1xuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OiAnaW5mbycsIHN1bW1hcnk6ICdOb2RlIFVuc2VsZWN0ZWQnLCBkZXRhaWw6IGV2ZW50Lm5vZGUubGFiZWx9KTtcbiAgICB9XG4gICAgXG4gICAgbm9kZUV4cGFuZChldmVudCkge1xuICAgICAgICBpZihldmVudC5ub2RlKSB7XG4gICAgICAgICAgICAvL2luIGEgcmVhbCBhcHBsaWNhdGlvbiwgbWFrZSBhIGNhbGwgdG8gYSByZW1vdGUgdXJsIHRvIGxvYWQgY2hpbGRyZW4gb2YgdGhlIGN1cnJlbnQgbm9kZSBhbmQgYWRkIHRoZSBuZXcgbm9kZXMgYXMgY2hpbGRyZW5cbiAgICAgICAgICAgIHRoaXMubm9kZVNlcnZpY2UuZ2V0TGF6eUZpbGVzKCkudGhlbihub2RlcyA9PiBldmVudC5ub2RlLmNoaWxkcmVuID0gbm9kZXMpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
