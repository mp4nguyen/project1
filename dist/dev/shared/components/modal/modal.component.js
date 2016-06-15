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
var core_1 = require("angular2/core");
var KEY_ESC = 27;
var ModalComponent = (function () {
    function ModalComponent() {
        this._defaults = {
            title: 'Confirmation',
            message: 'Do you want to cancel your changes?',
            cancelText: 'Cancel',
            okText: 'OK'
        };
        console.log('i am modal');
    }
    ModalComponent.prototype.activate = function () {
        this._show();
    };
    ModalComponent.prototype._show = function () {
        var _this = this;
        console.log('dialog -> show .......');
        document.onkeyup = null;
        console.log(this._confirmElement);
        if (!this._confirmElement || !this._cancelButton || !this._okButton)
            return;
        this._confirmElement.style.opacity = 1;
        this._confirmElement.style.zIndex = 9999;
        this._confirmElement.style.display = 'block';
        this._confirmElement.style.opacity = 1;
        console.log(this._confirmElement);
        this._cancelButton.onclick = (function (e) {
            e.preventDefault();
            _this._hideDialog();
        });
        this._okButton.onclick = (function (e) {
            e.preventDefault();
            _this._hideDialog();
        });
        document.onkeyup = function (e) {
            if (e.which == KEY_ESC) {
                _this._hideDialog();
            }
        };
    };
    ModalComponent.prototype._hideDialog = function () {
        var _this = this;
        document.onkeyup = null;
        this._confirmElement.style.opacity = 0;
        window.setTimeout(function () { return _this._confirmElement.style.zIndex = -1; }, 400);
    };
    ModalComponent.prototype.ngOnInit = function () {
        this._confirmElement = document.getElementById('myModal');
        this._cancelButton = document.getElementById('cancelButton');
        this._okButton = document.getElementById('okButton');
        console.log('_confirmElement = ', this._confirmElement);
    };
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'my-modal',
            template: "\n    <div id=\"myModal\" class=\"modal fade bs-modal-lg\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-lg\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"></button>\n                    <h4 class=\"modal-title\">Modal Title</h4>\n                </div>\n                <div class=\"modal-body\"> Modal body goes here </div>\n                <div class=\"modal-footer\">\n                    <button id = \"cancelButton\" type=\"button\" class=\"btn dark btn-outline\" data-dismiss=\"modal\">Close</button>\n                    <button id = \"okButton\" type=\"button\" class=\"btn green\">Save changes</button>\n                </div>\n            </div>\n            <!-- /.modal-content -->\n        </div>\n        <!-- /.modal-dialog -->\n    </div>\n    \n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9jb21wb25lbnRzL21vZGFsL21vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBRWhELElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQTJCbkI7SUFpQkk7UUFmUSxjQUFTLEdBQUc7WUFDaEIsS0FBSyxFQUFFLGNBQWM7WUFDckIsT0FBTyxFQUFFLHFDQUFxQztZQUM5QyxVQUFVLEVBQUUsUUFBUTtZQUNwQixNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUM7UUFXRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFHRCxpQ0FBUSxHQUFSO1FBRUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWpCLENBQUM7SUFFTyw4QkFBSyxHQUFiO1FBQUEsaUJBeUNDO1FBeENHLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0QyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUd4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUk1RSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWpDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsVUFBQyxDQUFLO1lBQ2hDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQUMsQ0FBSztZQUM1QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBUUgsUUFBUSxDQUFDLE9BQU8sR0FBRyxVQUFDLENBQUs7WUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQztRQUNMLENBQUMsQ0FBQztJQUdOLENBQUM7SUFFTyxvQ0FBVyxHQUFuQjtRQUFBLGlCQUlDO1FBSEcsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQXRDLENBQXNDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBM0dMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFDUix1OEJBbUJDO1NBQ0osQ0FBQzs7c0JBQUE7SUFxRkYscUJBQUM7QUFBRCxDQW5GQSxBQW1GQyxJQUFBO0FBbkZZLHNCQUFjLGlCQW1GMUIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvY29tcG9uZW50cy9tb2RhbC9tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09uSW5pdCwgQ29tcG9uZW50fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xuXG5jb25zdCBLRVlfRVNDID0gMjc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktbW9kYWwnLFxuICAgIHRlbXBsYXRlOiBcbiAgICBgXG4gICAgPGRpdiBpZD1cIm15TW9kYWxcIiBjbGFzcz1cIm1vZGFsIGZhZGUgYnMtbW9kYWwtbGdcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+TW9kYWwgVGl0bGU8L2g0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+IE1vZGFsIGJvZHkgZ29lcyBoZXJlIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZCA9IFwiY2FuY2VsQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGRhcmsgYnRuLW91dGxpbmVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQgPSBcIm9rQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGdyZWVuXCI+U2F2ZSBjaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwhLS0gLy5tb2RhbC1jb250ZW50IC0tPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSAvLm1vZGFsLWRpYWxvZyAtLT5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHJpdmF0ZSBfZGVmYXVsdHMgPSB7XG4gICAgICAgIHRpdGxlOiAnQ29uZmlybWF0aW9uJyxcbiAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IHRvIGNhbmNlbCB5b3VyIGNoYW5nZXM/JyxcbiAgICAgICAgY2FuY2VsVGV4dDogJ0NhbmNlbCcsXG4gICAgICAgIG9rVGV4dDogJ09LJ1xuICAgIH07XG4gICAgdGl0bGU6c3RyaW5nO1xuICAgIG1lc3NhZ2U6c3RyaW5nO1xuICAgIG9rVGV4dDpzdHJpbmc7XG4gICAgY2FuY2VsVGV4dDpzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9jb25maXJtRWxlbWVudDphbnk7XG4gICAgcHJpdmF0ZSBfY2FuY2VsQnV0dG9uOmFueTtcbiAgICBwcml2YXRlIF9va0J1dHRvbjphbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBjb25zb2xlLmxvZygnaSBhbSBtb2RhbCcpO1xuICAgIH1cblxuXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9zaG93KCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlhbG9nIC0+IHNob3cgLi4uLi4uLicpO1xuICAgICAgICBkb2N1bWVudC5vbmtleXVwID0gbnVsbDtcblxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2NvbmZpcm1FbGVtZW50KTtcblxuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpcm1FbGVtZW50IHx8ICF0aGlzLl9jYW5jZWxCdXR0b24gfHwgIXRoaXMuX29rQnV0dG9uKSByZXR1cm47XG5cblxuXG4gICAgICAgIHRoaXMuX2NvbmZpcm1FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICB0aGlzLl9jb25maXJtRWxlbWVudC5zdHlsZS56SW5kZXggPSA5OTk5O1xuXHRcdHRoaXMuX2NvbmZpcm1FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdHRoaXMuX2NvbmZpcm1FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2NvbmZpcm1FbGVtZW50KTtcblxuICAgICAgICB0aGlzLl9jYW5jZWxCdXR0b24ub25jbGljayA9ICgoZTphbnkpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuX2hpZGVEaWFsb2coKTtcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLl9va0J1dHRvbi5vbmNsaWNrID0gKChlOmFueSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5faGlkZURpYWxvZygpXG4gICAgICAgIH0pO1xuXG4vKlxuICAgICAgICB0aGlzLl9jb25maXJtRWxlbWVudC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5faGlkZURpYWxvZygpO1xuICAgICAgICAgICAgcmV0dXJuIG5lZ2F0aXZlT25DbGljayhudWxsKTtcbiAgICAgICAgfTtcbiovXG4gICAgICAgIGRvY3VtZW50Lm9ua2V5dXAgPSAoZTphbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlLndoaWNoID09IEtFWV9FU0MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oaWRlRGlhbG9nKCk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vdGhpcy5fY29uZmlybUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGlkZURpYWxvZygpIHtcbiAgICAgICAgZG9jdW1lbnQub25rZXl1cCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NvbmZpcm1FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLl9jb25maXJtRWxlbWVudC5zdHlsZS56SW5kZXggPSAtMSwgNDAwKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOmFueSB7XG4gICAgICAgIHRoaXMuX2NvbmZpcm1FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215TW9kYWwnKTtcbiAgICAgICAgdGhpcy5fY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbmNlbEJ1dHRvbicpO1xuICAgICAgICB0aGlzLl9va0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdva0J1dHRvbicpO1xuICAgICAgICBjb25zb2xlLmxvZygnX2NvbmZpcm1FbGVtZW50ID0gJyx0aGlzLl9jb25maXJtRWxlbWVudCk7XG4gICAgfVxufVxuIl19
