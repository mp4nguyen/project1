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
var contextmenu_1 = require('../../../components/contextmenu/contextmenu');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var ContextMenuDemo = (function () {
    function ContextMenuDemo() {
    }
    ContextMenuDemo.prototype.ngOnInit = function () {
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
    ContextMenuDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/contextmenu/contextmenudemo.html',
            directives: [contextmenu_1.ContextMenu, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ContextMenuDemo);
    return ContextMenuDemo;
}());
exports.ContextMenuDemo = ContextMenuDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vY29udGV4dG1lbnUvY29udGV4dG1lbnVkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsNEJBQTBCLDZDQUE2QyxDQUFDLENBQUE7QUFDeEUsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsdUJBQXFCLG1DQUFtQyxDQUFDLENBQUE7QUFDekQsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFPN0Q7SUFBQTtJQWdGQSxDQUFDO0lBNUVHLGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1Q7Z0JBQ0ksS0FBSyxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxDQUFDO3dCQUNBLEtBQUssRUFBRSxLQUFLO3dCQUNaLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRTs0QkFDSCxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUM7NEJBQ2xCLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQzt5QkFDbkI7cUJBQ0o7b0JBQ0QsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDO29CQUNmLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQztpQkFDbEI7YUFDSjtZQUNEO2dCQUNJLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRTtvQkFDSCxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFDO29CQUN4QyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBQztpQkFDekM7YUFDSjtZQUNEO2dCQUNJLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxhQUFhO2dCQUNuQixLQUFLLEVBQUU7b0JBQ0g7d0JBQ0ksS0FBSyxFQUFFLFVBQVU7cUJBQ3BCO29CQUNEO3dCQUNJLEtBQUssRUFBRSxRQUFRO3dCQUNmLElBQUksRUFBRSxXQUFXO3dCQUNqQixLQUFLLEVBQUU7NEJBQ0g7Z0NBQ0ksS0FBSyxFQUFFLE1BQU07Z0NBQ2IsS0FBSyxFQUFFO29DQUNIO3dDQUNJLEtBQUssRUFBRSxXQUFXO3FDQUNyQjtpQ0FDSjs2QkFDSjs0QkFDRDtnQ0FDSSxLQUFLLEVBQUUsTUFBTTs2QkFDaEI7eUJBQ1IsRUFBQztpQkFDTDthQUNKO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRTtvQkFDSDt3QkFDSSxLQUFLLEVBQUUsTUFBTTt3QkFDYixJQUFJLEVBQUUsWUFBWTt3QkFDbEIsS0FBSyxFQUFFOzRCQUNILEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDOzRCQUNoQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQzt5QkFDckM7cUJBQ0o7b0JBQ0Q7d0JBQ0ksS0FBSyxFQUFFLE9BQU87d0JBQ2QsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEtBQUssRUFBRTs0QkFDSCxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQzt5QkFDdEM7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVU7YUFDbEM7U0FDSixDQUFDO0lBQ04sQ0FBQztJQW5GTDtRQUFDLGdCQUFTLENBQUM7WUFDUCxXQUFXLEVBQUUsZ0RBQWdEO1lBQzdELFVBQVUsRUFBRSxDQUFDLHlCQUFXLEVBQUMsZUFBTSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxpQ0FBZSxFQUFDLHFDQUFpQixDQUFDO1NBQ3RGLENBQUM7O3VCQUFBO0lBaUZGLHNCQUFDO0FBQUQsQ0FoRkEsQUFnRkMsSUFBQTtBQWhGWSx1QkFBZSxrQkFnRjNCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9jb250ZXh0bWVudS9jb250ZXh0bWVudWRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0NvbnRleHRNZW51fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbnRleHRtZW51L2NvbnRleHRtZW51JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtCdXR0b259IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXItZGVwcmVjYXRlZCc7XG5pbXBvcnQge01lbnVJdGVtfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2FwaS9tZW51bW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJ3Nob3djYXNlL2RlbW8vY29udGV4dG1lbnUvY29udGV4dG1lbnVkZW1vLmh0bWwnLFxuICAgIGRpcmVjdGl2ZXM6IFtDb250ZXh0TWVudSxCdXR0b24sVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51RGVtbyB7XG5cbiAgICBwcml2YXRlIGl0ZW1zOiBNZW51SXRlbVtdO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdGaWxlJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnZmEtZmlsZS1vJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnTmV3JywgXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZmEtcGx1cycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1Byb2plY3QnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdPdGhlcid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdPcGVuJ30sXG4gICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ1F1aXQnfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdFZGl0JyxcbiAgICAgICAgICAgICAgICBpY29uOiAnZmEtZWRpdCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnVW5kbycsIGljb246ICdmYS1tYWlsLWZvcndhcmQnfSxcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsOiAnUmVkbycsIGljb246ICdmYS1tYWlsLXJlcGx5J31cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnSGVscCcsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2ZhLXF1ZXN0aW9uJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0NvbnRlbnRzJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1NlYXJjaCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2ZhLXNlYXJjaCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnVGV4dCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnV29ya3NwYWNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRmlsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0FjdGlvbnMnLFxuICAgICAgICAgICAgICAgIGljb246ICdmYS1nZWFyJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0VkaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2ZhLXJlZnJlc2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdTYXZlJywgaWNvbjogJ2ZhLXNhdmUnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6ICdVcGRhdGUnLCBpY29uOiAnZmEtc2F2ZSd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ090aGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdmYS1waG9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDogJ0RlbGV0ZScsIGljb246ICdmYS1taW51cyd9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnUXVpdCcsIGljb246ICdmYS1taW51cydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XG59Il19
