import {
    ComponentRef,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output
} from "@angular/core";
import {Placement} from "../core/overlay.directive";
import {ComponentLoaderService} from "../core/component-loader.service";
import {GwPopInputComponent} from "./popinput.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import set = Reflect.set;

export const GW_POPINPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GwPopinputDirective),
    multi: true
};

/**
 * <div gw-popinput
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
    providers: [GW_POPINPUT_VALUE_ACCESSOR]
})
export class GwPopinputDirective implements OnInit, OnDestroy, ControlValueAccessor {

    @Input() title: string;
    @Input() confirmText: string = '确认';
    @Input() cancelText: string = '取消';
    @Input() placement: Placement = 'bottom-left';
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    private componentRef: ComponentRef<GwPopInputComponent>;
    private _value: any;
    private _onchangeFun;
    private _ontouchFun;

    constructor(private componentLoader: ComponentLoaderService,
                private el: ElementRef) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.componentRef = this.componentLoader.appendComponentToBody(GwPopInputComponent);
            let input: GwPopInputComponent = this.componentRef.instance;
            input.source = this.el;
            input.title = this.title;
            input.confirmText = this.confirmText;
            input.cancelText = this.cancelText;
            input.placement = this.placement;
            input.onConfirm = this.onConfirm;
            input.onCancel = this.onCancel;
            input.writeValue(this._value);
            input.registerOnTouched(this._ontouchFun);
            input.registerOnChange(this._onchangeFun);
        });
    }

    writeValue(obj: any): void {
        if (this.componentRef) {
            let input: GwPopInputComponent = this.componentRef.instance;
            input.writeValue(obj);
        } else {
            this._value = obj;
        }
    }

    registerOnChange(fn: any): void {
        if (this.componentRef) {
            let input: GwPopInputComponent = this.componentRef.instance;
            input.registerOnChange(fn);
        } else {
            this._onchangeFun = fn;
        }
    }

    registerOnTouched(fn: any): void {
        if (this.componentRef) {
            let input: GwPopInputComponent = this.componentRef.instance;
            input.registerOnTouched(fn);
        } else {
            this._ontouchFun = fn;
        }
    }

    ngOnDestroy() {
        this.componentLoader.removeComponentFormBody(this.componentRef);
    }
}



