import {Component,Input,ViewChild,ElementRef,Renderer} from "angular2/core";
import {Observable} from 'rxjs/Observable';
//import {Observable} from 'rxjs/';

const KEY_ESC = 27;

@Component({
    selector: 'my-dialog',
    template: 
    `
    <div #myDialog id="backGroundModal" class="dialog-container" (click)="backgroundClicked($event)">
       <div id="mainModal" class="mdl-card mdl-shadow--16dp" (click)="mainClicked($event)">
           <ng-content></ng-content>
       </div>
    </div>
    
    `
    styleUrls: ['./shared/components/dialog/dialog.component.css']
})

export class DialogComponent{

    @Input() disableClose: boolean;
    @ViewChild('myDialog') myDialog:ElementRef;
    private observer:any;
    private _backgroundElement:any;
    private _mainElement:any;
    private _cancelButton:any;
    private _okButton:any;
    private _isBackgroundClicked: boolean = false;
    private _isMainModalClicked: boolean = false;

    constructor(private _el: ElementRef, private _renderer: Renderer) {

    }
    

    activate():Observable<any> {
        console.log('dialog -> activate !');
        let obs = new Observable(o => this.observer = o);
        this._show();
        return obs;        
    }

    close(func:any){
        if(typeof func === "function"){
            func();    
        }        
        this.observer.next('CLOSE');
        this._hideDialog();        
    }

    cancel(func:any){
        if(typeof func === "function"){
            func();    
        }        
        this.observer.next('CANCEL');
        this._hideDialog();        
    }

    ok(func:any){
        if(typeof func === "function"){
            func();    
        }        
        this.observer.next('OK');
        this._hideDialog();
    }

    private _show() {
        
        document.onkeyup = null;

        this._renderer.setElementStyle(this.myDialog.nativeElement, 'opacity', '1');
        this._renderer.setElementStyle(this.myDialog.nativeElement, 'zIndex', '9999');

        document.onkeyup = (e:any) => {
            if (e.which == KEY_ESC) {
                this.close(null);
            }
        };
        
    }

    private _hideDialog() {
        document.onkeyup = null;
        this._renderer.setElementStyle(this.myDialog.nativeElement, 'opacity', '0');               
        window.setTimeout(() => this._renderer.setElementStyle(this.myDialog.nativeElement, 'zIndex', '-1'), 400);
    }


    backgroundClicked(event){
        
        if(!this._isMainModalClicked){
            this.close(null);
        }
        this._isMainModalClicked = false;
    }

    mainClicked(event){
        
        this._isMainModalClicked = true;
    }
}