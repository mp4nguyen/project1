import {OnInit, Component} from "angular2/core";

const KEY_ESC = 27;

@Component({
    selector: 'my-modal',
    template: 
    `
    <div id="myModal" class="modal fade bs-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Modal Title</h4>
                </div>
                <div class="modal-body"> Modal body goes here </div>
                <div class="modal-footer">
                    <button id = "cancelButton" type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                    <button id = "okButton" type="button" class="btn green">Save changes</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    
    `
})

export class ModalComponent implements OnInit {

    private _defaults = {
        title: 'Confirmation',
        message: 'Do you want to cancel your changes?',
        cancelText: 'Cancel',
        okText: 'OK'
    };
    title:string;
    message:string;
    okText:string;
    cancelText:string;

    private _confirmElement:any;
    private _cancelButton:any;
    private _okButton:any;

    constructor(){
        console.log('i am modal');
    }


    activate() {
        
        this._show();

    }

    private _show() {
        console.log('dialog -> show .......');
        document.onkeyup = null;


        console.log(this._confirmElement);

        if (!this._confirmElement || !this._cancelButton || !this._okButton) return;



        this._confirmElement.style.opacity = 1;
        this._confirmElement.style.zIndex = 9999;
		this._confirmElement.style.display = 'block';
		this._confirmElement.style.opacity = 1;

        console.log(this._confirmElement);

        this._cancelButton.onclick = ((e:any) => {
            e.preventDefault();
            this._hideDialog();
        })

        this._okButton.onclick = ((e:any) => {
            e.preventDefault();
            this._hideDialog()
        });

/*
        this._confirmElement.onclick = () => {
            this._hideDialog();
            return negativeOnClick(null);
        };
*/
        document.onkeyup = (e:any) => {
            if (e.which == KEY_ESC) {
                this._hideDialog();                
            }
        };

        //this._confirmElement.style.opacity = 1;
    }

    private _hideDialog() {
        document.onkeyup = null;
        this._confirmElement.style.opacity = 0;
        window.setTimeout(() => this._confirmElement.style.zIndex = -1, 400);
    }

    ngOnInit():any {
        this._confirmElement = document.getElementById('myModal');
        this._cancelButton = document.getElementById('cancelButton');
        this._okButton = document.getElementById('okButton');
        console.log('_confirmElement = ',this._confirmElement);
    }
}
