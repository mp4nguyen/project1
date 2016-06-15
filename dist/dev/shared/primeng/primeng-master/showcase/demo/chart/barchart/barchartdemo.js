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
var barchart_1 = require('../../../../components/chart/barchart/barchart');
var codehighlighter_1 = require('../../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../../components/tabview/tabview');
var tabpanel_1 = require('../../../../components/tabview/tabpanel');
var growl_1 = require('../../../../components/growl/growl');
var button_1 = require('../../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var BarChartDemo = (function () {
    function BarChartDemo() {
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fillColor: '#42A5F5',
                    strokeColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    fillColor: '#9CCC65',
                    strokeColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
    }
    BarChartDemo.prototype.onSelect = function (event) {
        if (event.bars) {
            this.msgs = [];
            for (var i = 0; i < event.bars.length; i++) {
                this.msgs.push({ severity: 'info', summary: 'Bar Selected', 'detail': event.bars[i].label + ' ' + event.bars[i].value });
            }
        }
    };
    BarChartDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/chart/barchart/barchartdemo.html',
            directives: [barchart_1.BarChart, button_1.Button, growl_1.Growl, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], BarChartDemo);
    return BarChartDemo;
}());
exports.BarChartDemo = BarChartDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2hhcnQvYmFyY2hhcnQvYmFyY2hhcnRkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLGdEQUFnRCxDQUFDLENBQUE7QUFDeEUsZ0NBQThCLHdEQUF3RCxDQUFDLENBQUE7QUFDdkYsd0JBQXNCLHdDQUF3QyxDQUFDLENBQUE7QUFDL0QseUJBQXVCLHlDQUF5QyxDQUFDLENBQUE7QUFDakUsc0JBQW9CLG9DQUFvQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLHNDQUFzQyxDQUFDLENBQUE7QUFFNUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFNSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDUixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDeEUsUUFBUSxFQUFFO2dCQUNOO29CQUNJLEtBQUssRUFBRSxrQkFBa0I7b0JBQ3pCLFNBQVMsRUFBRSxTQUFTO29CQUNwQixXQUFXLEVBQUUsU0FBUztvQkFDdEIsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO2lCQUNyQztnQkFDRDtvQkFDSSxLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixTQUFTLEVBQUUsU0FBUztvQkFDcEIsV0FBVyxFQUFFLFNBQVM7b0JBQ3RCLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztpQkFDckM7YUFDSjtTQUNKLENBQUE7SUFDTCxDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUFTLEtBQUs7UUFDVixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2YsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUMzSCxDQUFDO1FBRUwsQ0FBQztJQUNMLENBQUM7SUF0Q0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLGdEQUFnRDtZQUM3RCxVQUFVLEVBQUUsQ0FBQyxtQkFBUSxFQUFDLGVBQU0sRUFBQyxhQUFLLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDekYsQ0FBQzs7b0JBQUE7SUFvQ0YsbUJBQUM7QUFBRCxDQW5DQSxBQW1DQyxJQUFBO0FBbkNZLG9CQUFZLGVBbUN4QixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2hhcnQvYmFyY2hhcnQvYmFyY2hhcnRkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtCYXJDaGFydH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jaGFydC9iYXJjaGFydC9iYXJjaGFydCc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7R3Jvd2x9IGZyb20gJy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvZ3Jvd2wvZ3Jvd2wnO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL21lc3NhZ2UnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vY2hhcnQvYmFyY2hhcnQvYmFyY2hhcnRkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtCYXJDaGFydCxCdXR0b24sR3Jvd2wsVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIEJhckNoYXJ0RGVtbyB7XG5cbiAgICBkYXRhOiBhbnk7XG5cbiAgICBtc2dzOiBNZXNzYWdlW107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kYXRhID0ge1xuICAgICAgICAgICAgbGFiZWxzOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseSddLFxuICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTXkgRmlyc3QgZGF0YXNldCcsXG4gICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogJyM0MkE1RjUnLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogJyMxRTg4RTUnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbNjUsIDU5LCA4MCwgODEsIDU2LCA1NSwgNDBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTXkgU2Vjb25kIGRhdGFzZXQnLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjOUNDQzY1JyxcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICcjN0NCMzQyJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogWzI4LCA0OCwgNDAsIDE5LCA4NiwgMjcsIDkwXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIGlmKGV2ZW50LmJhcnMpIHtcbiAgICAgICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGV2ZW50LmJhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6ICdpbmZvJywgc3VtbWFyeTogJ0JhciBTZWxlY3RlZCcsICdkZXRhaWwnOiBldmVudC5iYXJzW2ldLmxhYmVsICsgJyAnICsgZXZlbnQuYmFyc1tpXS52YWx1ZX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG59Il19
