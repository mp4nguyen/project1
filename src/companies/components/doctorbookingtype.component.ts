import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Component, ViewChild } from 'angular/core';


@Component({
    selector: 'doctor-bookingtype',
    directives: [MODAL_DIRECTIVES],
    template: `
        <modal #myModal>
            ...
        </modal>
    `
})
export class DoctorBookingTypeComponent {
    @ViewChild('myModal')
    modal: ModalComponent;

    close() {
        this.modal.close();
    }

    open() {
        this.modal.open();
    }
}