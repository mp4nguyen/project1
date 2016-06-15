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
var radarchart_1 = require('../../../../components/chart/radarchart/radarchart');
var codehighlighter_1 = require('../../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../../components/tabview/tabview');
var tabpanel_1 = require('../../../../components/tabview/tabpanel');
var growl_1 = require('../../../../components/growl/growl');
var button_1 = require('../../../../components/button/button');
var router_deprecated_1 = require('angular2/router-deprecated');
var RadarChartDemo = (function () {
    function RadarChartDemo() {
        this.data = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
    }
    RadarChartDemo.prototype.onSelect = function (event) {
        if (event.points) {
            this.msgs = [];
            for (var i = 0; i < event.points.length; i++) {
                this.msgs.push({ severity: 'info', summary: 'Point Selected', 'detail': event.points[i].label + ' ' + event.points[i].value });
            }
        }
    };
    RadarChartDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/chart/radarchart/radarchartdemo.html',
            directives: [radarchart_1.RadarChart, button_1.Button, growl_1.Growl, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RadarChartDemo);
    return RadarChartDemo;
}());
exports.RadarChartDemo = RadarChartDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY2hhcnQvcmFkYXJjaGFydC9yYWRhcmNoYXJ0ZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLDJCQUF5QixvREFBb0QsQ0FBQyxDQUFBO0FBQzlFLGdDQUE4Qix3REFBd0QsQ0FBQyxDQUFBO0FBQ3ZGLHdCQUFzQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQy9ELHlCQUF1Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2pFLHNCQUFvQixvQ0FBb0MsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixzQ0FBc0MsQ0FBQyxDQUFBO0FBRTVELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTTdEO0lBTUk7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO1lBQ3ZGLFFBQVEsRUFBRTtnQkFDTjtvQkFDSSxLQUFLLEVBQUUsa0JBQWtCO29CQUN6QixTQUFTLEVBQUUsdUJBQXVCO29CQUNsQyxXQUFXLEVBQUUscUJBQXFCO29CQUNsQyxVQUFVLEVBQUUscUJBQXFCO29CQUNqQyxnQkFBZ0IsRUFBRSxNQUFNO29CQUN4QixrQkFBa0IsRUFBRSxNQUFNO29CQUMxQixvQkFBb0IsRUFBRSxxQkFBcUI7b0JBQzNDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztpQkFDckM7Z0JBQ0Q7b0JBQ0ksS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsU0FBUyxFQUFFLHVCQUF1QjtvQkFDbEMsV0FBVyxFQUFFLHFCQUFxQjtvQkFDbEMsVUFBVSxFQUFFLHFCQUFxQjtvQkFDakMsZ0JBQWdCLEVBQUUsTUFBTTtvQkFDeEIsa0JBQWtCLEVBQUUsTUFBTTtvQkFDMUIsb0JBQW9CLEVBQUUscUJBQXFCO29CQUMzQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7aUJBQ3RDO2FBQ0o7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1YsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUNqSSxDQUFDO1FBRUwsQ0FBQztJQUNMLENBQUM7SUE5Q0w7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLG9EQUFvRDtZQUNqRSxVQUFVLEVBQUUsQ0FBQyx1QkFBVSxFQUFDLGVBQU0sRUFBQyxhQUFLLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDM0YsQ0FBQzs7c0JBQUE7SUE0Q0YscUJBQUM7QUFBRCxDQTNDQSxBQTJDQyxJQUFBO0FBM0NZLHNCQUFjLGlCQTJDMUIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL2NoYXJ0L3JhZGFyY2hhcnQvcmFkYXJjaGFydGRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JhZGFyQ2hhcnR9IGZyb20gJy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2hhcnQvcmFkYXJjaGFydC9yYWRhcmNoYXJ0JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVzc2FnZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby9jaGFydC9yYWRhcmNoYXJ0L3JhZGFyY2hhcnRkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtSYWRhckNoYXJ0LEJ1dHRvbixHcm93bCxUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgUmFkYXJDaGFydERlbW8ge1xuXG4gICAgZGF0YTogYW55O1xuXG4gICAgbXNnczogTWVzc2FnZVtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IHtcbiAgICAgICAgICAgIGxhYmVsczogW1wiRWF0aW5nXCIsIFwiRHJpbmtpbmdcIiwgXCJTbGVlcGluZ1wiLCBcIkRlc2lnbmluZ1wiLCBcIkNvZGluZ1wiLCBcIkN5Y2xpbmdcIiwgXCJSdW5uaW5nXCJdLFxuICAgICAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk15IEZpcnN0IGRhdGFzZXRcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yOiBcInJnYmEoMjIwLDIyMCwyMjAsMC4yKVwiLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogXCJyZ2JhKDIyMCwyMjAsMjIwLDEpXCIsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50Q29sb3I6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgICAgICBwb2ludFN0cm9rZUNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRGaWxsOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRIaWdobGlnaHRTdHJva2U6IFwicmdiYSgyMjAsMjIwLDIyMCwxKVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbNjUsIDU5LCA5MCwgODEsIDU2LCA1NSwgNDBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk15IFNlY29uZCBkYXRhc2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogXCJyZ2JhKDE1MSwxODcsMjA1LDAuMilcIixcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwicmdiYSgxNTEsMTg3LDIwNSwxKVwiLFxuICAgICAgICAgICAgICAgICAgICBwb2ludENvbG9yOiBcInJnYmEoMTUxLDE4NywyMDUsMSlcIixcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRTdHJva2VDb2xvcjogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0RmlsbDogXCIjZmZmXCIsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50SGlnaGxpZ2h0U3Ryb2tlOiBcInJnYmEoMTUxLDE4NywyMDUsMSlcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogWzI4LCA0OCwgNDAsIDE5LCA5NiwgMjcsIDEwMF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNlbGVjdChldmVudCkge1xuICAgICAgICBpZihldmVudC5wb2ludHMpIHtcbiAgICAgICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGV2ZW50LnBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubXNncy5wdXNoKHtzZXZlcml0eTogJ2luZm8nLCBzdW1tYXJ5OiAnUG9pbnQgU2VsZWN0ZWQnLCAnZGV0YWlsJzogZXZlbnQucG9pbnRzW2ldLmxhYmVsICsgJyAnICsgZXZlbnQucG9pbnRzW2ldLnZhbHVlfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=
