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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var tree_1 = require('../tree/tree');
var treenodetemplateloader_1 = require('./treenodetemplateloader');
var UITreeNode = (function () {
    function UITreeNode(tree) {
        this.tree = tree;
        this.hover = false;
        this.expanded = false;
    }
    UITreeNode.prototype.getIcon = function () {
        var icon;
        if (this.node.icon)
            icon = this.node.icon;
        else
            icon = this.expanded ? this.node.expandedIcon : this.node.collapsedIcon;
        return UITreeNode.ICON_CLASS + ' ' + icon;
    };
    UITreeNode.prototype.isLeaf = function () {
        return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
    };
    UITreeNode.prototype.toggle = function (event) {
        if (this.expanded)
            this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        else
            this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
        this.expanded = !this.expanded;
    };
    UITreeNode.prototype.onNodeClick = function (event) {
        this.tree.onNodeClick(event, this.node);
    };
    UITreeNode.prototype.isSelected = function () {
        return this.tree.isSelected(this.node);
    };
    UITreeNode.ICON_CLASS = 'ui-treenode-icon fa fa-fw';
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UITreeNode.prototype, "node", void 0);
    UITreeNode = __decorate([
        core_1.Component({
            selector: 'p-treeNode',
            template: "\n        <li class=\"ui-treenode\" *ngIf=\"node\">\n            <div class=\"ui-treenode-content\" [ngClass]=\"{'ui-treenode-selectable': tree.selectionMode}\" \n                (mouseenter)=\"hover=true\" (mouseleave)=\"hover=false\" (click)=\"onNodeClick($event)\">\n                <span class=\"ui-tree-toggler fa fa-fw\" [ngClass]=\"{'fa-caret-right':!expanded,'fa-caret-down':expanded}\" *ngIf=\"!isLeaf()\"\n                        (click)=\"toggle($event)\"></span\n                ><span class=\"ui-treenode-leaf-icon\" *ngIf=\"isLeaf()\"></span\n                ><span [class]=\"getIcon()\" *ngIf=\"node.icon||node.expandedIcon||node.collapsedIcon\"></span\n                ><span class=\"ui-treenode-label ui-corner-all\" \n                    [ngClass]=\"{'ui-state-hover':hover&&tree.selectionMode,'ui-state-highlight':isSelected()}\">\n                        <span *ngIf=\"!tree.template\">{{node.label}}</span>\n                        <p-treeNodeTemplateLoader [node]=\"node\" [template]=\"tree.template\" *ngIf=\"tree.template\"></p-treeNodeTemplateLoader>\n                    </span>\n            </div>\n            <ul class=\"ui-treenode-children\" style=\"display: none;\" *ngIf=\"node.children\" [style.display]=\"expanded ? 'block' : 'none'\">\n                <p-treeNode *ngFor=\"let childNode of node.children\" [node]=\"childNode\"></p-treeNode>\n            </ul>\n        </li>\n    ",
            directives: [UITreeNode, treenodetemplateloader_1.TreeNodeTemplateLoader]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return tree_1.Tree; }))), 
        __metadata('design:paramtypes', [tree_1.Tree])
    ], UITreeNode);
    return UITreeNode;
}());
exports.UITreeNode = UITreeNode;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdHJlZS91aXRyZWVub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUUsZUFBZSxDQUFDLENBQUE7QUFDekYscUJBQW1CLGNBQWMsQ0FBQyxDQUFBO0FBRWxDLHVDQUFxQywwQkFBMEIsQ0FBQyxDQUFBO0FBeUJoRTtJQVVJLG9CQUFvRCxJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUo3RCxVQUFLLEdBQVksS0FBSyxDQUFDO1FBRXZCLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFFc0MsQ0FBQztJQUVqRSw0QkFBTyxHQUFQO1FBQ0ksSUFBSSxJQUFJLENBQUM7UUFDVCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNkLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJO1lBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFNUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBRUQsMkJBQU0sR0FBTjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsMkJBQU0sR0FBTixVQUFPLEtBQUs7UUFDUixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDM0UsSUFBSTtZQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ2xDLENBQUM7SUFFRCxnQ0FBVyxHQUFYLFVBQVksS0FBSztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELCtCQUFVLEdBQVY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUF2Q00scUJBQVUsR0FBVywyQkFBMkIsQ0FBQztJQUV4RDtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUEzQlo7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLDA0Q0FrQlQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxVQUFVLEVBQUMsK0NBQXNCLENBQUM7U0FDbEQsQ0FBQzttQkFXZSxhQUFNLENBQUMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsV0FBSSxFQUFKLENBQUksQ0FBQyxDQUFDOztrQkFYN0M7SUEyQ0YsaUJBQUM7QUFBRCxDQTFDQSxBQTBDQyxJQUFBO0FBMUNZLGtCQUFVLGFBMEN0QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvdHJlZS91aXRyZWVub2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixJbmplY3QsZm9yd2FyZFJlZixIb3N0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi4vdHJlZS90cmVlJztcbmltcG9ydCB7VHJlZU5vZGV9IGZyb20gJy4uL2FwaS90cmVlbm9kZSc7XG5pbXBvcnQge1RyZWVOb2RlVGVtcGxhdGVMb2FkZXJ9IGZyb20gJy4vdHJlZW5vZGV0ZW1wbGF0ZWxvYWRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10cmVlTm9kZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGxpIGNsYXNzPVwidWktdHJlZW5vZGVcIiAqbmdJZj1cIm5vZGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlbm9kZS1jb250ZW50XCIgW25nQ2xhc3NdPVwieyd1aS10cmVlbm9kZS1zZWxlY3RhYmxlJzogdHJlZS5zZWxlY3Rpb25Nb2RlfVwiIFxuICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cImhvdmVyPXRydWVcIiAobW91c2VsZWF2ZSk9XCJob3Zlcj1mYWxzZVwiIChjbGljayk9XCJvbk5vZGVDbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS10cmVlLXRvZ2dsZXIgZmEgZmEtZndcIiBbbmdDbGFzc109XCJ7J2ZhLWNhcmV0LXJpZ2h0JzohZXhwYW5kZWQsJ2ZhLWNhcmV0LWRvd24nOmV4cGFuZGVkfVwiICpuZ0lmPVwiIWlzTGVhZigpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiPjwvc3BhblxuICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLXRyZWVub2RlLWxlYWYtaWNvblwiICpuZ0lmPVwiaXNMZWFmKClcIj48L3NwYW5cbiAgICAgICAgICAgICAgICA+PHNwYW4gW2NsYXNzXT1cImdldEljb24oKVwiICpuZ0lmPVwibm9kZS5pY29ufHxub2RlLmV4cGFuZGVkSWNvbnx8bm9kZS5jb2xsYXBzZWRJY29uXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgPjxzcGFuIGNsYXNzPVwidWktdHJlZW5vZGUtbGFiZWwgdWktY29ybmVyLWFsbFwiIFxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWhvdmVyJzpob3ZlciYmdHJlZS5zZWxlY3Rpb25Nb2RlLCd1aS1zdGF0ZS1oaWdobGlnaHQnOmlzU2VsZWN0ZWQoKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRyZWUudGVtcGxhdGVcIj57e25vZGUubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlVGVtcGxhdGVMb2FkZXIgW25vZGVdPVwibm9kZVwiIFt0ZW1wbGF0ZV09XCJ0cmVlLnRlbXBsYXRlXCIgKm5nSWY9XCJ0cmVlLnRlbXBsYXRlXCI+PC9wLXRyZWVOb2RlVGVtcGxhdGVMb2FkZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktdHJlZW5vZGUtY2hpbGRyZW5cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgKm5nSWY9XCJub2RlLmNoaWxkcmVuXCIgW3N0eWxlLmRpc3BsYXldPVwiZXhwYW5kZWQgPyAnYmxvY2snIDogJ25vbmUnXCI+XG4gICAgICAgICAgICAgICAgPHAtdHJlZU5vZGUgKm5nRm9yPVwibGV0IGNoaWxkTm9kZSBvZiBub2RlLmNoaWxkcmVuXCIgW25vZGVdPVwiY2hpbGROb2RlXCI+PC9wLXRyZWVOb2RlPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9saT5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtVSVRyZWVOb2RlLFRyZWVOb2RlVGVtcGxhdGVMb2FkZXJdXG59KVxuZXhwb3J0IGNsYXNzIFVJVHJlZU5vZGUge1xuXG4gICAgc3RhdGljIElDT05fQ0xBU1M6IHN0cmluZyA9ICd1aS10cmVlbm9kZS1pY29uIGZhIGZhLWZ3JztcblxuICAgIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xuICAgICAgICBcbiAgICBob3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBcbiAgICBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBUcmVlKSkgcHJpdmF0ZSB0cmVlOlRyZWUpIHt9XG4gICAgICAgIFxuICAgIGdldEljb24oKSB7XG4gICAgICAgIGxldCBpY29uO1xuICAgICAgICBpZih0aGlzLm5vZGUuaWNvbilcbiAgICAgICAgICAgIGljb24gPSB0aGlzLm5vZGUuaWNvbjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWNvbiA9IHRoaXMuZXhwYW5kZWQgPyB0aGlzLm5vZGUuZXhwYW5kZWRJY29uIDogdGhpcy5ub2RlLmNvbGxhcHNlZEljb247XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gVUlUcmVlTm9kZS5JQ09OX0NMQVNTICsgJyAnICsgaWNvbjtcbiAgICB9XG4gICAgXG4gICAgaXNMZWFmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmxlYWYgPT0gZmFsc2UgPyBmYWxzZSA6ICEodGhpcy5ub2RlLmNoaWxkcmVuJiZ0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICB9XG4gICAgXG4gICAgdG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuZXhwYW5kZWQpXG4gICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlQ29sbGFwc2UuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IHRoaXMubm9kZX0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlRXhwYW5kLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiB0aGlzLm5vZGV9KTtcblxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWRcbiAgICB9XG4gICAgXG4gICAgb25Ob2RlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy50cmVlLm9uTm9kZUNsaWNrKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgICBcbiAgICBpc1NlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlLmlzU2VsZWN0ZWQodGhpcy5ub2RlKTtcbiAgICB9XG59Il19
