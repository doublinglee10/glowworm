import {ComponentRef, Directive, EventEmitter, HostListener, Input, Output, TemplateRef} from "@angular/core";
import {GwConfirmComponent} from "./confirm.component";
import {GwOverlayService} from "../core/overlay.service";
import {OverlayRef} from "@angular/cdk/overlay";

/**
 *
 <button gw-confirm
 [title]=""
 [content]=""
 [confirmClass]=""
 [confirmText]=""
 [zIndex]=""
 (onConfirm)=""
 [cancelText]=""
 (onCancel)="">
 </button>
 */
@Directive({
    selector: '[gw-confirm]'
})
export class GwConfirmDirective {

    @Input() title: string;
    @Input() content: string | TemplateRef<any> | any;
    @Input() gwClass: string;
    @Input() confirmText: string = '确认';
    @Input() cancelText: string = '取消';

    @Output('onConfirm') onConfirmEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output('onCancel') onCancelEvent: EventEmitter<void> = new EventEmitter<void>();

    componentRef: ComponentRef<GwConfirmComponent>;
    overlayRef: OverlayRef;

    constructor(private overlayService: GwOverlayService) {
    }

    @HostListener('click')
    open() {
        let {overlayRef, componentRef} = this.overlayService.openBlock(GwConfirmComponent);
        this.componentRef = componentRef;
        this.overlayRef = overlayRef;

        let input: GwConfirmComponent = componentRef.instance;
        input.config = this;
        input.overlayRef = overlayRef;
    }

    onConfirm() {
        this.onConfirmEvent.emit();
    }

    onCancel() {
        this.onCancelEvent.emit();
    }
}