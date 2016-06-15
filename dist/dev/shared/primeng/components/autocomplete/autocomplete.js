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
var inputtext_1 = require('../inputtext/inputtext');
var button_1 = require('../button/button');
var domhandler_1 = require('../dom/domhandler');
var common_1 = require('angular2/common');
var AUTOCOMPLETE_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return AutoComplete; }),
    multi: true
});
var AutoComplete = (function () {
    function AutoComplete(el, domHandler, differs, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.minLength = 3;
        this.delay = 300;
        this.completeMethod = new core_1.EventEmitter();
        this.onSelect = new core_1.EventEmitter();
        this.onUnselect = new core_1.EventEmitter();
        this.onDropdownClick = new core_1.EventEmitter();
        this.scrollHeight = '200px';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.panelVisible = false;
        this.differ = differs.find([]).create(null);
    }
    AutoComplete.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.suggestions);
        if (changes && this.panel) {
            if (this.suggestions && this.suggestions.length) {
                this.show();
                this.suggestionsUpdated = true;
            }
            else {
                this.hide();
            }
        }
    };
    AutoComplete.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.input = this.domHandler.findSingle(this.el.nativeElement, 'input');
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-autocomplete-panel');
        if (this.multiple) {
            this.multipleContainer = this.domHandler.findSingle(this.el.nativeElement, 'ul.ui-autocomplete-multiple');
        }
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            _this.hide();
        });
    };
    AutoComplete.prototype.ngAfterViewChecked = function () {
        if (this.suggestionsUpdated) {
            this.align();
            this.suggestionsUpdated = false;
        }
    };
    AutoComplete.prototype.writeValue = function (value) {
        this.value = value;
    };
    AutoComplete.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    AutoComplete.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    AutoComplete.prototype.onInput = function (event) {
        var _this = this;
        var value = event.target.value;
        if (!this.multiple) {
            this.value = value;
            this.onModelChange(value);
        }
        if (value.length === 0) {
            this.hide();
        }
        if (value.length >= this.minLength) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function () {
                _this.search(event, value);
            }, this.delay);
        }
        else {
            this.suggestions = null;
        }
    };
    AutoComplete.prototype.search = function (event, query) {
        if (query === undefined || query === null) {
            return;
        }
        this.completeMethod.emit({
            originalEvent: event,
            query: query
        });
    };
    AutoComplete.prototype.onItemMouseover = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-highlight');
        }
    };
    AutoComplete.prototype.onItemMouseout = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-highlight');
        }
    };
    AutoComplete.prototype.onItemClick = function (event) {
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.selectItem(item);
        }
    };
    AutoComplete.prototype.selectItem = function (item) {
        var itemIndex = this.domHandler.index(item);
        var selectedValue = this.suggestions[itemIndex];
        if (this.multiple) {
            this.input.value = '';
            this.value = this.value || [];
            if (!this.isSelected(selectedValue)) {
                this.value.push(selectedValue);
                this.onModelChange(this.value);
            }
        }
        else {
            this.input.value = this.field ? this.resolveFieldData(selectedValue) : selectedValue;
            this.value = selectedValue;
            this.onModelChange(this.value);
        }
        this.onSelect.emit(selectedValue);
        this.input.focus();
    };
    AutoComplete.prototype.findListItem = function (element) {
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
    AutoComplete.prototype.show = function () {
        if (!this.panelVisible) {
            this.panelVisible = true;
            this.panel.style.zIndex = ++domhandler_1.DomHandler.zindex;
            this.domHandler.fadeIn(this.panel, 200);
        }
    };
    AutoComplete.prototype.align = function () {
        if (this.multiple)
            this.domHandler.relativePosition(this.panel, this.multipleContainer);
        else
            this.domHandler.relativePosition(this.panel, this.input);
    };
    AutoComplete.prototype.hide = function () {
        this.panelVisible = false;
    };
    AutoComplete.prototype.handleDropdownClick = function (event) {
        this.onDropdownClick.emit({
            originalEvent: event,
            query: this.input.value
        });
    };
    AutoComplete.prototype.removeItem = function (item) {
        var itemIndex = this.domHandler.index(item);
        var removedValue = this.value.splice(itemIndex, 1)[0];
        this.onUnselect.emit(removedValue);
        this.onModelChange(this.value);
    };
    AutoComplete.prototype.resolveFieldData = function (data) {
        if (data && this.field) {
            if (this.field.indexOf('.') == -1) {
                return data[this.field];
            }
            else {
                var fields = this.field.split('.');
                var value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    };
    AutoComplete.prototype.onKeydown = function (event) {
        if (this.panelVisible) {
            var highlightedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
            switch (event.which) {
                case 40:
                    if (highlightedItem) {
                        var nextItem = highlightedItem.nextElementSibling;
                        if (nextItem) {
                            this.domHandler.removeClass(highlightedItem, 'ui-state-highlight');
                            this.domHandler.addClass(nextItem, 'ui-state-highlight');
                            this.domHandler.scrollInView(this.panel, nextItem);
                        }
                    }
                    else {
                        var firstItem = this.domHandler.findSingle(this.panel, 'li:first-child');
                        this.domHandler.addClass(firstItem, 'ui-state-highlight');
                    }
                    event.preventDefault();
                    break;
                case 38:
                    if (highlightedItem) {
                        var prevItem = highlightedItem.previousElementSibling;
                        if (prevItem) {
                            this.domHandler.removeClass(highlightedItem, 'ui-state-highlight');
                            this.domHandler.addClass(prevItem, 'ui-state-highlight');
                            this.domHandler.scrollInView(this.panel, prevItem);
                        }
                    }
                    event.preventDefault();
                    break;
                case 13:
                    if (highlightedItem) {
                        this.selectItem(highlightedItem);
                        this.hide();
                    }
                    event.preventDefault();
                    break;
                case 27:
                    this.hide();
                    event.preventDefault();
                    break;
                case 9:
                    if (highlightedItem) {
                        this.selectItem(highlightedItem);
                    }
                    this.hide();
                    break;
            }
        }
        if (this.multiple) {
            switch (event.which) {
                case 8:
                    if (this.value && this.value.length && !this.input.value) {
                        var removedValue = this.value.pop();
                        this.onUnselect.emit(removedValue);
                        this.onModelChange(this.value);
                    }
                    break;
            }
        }
    };
    AutoComplete.prototype.isSelected = function (val) {
        var selected = false;
        if (this.value && this.value.length) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.domHandler.equals(this.value[i], val)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    };
    AutoComplete.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "minLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "delay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoComplete.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoComplete.prototype, "inputStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "inputStyleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutoComplete.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "maxlength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoComplete.prototype, "size", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AutoComplete.prototype, "suggestions", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoComplete.prototype, "completeMethod", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoComplete.prototype, "onSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoComplete.prototype, "onUnselect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoComplete.prototype, "onDropdownClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "field", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AutoComplete.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutoComplete.prototype, "dropdown", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutoComplete.prototype, "multiple", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], AutoComplete.prototype, "itemTemplate", void 0);
    AutoComplete = __decorate([
        core_1.Component({
            selector: 'p-autoComplete',
            template: "\n        <span [ngClass]=\"{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input *ngIf=\"!multiple\" #in pInputText type=\"text\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" \n            [value]=\"value ? (field ? resolveFieldData(value)||value : value) : null\" (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\" (blur)=\"onModelTouched()\"\n            [attr.placeholder]=\"placeholder\" [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.readonly]=\"readonly\" [disabled]=\"disabled\" \n            ><ul *ngIf=\"multiple\" class=\"ui-autocomplete-multiple ui-widget ui-inputtext ui-state-default ui-corner-all\" (click)=\"multiIn.focus()\">\n                <li #token *ngFor=\"let val of value\" class=\"ui-autocomplete-token ui-state-highlight ui-corner-all\">\n                    <span class=\"ui-autocomplete-token-icon fa fa-fw fa-close\" (click)=\"removeItem(token)\"></span>\n                    <span class=\"ui-autocomplete-token-label\">{{field ? val[field] : val}}</span>\n                </li>\n                <li class=\"ui-autocomplete-input-token\">\n                    <input #multiIn type=\"text\" pInputText (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\" (blur)=\"onModelTouched()\">\n                </li>\n            </ul\n            ><button type=\"button\" pButton icon=\"fa-fw fa-caret-down\" class=\"ui-autocomplete-dropdown\" [disabled]=\"disabled\"\n                (click)=\"handleDropdownClick($event)\" *ngIf=\"dropdown\"></button>\n            <div class=\"ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow\" [style.display]=\"panelVisible ? 'block' : 'none'\" [style.width]=\"'100%'\" [style.max-height]=\"scrollHeight\">\n                <ul class=\"ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" \n                    (mouseover)=\"onItemMouseover($event)\" (mouseout)=\"onItemMouseout($event)\" (click)=\"onItemClick($event)\" *ngIf=\"!itemTemplate\">\n                    <li class=\"ui-autocomplete-list-item ui-corner-all\" *ngFor=\"let item of suggestions\">{{field ? item[field] : item}}</li>\n                </ul>\n                <ul class=\"ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" \n                    (mouseover)=\"onItemMouseover($event)\" (mouseout)=\"onItemMouseout($event)\" (click)=\"onItemClick($event)\"*ngIf=\"itemTemplate\">\n                    <template ngFor [ngForOf]=\"suggestions\" [ngForTemplate]=\"itemTemplate\"></template>\n                </ul>\n            </div>\n        </span>\n    ",
            directives: [inputtext_1.InputText, button_1.Button],
            providers: [domhandler_1.DomHandler, AUTOCOMPLETE_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers, core_1.Renderer])
    ], AutoComplete);
    return AutoComplete;
}());
exports.AutoComplete = AutoComplete;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTBLLGVBQWUsQ0FBQyxDQUFBO0FBQzFMLDBCQUF3Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ2pELHVCQUFxQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3hDLDJCQUF5QixtQkFBbUIsQ0FBQyxDQUFBO0FBQzdDLHVCQUFzRCxpQkFBaUIsQ0FBQyxDQUFBO0FBRXhFLElBQU0sMkJBQTJCLEdBQWEsSUFBSSxlQUFRLENBQUMsMEJBQWlCLEVBQUU7SUFDMUUsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLFlBQVksRUFBWixDQUFZLENBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFtQ0g7SUFrRUksc0JBQW9CLEVBQWMsRUFBVSxVQUFzQixFQUFFLE9BQXdCLEVBQVUsUUFBa0I7UUFBcEcsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBb0MsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWhFL0csY0FBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixVQUFLLEdBQVcsR0FBRyxDQUFDO1FBc0JuQixtQkFBYyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUV2RCxhQUFRLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRWpELGVBQVUsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFbkQsb0JBQWUsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFJekQsaUJBQVksR0FBVyxPQUFPLENBQUM7UUFVeEMsa0JBQWEsR0FBYSxjQUFPLENBQUMsQ0FBQztRQUVuQyxtQkFBYyxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBWXBDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBTzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFD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WUFBSyxFQUFFOztxREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzttREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOzs4Q0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztxREFBQTtJQUVSO1FBQUMsYUFBTSxFQUFFOzt3REFBQTtJQUVUO1FBQUMsYUFBTSxFQUFFOztrREFBQTtJQUVUO1FBQUMsYUFBTSxFQUFFOztvREFBQTtJQUVUO1FBQUMsYUFBTSxFQUFFOzt5REFBQTtJQUVUO1FBQUMsWUFBSyxFQUFFOzsrQ0FBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztzREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQUVSO1FBQUMsWUFBSyxFQUFFOztrREFBQTtJQUVSO1FBQUMsbUJBQVksQ0FBQyxrQkFBVyxDQUFDOztzREFBQTtJQTNFOUI7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsd3BGQTJCVDtZQUNELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMsZUFBTSxDQUFDO1lBQzlCLFNBQVMsRUFBRSxDQUFDLHVCQUFVLEVBQUMsMkJBQTJCLENBQUM7U0FDdEQsQ0FBQzs7b0JBQUE7SUFrWEYsbUJBQUM7QUFBRCxDQWpYQSxBQWlYQyxJQUFBO0FBalhZLG9CQUFZLGVBaVh4QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3SW5pdCxBZnRlclZpZXdDaGVja2VkLERvQ2hlY2ssSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDb250ZW50Q2hpbGQsVGVtcGxhdGVSZWYsSXRlcmFibGVEaWZmZXJzLFJlbmRlcmVyLGZvcndhcmRSZWYsUHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtJbnB1dFRleHR9IGZyb20gJy4uL2lucHV0dGV4dC9pbnB1dHRleHQnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcblxuY29uc3QgQVVUT0NPTVBMRVRFX1ZBTFVFX0FDQ0VTU09SOiBQcm92aWRlciA9IG5ldyBQcm92aWRlcihOR19WQUxVRV9BQ0NFU1NPUiwge1xuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF1dG9Db21wbGV0ZSksXG4gICAgbXVsdGk6IHRydWVcbn0pO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYXV0b0NvbXBsZXRlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3VpLWF1dG9jb21wbGV0ZSB1aS13aWRnZXQnOnRydWUsJ3VpLWF1dG9jb21wbGV0ZS1kZCc6ZHJvcGRvd259XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwiIW11bHRpcGxlXCIgI2luIHBJbnB1dFRleHQgdHlwZT1cInRleHRcIiBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCIgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiIFxuICAgICAgICAgICAgW3ZhbHVlXT1cInZhbHVlID8gKGZpZWxkID8gcmVzb2x2ZUZpZWxkRGF0YSh2YWx1ZSl8fHZhbHVlIDogdmFsdWUpIDogbnVsbFwiIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiIChibHVyKT1cIm9uTW9kZWxUb3VjaGVkKClcIlxuICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBbYXR0ci5zaXplXT1cInNpemVcIiBbYXR0ci5tYXhsZW5ndGhdPVwibWF4bGVuZ3RoXCIgW2F0dHIucmVhZG9ubHldPVwicmVhZG9ubHlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBcbiAgICAgICAgICAgID48dWwgKm5nSWY9XCJtdWx0aXBsZVwiIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLW11bHRpcGxlIHVpLXdpZGdldCB1aS1pbnB1dHRleHQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgKGNsaWNrKT1cIm11bHRpSW4uZm9jdXMoKVwiPlxuICAgICAgICAgICAgICAgIDxsaSAjdG9rZW4gKm5nRm9yPVwibGV0IHZhbCBvZiB2YWx1ZVwiIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLXRva2VuIHVpLXN0YXRlLWhpZ2hsaWdodCB1aS1jb3JuZXItYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLXRva2VuLWljb24gZmEgZmEtZncgZmEtY2xvc2VcIiAoY2xpY2spPVwicmVtb3ZlSXRlbSh0b2tlbilcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLXRva2VuLWxhYmVsXCI+e3tmaWVsZCA/IHZhbFtmaWVsZF0gOiB2YWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1pbnB1dC10b2tlblwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgI211bHRpSW4gdHlwZT1cInRleHRcIiBwSW5wdXRUZXh0IChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiIChibHVyKT1cIm9uTW9kZWxUb3VjaGVkKClcIj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bFxuICAgICAgICAgICAgPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cImZhLWZ3IGZhLWNhcmV0LWRvd25cIiBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1kcm9wZG93blwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZURyb3Bkb3duQ2xpY2soJGV2ZW50KVwiICpuZ0lmPVwiZHJvcGRvd25cIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1hdXRvY29tcGxldGUtcGFuZWwgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3dcIiBbc3R5bGUuZGlzcGxheV09XCJwYW5lbFZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXCIgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiIFtzdHlsZS5tYXgtaGVpZ2h0XT1cInNjcm9sbEhlaWdodFwiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLWF1dG9jb21wbGV0ZS1pdGVtcyB1aS1hdXRvY29tcGxldGUtbGlzdCB1aS13aWRnZXQtY29udGVudCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItcmVzZXRcIiBcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlb3Zlcik9XCJvbkl0ZW1Nb3VzZW92ZXIoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvbkl0ZW1Nb3VzZW91dCgkZXZlbnQpXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudClcIiAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLWxpc3QtaXRlbSB1aS1jb3JuZXItYWxsXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3VnZ2VzdGlvbnNcIj57e2ZpZWxkID8gaXRlbVtmaWVsZF0gOiBpdGVtfX08L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktYXV0b2NvbXBsZXRlLWl0ZW1zIHVpLWF1dG9jb21wbGV0ZS1saXN0IHVpLXdpZGdldC1jb250ZW50IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLWhlbHBlci1yZXNldFwiIFxuICAgICAgICAgICAgICAgICAgICAobW91c2VvdmVyKT1cIm9uSXRlbU1vdXNlb3ZlcigkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uSXRlbU1vdXNlb3V0KCRldmVudClcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiKm5nSWY9XCJpdGVtVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cInN1Z2dlc3Rpb25zXCIgW25nRm9yVGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCI+PC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtJbnB1dFRleHQsQnV0dG9uXSxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyLEFVVE9DT01QTEVURV9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxEb0NoZWNrLEFmdGVyVmlld0NoZWNrZWQsQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIFxuICAgIEBJbnB1dCgpIG1pbkxlbmd0aDogbnVtYmVyID0gMztcbiAgICBcbiAgICBASW5wdXQoKSBkZWxheTogbnVtYmVyID0gMzAwO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGlucHV0U3R5bGU6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBudW1iZXI7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIG1heGxlbmd0aDogbnVtYmVyO1xuICAgIFxuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcbiAgICBcbiAgICBASW5wdXQoKSBzdWdnZXN0aW9uczogYW55W107XG4gICAgXG4gICAgQE91dHB1dCgpIGNvbXBsZXRlTWV0aG9kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblVuc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25Ecm9wZG93bkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHNjcm9sbEhlaWdodDogc3RyaW5nID0gJzIwMHB4JztcbiAgICBcbiAgICBASW5wdXQoKSBkcm9wZG93bjogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcbiAgICBcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgXG4gICAgdmFsdWU6IGFueTtcbiAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIHRpbWVvdXQ6IG51bWJlcjtcbiAgICBcbiAgICBkaWZmZXI6IGFueTtcbiAgICBcbiAgICBwYW5lbDogYW55O1xuICAgIFxuICAgIGlucHV0OiBhbnk7XG4gICAgXG4gICAgbXVsdGlwbGVDb250YWluZXI6IGFueTtcbiAgICBcbiAgICBwYW5lbFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcbiAgICBcbiAgICBzdWdnZXN0aW9uc1VwZGF0ZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBkb21IYW5kbGVyOiBEb21IYW5kbGVyLCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMuZGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIFxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgbGV0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMuc3VnZ2VzdGlvbnMpO1xuXG4gICAgICAgIGlmKGNoYW5nZXMgJiYgdGhpcy5wYW5lbCkge1xuICAgICAgICAgICAgaWYodGhpcy5zdWdnZXN0aW9ucyAmJiB0aGlzLnN1Z2dlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lucHV0Jyk7XG4gICAgICAgIHRoaXMucGFuZWwgPSB0aGlzLmRvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkaXYudWktYXV0b2NvbXBsZXRlLXBhbmVsJyk7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlQ29udGFpbmVyID0gdGhpcy5kb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWwudWktYXV0b2NvbXBsZXRlLW11bHRpcGxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW5HbG9iYWwoJ2JvZHknLCAnY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYodGhpcy5zdWdnZXN0aW9uc1VwZGF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNVcGRhdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIG9uSW5wdXQoZXZlbnQpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZighdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih2YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgICAgICAgIC8vQ2FuY2VsIHRoZSBzZWFyY2ggcmVxdWVzdCBpZiB1c2VyIHR5cGVzIHdpdGhpbiB0aGUgdGltZW91dFxuICAgICAgICAgICAgaWYodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoKGV2ZW50LCB2YWx1ZSk7XG4gICAgICAgICAgICB9LCB0aGlzLmRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHNlYXJjaChldmVudDogYW55LCBxdWVyeTogc3RyaW5nKSB7XG4gICAgICAgIC8vYWxsb3cgZW1wdHkgc3RyaW5nIGJ1dCBub3QgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgICBpZihxdWVyeSA9PT0gdW5kZWZpbmVkIHx8IHF1ZXJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgICAgXG4gICAgICAgdGhpcy5jb21wbGV0ZU1ldGhvZC5lbWl0KHtcbiAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgIHF1ZXJ5OiBxdWVyeVxuICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBvbkl0ZW1Nb3VzZW92ZXIoZXZlbnQpwqB7XG4gICAgICAgIGlmKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgIT0gJ1VMJykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5hZGRDbGFzcyhpdGVtLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25JdGVtTW91c2VvdXQoZXZlbnQpwqB7XG4gICAgICAgIGlmKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgIT0gJ1VMJykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5yZW1vdmVDbGFzcyhpdGVtLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25JdGVtQ2xpY2soZXZlbnQpIHsgICAgICAgIFxuICAgICAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYoZWxlbWVudC5ub2RlTmFtZSAhPSAnVUwnKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHNlbGVjdEl0ZW0oaXRlbTogYW55KSB7XG4gICAgICAgIGxldCBpdGVtSW5kZXggPSB0aGlzLmRvbUhhbmRsZXIuaW5kZXgoaXRlbSk7XG4gICAgICAgIGxldCBzZWxlY3RlZFZhbHVlID0gdGhpcy5zdWdnZXN0aW9uc1tpdGVtSW5kZXhdO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWV8fFtdO1xuICAgICAgICAgICAgaWYoIXRoaXMuaXNTZWxlY3RlZChzZWxlY3RlZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUucHVzaChzZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gdGhpcy5maWVsZCA/IHRoaXMucmVzb2x2ZUZpZWxkRGF0YShzZWxlY3RlZFZhbHVlKTogc2VsZWN0ZWRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgfVxuICAgIFxuICAgIGZpbmRMaXN0SXRlbShlbGVtZW50KSB7XG4gICAgICAgIGlmKGVsZW1lbnQubm9kZU5hbWUgPT0gJ0xJJykge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUocGFyZW50Lm5vZGVOYW1lICE9ICdMSScpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYoIXRoaXMucGFuZWxWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLnpJbmRleCA9ICsrRG9tSGFuZGxlci56aW5kZXg7XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuZmFkZUluKHRoaXMucGFuZWwsIDIwMCk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBhbGlnbigpIHtcbiAgICAgICAgaWYodGhpcy5tdWx0aXBsZSlcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMucGFuZWwsIHRoaXMubXVsdGlwbGVDb250YWluZXIpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVsYXRpdmVQb3NpdGlvbih0aGlzLnBhbmVsLCB0aGlzLmlucHV0KTtcbiAgICB9XG4gICAgXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5wYW5lbFZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlRHJvcGRvd25DbGljayhldmVudCkge1xuICAgICAgICB0aGlzLm9uRHJvcGRvd25DbGljay5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgcXVlcnk6IHRoaXMuaW5wdXQudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUl0ZW0oaXRlbTogYW55KSB7XG4gICAgICAgIGxldCBpdGVtSW5kZXggPSB0aGlzLmRvbUhhbmRsZXIuaW5kZXgoaXRlbSk7XG4gICAgICAgIGxldCByZW1vdmVkVmFsdWUgPSB0aGlzLnZhbHVlLnNwbGljZShpdGVtSW5kZXgsIDEpWzBdO1xuICAgICAgICB0aGlzLm9uVW5zZWxlY3QuZW1pdChyZW1vdmVkVmFsdWUpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgfVxuICAgIFxuICAgIHJlc29sdmVGaWVsZERhdGEoZGF0YTogYW55KTogYW55IHtcbiAgICAgICAgaWYoZGF0YSAmJiB0aGlzLmZpZWxkKSB7XG4gICAgICAgICAgICBpZih0aGlzLmZpZWxkLmluZGV4T2YoJy4nKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW3RoaXMuZmllbGRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkczogc3RyaW5nW10gPSB0aGlzLmZpZWxkLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBmaWVsZHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtmaWVsZHNbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIG9uS2V5ZG93bihldmVudCkge1xuICAgICAgICBpZih0aGlzLnBhbmVsVmlzaWJsZSkge1xuICAgICAgICAgICAgbGV0IGhpZ2hsaWdodGVkSXRlbSA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMucGFuZWwsICdsaS51aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3dpdGNoKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAgICAgLy9kb3duXG4gICAgICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICAgICAgaWYoaGlnaGxpZ2h0ZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSBoaWdobGlnaHRlZEl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV4dEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoaGlnaGxpZ2h0ZWRJdGVtLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLmFkZENsYXNzKG5leHRJdGVtLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLnNjcm9sbEluVmlldyh0aGlzLnBhbmVsLCBuZXh0SXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlyc3RJdGVtID0gdGhpcy5kb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5wYW5lbCwgJ2xpOmZpcnN0LWNoaWxkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWRkQ2xhc3MoZmlyc3RJdGVtLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy91cFxuICAgICAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgICAgIGlmKGhpZ2hsaWdodGVkSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZJdGVtID0gaGlnaGxpZ2h0ZWRJdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwcmV2SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5yZW1vdmVDbGFzcyhoaWdobGlnaHRlZEl0ZW0sICd1aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWRkQ2xhc3MocHJldkl0ZW0sICd1aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuc2Nyb2xsSW5WaWV3KHRoaXMucGFuZWwsIHByZXZJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgaWYoaGlnaGxpZ2h0ZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oaGlnaGxpZ2h0ZWRJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9lc2NhcGVcbiAgICAgICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vdGFiXG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICBpZihoaWdobGlnaHRlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShoaWdobGlnaHRlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgICAgICAvL2JhY2tzcGFjZVxuICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCAmJiAhdGhpcy5pbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbW92ZWRWYWx1ZSA9IHRoaXMudmFsdWUucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVW5zZWxlY3QuZW1pdChyZW1vdmVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaXNTZWxlY3RlZCh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgaWYodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmRvbUhhbmRsZXIuZXF1YWxzKHRoaXMudmFsdWVbaV0sIHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59Il19
