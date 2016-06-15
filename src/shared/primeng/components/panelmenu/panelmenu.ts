import {Component,ElementRef,OnDestroy,Input,EventEmitter} from 'angular2/core';
import {MenuItem} from '../api/menumodel';
import {Location} from 'angular2/common';
import {Router} from 'angular2/router-deprecated';

@Component({
    selector: 'p-panelMenuSub',
    template: `
        <ul class="ui-menu-list ui-helper-reset" [style.display]="expanded ? 'block' : 'none'">
            <li *ngFor="let child of item.items" class="ui-menuitem ui-corner-all" [ngClass]="{'ui-menu-parent':child.items}">
                <a #link [href]="getItemUrl(item)" class="ui-menuitem-link ui-corner-all" 
                    [ngClass]="{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-hover':(hoveredLink==link)}" (click)="onClick($event,child)"
                    (mouseenter)="hoveredLink=link" (mouseleave)="hoveredLink=null">
                    <span class="ui-panelmenu-icon fa fa-fw" [ngClass]="{'fa-caret-right':!isActive(child),'fa-caret-down':isActive(child)}" *ngIf="child.items"></span>
                    <span class="ui-menuitem-icon fa fa-fw" [ngClass]="child.icon" *ngIf="child.icon"></span>
                    <span class="ui-menuitem-text">{{child.label}}</span>
                </a>
                <p-panelMenuSub [item]="child" [expanded]="isActive(child)" *ngIf="child.items"></p-panelMenuSub>
            </li>
        </ul>
    `,
    directives: [PanelMenuSub]
})
export class PanelMenuSub {
    
    @Input() item: MenuItem;
    
    @Input() expanded: boolean;
    
    constructor(private router: Router, private location: Location) {}
        
    activeItems: MenuItem[] = [];
        
    onClick(event,item: MenuItem) {
        if(item.items) {
            let index = this.activeItems.indexOf(item);
            
            if(index == -1)
                this.activeItems.push(item);
            else
                this.activeItems.splice(index, 1);

            event.preventDefault();
        }
        else {
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
    }
    
    isActive(item: MenuItem): boolean {
        return this.activeItems.indexOf(item) != -1;
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
}

@Component({
    selector: 'p-panelMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-panelmenu ui-widget'">
            <div *ngFor="let item of model" class="ui-menuitem-panel">
                <div tabindex="0" [ngClass]="{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-all':!isActive(item),
                    'ui-state-active ui-corner-top':isActive(item),'ui-state-hover':(item == hoveredItem)}">
                    <span class="ui-panelmenu-icon fa fa-fw" [ngClass]="{'fa-caret-right':!isActive(item),'fa-caret-down':isActive(item)}"></span>
                    <a [href]="item.url||'#'" [ngClass]="{'ui-panelmenu-headerlink-hasicon':item.icon}" (click)="headerClick($event,item)"
                        (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null">
                        <span class="ui-menuitem-icon fa fa-fw" [ngClass]="item.icon" *ngIf="item.icon"></span>
                        <span>{{item.label}}</span>
                    </a>
                </div>
                <div class="ui-panelmenu-content ui-widget-content" [style.display]="isActive(item) ? 'block' : 'none'">
                    <p-panelMenuSub [item]="item" [expanded]="true"></p-panelMenuSub>
                </div>
            </div>
        </div>
    `,
    directives: [PanelMenuSub]
})
export class PanelMenu {
    
    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    activeItems: MenuItem[];

    constructor(private el: ElementRef) {
        this.activeItems = [];
    }

    headerClick(event, item ) {
        let index = this.activeItems.indexOf(item);
        
        if(index == -1)
            this.activeItems.push(item);
        else
            this.activeItems.splice(index, 1);
        
        event.preventDefault();
    }
        
    unsubscribe(item: any) {
        if(item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        
        if(item.items) {
            for(let childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }
    
    isActive(item: MenuItem): boolean {
        return this.activeItems.indexOf(item) != -1;
    }
        
    ngOnDestroy() {        
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }

}
