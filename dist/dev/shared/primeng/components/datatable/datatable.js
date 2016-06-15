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
var column_1 = require('../column/column');
var columntemplateloader_1 = require('../column/columntemplateloader');
var rowexpansionloader_1 = require('./rowexpansionloader');
var header_1 = require('../common/header');
var footer_1 = require('../common/footer');
var paginator_1 = require('../paginator/paginator');
var inputtext_1 = require('../inputtext/inputtext');
var domhandler_1 = require('../dom/domhandler');
var DataTable = (function () {
    function DataTable(el, domHandler, differs, cols, renderer) {
        var _this = this;
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.pageLinks = 5;
        this.selectionChange = new core_1.EventEmitter();
        this.onRowClick = new core_1.EventEmitter();
        this.onRowSelect = new core_1.EventEmitter();
        this.onRowUnselect = new core_1.EventEmitter();
        this.onRowDblclick = new core_1.EventEmitter();
        this.onContextMenuSelect = new core_1.EventEmitter();
        this.filterDelay = 300;
        this.onLazyLoad = new core_1.EventEmitter();
        this.onColResize = new core_1.EventEmitter();
        this.onColReorder = new core_1.EventEmitter();
        this.sortMode = 'single';
        this.sortOrder = 1;
        this.csvSeparator = ',';
        this.onEditInit = new core_1.EventEmitter();
        this.onEditComplete = new core_1.EventEmitter();
        this.onEdit = new core_1.EventEmitter();
        this.onEditCancel = new core_1.EventEmitter();
        this.onPage = new core_1.EventEmitter();
        this.onSort = new core_1.EventEmitter();
        this.onFilter = new core_1.EventEmitter();
        this.onRowExpand = new core_1.EventEmitter();
        this.onRowCollapse = new core_1.EventEmitter();
        this.first = 0;
        this.page = 0;
        this.filters = {};
        this.columnsUpdated = false;
        this.filterConstraints = {
            startsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
            },
            contains: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            },
            endsWith: function (value, filter) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }
                if (value === undefined || value === null) {
                    return false;
                }
                var filterValue = filter.toLowerCase();
                return value.indexOf(filterValue, value.length - filterValue.length) !== -1;
            }
        };
        this.differ = differs.find([]).create(null);
        cols.changes.subscribe(function (_) {
            _this.columns = cols.toArray();
            _this.columnsUpdated = true;
        });
    }
    DataTable.prototype.ngOnInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit({
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                filters: null,
                multiSortMeta: this.multiSortMeta
            });
        }
    };
    DataTable.prototype.ngAfterViewChecked = function () {
        if (this.columnsUpdated) {
            if (this.resizableColumns) {
                this.initResizableColumns();
            }
            if (this.reorderableColumns) {
                this.initColumnReordering();
            }
            if (this.scrollable) {
                this.initScrolling();
            }
            this.columnsUpdated = false;
        }
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.globalFilter) {
            this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', function () {
                _this.filterTimeout = setTimeout(function () {
                    _this.filter();
                    _this.filterTimeout = null;
                }, _this.filterDelay);
            });
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.value);
        if (changes) {
            if (this.paginator) {
                this.updatePaginator();
            }
            if (!this.lazy && !this.stopSortPropagation && (this.sortField || this.multiSortMeta)) {
                if (this.sortMode == 'single')
                    this.sortSingle();
                else if (this.sortMode == 'multiple')
                    this.sortMultiple();
            }
            this.updateDataToRender(this.filteredValue || this.value);
            this.stopSortPropagation = false;
        }
    };
    DataTable.prototype.resolveFieldData = function (data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                var fields = field.split('.');
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
    DataTable.prototype.updatePaginator = function () {
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
        if (this.totalRecords && this.first >= this.totalRecords) {
            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    };
    DataTable.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy)
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else
            this.updateDataToRender(this.filteredValue || this.value);
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataTable.prototype.updateDataToRender = function (datasource) {
        if (this.paginator && datasource) {
            this.dataToRender = [];
            var startIndex = this.lazy ? 0 : this.first;
            for (var i = startIndex; i < (startIndex + this.rows); i++) {
                if (i >= datasource.length) {
                    break;
                }
                this.dataToRender.push(datasource[i]);
            }
        }
        else {
            this.dataToRender = datasource;
        }
    };
    DataTable.prototype.sort = function (event, column) {
        if (!column.sortable) {
            return;
        }
        this.sortOrder = (this.sortField === column.field) ? this.sortOrder * -1 : 1;
        this.sortField = column.field;
        this.sortColumn = column;
        var metaKey = event.metaKey || event.ctrlKey;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (this.sortMode == 'multiple') {
                if (!this.multiSortMeta || !metaKey) {
                    this.multiSortMeta = [];
                }
                this.addSortMeta({ field: this.sortField, order: this.sortOrder });
                this.sortMultiple();
            }
            else {
                this.sortSingle();
            }
        }
        this.onSort.emit({
            field: this.sortField,
            order: this.sortOrder,
            multisortmeta: this.multiSortMeta
        });
    };
    DataTable.prototype.sortSingle = function () {
        var _this = this;
        if (this.value) {
            if (this.sortColumn && this.sortColumn.sortable === 'custom') {
                this.sortColumn.sortFunction.emit({
                    field: this.sortField,
                    order: this.sortOrder
                });
            }
            else {
                this.value.sort(function (data1, data2) {
                    var value1 = _this.resolveFieldData(data1, _this.sortField);
                    var value2 = _this.resolveFieldData(data2, _this.sortField);
                    var result = null;
                    if (value1 instanceof String && value2 instanceof String)
                        result = value1.localeCompare(value2);
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    return (_this.sortOrder * result);
                });
            }
            this.first = 0;
            if (this.hasFilter()) {
                this.filter();
            }
        }
        this.stopSortPropagation = true;
    };
    DataTable.prototype.sortMultiple = function () {
        var _this = this;
        if (this.value) {
            this.value.sort(function (data1, data2) {
                return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
            });
            if (this.hasFilter()) {
                this.filter();
            }
        }
        this.stopSortPropagation = true;
    };
    DataTable.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
        var value1 = this.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = this.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    DataTable.prototype.addSortMeta = function (meta) {
        var index = -1;
        for (var i = 0; i < this.multiSortMeta.length; i++) {
            if (this.multiSortMeta[i].field === meta.field) {
                index = i;
                break;
            }
        }
        if (index >= 0)
            this.multiSortMeta[index] = meta;
        else
            this.multiSortMeta.push(meta);
    };
    DataTable.prototype.isSorted = function (column) {
        if (this.sortMode === 'single') {
            return (this.sortField && column.field === this.sortField);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == column.field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    DataTable.prototype.getSortOrder = function (column) {
        var order = 0;
        if (this.sortMode === 'single') {
            if (this.sortField && column.field === this.sortField) {
                order = this.sortOrder;
            }
        }
        else if (this.sortMode === 'multiple') {
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == column.field) {
                        order = this.multiSortMeta[i].order;
                        break;
                    }
                }
            }
        }
        return order;
    };
    DataTable.prototype.handleRowClick = function (event, rowData) {
        this.onRowClick.next({ originalEvent: event, data: rowData });
        if (!this.selectionMode) {
            return;
        }
        var targetNode = event.target.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A'
            || (this.domHandler.hasClass(event.target, 'ui-c'))) {
            return;
        }
        var selectionIndex = this.findIndexInSelection(rowData);
        var selected = selectionIndex != -1;
        var metaKey = (event.metaKey || event.ctrlKey);
        if (selected && metaKey) {
            if (this.isSingleSelectionMode()) {
                this.selection = null;
                this.selectionChange.emit(null);
            }
            else {
                this.selection.splice(selectionIndex, 1);
                this.selectionChange.emit(this.selection);
            }
            this.onRowUnselect.emit({ originalEvent: event, data: rowData });
        }
        else {
            if (this.isSingleSelectionMode()) {
                this.selection = rowData;
                this.selectionChange.emit(rowData);
            }
            else if (this.isMultipleSelectionMode()) {
                this.selection = (!metaKey) ? [] : this.selection || [];
                this.selection.push(rowData);
                this.selectionChange.emit(this.selection);
            }
            this.onRowSelect.emit({ originalEvent: event, data: rowData });
        }
    };
    DataTable.prototype.onRowRightClick = function (event, rowData) {
        if (this.contextMenu) {
            var selectionIndex = this.findIndexInSelection(rowData);
            var selected = selectionIndex != -1;
            if (!selected) {
                if (this.isSingleSelectionMode()) {
                    this.selection = rowData;
                    this.selectionChange.emit(rowData);
                }
                else if (this.isMultipleSelectionMode()) {
                    this.selection = [];
                    this.selection.push(rowData);
                    this.selectionChange.emit(this.selection);
                }
            }
            this.contextMenu.show(event);
            this.onContextMenuSelect.emit({ originalEvent: event, data: rowData });
        }
    };
    DataTable.prototype.rowDblclick = function (event, rowData) {
        this.onRowDblclick.emit({ originalEvent: event, data: rowData });
    };
    DataTable.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    DataTable.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    DataTable.prototype.findIndexInSelection = function (rowData) {
        var index = -1;
        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                index = (this.selection == rowData) ? 0 : -1;
            }
            else if (this.isMultipleSelectionMode()) {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == rowData) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    DataTable.prototype.isSelected = function (rowData) {
        return this.findIndexInSelection(rowData) != -1;
    };
    DataTable.prototype.onFilterKeyup = function (value, field, matchMode) {
        var _this = this;
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        this.filterTimeout = setTimeout(function () {
            _this.filters[field] = { value: value, matchMode: matchMode };
            _this.filter();
            _this.filterTimeout = null;
        }, this.filterDelay);
    };
    DataTable.prototype.filter = function () {
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.filteredValue = [];
            for (var i = 0; i < this.value.length; i++) {
                var localMatch = true;
                var globalMatch = false;
                for (var j = 0; j < this.columns.length; j++) {
                    var col = this.columns[j], filterMeta = this.filters[col.field];
                    if (filterMeta) {
                        var filterValue = filterMeta.value, filterField = col.field, filterMatchMode = filterMeta.matchMode || 'startsWith', dataFieldValue = this.resolveFieldData(this.value[i], filterField);
                        var filterConstraint = this.filterConstraints[filterMatchMode];
                        if (!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }
                        if (!localMatch) {
                            break;
                        }
                    }
                    if (this.globalFilter && !globalMatch) {
                        globalMatch = this.filterConstraints['contains'](this.resolveFieldData(this.value[i], col.field), this.globalFilter.value);
                    }
                }
                var matches = localMatch;
                if (this.globalFilter) {
                    matches = localMatch && globalMatch;
                }
                if (matches) {
                    this.filteredValue.push(this.value[i]);
                }
            }
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
            this.updateDataToRender(this.filteredValue || this.value);
        }
        this.onFilter.emit({
            filters: this.filters
        });
    };
    DataTable.prototype.hasFilter = function () {
        var empty = true;
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    };
    DataTable.prototype.onFilterInputClick = function (event) {
        event.stopPropagation();
    };
    DataTable.prototype.switchCellToEditMode = function (element, column, rowData) {
        if (!this.selectionMode && this.editable && column.editable) {
            this.onEditInit.emit({ column: column, data: rowData });
            var cell = this.findCell(element);
            if (!this.domHandler.hasClass(cell, 'ui-cell-editing')) {
                this.domHandler.addClass(cell, 'ui-cell-editing');
                this.domHandler.addClass(cell, 'ui-state-highlight');
                var editor = cell.querySelector('.ui-cell-editor').focus();
            }
        }
    };
    DataTable.prototype.switchCellToViewMode = function (element, column, rowData, complete) {
        if (this.editable) {
            if (this.preventBlurOnEdit) {
                this.preventBlurOnEdit = false;
            }
            else {
                if (complete)
                    this.onEditComplete.emit({ column: column, data: rowData });
                else
                    this.onEditCancel.emit({ column: column, data: rowData });
                var cell = this.findCell(element);
                this.domHandler.removeClass(cell, 'ui-cell-editing');
                this.domHandler.removeClass(cell, 'ui-state-highlight');
            }
        }
    };
    DataTable.prototype.onCellEditorKeydown = function (event, column, rowData) {
        if (this.editable) {
            this.onEdit.emit({ originalEvent: event, column: column, data: rowData });
            if (event.keyCode == 13) {
                this.switchCellToViewMode(event.target, column, rowData, true);
                this.preventBlurOnEdit = true;
            }
            if (event.keyCode == 27) {
                this.switchCellToViewMode(event.target, column, rowData, false);
                this.preventBlurOnEdit = true;
            }
        }
    };
    DataTable.prototype.findCell = function (element) {
        var cell = element;
        while (cell.tagName != 'TD') {
            cell = cell.parentElement;
        }
        return cell;
    };
    DataTable.prototype.initResizableColumns = function () {
        var _this = this;
        jQuery(this.el.nativeElement.children[0]).puicolresize({
            mode: this.columnResizeMode,
            colResize: function (event, ui) {
                _this.onColResize.emit(ui.element);
            }
        });
    };
    DataTable.prototype.initColumnReordering = function () {
        var _this = this;
        jQuery(this.el.nativeElement.children[0]).puicolreorder({
            colReorder: function (event, ui) {
                if (ui.dropSide > 0) {
                    _this.columns.splice(ui.dropIndex + 1, 0, _this.columns.splice(ui.dragIndex, 1)[0]);
                }
                else {
                    _this.columns.splice(ui.dropIndex, 0, _this.columns.splice(ui.dragIndex, 1)[0]);
                }
                _this.onColReorder.emit({
                    dragIndex: ui.dragIndex,
                    dropIndex: ui.dropIndex,
                    columns: _this.columns
                });
            }
        });
    };
    DataTable.prototype.initScrolling = function () {
        jQuery(this.el.nativeElement.children[0]).puitablescroll({
            scrollHeight: this.scrollHeight,
            scrollWidth: this.scrollWidth
        });
    };
    DataTable.prototype.hasFooter = function () {
        if (this.footerRows) {
            return true;
        }
        else {
            if (this.columns) {
                for (var i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].footer) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    DataTable.prototype.isEmpty = function () {
        return !this.dataToRender || (this.dataToRender.length == 0);
    };
    DataTable.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            multiSortMeta: this.multiSortMeta
        };
    };
    DataTable.prototype.toggleRow = function (row) {
        if (!this.expandedRows) {
            this.expandedRows = [];
        }
        var expandedRowIndex = this.findExpandedRowIndex(row);
        if (expandedRowIndex != -1) {
            this.expandedRows.splice(expandedRowIndex, 1);
            this.onRowCollapse.emit(row);
        }
        else {
            this.expandedRows.push(row);
            this.onRowExpand.emit(row);
        }
    };
    DataTable.prototype.findExpandedRowIndex = function (row) {
        var index = -1;
        if (this.expandedRows) {
            for (var i = 0; i < this.expandedRows.length; i++) {
                if (this.expandedRows[i] == row) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    DataTable.prototype.isRowExpanded = function (row) {
        return this.findExpandedRowIndex(row) != -1;
    };
    DataTable.prototype.reset = function () {
        this.sortField = null;
        this.sortOrder = 1;
        this.filteredValue = null;
        this.filters = {};
        if (this.paginator) {
            this.paginate({
                first: 0,
                rows: this.rows
            });
        }
        else {
            this.updateDataToRender(this.value);
        }
    };
    DataTable.prototype.visibleColumns = function () {
        return this.columns.filter(function (c) { return !c.hidden; });
    };
    DataTable.prototype.exportCSV = function () {
        var _this = this;
        var data = this.value, csv = "data:text/csv;charset=utf-8,";
        for (var i = 0; i < this.columns.length; i++) {
            if (this.columns[i].field) {
                csv += this.columns[i].field;
                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        this.value.forEach(function (record, i) {
            csv += '\n';
            for (var i_1 = 0; i_1 < _this.columns.length; i_1++) {
                if (_this.columns[i_1].field) {
                    csv += _this.resolveFieldData(record, _this.columns[i_1].field);
                    if (i_1 < (_this.columns.length - 1)) {
                        csv += _this.csvSeparator;
                    }
                }
            }
        });
        window.open(encodeURI(csv));
    };
    DataTable.prototype.ngOnDestroy = function () {
        if (this.resizableColumns) {
            jQuery(this.el.nativeElement.children[0]).puicolresize('destroy');
        }
        if (this.reorderableColumns) {
            jQuery(this.el.nativeElement.children[0]).puicolreorder('destroy');
        }
        if (this.globalFilterFunction) {
            this.globalFilterFunction();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "totalRecords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "stacked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "selectionMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "selection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "selectionChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "editable", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowSelect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowUnselect", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowDblclick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onContextMenuSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "filterDelay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "lazy", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onLazyLoad", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "resizableColumns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "columnResizeMode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "reorderableColumns", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColReorder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "scrollable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "scrollWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "headerRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "footerRows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "globalFilter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "sortMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "sortField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTable.prototype, "sortOrder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "multiSortMeta", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "contextMenu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTable.prototype, "csvSeparator", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditInit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditComplete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEdit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onEditCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onPage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onSort", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onFilter", void 0);
    __decorate([
        core_1.ContentChild(header_1.Header), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "header", void 0);
    __decorate([
        core_1.ContentChild(footer_1.Footer), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "footer", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "expandableRows", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowExpand", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowCollapse", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataTable.prototype, "rowExpansionTemplate", void 0);
    DataTable = __decorate([
        core_1.Component({
            selector: 'p-dataTable',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" \n            [ngClass]=\"{'ui-datatable ui-widget': true, 'ui-datatable-reflow':responsive, 'ui-datatable-stacked': stacked}\">\n            <div class=\"ui-datatable-header ui-widget-header\" *ngIf=\"header\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <div class=\"ui-datatable-tablewrapper\" *ngIf=\"!scrollable\">\n                <table>\n                    <thead>\n                        <tr *ngIf=\"!headerRows\" class=\"ui-state-default\">\n                            <th #headerCell *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\"\n                                [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col)}\">\n                                <span class=\"ui-column-title\">{{col.header}}</span>\n                                <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                     [ngClass]=\"{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}\"></span>\n                                <input type=\"text\" pInputText class=\"ui-column-filter\" *ngIf=\"col.filter\" [value]=\"filters[col.field] ? filters[col.field].value : ''\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                            </th>\n                        </tr>\n                        <tr *ngFor=\"let headerRow of headerRows\" class=\"ui-state-default\">\n                            <th #headerCell *ngFor=\"let col of headerRow.columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\"\n                                (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col)}\">\n                                <span class=\"ui-column-title\">{{col.header}}</span>\n                                <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                     [ngClass]=\"{'fa-sort-desc': (getSortOrder(col) == -1),'fa-sort-asc': (getSortOrder(col) == 1)}\"></span>\n                                <input type=\"text\" pInputText class=\"ui-column-filter\" *ngIf=\"col.filter\" [value]=\"filters[col.field] ? filters[col.field].value : ''\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                            </th>\n                        </tr>\n                    </thead>\n                    <tfoot *ngIf=\"hasFooter()\">\n                        <tr *ngIf=\"!footerRows\">\n                            <th *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [ngClass]=\"{'ui-state-default':true}\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\">{{col.footer}}</th>\n                        </tr>\n                        <tr *ngFor=\"let footerRow of footerRows\">\n                            <th *ngFor=\"let col of footerRow.columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\"\n                                [attr.colspan]=\"col.colspan\" [attr.rowspan]=\"col.rowspan\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                [ngClass]=\"{'ui-state-default':true}\">{{col.footer}}</th>\n                        </tr>\n                    </tfoot>\n                    <tbody class=\"ui-datatable-data ui-widget-content\">\n                        <template ngFor let-rowData [ngForOf]=\"dataToRender\" let-even=\"even\" let-odd=\"odd\" let-rowIndex=\"index\">\n                            <tr #rowElement class=\"ui-widget-content\" (mouseenter)=\"hoveredRow = $event.target\" (mouseleave)=\"hoveredRow = null\"\n                                    (click)=\"handleRowClick($event, rowData)\" (dblclick)=\"rowDblclick($event,rowData)\" (contextmenu)=\"onRowRightClick($event,rowData)\"\n                                    [ngClass]=\"{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}\">\n                                <td *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                    [ngClass]=\"{'ui-editable-column':col.editable}\" (click)=\"switchCellToEditMode($event.target,col,rowData)\">\n                                    <span class=\"ui-column-title\" *ngIf=\"responsive\">{{col.header}}</span>\n                                    <span class=\"ui-cell-data\" *ngIf=\"!col.template\">{{resolveFieldData(rowData,col.field)}}</span>\n                                    <span class=\"ui-cell-data\" *ngIf=\"col.template\">\n                                        <p-columnTemplateLoader [column]=\"col\" [rowData]=\"rowData\" [rowIndex]=\"rowIndex + first\"></p-columnTemplateLoader>\n                                    </span>\n                                    <input type=\"text\" class=\"ui-cell-editor ui-state-highlight\" *ngIf=\"col.editable\" [(ngModel)]=\"rowData[col.field]\"\n                                            (blur)=\"switchCellToViewMode($event.target,col,rowData,true)\" (keydown)=\"onCellEditorKeydown($event, col, rowData)\"/>\n                                    <div class=\"ui-row-toggler fa fa-fw ui-c\" [ngClass]=\"{'fa-chevron-circle-down':isRowExpanded(rowData), 'fa-chevron-circle-right': !isRowExpanded(rowData)}\"\n                                        *ngIf=\"col.expander\" (click)=\"toggleRow(rowData)\"></div>\n                                </td>\n                            </tr>\n                            <tr *ngIf=\"expandableRows && isRowExpanded(rowData)\">\n                                <td [attr.colspan]=\"visibleColumns().length\">\n                                    <p-rowExpansionLoader [rowData]=\"rowData\" [template]=\"rowExpansionTemplate\"></p-rowExpansionLoader>\n                                </td>\n                            </tr>\n                        </template>\n                    </tbody>\n                </table>\n            </div>\n            <div class=\"ui-widget-header ui-datatable-scrollable-header\" *ngIf=\"scrollable\">\n                <div class=\"ui-datatable-scrollable-header-box\">\n                    <table>\n                        <thead>\n                            <tr>\n                                <th #headerCell *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                    (click)=\"sort($event,col)\" (mouseenter)=\"hoveredHeader = $event.target\" (mouseleave)=\"hoveredHeader = null\"\n                                    [ngClass]=\"{'ui-state-default ui-unselectable-text':true, 'ui-state-hover': headerCell === hoveredHeader && col.sortable,'ui-sortable-column': col.sortable,'ui-state-active': isSorted(col)}\">\n                                    <span class=\"ui-column-title\">{{col.header}}</span>\n                                    <span class=\"ui-sortable-column-icon fa fa-fw fa-sort\" *ngIf=\"col.sortable\"\n                                         [ngClass]=\"{'fa-sort-desc': (col.field === sortField) && (sortOrder == -1),'fa-sort-asc': (col.field === sortField) && (sortOrder == 1)}\"></span>\n                                    <input type=\"text\" pInputText class=\"ui-column-filter\" *ngIf=\"col.filter\" (click)=\"onFilterInputClick($event)\" (keyup)=\"onFilterKeyup($event.target.value, col.field, col.filterMatchMode)\"/>\n                                </th>\n                            </tr>\n                        </thead>\n                    </table>\n                </div>\n            </div>\n            <div class=\"ui-datatable-scrollable-body\" *ngIf=\"scrollable\">\n                <table>\n                    <tbody class=\"ui-datatable-data ui-widget-content\">\n                    <template ngFor let-rowData [ngForOf]=\"dataToRender\" let-even=\"even\" let-odd=\"odd\" let-rowIndex=\"index\">\n                        <tr #rowElement class=\"ui-widget-content\" (mouseenter)=\"hoveredRow = $event.target\" (mouseleave)=\"hoveredRow = null\"\n                                (click)=\"handleRowClick($event, rowData)\" (dblclick)=\"rowDblclick($event,rowData)\" (contextmenu)=\"onRowRightClick($event,rowData)\"\n                                [ngClass]=\"{'ui-datatable-even':even,'ui-datatable-odd':odd,'ui-state-hover': (selectionMode && rowElement == hoveredRow), 'ui-state-highlight': isSelected(rowData)}\">\n                            <td *ngFor=\"let col of columns\" [ngStyle]=\"col.style\" [class]=\"col.styleClass\" [style.display]=\"col.hidden ? 'none' : 'table-cell'\"\n                                [ngClass]=\"{'ui-editable-column':col.editable}\" (click)=\"switchCellToEditMode($event.target,col,rowData)\">\n                                <span class=\"ui-column-title\" *ngIf=\"responsive\">{{col.header}}</span>\n                                <span class=\"ui-cell-data\" *ngIf=\"!col.template\">{{resolveFieldData(rowData,col.field)}}</span>\n                                <span class=\"ui-cell-data\" *ngIf=\"col.template\">\n                                    <p-columnTemplateLoader [column]=\"col\" [rowData]=\"rowData\" [rowIndex]=\"rowIndex + first\"></p-columnTemplateLoader>\n                                </span>\n                                <input type=\"text\" class=\"ui-cell-editor ui-state-highlight\" *ngIf=\"col.editable\" [(ngModel)]=\"rowData[col.field]\"\n                                        (blur)=\"switchCellToViewMode($event.target,col,rowData,true)\" (keydown)=\"onCellEditorKeydown($event, col, rowData)\"/>\n                                <div class=\"ui-row-toggler fa fa-fw ui-c\" [ngClass]=\"{'fa-chevron-circle-down':isRowExpanded(rowData), 'fa-chevron-circle-right': !isRowExpanded(rowData)}\"\n                                    *ngIf=\"col.expander\" (click)=\"toggleRow(rowData)\"></div>\n                            </td>\n                        </tr>\n                        <tr *ngIf=\"expandableRows && isRowExpanded(rowData)\">\n                            <td [attr.colspan]=\"columns.length\">\n                                <p-rowExpansionLoader [rowData]=\"rowData\" [template]=\"rowExpansionTemplate\"></p-rowExpansionLoader>\n                            </td>\n                        </tr>\n                    </template>\n                    </tbody>\n                </table>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\"\n                (onPageChange)=\"paginate($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator\"></p-paginator>\n            <div class=\"ui-datatable-footer ui-widget-header\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
            directives: [paginator_1.Paginator, inputtext_1.InputText, columntemplateloader_1.ColumnTemplateLoader, rowexpansionloader_1.RowExpansionLoader],
            providers: [domhandler_1.DomHandler]
        }),
        __param(3, core_1.Query(column_1.Column)), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers, core_1.QueryList, core_1.Renderer])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvZGF0YXRhYmxlL2RhdGF0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEscUJBQW9OLGVBQWUsQ0FBQyxDQUFBO0FBQ3BPLHVCQUFxQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3hDLHFDQUFtQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3BFLG1DQUFpQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3hELHVCQUFxQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3hDLHVCQUFxQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3hDLDBCQUF3Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ2pELDBCQUF3Qix3QkFBd0IsQ0FBQyxDQUFBO0FBSWpELDJCQUF5QixtQkFBbUIsQ0FBQyxDQUFBO0FBZ0k3QztJQXNJSSxtQkFBb0IsRUFBYyxFQUFVLFVBQXNCLEVBQUUsT0FBd0IsRUFDekUsSUFBdUIsRUFBVSxRQUFrQjtRQXZJMUUsaUJBMDNCQztRQXB2QnVCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQTdIN0QsY0FBUyxHQUFXLENBQUMsQ0FBQztRQVlyQixvQkFBZSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUl4RCxlQUFVLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRW5ELGdCQUFXLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXBELGtCQUFhLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXRELGtCQUFhLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXRELHdCQUFtQixHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUU3RCxnQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUl6QixlQUFVLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBTW5ELGdCQUFXLEdBQXNCLElBQUksbUJBQVksRUFB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O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzJDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O29EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O3NEQUFBO0lBRVQ7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O2lEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O2tEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O29EQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O29EQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7OzBEQUFBO0lBRVQ7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzJDQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O2lEQUFBO0lBRVQ7UUFBQyxZQUFLLEVBQUU7O3VEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O3VEQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O2tEQUFBO0lBRVQ7UUFBQyxZQUFLLEVBQUU7O3lEQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O21EQUFBO0lBRVQ7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OzRDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2lEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7OytDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O29EQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O2tEQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O2lEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O3FEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7OzZDQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O21EQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7OzZDQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7OzZDQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7OytDQUFBO0lBRVQ7UUFBQyxtQkFBWSxDQUFDLGVBQU0sQ0FBQzs7NkNBQUE7SUFFckI7UUFBQyxtQkFBWSxDQUFDLGVBQU0sQ0FBQzs7NkNBQUE7SUFFckI7UUFBQyxZQUFLLEVBQUU7O3FEQUFBO0lBRVI7UUFBQyxhQUFNLEVBQUU7O2tEQUFBO0lBRVQ7UUFBQyxhQUFNLEVBQUU7O29EQUFBO0lBRVQ7UUFBQyxtQkFBWSxDQUFDLGtCQUFXLENBQUM7OzJEQUFBO0lBdE85QjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsdW1YQXdIVDtZQUNELFVBQVUsRUFBRSxDQUFDLHFCQUFTLEVBQUMscUJBQVMsRUFBQywyQ0FBb0IsRUFBQyx1Q0FBa0IsQ0FBQztZQUN6RSxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1NBQzFCLENBQUM7bUJBd0lPLFlBQUssQ0FBQyxlQUFNLENBQUM7O2lCQXhJcEI7SUEyM0JGLGdCQUFDO0FBQUQsQ0ExM0JBLEFBMDNCQyxJQUFBO0FBMTNCWSxpQkFBUyxZQTAzQnJCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvY29tcG9uZW50cy9kYXRhdGFibGUvZGF0YXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LEFmdGVyVmlld0NoZWNrZWQsT25Jbml0LE9uRGVzdHJveSxEb0NoZWNrLElucHV0LE91dHB1dCxTaW1wbGVDaGFuZ2UsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZCxDb250ZW50Q2hpbGRyZW4sUmVuZGVyZXIsSXRlcmFibGVEaWZmZXJzLFF1ZXJ5LFF1ZXJ5TGlzdCxUZW1wbGF0ZVJlZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NvbHVtbn0gZnJvbSAnLi4vY29sdW1uL2NvbHVtbic7XG5pbXBvcnQge0NvbHVtblRlbXBsYXRlTG9hZGVyfSBmcm9tICcuLi9jb2x1bW4vY29sdW1udGVtcGxhdGVsb2FkZXInO1xuaW1wb3J0IHtSb3dFeHBhbnNpb25Mb2FkZXJ9IGZyb20gJy4vcm93ZXhwYW5zaW9ubG9hZGVyJztcbmltcG9ydCB7SGVhZGVyfSBmcm9tICcuLi9jb21tb24vaGVhZGVyJztcbmltcG9ydCB7Rm9vdGVyfSBmcm9tICcuLi9jb21tb24vZm9vdGVyJztcbmltcG9ydCB7UGFnaW5hdG9yfSBmcm9tICcuLi9wYWdpbmF0b3IvcGFnaW5hdG9yJztcbmltcG9ydCB7SW5wdXRUZXh0fSBmcm9tICcuLi9pbnB1dHRleHQvaW5wdXR0ZXh0JztcbmltcG9ydCB7TGF6eUxvYWRFdmVudH0gZnJvbSAnLi4vYXBpL2xhenlsb2FkJztcbmltcG9ydCB7RmlsdGVyTWV0YWRhdGF9IGZyb20gJy4uL2FwaS9sYXp5bG9hZCc7XG5pbXBvcnQge1NvcnRNZXRhfSBmcm9tICcuLi9hcGkvc29ydG1ldGEnO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICcuLi9kb20vZG9taGFuZGxlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1kYXRhVGFibGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1kYXRhdGFibGUgdWktd2lkZ2V0JzogdHJ1ZSwgJ3VpLWRhdGF0YWJsZS1yZWZsb3cnOnJlc3BvbnNpdmUsICd1aS1kYXRhdGFibGUtc3RhY2tlZCc6IHN0YWNrZWR9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXRhYmxlLWhlYWRlciB1aS13aWRnZXQtaGVhZGVyXCIgKm5nSWY9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJoZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kYXRhdGFibGUtdGFibGV3cmFwcGVyXCIgKm5nSWY9XCIhc2Nyb2xsYWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0lmPVwiIWhlYWRlclJvd3NcIiBjbGFzcz1cInVpLXN0YXRlLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggI2hlYWRlckNlbGwgKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zXCIgW25nU3R5bGVdPVwiY29sLnN0eWxlXCIgW2NsYXNzXT1cImNvbC5zdHlsZUNsYXNzXCIgW3N0eWxlLmRpc3BsYXldPVwiY29sLmhpZGRlbiA/ICdub25lJyA6ICd0YWJsZS1jZWxsJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzb3J0KCRldmVudCxjb2wpXCIgKG1vdXNlZW50ZXIpPVwiaG92ZXJlZEhlYWRlciA9ICRldmVudC50YXJnZXRcIiAobW91c2VsZWF2ZSk9XCJob3ZlcmVkSGVhZGVyID0gbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGVmYXVsdCB1aS11bnNlbGVjdGFibGUtdGV4dCc6dHJ1ZSwgJ3VpLXN0YXRlLWhvdmVyJzogaGVhZGVyQ2VsbCA9PT0gaG92ZXJlZEhlYWRlciAmJiBjb2wuc29ydGFibGUsJ3VpLXNvcnRhYmxlLWNvbHVtbic6IGNvbC5zb3J0YWJsZSwndWktc3RhdGUtYWN0aXZlJzogaXNTb3J0ZWQoY29sKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jb2x1bW4tdGl0bGVcIj57e2NvbC5oZWFkZXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zb3J0YWJsZS1jb2x1bW4taWNvbiBmYSBmYS1mdyBmYS1zb3J0XCIgKm5nSWY9XCJjb2wuc29ydGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnZmEtc29ydC1kZXNjJzogKGdldFNvcnRPcmRlcihjb2wpID09IC0xKSwnZmEtc29ydC1hc2MnOiAoZ2V0U29ydE9yZGVyKGNvbCkgPT0gMSl9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwSW5wdXRUZXh0IGNsYXNzPVwidWktY29sdW1uLWZpbHRlclwiICpuZ0lmPVwiY29sLmZpbHRlclwiIFt2YWx1ZV09XCJmaWx0ZXJzW2NvbC5maWVsZF0gPyBmaWx0ZXJzW2NvbC5maWVsZF0udmFsdWUgOiAnJ1wiIChjbGljayk9XCJvbkZpbHRlcklucHV0Q2xpY2soJGV2ZW50KVwiIChrZXl1cCk9XCJvbkZpbHRlcktleXVwKCRldmVudC50YXJnZXQudmFsdWUsIGNvbC5maWVsZCwgY29sLmZpbHRlck1hdGNoTW9kZSlcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGhlYWRlclJvdyBvZiBoZWFkZXJSb3dzXCIgY2xhc3M9XCJ1aS1zdGF0ZS1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICNoZWFkZXJDZWxsICpuZ0Zvcj1cImxldCBjb2wgb2YgaGVhZGVyUm93LmNvbHVtbnNcIiBbbmdTdHlsZV09XCJjb2wuc3R5bGVcIiBbY2xhc3NdPVwiY29sLnN0eWxlQ2xhc3NcIiBbYXR0ci5jb2xzcGFuXT1cImNvbC5jb2xzcGFuXCIgW2F0dHIucm93c3Bhbl09XCJjb2wucm93c3BhblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzb3J0KCRldmVudCxjb2wpXCIgKG1vdXNlZW50ZXIpPVwiaG92ZXJlZEhlYWRlciA9ICRldmVudC50YXJnZXRcIiAobW91c2VsZWF2ZSk9XCJob3ZlcmVkSGVhZGVyID0gbnVsbFwiIFtzdHlsZS5kaXNwbGF5XT1cImNvbC5oaWRkZW4gPyAnbm9uZScgOiAndGFibGUtY2VsbCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRlZmF1bHQgdWktdW5zZWxlY3RhYmxlLXRleHQnOnRydWUsICd1aS1zdGF0ZS1ob3Zlcic6IGhlYWRlckNlbGwgPT09IGhvdmVyZWRIZWFkZXIgJiYgY29sLnNvcnRhYmxlLCd1aS1zb3J0YWJsZS1jb2x1bW4nOiBjb2wuc29ydGFibGUsJ3VpLXN0YXRlLWFjdGl2ZSc6IGlzU29ydGVkKGNvbCl9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY29sdW1uLXRpdGxlXCI+e3tjb2wuaGVhZGVyfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc29ydGFibGUtY29sdW1uLWljb24gZmEgZmEtZncgZmEtc29ydFwiICpuZ0lmPVwiY29sLnNvcnRhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J2ZhLXNvcnQtZGVzYyc6IChnZXRTb3J0T3JkZXIoY29sKSA9PSAtMSksJ2ZhLXNvcnQtYXNjJzogKGdldFNvcnRPcmRlcihjb2wpID09IDEpfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcElucHV0VGV4dCBjbGFzcz1cInVpLWNvbHVtbi1maWx0ZXJcIiAqbmdJZj1cImNvbC5maWx0ZXJcIiBbdmFsdWVdPVwiZmlsdGVyc1tjb2wuZmllbGRdID8gZmlsdGVyc1tjb2wuZmllbGRdLnZhbHVlIDogJydcIiAoY2xpY2spPVwib25GaWx0ZXJJbnB1dENsaWNrKCRldmVudClcIiAoa2V5dXApPVwib25GaWx0ZXJLZXl1cCgkZXZlbnQudGFyZ2V0LnZhbHVlLCBjb2wuZmllbGQsIGNvbC5maWx0ZXJNYXRjaE1vZGUpXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICA8dGZvb3QgKm5nSWY9XCJoYXNGb290ZXIoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0lmPVwiIWZvb3RlclJvd3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGNvbCBvZiBjb2x1bW5zXCIgW25nU3R5bGVdPVwiY29sLnN0eWxlXCIgW2NsYXNzXT1cImNvbC5zdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlfVwiIFtzdHlsZS5kaXNwbGF5XT1cImNvbC5oaWRkZW4gPyAnbm9uZScgOiAndGFibGUtY2VsbCdcIj57e2NvbC5mb290ZXJ9fTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBmb290ZXJSb3cgb2YgZm9vdGVyUm93c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sIG9mIGZvb3RlclJvdy5jb2x1bW5zXCIgW25nU3R5bGVdPVwiY29sLnN0eWxlXCIgW2NsYXNzXT1cImNvbC5zdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuY29sc3Bhbl09XCJjb2wuY29sc3BhblwiIFthdHRyLnJvd3NwYW5dPVwiY29sLnJvd3NwYW5cIiBbc3R5bGUuZGlzcGxheV09XCJjb2wuaGlkZGVuID8gJ25vbmUnIDogJ3RhYmxlLWNlbGwnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlfVwiPnt7Y29sLmZvb3Rlcn19PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInVpLWRhdGF0YWJsZS1kYXRhIHVpLXdpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgbmdGb3IgbGV0LXJvd0RhdGEgW25nRm9yT2ZdPVwiZGF0YVRvUmVuZGVyXCIgbGV0LWV2ZW49XCJldmVuXCIgbGV0LW9kZD1cIm9kZFwiIGxldC1yb3dJbmRleD1cImluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyICNyb3dFbGVtZW50IGNsYXNzPVwidWktd2lkZ2V0LWNvbnRlbnRcIiAobW91c2VlbnRlcik9XCJob3ZlcmVkUm93ID0gJGV2ZW50LnRhcmdldFwiIChtb3VzZWxlYXZlKT1cImhvdmVyZWRSb3cgPSBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVSb3dDbGljaygkZXZlbnQsIHJvd0RhdGEpXCIgKGRibGNsaWNrKT1cInJvd0RibGNsaWNrKCRldmVudCxyb3dEYXRhKVwiIChjb250ZXh0bWVudSk9XCJvblJvd1JpZ2h0Q2xpY2soJGV2ZW50LHJvd0RhdGEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktZGF0YXRhYmxlLWV2ZW4nOmV2ZW4sJ3VpLWRhdGF0YWJsZS1vZGQnOm9kZCwndWktc3RhdGUtaG92ZXInOiAoc2VsZWN0aW9uTW9kZSAmJiByb3dFbGVtZW50ID09IGhvdmVyZWRSb3cpLCAndWktc3RhdGUtaGlnaGxpZ2h0JzogaXNTZWxlY3RlZChyb3dEYXRhKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2wgb2YgY29sdW1uc1wiIFtuZ1N0eWxlXT1cImNvbC5zdHlsZVwiIFtjbGFzc109XCJjb2wuc3R5bGVDbGFzc1wiIFtzdHlsZS5kaXNwbGF5XT1cImNvbC5oaWRkZW4gPyAnbm9uZScgOiAndGFibGUtY2VsbCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1lZGl0YWJsZS1jb2x1bW4nOmNvbC5lZGl0YWJsZX1cIiAoY2xpY2spPVwic3dpdGNoQ2VsbFRvRWRpdE1vZGUoJGV2ZW50LnRhcmdldCxjb2wscm93RGF0YSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY29sdW1uLXRpdGxlXCIgKm5nSWY9XCJyZXNwb25zaXZlXCI+e3tjb2wuaGVhZGVyfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNlbGwtZGF0YVwiICpuZ0lmPVwiIWNvbC50ZW1wbGF0ZVwiPnt7cmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLGNvbC5maWVsZCl9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2VsbC1kYXRhXCIgKm5nSWY9XCJjb2wudGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1jb2x1bW5UZW1wbGF0ZUxvYWRlciBbY29sdW1uXT1cImNvbFwiIFtyb3dEYXRhXT1cInJvd0RhdGFcIiBbcm93SW5kZXhdPVwicm93SW5kZXggKyBmaXJzdFwiPjwvcC1jb2x1bW5UZW1wbGF0ZUxvYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidWktY2VsbC1lZGl0b3IgdWktc3RhdGUtaGlnaGxpZ2h0XCIgKm5nSWY9XCJjb2wuZWRpdGFibGVcIiBbKG5nTW9kZWwpXT1cInJvd0RhdGFbY29sLmZpZWxkXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cInN3aXRjaENlbGxUb1ZpZXdNb2RlKCRldmVudC50YXJnZXQsY29sLHJvd0RhdGEsdHJ1ZSlcIiAoa2V5ZG93bik9XCJvbkNlbGxFZGl0b3JLZXlkb3duKCRldmVudCwgY29sLCByb3dEYXRhKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1yb3ctdG9nZ2xlciBmYSBmYS1mdyB1aS1jXCIgW25nQ2xhc3NdPVwieydmYS1jaGV2cm9uLWNpcmNsZS1kb3duJzppc1Jvd0V4cGFuZGVkKHJvd0RhdGEpLCAnZmEtY2hldnJvbi1jaXJjbGUtcmlnaHQnOiAhaXNSb3dFeHBhbmRlZChyb3dEYXRhKX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29sLmV4cGFuZGVyXCIgKGNsaWNrKT1cInRvZ2dsZVJvdyhyb3dEYXRhKVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0lmPVwiZXhwYW5kYWJsZVJvd3MgJiYgaXNSb3dFeHBhbmRlZChyb3dEYXRhKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgW2F0dHIuY29sc3Bhbl09XCJ2aXNpYmxlQ29sdW1ucygpLmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtcm93RXhwYW5zaW9uTG9hZGVyIFtyb3dEYXRhXT1cInJvd0RhdGFcIiBbdGVtcGxhdGVdPVwicm93RXhwYW5zaW9uVGVtcGxhdGVcIj48L3Atcm93RXhwYW5zaW9uTG9hZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS13aWRnZXQtaGVhZGVyIHVpLWRhdGF0YWJsZS1zY3JvbGxhYmxlLWhlYWRlclwiICpuZ0lmPVwic2Nyb2xsYWJsZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kYXRhdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCAjaGVhZGVyQ2VsbCAqbmdGb3I9XCJsZXQgY29sIG9mIGNvbHVtbnNcIiBbbmdTdHlsZV09XCJjb2wuc3R5bGVcIiBbY2xhc3NdPVwiY29sLnN0eWxlQ2xhc3NcIiBbc3R5bGUuZGlzcGxheV09XCJjb2wuaGlkZGVuID8gJ25vbmUnIDogJ3RhYmxlLWNlbGwnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzb3J0KCRldmVudCxjb2wpXCIgKG1vdXNlZW50ZXIpPVwiaG92ZXJlZEhlYWRlciA9ICRldmVudC50YXJnZXRcIiAobW91c2VsZWF2ZSk9XCJob3ZlcmVkSGVhZGVyID0gbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRlZmF1bHQgdWktdW5zZWxlY3RhYmxlLXRleHQnOnRydWUsICd1aS1zdGF0ZS1ob3Zlcic6IGhlYWRlckNlbGwgPT09IGhvdmVyZWRIZWFkZXIgJiYgY29sLnNvcnRhYmxlLCd1aS1zb3J0YWJsZS1jb2x1bW4nOiBjb2wuc29ydGFibGUsJ3VpLXN0YXRlLWFjdGl2ZSc6IGlzU29ydGVkKGNvbCl9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNvbHVtbi10aXRsZVwiPnt7Y29sLmhlYWRlcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zb3J0YWJsZS1jb2x1bW4taWNvbiBmYSBmYS1mdyBmYS1zb3J0XCIgKm5nSWY9XCJjb2wuc29ydGFibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J2ZhLXNvcnQtZGVzYyc6IChjb2wuZmllbGQgPT09IHNvcnRGaWVsZCkgJiYgKHNvcnRPcmRlciA9PSAtMSksJ2ZhLXNvcnQtYXNjJzogKGNvbC5maWVsZCA9PT0gc29ydEZpZWxkKSAmJiAoc29ydE9yZGVyID09IDEpfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBJbnB1dFRleHQgY2xhc3M9XCJ1aS1jb2x1bW4tZmlsdGVyXCIgKm5nSWY9XCJjb2wuZmlsdGVyXCIgKGNsaWNrKT1cIm9uRmlsdGVySW5wdXRDbGljaygkZXZlbnQpXCIgKGtleXVwKT1cIm9uRmlsdGVyS2V5dXAoJGV2ZW50LnRhcmdldC52YWx1ZSwgY29sLmZpZWxkLCBjb2wuZmlsdGVyTWF0Y2hNb2RlKVwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGF0YWJsZS1zY3JvbGxhYmxlLWJvZHlcIiAqbmdJZj1cInNjcm9sbGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInVpLWRhdGF0YWJsZS1kYXRhIHVpLXdpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSBuZ0ZvciBsZXQtcm93RGF0YSBbbmdGb3JPZl09XCJkYXRhVG9SZW5kZXJcIiBsZXQtZXZlbj1cImV2ZW5cIiBsZXQtb2RkPVwib2RkXCIgbGV0LXJvd0luZGV4PVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAjcm93RWxlbWVudCBjbGFzcz1cInVpLXdpZGdldC1jb250ZW50XCIgKG1vdXNlZW50ZXIpPVwiaG92ZXJlZFJvdyA9ICRldmVudC50YXJnZXRcIiAobW91c2VsZWF2ZSk9XCJob3ZlcmVkUm93ID0gbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJoYW5kbGVSb3dDbGljaygkZXZlbnQsIHJvd0RhdGEpXCIgKGRibGNsaWNrKT1cInJvd0RibGNsaWNrKCRldmVudCxyb3dEYXRhKVwiIChjb250ZXh0bWVudSk9XCJvblJvd1JpZ2h0Q2xpY2soJGV2ZW50LHJvd0RhdGEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1kYXRhdGFibGUtZXZlbic6ZXZlbiwndWktZGF0YXRhYmxlLW9kZCc6b2RkLCd1aS1zdGF0ZS1ob3Zlcic6IChzZWxlY3Rpb25Nb2RlICYmIHJvd0VsZW1lbnQgPT0gaG92ZXJlZFJvdyksICd1aS1zdGF0ZS1oaWdobGlnaHQnOiBpc1NlbGVjdGVkKHJvd0RhdGEpfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sIG9mIGNvbHVtbnNcIiBbbmdTdHlsZV09XCJjb2wuc3R5bGVcIiBbY2xhc3NdPVwiY29sLnN0eWxlQ2xhc3NcIiBbc3R5bGUuZGlzcGxheV09XCJjb2wuaGlkZGVuID8gJ25vbmUnIDogJ3RhYmxlLWNlbGwnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1lZGl0YWJsZS1jb2x1bW4nOmNvbC5lZGl0YWJsZX1cIiAoY2xpY2spPVwic3dpdGNoQ2VsbFRvRWRpdE1vZGUoJGV2ZW50LnRhcmdldCxjb2wscm93RGF0YSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jb2x1bW4tdGl0bGVcIiAqbmdJZj1cInJlc3BvbnNpdmVcIj57e2NvbC5oZWFkZXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jZWxsLWRhdGFcIiAqbmdJZj1cIiFjb2wudGVtcGxhdGVcIj57e3Jlc29sdmVGaWVsZERhdGEocm93RGF0YSxjb2wuZmllbGQpfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2VsbC1kYXRhXCIgKm5nSWY9XCJjb2wudGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLWNvbHVtblRlbXBsYXRlTG9hZGVyIFtjb2x1bW5dPVwiY29sXCIgW3Jvd0RhdGFdPVwicm93RGF0YVwiIFtyb3dJbmRleF09XCJyb3dJbmRleCArIGZpcnN0XCI+PC9wLWNvbHVtblRlbXBsYXRlTG9hZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidWktY2VsbC1lZGl0b3IgdWktc3RhdGUtaGlnaGxpZ2h0XCIgKm5nSWY9XCJjb2wuZWRpdGFibGVcIiBbKG5nTW9kZWwpXT1cInJvd0RhdGFbY29sLmZpZWxkXVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwic3dpdGNoQ2VsbFRvVmlld01vZGUoJGV2ZW50LnRhcmdldCxjb2wscm93RGF0YSx0cnVlKVwiIChrZXlkb3duKT1cIm9uQ2VsbEVkaXRvcktleWRvd24oJGV2ZW50LCBjb2wsIHJvd0RhdGEpXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcm93LXRvZ2dsZXIgZmEgZmEtZncgdWktY1wiIFtuZ0NsYXNzXT1cInsnZmEtY2hldnJvbi1jaXJjbGUtZG93bic6aXNSb3dFeHBhbmRlZChyb3dEYXRhKSwgJ2ZhLWNoZXZyb24tY2lyY2xlLXJpZ2h0JzogIWlzUm93RXhwYW5kZWQocm93RGF0YSl9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29sLmV4cGFuZGVyXCIgKGNsaWNrKT1cInRvZ2dsZVJvdyhyb3dEYXRhKVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyICpuZ0lmPVwiZXhwYW5kYWJsZVJvd3MgJiYgaXNSb3dFeHBhbmRlZChyb3dEYXRhKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBbYXR0ci5jb2xzcGFuXT1cImNvbHVtbnMubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLXJvd0V4cGFuc2lvbkxvYWRlciBbcm93RGF0YV09XCJyb3dEYXRhXCIgW3RlbXBsYXRlXT1cInJvd0V4cGFuc2lvblRlbXBsYXRlXCI+PC9wLXJvd0V4cGFuc2lvbkxvYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1wYWdpbmF0b3IgW3Jvd3NdPVwicm93c1wiIFtmaXJzdF09XCJmaXJzdFwiIFt0b3RhbFJlY29yZHNdPVwidG90YWxSZWNvcmRzXCIgW3BhZ2VMaW5rU2l6ZV09XCJwYWdlTGlua3NcIiBzdHlsZUNsYXNzPVwidWktcGFnaW5hdG9yLWJvdHRvbVwiXG4gICAgICAgICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJwYWdpbmF0ZSgkZXZlbnQpXCIgW3Jvd3NQZXJQYWdlT3B0aW9uc109XCJyb3dzUGVyUGFnZU9wdGlvbnNcIiAqbmdJZj1cInBhZ2luYXRvclwiPjwvcC1wYWdpbmF0b3I+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXRhYmxlLWZvb3RlciB1aS13aWRnZXQtaGVhZGVyXCIgKm5nSWY9XCJmb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJmb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUGFnaW5hdG9yLElucHV0VGV4dCxDb2x1bW5UZW1wbGF0ZUxvYWRlcixSb3dFeHBhbnNpb25Mb2FkZXJdLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsQWZ0ZXJWaWV3SW5pdCxPbkluaXQsRG9DaGVjayB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W107XG5cbiAgICBASW5wdXQoKSBwYWdpbmF0b3I6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSByb3dzOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB0b3RhbFJlY29yZHM6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHBhZ2VMaW5rczogbnVtYmVyID0gNTtcblxuICAgIEBJbnB1dCgpIHJvd3NQZXJQYWdlT3B0aW9uczogbnVtYmVyW107XG5cbiAgICBASW5wdXQoKSByZXNwb25zaXZlOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0YWNrZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb246IGFueTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgZWRpdGFibGU6IGJvb2xlYW47XG4gICAgXG4gICAgQE91dHB1dCgpIG9uUm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uUm93U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblJvd1Vuc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblJvd0RibGNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25Db250ZXh0TWVudVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJEZWxheTogbnVtYmVyID0gMzAwO1xuXG4gICAgQElucHV0KCkgbGF6eTogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKSBvbkxhenlMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHJlc2l6YWJsZUNvbHVtbnM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjb2x1bW5SZXNpemVNb2RlOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KCkgb25Db2xSZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgcmVvcmRlcmFibGVDb2x1bW5zOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIG9uQ29sUmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBzY3JvbGxhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2Nyb2xsSGVpZ2h0OiBhbnk7XG5cbiAgICBASW5wdXQoKSBzY3JvbGxXaWR0aDogYW55O1xuXG4gICAgQElucHV0KCkgaGVhZGVyUm93czogYW55O1xuXG4gICAgQElucHV0KCkgZm9vdGVyUm93czogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGdsb2JhbEZpbHRlcjogYW55O1xuXG4gICAgQElucHV0KCkgc29ydE1vZGU6IHN0cmluZyA9ICdzaW5nbGUnO1xuXG4gICAgQElucHV0KCkgc29ydEZpZWxkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzb3J0T3JkZXI6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSBtdWx0aVNvcnRNZXRhOiBTb3J0TWV0YVtdO1xuICAgIFxuICAgIEBJbnB1dCgpIGNvbnRleHRNZW51OiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgY3N2U2VwYXJhdG9yOiBzdHJpbmcgPSAnLCc7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRWRpdEluaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRWRpdENvbXBsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkVkaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRWRpdENhbmNlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uUGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIFxuICAgIEBPdXRwdXQoKSBvblNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAgICAgXG4gICAgQE91dHB1dCgpIG9uRmlsdGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGQoSGVhZGVyKSBoZWFkZXI7XG5cbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyO1xuICAgIFxuICAgIEBJbnB1dCgpIGV4cGFuZGFibGVSb3dzOiBib29sZWFuO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblJvd0V4cGFuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uUm93Q29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHJvd0V4cGFuc2lvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIFxuICAgIHByaXZhdGUgZGF0YVRvUmVuZGVyOiBhbnlbXTtcblxuICAgIHByaXZhdGUgZmlyc3Q6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHBhZ2U6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIGZpbHRlclRpbWVvdXQ6IGFueTtcblxuICAgIHByaXZhdGUgZmlsdGVyczoge1tzOiBzdHJpbmddOiBGaWx0ZXJNZXRhZGF0YTt9ID0ge307XG5cbiAgICBwcml2YXRlIGZpbHRlcmVkVmFsdWU6IGFueVtdO1xuXG4gICAgcHJpdmF0ZSBjb2x1bW5zOiBDb2x1bW5bXTtcblxuICAgIHByaXZhdGUgY29sdW1uc1VwZGF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBwcml2YXRlIHN0b3BTb3J0UHJvcGFnYXRpb246IGJvb2xlYW47XG4gICAgXG4gICAgcHJpdmF0ZSBzb3J0Q29sdW1uOiBDb2x1bW47XG4gICAgXG4gICAgcHJpdmF0ZSBleHBhbmRlZFJvd3M6IGFueVtdO1xuXG4gICAgZGlmZmVyOiBhbnk7XG5cbiAgICBnbG9iYWxGaWx0ZXJGdW5jdGlvbjogYW55O1xuXG4gICAgcHJldmVudEJsdXJPbkVkaXQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIsIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgXG4gICAgICAgIEBRdWVyeShDb2x1bW4pIGNvbHM6IFF1ZXJ5TGlzdDxDb2x1bW4+LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge1xuICAgICAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xuICAgICAgICBjb2xzLmNoYW5nZXMuc3Vic2NyaWJlKF8gPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gY29scy50b0FycmF5KCk7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnNVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQoe1xuICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgICAgIHJvd3M6IHRoaXMucm93cyxcbiAgICAgICAgICAgICAgICBzb3J0RmllbGQ6IHRoaXMuc29ydEZpZWxkLFxuICAgICAgICAgICAgICAgIHNvcnRPcmRlcjogdGhpcy5zb3J0T3JkZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyczogbnVsbCxcbiAgICAgICAgICAgICAgICBtdWx0aVNvcnRNZXRhOiB0aGlzLm11bHRpU29ydE1ldGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZih0aGlzLmNvbHVtbnNVcGRhdGVkKSB7XG4gICAgICAgICAgICBpZih0aGlzLnJlc2l6YWJsZUNvbHVtbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRSZXNpemFibGVDb2x1bW5zKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMucmVvcmRlcmFibGVDb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0Q29sdW1uUmVvcmRlcmluZygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLnNjcm9sbGFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRTY3JvbGxpbmcoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb2x1bW5zVXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZih0aGlzLmdsb2JhbEZpbHRlcikge1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxGaWx0ZXJGdW5jdGlvbiA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZ2xvYmFsRmlsdGVyLCAna2V5dXAnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5maWx0ZXJEZWxheSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgbGV0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIGlmKGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGlmKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3IoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIXRoaXMubGF6eSAmJiAhdGhpcy5zdG9wU29ydFByb3BhZ2F0aW9uICYmICh0aGlzLnNvcnRGaWVsZHx8dGhpcy5tdWx0aVNvcnRNZXRhKSkgeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNvcnRNb2RlID09ICdzaW5nbGUnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMuc29ydE1vZGUgPT0gJ211bHRpcGxlJylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0TXVsdGlwbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIodGhpcy5maWx0ZXJlZFZhbHVlfHx0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zdG9wU29ydFByb3BhZ2F0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNvbHZlRmllbGREYXRhKGRhdGE6IGFueSwgZmllbGQ6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGlmKGRhdGEgJiYgZmllbGQpIHtcbiAgICAgICAgICAgIGlmKGZpZWxkLmluZGV4T2YoJy4nKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ZpZWxkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBmaWVsZHM6IHN0cmluZ1tdID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBkYXRhO1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGZpZWxkcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW2ZpZWxkc1tpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUGFnaW5hdG9yKCkge1xuICAgICAgICAvL3RvdGFsIHJlY29yZHNcbiAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLmxhenkgPyB0aGlzLnRvdGFsUmVjb3JkcyA6ICh0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS5sZW5ndGg6IDApO1xuXG4gICAgICAgIC8vZmlyc3RcbiAgICAgICAgaWYodGhpcy50b3RhbFJlY29yZHMgJiYgdGhpcy5maXJzdCA+PSB0aGlzLnRvdGFsUmVjb3Jkcykge1xuICAgICAgICAgICAgbGV0IG51bWJlck9mUGFnZXMgPSBNYXRoLmNlaWwodGhpcy50b3RhbFJlY29yZHMvdGhpcy5yb3dzKTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBNYXRoLm1heCgobnVtYmVyT2ZQYWdlcy0xKSAqIHRoaXMucm93cywgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYWdpbmF0ZShldmVudCkge1xuICAgICAgICB0aGlzLmZpcnN0ID0gZXZlbnQuZmlyc3Q7XG4gICAgICAgIHRoaXMucm93cyA9IGV2ZW50LnJvd3M7XG5cbiAgICAgICAgaWYodGhpcy5sYXp5KVxuICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFUb1JlbmRlcih0aGlzLmZpbHRlcmVkVmFsdWV8fHRoaXMudmFsdWUpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5vblBhZ2UuZW1pdCh7XG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgIHJvd3M6IHRoaXMucm93c1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhVG9SZW5kZXIoZGF0YXNvdXJjZSkge1xuICAgICAgICBpZih0aGlzLnBhZ2luYXRvciAmJiBkYXRhc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFUb1JlbmRlciA9IFtdO1xuICAgICAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSB0aGlzLmxhenkgPyAwIDogdGhpcy5maXJzdDtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHN0YXJ0SW5kZXg7IGkgPCAoc3RhcnRJbmRleCsgdGhpcy5yb3dzKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYoaSA+PSBkYXRhc291cmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFUb1JlbmRlci5wdXNoKGRhdGFzb3VyY2VbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhVG9SZW5kZXIgPSBkYXRhc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc29ydChldmVudCwgY29sdW1uOiBDb2x1bW4pIHtcbiAgICAgICAgaWYoIWNvbHVtbi5zb3J0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSAodGhpcy5zb3J0RmllbGQgPT09IGNvbHVtbi5maWVsZCkgID8gdGhpcy5zb3J0T3JkZXIgKiAtMSA6IDE7XG4gICAgICAgIHRoaXMuc29ydEZpZWxkID0gY29sdW1uLmZpZWxkO1xuICAgICAgICB0aGlzLnNvcnRDb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIGxldCBtZXRhS2V5ID0gZXZlbnQubWV0YUtleXx8ZXZlbnQuY3RybEtleTtcblxuICAgICAgICBpZih0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc29ydE1vZGUgPT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLm11bHRpU29ydE1ldGF8fCFtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXVsdGlTb3J0TWV0YSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU29ydE1ldGEoe2ZpZWxkOiB0aGlzLnNvcnRGaWVsZCwgb3JkZXI6IHRoaXMuc29ydE9yZGVyfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0TXVsdGlwbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydFNpbmdsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9uU29ydC5lbWl0KHtcbiAgICAgICAgICAgIGZpZWxkOiB0aGlzLnNvcnRGaWVsZCxcbiAgICAgICAgICAgIG9yZGVyOiB0aGlzLnNvcnRPcmRlcixcbiAgICAgICAgICAgIG11bHRpc29ydG1ldGE6IHRoaXMubXVsdGlTb3J0TWV0YVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzb3J0U2luZ2xlKCkge1xuICAgICAgICBpZih0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBpZih0aGlzLnNvcnRDb2x1bW4gJiYgdGhpcy5zb3J0Q29sdW1uLnNvcnRhYmxlID09PSAnY3VzdG9tJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydENvbHVtbi5zb3J0RnVuY3Rpb24uZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLnNvcnRGaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXI6IHRoaXMuc29ydE9yZGVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUxID0gdGhpcy5yZXNvbHZlRmllbGREYXRhKGRhdGExLCB0aGlzLnNvcnRGaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTIgPSB0aGlzLnJlc29sdmVGaWVsZERhdGEoZGF0YTIsIHRoaXMuc29ydEZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlMSBpbnN0YW5jZW9mIFN0cmluZyAmJiB2YWx1ZTIgaW5zdGFuY2VvZiBTdHJpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxIDwgdmFsdWUyKSA/IC0xIDogKHZhbHVlMSA+IHZhbHVlMikgPyAxIDogMDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc29ydE9yZGVyICogcmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5maXJzdCA9IDA7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGFzRmlsdGVyKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3ByZXZlbnQgcmVzb3J0IGF0IG5nRG9DaGVja1xuICAgICAgICB0aGlzLnN0b3BTb3J0UHJvcGFnYXRpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIHNvcnRNdWx0aXBsZSgpIHtcbiAgICAgICAgaWYodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5zb3J0KChkYXRhMSxkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpc29ydEZpZWxkKGRhdGExLCBkYXRhMiwgdGhpcy5tdWx0aVNvcnRNZXRhLCAwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZih0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9wcmV2ZW50IHJlc29ydCBhdCBuZ0RvQ2hlY2tcbiAgICAgICAgdGhpcy5zdG9wU29ydFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBtdWx0aXNvcnRGaWVsZChkYXRhMSxkYXRhMixtdWx0aVNvcnRNZXRhLGluZGV4KSB7XG4gICAgICAgIGxldCB2YWx1ZTEgPSB0aGlzLnJlc29sdmVGaWVsZERhdGEoZGF0YTEsIG11bHRpU29ydE1ldGFbaW5kZXhdLmZpZWxkKTtcbiAgICAgICAgbGV0IHZhbHVlMiA9IHRoaXMucmVzb2x2ZUZpZWxkRGF0YShkYXRhMiwgbXVsdGlTb3J0TWV0YVtpbmRleF0uZmllbGQpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlMSA9PSAnc3RyaW5nJyB8fCB2YWx1ZTEgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZTEubG9jYWxlQ29tcGFyZSAmJiAodmFsdWUxICE9IHZhbHVlMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG11bHRpU29ydE1ldGFbaW5kZXhdLm9yZGVyICogdmFsdWUxLmxvY2FsZUNvbXBhcmUodmFsdWUyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxIDwgdmFsdWUyKSA/IC0xIDogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHZhbHVlMSA9PSB2YWx1ZTIpICB7XG4gICAgICAgICAgICByZXR1cm4gKG11bHRpU29ydE1ldGEubGVuZ3RoIC0gMSkgPiAoaW5kZXgpID8gKHRoaXMubXVsdGlzb3J0RmllbGQoZGF0YTEsIGRhdGEyLCBtdWx0aVNvcnRNZXRhLCBpbmRleCArIDEpKSA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKG11bHRpU29ydE1ldGFbaW5kZXhdLm9yZGVyICogcmVzdWx0KTtcbiAgICB9XG5cbiAgICBhZGRTb3J0TWV0YShtZXRhKSB7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5tdWx0aVNvcnRNZXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0aGlzLm11bHRpU29ydE1ldGFbaV0uZmllbGQgPT09IG1ldGEuZmllbGQpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihpbmRleCA+PSAwKVxuICAgICAgICAgICAgdGhpcy5tdWx0aVNvcnRNZXRhW2luZGV4XSA9IG1ldGE7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMubXVsdGlTb3J0TWV0YS5wdXNoKG1ldGEpO1xuICAgIH1cblxuICAgIGlzU29ydGVkKGNvbHVtbjogQ29sdW1uKSB7XG4gICAgICAgIGlmKHRoaXMuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuc29ydEZpZWxkICYmIGNvbHVtbi5maWVsZCA9PT0gdGhpcy5zb3J0RmllbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgbGV0IHNvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYodGhpcy5tdWx0aVNvcnRNZXRhKcKge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5tdWx0aVNvcnRNZXRhW2ldLmZpZWxkID09IGNvbHVtbi5maWVsZCnCoHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzb3J0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTb3J0T3JkZXIoY29sdW1uOiBDb2x1bW4pIHtcbiAgICAgICAgbGV0IG9yZGVyID0gMDtcbiAgICAgICAgaWYodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc29ydEZpZWxkICYmIGNvbHVtbi5maWVsZCA9PT0gdGhpcy5zb3J0RmllbGQpIHtcbiAgICAgICAgICAgICAgICBvcmRlciA9IHRoaXMuc29ydE9yZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgaWYodGhpcy5tdWx0aVNvcnRNZXRhKcKge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5tdWx0aVNvcnRNZXRhW2ldLmZpZWxkID09IGNvbHVtbi5maWVsZCnCoHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyID0gdGhpcy5tdWx0aVNvcnRNZXRhW2ldLm9yZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yZGVyO1xuICAgIH1cblxuICAgIGhhbmRsZVJvd0NsaWNrKGV2ZW50LCByb3dEYXRhKSB7XG4gICAgICAgIHRoaXMub25Sb3dDbGljay5uZXh0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgZGF0YTogcm93RGF0YX0pO1xuICAgICAgICBcbiAgICAgICAgaWYoIXRoaXMuc2VsZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IGV2ZW50LnRhcmdldC5ub2RlTmFtZTtcbiAgICAgICAgaWYodGFyZ2V0Tm9kZSA9PSAnSU5QVVQnwqB8fCB0YXJnZXROb2RlID09ICdCVVRUT04nIHx8wqB0YXJnZXROb2RlID09ICdBJyBcbiAgICAgICAgICAgIHx8wqAodGhpcy5kb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3VpLWMnKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3Rpb25JbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24ocm93RGF0YSk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHNlbGVjdGlvbkluZGV4ICE9IC0xO1xuICAgICAgICBsZXQgbWV0YUtleSA9IChldmVudC5tZXRhS2V5fHxldmVudC5jdHJsS2V5KTtcblxuICAgICAgICBpZihzZWxlY3RlZCAmJiBtZXRhS2V5KSB7XG4gICAgICAgICAgICBpZih0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5zcGxpY2Uoc2VsZWN0aW9uSW5kZXgsMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Sb3dVbnNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgZGF0YTogcm93RGF0YX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gcm93RGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHJvd0RhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9ICghbWV0YUtleSkgPyBbXSA6IHRoaXMuc2VsZWN0aW9ufHxbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5wdXNoKHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBkYXRhOiByb3dEYXRhfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25Sb3dSaWdodENsaWNrKGV2ZW50LCByb3dEYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuY29udGV4dE1lbnUpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3Rpb25JbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24ocm93RGF0YSk7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSBzZWxlY3Rpb25JbmRleCAhPSAtMTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIXNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHJvd0RhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnB1c2gocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5zaG93KGV2ZW50KTsgICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMub25Db250ZXh0TWVudVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgZGF0YTogcm93RGF0YX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcm93RGJsY2xpY2soZXZlbnQsIHJvd0RhdGEpIHtcbiAgICAgICAgdGhpcy5vblJvd0RibGNsaWNrLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBkYXRhOiByb3dEYXRhfSk7XG4gICAgfVxuXG4gICAgaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJztcbiAgICB9XG5cbiAgICBpc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpcGxlJztcbiAgICB9XG5cbiAgICBmaW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcblxuICAgICAgICBpZih0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9ICh0aGlzLnNlbGVjdGlvbiA9PSByb3dEYXRhKSA/IDAgOiAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgIDwgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3Rpb25baV0gPT0gcm93RGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChyb3dEYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpICE9IC0xO1xuICAgIH1cblxuICAgIG9uRmlsdGVyS2V5dXAodmFsdWUsIGZpZWxkLCBtYXRjaE1vZGUpIHtcbiAgICAgICAgaWYodGhpcy5maWx0ZXJUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5maWx0ZXJUaW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlsdGVyVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzW2ZpZWxkXSA9IHt2YWx1ZTogdmFsdWUsIG1hdGNoTW9kZTogbWF0Y2hNb2RlfTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyKCk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9LCB0aGlzLmZpbHRlckRlbGF5KTtcbiAgICB9XG5cbiAgICBmaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuZmlyc3QgPSAwO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBbXTtcblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGdsb2JhbE1hdGNoID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2wgPSB0aGlzLmNvbHVtbnNbal0sXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlck1ldGEgPSB0aGlzLmZpbHRlcnNbY29sLmZpZWxkXTtcblxuICAgICAgICAgICAgICAgICAgICAvL2xvY2FsXG4gICAgICAgICAgICAgICAgICAgIGlmKGZpbHRlck1ldGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IGZpbHRlck1ldGEudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJGaWVsZCA9IGNvbC5maWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlck1hdGNoTW9kZSA9IGZpbHRlck1ldGEubWF0Y2hNb2RlfHwnc3RhcnRzV2l0aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhRmllbGRWYWx1ZSA9IHRoaXMucmVzb2x2ZUZpZWxkRGF0YSh0aGlzLnZhbHVlW2ldLCBmaWx0ZXJGaWVsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJDb25zdHJhaW50ID0gdGhpcy5maWx0ZXJDb25zdHJhaW50c1tmaWx0ZXJNYXRjaE1vZGVdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighZmlsdGVyQ29uc3RyYWludChkYXRhRmllbGRWYWx1ZSwgZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighbG9jYWxNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9nbG9iYWxcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5nbG9iYWxGaWx0ZXIgJiYgIWdsb2JhbE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxNYXRjaCA9IHRoaXMuZmlsdGVyQ29uc3RyYWludHNbJ2NvbnRhaW5zJ10odGhpcy5yZXNvbHZlRmllbGREYXRhKHRoaXMudmFsdWVbaV0sIGNvbC5maWVsZCksIHRoaXMuZ2xvYmFsRmlsdGVyLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBtYXRjaGVzID0gbG9jYWxNYXRjaDtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdsb2JhbEZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gbG9jYWxNYXRjaCYmZ2xvYmFsTWF0Y2g7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYobWF0Y2hlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUucHVzaCh0aGlzLnZhbHVlW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuZmlsdGVyZWRWYWx1ZS5sZW5ndGggPT09IHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9IHRoaXMuZmlsdGVyZWRWYWx1ZSA/IHRoaXMuZmlsdGVyZWRWYWx1ZS5sZW5ndGg6IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aDogMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIodGhpcy5maWx0ZXJlZFZhbHVlfHx0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5vbkZpbHRlci5lbWl0KHtcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZmlsdGVyc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYXNGaWx0ZXIoKSB7XG4gICAgICAgIGxldCBlbXB0eSA9IHRydWU7XG4gICAgICAgIGZvcihsZXQgcHJvcCBpbiB0aGlzLmZpbHRlcnMpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZmlsdGVycy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgIGVtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gIWVtcHR5O1xuICAgIH1cblxuICAgIG9uRmlsdGVySW5wdXRDbGljayhldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJDb25zdHJhaW50cyA9IHtcblxuICAgICAgICBzdGFydHNXaXRoKHZhbHVlLCBmaWx0ZXIpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGlmKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuc2xpY2UoMCwgZmlsdGVyVmFsdWUubGVuZ3RoKSA9PT0gZmlsdGVyVmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29udGFpbnModmFsdWUsIGZpbHRlcik6IGJvb2xlYW4ge1xuICAgICAgICAgICAgaWYoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsIHx8IGZpbHRlci50cmltKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xuICAgICAgICB9LFxuXG4gICAgICAgIGVuZHNXaXRoKHZhbHVlLCBmaWx0ZXIpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGlmKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlclZhbHVlLCB2YWx1ZS5sZW5ndGggLSBmaWx0ZXJWYWx1ZS5sZW5ndGgpICE9PSAtMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaENlbGxUb0VkaXRNb2RlKGVsZW1lbnQ6IGFueSwgY29sdW1uOiBDb2x1bW4sIHJvd0RhdGE6IGFueSkge1xuICAgICAgICBpZighdGhpcy5zZWxlY3Rpb25Nb2RlICYmIHRoaXMuZWRpdGFibGUgJiYgY29sdW1uLmVkaXRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm9uRWRpdEluaXQuZW1pdCh7Y29sdW1uOiBjb2x1bW4sIGRhdGE6IHJvd0RhdGF9KTtcbiAgICAgICAgICAgIGxldCBjZWxsID0gdGhpcy5maW5kQ2VsbChlbGVtZW50KTtcbiAgICAgICAgICAgIGlmKCF0aGlzLmRvbUhhbmRsZXIuaGFzQ2xhc3MoY2VsbCwgJ3VpLWNlbGwtZWRpdGluZycpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLmFkZENsYXNzKGNlbGwsICd1aS1jZWxsLWVkaXRpbmcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIuYWRkQ2xhc3MoY2VsbCwgJ3VpLXN0YXRlLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgICAgIGxldCBlZGl0b3IgPSBjZWxsLnF1ZXJ5U2VsZWN0b3IoJy51aS1jZWxsLWVkaXRvcicpLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzd2l0Y2hDZWxsVG9WaWV3TW9kZShlbGVtZW50OiBhbnksIGNvbHVtbjogQ29sdW1uLCByb3dEYXRhOiBhbnksIGNvbXBsZXRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmKHRoaXMuZWRpdGFibGUpIHtcbiAgICAgICAgICAgIGlmKHRoaXMucHJldmVudEJsdXJPbkVkaXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRCbHVyT25FZGl0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihjb21wbGV0ZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVkaXRDb21wbGV0ZS5lbWl0KHtjb2x1bW46IGNvbHVtbiwgZGF0YTogcm93RGF0YX0pO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVkaXRDYW5jZWwuZW1pdCh7Y29sdW1uOiBjb2x1bW4sIGRhdGE6IHJvd0RhdGF9KTtcblxuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gdGhpcy5maW5kQ2VsbChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoY2VsbCwgJ3VpLWNlbGwtZWRpdGluZycpO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9tSGFuZGxlci5yZW1vdmVDbGFzcyhjZWxsLCAndWktc3RhdGUtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNlbGxFZGl0b3JLZXlkb3duKGV2ZW50LCBjb2x1bW46IENvbHVtbiwgcm93RGF0YTogYW55KSB7XG4gICAgICAgIGlmKHRoaXMuZWRpdGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMub25FZGl0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LGNvbHVtbjogY29sdW1uLCBkYXRhOiByb3dEYXRhfSk7XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIGlmKGV2ZW50LmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN3aXRjaENlbGxUb1ZpZXdNb2RlKGV2ZW50LnRhcmdldCwgY29sdW1uLCByb3dEYXRhLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRCbHVyT25FZGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vZXNjYXBlXG4gICAgICAgICAgICBpZihldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hDZWxsVG9WaWV3TW9kZShldmVudC50YXJnZXQsIGNvbHVtbiwgcm93RGF0YSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmVudEJsdXJPbkVkaXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZENlbGwoZWxlbWVudCkge1xuICAgICAgICBsZXQgY2VsbCA9IGVsZW1lbnQ7XG4gICAgICAgIHdoaWxlKGNlbGwudGFnTmFtZSAhPSAnVEQnKSB7XG4gICAgICAgICAgICBjZWxsID0gY2VsbC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuXG4gICAgaW5pdFJlc2l6YWJsZUNvbHVtbnMoKSB7XG4gICAgICAgIGpRdWVyeSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0pLnB1aWNvbHJlc2l6ZSh7XG4gICAgICAgICAgICBtb2RlOiB0aGlzLmNvbHVtblJlc2l6ZU1vZGUsXG4gICAgICAgICAgICBjb2xSZXNpemU6IChldmVudDogRXZlbnQsIHVpOiBQcmltZVVJLkNvbFJlc2l6ZUV2ZW50UGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbFJlc2l6ZS5lbWl0KHVpLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0Q29sdW1uUmVvcmRlcmluZygpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSkucHVpY29scmVvcmRlcih7XG4gICAgICAgICAgICBjb2xSZW9yZGVyOiAoZXZlbnQ6IEV2ZW50LCB1aTogUHJpbWVVSS5Db2xSZW9yZGVyRXZlbnRQYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgICAvL3JpZ2h0XG4gICAgICAgICAgICAgICAgaWYodWkuZHJvcFNpZGUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sdW1ucy5zcGxpY2UodWkuZHJvcEluZGV4ICsgMSwgMCwgdGhpcy5jb2x1bW5zLnNwbGljZSh1aS5kcmFnSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9sZWZ0XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sdW1ucy5zcGxpY2UodWkuZHJvcEluZGV4LCAwLCB0aGlzLmNvbHVtbnMuc3BsaWNlKHVpLmRyYWdJbmRleCwgMSlbMF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25Db2xSZW9yZGVyLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBkcmFnSW5kZXg6IHVpLmRyYWdJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZHJvcEluZGV4OiB1aS5kcm9wSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY29sdW1uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0U2Nyb2xsaW5nKCkge1xuICAgICAgICBqUXVlcnkodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKS5wdWl0YWJsZXNjcm9sbCh7XG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQ6IHRoaXMuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgICAgc2Nyb2xsV2lkdGg6IHRoaXMuc2Nyb2xsV2lkdGhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFzRm9vdGVyKCkge1xuICAgICAgICBpZih0aGlzLmZvb3RlclJvd3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYodGhpcy5jb2x1bW5zKcKge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY29sdW1uc1tpXS5mb290ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5kYXRhVG9SZW5kZXJ8fCh0aGlzLmRhdGFUb1JlbmRlci5sZW5ndGggPT0gMCk7XG4gICAgfVxuXG4gICAgY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpOiBMYXp5TG9hZEV2ZW50IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzLFxuICAgICAgICAgICAgc29ydEZpZWxkOiB0aGlzLnNvcnRGaWVsZCxcbiAgICAgICAgICAgIHNvcnRPcmRlcjogdGhpcy5zb3J0T3JkZXIsXG4gICAgICAgICAgICBmaWx0ZXJzOiB0aGlzLmZpbHRlcnMsXG4gICAgICAgICAgICBtdWx0aVNvcnRNZXRhOiB0aGlzLm11bHRpU29ydE1ldGFcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgdG9nZ2xlUm93KHJvdzogYW55KSB7XG4gICAgICAgIGlmKCF0aGlzLmV4cGFuZGVkUm93cykge1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd3MgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGV4cGFuZGVkUm93SW5kZXggPSB0aGlzLmZpbmRFeHBhbmRlZFJvd0luZGV4KHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZihleHBhbmRlZFJvd0luZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkUm93cy5zcGxpY2UoZXhwYW5kZWRSb3dJbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLm9uUm93Q29sbGFwc2UuZW1pdChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd3MucHVzaChyb3cpO1xuICAgICAgICAgICAgdGhpcy5vblJvd0V4cGFuZC5lbWl0KHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZmluZEV4cGFuZGVkUm93SW5kZXgocm93OiBhbnkpOiBudW1iZXIge1xuICAgICAgICBsZXQgaW5kZXggPSAtMVxuICAgICAgICBpZih0aGlzLmV4cGFuZGVkUm93cykge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZXhwYW5kZWRSb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5leHBhbmRlZFJvd3NbaV0gPT0gcm93KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgXG4gICAgaXNSb3dFeHBhbmRlZChyb3cpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEV4cGFuZGVkUm93SW5kZXgocm93KSAhPSAtMTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnNvcnRGaWVsZCA9IG51bGw7XG4gICAgICAgIHRoaXMuc29ydE9yZGVyID0gMTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmlsdGVyZWRWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHt9O1xuXG4gICAgICAgIGlmKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRlKHtcbiAgICAgICAgICAgICAgICBmaXJzdDogMCxcbiAgICAgICAgICAgICAgICByb3dzOiB0aGlzLnJvd3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhVG9SZW5kZXIodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2aXNpYmxlQ29sdW1ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1ucy5maWx0ZXIoYyA9PiAhYy5oaWRkZW4pO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZXhwb3J0Q1NWKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMudmFsdWUsXG4gICAgICAgIGNzdiA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuICAgICAgICBcbiAgICAgICAgLy9oZWFkZXJzXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY29sdW1uc1tpXS5maWVsZCkge1xuICAgICAgICAgICAgICAgIGNzdiArPSB0aGlzLmNvbHVtbnNbaV0uZmllbGQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoaSA8ICh0aGlzLmNvbHVtbnMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3N2ICs9IHRoaXMuY3N2U2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9ib2R5ICAgICAgICBcbiAgICAgICAgdGhpcy52YWx1ZS5mb3JFYWNoKChyZWNvcmQsIGkpID0+IHtcbiAgICAgICAgICAgIGNzdiArPSAnXFxuJztcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbHVtbnNbaV0uZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3N2ICs9IHRoaXMucmVzb2x2ZUZpZWxkRGF0YShyZWNvcmQsIHRoaXMuY29sdW1uc1tpXS5maWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihpIDwgKHRoaXMuY29sdW1ucy5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3N2ICs9IHRoaXMuY3N2U2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHdpbmRvdy5vcGVuKGVuY29kZVVSSShjc3YpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYodGhpcy5yZXNpemFibGVDb2x1bW5zKSB7XG4gICAgICAgICAgICBqUXVlcnkodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKS5wdWljb2xyZXNpemUoJ2Rlc3Ryb3knKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMucmVvcmRlcmFibGVDb2x1bW5zKSB7XG4gICAgICAgICAgICBqUXVlcnkodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKS5wdWljb2xyZW9yZGVyKCdkZXN0cm95Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3JlbW92ZSBldmVudCBsaXN0ZW5lclxuICAgICAgICBpZih0aGlzLmdsb2JhbEZpbHRlckZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbEZpbHRlckZ1bmN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
