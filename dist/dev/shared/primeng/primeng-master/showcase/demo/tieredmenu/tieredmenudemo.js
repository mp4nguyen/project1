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
var tieredmenu_1 = require('../../../components/tieredmenu/tieredmenu');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var TieredMenuDemo = (function () {
    function TieredMenuDemo() {
    }
    TieredMenuDemo.prototype.ngOnInit = function () {
        this.items = [
            {
                label: 'File',
                icon: 'fa-file-o',
                items: [{
                        label: 'New',
                        icon: 'fa-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    { label: 'Undo', icon: 'fa-mail-forward' },
                    { label: 'Redo', icon: 'fa-mail-reply' }
                ]
            },
            {
                label: 'Help',
                icon: 'fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search',
                        icon: 'fa-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                        ] }
                ]
            },
            {
                label: 'Actions',
                icon: 'fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa-refresh',
                        items: [
                            { label: 'Save', icon: 'fa-save' },
                            { label: 'Update', icon: 'fa-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa-phone',
                        items: [
                            { label: 'Delete', icon: 'fa-minus' }
                        ]
                    }
                ]
            },
            {
                label: 'Quit', icon: 'fa-minus'
            }
        ];
    };
    TieredMenuDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/tieredmenu/tieredmenudemo.html',
            directives: [tieredmenu_1.TieredMenu, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TieredMenuDemo);
    return TieredMenuDemo;
}());
exports.TieredMenuDemo = TieredMenuDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdGllcmVkbWVudS90aWVyZWRtZW51ZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLDJCQUF5QiwyQ0FBMkMsQ0FBQyxDQUFBO0FBQ3JFLGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTzdEO0lBQUE7SUFnRkEsQ0FBQztJQTVFRyxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRztZQUNUO2dCQUNJLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsQ0FBQzt3QkFDQSxLQUFLLEVBQUUsS0FBSzt3QkFDWixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUU7NEJBQ0gsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDOzRCQUNsQixFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7eUJBQ25CO3FCQUNKO29CQUNELEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQztvQkFDZixFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUM7aUJBQ2xCO2FBQ0o7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUU7b0JBQ0gsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBQztvQkFDeEMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUM7aUJBQ3pDO2FBQ0o7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsS0FBSyxFQUFFO29CQUNIO3dCQUNJLEtBQUssRUFBRSxVQUFVO3FCQUNwQjtvQkFDRDt3QkFDSSxLQUFLLEVBQUUsUUFBUTt3QkFDZixJQUFJLEVBQUUsV0FBVzt3QkFDakIsS0FBSyxFQUFFOzRCQUNIO2dDQUNJLEtBQUssRUFBRSxNQUFNO2dDQUNiLEtBQUssRUFBRTtvQ0FDSDt3Q0FDSSxLQUFLLEVBQUUsV0FBVztxQ0FDckI7aUNBQ0o7NkJBQ0o7NEJBQ0Q7Z0NBQ0ksS0FBSyxFQUFFLE1BQU07NkJBQ2hCO3lCQUNSLEVBQUM7aUJBQ0w7YUFDSjtZQUNEO2dCQUNJLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUU7b0JBQ0g7d0JBQ0ksS0FBSyxFQUFFLE1BQU07d0JBQ2IsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLEtBQUssRUFBRTs0QkFDSCxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQzs0QkFDaEMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7eUJBQ3JDO3FCQUNKO29CQUNEO3dCQUNJLEtBQUssRUFBRSxPQUFPO3dCQUNkLElBQUksRUFBRSxVQUFVO3dCQUNoQixLQUFLLEVBQUU7NEJBQ0gsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7eUJBQ3RDO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVO2FBQ2xDO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFuRkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLDhDQUE4QztZQUMzRCxVQUFVLEVBQUUsQ0FBQyx1QkFBVSxFQUFDLGVBQU0sRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUNyRixDQUFDOztzQkFBQTtJQWlGRixxQkFBQztBQUFELENBaEZBLEFBZ0ZDLElBQUE7QUFoRlksc0JBQWMsaUJBZ0YxQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vdGllcmVkbWVudS90aWVyZWRtZW51ZGVtby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7VGllcmVkTWVudX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90aWVyZWRtZW51L3RpZXJlZG1lbnUnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7VGFiVmlld30gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcnO1xuaW1wb3J0IHtUYWJQYW5lbH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy90YWJ2aWV3L3RhYnBhbmVsJztcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlci1kZXByZWNhdGVkJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL21lbnVtb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnc2hvd2Nhc2UvZGVtby90aWVyZWRtZW51L3RpZXJlZG1lbnVkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtUaWVyZWRNZW51LEJ1dHRvbixUYWJQYW5lbCxUYWJWaWV3LENvZGVIaWdobGlnaHRlcixST1VURVJfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgVGllcmVkTWVudURlbW8ge1xuXG4gICAgcHJpdmF0ZSBpdGVtczogTWVudUl0ZW1bXTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnRmlsZScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhLWZpbGUtbycsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ05ldycsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2ZhLXBsdXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdQcm9qZWN0J30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnT3RoZXInfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnT3Blbid9LFxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdRdWl0J31cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnRWRpdCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhLWVkaXQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1VuZG8nLCBpY29uOiAnZmEtbWFpbC1mb3J3YXJkJ30sXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1JlZG8nLCBpY29uOiAnZmEtbWFpbC1yZXBseSd9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0hlbHAnLFxuICAgICAgICAgICAgICAgIGljb246ICdmYS1xdWVzdGlvbicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdDb250ZW50cydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTZWFyY2gnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmYS1zZWFyY2gnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1RleHQnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1dvcmtzcGFjZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0ZpbGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdBY3Rpb25zJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnZmEtZ2VhcicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdFZGl0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmYS1yZWZyZXNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnU2F2ZScsIGljb246ICdmYS1zYXZlJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnVXBkYXRlJywgaWNvbjogJ2ZhLXNhdmUnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdPdGhlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZmEtcGhvbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdEZWxldGUnLCBpY29uOiAnZmEtbWludXMnfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1F1aXQnLCBpY29uOiAnZmEtbWludXMnXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxufSJdfQ==
