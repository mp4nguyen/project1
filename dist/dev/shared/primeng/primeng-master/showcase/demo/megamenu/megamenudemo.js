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
var megamenu_1 = require('../../../components/megamenu/megamenu');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_deprecated_1 = require('angular2/router-deprecated');
var MegaMenuDemo = (function () {
    function MegaMenuDemo() {
    }
    MegaMenuDemo.prototype.ngOnInit = function () {
        this.items = [
            {
                label: 'TV', icon: 'fa-check',
                items: [
                    [
                        {
                            label: 'TV 1',
                            items: [{ label: 'TV 1.1' }, { label: 'TV 1.2' }]
                        },
                        {
                            label: 'TV 2',
                            items: [{ label: 'TV 2.1' }, { label: 'TV 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'TV 3',
                            items: [{ label: 'TV 3.1' }, { label: 'TV 3.2' }]
                        },
                        {
                            label: 'TV 4',
                            items: [{ label: 'TV 4.1' }, { label: 'TV 4.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Sports', icon: 'fa-soccer-ball-o',
                items: [
                    [
                        {
                            label: 'Sports 1',
                            items: [{ label: 'Sports 1.1' }, { label: 'Sports 1.2' }]
                        },
                        {
                            label: 'Sports 2',
                            items: [{ label: 'Sports 2.1' }, { label: 'Sports 2.2' }]
                        },
                    ],
                    [
                        {
                            label: 'Sports 3',
                            items: [{ label: 'Sports 3.1' }, { label: 'Sports 3.2' }]
                        },
                        {
                            label: 'Sports 4',
                            items: [{ label: 'Sports 4.1' }, { label: 'Sports 4.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Sports 5',
                            items: [{ label: 'Sports 5.1' }, { label: 'Sports 5.2' }]
                        },
                        {
                            label: 'Sports 6',
                            items: [{ label: 'Sports 6.1' }, { label: 'Sports 6.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Entertainment', icon: 'fa-child',
                items: [
                    [
                        {
                            label: 'Entertainment 1',
                            items: [{ label: 'Entertainment 1.1' }, { label: 'Entertainment 1.2' }]
                        },
                        {
                            label: 'Entertainment 2',
                            items: [{ label: 'Entertainment 2.1' }, { label: 'Entertainment 2.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Entertainment 3',
                            items: [{ label: 'Entertainment 3.1' }, { label: 'Entertainment 3.2' }]
                        },
                        {
                            label: 'Entertainment 4',
                            items: [{ label: 'Entertainment 4.1' }, { label: 'Entertainment 4.2' }]
                        }
                    ]
                ]
            },
            {
                label: 'Technology', icon: 'fa-gears',
                items: [
                    [
                        {
                            label: 'Technology 1',
                            items: [{ label: 'Technology 1.1' }, { label: 'Technology 1.2' }]
                        },
                        {
                            label: 'Technology 2',
                            items: [{ label: 'Technology 2.1' }, { label: 'Technology 2.2' }]
                        },
                        {
                            label: 'Technology 3',
                            items: [{ label: 'Technology 3.1' }, { label: 'Technology 3.2' }]
                        }
                    ],
                    [
                        {
                            label: 'Technology 4',
                            items: [{ label: 'Technology 4.1' }, { label: 'Technology 4.2' }]
                        }
                    ]
                ]
            }
        ];
    };
    MegaMenuDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/megamenu/megamenudemo.html',
            directives: [megamenu_1.MegaMenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], MegaMenuDemo);
    return MegaMenuDemo;
}());
exports.MegaMenuDemo = MegaMenuDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vbWVnYW1lbnUvbWVnYW1lbnVkZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUJBQXVCLHVDQUF1QyxDQUFDLENBQUE7QUFDL0QsZ0NBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXNCLHFDQUFxQyxDQUFDLENBQUE7QUFDNUQseUJBQXVCLHNDQUFzQyxDQUFDLENBQUE7QUFDOUQsa0NBQWdDLDRCQUE0QixDQUFDLENBQUE7QUFPN0Q7SUFBQTtJQXVIQSxDQUFDO0lBbkhHLCtCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1Q7Z0JBQ0ksS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVTtnQkFDN0IsS0FBSyxFQUFFO29CQUNIO3dCQUNJOzRCQUNJLEtBQUssRUFBRSxNQUFNOzRCQUNiLEtBQUssRUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDO3lCQUMvQzt3QkFDRDs0QkFDSSxLQUFLLEVBQUUsTUFBTTs0QkFDYixLQUFLLEVBQUUsQ0FBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsQ0FBQzt5QkFDL0M7cUJBQ0o7b0JBQ0Q7d0JBQ0k7NEJBQ0ksS0FBSyxFQUFFLE1BQU07NEJBQ2IsS0FBSyxFQUFFLENBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUM7eUJBQy9DO3dCQUNEOzRCQUNJLEtBQUssRUFBRSxNQUFNOzRCQUNiLEtBQUssRUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxD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QixFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQzt5QkFDL0Q7cUJBQ0o7b0JBQ0Q7d0JBQ0k7NEJBQ0ksS0FBSyxFQUFFLGNBQWM7NEJBQ3JCLEtBQUssRUFBRSxDQUFDLEVBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQzt5QkFDL0Q7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0lBMUhMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsVUFBVSxFQUFFLENBQUMsbUJBQVEsRUFBQyxtQkFBUSxFQUFDLGlCQUFPLEVBQUMsaUNBQWUsRUFBQyxxQ0FBaUIsQ0FBQztTQUM1RSxDQUFDOztvQkFBQTtJQXdIRixtQkFBQztBQUFELENBdkhBLEFBdUhDLElBQUE7QUF2SFksb0JBQVksZUF1SHhCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9tZWdhbWVudS9tZWdhbWVudWRlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lZ2FNZW51fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL21lZ2FtZW51L21lZ2FtZW51JztcbmltcG9ydCB7Q29kZUhpZ2hsaWdodGVyfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvZGVoaWdobGlnaHRlci9jb2RlaGlnaGxpZ2h0ZXInO1xuaW1wb3J0IHtUYWJWaWV3fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFidmlldyc7XG5pbXBvcnQge1RhYlBhbmVsfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3RhYnZpZXcvdGFicGFuZWwnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9hcGkvbWVudW1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL21lZ2FtZW51L21lZ2FtZW51ZGVtby5odG1sJyxcbiAgICBkaXJlY3RpdmVzOiBbTWVnYU1lbnUsVGFiUGFuZWwsVGFiVmlldyxDb2RlSGlnaGxpZ2h0ZXIsUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51RGVtbyB7XG5cbiAgICBwcml2YXRlIGl0ZW1zOiBNZW51SXRlbVtdO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdUVicsIGljb246ICdmYS1jaGVjaycsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnVFYgMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7bGFiZWw6ICdUViAxLjEnfSx7bGFiZWw6ICdUViAxLjInfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdUViAyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tsYWJlbDogJ1RWIDIuMSd9LHtsYWJlbDogJ1RWIDIuMid9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdUViAzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tsYWJlbDogJ1RWIDMuMSd9LHtsYWJlbDogJ1RWIDMuMid9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1RWIDQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbe2xhYmVsOiAnVFYgNC4xJ30se2xhYmVsOiAnVFYgNC4yJ31dXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgIFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwb3J0cycsIGljb246ICdmYS1zb2NjZXItYmFsbC1vJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcG9ydHMgMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7bGFiZWw6ICdTcG9ydHMgMS4xJ30se2xhYmVsOiAnU3BvcnRzIDEuMid9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwb3J0cyAyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tsYWJlbDogJ1Nwb3J0cyAyLjEnfSx7bGFiZWw6ICdTcG9ydHMgMi4yJ31dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1Nwb3J0cyAzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tsYWJlbDogJ1Nwb3J0cyAzLjEnfSx7bGFiZWw6ICdTcG9ydHMgMy4yJ31dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3BvcnRzIDQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbe2xhYmVsOiAnU3BvcnRzIDQuMSd9LHtsYWJlbDogJ1Nwb3J0cyA0LjInfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3BvcnRzIDUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbe2xhYmVsOiAnU3BvcnRzIDUuMSd9LHtsYWJlbDogJ1Nwb3J0cyA1LjInfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdTcG9ydHMgNicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7bGFiZWw6ICdTcG9ydHMgNi4xJ30se2xhYmVsOiAnU3BvcnRzIDYuMid9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ0VudGVydGFpbm1lbnQnLCBpY29uOiAnZmEtY2hpbGQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ0VudGVydGFpbm1lbnQgMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7bGFiZWw6ICdFbnRlcnRhaW5tZW50IDEuMSd9LHtsYWJlbDogJ0VudGVydGFpbm1lbnQgMS4yJ31dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRW50ZXJ0YWlubWVudCAyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tsYWJlbDogJ0VudGVydGFpbm1lbnQgMi4xJ30se2xhYmVsOiAnRW50ZXJ0YWlubWVudCAyLjInfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRW50ZXJ0YWlubWVudCAzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tsYWJlbDogJ0VudGVydGFpbm1lbnQgMy4xJ30se2xhYmVsOiAnRW50ZXJ0YWlubWVudCAzLjInfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdFbnRlcnRhaW5tZW50IDQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbe2xhYmVsOiAnRW50ZXJ0YWlubWVudCA0LjEnfSx7bGFiZWw6ICdFbnRlcnRhaW5tZW50IDQuMid9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICBcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdUZWNobm9sb2d5JywgaWNvbjogJ2ZhLWdlYXJzJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdUZWNobm9sb2d5IDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbe2xhYmVsOiAnVGVjaG5vbG9neSAxLjEnfSx7bGFiZWw6ICdUZWNobm9sb2d5IDEuMid9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ1RlY2hub2xvZ3kgMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7bGFiZWw6ICdUZWNobm9sb2d5IDIuMSd9LHtsYWJlbDogJ1RlY2hub2xvZ3kgMi4yJ31dXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnVGVjaG5vbG9neSAzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tsYWJlbDogJ1RlY2hub2xvZ3kgMy4xJ30se2xhYmVsOiAnVGVjaG5vbG9neSAzLjInfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnVGVjaG5vbG9neSA0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW3tsYWJlbDogJ1RlY2hub2xvZ3kgNC4xJ30se2xhYmVsOiAnVGVjaG5vbG9neSA0LjInfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cbn0iXX0=
