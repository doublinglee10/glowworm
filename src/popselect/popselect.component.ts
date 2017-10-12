import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import {GwOverlayDirective} from "../core/overlay.directive";
import {Placement} from "../core/placement";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const GW_POPSELECT_COMPONENT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GwPopSelectComponent),
    multi: true
};

/**
 * <gw-popselect
 [(ngModel)]=""
 [data]=""
 [showFilter]=""
 [filterKeys]=""
 [placement]=""
 [zIndex]=""
 (onConfirm)=""
 (onCancel)="">
 </gw-popselect>
 */
@Component({
    selector: 'gw-popselect',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../styles/triangle.css', '../styles/glowworm.css'],
    template: `
        <div gw-overlay
             [source]="source"
             [placement]="placement"
             (onHide)="onOverlayHideEvent()"
             [zIndex]="zIndex">
            <div class="triangle triangle-{{placement}}">
                <div class="gw-popselect">
                    <div class="gw-popselect-filter" *ngIf="showFilter">
                        <input type="text" placeholder="过滤..." [(ngModel)]="_filterVal">
                    </div>
                    <div class="gw-popselect-body">
                        <ul>
                            <li *ngFor="let item of (data | multiKeysFilter:_filterVal:filterKeys)">
                                <label>
                                    <input type="checkbox" [(ngModel)]="item.__checked__" name="checkbox"
                                           (change)="onSelect(item)">
                                    <span>{{item.text}}</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div class="gw-popselect-footer">
                        <button class="btn btn-xs btn-primary" (click)="onConfirmEvent($event)">确认</button>
                        <button class="btn btn-xs btn-default" (click)="onCancelEvent($event)">取消</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [GW_POPSELECT_COMPONENT_VALUE_ACCESSOR]
})
export class GwPopSelectComponent implements ControlValueAccessor {

    @Input() filterKeys: string[] = ['text'];
    @Input() showFilter: boolean;
    @Input() placement: Placement = 'bottom-left';
    @Input() source: ElementRef;
    @Input() zIndex: number;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild(GwOverlayDirective) overlay: GwOverlayDirective;

    public _filterVal: any;
    private _data: any[];
    private _val: any;
    private _changeFun: Function;
    private _touchFun: Function;

    @Input() set data(data: any[]) {
        this._data = data;
        this._refreshUI();
    }

    get data() {
        return this._data;
    }

    onSelect(_item: any) {
        this._data.forEach((item: any) => {
            if (item !== _item) {
                item.__checked__ = false;
            }
        });
    }

    onConfirmEvent(event: Event) {
        this.overlay.hide();
        let values = this._data.filter((item: any) => item.__checked__);
        if (values.length == 1) {
            let val = values[0].id;
            this._val = val;
        } else {
            this._val = null;
        }
        this._filterVal = '';
        this._touchFun(this._val);
        this._changeFun(this._val);
        this.onConfirm.emit(event);
    }

    onCancelEvent(event: Event) {
        this._filterVal = '';
        this.overlay.hide();
        this.onCancel.emit(event);
        this.writeValue(this._val);
    }

    onOverlayHideEvent() {
        this._filterVal = '';
    }

    writeValue(obj: any): void {
        this._val = obj;
        this._refreshUI();
    }

    registerOnChange(fn: any): void {
        this._changeFun = fn;
    }

    registerOnTouched(fn: any): void {
        this._touchFun = fn;
    }

    private _refreshUI() {
        if (this._data) {
            if (this._val) {
                this._data.forEach((item: any) => {
                    if (item && item.id == this._val) {
                        item.__checked__ = true;
                    } else if (item && item.id != this._val && item.__checked__) {
                        item.__checked__ = false;
                    }
                });
            } else {
                this._data.forEach((item: any) => {
                    if (item && item.__checked__) {
                        item.__checked__ = false;
                    }
                });
            }
        }
    }
}