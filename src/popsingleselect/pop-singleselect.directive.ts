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
import {ConnectedOverlayPositionChange, OverlayRef} from "@angular/cdk/overlay";
import {Observable} from "rxjs/Observable";
import {first} from "rxjs/operators";
import {getPlacement, Placement} from "../core/placement";
import {GwOverlayService} from "../core/overlay.service";
import {GwPopSingleSelectComponent} from "./pop-singleselect.component";

@Directive({
    selector: '[gw-popsingleselect]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GwPopSingleSelectDirective),
        multi: true
    }]
})
export class GwPopSingleSelectDirective implements ControlValueAccessor {

    @Input() showSelect: boolean = false;
    @Input() selectData: { id: any, text: string }[] = [];
    /*@Input()*/
    selectModel: any = '';
    @Output() selectModelChange: EventEmitter<any> = new EventEmitter();
    @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

    @Input() filterKeys: string[] = ['id', 'text'];
    @Input() showFilter: boolean = true;
    @Input() placement: string = Placement.BOTTOM_LEFT;
    @Output() placementChange: EventEmitter<string> = new EventEmitter();

    /** 保存前触发 */
    @Input() onBeforeConfirm: (ngModel, selectModel) => Observable<boolean>;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();
    @Input() data: any[] = [];

    componentRef: ComponentRef<GwPopSingleSelectComponent>;
    overlayRef: OverlayRef;

    _selectModel: any = '';
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
        let {overlayRef, componentRef, onPositionChange} = this.overlayService.openConnected(this.el, GwPopSingleSelectComponent, this.placement);
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

    @Input('selectModel') set _setSelectModel(selectModel: any) {
        this._selectModel = selectModel;
        this.selectModel = selectModel;
    }

    @Input('data') set _setData(data: { id: any, text: string, checked?: boolean }[]) {
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
        const subscribeFn = (save: boolean) => {
            if (save) {
                let values = this._data.filter((item: any) => item.checked);
                if (values.length == 1) {
                    this.val = values[0].id;
                } else {
                    this.val = null;
                }
                this._filterVal = '';
                this.selectModel = this._selectModel;
                this.selectModelChange.emit(this.selectModel);
                this.onTouchFun(this.val);
                this.onChangeFun(this.val);
                this.onConfirm.emit(event);
                this.overlayRef.dispose();
            }
        };

        let values = this._data.filter((item: any) => item.checked);
        let value = values.length == 1 ? values[0].id : '';
        this.onBeforeConfirm ? this.onBeforeConfirm(value, this._selectModel).pipe(first()).subscribe(subscribeFn) : subscribeFn(true);
    }

    onCancelEvent(event: Event) {
        this._selectModel = this.selectModel;
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

    onSelectModelChange() {
        this.onSelectChange.emit(this._selectModel);
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