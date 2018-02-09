import {
    ComponentRef,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    Output
} from "@angular/core";
import {GwPopInputComponent} from "./popinput.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Placement} from "../core/placement";
import {GwOverlayService} from "../core/overlay.service";
import {Observable} from "rxjs/Observable";
import {OverlayRef} from "@angular/cdk/overlay";
import {first} from "rxjs/operators";

/**
 * <div gw-popinput
 *      [zIndex]=""
 *      [title]=""
 *      [(ngModel)]=""
 *      [confirmText]=""
 *      (onConfirm)=""
 *      [cancelText]=""
 *      (onCancel)=""
 *      [placement]="">
 * </div>
 */
@Directive({
    selector: '[gw-popinput]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GwPopInputDirective),
        multi: true
    }]
})
export class GwPopInputDirective implements ControlValueAccessor {

    @Input() title: string;
    @Input() confirmText: string = '确认';
    @Input() cancelText: string = '取消';
    @Input() placement: Placement = Placement.BOTTOM_LEFT;
    /** 保存前触发 */
    @Input() onBeforeConfirm: (ngModel) => Observable<boolean>;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    componentRef: ComponentRef<GwPopInputComponent>;
    overlayRef: OverlayRef;

    val: any;
    onChangeFun = Function.prototype;
    onTouchFun = Function.prototype;

    constructor(private overlayService: GwOverlayService,
                private el: ElementRef) {
    }

    @HostListener('click')
    open() {
        let {overlayRef, componentRef} = this.overlayService.openConnected(this.el, GwPopInputComponent, this.placement);
        this.componentRef = componentRef;
        this.overlayRef = overlayRef;

        let input: GwPopInputComponent = componentRef.instance;
        input.origin = this;
    }

    writeValue(val: any): void {
        this.val = val;
    }

    registerOnChange(fn: any): void {
        this.onChangeFun = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchFun = fn;
    }

    onConfirmEvent(event: Event) {
        const subscribeFn = (save: boolean) => {
            if (save) {
                this.onTouchFun && this.onTouchFun(this.val);
                this.onChangeFun && this.onChangeFun(this.val);
                this.overlayRef.dispose();
                this.onConfirm.emit(event);
            }
        };

        this.onBeforeConfirm ? this.onBeforeConfirm(this.val).pipe(first()).subscribe(subscribeFn) : subscribeFn(true);
    }

    onCancelEvent(event: Event) {
        this.overlayRef.dispose();
        this.onCancel.emit(event);
    }
}



