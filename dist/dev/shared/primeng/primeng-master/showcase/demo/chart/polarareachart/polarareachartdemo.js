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
var polarareachart_1 = require('../../../../components/chart/polarareachart/polarareachart');
var codehighlighter_1 = require('../../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../../components/tabview/tabview');
var tabpanel_1 = require('../../../../components/tabview/tabpanel');
var growl_1 = require('../../../../components/growl/growl');
var button_1 = require('../../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var PolarAreaChartDemo = (function () {
    function PolarAreaChartDemo() {
        this.data = [{
                value: 300,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            },
            {
                value: 40,
                color: "#949FB1",
                highlight: "#A8B3C5",
                label: "Grey"
            },
            {
                value: 120,
                color: "#4D5360",
                highlight: "#616774",
                label: "Dark Grey"
            }];
    }
    PolarAreaChartDemo.prototype.onSegmentClick = function (event) {
        if (event.segments) {
            this.msgs = [{ severity: 'info', summary: 'Segment Selected', 'detail': event.segments[0].label }];
        }
    };
    PolarAreaChartDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/chart/polarareachart/polarareachartdemo.html',
            directives: [polarareachart_1.PolarAreaChart, button_1.Button, growl_1.Growl, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], PolarAreaChartDemo);
    return PolarAreaChartDemo;
}());
exports.PolarAreaChartDemo = PolarAreaChartDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2hhcnQvcG9sYXJhcmVhY2hhcnQvcG9sYXJhcmVhY2hhcnRkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsK0JBQTZCLDREQUE0RCxDQUFDLENBQUE7QUFDMUYsZ0NBQThCLHdEQUF3RCxDQUFDLENBQUE7QUFDdkYsd0JBQXNCLHdDQUF3QyxDQUFDLENBQUE7QUFDL0QseUJBQXVCLHlDQUF5QyxDQUFDLENBQUE7QUFDakUsc0JBQW9CLG9DQUFvQyxDQUFDLENBQUE7QUFDekQsdUJBQXFCLHNDQUFzQyxDQUFDLENBQUE7QUFFNUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFNN0Q7SUFRSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztnQkFDTCxLQUFLLEVBQUUsR0FBRztnQkFDVixLQUFLLEVBQUMsU0FBUztnQkFDZixTQUFTLEVBQUUsU0FBUztnQkFDcEIsS0FBSyxFQUFFLEtBQUs7YUFDZjtZQUNEO2dCQUNJLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsS0FBSyxFQUFFLE9BQU87YUFDakI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsR0FBRztnQkFDVixLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLEtBQUssRUFBRSxRQUFRO2FBQ2xCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixLQUFLLEVBQUUsTUFBTTthQUNoQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxHQUFHO2dCQUNWLEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsS0FBSyxFQUFFLFdBQVc7YUFDckIsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELDJDQUFjLEdBQWQsVUFBZSxLQUFLO1FBQ2hCLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDckcsQ0FBQztJQUNMLENBQUM7SUFqREw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDREQUE0RDtZQUN6RSxVQUFVLEVBQUUsQ0FBQywrQkFBYyxFQUFDLGVBQU0sRUFBQyxhQUFLLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDL0YsQ0FBQzs7MEJBQUE7SUFnREYseUJBQUM7QUFBRCxDQS9DQSxBQStDQyxJQUFBO0FBL0NZLDBCQUFrQixxQkErQzlCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9jaGFydC9wb2xhcmFyZWFjaGFydC9wb2xhcmFyZWFjaGFydGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1BvbGFyQXJlYUNoYXJ0fSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NoYXJ0L3BvbGFyYXJlYWNoYXJ0L3BvbGFyYXJlYWNoYXJ0JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVzc2FnZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9jaGFydC9wb2xhcmFyZWFjaGFydC9wb2xhcmFyZWFjaGFydGRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW1BvbGFyQXJlYUNoYXJ0LEJ1dHRvbixHcm93bCxUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgUG9sYXJBcmVhQ2hhcnREZW1vIHtcblxuICAgIGRhdGE6IGFueVtdO1xuXG4gICAgbXNnczogTWVzc2FnZVtdO1xuXG4gICAgdXBkYXRlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRhdGEgPSBbe1xuICAgICAgICAgICAgICAgIHZhbHVlOiAzMDAsXG4gICAgICAgICAgICAgICAgY29sb3I6XCIjRjc0NjRBXCIsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiNGRjVBNUVcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJSZWRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgICAgICAgICAgY29sb3I6IFwiIzQ2QkZCRFwiLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodDogXCIjNUFEM0QxXCIsXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiR3JlZW5cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogMTAwLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNGREI0NUNcIixcbiAgICAgICAgICAgICAgICBoaWdobGlnaHQ6IFwiI0ZGQzg3MFwiLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIlllbGxvd1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhbHVlOiA0MCxcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjOTQ5RkIxXCIsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiNBOEIzQzVcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJHcmV5XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IDEyMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogXCIjNEQ1MzYwXCIsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBcIiM2MTY3NzRcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXJrIEdyZXlcIlxuICAgICAgICAgICAgfV07XG4gICAgfVxuXG4gICAgb25TZWdtZW50Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYoZXZlbnQuc2VnbWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMubXNncyA9IFt7c2V2ZXJpdHk6ICdpbmZvJywgc3VtbWFyeTogJ1NlZ21lbnQgU2VsZWN0ZWQnLCAnZGV0YWlsJzogZXZlbnQuc2VnbWVudHNbMF0ubGFiZWx9XTtcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==
