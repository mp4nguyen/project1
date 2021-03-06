import {Component,Input,OnDestroy,EventEmitter} from 'angular2/core';
import {MenuItem} from '../api/menumodel';
import {Location} from 'angular2/common';
import {Router} from 'angular2/router-deprecated';

@Component({
    selector: 'p-breadcrumb',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all'">
            <ul>
                <li class="fa fa-home"></li>
                <template ngFor let-item let-end="last" [ngForOf]="model">
                    <li role="menuitem">
                        <a [href]="getItemUrl(item)" class="ui-menuitem-link" (click)="itemClick($event, item)">
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                    <li class="ui-breadcrumb-chevron fa fa-chevron-right" *ngIf="!end"></li>
                </template>
            </ul>
        </div>
    `
})
export class Breadcrumb implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    constructor(private router: Router, private location: Location) {}
    
    itemClick(event, item: MenuItem) {
        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit(event);
        }
                
        if(!item.url) {
            event.preventDefault();
        }
    }
    
    getItemUrl(item: MenuItem): string {
        if(item.url) {
            if(Array.isArray(item.url))
                return this.location.prepareExternalUrl(this.router.generate(item.url).toLinkUrl());
            else
                return item.url;
        }
        else {
            return '#';
        }
    }
    
    ngOnDestroy() {
        if(this.model) {
            for(let item of this.model) {
                if(item.eventEmitter) {
                    item.eventEmitter.unsubscribe();
                }
            }
        }
    }

}