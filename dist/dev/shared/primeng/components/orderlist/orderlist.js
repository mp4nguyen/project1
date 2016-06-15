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
var button_1 = require('../button/button');
var domhandler_1 = require('../dom/domhandler');
var OrderList = (function () {
    function OrderList(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
        this.onReorder = new core_1.EventEmitter();
    }
    OrderList.prototype.onMouseover = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    };
    OrderList.prototype.onMouseout = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    };
    OrderList.prototype.onClick = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.onItemClick(event, item);
        }
    };
    OrderList.prototype.findListItem = function (element) {
        if (element.nodeName == 'LI') {
            return element;
        }
        else {
            var parent_1 = element.parentElement;
            while (parent_1.nodeName != 'LI') {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
    };
    OrderList.prototype.onItemClick = function (event, item) {
        var metaKey = (event.metaKey || event.ctrlKey);
        if (this.domHandler.hasClass(item, 'ui-state-highlight')) {
            if (metaKey) {
                this.domHandler.removeClass(item, 'ui-state-highlight');
            }
        }
        else {
            if (!metaKey) {
                var siblings = this.domHandler.siblings(item);
                for (var i = 0; i < siblings.length; i++) {
                    var sibling = siblings[i];
                    if (this.domHandler.hasClass(sibling, 'ui-state-highlight')) {
                        this.domHandler.removeClass(sibling, 'ui-state-highlight');
                    }
                }
            }
            this.domHandler.removeClass(item, 'ui-state-hover');
            this.domHandler.addClass(item, 'ui-state-highlight');
        }
    };
    OrderList.prototype.moveUp = function (event, listElement) {
        var selectedElements = this.getSelectedListElements(listElement);
        if (selectedElements.length) {
            for (var i = 0; i < selectedElements.length; i++) {
                var selectedElement = selectedElements[i];
                var selectedElementIndex = this.domHandler.index(selectedElement);
                if (selectedElementIndex != 0) {
                    var movedItem = this.value[selectedElementIndex];
                    var temp = this.value[selectedElementIndex - 1];
                    this.value[selectedElementIndex - 1] = movedItem;
                    this.value[selectedElementIndex] = temp;
                    this.domHandler.scrollInView(listElement, listElement.children[selectedElementIndex - 1]);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveTop = function (event, listElement) {
        var selectedElements = this.getSelectedListElements(listElement);
        if (selectedElements.length) {
            for (var i = 0; i < selectedElements.length; i++) {
                var selectedElement = selectedElements[i];
                var selectedElementIndex = this.domHandler.index(selectedElement);
                if (selectedElementIndex != 0) {
                    var movedItem = this.value.splice(selectedElementIndex, 1)[0];
                    this.value.unshift(movedItem);
                    listElement.scrollTop = 0;
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveDown = function (event, listElement) {
        var selectedElements = this.getSelectedListElements(listElement);
        if (selectedElements.length) {
            for (var i = selectedElements.length - 1; i >= 0; i--) {
                var selectedElement = selectedElements[i];
                var selectedElementIndex = this.domHandler.index(selectedElement);
                if (selectedElementIndex != (this.value.length - 1)) {
                    var movedItem = this.value[selectedElementIndex];
                    var temp = this.value[selectedElementIndex + 1];
                    this.value[selectedElementIndex + 1] = movedItem;
                    this.value[selectedElementIndex] = temp;
                    this.domHandler.scrollInView(listElement, listElement.children[selectedElementIndex + 1]);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.moveBottom = function (event, listElement) {
        var selectedElements = this.getSelectedListElements(listElement);
        if (selectedElements.length) {
            for (var i = selectedElements.length - 1; i >= 0; i--) {
                var selectedElement = selectedElements[i];
                var selectedElementIndex = this.domHandler.index(selectedElement);
                if (selectedElementIndex != (this.value.length - 1)) {
                    var movedItem = this.value.splice(selectedElementIndex, 1)[0];
                    this.value.push(movedItem);
                    listElement.scrollTop = listElement.scrollHeight;
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
        }
    };
    OrderList.prototype.getSelectedListElements = function (listElement) {
        return this.domHandler.find(listElement, 'li.ui-state-highlight');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], OrderList.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], OrderList.prototype, "header", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OrderList.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], OrderList.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OrderList.prototype, "listStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OrderList.prototype, "responsive", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], OrderList.prototype, "onReorder", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], OrderList.prototype, "itemTemplate", void 0);
    OrderList = __decorate([
        core_1.Component({
            selector: 'p-orderList',
            template: "\n        <div [ngClass]=\"{'ui-orderlist ui-grid ui-widget':true,'ui-grid-responsive':responsive}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-grid-row\">\n                <div class=\"ui-orderlist-controls ui-grid-col-2\">\n                    <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp($event,listelement)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop($event,listelement)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown($event,listelement)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom($event,listelement)\"></button>\n                </div>\n                <div class=\"ui-grid-col-10\">\n                    <div class=\"ui-orderlist-caption ui-widget-header ui-corner-top\" *ngIf=\"header\">{{header}}</div>\n                    <ul #listelement class=\"ui-widget-content ui-orderlist-list ui-corner-bottom\" [ngStyle]=\"listStyle\" \n                        (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                        <template ngFor [ngForOf]=\"value\" [ngForTemplate]=\"itemTemplate\"></template>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
            directives: [button_1.Button],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], OrderList);
    return OrderList;
}());
exports.OrderList = OrderList;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvb3JkZXJsaXN0L29yZGVybGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQThGLGVBQWUsQ0FBQyxDQUFBO0FBQzlHLHVCQUFxQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3hDLDJCQUF5QixtQkFBbUIsQ0FBQyxDQUFBO0FBMEI3QztJQWtCSSxtQkFBb0IsRUFBYyxFQUFVLFVBQXNCO1FBQTlDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSnhELGNBQVMsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFJUyxDQUFDO0lBRXRFLCtCQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2IsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMzQixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ1osSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMzQixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1QsSUFB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O0FBNUtZLGlCQUFTLFlBNEtyQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvb3JkZXJsaXN0L29yZGVybGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LEVsZW1lbnRSZWYsRG9DaGVjayxJbnB1dCxPdXRwdXQsQ29udGVudENoaWxkLFRlbXBsYXRlUmVmLEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJy4uL2RvbS9kb21oYW5kbGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW9yZGVyTGlzdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLW9yZGVybGlzdCB1aS1ncmlkIHVpLXdpZGdldCc6dHJ1ZSwndWktZ3JpZC1yZXNwb25zaXZlJzpyZXNwb25zaXZlfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1ncmlkLXJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1vcmRlcmxpc3QtY29udHJvbHMgdWktZ3JpZC1jb2wtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJmYS1hbmdsZS11cFwiIChjbGljayk9XCJtb3ZlVXAoJGV2ZW50LGxpc3RlbGVtZW50KVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJmYS1hbmdsZS1kb3VibGUtdXBcIiAoY2xpY2spPVwibW92ZVRvcCgkZXZlbnQsbGlzdGVsZW1lbnQpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cImZhLWFuZ2xlLWRvd25cIiAoY2xpY2spPVwibW92ZURvd24oJGV2ZW50LGxpc3RlbGVtZW50KVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJmYS1hbmdsZS1kb3VibGUtZG93blwiIChjbGljayk9XCJtb3ZlQm90dG9tKCRldmVudCxsaXN0ZWxlbWVudClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ3JpZC1jb2wtMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLW9yZGVybGlzdC1jYXB0aW9uIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRvcFwiICpuZ0lmPVwiaGVhZGVyXCI+e3toZWFkZXJ9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8dWwgI2xpc3RlbGVtZW50IGNsYXNzPVwidWktd2lkZ2V0LWNvbnRlbnQgdWktb3JkZXJsaXN0LWxpc3QgdWktY29ybmVyLWJvdHRvbVwiIFtuZ1N0eWxlXT1cImxpc3RTdHlsZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlb3Zlcik9XCJvbk1vdXNlb3ZlcigkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uTW91c2VvdXQoJGV2ZW50KVwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJ2YWx1ZVwiIFtuZ0ZvclRlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiPjwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbQnV0dG9uXSxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckxpc3Qge1xuXG4gICAgQElucHV0KCkgdmFsdWU6IGFueVtdO1xuICAgIFxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBsaXN0U3R5bGU6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSByZXNwb25zaXZlOiBib29sZWFuO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgICAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIpIHt9XG4gICAgICAgICAgICBcbiAgICBvbk1vdXNlb3ZlcihldmVudCnCoHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgIT0gJ1VMJykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5hZGRDbGFzcyhpdGVtLCAndWktc3RhdGUtaG92ZXInKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbk1vdXNlb3V0KGV2ZW50KcKge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYoZWxlbWVudC5ub2RlTmFtZSAhPSAnVUwnKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLnJlbW92ZUNsYXNzKGl0ZW0sICd1aS1zdGF0ZS1ob3ZlcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgIT0gJ1VMJykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMub25JdGVtQ2xpY2soZXZlbnQsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZpbmRMaXN0SXRlbShlbGVtZW50KSB7XG4gICAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgPT0gJ0xJJykge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUocGFyZW50Lm5vZGVOYW1lICE9ICdMSScpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25JdGVtQ2xpY2soZXZlbnQsIGl0ZW0pIHtcbiAgICAgICAgbGV0IG1ldGFLZXkgPSAoZXZlbnQubWV0YUtleXx8ZXZlbnQuY3RybEtleSk7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpKSB7XG4gICAgICAgICAgICBpZihtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLnJlbW92ZUNsYXNzKGl0ZW0sICd1aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKCFtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpYmxpbmdzID0gdGhpcy5kb21IYW5kbGVyLnNpYmxpbmdzKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaWJsaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2libGluZyA9IHNpYmxpbmdzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3Moc2libGluZywgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3Moc2libGluZywgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhvdmVyJyk7XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWRkQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVVwKGV2ZW50LGxpc3RFbGVtZW50KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5nZXRTZWxlY3RlZExpc3RFbGVtZW50cyhsaXN0RWxlbWVudCk7XG4gICAgICAgIGlmKHNlbGVjdGVkRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnQgPSBzZWxlY3RlZEVsZW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRJbmRleDogbnVtYmVyID0gdGhpcy5kb21IYW5kbGVyLmluZGV4KHNlbGVjdGVkRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxlY3RlZEVsZW1lbnRJbmRleCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSB0aGlzLnZhbHVlW3NlbGVjdGVkRWxlbWVudEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSB0aGlzLnZhbHVlW3NlbGVjdGVkRWxlbWVudEluZGV4LTFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlW3NlbGVjdGVkRWxlbWVudEluZGV4LTFdID0gbW92ZWRJdGVtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlW3NlbGVjdGVkRWxlbWVudEluZGV4XSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5zY3JvbGxJblZpZXcobGlzdEVsZW1lbnQsIGxpc3RFbGVtZW50LmNoaWxkcmVuW3NlbGVjdGVkRWxlbWVudEluZGV4IC0gMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm9uUmVvcmRlci5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBtb3ZlVG9wKGV2ZW50LGxpc3RFbGVtZW50KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5nZXRTZWxlY3RlZExpc3RFbGVtZW50cyhsaXN0RWxlbWVudCk7XG4gICAgICAgIGlmKHNlbGVjdGVkRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnQgPSBzZWxlY3RlZEVsZW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRJbmRleDogbnVtYmVyID0gdGhpcy5kb21IYW5kbGVyLmluZGV4KHNlbGVjdGVkRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZihzZWxlY3RlZEVsZW1lbnRJbmRleCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSB0aGlzLnZhbHVlLnNwbGljZShzZWxlY3RlZEVsZW1lbnRJbmRleCwxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZS51bnNoaWZ0KG1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMub25SZW9yZGVyLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG1vdmVEb3duKGV2ZW50LGxpc3RFbGVtZW50KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5nZXRTZWxlY3RlZExpc3RFbGVtZW50cyhsaXN0RWxlbWVudCk7XG4gICAgICAgIGlmKHNlbGVjdGVkRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSBzZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkRWxlbWVudCA9IHNlbGVjdGVkRWxlbWVudHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkRWxlbWVudEluZGV4OiBudW1iZXIgPSB0aGlzLmRvbUhhbmRsZXIuaW5kZXgoc2VsZWN0ZWRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGVjdGVkRWxlbWVudEluZGV4ICE9ICh0aGlzLnZhbHVlLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSB0aGlzLnZhbHVlW3NlbGVjdGVkRWxlbWVudEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSB0aGlzLnZhbHVlW3NlbGVjdGVkRWxlbWVudEluZGV4KzFdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlW3NlbGVjdGVkRWxlbWVudEluZGV4KzFdID0gbW92ZWRJdGVtO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlW3NlbGVjdGVkRWxlbWVudEluZGV4XSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5zY3JvbGxJblZpZXcobGlzdEVsZW1lbnQsIGxpc3RFbGVtZW50LmNoaWxkcmVuW3NlbGVjdGVkRWxlbWVudEluZGV4ICsgMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm9uUmVvcmRlci5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBtb3ZlQm90dG9tKGV2ZW50LGxpc3RFbGVtZW50KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5nZXRTZWxlY3RlZExpc3RFbGVtZW50cyhsaXN0RWxlbWVudCk7XG4gICAgICAgIGlmKHNlbGVjdGVkRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSBzZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkRWxlbWVudCA9IHNlbGVjdGVkRWxlbWVudHNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkRWxlbWVudEluZGV4OiBudW1iZXIgPSB0aGlzLmRvbUhhbmRsZXIuaW5kZXgoc2VsZWN0ZWRFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGVjdGVkRWxlbWVudEluZGV4ICE9ICh0aGlzLnZhbHVlLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW0gPSB0aGlzLnZhbHVlLnNwbGljZShzZWxlY3RlZEVsZW1lbnRJbmRleCwxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKG1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5vblJlb3JkZXIuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIGdldFNlbGVjdGVkTGlzdEVsZW1lbnRzKGxpc3RFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbUhhbmRsZXIuZmluZChsaXN0RWxlbWVudCwgJ2xpLnVpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgIH1cbn0iXX0=
