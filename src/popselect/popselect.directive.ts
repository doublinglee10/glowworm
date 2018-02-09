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
import {getPlacement, Placement} from "../core/placement";
import {GwOverlayService} from "../core/overlay.service";
import {ConnectedOverlayPositionChange, OverlayRef} from "@angular/cdk/overlay";

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
    @Input() placement: string = Placement.BOTTOM_LEFT;
    @Output() placementChange: EventEmitter<string> = new EventEmitter();

    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();
    @Input() data: any[] = [];

    componentRef: ComponentRef<GwPopSelectComponent>;
    overlayRef: OverlayRef;

    _filterVal: any = '';
    _data: { id: any, text: string, checked?: boolean }[] = [];

    val: any;
    onChangeFun;
    onTouchFun;

    constructor(private overlayService: GwOverlayService,
                private el: ElementRef) {
    }

    @HostListener('click')
    open() {
        let {overlayRef, componentRef, onPositionChange} = this.overlayService.openConnected(this.el, GwPopSelectComponent, this.placement);
        this.componentRef = componentRef;
        this.overlayRef = overlayRef;
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

    @Input('data') set __data(data: { id: any, text: string, checked?: boolean }[]) {
        this._data = data;
        this._cascadeData();
    }

    onCheckboxChange(_item: any) {
        if (_item.checked) {
            this._data.forEach((item: any) => {
                if (item !== _item) {
                    item.checked = false;
                }
            });
        }
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
        this._cascadeData();
    }

    registerOnChange(fn: any): void {
        this.onChangeFun = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchFun = fn;
    }

    private _cascadeData() {
        if (this._data) {
            this._data.forEach((item) => {
                if (item.id === this.val) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
        }
    }

}