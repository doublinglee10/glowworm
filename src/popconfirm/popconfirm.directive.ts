import {ComponentRef, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {GwPopConfirmComponent} from "./popconfirm.component";
import {ComponentLoaderService} from "../core/component-loader.service";
import {Placement} from "../core/placement";

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
export class GwPopConfirmDirective implements OnInit, OnDestroy {

    @Input() title: string;
    @Input() confirmText: string = '确认';
    @Input() cancelText: string = '取消';
    @Input() placement: Placement = 'bottom-left';
    @Input() zIndex: number = 100;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    private componentRef: ComponentRef<GwPopConfirmComponent>;

    constructor(private componentLoader: ComponentLoaderService,
                private el: ElementRef) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.componentRef = this.componentLoader.appendComponentToBody(GwPopConfirmComponent);
            let confirm: GwPopConfirmComponent = this.componentRef.instance;
            confirm.source = this.el;
            confirm.title = this.title;
            confirm.confirmText = this.confirmText;
            confirm.cancelText = this.cancelText;
            confirm.placement = this.placement;
            confirm.zIndex = this.zIndex;
            confirm.onConfirm = this.onConfirm;
            confirm.onCancel = this.onCancel;
        });
    }

    ngOnDestroy() {
        this.componentLoader.removeComponentFormBody(this.componentRef);
    }
}



