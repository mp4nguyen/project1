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
var router_deprecated_1 = require('angular2/router-deprecated');
var datatable_1 = require('../../../components/datatable/datatable');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var column_1 = require('../../../components/column/column');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var DataTableGroupDemo = (function () {
    function DataTableGroupDemo() {
    }
    DataTableGroupDemo.prototype.ngOnInit = function () {
        this.sales = [
            { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
            { brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
            { brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
            { brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,' },
            { brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' },
            { brand: 'LG', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005' },
            { brand: 'Sharp', lastYearSale: '82%', thisYearSale: '12%', lastYearProfit: '$131,211', thisYearProfit: '$100,214' },
            { brand: 'Panasonic', lastYearSale: '44%', thisYearSale: '45%', lastYearProfit: '$66,442', thisYearProfit: '$53,322' },
            { brand: 'HTC', lastYearSale: '90%', thisYearSale: '56%', lastYearProfit: '$765,442', thisYearProfit: '$296,232' },
            { brand: 'Toshiba', lastYearSale: '75%', thisYearSale: '54%', lastYearProfit: '$21,212', thisYearProfit: '$12,533' }
        ];
        this.headerRows = [
            {
                columns: [
                    { header: 'Brand', rowspan: 3 },
                    { header: 'Sale Rate', colspan: 4 }
                ]
            },
            {
                columns: [
                    { header: 'Brand', colspan: 2 },
                    { header: 'Sale Rate', colspan: 2 }
                ]
            },
            {
                columns: [
                    { header: 'Last Year' },
                    { header: 'This Year' },
                    { header: 'Last Year' },
                    { header: 'This Year' }
                ]
            }
        ];
        this.footerRows = [
            {
                columns: [
                    { footer: 'Totals:', colspan: 3 },
                    { footer: '$506,202' },
                    { footer: '$531,020' }
                ]
            }
        ];
    };
    DataTableGroupDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablegroupdemo.html',
            directives: [datatable_1.DataTable, column_1.Column, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableGroupDemo);
    return DataTableGroupDemo;
}());
exports.DataTableGroupDemo = DataTableGroupDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZGF0YXRhYmxlL2RhdGF0YWJsZWdyb3VwZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBQzdELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELDJDQUErQiw4QkFBOEIsQ0FBQyxDQUFBO0FBTTlEO0lBQUE7SUF1REEsQ0FBQztJQS9DRyxxQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFDO1lBQ25ILEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDO1lBQ3BILEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFDO1lBQ2xILEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFDO1lBQ3JILEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFDO1lBQ2hILEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDO1lBQ2hILEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDO1lBQ2xILEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFDO1lBQ3BILEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDO1lBQ2hILEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFDO1NBQ3JILENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2Q7Z0JBQ0ksT0FBTyxFQUFFO29CQUNMLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDO29CQUM3QixFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQztpQkFDcEM7YUFDSjtZQUNEO2dCQUNJLE9BQU8sRUFBRTtvQkFDTCxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQztvQkFDN0IsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUM7aUJBQ3BDO2FBQ0o7WUFDRDtnQkFDSSxPQUFPLEVBQUU7b0JBQ0wsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFDO29CQUNyQixFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUM7b0JBQ3JCLEVBQUMsTUFBTSxFQUFFLFdBQVcsRUFBQztvQkFDckIsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFDO2lCQUN4QjthQUNKO1NBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDZDtnQkFDSSxPQUFPLEVBQUU7b0JBQ0wsRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUM7b0JBQy9CLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQztvQkFDcEIsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDO2lCQUN2QjthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7SUExREw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLGlEQUFpRDtZQUM5RCxVQUFVLEVBQUUsQ0FBQyxxQkFBUyxFQUFDLGVBQU0sRUFBQyw2Q0FBZ0IsRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUNyRyxDQUFDOzswQkFBQTtJQXdERix5QkFBQztBQUFELENBdkRBLEFBdURDLElBQUE7QUF2RFksMEJBQWtCLHFCQXVEOUIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2RhdGF0YWJsZS9kYXRhdGFibGVncm91cGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtEYXRhVGFibGV9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZGF0YXRhYmxlL2RhdGF0YWJsZSc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Q29sdW1ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbHVtbi9jb2x1bW4nO1xuaW1wb3J0IHtEYXRhVGFibGVTdWJtZW51fSBmcm9tICcuL2RhdGF0YWJsZXN1Ym1lbnUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2RhdGF0YWJsZS9kYXRhdGFibGVncm91cGRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0RhdGFUYWJsZSxDb2x1bW4sRGF0YVRhYmxlU3VibWVudSxUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlR3JvdXBEZW1vIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHNhbGVzOiBhbnlbXTtcblxuICAgIGhlYWRlclJvd3M6IGFueVtdO1xuICAgIFxuICAgIGZvb3RlclJvd3M6IGFueVtdO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2FsZXMgPSBbXG4gICAgICAgICAgICB7YnJhbmQ6ICdBcHBsZScsIGxhc3RZZWFyU2FsZTogJzUxJScsIHRoaXNZZWFyU2FsZTogJzQwJScsIGxhc3RZZWFyUHJvZml0OiAnJDU0LDQwNi4wMCcsIHRoaXNZZWFyUHJvZml0OiAnJDQzLDM0Mid9LFxuICAgICAgICAgICAge2JyYW5kOiAnU2Ftc3VuZycsIGxhc3RZZWFyU2FsZTogJzgzJScsIHRoaXNZZWFyU2FsZTogJzk2JScsIGxhc3RZZWFyUHJvZml0OiAnJDQyMywxMzInLCB0aGlzWWVhclByb2ZpdDogJyQzMTIsMTIyJ30sXG4gICAgICAgICAgICB7YnJhbmQ6ICdNaWNyb3NvZnQnLCBsYXN0WWVhclNhbGU6ICczOCUnLCB0aGlzWWVhclNhbGU6ICc1JScsIGxhc3RZZWFyUHJvZml0OiAnJDEyLDMyMScsIHRoaXNZZWFyUHJvZml0OiAnJDgsNTAwJ30sXG4gICAgICAgICAgICB7YnJhbmQ6ICdQaGlsaXBzJywgbGFzdFllYXJTYWxlOiAnNDklJywgdGhpc1llYXJTYWxlOiAnMjIlJywgbGFzdFllYXJQcm9maXQ6ICckNzQ1LDIzMicsIHRoaXNZZWFyUHJvZml0OiAnJDY1MCwzMjMsJ30sXG4gICAgICAgICAgICB7YnJhbmQ6ICdTb25nJywgbGFzdFllYXJTYWxlOiAnMTclJywgdGhpc1llYXJTYWxlOiAnNzklJywgbGFzdFllYXJQcm9maXQ6ICckNjQzLDI0MicsIHRoaXNZZWFyUHJvZml0OiAnNTAwLDMzMid9LFxuICAgICAgICAgICAge2JyYW5kOiAnTEcnLCBsYXN0WWVhclNhbGU6ICc1MiUnLCB0aGlzWWVhclNhbGU6ICcgNjUlJywgbGFzdFllYXJQcm9maXQ6ICckNDIxLDEzMicsIHRoaXNZZWFyUHJvZml0OiAnJDE1MCwwMDUnfSxcbiAgICAgICAgICAgIHticmFuZDogJ1NoYXJwJywgbGFzdFllYXJTYWxlOiAnODIlJywgdGhpc1llYXJTYWxlOiAnMTIlJywgbGFzdFllYXJQcm9maXQ6ICckMTMxLDIxMScsIHRoaXNZZWFyUHJvZml0OiAnJDEwMCwyMTQnfSxcbiAgICAgICAgICAgIHticmFuZDogJ1BhbmFzb25pYycsIGxhc3RZZWFyU2FsZTogJzQ0JScsIHRoaXNZZWFyU2FsZTogJzQ1JScsIGxhc3RZZWFyUHJvZml0OiAnJDY2LDQ0MicsIHRoaXNZZWFyUHJvZml0OiAnJDUzLDMyMid9LFxuICAgICAgICAgICAge2JyYW5kOiAnSFRDJywgbGFzdFllYXJTYWxlOiAnOTAlJywgdGhpc1llYXJTYWxlOiAnNTYlJywgbGFzdFllYXJQcm9maXQ6ICckNzY1LDQ0MicsIHRoaXNZZWFyUHJvZml0OiAnJDI5NiwyMzInfSxcbiAgICAgICAgICAgIHticmFuZDogJ1Rvc2hpYmEnLCBsYXN0WWVhclNhbGU6ICc3NSUnLCB0aGlzWWVhclNhbGU6ICc1NCUnLCBsYXN0WWVhclByb2ZpdDogJyQyMSwyMTInLCB0aGlzWWVhclByb2ZpdDogJyQxMiw1MzMnfVxuICAgICAgICBdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5oZWFkZXJSb3dzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAge2hlYWRlcjogJ0JyYW5kJywgcm93c3BhbjogM30sXG4gICAgICAgICAgICAgICAgICAgIHtoZWFkZXI6ICdTYWxlIFJhdGUnLCBjb2xzcGFuOiA0fVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICB7aGVhZGVyOiAnQnJhbmQnLCBjb2xzcGFuOiAyfSxcbiAgICAgICAgICAgICAgICAgICAge2hlYWRlcjogJ1NhbGUgUmF0ZScsIGNvbHNwYW46IDJ9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtoZWFkZXI6ICdMYXN0IFllYXInfSxcbiAgICAgICAgICAgICAgICAgICAge2hlYWRlcjogJ1RoaXMgWWVhcid9LFxuICAgICAgICAgICAgICAgICAgICB7aGVhZGVyOiAnTGFzdCBZZWFyJ30sXG4gICAgICAgICAgICAgICAgICAgIHtoZWFkZXI6ICdUaGlzIFllYXInfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZm9vdGVyUm93cyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtmb290ZXI6ICdUb3RhbHM6JywgY29sc3BhbjogM30sXG4gICAgICAgICAgICAgICAgICAgIHtmb290ZXI6ICckNTA2LDIwMid9LFxuICAgICAgICAgICAgICAgICAgICB7Zm9vdGVyOiAnJDUzMSwwMjAnfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XG59XG4iXX0=
