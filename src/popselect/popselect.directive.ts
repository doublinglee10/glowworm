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
import {Observable} from "rxjs/Observable";
import {first} from "rxjs/operators";

@Directive({
    selector: '[gw-popselect]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GwPopSelectDirective),
        multi: true
    }]
})
export class GwPopSelectDirective implements ControlValueAccessor {

    @Input() showSelect: boolean = false;
    @Input() selectData: { id: any, text: string }[] = [];
    /**@Input()*/
    selectModel: any = '';
    @Output() selectModelChange: EventEmitter<any> = new EventEmitter();
    @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

    @Input() filterKeys: string[] = ['id', 'text'];
    @Input() showFilter: boolean = true;
    @Input() multiple: boolean = false;
    @Input() placement: string = Placement.BOTTOM_LEFT;
    @Output() placementChange: EventEmitter<string> = new EventEmitter();

    /** 保存前触发 */
    @Input() onBeforeConfirm: (ngModel, selectModel) => Observable<boolean>;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    componentRef: ComponentRef<GwPopSelectComponent>;
    overlayRef: OverlayRef;

    _selectModel: any = '';
    _filterVal: any = '';

    ngModel: { id: any, text: string }[];
    data: { id: any, text: string, checked?: boolean }[] = [];

    onChangeFun = Function.prototype;
    onTouchFun = Function.prototype;

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

    @Input('data') set _setData(data: { id: any, text: string, checked?: boolean }[]) {
        this.data = data;
        this._cascadeData();
    }

    @Input('selectModel') set _setSelectModel(selectModel: any) {
        this._selectModel = selectModel;
        this.selectModel = selectModel;
    }

    onCheckboxChange(item: any) {
        if (!this.multiple) {
            this.data.forEach((item: any) => {
                item.checked = false;
            });
            item.checked = true;
        }
    }

    onConfirmEvent(event: Event) {
        const subscribeFn = (save: boolean) => {
            if (save) {
                if (this.data) {
                    let items = this.data.filter((item: any) => item.checked);
                    if (this.ngModel) {
                        this.ngModel.splice(0);
                    } else {
                        this.ngModel = [];
                    }
                    items.forEach((item) => {
                        let _item: any = {...item};
                        delete _item.checked;
                        this.ngModel.push(_item);
                    });
                }

                this.selectModel = this._selectModel;
                this.selectModelChange.emit(this.selectModel);
                this._filterVal = '';
                this.onTouchFun(this.ngModel);
                this.onChangeFun(this.ngModel);
                this.onConfirm.emit(event);
                this.overlayRef.dispose();
            }
        };

        const _tmpNgModel = (this.data || []).filter((item: any) => item.checked);
        this.onBeforeConfirm ? this.onBeforeConfirm(_tmpNgModel, this._selectModel).pipe(first()).subscribe(subscribeFn) : subscribeFn(true);
    }

    onCancelEvent(event: Event) {
        this._selectModel = this.selectModel;
        this._filterVal = '';
        this.onCancel.emit(event);
        this.writeValue(this.ngModel);
        this.overlayRef.dispose();
    }

    writeValue(obj: { id: any, text: string }[]): void {
        this.ngModel = obj;
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
        if (this.data && this.ngModel) {
            let need_update = false;
            this.data.forEach((_item: any) => {
                let _items = this.ngModel.filter((item) => item.id == _item.id);
                let item = _items.length > 0 ? _items[0] : null;
                if (item) {
                    _item.checked = true;
                    if (!item.text) {
                        Object.assign(item, _item);
                        need_update = true;
                    }
                } else {
                    _item.checked = false;
                }
            });

            if (need_update) {
                this.onChangeFun(this.ngModel);
                this.onTouchFun(this.ngModel);
            }
        }
    }

}