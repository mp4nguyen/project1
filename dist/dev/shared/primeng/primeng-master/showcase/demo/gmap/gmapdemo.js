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
var gmap_1 = require('../../../components/gmap/gmap');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var dialog_1 = require('../../../components/dialog/dialog');
var growl_1 = require('../../../components/growl/growl');
var checkbox_1 = require('../../../components/checkbox/checkbox');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var footer_1 = require('../../../components/common/footer');
var router_deprecated_1 = require('angular2/router-deprecated');
var GMapDemo = (function () {
    function GMapDemo() {
        this.msgs = [];
    }
    GMapDemo.prototype.ngOnInit = function () {
        this.options = {
            center: { lat: 36.890257, lng: 30.707417 },
            zoom: 12
        };
        this.initOverlays();
        this.infoWindow = new google.maps.InfoWindow();
    };
    GMapDemo.prototype.handleMapClick = function (event) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
    };
    GMapDemo.prototype.handleOverlayClick = function (event) {
        this.msgs = [];
        var isMarker = event.overlay.getTitle != undefined;
        if (isMarker) {
            var title = event.overlay.getTitle();
            this.infoWindow.setContent('<div>' + title + '</div>');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
            this.msgs.push({ severity: 'info', summary: 'Marker Selected', detail: title });
        }
        else {
            this.msgs.push({ severity: 'info', summary: 'Shape Selected', detail: '' });
        }
    };
    GMapDemo.prototype.addMarker = function () {
        this.overlays.push(new google.maps.Marker({ position: { lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() }, title: this.markerTitle, draggable: this.draggable }));
        this.markerTitle = null;
        this.dialogVisible = false;
    };
    GMapDemo.prototype.handleDragEnd = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle() });
    };
    GMapDemo.prototype.initOverlays = function () {
        if (!this.overlays || !this.overlays.length) {
            this.overlays = [
                new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
                new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
                new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
                new google.maps.Polygon({ paths: [
                        { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
                    ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
                }),
                new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
                new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
            ];
        }
    };
    GMapDemo.prototype.zoomIn = function (map) {
        map.setZoom(map.getZoom() + 1);
    };
    GMapDemo.prototype.zoomOut = function (map) {
        map.setZoom(map.getZoom() - 1);
    };
    GMapDemo.prototype.clear = function () {
        this.overlays = [];
    };
    GMapDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/gmap/gmapdemo.html',
            directives: [gmap_1.GMap, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, dialog_1.Dialog, inputtext_1.InputText, checkbox_1.Checkbox, growl_1.Growl, footer_1.Footer, codehighlighter_1.CodeHighlighter, router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], GMapDemo);
    return GMapDemo;
}());
exports.GMapDemo = GMapDemo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9wcmltZW5nL3ByaW1lbmctbWFzdGVyL3Nob3djYXNlL2RlbW8vZ21hcC9nbWFwZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQStCLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLHFCQUFtQiwrQkFBK0IsQ0FBQyxDQUFBO0FBQ25ELGdDQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBQ3BGLHdCQUFzQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQzVELHlCQUF1QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQzlELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3pELHNCQUFvQixpQ0FBaUMsQ0FBQyxDQUFBO0FBQ3RELHlCQUF1Qix1Q0FBdUMsQ0FBQyxDQUFBO0FBQy9ELDBCQUF3Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ2xFLHVCQUFxQixtQ0FBbUMsQ0FBQyxDQUFBO0FBRXpELGtDQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBUTdEO0lBQUE7UUFnQkksU0FBSSxHQUFjLEVBQUUsQ0FBQztJQXlFekIsQ0FBQztJQXZFRywyQkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLE1BQU0sRUFBRSxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQztZQUN4QyxJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxLQUFLO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxxQ0FBa0Is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LENBQUMsT0FBTyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELDBCQUFPLEdBQVAsVUFBUSxHQUFHO1FBQ1AsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELHdCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBNUZMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFdBQVcsRUFBRSxrQ0FBa0M7WUFDL0MsVUFBVSxFQUFFLENBQUMsV0FBSSxFQUFDLG1CQUFRLEVBQUMsaUJBQU8sRUFBQyxlQUFNLEVBQUMsZUFBTSxFQUFDLHFCQUFTLEVBQUMsbUJBQVEsRUFBQyxhQUFLLEVBQUMsZUFBTSxFQUFDLGlDQUFlLEVBQUMscUNBQWlCLENBQUM7U0FDdEgsQ0FBQzs7Z0JBQUE7SUEwRkYsZUFBQztBQUFELENBekZBLEFBeUZDLElBQUE7QUF6RlksZ0JBQVEsV0F5RnBCLENBQUEiLCJmaWxlIjoic2hhcmVkL3ByaW1lbmcvcHJpbWVuZy1tYXN0ZXIvc2hvd2Nhc2UvZGVtby9nbWFwL2dtYXBkZW1vLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsT25Jbml0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7R01hcH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9nbWFwL2dtYXAnO1xuaW1wb3J0IHtDb2RlSGlnaGxpZ2h0ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29kZWhpZ2hsaWdodGVyL2NvZGVoaWdobGlnaHRlcic7XG5pbXBvcnQge1RhYlZpZXd9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJ2aWV3JztcbmltcG9ydCB7VGFiUGFuZWx9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFidmlldy90YWJwYW5lbCc7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24vYnV0dG9uJztcbmltcG9ydCB7RGlhbG9nfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cnO1xuaW1wb3J0IHtHcm93bH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9ncm93bC9ncm93bCc7XG5pbXBvcnQge0NoZWNrYm94fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NoZWNrYm94L2NoZWNrYm94JztcbmltcG9ydCB7SW5wdXRUZXh0fSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2lucHV0dGV4dC9pbnB1dHRleHQnO1xuaW1wb3J0IHtGb290ZXJ9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL2Zvb3Rlcic7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvYXBpL21lc3NhZ2UnO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyLWRlcHJlY2F0ZWQnO1xuXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6ICdzaG93Y2FzZS9kZW1vL2dtYXAvZ21hcGRlbW8uaHRtbCcsXG4gICAgZGlyZWN0aXZlczogW0dNYXAsVGFiUGFuZWwsVGFiVmlldyxCdXR0b24sRGlhbG9nLElucHV0VGV4dCxDaGVja2JveCxHcm93bCxGb290ZXIsQ29kZUhpZ2hsaWdodGVyLFJPVVRFUl9ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBHTWFwRGVtbyBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBvcHRpb25zOiBhbnk7XG4gICAgXG4gICAgb3ZlcmxheXM6IGFueVtdO1xuICAgIFxuICAgIGRpYWxvZ1Zpc2libGU6IGJvb2xlYW47XG4gICAgXG4gICAgbWFya2VyVGl0bGU6IHN0cmluZztcbiAgICBcbiAgICBzZWxlY3RlZFBvc2l0aW9uOiBhbnk7XG4gICAgXG4gICAgaW5mb1dpbmRvdzogYW55O1xuICAgIFxuICAgIGRyYWdnYWJsZTogYm9vbGVhbjtcbiAgICBcbiAgICBtc2dzOiBNZXNzYWdlW10gPSBbXTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjZW50ZXI6IHtsYXQ6IDM2Ljg5MDI1NywgbG5nOiAzMC43MDc0MTd9LFxuICAgICAgICAgICAgem9vbTogMTJcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdE92ZXJsYXlzKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdygpO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVNYXBDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLmRpYWxvZ1Zpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUG9zaXRpb24gPSBldmVudC5sYXRMbmc7XG4gICAgfVxuICAgIFxuICAgIGhhbmRsZU92ZXJsYXlDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgbGV0IGlzTWFya2VyID0gZXZlbnQub3ZlcmxheS5nZXRUaXRsZSAhPSB1bmRlZmluZWQ7XG4gICAgICAgIFxuICAgICAgICBpZihpc01hcmtlcikge1xuICAgICAgICAgICAgbGV0IHRpdGxlID0gZXZlbnQub3ZlcmxheS5nZXRUaXRsZSgpO1xuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93LnNldENvbnRlbnQoJzxkaXY+JyArIHRpdGxlICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgdGhpcy5pbmZvV2luZG93Lm9wZW4oZXZlbnQubWFwLCBldmVudC5vdmVybGF5KTtcbiAgICAgICAgICAgIGV2ZW50Lm1hcC5zZXRDZW50ZXIoZXZlbnQub3ZlcmxheS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OidpbmZvJywgc3VtbWFyeTonTWFya2VyIFNlbGVjdGVkJywgZGV0YWlsOiB0aXRsZX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tc2dzLnB1c2goe3NldmVyaXR5OidpbmZvJywgc3VtbWFyeTonU2hhcGUgU2VsZWN0ZWQnLCBkZXRhaWw6ICcnfSk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBhZGRNYXJrZXIoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheXMucHVzaChuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtwb3NpdGlvbjp7bGF0OiB0aGlzLnNlbGVjdGVkUG9zaXRpb24ubGF0KCksIGxuZzogdGhpcy5zZWxlY3RlZFBvc2l0aW9uLmxuZygpfSwgdGl0bGU6dGhpcy5tYXJrZXJUaXRsZSwgZHJhZ2dhYmxlOiB0aGlzLmRyYWdnYWJsZX0pKTtcbiAgICAgICAgdGhpcy5tYXJrZXJUaXRsZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlhbG9nVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVEcmFnRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubXNncyA9IFtdO1xuICAgICAgICB0aGlzLm1zZ3MucHVzaCh7c2V2ZXJpdHk6J2luZm8nLCBzdW1tYXJ5OidNYXJrZXIgRHJhZ2dlZCcsIGRldGFpbDogZXZlbnQub3ZlcmxheS5nZXRUaXRsZSgpfSk7XG4gICAgfVxuICAgIFxuICAgIGluaXRPdmVybGF5cygpIHtcbiAgICAgICAgaWYoIXRoaXMub3ZlcmxheXN8fCF0aGlzLm92ZXJsYXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5cyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtwb3NpdGlvbjoge2xhdDogMzYuODc5NDY2LCBsbmc6IDMwLjY2NzY0OH0sIHRpdGxlOlwiS29ueWFhbHRpXCJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtwb3NpdGlvbjoge2xhdDogMzYuODgzNzA3LCBsbmc6IDMwLjY4OTIxNn0sIHRpdGxlOlwiQXRhdHVyayBQYXJrXCJ9KSxcbiAgICAgICAgICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtwb3NpdGlvbjoge2xhdDogMzYuODg1MjMzLCBsbmc6IDMwLjcwMjMyM30sIHRpdGxlOlwiT2xkdG93blwifSksXG4gICAgICAgICAgICAgICAgbmV3IGdvb2dsZS5tYXBzLlBvbHlnb24oe3BhdGhzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtsYXQ6IDM2LjkxNzcsIGxuZzogMzAuNzg1NH0se2xhdDogMzYuODg1MSwgbG5nOiAzMC43ODAyfSx7bGF0OiAzNi44ODI5LCBsbmc6IDMwLjgxMTF9LHtsYXQ6IDM2LjkxNzcsIGxuZzogMzAuODE1OX1cbiAgICAgICAgICAgICAgICBdLCBzdHJva2VPcGFjaXR5OiAwLjUsIHN0cm9rZVdlaWdodDogMSxmaWxsQ29sb3I6ICcjMTk3NkQyJywgZmlsbE9wYWNpdHk6IDAuMzVcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBuZXcgZ29vZ2xlLm1hcHMuQ2lyY2xlKHtjZW50ZXI6IHtsYXQ6IDM2LjkwNzA3LCBsbmc6IDMwLjU2NTMzfSwgZmlsbENvbG9yOiAnIzE5NzZEMicsIGZpbGxPcGFjaXR5OiAwLjM1LCBzdHJva2VXZWlnaHQ6IDEsIHJhZGl1czogMTUwMH0pLFxuICAgICAgICAgICAgICAgIG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZSh7cGF0aDogW3tsYXQ6IDM2Ljg2MTQ5LCBsbmc6IDMwLjYzNzQzfSx7bGF0OiAzNi44NjM0MSwgbG5nOiAzMC43MjQ2M31dLCBnZW9kZXNpYzogdHJ1ZSwgc3Ryb2tlQ29sb3I6ICcjRkYwMDAwJywgc3Ryb2tlT3BhY2l0eTogMC41LCBzdHJva2VXZWlnaHQ6IDJ9KVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB6b29tSW4obWFwKSB7XG4gICAgICAgIG1hcC5zZXRab29tKG1hcC5nZXRab29tKCkrMSk7XG4gICAgfVxuICAgIFxuICAgIHpvb21PdXQobWFwKSB7XG4gICAgICAgIG1hcC5zZXRab29tKG1hcC5nZXRab29tKCktMSk7XG4gICAgfVxuICAgIFxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlzID0gW107XG4gICAgfVxufSJdfQ==
