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
var doughnutchart_1 = require('../../../../components/chart/doughnutchart/doughnutchart');
var codehighlighter_1 = require('../../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../../components/tabview/tabview');
var tabpanel_1 = require('../../../../components/tabview/tabpanel');
var growl_1 = require('../../../../components/growl/growl');
var button_1 = require('../../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var DoughnutChartDemo = (function () {
    function DoughnutChartDemo() {
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
    DoughnutChartDemo.prototype.onSegmentClick = function (event) {
        if (event.segments) {
            this.msgs = [{ severity: 'info', summary: 'Segment Selected', 'detail': event.segments[0].label }];
        }
    };
    DoughnutChartDemo.prototype.removeYellow = function () {
        this.data1.pop();
        this.updated = true;
    };
    DoughnutChartDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/chart/doughnutchart/doughnutchartdemo.html',
            directives: [doughnutchart_1.DoughnutChart, button_1.Button, growl_1.Growl, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DoughnutChartDemo);
    return DoughnutChartDemo;
}());
exports.DoughnutChartDemo = DoughnutChartDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2hhcnQvZG91Z2hudXRjaGFydC9kb3VnaG51dGNoYXJ0ZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLDhCQUE0QiwwREFDNUIsQ0FBQyxDQURxRjtBQUN0RixnQ0FBOEIsd0RBQXdELENBQUMsQ0FBQTtBQUN2Rix3QkFBc0Isd0NBQXdDLENBQUMsQ0FBQTtBQUMvRCx5QkFBdUIseUNBQXlDLENBQUMsQ0FBQTtBQUNqRSxzQkFBb0Isb0NBQW9DLENBQUMsQ0FBQTtBQUN6RCx1QkFBcUIsc0NBQXNDLENBQUMsQ0FBQTtBQUU1RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU03RDtJQVVJO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO2dCQUNWLEtBQUssRUFBRSxHQUFHO2dCQUNWLEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsS0FBSyxFQUFFLEtBQUs7YUFDZjtZQUNHO2dCQUNJLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsS0FBSyxFQUFFLE9BQU87YUFDakI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsR0FBRztnQkFDVixLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLEtBQUssRUFBRSxRQUFRO2FBQ2xCLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztnQkFDVixLQUFLLEVBQUUsR0FBRztnQkFDVixLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLEtBQUssRUFBRSxRQUFRO2FBQ2xCO1lBQ0c7Z0JBQ0ksS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixLQUFLLEVBQUUsT0FBTzthQUNqQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsS0FBSyxFQUFFLFFBQVE7YUFDbEI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLEtBQUssRUFBRSxTQUFTO2FBQ25CO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixLQUFLLEVBQUUsUUFBUTthQUNsQixDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLEtBQUs7UUFDaEIsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNyRyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUEzRUw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDBEQUEwRDtZQUN2RSxVQUFVLEVBQUUsQ0FBQyw2QkFBYSxFQUFDLGVBQU0sRUFBQyxhQUFLLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDOUYsQ0FBQzs7eUJBQUE7SUF5RUYsd0JBQUM7QUFBRCxDQXhFQSxBQXdFQyxJQUFBO0FBeEVZLHlCQUFpQixvQkF3RTdCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9jaGFydC9kb3VnaG51dGNoYXJ0L2RvdWdobnV0Y2hhcnRkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEb3VnaG51dENoYXJ0fSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NoYXJ0L2RvdWdobnV0Y2hhcnQvZG91Z2hudXRjaGFydCdcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVzc2FnZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9jaGFydC9kb3VnaG51dGNoYXJ0L2RvdWdobnV0Y2hhcnRkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtEb3VnaG51dENoYXJ0LEJ1dHRvbixHcm93bCxUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgRG91Z2hudXRDaGFydERlbW8ge1xuXG4gICAgZGF0YTE6IGFueVtdO1xuXG4gICAgZGF0YTI6IGFueVtdO1xuXG4gICAgbXNnczogTWVzc2FnZVtdO1xuXG4gICAgdXBkYXRlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRhdGExID0gW3tcbiAgICAgICAgICAgIHZhbHVlOiAzMDAsXG4gICAgICAgICAgICBjb2xvcjogJyNGNzQ2NEEnLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiAnI0ZGNUE1RScsXG4gICAgICAgICAgICBsYWJlbDogJ1JlZCdcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNDZCRkJEJyxcbiAgICAgICAgICAgICAgICBoaWdobGlnaHQ6ICcjNUFEM0QxJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0dyZWVuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogMTAwLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI0ZEQjQ1QycsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiAnI0ZGQzg3MCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdZZWxsb3cnXG4gICAgICAgICAgICB9XTtcblxuICAgICAgICB0aGlzLmRhdGEyID0gW3tcbiAgICAgICAgICAgIHZhbHVlOiAxMjUsXG4gICAgICAgICAgICBjb2xvcjogJyMyMTk2RjMnLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiAnIzY0QjVGNicsXG4gICAgICAgICAgICBsYWJlbDogJ0NvbWVkeSdcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNjczQUI3JyxcbiAgICAgICAgICAgICAgICBoaWdobGlnaHQ6ICcjOTU3NUNEJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0RyYW1hJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogNzUsXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjMDA4OTdCJyxcbiAgICAgICAgICAgICAgICBoaWdobGlnaHQ6ICcjMjZBNjlBJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0FjdGlvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IDIyLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI0ZGOTgwMCcsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiAnI0ZGQjc0RCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdSb21hbmNlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogMTAwLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnI0ZGNTcyMicsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiAnI0ZGOEE2NScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTY2ktZmknXG4gICAgICAgICAgICB9XTtcbiAgICB9XG5cbiAgICBvblNlZ21lbnRDbGljayhldmVudCkge1xuICAgICAgICBpZihldmVudC5zZWdtZW50cykge1xuICAgICAgICAgICAgdGhpcy5tc2dzID0gW3tzZXZlcml0eTogJ2luZm8nLCBzdW1tYXJ5OiAnU2VnbWVudCBTZWxlY3RlZCcsICdkZXRhaWwnOiBldmVudC5zZWdtZW50c1swXS5sYWJlbH1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlWWVsbG93KCkge1xuICAgICAgICB0aGlzLmRhdGExLnBvcCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZWQgPSB0cnVlO1xuICAgIH1cbn0iXX0=
