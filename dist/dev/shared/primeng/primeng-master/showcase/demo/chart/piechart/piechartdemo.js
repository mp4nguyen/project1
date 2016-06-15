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
var piechart_1 = require('../../../../components/chart/piechart/piechart');
var codehighlighter_1 = require('../../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../../components/tabview/tabview');
var tabpanel_1 = require('../../../../components/tabview/tabpanel');
var growl_1 = require('../../../../components/growl/growl');
var button_1 = require('../../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var PieChartDemo = (function () {
    function PieChartDemo() {
        this.data1 = [{
                value: 300,
                color: '#F7464A',
                highlight: '#FF5A5E',
                label: 'Red'
            },
            {
                value: 50,
                color: '#46BFBD',
                highlight: '#5AD3D1',
                label: 'Green'
            },
            {
                value: 100,
                color: '#FDB45C',
                highlight: '#FFC870',
                label: 'Yellow'
            }];
        this.data2 = [{
                value: 125,
                color: '#2196F3',
                highlight: '#64B5F6',
                label: 'Comedy'
            },
            {
                value: 50,
                color: '#673AB7',
                highlight: '#9575CD',
                label: 'Drama'
            },
            {
                value: 75,
                color: '#00897B',
                highlight: '#26A69A',
                label: 'Action'
            },
            {
                value: 22,
                color: '#FF9800',
                highlight: '#FFB74D',
                label: 'Romance'
            },
            {
                value: 100,
                color: '#FF5722',
                highlight: '#FF8A65',
                label: 'Sci-fi'
            }];
    }
    PieChartDemo.prototype.onSegmentClick = function (event) {
        if (event.segments) {
            this.msgs = [{ severity: 'info', summary: 'Segment Selected', 'detail': event.segments[0].label }];
        }
    };
    PieChartDemo.prototype.removeYellow = function () {
        this.data1.pop();
        this.updated = true;
    };
    PieChartDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/chart/piechart/piechartdemo.html',
            directives: [piechart_1.PieChart, button_1.Button, growl_1.Growl, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], PieChartDemo);
    return PieChartDemo;
}());
exports.PieChartDemo = PieChartDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2hhcnQvcGllY2hhcnQvcGllY2hhcnRkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLGdEQUFnRCxDQUFDLENBQUE7QUFDeEUsZ0NBQThCLHdEQUF3RCxDQUFDLENBQUE7QUFDdkYsd0JBQXNCLHdDQUF3QyxDQUFDLENBQUE7QUFDL0QseUJBQXVCLHlDQUF5QyxDQUFDLENBQUE7QUFDakUsc0JBQW9CLG9DQUFvQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLHNDQUFzQyxDQUFDLENBQUE7QUFFNUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFVSTtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztnQkFDRSxLQUFLLEVBQUUsR0FBRztnQkFDVixLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLEtBQUssRUFBRSxLQUFLO2FBQ2Y7WUFDRDtnQkFDSSxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLEtBQUssRUFBRSxPQUFPO2FBQ2pCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixLQUFLLEVBQUUsUUFBUTthQUNsQixDQUFDLENBQUM7UUFFZixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUM7Z0JBQ0UsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixLQUFLLEVBQUUsUUFBUTthQUNsQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsS0FBSyxFQUFFLE9BQU87YUFDakI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLEtBQUssRUFBRSxRQUFRO2FBQ2xCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixLQUFLLEVBQUUsU0FBUzthQUNuQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxHQUFHO2dCQUNWLEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsS0FBSyxFQUFFLFFBQVE7YUFDbEIsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxxQ0FBYyxHQUFkLFVBQWUsS0FBSztRQUNoQixFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3JHLENBQUM7SUFDTCxDQUFDO0lBRUQsbUNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQTNFTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsZ0RBQWdEO1lBQzdELFVBQVUsRUFBRSxDQUFDLG1CQUFRLEVBQUMsZUFBTSxFQUFDLGFBQUssRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUN6RixDQUFDOztvQkFBQTtJQXlFRixtQkFBQztBQUFELENBeEVBLEFBd0VDLElBQUE7QUF4RVksb0JBQVksZUF3RXhCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9jaGFydC9waWVjaGFydC9waWVjaGFydGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1BpZUNoYXJ0fSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NoYXJ0L3BpZWNoYXJ0L3BpZWNoYXJ0JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVzc2FnZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9jaGFydC9waWVjaGFydC9waWVjaGFydGRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1BpZUNoYXJ0LEJ1dHRvbixHcm93bCxUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgUGllQ2hhcnREZW1vIHtcblxuICAgIGRhdGExOiBhbnlbXTtcblxuICAgIGRhdGEyOiBhbnlbXTtcblxuICAgIG1zZ3M6IE1lc3NhZ2VbXTtcblxuICAgIHVwZGF0ZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kYXRhMSA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMzAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjRjc0NjRBJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogJyNGRjVBNUUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdSZWQnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzQ2QkZCRCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6ICcjNUFEM0QxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnR3JlZW4nXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNGREI0NUMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiAnI0ZGQzg3MCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1llbGxvdydcbiAgICAgICAgICAgICAgICAgICAgfV07XG5cbiAgICAgICAgdGhpcy5kYXRhMiA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMTI1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMjE5NkYzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogJyM2NEI1RjYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdDb21lZHknXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiA1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzY3M0FCNycsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6ICcjOTU3NUNEJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRHJhbWEnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiA3NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzAwODk3QicsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHQ6ICcjMjZBNjlBJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQWN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMjIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNGRjk4MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiAnI0ZGQjc0RCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1JvbWFuY2UnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNGRjU3MjInLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiAnI0ZGOEE2NScsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1NjaS1maSdcbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgfVxuXG4gICAgb25TZWdtZW50Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYoZXZlbnQuc2VnbWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMubXNncyA9IFt7c2V2ZXJpdHk6ICdpbmZvJywgc3VtbWFyeTogJ1NlZ21lbnQgU2VsZWN0ZWQnLCAnZGV0YWlsJzogZXZlbnQuc2VnbWVudHNbMF0ubGFiZWx9XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVllbGxvdygpIHtcbiAgICAgICAgdGhpcy5kYXRhMS5wb3AoKTtcbiAgICAgICAgdGhpcy51cGRhdGVkID0gdHJ1ZTtcbiAgICB9XG59Il19
