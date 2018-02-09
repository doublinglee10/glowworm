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
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GwPopSelectComponent} from "./popselect.component";
import {Placement} from "../core/placement";
import {GwOverlayService} from "../core/overlay.service";
import {OverlayRef} from "@angular/cdk/overlay";

@Directive({
    selector: '[gw-popselect]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GwPopSelectDirective),
        multi: true
    }]
})
export class GwPopSelectDirective implements ControlValueAccessor {

    @Input() filterKeys: string[] = ['text'];
    @Input() showFilter: boolean = true;
    @Input() placement: Placement = Placement.BOTTOM_LEFT;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();
    @Input() data: any[] = [];


    componentRef: ComponentRef<GwPopSelectComponent>;
    overlayRef: OverlayRef;

    _filterVal: any = '';
    _data: any[] = [];

    val: any;
    onChangeFun;
    onTouchFun;

    constructor(private overlayService: GwOverlayService,
                private el: ElementRef) {
    }

    @HostListener('click')
    open() {
        let {overlayRef, componentRef} = this.overlayService.openConnected(this.el, GwPopSelectComponent, this.placement);
        this.componentRef = componentRef;
        this.overlayRef = overlayRef;
        componentRef.instance.origin = this;
    }

    @Input('data') set __data(data: any[]) {
        this._data = data;
        this._refreshUI();
    }

    onCheckboxChange(_item: any) {
        this._data.forEach((item: any) => {
            if (item !== _item) {
                item.checked = false;
            }
        });
    }

    onConfirmEvent(event: Event) {
        let values = this._data.filter((item: any) => item.checked);
        if (values.length == 1) {
            this.val = values[0].id;
        } else {
            this.val = null;
        }
        this._filterVal = '';
        this.onTouchFun(this.val);
        this.onChangeFun(this.val);
        this.onConfirm.emit(event);
        this.overlayRef.dispose();
    }

    onCancelEvent(event: Event) {
        this._filterVal = '';
        this.onCancel.emit(event);
        this.writeValue(this.val);
        this.overlayRef.dispose();
    }

    writeValue(obj: any): void {
        this.val = obj;
    }

    registerOnChange(fn: any): void {
        this.onChangeFun = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchFun = fn;
    }


    private _refreshUI() {
        if (this._data) {
            if (this.val) {
                this._data.forEach((item: any) => {
                    if (item && item.id == this.val) {
                        item.checked = true;
                    } else if (item && item.id != this.val && item.checked) {
                        item.checked = false;
                    }
                });
            } else {
                this._data.forEach((item: any) => {
                    if (item && item.checked) {
                        item.checked = false;
                    }
                });
            }
        }
    }

}