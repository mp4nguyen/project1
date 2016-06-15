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
var menubar_1 = require('../../../components/menubar/menubar');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var MenubarDemo = (function () {
    function MenubarDemo() {
    }
    MenubarDemo.prototype.ngOnInit = function () {
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
    MenubarDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/menubar/menubardemo.html',
            directives: [menubar_1.Menubar, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MenubarDemo);
    return MenubarDemo;
}());
exports.MenubarDemo = MenubarDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbWVudWJhci9tZW51YmFyZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBTzdEO0lBQUE7SUFnRkEsQ0FBQztJQTVFRyw4QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRztZQUNUO2dCQUNJLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsQ0FBQzt3QkFDQSxLQUFLLEVBQUUsS0FBSzt3QkFDWixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUU7NEJBQ0gsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDOzRCQUNsQixFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7eUJBQ25CO3FCQUNKO29CQUNELEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQztvQkFDZixFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUM7aUJBQ2xCO2FBQ0o7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUU7b0JBQ0gsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBQztvQkFDeEMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUM7aUJBQ3pDO2FBQ0o7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsS0FBSyxFQUFFO29CQUNIO3dCQUNJLEtBQUssRUFBRSxVQUFVO3FCQUNwQjtvQkFDRDt3QkFDSSxLQUFLLEVBQUUsUUFBUTt3QkFDZixJQUFJLEVBQUUsV0FBVzt3QkFDakIsS0FBSyxFQUFFOzRCQUNIO2dDQUNJLEtBQUssRUFBRSxNQUFNO2dDQUNiLEtBQUssRUFBRTtvQ0FDSDt3Q0FDSSxLQUFLLEVBQUUsV0FBVztxQ0FDckI7aUNBQ0o7NkJBQ0o7NEJBQ0Q7Z0NBQ0ksS0FBSyxFQUFFLE1BQU07NkJBQ2hCO3lCQUNSLEVBQUM7aUJBQ0w7YUFDSjtZQUNEO2dCQUNJLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUU7b0JBQ0g7d0JBQ0ksS0FBSyxFQUFFLE1BQU07d0JBQ2IsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLEtBQUssRUFBRTs0QkFDSCxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQzs0QkFDaEMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7eUJBQ3JDO3FCQUNKO29CQUNEO3dCQUNJLEtBQUssRUFBRSxPQUFPO3dCQUNkLElBQUksRUFBRSxVQUFVO3dCQUNoQixLQUFLLEVBQUU7NEJBQ0gsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7eUJBQ3RDO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVO2FBQ2xDO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFuRkw7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsV0FBVyxFQUFFLHdDQUF3QztZQUNyRCxVQUFVLEVBQUUsQ0FBQyxpQkFBTyxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQzNFLENBQUM7O21CQUFBO0lBaUZGLGtCQUFDO0FBQUQsQ0FoRkEsQUFnRkMsSUFBQTtBQWhGWSxtQkFBVyxjQWdGdkIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvcHJpbWVuZy9wcmltZW5nLW1hc3Rlci9zaG93Y2FzZS9kZW1vL21lbnViYXIvbWVudWJhcmRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lbnViYXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbWVudWJhci9tZW51YmFyJztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVudW1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL21lbnViYXIvbWVudWJhcmRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW01lbnViYXIsVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIE1lbnViYXJEZW1vIHtcblxuICAgIHByaXZhdGUgaXRlbXM6IE1lbnVJdGVtW107XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0ZpbGUnLFxuICAgICAgICAgICAgICAgIGljb246ICdmYS1maWxlLW8nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdOZXcnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmYS1wbHVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnUHJvamVjdCd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ090aGVyJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ09wZW4nfSxcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnUXVpdCd9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0VkaXQnLFxuICAgICAgICAgICAgICAgIGljb246ICdmYS1lZGl0JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdVbmRvJywgaWNvbjogJ2ZhLW1haWwtZm9yd2FyZCd9LFxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdSZWRvJywgaWNvbjogJ2ZhLW1haWwtcmVwbHknfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdIZWxwJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnZmEtcXVlc3Rpb24nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnQ29udGVudHMnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU2VhcmNoJywgXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZmEtc2VhcmNoJywgXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdUZXh0JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdXb3Jrc3BhY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdGaWxlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnQWN0aW9ucycsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhLWdlYXInLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRWRpdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZmEtcmVmcmVzaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1NhdmUnLCBpY29uOiAnZmEtc2F2ZSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1VwZGF0ZScsIGljb246ICdmYS1zYXZlJ30sXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnT3RoZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2ZhLXBob25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnRGVsZXRlJywgaWNvbjogJ2ZhLW1pbnVzJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdRdWl0JywgaWNvbjogJ2ZhLW1pbnVzJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cbn0iXX0=
