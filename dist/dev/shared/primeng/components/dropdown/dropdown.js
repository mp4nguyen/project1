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
var DROPDOWN_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
    useExisting: core_1.forwardRef(function () { return Dropdown; }),
    multi: true
});
var Dropdown = (function () {
    function Dropdown(el, domHandler, renderer, differs) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.onChange = new core_1.EventEmitter();
        this.scrollHeight = '200px';
        this.autoWidth = true;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.panelVisible = false;
        this.differ = differs.find([]).create(null);
    }
    Dropdown.prototype.ngOnInit = function () {
        var _this = this;
        this.optionsToDisplay = this.options;
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            if (!_this.selfClick && !_this.itemClick) {
                _this.panelVisible = false;
            }
            _this.selfClick = false;
            _this.itemClick = false;
        });
        this.updateLabel();
    };
    Dropdown.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.options);
        if (changes && this.initialized) {
            this.optionsToDisplay = this.options;
            this.optionsChanged = true;
        }
    };
    Dropdown.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        this.panel = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-dropdown-panel');
        this.itemsWrapper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-dropdown-items-wrapper');
        this.highlightValue(true);
        this.updateDimensions();
        this.initialized = true;
    };
    Dropdown.prototype.ngAfterViewChecked = function () {
        if (this.optionsChanged) {
            this.highlightValue();
            this.domHandler.relativePosition(this.panel, this.container);
            this.optionsChanged = false;
        }
    };
    Dropdown.prototype.writeValue = function (value) {
        this.value = value;
        this.updateLabel();
        if (this.initialized && !this.optionsChanged) {
            this.highlightValue();
        }
    };
    Dropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Dropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Dropdown.prototype.updateLabel = function () {
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            var selectedIndex = this.findItemIndex(this.value, this.optionsToDisplay);
            if (selectedIndex == -1)
                this.label = this.optionsToDisplay[0].label;
            else
                this.label = this.optionsToDisplay[selectedIndex].label;
        }
        else {
            this.label = '&nbsp;';
        }
    };
    Dropdown.prototype.highlightValue = function (fallbackToFirst) {
        var items = this.domHandler.find(this.el.nativeElement, '.ui-dropdown-items > li');
        var currentSelectedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
        if (currentSelectedItem) {
            this.domHandler.removeClass(currentSelectedItem, 'ui-state-highlight');
        }
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            var selectedIndex = this.findItemIndex(this.value, this.optionsToDisplay);
            if (selectedIndex == -1 && fallbackToFirst) {
                selectedIndex = 0;
            }
            if (selectedIndex != -1) {
                this.domHandler.addClass(items[selectedIndex], 'ui-state-highlight');
            }
        }
    };
    Dropdown.prototype.updateDimensions = function () {
        if (this.autoWidth) {
            var select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if (!this.style || (!this.style['width'] && !this.style['min-width'])) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
        }
    };
    Dropdown.prototype.onMouseenter = function (event) {
        this.hover = true;
    };
    Dropdown.prototype.onMouseleave = function (event) {
        this.hover = false;
    };
    Dropdown.prototype.onMouseclick = function (event, input) {
        if (this.disabled) {
            return;
        }
        this.selfClick = true;
        if (!this.itemClick) {
            input.focus();
            if (this.panelVisible)
                this.hide();
            else
                this.show(this.panel, this.container);
        }
    };
    Dropdown.prototype.show = function (panel, container) {
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            this.panelVisible = true;
            panel.style.zIndex = ++domhandler_1.DomHandler.zindex;
            this.domHandler.relativePosition(panel, container);
            this.domHandler.fadeIn(panel, 250);
        }
    };
    Dropdown.prototype.hide = function () {
        this.panelVisible = false;
    };
    Dropdown.prototype.onFocus = function (event) {
        this.focus = true;
    };
    Dropdown.prototype.onBlur = function (event) {
        this.focus = false;
        this.onModelTouched();
    };
    Dropdown.prototype.onKeydown = function (event) {
        var highlightedItem = this.domHandler.findSingle(this.panel, 'li.ui-state-highlight');
        switch (event.which) {
            case 40:
                if (!this.panelVisible && event.altKey) {
                    this.show(this.panel, this.container);
                }
                else {
                    if (highlightedItem) {
                        var nextItem = highlightedItem.nextElementSibling;
                        if (nextItem) {
                            this.selectItem(event, nextItem);
                            this.domHandler.scrollInView(this.itemsWrapper, nextItem);
                        }
                    }
                    else {
                        var firstItem = this.domHandler.findSingle(this.panel, 'li:first-child');
                        this.selectItem(event, firstItem);
                    }
                }
                event.preventDefault();
                break;
            case 38:
                if (highlightedItem) {
                    var prevItem = highlightedItem.previousElementSibling;
                    if (prevItem) {
                        this.selectItem(event, prevItem);
                        this.domHandler.scrollInView(this.itemsWrapper, prevItem);
                    }
                }
                event.preventDefault();
                break;
            case 13:
                this.panelVisible = false;
                event.preventDefault();
                break;
            case 27:
            case 9:
                this.panelVisible = false;
                break;
        }
    };
    Dropdown.prototype.findListItem = function (element) {
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
    Dropdown.prototype.onListMouseover = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.addClass(item, 'ui-state-hover');
        }
    };
    Dropdown.prototype.onListMouseout = function (event) {
        if (this.disabled) {
            return;
        }
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.domHandler.removeClass(item, 'ui-state-hover');
        }
    };
    Dropdown.prototype.onListClick = function (event) {
        if (this.disabled) {
            return;
        }
        this.itemClick = true;
        var element = event.target;
        if (element.nodeName != 'UL') {
            var item = this.findListItem(element);
            this.selectItem(event, item);
        }
        this.hide();
    };
    Dropdown.prototype.selectItem = function (event, item) {
        var currentSelectedItem = this.domHandler.findSingle(item.parentNode, 'li.ui-state-highlight');
        if (currentSelectedItem != item) {
            if (currentSelectedItem) {
                this.domHandler.removeClass(currentSelectedItem, 'ui-state-highlight');
            }
            this.domHandler.addClass(item, 'ui-state-highlight');
            var selectedOption = this.options[this.findItemIndex(item.dataset.value, this.options)];
            this.label = selectedOption.label;
            this.value = selectedOption.value;
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Dropdown.prototype.findItemIndex = function (val, opts) {
        var index = -1;
        if (opts) {
            if (val !== null && val !== undefined) {
                for (var i = 0; i < opts.length; i++) {
                    if (opts[i].value == val) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    Dropdown.prototype.onFilter = function (event) {
        if (this.options && this.options.length) {
            var val = event.target.value.toLowerCase();
            this.optionsToDisplay = [];
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (option.label.toLowerCase().startsWith(val)) {
                    this.optionsToDisplay.push(option);
                }
            }
            this.optionsChanged = true;
        }
    };
    Dropdown.prototype.ngOnDestroy = function () {
        this.documentClickListener();
        this.initialized = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Dropdown.prototype, "options", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Dropdown.prototype, "onChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dropdown.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dropdown.prototype, "filter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Dropdown.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Dropdown.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dropdown.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dropdown.prototype, "autoWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Dropdown.prototype, "required", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], Dropdown.prototype, "itemTemplate", void 0);
    Dropdown = __decorate([
        core_1.Component({
            selector: 'p-dropdown',
            template: "\n        <div [ngClass]=\"{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,'ui-state-hover':hover&&!disabled,'ui-state-focus':focus,'ui-state-disabled':disabled}\" \n            (mouseenter)=\"onMouseenter($event)\" (mouseleave)=\"onMouseleave($event)\" (click)=\"onMouseclick($event,in)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <select [required]=\"required\">\n                    <option *ngFor=\"let option of options\" [value]=\"option.value\" [selected]=\"value == option.value\">{{option.label}}</option>\n                </select>\n            </div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"text\" readonly (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" (keydown)=\"onKeydown($event)\">\n            </div>\n            <label class=\"ui-dropdown-label ui-inputtext ui-corner-all\" [innerHTML]=\"label\"></label>\n            <div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\" [ngClass]=\"{'ui-state-hover':hover&&!disabled,'ui-state-focus':focus}\">\n                <span class=\"fa fa-fw fa-caret-down\"></span>\n            </div>\n            <div class=\"ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow\" \n                [style.display]=\"panelVisible ? 'block' : 'none'\">\n                <div *ngIf=\"filter\" class=\"ui-dropdown-filter-container\" (input)=\"onFilter($event)\" (click)=\"$event.stopPropagation()\">\n                    <input type=\"text\" autocomplete=\"off\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\">\n                    <span class=\"fa fa-search\"></span>\n                </div>\n                <div class=\"ui-dropdown-items-wrapper\" [style.max-height]=\"scrollHeight||'auto'\">\n                    <ul *ngIf=\"!itemTemplate\" class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\"\n                        (mouseover)=\"onListMouseover($event)\" (mouseout)=\"onListMouseout($event)\">\n                        <li *ngFor=\"let option of optionsToDisplay;let i=index\" [attr.data-label]=\"option.label\" [attr.data-value]=\"option.value\" (click)=\"onListClick($event)\"\n                            class=\"ui-dropdown-item ui-corner-all\">{{option.label}}</li>\n                    </ul>\n                    <ul *ngIf=\"itemTemplate\" class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\"\n                        (mouseover)=\"onListMouseover($event)\" (mouseout)=\"onListMouseout($event)\" (click)=\"onListClick($event)\">\n                        <template ngFor [ngForOf]=\"optionsToDisplay\" [ngForTemplate]=\"itemTemplate\"></template>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler, DROPDOWN_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, core_1.IterableDiffers])
    ], Dropdown);
    return Dropdown;
}());
exports.Dropdown = Dropdown;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyTCxlQUFlLENBQUMsQ0FBQTtBQUUzTSwyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQUM3Qyx1QkFBc0QsaUJBQWlCLENBQUMsQ0FBQTtBQUV4RSxJQUFNLHVCQUF1QixHQUFhLElBQUksZUFBUSxDQUFDLDBCQUFpQixFQUFFO0lBQ3RFLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxRQUFRLEVBQVIsQ0FBUSxDQUFDO0lBQ3ZDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDO0FBeUNIO0lBc0JJLGtCQUFvQixFQUFjLEVBQVUsVUFBc0IsRUFBVSxRQUFrQixFQUFFLE9BQXdCO1FBQXBHLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWxCcEYsYUFBUSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUVsRCxpQkFBWSxHQUFXLE9BQU8sQ0FBQztRQVUvQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBWW5DLGtCQUFhLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxjQUFPLENBQUMsQ0FBQztRQVk1QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQW5CbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBb0NELDJCQUFRLEdBQVI7UUFBQSxpQkFhQztRQVpHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRXJDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxF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LENBQUM7WUFDTCxDQUFDO1lBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDL0IsQ0FBQztJQUVMLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQTNXRDtRQUFDLFlBQUssRUFBRTs7NkNBQUE7SUFFUjtRQUFDLGFBQU0sRUFBRTs7OENBQUE7SUFFVDtRQUFDLFlBQUssRUFBRTs7a0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7MkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7K0NBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7OENBQUE7SUFFUjtRQUFDLG1CQUFZLENBQUMsa0JBQVcsQ0FBQzs7a0RBQUE7SUEzRDlCO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSw2M0ZBa0NUO1lBQ0QsU0FBUyxFQUFFLENBQUMsdUJBQVUsRUFBQyx1QkFBdUIsQ0FBQztTQUNsRCxDQUFDOztnQkFBQTtJQWdYRixlQUFDO0FBQUQsQ0EvV0EsQUErV0MsSUFBQTtBQS9XWSxnQkFBUSxXQStXcEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixPbkluaXQsQWZ0ZXJWaWV3SW5pdCxBZnRlclZpZXdDaGVja2VkLERvQ2hlY2ssT25EZXN0cm95LElucHV0LE91dHB1dCxSZW5kZXJlcixFdmVudEVtaXR0ZXIsQ29udGVudENoaWxkLFRlbXBsYXRlUmVmLEl0ZXJhYmxlRGlmZmVycyxmb3J3YXJkUmVmLFByb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7U2VsZWN0SXRlbX0gZnJvbSAnLi4vYXBpL3NlbGVjdGl0ZW0nO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcblxuY29uc3QgRFJPUERPV05fVkFMVUVfQUNDRVNTT1I6IFByb3ZpZGVyID0gbmV3IFByb3ZpZGVyKE5HX1ZBTFVFX0FDQ0VTU09SLCB7XG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRHJvcGRvd24pLFxuICAgIG11bHRpOiB0cnVlXG59KTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWRyb3Bkb3duJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktZHJvcGRvd24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItY2xlYXJmaXgnOnRydWUsJ3VpLXN0YXRlLWhvdmVyJzpob3ZlciYmIWRpc2FibGVkLCd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXMsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiBcbiAgICAgICAgICAgIChtb3VzZWVudGVyKT1cIm9uTW91c2VlbnRlcigkZXZlbnQpXCIgKG1vdXNlbGVhdmUpPVwib25Nb3VzZWxlYXZlKCRldmVudClcIiAoY2xpY2spPVwib25Nb3VzZWNsaWNrKCRldmVudCxpbilcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPHNlbGVjdCBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCIgW3NlbGVjdGVkXT1cInZhbHVlID09IG9wdGlvbi52YWx1ZVwiPnt7b3B0aW9uLmxhYmVsfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCAjaW4gdHlwZT1cInRleHRcIiByZWFkb25seSAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyKCRldmVudClcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ1aS1kcm9wZG93bi1sYWJlbCB1aS1pbnB1dHRleHQgdWktY29ybmVyLWFsbFwiIFtpbm5lckhUTUxdPVwibGFiZWxcIj48L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRyb3Bkb3duLXRyaWdnZXIgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItcmlnaHRcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWhvdmVyJzpob3ZlciYmIWRpc2FibGVkLCd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXN9XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS1mdyBmYS1jYXJldC1kb3duXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZHJvcGRvd24tcGFuZWwgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItaGlkZGVuIHVpLXNoYWRvd1wiIFxuICAgICAgICAgICAgICAgIFtzdHlsZS5kaXNwbGF5XT1cInBhbmVsVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsdGVyXCIgY2xhc3M9XCJ1aS1kcm9wZG93bi1maWx0ZXItY29udGFpbmVyXCIgKGlucHV0KT1cIm9uRmlsdGVyKCRldmVudClcIiAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwidWktZHJvcGRvd24tZmlsdGVyIHVpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtc2VhcmNoXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kcm9wZG93bi1pdGVtcy13cmFwcGVyXCIgW3N0eWxlLm1heC1oZWlnaHRdPVwic2Nyb2xsSGVpZ2h0fHwnYXV0bydcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsICpuZ0lmPVwiIWl0ZW1UZW1wbGF0ZVwiIGNsYXNzPVwidWktZHJvcGRvd24taXRlbXMgdWktZHJvcGRvd24tbGlzdCB1aS13aWRnZXQtY29udGVudCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1oZWxwZXItcmVzZXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlb3Zlcik9XCJvbkxpc3RNb3VzZW92ZXIoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvbkxpc3RNb3VzZW91dCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zVG9EaXNwbGF5O2xldCBpPWluZGV4XCIgW2F0dHIuZGF0YS1sYWJlbF09XCJvcHRpb24ubGFiZWxcIiBbYXR0ci5kYXRhLXZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiIChjbGljayk9XCJvbkxpc3RDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInVpLWRyb3Bkb3duLWl0ZW0gdWktY29ybmVyLWFsbFwiPnt7b3B0aW9uLmxhYmVsfX08L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8dWwgKm5nSWY9XCJpdGVtVGVtcGxhdGVcIiBjbGFzcz1cInVpLWRyb3Bkb3duLWl0ZW1zIHVpLWRyb3Bkb3duLWxpc3QgdWktd2lkZ2V0LWNvbnRlbnQgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLXJlc2V0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZW92ZXIpPVwib25MaXN0TW91c2VvdmVyKCRldmVudClcIiAobW91c2VvdXQpPVwib25MaXN0TW91c2VvdXQoJGV2ZW50KVwiIChjbGljayk9XCJvbkxpc3RDbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwib3B0aW9uc1RvRGlzcGxheVwiIFtuZ0ZvclRlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiPjwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtEb21IYW5kbGVyLERST1BET1dOX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93biBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlclZpZXdJbml0LEFmdGVyVmlld0NoZWNrZWQsRG9DaGVjayxPbkRlc3Ryb3ksQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgb3B0aW9uczogU2VsZWN0SXRlbVtdO1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHNjcm9sbEhlaWdodDogc3RyaW5nID0gJzIwMHB4JztcblxuICAgIEBJbnB1dCgpIGZpbHRlcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgYXV0b1dpZHRoOiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcbiAgICBcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgICAgICAgdGhpcy5kaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgICB9XG5cbiAgICB2YWx1ZTogYW55O1xuICAgIFxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gICAgXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvcHRpb25zVG9EaXNwbGF5OiBTZWxlY3RJdGVtW107XG5cbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIFxuICAgIGhvdmVyOiBib29sZWFuO1xuICAgIFxuICAgIGZvY3VzOiBib29sZWFuO1xuICAgIFxuICAgIGRpZmZlcjogYW55O1xuICAgIFxuICAgIHByaXZhdGUgcGFuZWxWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgcHJpdmF0ZSBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcbiAgICBcbiAgICBwcml2YXRlIG9wdGlvbnNDaGFuZ2VkOiBib29sZWFuO1xuICAgICAgICBcbiAgICBwcml2YXRlIHBhbmVsOiBhbnk7XG4gICAgXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IGFueTtcbiAgICBcbiAgICBwcml2YXRlIGl0ZW1zV3JhcHBlcjogYW55O1xuICAgIFxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgcHJpdmF0ZSBzZWxmQ2xpY2s6IGJvb2xlYW47XG4gICAgXG4gICAgcHJpdmF0ZSBpdGVtQ2xpY2s6IGJvb2xlYW47XG4gICAgICAgICAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zVG9EaXNwbGF5ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdib2R5JywgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYoIXRoaXMuc2VsZkNsaWNrJiYhdGhpcy5pdGVtQ2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNlbGZDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pdGVtQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XG4gICAgfVxuICAgIFxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgbGV0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIFxuICAgICAgICBpZihjaGFuZ2VzICYmIHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1RvRGlzcGxheSA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpwqB7ICAgIFxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICAgICAgdGhpcy5wYW5lbCA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpdi51aS1kcm9wZG93bi1wYW5lbCcpO1xuICAgICAgICB0aGlzLml0ZW1zV3JhcHBlciA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2Rpdi51aS1kcm9wZG93bi1pdGVtcy13cmFwcGVyJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmhpZ2hsaWdodFZhbHVlKHRydWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYodGhpcy5vcHRpb25zQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRWYWx1ZSgpO1xuICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLnJlbGF0aXZlUG9zaXRpb24odGhpcy5wYW5lbCwgdGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XG5cbiAgICAgICAgaWYodGhpcy5pbml0aWFsaXplZCAmJiAhdGhpcy5vcHRpb25zQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZUxhYmVsKCkge1xuICAgICAgICBpZih0aGlzLm9wdGlvbnNUb0Rpc3BsYXkgJiYgdGhpcy5vcHRpb25zVG9EaXNwbGF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSW5kZXggPSB0aGlzLmZpbmRJdGVtSW5kZXgodGhpcy52YWx1ZSwgdGhpcy5vcHRpb25zVG9EaXNwbGF5KTtcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkSW5kZXggPT0gLTEpXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMub3B0aW9uc1RvRGlzcGxheVswXS5sYWJlbDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5vcHRpb25zVG9EaXNwbGF5W3NlbGVjdGVkSW5kZXhdLmxhYmVsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYWJlbCA9ICcmbmJzcDsnO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbiAgICBoaWdobGlnaHRWYWx1ZShmYWxsYmFja1RvRmlyc3Q/OiBib29sZWFuKSB7XG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuZG9tSGFuZGxlci5maW5kKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy51aS1kcm9wZG93bi1pdGVtcyA+IGxpJyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgY3VycmVudFNlbGVjdGVkSXRlbSA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMucGFuZWwsICdsaS51aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgaWYoY3VycmVudFNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLnJlbW92ZUNsYXNzKGN1cnJlbnRTZWxlY3RlZEl0ZW0sICd1aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5vcHRpb25zVG9EaXNwbGF5ICYmIHRoaXMub3B0aW9uc1RvRGlzcGxheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEluZGV4ID0gdGhpcy5maW5kSXRlbUluZGV4KHRoaXMudmFsdWUsIHRoaXMub3B0aW9uc1RvRGlzcGxheSk7XG4gICAgICAgICAgICBpZihzZWxlY3RlZEluZGV4ID09IC0xICYmIGZhbGxiYWNrVG9GaXJzdCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoc2VsZWN0ZWRJbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5hZGRDbGFzcyhpdGVtc1tzZWxlY3RlZEluZGV4XSwgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICBcbiAgICB1cGRhdGVEaW1lbnNpb25zKCkge1xuICAgICAgICBpZih0aGlzLmF1dG9XaWR0aCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdCA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3NlbGVjdCcpO1xuICAgICAgICAgICAgaWYoIXRoaXMuc3R5bGV8fCghdGhpcy5zdHlsZVsnd2lkdGgnXSYmIXRoaXMuc3R5bGVbJ21pbi13aWR0aCddKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5zdHlsZS53aWR0aCA9IHNlbGVjdC5vZmZzZXRXaWR0aCArIDMwICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbk1vdXNlZW50ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5ob3ZlciA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIG9uTW91c2VsZWF2ZShldmVudCkge1xuICAgICAgICB0aGlzLmhvdmVyID0gZmFsc2VcbiAgICB9XG4gICAgXG4gICAgb25Nb3VzZWNsaWNrKGV2ZW50LGlucHV0KSB7XG4gICAgICAgIGlmKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgaWYoIXRoaXMuaXRlbUNsaWNrKSB7XG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLnBhbmVsVmlzaWJsZSlcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNob3codGhpcy5wYW5lbCx0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2hvdyhwYW5lbCxjb250YWluZXIpIHtcbiAgICAgICAgaWYodGhpcy5vcHRpb25zVG9EaXNwbGF5ICYmIHRoaXMub3B0aW9uc1RvRGlzcGxheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWxWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLnpJbmRleCA9ICsrRG9tSGFuZGxlci56aW5kZXg7XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVsYXRpdmVQb3NpdGlvbihwYW5lbCwgY29udGFpbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5mYWRlSW4ocGFuZWwsMjUwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBvbkJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgfVxuICAgIFxuICAgIG9uS2V5ZG93bihldmVudCkge1xuICAgICAgICBsZXQgaGlnaGxpZ2h0ZWRJdGVtID0gdGhpcy5kb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5wYW5lbCwgJ2xpLnVpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICBzd2l0Y2goZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93blxuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICBpZighdGhpcy5wYW5lbFZpc2libGUgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyh0aGlzLnBhbmVsLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZihoaWdobGlnaHRlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0SXRlbSA9IGhpZ2hsaWdodGVkSXRlbS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXh0SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShldmVudCwgbmV4dEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5zY3JvbGxJblZpZXcodGhpcy5pdGVtc1dyYXBwZXIsIG5leHRJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdEl0ZW0gPSB0aGlzLmRvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnBhbmVsLCAnbGk6Zmlyc3QtY2hpbGQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShldmVudCwgZmlyc3RJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vdXBcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgaWYoaGlnaGxpZ2h0ZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2SXRlbSA9IGhpZ2hsaWdodGVkSXRlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZihwcmV2SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGV2ZW50LCBwcmV2SXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuc2Nyb2xsSW5WaWV3KHRoaXMuaXRlbXNXcmFwcGVyLCBwcmV2SXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2VzY2FwZSBhbmQgdGFiXG4gICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmaW5kTGlzdEl0ZW0oZWxlbWVudCkge1xuICAgICAgICBpZihlbGVtZW50Lm5vZGVOYW1lID09ICdMSScpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHdoaWxlKHBhcmVudC5ub2RlTmFtZSAhPSAnTEknKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uTGlzdE1vdXNlb3ZlcihldmVudCnCoHtcbiAgICAgICAgaWYodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYoZWxlbWVudC5ub2RlTmFtZSAhPSAnVUwnKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLmFkZENsYXNzKGl0ZW0sICd1aS1zdGF0ZS1ob3ZlcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uTGlzdE1vdXNlb3V0KGV2ZW50KcKge1xuICAgICAgICBpZih0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZihlbGVtZW50Lm5vZGVOYW1lICE9ICdVTCcpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0oZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoaXRlbSwgJ3VpLXN0YXRlLWhvdmVyJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25MaXN0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLml0ZW1DbGljayA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBsZXQgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYoZWxlbWVudC5ub2RlTmFtZSAhPSAnVUwnKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGV2ZW50LGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gICAgXG4gICAgc2VsZWN0SXRlbShldmVudCwgaXRlbSkge1xuICAgICAgICBsZXQgY3VycmVudFNlbGVjdGVkSXRlbSA9IHRoaXMuZG9tSGFuZGxlci5maW5kU2luZ2xlKGl0ZW0ucGFyZW50Tm9kZSwgJ2xpLnVpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICBpZihjdXJyZW50U2VsZWN0ZWRJdGVtICE9IGl0ZW0pIHtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRTZWxlY3RlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoY3VycmVudFNlbGVjdGVkSXRlbSwgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLmFkZENsYXNzKGl0ZW0sICd1aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZE9wdGlvbiA9IHRoaXMub3B0aW9uc1t0aGlzLmZpbmRJdGVtSW5kZXgoaXRlbS5kYXRhc2V0LnZhbHVlLCB0aGlzLm9wdGlvbnMpXTtcbiAgICAgICAgICAgIHRoaXMubGFiZWwgPSBzZWxlY3RlZE9wdGlvbi5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZE9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZpbmRJdGVtSW5kZXgodmFsOiBhbnksIG9wdHM6IFNlbGVjdEl0ZW1bXSk6IG51bWJlciB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBpZihvcHRzKSB7XG4gICAgICAgICAgICBpZih2YWwgIT09IG51bGwgJiYgdmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgb3B0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZihvcHRzW2ldLnZhbHVlID09IHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgXG4gICAgb25GaWx0ZXIoZXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCB2YWwgPSBldmVudC50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1RvRGlzcGxheSA9IFtdO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB0aGlzLm9wdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgaWYob3B0aW9uLmxhYmVsLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1RvRGlzcGxheS5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuXG59Il19
