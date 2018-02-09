import {ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {GwPopConfirmComponent} from "./popconfirm.component";
import {getPlacement, Placement} from "../core/placement";
import {GwOverlayService} from "../core/overlay.service";
import {ConnectedOverlayPositionChange, OverlayRef} from "@angular/cdk/overlay";

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
    @Input() placement: string = Placement.BOTTOM_LEFT;
    @Output() placementChange: EventEmitter<string> = new EventEmitter();

    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    overlayRef: OverlayRef;
    componentRef: ComponentRef<GwPopConfirmComponent>;

    constructor(private overlayService: GwOverlayService,
                private el: ElementRef) {
    }

    @HostListener('click')
    open() {
        let {overlayRef, componentRef, onPositionChange} = this.overlayService.openConnected(this.el, GwPopConfirmComponent, this.placement);
        this.overlayRef = overlayRef;
        this.componentRef = componentRef;
        componentRef.instance.origin = this;
        onPositionChange.subscribe((change: ConnectedOverlayPositionChange) => {
            let placement = getPlacement(change.connectionPair);
            if (this.placement != placement) {
                this.placement = placement;
                this.placementChange.emit(this.placement);
                this.componentRef.instance.cdr.detectChanges();
            }
        });
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



