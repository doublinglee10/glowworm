import {
    ComponentRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Output,
    TemplateRef
} from "@angular/core";
import {ComponentLoaderService} from "../core/component-loader.service";
import {GwConfirmComponent} from "./confirm.component";

/**
 *
 <button gw-confirm
 [title]=""
 [content]=""
 [confirmClass]=""
 [confirmText]=""
 (onConfirm)=""
 [cancelText]=""
 (onCancel)="">
 </button>
 */
@Directive({
    selector: '[gw-confirm]'
})
export class GwConfirmDirective implements OnDestroy {

    @Input() title: string;
    @Input() content: string | TemplateRef<any> | any;
    @Input() confirmClass: string;
    @Input() confirmText: string = '确认';
    @Input() cancelText: string = '取消';

    @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    private componentRef: ComponentRef<GwConfirmComponent>;

    constructor(private componentLoader: ComponentLoaderService,
                private el: ElementRef) {
    }

    @HostListener('click')
    onclick() {
        if (!this.componentRef) {
            this.createComponent();
        }
    }

    createComponent(): void {
        setTimeout(() => {
            this.componentRef = this.componentLoader.appendComponentToBody(GwConfirmComponent);
            let confirm: GwConfirmComponent = this.componentRef.instance;
            confirm.title = this.title;
            confirm.content = this.content;
            confirm.confirmClass = this.confirmClass;
            confirm.confirmText = this.confirmText;
            confirm.cancelText = this.cancelText;
            confirm.onConfirm = this.onConfirm;
            confirm.onCancel = this.onCancel;
            confirm.onConfirm.subscribe(() => {
                this.ngOnDestroy();
            });
            confirm.onCancel.subscribe(() => {
                this.ngOnDestroy();
            });
        });
    }

    ngOnDestroy(): void {
        if (this.componentRef) {
            this.componentLoader.removeComponentFormBody(this.componentRef);
            this.componentRef = null;
        }
    }
}