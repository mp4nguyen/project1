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
var slidemenu_1 = require('../../../components/slidemenu/slidemenu');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var SlideMenuDemo = (function () {
    function SlideMenuDemo() {
    }
    SlideMenuDemo.prototype.ngOnInit = function () {
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
    SlideMenuDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/slidemenu/slidemenudemo.html',
            directives: [slidemenu_1.SlideMenu, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SlideMenuDemo);
    return SlideMenuDemo;
}());
exports.SlideMenuDemo = SlideMenuDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vc2xpZGVtZW51L3NsaWRlbWVudWRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QywwQkFBd0IseUNBQXlDLENBQUMsQ0FBQTtBQUNsRSxnQ0FBOEIscURBQXFELENBQUMsQ0FBQTtBQUNwRix1QkFBcUIsbUNBQW1DLENBQUMsQ0FBQTtBQUN6RCx3QkFBc0IscUNBQXFDLENBQUMsQ0FBQTtBQUM1RCx5QkFBdUIsc0NBQXNDLENBQUMsQ0FBQTtBQUM5RCxrQ0FBZ0MsNEJBQTRCLENBQUMsQ0FBQTtBQU83RDtJQUFBO0lBZ0ZBLENBQUM7SUE1RUcsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVDtnQkFDSSxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLENBQUM7d0JBQ0EsS0FBSyxFQUFFLEtBQUs7d0JBQ1osSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFOzRCQUNILEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQzs0QkFDbEIsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDO3lCQUNuQjtxQkFDSjtvQkFDRCxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUM7b0JBQ2YsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDO2lCQUNsQjthQUNKO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFO29CQUNILEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUM7b0JBQ3hDLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFDO2lCQUN6QzthQUNKO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLEtBQUssRUFBRTtvQkFDSDt3QkFDSSxLQUFLLEVBQUUsVUFBVTtxQkFDcEI7b0JBQ0Q7d0JBQ0ksS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLEtBQUssRUFBRTs0QkFDSDtnQ0FDSSxLQUFLLEVBQUUsTUFBTTtnQ0FDYixLQUFLLEVBQUU7b0NBQ0g7d0NBQ0ksS0FBSyxFQUFFLFdBQVc7cUNBQ3JCO2lDQUNKOzZCQUNKOzRCQUNEO2dDQUNJLEtBQUssRUFBRSxNQUFNOzZCQUNoQjt5QkFDUixFQUFDO2lCQUNMO2FBQ0o7WUFDRDtnQkFDSSxLQUFLLEVBQUUsU0FBUztnQkFDaEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFO29CQUNIO3dCQUNJLEtBQUssRUFBRSxNQUFNO3dCQUNiLElBQUksRUFBRSxZQUFZO3dCQUNsQixLQUFLLEVBQUU7NEJBQ0gsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7NEJBQ2hDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO3lCQUNyQztxQkFDSjtvQkFDRDt3QkFDSSxLQUFLLEVBQUUsT0FBTzt3QkFDZCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsS0FBSyxFQUFFOzRCQUNILEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDO3lCQUN0QztxQkFDSjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVTthQUNsQztTQUNKLENBQUM7SUFDTixDQUFDO0lBbkZMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSw0Q0FBNEM7WUFDekQsVUFBVSxFQUFFLENBQUMscUJBQVMsRUFBQyxlQUFNLEVBQUMsbUJBQVEsRUFBQyxpQkFBTyxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDcEYsQ0FBQzs7cUJBQUE7SUFpRkYsb0JBQUM7QUFBRCxDQWhGQSxBQWdGQyxJQUFBO0FBaEZZLHFCQUFhLGdCQWdGekIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL3NsaWRlbWVudS9zbGlkZW1lbnVkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtTbGlkZU1lbnV9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc2xpZGVtZW51L3NsaWRlbWVudSc7XG5pbXBvcnQge0NvZGVIaWdobGlnaHRlcn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlaGlnaGxpZ2h0ZXIvY29kZWhpZ2hsaWdodGVyJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVudW1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL3NsaWRlbWVudS9zbGlkZW1lbnVkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtTbGlkZU1lbnUsQnV0dG9uLFRhYlBhbmVsLFRhYlZpZXcsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZU1lbnVEZW1vIHtcblxuICAgIHByaXZhdGUgaXRlbXM6IE1lbnVJdGVtW107XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0ZpbGUnLFxuICAgICAgICAgICAgICAgIGljb246ICdmYS1maWxlLW8nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdOZXcnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmYS1wbHVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnUHJvamVjdCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ090aGVyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ09wZW4nfSxcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnUXVpdCd9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0VkaXQnLFxuICAgICAgICAgICAgICAgIGljb246ICdmYS1lZGl0JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdVbmRvJywgaWNvbjogJ2ZhLW1haWwtZm9yd2FyZCd9LFxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdSZWRvJywgaWNvbjogJ2ZhLW1haWwtcmVwbHknfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdIZWxwJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnZmEtcXVlc3Rpb24nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQ29udGVudHMnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU2VhcmNoJywgXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZmEtc2VhcmNoJywgXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdUZXh0JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdXb3Jrc3BhY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdGaWxlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQWN0aW9ucycsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhLWdlYXInLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRWRpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZmEtcmVmcmVzaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1NhdmUnLCBpY29uOiAnZmEtc2F2ZSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1VwZGF0ZScsIGljb246ICdmYS1zYXZlJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnT3RoZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2ZhLXBob25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnRGVsZXRlJywgaWNvbjogJ2ZhLW1pbnVzJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdRdWl0JywgaWNvbjogJ2ZhLW1pbnVzJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cbn0iXX0=
