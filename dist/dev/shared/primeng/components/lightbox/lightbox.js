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
var domhandler_1 = require('../dom/domhandler');
var Lightbox = (function () {
    function Lightbox(el, domHandler, renderer) {
        this.el = el;
        this.domHandler = domHandler;
        this.renderer = renderer;
        this.type = 'image';
        this.effectDuration = '500ms';
    }
    Lightbox.prototype.onImageClick = function (event, image, i, content) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.show();
        this.displayImage(image);
        this.preventDocumentClickListener = true;
        event.preventDefault();
    };
    Lightbox.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.panel = this.domHandler.findSingle(this.el.nativeElement, '.ui-lightbox ');
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function (event) {
            if (!_this.preventDocumentClickListener && _this.visible) {
                _this.hide(event);
            }
            _this.preventDocumentClickListener = false;
        });
    };
    Lightbox.prototype.onLinkClick = function (event, content) {
        this.show();
        this.preventDocumentClickListener = true;
        event.preventDefault();
    };
    Lightbox.prototype.displayImage = function (image) {
        var _this = this;
        setTimeout(function () {
            _this.currentImage = image;
        }, 1000);
    };
    Lightbox.prototype.show = function () {
        this.mask = document.createElement('div');
        this.mask.style.zIndex = ++domhandler_1.DomHandler.zindex;
        this.domHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
        document.body.appendChild(this.mask);
        this.zindex = ++domhandler_1.DomHandler.zindex;
        this.center();
        this.visible = true;
    };
    Lightbox.prototype.hide = function (event) {
        this.captionText = null;
        this.index = null;
        this.currentImage = null;
        this.visible = false;
        this.panel.style.left = 'auto';
        this.panel.style.top = 'auto';
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
        event.preventDefault();
    };
    Lightbox.prototype.center = function () {
        var elementWidth = this.domHandler.getOuterWidth(this.panel);
        var elementHeight = this.domHandler.getOuterHeight(this.panel);
        if (elementWidth == 0 && elementHeight == 0) {
            this.panel.style.visibility = 'hidden';
            this.panel.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.panel);
            elementHeight = this.domHandler.getOuterHeight(this.panel);
            this.panel.style.display = 'none';
            this.panel.style.visibility = 'visible';
        }
        var viewport = this.domHandler.getViewport();
        var x = (viewport.width - elementWidth) / 2;
        var y = (viewport.height - elementHeight) / 2;
        this.panel.style.left = x + 'px';
        this.panel.style.top = y + 'px';
    };
    Lightbox.prototype.onImageLoad = function (event, content) {
        var _this = this;
        var image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        var imageWidth = this.domHandler.getOuterWidth(image);
        var imageHeight = this.domHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';
        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        this.panel.style.left = parseInt(this.panel.style.left) + (this.domHandler.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
        this.panel.style.top = parseInt(this.panel.style.top) + (this.domHandler.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';
        setTimeout(function () {
            _this.domHandler.fadeIn(image, 500);
            image.style.display = 'block';
            _this.loading = false;
        }, parseInt(this.effectDuration));
    };
    Lightbox.prototype.prev = function (placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index > 0) {
            this.displayImage(this.images[--this.index]);
        }
    };
    Lightbox.prototype.next = function (placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index <= (this.images.length - 1)) {
            this.displayImage(this.images[++this.index]);
        }
    };
    Object.defineProperty(Lightbox.prototype, "leftVisible", {
        get: function () {
            return this.images && this.images.length && this.index != 0 && !this.loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lightbox.prototype, "rightVisible", {
        get: function () {
            return this.images && this.images.length && this.index < (this.images.length - 1) && !this.loading;
        },
        enumerable: true,
        configurable: true
    });
    Lightbox.prototype.ngOnDestroy = function () {
        this.documentClickListener();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Lightbox.prototype, "images", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Lightbox.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Lightbox.prototype, "style", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Lightbox.prototype, "styleClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Lightbox.prototype, "easing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Lightbox.prototype, "effectDuration", void 0);
    Lightbox = __decorate([
        core_1.Component({
            selector: 'p-lightbox',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"(type == 'image')\">\n            <a *ngFor=\"let image of images; let i = index;\" [href]=\"image.source\" (click)=\"onImageClick($event,image,i,content)\">\n                <img [src]=\"image.thumbnail\" [title]=\"image.title\" [alt]=\"image.alt\">\n            </a>\n        </div>\n        <span [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"(type == 'content')\" (click)=\"onLinkClick($event,content)\">\n            <ng-content select=\"a\"></ng-content>\n        </span>\n        <div class=\"ui-lightbox ui-widget ui-helper-hidden ui-corner-all ui-shadow\" [style.display]=\"visible ? 'block' : 'none'\" [style.zIndex]=\"zindex\"\n            [style.transitionProperty]=\"'all'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\" (click)=\"preventDocumentClickListener=true\">\n           <div class=\"ui-lightbox-content-wrapper\">\n              <a class=\"ui-state-default ui-lightbox-nav-left ui-corner-right\" [style.zIndex]=\"zindex + 1\" (click)=\"prev(img)\"\n                [ngClass]=\"{'ui-helper-hidden':!leftVisible}\"><span class=\"fa fa-fw fa-caret-left\"></span></a>\n              <div #content class=\"ui-lightbox-content ui-corner-all\" #content [ngClass]=\"{'ui-lightbox-loading': loading}\" \n                [style.transitionProperty]=\"'width,height'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\">\n                <img #img [src]=\"currentImage ? currentImage.source||'' : ''\" (load)=\"onImageLoad($event,content)\" style=\"display:none\">\n                <ng-content></ng-content>\n              </div>\n              <a class=\"ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden\" [style.zIndex]=\"zindex + 1\" (click)=\"next(img)\"\n                [ngClass]=\"{'ui-helper-hidden':!rightVisible}\"><span class=\"fa fa-fw fa-caret-right\"></span></a>\n           </div>\n           <div class=\"ui-lightbox-caption ui-widget-header\" [style.display]=\"captionText ? 'block' : 'none'\">\n              <span class=\"ui-lightbox-caption-text\">{{captionText}}</span><a class=\"ui-lightbox-close ui-corner-all\" href=\"#\" (click)=\"hide($event)\"><span class=\"fa fa-fw fa-close\"></span></a>\n              <div style=\"clear:both\"></div>\n           </div>\n        </div>\n    ",
            providers: [domhandler_1.DomHandler]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
    ], Lightbox);
    return Lightbox;
}());
exports.Lightbox = Lightbox;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvbGlnaHRib3gvbGlnaHRib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUFpRixlQUFlLENBQUMsQ0FBQTtBQUNqRywyQkFBeUIsbUJBQW1CLENBQUMsQ0FBQTtBQWtDN0M7SUFrQ0ksa0JBQW9CLEVBQWMsRUFBVSxVQUFzQixFQUFVLFFBQWtCO1FBQTFFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQTlCckYsU0FBSSxHQUFXLE9BQU8sQ0FBQztRQVF2QixtQkFBYyxHQUFRLE9BQU8sQ0FBQztJQXNCMEQsQ0FBQztJQUVsRywrQkFBWSxHQUFaLFVBQWEsS0FBSyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsT0FBTztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7UUFDekMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxrQ0FBZSxHQUFmO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRWhGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJ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Q0FBQyxPQUFPLENBQUM7UUFDdkcsQ0FBQzs7O09BQUE7SUFFRCw4QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQXJLRDtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7MENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7MkNBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7Z0RBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7NENBQUE7SUFFUjtRQUFDLFlBQUssRUFBRTs7b0RBQUE7SUE1Q1o7UUFBQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLDAxRUEyQlQ7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBVSxDQUFDO1NBQzFCLENBQUM7O2dCQUFBO0lBMEtGLGVBQUM7QUFBRCxDQXpLQSxBQXlLQyxJQUFBO0FBektZLGdCQUFRLFdBeUtwQixDQUFBIiwiZmlsZSI6InNoYXJlZC9wcmltZW5nL2NvbXBvbmVudHMvbGlnaHRib3gvbGlnaHRib3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCxFbGVtZW50UmVmLElucHV0LE91dHB1dCxSZW5kZXJlcixBZnRlclZpZXdJbml0LE9uRGVzdHJveX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJy4uL2RvbS9kb21oYW5kbGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWxpZ2h0Ym94JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cIih0eXBlID09ICdpbWFnZScpXCI+XG4gICAgICAgICAgICA8YSAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VzOyBsZXQgaSA9IGluZGV4O1wiIFtocmVmXT1cImltYWdlLnNvdXJjZVwiIChjbGljayk9XCJvbkltYWdlQ2xpY2soJGV2ZW50LGltYWdlLGksY29udGVudClcIj5cbiAgICAgICAgICAgICAgICA8aW1nIFtzcmNdPVwiaW1hZ2UudGh1bWJuYWlsXCIgW3RpdGxlXT1cImltYWdlLnRpdGxlXCIgW2FsdF09XCJpbWFnZS5hbHRcIj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cIih0eXBlID09ICdjb250ZW50JylcIiAoY2xpY2spPVwib25MaW5rQ2xpY2soJGV2ZW50LGNvbnRlbnQpXCI+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJhXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saWdodGJveCB1aS13aWRnZXQgdWktaGVscGVyLWhpZGRlbiB1aS1jb3JuZXItYWxsIHVpLXNoYWRvd1wiIFtzdHlsZS5kaXNwbGF5XT1cInZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXCIgW3N0eWxlLnpJbmRleF09XCJ6aW5kZXhcIlxuICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eV09XCInYWxsJ1wiIFtzdHlsZS50cmFuc2l0aW9uRHVyYXRpb25dPVwiZWZmZWN0RHVyYXRpb25cIiBbc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uXT1cImVhc2luZ1wiIChjbGljayk9XCJwcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyPXRydWVcIj5cbiAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWxpZ2h0Ym94LWNvbnRlbnQtd3JhcHBlclwiPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInVpLXN0YXRlLWRlZmF1bHQgdWktbGlnaHRib3gtbmF2LWxlZnQgdWktY29ybmVyLXJpZ2h0XCIgW3N0eWxlLnpJbmRleF09XCJ6aW5kZXggKyAxXCIgKGNsaWNrKT1cInByZXYoaW1nKVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzohbGVmdFZpc2libGV9XCI+PHNwYW4gY2xhc3M9XCJmYSBmYS1mdyBmYS1jYXJldC1sZWZ0XCI+PC9zcGFuPjwvYT5cbiAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInVpLWxpZ2h0Ym94LWNvbnRlbnQgdWktY29ybmVyLWFsbFwiICNjb250ZW50IFtuZ0NsYXNzXT1cInsndWktbGlnaHRib3gtbG9hZGluZyc6IGxvYWRpbmd9XCIgXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eV09XCInd2lkdGgsaGVpZ2h0J1wiIFtzdHlsZS50cmFuc2l0aW9uRHVyYXRpb25dPVwiZWZmZWN0RHVyYXRpb25cIiBbc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uXT1cImVhc2luZ1wiPlxuICAgICAgICAgICAgICAgIDxpbWcgI2ltZyBbc3JjXT1cImN1cnJlbnRJbWFnZSA/IGN1cnJlbnRJbWFnZS5zb3VyY2V8fCcnIDogJydcIiAobG9hZCk9XCJvbkltYWdlTG9hZCgkZXZlbnQsY29udGVudClcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwidWktc3RhdGUtZGVmYXVsdCB1aS1saWdodGJveC1uYXYtcmlnaHQgdWktY29ybmVyLWxlZnQgdWktaGVscGVyLWhpZGRlblwiIFtzdHlsZS56SW5kZXhdPVwiemluZGV4ICsgMVwiIChjbGljayk9XCJuZXh0KGltZylcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IXJpZ2h0VmlzaWJsZX1cIj48c3BhbiBjbGFzcz1cImZhIGZhLWZ3IGZhLWNhcmV0LXJpZ2h0XCI+PC9zcGFuPjwvYT5cbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saWdodGJveC1jYXB0aW9uIHVpLXdpZGdldC1oZWFkZXJcIiBbc3R5bGUuZGlzcGxheV09XCJjYXB0aW9uVGV4dCA/ICdibG9jaycgOiAnbm9uZSdcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1saWdodGJveC1jYXB0aW9uLXRleHRcIj57e2NhcHRpb25UZXh0fX08L3NwYW4+PGEgY2xhc3M9XCJ1aS1saWdodGJveC1jbG9zZSB1aS1jb3JuZXItYWxsXCIgaHJlZj1cIiNcIiAoY2xpY2spPVwiaGlkZSgkZXZlbnQpXCI+PHNwYW4gY2xhc3M9XCJmYSBmYS1mdyBmYS1jbG9zZVwiPjwvc3Bhbj48L2E+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJjbGVhcjpib3RoXCI+PC9kaXY+XG4gICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0RvbUhhbmRsZXJdXG59KVxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3l7IFxuXG4gICAgQElucHV0KCkgaW1hZ2VzOiBhbnlbXTtcbiAgICBcbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAnaW1hZ2UnO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcbiAgICAgICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGVhc2luZzogJ2Vhc2Utb3V0JztcbiAgICBcbiAgICBASW5wdXQoKSBlZmZlY3REdXJhdGlvbjogYW55ID0gJzUwMG1zJztcbiAgICAgICAgICAgICAgICBcbiAgICBwcml2YXRlIHZpc2libGU6IGJvb2xlYW47XG4gICAgXG4gICAgcHJpdmF0ZSBsb2FkaW5nOiBib29sZWFuO1xuICAgICAgICBcbiAgICBwcml2YXRlIGN1cnJlbnRJbWFnZTogYW55O1xuICAgIFxuICAgIHByaXZhdGUgY2FwdGlvblRleHQ6IHN0cmluZztcbiAgICBcbiAgICBwcml2YXRlIHppbmRleDogYW55O1xuICAgIFxuICAgIHByaXZhdGUgcGFuZWw6IGFueTtcbiAgICBcbiAgICBwcml2YXRlIGluZGV4OiBudW1iZXI7XG4gICAgXG4gICAgcHJpdmF0ZSBtYXNrOiBhbnk7XG4gICAgXG4gICAgcHJpdmF0ZSBwcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyOiBib29sZWFuO1xuICAgIFxuICAgIHByaXZhdGUgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIGRvbUhhbmRsZXI6IERvbUhhbmRsZXIsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxuICAgICAgICAgICAgICAgIFxuICAgIG9uSW1hZ2VDbGljayhldmVudCxpbWFnZSxpLGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIGNvbnRlbnQuc3R5bGUud2lkdGggPSAzMiArICdweCc7XG4gICAgICAgIGNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gMzIgKyAncHgnO1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5SW1hZ2UoaW1hZ2UpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdHJ1ZTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhbmVsID0gdGhpcy5kb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLnVpLWxpZ2h0Ym94ICcpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbkdsb2JhbCgnYm9keScsICdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYoIXRoaXMucHJldmVudERvY3VtZW50Q2xpY2tMaXN0ZW5lciYmdGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJldmVudERvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgb25MaW5rQ2xpY2soZXZlbnQsY29udGVudCkge1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdHJ1ZTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgZGlzcGxheUltYWdlKGltYWdlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICAgIFxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMubWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLm1hc2suc3R5bGUuekluZGV4ID0gKytEb21IYW5kbGVyLnppbmRleDtcbiAgICAgICAgdGhpcy5kb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3Nlcyh0aGlzLm1hc2ssICd1aS13aWRnZXQtb3ZlcmxheSB1aS1kaWFsb2ctbWFzaycpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWFzayk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnppbmRleCA9ICsrRG9tSGFuZGxlci56aW5kZXg7XG4gICAgICAgIHRoaXMuY2VudGVyKCk7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIGhpZGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IG51bGw7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLmxlZnQgPSAnYXV0byc7XG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUudG9wID0gJ2F1dG8nO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMubWFzayk7XG4gICAgICAgICAgICB0aGlzLm1hc2sgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICBjZW50ZXIoKSB7XG4gICAgICAgIGxldCBlbGVtZW50V2lkdGggPSB0aGlzLmRvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLnBhbmVsKTtcbiAgICAgICAgbGV0IGVsZW1lbnRIZWlnaHQgPSB0aGlzLmRvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5wYW5lbCk7XG4gICAgICAgIGlmKGVsZW1lbnRXaWR0aCA9PSAwICYmIGVsZW1lbnRIZWlnaHQgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgZWxlbWVudFdpZHRoID0gdGhpcy5kb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5wYW5lbCk7XG4gICAgICAgICAgICBlbGVtZW50SGVpZ2h0ID0gdGhpcy5kb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMucGFuZWwpO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aWV3cG9ydCA9IHRoaXMuZG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xuICAgICAgICBsZXQgeCA9ICh2aWV3cG9ydC53aWR0aCAtIGVsZW1lbnRXaWR0aCkgLyAyO1xuICAgICAgICBsZXQgeSA9ICh2aWV3cG9ydC5oZWlnaHQgLSBlbGVtZW50SGVpZ2h0KSAvIDI7XG5cbiAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5sZWZ0ID0geCArICdweCc7XG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUudG9wID0geSArICdweCc7XG4gICAgfVxuICAgICAgICBcbiAgICBvbkltYWdlTG9hZChldmVudCxjb250ZW50KSB7XG4gICAgICAgIGxldCBpbWFnZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaW1hZ2Uuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICBpbWFnZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgbGV0IGltYWdlV2lkdGggPSB0aGlzLmRvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aChpbWFnZSk7XG4gICAgICAgIGxldCBpbWFnZUhlaWdodCA9IHRoaXMuZG9tSGFuZGxlci5nZXRPdXRlckhlaWdodChpbWFnZSk7XG4gICAgICAgIGltYWdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGltYWdlLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cbiAgICAgICAgY29udGVudC5zdHlsZS53aWR0aCA9IGltYWdlV2lkdGggKyAncHgnO1xuICAgICAgICBjb250ZW50LnN0eWxlLmhlaWdodCA9IGltYWdlSGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS5sZWZ0KSArICh0aGlzLmRvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLnBhbmVsKSAtIGltYWdlV2lkdGgpIC8gMiArICdweCc7XG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUudG9wID0gcGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS50b3ApICsgKHRoaXMuZG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnBhbmVsKSAtIGltYWdlSGVpZ2h0KSAvIDIgKyAncHgnO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb21IYW5kbGVyLmZhZGVJbihpbWFnZSwgNTAwKTtcbiAgICAgICAgICAgIGltYWdlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgLy90aGlzLmNhcHRpb25UZXh0ID0gdGhpcy5jdXJyZW50SW1hZ2UudGl0bGU7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgcGFyc2VJbnQodGhpcy5lZmZlY3REdXJhdGlvbikpO1xuICAgIH1cbiAgICBcbiAgICBwcmV2KHBsYWNlaG9sZGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHBsYWNlaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmKHRoaXMuaW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJbWFnZSh0aGlzLmltYWdlc1stLXRoaXMuaW5kZXhdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZXh0KHBsYWNlaG9sZGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHBsYWNlaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmKHRoaXMuaW5kZXggPD0gKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJbWFnZSh0aGlzLmltYWdlc1srK3RoaXMuaW5kZXhdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgZ2V0IGxlZnRWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGggJiYgdGhpcy5pbmRleCAhPSAwICYmICF0aGlzLmxvYWRpbmc7IFxuICAgIH1cbiAgICBcbiAgICBnZXQgcmlnaHRWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGggJiYgdGhpcy5pbmRleCA8ICh0aGlzLmltYWdlcy5sZW5ndGggLSAxKSAmJiAhdGhpcy5sb2FkaW5nOyBcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgfVxuICAgICAgICBcbn0iXX0=
