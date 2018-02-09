import {ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {GwPopConfirmComponent} from "./popconfirm.component";
import {Placement} from "../core/placement";
import {GwOverlayService} from "../core/overlay.service";
import {OverlayRef} from "@angular/cdk/overlay";

/**
 * <div gw-popconfirm
 *      [title]=""
 *      [zIndex]=""
 *      [confirmText]=""
 *      (onConfirm)=""
 *      [cancelText]=""
 *      (onCancel)=""
 *      [placement]="">
 * </div>
 */
@Directive({
    selector: '[gw-popconfirm]'
})
export class GwPopConfirmDirective {

    @Input() title: string;
    @Input() confirmText: string = '确认';
    @Input() cancelText: string = '取消';
    @Input() placement: Placement = Placement.BOTTOM_LEFT;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    overlayRef: OverlayRef;
    componentRef: ComponentRef<GwPopConfirmComponent>;

    constructor(private overlayService: GwOverlayService,
                private el: ElementRef) {
    }

    @HostListener('click')
    open() {
        let {overlayRef, componentRef} = this.overlayService.openConnected(this.el, GwPopConfirmComponent, this.placement);
        this.overlayRef = overlayRef;
        this.componentRef = componentRef;

        let confirm: GwPopConfirmComponent = componentRef.instance;
        confirm.origin = this;
    }

    onConfirmEvent(event: Event) {
        this.overlayRef.dispose();
        this.onConfirm.emit(event);
    }

    onCancelEvent(event: Event) {
        this.overlayRef.dispose();
        this.onCancel.emit(event);
    }
}



