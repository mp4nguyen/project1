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
var domhandler_1 = require('../dom/domhandler');
var common_1 = require('angular2/common');
var LISTBOX_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Listbox; }),
    multi: true
});
var Listbox = (function () {
    function Listbox(el, domHandler, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.onChange = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.differ = differs.find([]).create(null);
    }
    Listbox.prototype.writeValue = function (value) {
        this.value = value;
        if (!this.multiple) {
            this.valueChanged = true;
        }
    };
    Listbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Listbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Listbox.prototype.ngDoCheck = function () {
        if (this.multiple) {
            var changes = this.differ.diff(this.value);
            if (changes) {
                this.valueChanged = true;
            }
        }
    };
    Listbox.prototype.ngAfterViewChecked = function () {
        if (this.valueChanged) {
            this.preselect();
            this.valueChanged = false;
        }
    };
    Listbox.prototype.preselect = function () {
        var items = this.domHandler.find(this.el.nativeElement, 'li.ui-listbox-item');
        if (items && items.length) {
            this.unselectAll(items);
            if (this.value) {
                if (this.multiple) {
                    for (var i = 0; i < this.value.length; i++) {
                        for (var j = 0; i < this.options.length; j++) {
                            if (this.options[j].value == this.value[i]) {
                                this.domHandler.addClass(items[j], 'ui-state-highlight');
                                break;
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.options.length; i++) {
                        if (this.options[i].value == this.value) {
                            this.domHandler.addClass(items[i], 'ui-state-highlight');
                            break;
                        }
                    }
                }
            }
        }
    };
    Listbox.prototype.unselectAll = function (items) {
        var listItems = items || this.domHandler.find(this.el.nativeElement, 'li.ui-listbox-item');
        for (var i = 0; i < listItems.length; i++) {
            this.domHandler.removeClass(listItems[i], 'ui-state-highlight');
        }
    };
    Listbox.prototype.onMouseover = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    };
    Listbox.prototype.onMouseout = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    };
    Listbox.prototype.onClick = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.onItemClick(event, item);
        }
    };
    Listbox.prototype.onItemClick = function (event, item) {
        var metaKey = (event.metaKey || event.ctrlKey);
        if (this.domHandler.hasClass(item, 'ui-state-highlight')) {
            if (metaKey)
                this.domHandler.removeClass(item, 'ui-state-highlight');
            else
                this.unselectSiblings(item);
        }
        else {
            if (!metaKey || !this.multiple) {
                this.unselectSiblings(item);
            }
            this.domHandler.removeClass(item, 'ui-state-hover');
            this.domHandler.addClass(item, 'ui-state-highlight');
        }
        if (this.multiple) {
            var selectedItems = this.domHandler.find(item.parentNode, 'li.ui-state-highlight');
            var valueArr = [];
            if (selectedItems && selectedItems.length) {
                for (var i = 0; i < selectedItems.length; i++) {
                    var itemIndex = this.domHandler.index(selectedItems[i]);
                    valueArr.push(this.options[itemIndex].value);
                }
            }
            this.value = valueArr;
        }
        else {
            var selectedItem = this.domHandler.findSingle(item.parentNode, 'li.ui-state-highlight');
            if (selectedItem) {
                var selectedIndex = this.domHandler.index(selectedItem);
                this.value = this.options[selectedIndex].value;
            }
            else {
                this.value = null;
            }
        }
        this.onModelChange(this.value);
        this.onChange.emit(event);
    };
    Listbox.prototype.unselectSiblings = function (item) {
        var siblings = this.domHandler.siblings(item);
        for (var i = 0; i < siblings.length; i++) {
            var sibling = siblings[i];
            if (this.domHandler.hasClass(sibling, 'ui-state-highlight')) {
                this.domHandler.removeClass(sibling, 'ui-state-highlight');
            }
        }
    };
    Listbox.prototype.findListItem = function (element) {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Listbox.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Listbox.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Listbox.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Listbox.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Listbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Listbox.prototype, "onChange", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Listbox.prototype, "itemTemplate", void 0);
    Listbox = __decorate([
        core_1.Component({
            selector: 'p-listbox',
            template: "\n        <div [ngClass]=\"{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-listbox-list\" *ngIf=\"!itemTemplate\" (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                <li *ngFor=\"let option of options\" class=\"ui-listbox-item ui-corner-all\">\n                    {{option.label}}\n                </li>\n            </ul>\n            <ul class=\"ui-listbox-list\" *ngIf=\"itemTemplate\" (mouseover)=\"onMouseover($event)\" (mouseout)=\"onMouseout($event)\" (click)=\"onClick($event)\">\n                <template ngFor [ngForOf]=\"options\" [ngForTemplate]=\"itemTemplate\"></template>\n            </ul>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler, LISTBOX_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers])
    ], Listbox);
    return Listbox;
}());
exports.Listbox = Listbox;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvbGlzdGJveC9saXN0Ym94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBMkksZUFBZSxDQUFDLENBQUE7QUFFM0osMkJBQXlCLG1CQUFtQixDQUFDLENBQUE7QUFDN0MsdUJBQXNELGlCQUFpQixDQUFDLENBQUE7QUFFeEUsSUFBTSxzQkFBc0IsR0FBYSxJQUFJLGVBQVEsQ0FBQywwQkFBaUIsRUFBRTtJQUNyRSxXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxFQUFQLENBQU8sQ0FBQztJQUN0QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUMsQ0FBQztBQWtCSDtJQTBCSSxpQkFBb0IsRUFBYyxFQUFVLFVBQXNCLEVBQUUsT0FBd0I7UUFBeEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFkeEQsYUFBUSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQU0zRCxrQkFBYSxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFPaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsNEJBQVUsR0FBVixVQUFXLEtBQVU7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQUVELGtDQUFnQixHQUFoQixVQUFpQixFQUFZO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxtQ0FBaUIsR0FBakIs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LFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7MENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7K0NBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLGFBQU0sRUFBRTs7NkNBQUE7SUFFVDtRQUFDLG1CQUFZLENBQUMsa0JBQVcsQ0FBQzs7aURBQUE7SUE5QjlCO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSx5ekJBV1Q7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxFQUFDLHNCQUFzQixDQUFDO1NBQ2pELENBQUM7O2VBQUE7SUEwTUYsY0FBQztBQUFELENBek1BLEFBeU1DLElBQUE7QUF6TVksZUFBTyxVQXlNbkIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2xpc3Rib3gvbGlzdGJveC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3Q2hlY2tlZCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZCxUZW1wbGF0ZVJlZixJdGVyYWJsZURpZmZlcnMsZm9yd2FyZFJlZixQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1NlbGVjdEl0ZW19IGZyb20gJy4uL2FwaS9zZWxlY3RpdGVtJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAnLi4vZG9tL2RvbWhhbmRsZXInO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG5cbmNvbnN0IExJU1RCT1hfVkFMVUVfQUNDRVNTT1I6IFByb3ZpZGVyID0gbmV3IFByb3ZpZGVyKE5HX1ZBTFVFX0FDQ0VTU09SLCB7XG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTGlzdGJveCksXG4gICAgbXVsdGk6IHRydWVcbn0pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbGlzdGJveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLWxpc3Rib3ggdWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktbGlzdGJveC1saXN0XCIgKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCIgKG1vdXNlb3Zlcik9XCJvbk1vdXNlb3ZlcigkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uTW91c2VvdXQoJGV2ZW50KVwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zXCIgY2xhc3M9XCJ1aS1saXN0Ym94LWl0ZW0gdWktY29ybmVyLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJ1aS1saXN0Ym94LWxpc3RcIiAqbmdJZj1cIml0ZW1UZW1wbGF0ZVwiIChtb3VzZW92ZXIpPVwib25Nb3VzZW92ZXIoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvbk1vdXNlb3V0KCRldmVudClcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cIm9wdGlvbnNcIiBbbmdGb3JUZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIj48L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyLExJU1RCT1hfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIExpc3Rib3ggaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IFNlbGVjdEl0ZW1bXTtcblxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgXG4gICAgdmFsdWU6IGFueTtcbiAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIGRpZmZlcjogYW55O1xuICAgIFxuICAgIHZhbHVlQ2hhbmdlZDogYm9vbGVhbjtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyLCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgICAgICAgdGhpcy5kaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG4gICAgXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZih0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBsZXQgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYodGhpcy52YWx1ZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJlc2VsZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByZXNlbGVjdCgpIHtcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5kb21IYW5kbGVyLmZpbmQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbGkudWktbGlzdGJveC1pdGVtJyk7XG4gICAgICAgIGlmKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy51bnNlbGVjdEFsbChpdGVtcyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5vcHRpb25zW2pdLnZhbHVlID09IHRoaXMudmFsdWVbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLmFkZENsYXNzKGl0ZW1zW2pdLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5vcHRpb25zW2ldLnZhbHVlID09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWRkQ2xhc3MoaXRlbXNbaV0sICd1aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1bnNlbGVjdEFsbChpdGVtczogTm9kZUxpc3RbXSkge1xuICAgICAgICBsZXQgbGlzdEl0ZW1zID0gaXRlbXN8fHRoaXMuZG9tSGFuZGxlci5maW5kKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2xpLnVpLWxpc3Rib3gtaXRlbScpO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlzdEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MobGlzdEl0ZW1zW2ldLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25Nb3VzZW92ZXIoZXZlbnQpwqB7XG4gICAgICAgIGlmKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgIT0gJ1VMJykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5hZGRDbGFzcyhpdGVtLCAndWktc3RhdGUtaG92ZXInKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbk1vdXNlb3V0KGV2ZW50KcKge1xuICAgICAgICBpZih0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZihlbGVtZW50Lm5vZGVOYW1lICE9ICdVTCcpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0oZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhvdmVyJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBpZih0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZihlbGVtZW50Lm5vZGVOYW1lICE9ICdVTCcpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0oZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKGV2ZW50LGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtKSB7XG4gICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXl8fGV2ZW50LmN0cmxLZXkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZih0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpKSB7XG4gICAgICAgICAgICBpZihtZXRhS2V5KVxuICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5yZW1vdmVDbGFzcyhpdGVtLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy51bnNlbGVjdFNpYmxpbmdzKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoIW1ldGFLZXl8fCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNlbGVjdFNpYmxpbmdzKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhvdmVyJyk7XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWRkQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3VwZGF0ZSB2YWx1ZVxuICAgICAgICBpZih0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuZG9tSGFuZGxlci5maW5kKGl0ZW0ucGFyZW50Tm9kZSwgJ2xpLnVpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgbGV0IHZhbHVlQXJyID0gW107XG4gICAgICAgICAgICBpZihzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JbmRleCA9IHRoaXMuZG9tSGFuZGxlci5pbmRleChzZWxlY3RlZEl0ZW1zW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVBcnIucHVzaCh0aGlzLm9wdGlvbnNbaXRlbUluZGV4XS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlQXJyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKGl0ZW0ucGFyZW50Tm9kZSwgJ2xpLnVpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSW5kZXggPSB0aGlzLmRvbUhhbmRsZXIuaW5kZXgoc2VsZWN0ZWRJdGVtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgdW5zZWxlY3RTaWJsaW5ncyhpdGVtKSB7XG4gICAgICAgIGxldCBzaWJsaW5ncyA9IHRoaXMuZG9tSGFuZGxlci5zaWJsaW5ncyhpdGVtKTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNpYmxpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2libGluZyA9IHNpYmxpbmdzW2ldO1xuICAgICAgICAgICAgaWYodGhpcy5kb21IYW5kbGVyLmhhc0NsYXNzKHNpYmxpbmcsICd1aS1zdGF0ZS1oaWdobGlnaHQnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5yZW1vdmVDbGFzcyhzaWJsaW5nLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZmluZExpc3RJdGVtKGVsZW1lbnQpIHtcbiAgICAgICAgaWYoZWxlbWVudC5ub2RlTmFtZSA9PSAnTEknKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB3aGlsZShwYXJlbnQubm9kZU5hbWUgIT0gJ0xJJykge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==
