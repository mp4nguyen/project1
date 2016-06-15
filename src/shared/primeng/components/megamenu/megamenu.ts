import {Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer,EventEmitter} from 'angular2/core';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../api/menumodel';
import {Location} from 'angular2/common';
import {Router} from 'angular2/router-deprecated';

@Component({
    selector: 'p-megaMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style"
            [ngClass]="{'ui-menu ui-menubar ui-megamenu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-megamenu-vertical': orientation == 'vertical'}">
            <ul class="ui-menu-list ui-helper-reset">
                <template ngFor let-category [ngForOf]="model">
                    <li #item [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':category.items,'ui-menuitem-active':item==activeItem}"
                        (mouseenter)="onItemMouseEnter($event, item)" (mouseleave)="onItemMouseLeave($event, item)">
                        <a #link class="ui-menuitem-link ui-corner-all ui-submenu-link" [ngClass]="{'ui-state-hover':link==activeLink}">
                            <span class="ui-submenu-icon fa fa-fw" [ngClass]="{'fa-caret-down':orientation=='horizontal','fa-caret-right':orientation=='vertical'}"></span>
                            <span class="ui-menuitem-icon fa fa-fw" [ngClass]="category.icon"></span>
                            {{category.label}}
                        </a>
                        <div class="ui-megamenu-panel ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow">
                            <div class="ui-grid">
                                <div class="ui-grid-row">
                                    <template ngFor let-column [ngForOf]="category.items">
                                        <div [class]="getColumnClass(category)">
                                            <template ngFor let-submenu [ngForOf]="column">
                                                <ul class="ui-menu-list ui-helper-reset">
                                                    <li class="ui-widget-header ui-corner-all"><h3>{{submenu.label}}</h3></li>
                                                    <li *ngFor="let item of submenu.items" class="ui-menuitem ui-widget ui-corner-all">
                                                        <a #link [href]="getItemUrl(item)" class="ui-menuitem-link ui-corner-all" [ngClass]="{'ui-state-hover':link==hoveredItem}"
                                                            (mouseenter)="hoveredItem=$event.target" (mouseleave)="hoveredItem=null" (click)="itemClick($event, item)">
                                                            <span class="ui-menuitem-icon fa fa-fw" *ngIf="item.icon" [ngClass]="item.icon"></span>
                                                            <span class="ui-menuitem-text">{{item.label}}</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </template>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    `,
    providers: [DomHandler]
})
export class MegaMenu implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() orientation: string = 'horizontal';
    
    activeItem: any;
    
    activeLink: any;
            
    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer, private router: Router, private location: Location) {}
    
    onItemMouseEnter(event, item) {
        this.activeItem = item;
        this.activeLink = item.children[0];
        let submenu =  item.children[0].nextElementSibling;
        if(submenu) {
            submenu.style.zIndex = ++DomHandler.zindex;

            if(this.orientation === 'horizontal')  {
                submenu.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                submenu.style.left = '0px';
            }
            else if(this.orientation === 'vertical')  {
                submenu.style.top = '0px';
                submenu.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    }
    
    onItemMouseLeave(event, link) {
        this.activeItem = null;
        this.activeLink = null;
    }
    
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
        
        this.activeItem = null;
        this.activeLink = null;
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
    
    ngOnDestroy() {        
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }
    
    getColumnClass(menuitem: MenuItem) {
        let length = menuitem.items ? menuitem.items.length: 0;
        let columnClass;
        switch(length) {
            case 2:
                columnClass= 'ui-grid-col-6';
            break;
            
            case 3:
                columnClass= 'ui-grid-col-4';
            break;
            
            case 4:
                columnClass= 'ui-grid-col-3';
            break;
            
            case 6:
                columnClass= 'ui-grid-col-2';
            break;
                        
            default:
                columnClass= 'ui-grid-col-12';
            break;
        }
        
        return columnClass;
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