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

    @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

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
        input.origin = this;
    }

    onConfirmEvent() {
        this.onConfirm.emit();
        this.overlayRef.dispose();
    }

    onCancelEvent() {
        this.onCancel.emit();
        this.overlayRef.dispose();
    }

    typeofContent(): string {
        if (typeof this.content === 'undefined')
            return 'undefined';
        if (typeof this.content === 'string')
            return 'string';
        if (this.content instanceof TemplateRef)
            return 'template';
        return 'component';
    }
}