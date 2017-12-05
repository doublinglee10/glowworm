import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {GWPopoverDirective} from "../popover/popover.directive";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWToolbarComponent} from "../toolbar/toolbar.component";

@Component({
    selector: 'gw-select',
    styleUrls: ['./select.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GwSelectComponent),
        multi: true
    }],
    template: `
        <ng-container *ngIf="enabled">
            <button type="button" class="btn btn-default {{btnSize}}">
                <span gw-popover [template]="tpl">
                    <span class="author">{{label}}</span>
                    <span class="value">{{_values}}</span>
                    <span class="arrow"><span class="caret"></span></span>
                </span>
                <ng-container *ngIf="closeable">
                    <span class="glyphicon glyphicon-remove" (click)="remove()"></span>
                </ng-container>
            </button>
        </ng-container>

        <ng-template #tpl>
            <div class="popover-container">
                <ng-container *ngIf="showSelect">
                    <div class="popover-top">
                        <span class="top-label">{{label}}</span>:
                        <select class="top-select"
                                [(ngModel)]="_tmpSelectModel"
                                (change)="onSelectModelChange()">
                            <option *ngFor="let item of selectData" [value]="item.id">{{item.text}}</option>
                        </select>
                    </div>
                    <div class="popover-hr"></div>
                </ng-container>
                <div class="popover-main">
                    <div class="input"><input type="text" [(ngModel)]="_filter" name="value" placeholder="过滤..."></div>
                    <ul>
                        <li *ngFor="let item of data|gwSelectFilter:_filter">
                            <label>
                                <input type="checkbox" [(ngModel)]="item.checked" name="checkbox"
                                       (change)="onCheckBoxChange(item)">
                                <span>{{item.text}}</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="popover-hr"></div>
                <div class="popover-footer">
                    <div class="left">
                        <a class="btn btn-xs" (click)="clear()">清除</a>
                    </div>
                    <div class="right">
                        <button class="btn btn-primary btn-xs" (click)="save();popover.hide();">保存</button>
                        <button class="btn btn-default btn-xs" (click)="cancel();popover.hide();">取消</button>
                    </div>
                </div>
            </div>
        </ng-template>
    `
})
export class GwSelectComponent implements ControlValueAccessor {

    @Input() label: string;
    @Input() btnSize: 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default' = 'btn-xs';
    @Input() enabled: boolean = true;
    @Input() closeable: boolean = true;
    @Input() multiple: boolean = false;

    @Input() showSelect: boolean = false;
    @Input() selectData: { id: any, text: string }[] = [];

    /** @Input() 双向绑定 */
    selectModel: any;
    @Output() selectModelChange: EventEmitter<any> = new EventEmitter();

    _tmpSelectModel: any;
    _selectedModel: { id: any, text: string };
    @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

    /** @Input()  */
    data: { id: any, text: string }[];
    /** @Input() 双向绑定 */
    ngModel: { id: any, text: string }[];
    /** @Output() */ // ngModelChange: EventEmitter<{ id: any, text: string }[]> = new EventEmitter();
    ngModelChange: any = Function.prototype;

    _filter: string;

    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    @Input('data') set _data(data: { id: any, text: string }[]) {
        this.data = data.map(item => Object.assign({checked: false}, item));
        this._cascadeData();
    }

    @Input('selectModel') set _selectModel(selectModel: any) {
        this.selectModel = selectModel;
        this._tmpSelectModel = selectModel;
        if (this.selectData) {
            let items = this.selectData.filter(item => item.id == this.selectModel);
            this._selectedModel = items.length > 0 ? items[0] : null;
        }
    }

    onRemove: Function = Function.prototype;

    @Input() set toolbar(toolbar: GWToolbarComponent) {
        toolbar && toolbar.addFieldComponent(this as any);
    }

    writeValue(ngModel: any = []): void {
        this.ngModel = ngModel;
        this._cascadeData();
    }

    registerOnChange(fn: any): void {
        this.ngModelChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    get _values() {
        let ngModelValue = this.ngModel ? this.ngModel.map(item => item.text).join(',') : '';
        if (this.showSelect && this._selectedModel) {
            return `${this._selectedModel.text} ${ngModelValue}`;
        }
        return ngModelValue;
    }

    onSelectModelChange() {
        this.onSelectChange.emit(this._tmpSelectModel);
    }

    onCheckBoxChange(item) {
        if (!this.multiple) {
            this.data.forEach((item: any) => {
                item.checked = false;
            });
            item.checked = true;
        }
    }

    clear() {
        if (this.data) {
            this.data.forEach((item: any) => {
                item.checked = false;
            });
        }
        this._tmpSelectModel = '';
    }

    remove() {
        this.selectModel = '';
        this._tmpSelectModel = '';
        this._selectedModel = null;
        this.ngModel = [];
        this.ngModelChange(this.ngModel);
        this.selectModelChange.emit(this.selectModel);
        this.enabled = false;
        this.onRemove();
    }

    save() {
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

        if (this.selectData) {
            let items = this.selectData.filter(item => item.id == this.selectModel);
            this._selectedModel = items.length > 0 ? items[0] : null;
            this.selectModel = this._tmpSelectModel;
        }

        this.ngModelChange(this.ngModel);
        this.selectModelChange.emit(this.selectModel);
        this.onSave.emit();
    }

    cancel() {
        this._tmpSelectModel = this.selectModel;
        this._cascadeData();
        this.onCancel.emit();
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
                        item.text = _item.text;
                        need_update = true;
                    }
                } else {
                    _item.checked = false;
                }
            });

            if (need_update) {
                this.ngModelChange(this.ngModel);
            }
        }
    }

}