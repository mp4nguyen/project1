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
var PickList = (function () {
    function PickList(el, domHandler) {
        this.el = el;
        this.domHandler = domHandler;
    }
    PickList.prototype.onMouseover = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    };
    PickList.prototype.onMouseout = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    };
    PickList.prototype.onClick = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.onItemClick(event, item);
        }
    };
    PickList.prototype.findListItem = function (element) {
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
    PickList.prototype.onItemClick = function (event, item) {
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
    PickList.prototype.moveUp = function (listElement, list) {
        var selectedElements = this.getSelectedListElements(listElement);
        for (var i = 0; i < selectedElements.length; i++) {
            var selectedElement = selectedElements[i];
            var selectedElementIndex = this.domHandler.index(selectedElement);
            if (selectedElementIndex != 0) {
                var movedItem = list[selectedElementIndex];
                var temp = list[selectedElementIndex - 1];
                list[selectedElementIndex - 1] = movedItem;
                list[selectedElementIndex] = temp;
                this.domHandler.scrollInView(listElement, this.getListElements(listElement)[selectedElementIndex - 1]);
            }
            else {
                break;
            }
        }
    };
    PickList.prototype.moveTop = function (listElement, list) {
        var selectedElements = this.getSelectedListElements(listElement);
        for (var i = 0; i < selectedElements.length; i++) {
            var selectedElement = selectedElements[i];
            var selectedElementIndex = this.domHandler.index(selectedElement);
            if (selectedElementIndex != 0) {
                var movedItem = list.splice(selectedElementIndex, 1)[0];
                list.unshift(movedItem);
                listElement.scrollTop = 0;
            }
            else {
                break;
            }
        }
    };
    PickList.prototype.moveDown = function (listElement, list) {
        var selectedElements = this.getSelectedListElements(listElement);
        for (var i = selectedElements.length - 1; i >= 0; i--) {
            var selectedElement = selectedElements[i];
            var selectedElementIndex = this.domHandler.index(selectedElement);
            if (selectedElementIndex != (list.length - 1)) {
                var movedItem = list[selectedElementIndex];
                var temp = list[selectedElementIndex + 1];
                list[selectedElementIndex + 1] = movedItem;
                list[selectedElementIndex] = temp;
                this.domHandler.scrollInView(listElement, this.getListElements(listElement)[selectedElementIndex + 1]);
            }
            else {
                break;
            }
        }
    };
    PickList.prototype.moveBottom = function (listElement, list) {
        var selectedElements = this.getSelectedListElements(listElement);
        for (var i = selectedElements.length - 1; i >= 0; i--) {
            var selectedElement = selectedElements[i];
            var selectedElementIndex = this.domHandler.index(selectedElement);
            if (selectedElementIndex != (list.length - 1)) {
                var movedItem = list.splice(selectedElementIndex, 1)[0];
                list.push(movedItem);
                listElement.scrollTop = listElement.scrollHeight;
            }
            else {
                break;
            }
        }
    };
    PickList.prototype.moveRight = function (sourceListElement) {
        var selectedElements = this.getSelectedListElements(sourceListElement);
        var i = selectedElements.length;
        while (i--) {
            this.target.push(this.source.splice(this.domHandler.index(selectedElements[i]), 1)[0]);
        }
    };
    PickList.prototype.moveAllRight = function () {
        for (var i = 0; i < this.source.length; i++) {
            this.target.push(this.source[i]);
        }
        this.source.splice(0, this.source.length);
    };
    PickList.prototype.moveLeft = function (targetListElement) {
        var selectedElements = this.getSelectedListElements(targetListElement);
        var i = selectedElements.length;
        while (i--) {
            this.source.push(this.target.splice(this.domHandler.index(selectedElements[i]), 1)[0]);
        }
    };
    PickList.prototype.moveAllLeft = function () {
        for (var i = 0; i < this.target.length; i++) {
            this.source.push(this.target[i]);
        }
        this.target.splice(0, this.target.length);
    };
    PickList.prototype.getListElements = function (listElement) {
        return listElement.children;
    };
    PickList.prototype.getSelectedListElements = function (listElement) {
        return this.domHandler.find(listElement, 'li.ui-state-highlight');
    };
    PickList.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PickList.prototype, "source", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PickList.prototype, "target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PickList.prototype, "sourceHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PickList.prototype, "targetHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PickList.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PickList.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PickList.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PickList.prototype, "sourceStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PickList.prototype, "targetStyle", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], PickList.prototype, "itemTemplate", void 0);
    PickList = __decorate([
        core_1.Component({
            selector: 'p-pickList',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'ui-picklist ui-widget ui-helper-clearfix': true, 'ui-picklist-responsive': responsive}\">\n            <div class=\"ui-picklist-source-controls ui-picklist-buttons\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp(sourcelist,source)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop(sourcelist,source)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown(sourcelist,source)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom(sourcelist,source)\"></button>\n                </div>\n            </div>\n            <div class=\"ui-picklist-listwrapper ui-picklist-source-wrapper\">\n                <div class=\"ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr\" *ngIf=\"sourceHeader\">{{sourceHeader}}</div>\n                <ul #sourcelist class=\"ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom\" [ngStyle]=\"sourceStyle\"\n                    (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                    <template ngFor [ngForOf]=\"source\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n            <div class=\"ui-picklist-buttons\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"fa-angle-right\" (click)=\"moveRight(sourcelist)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-right\" (click)=\"moveAllRight(sourcelist)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-left\" (click)=\"moveLeft(targetlist)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-left\" (click)=\"moveAllLeft(targetlist)\"></button>\n                </div>\n            </div>\n            <div class=\"ui-picklist-listwrapper ui-picklist-target-wrapper\">\n                <div class=\"ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr\" *ngIf=\"targetHeader\">{{targetHeader}}</div>\n                <ul #targetlist class=\"ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom\" [ngStyle]=\"targetStyle\"\n                    (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                    <template ngFor [ngForOf]=\"target\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n            <div class=\"ui-picklist-target-controls ui-picklist-buttons\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"fa-angle-up\" (click)=\"moveUp(targetlist,target)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-up\" (click)=\"moveTop(targetlist,target)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-down\" (click)=\"moveDown(targetlist,target)\"></button>\n                    <button type=\"button\" pButton icon=\"fa-angle-double-down\" (click)=\"moveBottom(targetlist,target)\"></button>\n                </div>\n            </div>\n        </div>\n    ",
            directives: [button_1.Button],
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
    ], PickList);
    return PickList;
}());
exports.PickList = PickList;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvcGlja2xpc3QvcGlja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyRixlQUFlLENBQUMsQ0FBQTtBQUMzRyx1QkFBcUIsa0JBQWtCLENBQUMsQ0FBQTtBQUN4QywyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQWlEN0M7SUFzQkksa0JBQW9CLEVBQWMsRUFBVSxVQUFzQjtRQUE5QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFdEUsOEJBQVcsR0FBWCxVQUFZLEtBQUs7UUFDYixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JELENBQUM7SUFDTCxDQUFDO0lBRUQsNkJBQVUsR0FBVixVQUFXLEtBQUs7UUFDWixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hELENBQUM7SUFDTCxDQUFDO0lBRUQsMEJBQU8sR0FBUCxVQUFRLEtBQUs7UUFDVCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNCLEVB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dXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LERvQ2hlY2ssSW5wdXQsT3V0cHV0LENvbnRlbnRDaGlsZCxUZW1wbGF0ZVJlZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJy4uL2RvbS9kb21oYW5kbGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXBpY2tMaXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCJ7J3VpLXBpY2tsaXN0IHVpLXdpZGdldCB1aS1oZWxwZXItY2xlYXJmaXgnOiB0cnVlLCAndWktcGlja2xpc3QtcmVzcG9uc2l2ZSc6IHJlc3BvbnNpdmV9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGlja2xpc3Qtc291cmNlLWNvbnRyb2xzIHVpLXBpY2tsaXN0LWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGlja2xpc3QtYnV0dG9ucy1jZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cImZhLWFuZ2xlLXVwXCIgKGNsaWNrKT1cIm1vdmVVcChzb3VyY2VsaXN0LHNvdXJjZSlcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwiZmEtYW5nbGUtZG91YmxlLXVwXCIgKGNsaWNrKT1cIm1vdmVUb3Aoc291cmNlbGlzdCxzb3VyY2UpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cImZhLWFuZ2xlLWRvd25cIiAoY2xpY2spPVwibW92ZURvd24oc291cmNlbGlzdCxzb3VyY2UpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cImZhLWFuZ2xlLWRvdWJsZS1kb3duXCIgKGNsaWNrKT1cIm1vdmVCb3R0b20oc291cmNlbGlzdCxzb3VyY2UpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1saXN0d3JhcHBlciB1aS1waWNrbGlzdC1zb3VyY2Utd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1jYXB0aW9uIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRsIHVpLWNvcm5lci10clwiICpuZ0lmPVwic291cmNlSGVhZGVyXCI+e3tzb3VyY2VIZWFkZXJ9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCAjc291cmNlbGlzdCBjbGFzcz1cInVpLXdpZGdldC1jb250ZW50IHVpLXBpY2tsaXN0LWxpc3QgdWktcGlja2xpc3Qtc291cmNlIHVpLWNvcm5lci1ib3R0b21cIiBbbmdTdHlsZV09XCJzb3VyY2VTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZW92ZXIpPVwib25Nb3VzZW92ZXIoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvbk1vdXNlb3V0KCRldmVudClcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJzb3VyY2VcIiBbbmdGb3JUZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIj48L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1idXR0b25zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBpY2tsaXN0LWJ1dHRvbnMtY2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJmYS1hbmdsZS1yaWdodFwiIChjbGljayk9XCJtb3ZlUmlnaHQoc291cmNlbGlzdClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwiZmEtYW5nbGUtZG91YmxlLXJpZ2h0XCIgKGNsaWNrKT1cIm1vdmVBbGxSaWdodChzb3VyY2VsaXN0KVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJmYS1hbmdsZS1sZWZ0XCIgKGNsaWNrKT1cIm1vdmVMZWZ0KHRhcmdldGxpc3QpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cImZhLWFuZ2xlLWRvdWJsZS1sZWZ0XCIgKGNsaWNrKT1cIm1vdmVBbGxMZWZ0KHRhcmdldGxpc3QpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1saXN0d3JhcHBlciB1aS1waWNrbGlzdC10YXJnZXQtd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1jYXB0aW9uIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRsIHVpLWNvcm5lci10clwiICpuZ0lmPVwidGFyZ2V0SGVhZGVyXCI+e3t0YXJnZXRIZWFkZXJ9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCAjdGFyZ2V0bGlzdCBjbGFzcz1cInVpLXdpZGdldC1jb250ZW50IHVpLXBpY2tsaXN0LWxpc3QgdWktcGlja2xpc3Qtc291cmNlIHVpLWNvcm5lci1ib3R0b21cIiBbbmdTdHlsZV09XCJ0YXJnZXRTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZW92ZXIpPVwib25Nb3VzZW92ZXIoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvbk1vdXNlb3V0KCRldmVudClcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJ0YXJnZXRcIiBbbmdGb3JUZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIj48L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC10YXJnZXQtY29udHJvbHMgdWktcGlja2xpc3QtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1idXR0b25zLWNlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwiZmEtYW5nbGUtdXBcIiAoY2xpY2spPVwibW92ZVVwKHRhcmdldGxpc3QsdGFyZ2V0KVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJmYS1hbmdsZS1kb3VibGUtdXBcIiAoY2xpY2spPVwibW92ZVRvcCh0YXJnZXRsaXN0LHRhcmdldClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwiZmEtYW5nbGUtZG93blwiIChjbGljayk9XCJtb3ZlRG93bih0YXJnZXRsaXN0LHRhcmdldClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwiZmEtYW5nbGUtZG91YmxlLWRvd25cIiAoY2xpY2spPVwibW92ZUJvdHRvbSh0YXJnZXRsaXN0LHRhcmdldClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtCdXR0b25dLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG59KVxuZXhwb3J0IGNsYXNzIFBpY2tMaXN0IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNvdXJjZTogYW55W107XG5cbiAgICBASW5wdXQoKSB0YXJnZXQ6IGFueVtdO1xuXG4gICAgQElucHV0KCkgc291cmNlSGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0YXJnZXRIZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHJlc3BvbnNpdmU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc291cmNlU3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHRhcmdldFN0eWxlOiBhbnk7XG5cbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIpIHt9XG5cbiAgICBvbk1vdXNlb3ZlcihldmVudCnCoHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgIT0gJ1VMJykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5hZGRDbGFzcyhpdGVtLCAndWktc3RhdGUtaG92ZXInKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VvdXQoZXZlbnQpwqB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZihlbGVtZW50Lm5vZGVOYW1lICE9ICdVTCcpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0oZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhvdmVyJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZihlbGVtZW50Lm5vZGVOYW1lICE9ICdVTCcpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0oZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRMaXN0SXRlbShlbGVtZW50KSB7XG4gICAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgPT0gJ0xJJykge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUocGFyZW50Lm5vZGVOYW1lICE9ICdMSScpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudCwgaXRlbSkge1xuICAgICAgICBsZXQgbWV0YUtleSA9IChldmVudC5tZXRhS2V5fHxldmVudC5jdHJsS2V5KTtcblxuICAgICAgICBpZih0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpKSB7XG4gICAgICAgICAgICBpZihtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLnJlbW92ZUNsYXNzKGl0ZW0sICd1aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKCFtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpYmxpbmdzID0gdGhpcy5kb21IYW5kbGVyLnNpYmxpbmdzKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaWJsaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2libGluZyA9IHNpYmxpbmdzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3Moc2libGluZywgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3Moc2libGluZywgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhvdmVyJyk7XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWRkQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVVwKGxpc3RFbGVtZW50LCBsaXN0KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5nZXRTZWxlY3RlZExpc3RFbGVtZW50cyhsaXN0RWxlbWVudCk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtZW50ID0gc2VsZWN0ZWRFbGVtZW50c1tpXTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRJbmRleDogbnVtYmVyID0gdGhpcy5kb21IYW5kbGVyLmluZGV4KHNlbGVjdGVkRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmKHNlbGVjdGVkRWxlbWVudEluZGV4ICE9IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEVsZW1lbnRJbmRleF07XG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBsaXN0W3NlbGVjdGVkRWxlbWVudEluZGV4LTFdO1xuICAgICAgICAgICAgICAgIGxpc3Rbc2VsZWN0ZWRFbGVtZW50SW5kZXgtMV0gPSBtb3ZlZEl0ZW07XG4gICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEVsZW1lbnRJbmRleF0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5zY3JvbGxJblZpZXcobGlzdEVsZW1lbnQsIHRoaXMuZ2V0TGlzdEVsZW1lbnRzKGxpc3RFbGVtZW50KVtzZWxlY3RlZEVsZW1lbnRJbmRleCAtIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVRvcChsaXN0RWxlbWVudCwgbGlzdCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtZW50cyA9IHRoaXMuZ2V0U2VsZWN0ZWRMaXN0RWxlbWVudHMobGlzdEVsZW1lbnQpO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRWxlbWVudCA9IHNlbGVjdGVkRWxlbWVudHNbaV07XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtZW50SW5kZXg6IG51bWJlciA9IHRoaXMuZG9tSGFuZGxlci5pbmRleChzZWxlY3RlZEVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZihzZWxlY3RlZEVsZW1lbnRJbmRleCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IGxpc3Quc3BsaWNlKHNlbGVjdGVkRWxlbWVudEluZGV4LDEpWzBdO1xuICAgICAgICAgICAgICAgIGxpc3QudW5zaGlmdChtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVEb3duKGxpc3RFbGVtZW50LCBsaXN0KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5nZXRTZWxlY3RlZExpc3RFbGVtZW50cyhsaXN0RWxlbWVudCk7XG4gICAgICAgIGZvcihsZXQgaSA9IHNlbGVjdGVkRWxlbWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnQgPSBzZWxlY3RlZEVsZW1lbnRzW2ldO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRWxlbWVudEluZGV4OiBudW1iZXIgPSB0aGlzLmRvbUhhbmRsZXIuaW5kZXgoc2VsZWN0ZWRFbGVtZW50KTtcblxuICAgICAgICAgICAgaWYoc2VsZWN0ZWRFbGVtZW50SW5kZXggIT0gKGxpc3QubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEVsZW1lbnRJbmRleF07XG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBsaXN0W3NlbGVjdGVkRWxlbWVudEluZGV4KzFdO1xuICAgICAgICAgICAgICAgIGxpc3Rbc2VsZWN0ZWRFbGVtZW50SW5kZXgrMV0gPSBtb3ZlZEl0ZW07XG4gICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEVsZW1lbnRJbmRleF0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5zY3JvbGxJblZpZXcobGlzdEVsZW1lbnQsIHRoaXMuZ2V0TGlzdEVsZW1lbnRzKGxpc3RFbGVtZW50KVtzZWxlY3RlZEVsZW1lbnRJbmRleCArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUJvdHRvbShsaXN0RWxlbWVudCwgbGlzdCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtZW50cyA9IHRoaXMuZ2V0U2VsZWN0ZWRMaXN0RWxlbWVudHMobGlzdEVsZW1lbnQpO1xuICAgICAgICBmb3IobGV0IGkgPSBzZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtZW50ID0gc2VsZWN0ZWRFbGVtZW50c1tpXTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRJbmRleDogbnVtYmVyID0gdGhpcy5kb21IYW5kbGVyLmluZGV4KHNlbGVjdGVkRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmKHNlbGVjdGVkRWxlbWVudEluZGV4ICE9IChsaXN0Lmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IGxpc3Quc3BsaWNlKHNlbGVjdGVkRWxlbWVudEluZGV4LDEpWzBdO1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaChtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IGxpc3RFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVJpZ2h0KHNvdXJjZUxpc3RFbGVtZW50KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZEVsZW1lbnRzID0gdGhpcy5nZXRTZWxlY3RlZExpc3RFbGVtZW50cyhzb3VyY2VMaXN0RWxlbWVudCk7XG4gICAgICAgIGxldCBpID0gc2VsZWN0ZWRFbGVtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlKGktLSkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQucHVzaCh0aGlzLnNvdXJjZS5zcGxpY2UodGhpcy5kb21IYW5kbGVyLmluZGV4KHNlbGVjdGVkRWxlbWVudHNbaV0pLDEpWzBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVBbGxSaWdodCgpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5wdXNoKHRoaXMuc291cmNlW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvdXJjZS5zcGxpY2UoMCwgdGhpcy5zb3VyY2UubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBtb3ZlTGVmdCh0YXJnZXRMaXN0RWxlbWVudCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtZW50cyA9IHRoaXMuZ2V0U2VsZWN0ZWRMaXN0RWxlbWVudHModGFyZ2V0TGlzdEVsZW1lbnQpO1xuICAgICAgICBsZXQgaSA9IHNlbGVjdGVkRWxlbWVudHMubGVuZ3RoO1xuICAgICAgICB3aGlsZShpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlLnB1c2godGhpcy50YXJnZXQuc3BsaWNlKHRoaXMuZG9tSGFuZGxlci5pbmRleChzZWxlY3RlZEVsZW1lbnRzW2ldKSwxKVswXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQWxsTGVmdCgpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudGFyZ2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5wdXNoKHRoaXMudGFyZ2V0W2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhcmdldC5zcGxpY2UoMCwgdGhpcy50YXJnZXQubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBnZXRMaXN0RWxlbWVudHMobGlzdEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RFbGVtZW50LmNoaWxkcmVuO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkTGlzdEVsZW1lbnRzKGxpc3RFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbUhhbmRsZXIuZmluZChsaXN0RWxlbWVudCwgJ2xpLnVpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgfVxufVxuIl19
