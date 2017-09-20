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
import {ComponentLoaderService} from "../core/component-loader.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Placement} from "../core/placement";
import {GwPopSelectComponent} from "./popselect.component";

export const GW_POPSELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GwPopSelectDirective),
    multi: true
};

@Directive({
    selector: '[gw-popselect]',
    providers: [GW_POPSELECT_VALUE_ACCESSOR]
})
export class GwPopSelectDirective implements ControlValueAccessor, OnInit, OnDestroy {

    // @Input() data: any[];
    // @Input() filterKeys: string[];
    // @Input() showFilter: boolean;
    // @Input() placement: Placement = 'bottom-left';
    // @Input() zIndex: number;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    private componentRef: ComponentRef<GwPopSelectComponent>;
    private _value: any;
    private _onchangeFun;
    private _ontouchFun;

    constructor(private componentLoader: ComponentLoaderService,
                private el: ElementRef) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.componentRef = this.componentLoader.appendComponentToBody(GwPopSelectComponent);
            let input: GwPopSelectComponent = this.componentRef.instance;
            input.source = this.el;
            input.data = this.data;
            input.filterKeys = this.filterKeys;
            input.showFilter = this.showFilter;
            input.placement = this.placement;
            input.zIndex = this.zIndex;
            input.onConfirm = this.onConfirm;
            input.onCancel = this.onCancel;
            input.writeValue(this._value);
            input.registerOnTouched(this._ontouchFun);
            input.registerOnChange(this._onchangeFun);
        });
    }

    private _data: any[];
    @Input() set data(data: any[]) {
        this._data = data;
        if (this.componentRef) {
            let input: GwPopSelectComponent = this.componentRef.instance;
            input.data = data;
        }
    }

    get data() {
        return this._data;
    }

    private _placement: Placement = 'bottom-left';
    @Input() set placement(placement: Placement) {
        this._placement = placement;
        if (this.componentRef) {
            let input: GwPopSelectComponent = this.componentRef.instance;
            input.placement = placement;
        }
    }

    get placement() {
        return this._placement
    }

    private _filterKeys: string[];
    @Input() set filterKeys(filterKeys: string[]) {
        this._filterKeys = filterKeys;
        if (this.componentRef) {
            let input: GwPopSelectComponent = this.componentRef.instance;
            input.filterKeys = filterKeys;
        }
    }

    get filterKeys() {
        return this._filterKeys
    }

    private _zIndex: number = 1000;
    @Input() set zIndex(zIndex: number) {
        this._zIndex = zIndex;
        if (this.componentRef) {
            let input: GwPopSelectComponent = this.componentRef.instance;
            input.zIndex = zIndex;
        }
    }

    get zIndex() {
        return this._zIndex
    }

    private _showFilter: boolean = true;
    @Input() set showFilter(showFilter: boolean) {
        this._showFilter = showFilter;
        if (this.componentRef) {
            let input: GwPopSelectComponent = this.componentRef.instance;
            input.showFilter = showFilter;
        }
    }

    get showFilter() {
        return this._showFilter;
    }

    writeValue(obj: any): void {
        if (this.componentRef) {
            let input: GwPopSelectComponent = this.componentRef.instance;
            input.writeValue(obj);
        } else {
            this._value = obj;
        }
    }

    registerOnChange(fn: any): void {
        if (this.componentRef) {
            let input: GwPopSelectComponent = this.componentRef.instance;
            input.registerOnChange(fn);
        } else {
            this._onchangeFun = fn;
        }
    }

    registerOnTouched(fn: any): void {
        if (this.componentRef) {
            let input: GwPopSelectComponent = this.componentRef.instance;
            input.registerOnTouched(fn);
        } else {
            this._ontouchFun = fn;
        }
    }

    ngOnDestroy() {
        this.componentLoader.removeComponentFormBody(this.componentRef);
    }

}