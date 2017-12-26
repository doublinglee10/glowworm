import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {GWPopoverDirective} from "../popover/popover.directive";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWToolbarComponent} from "../toolbar/toolbar.component";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'gw-single-select',
    styleUrls: ['./single-select.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GwSingleSelectComponent),
        multi: true
    }],
    template: `
        <ng-container *ngIf="enabled">
            <button type="button" class="btn btn-default {{btnSize}}" [disabled]="disabled">
                <span gw-popover [template]="tpl" [disabled]="disabled">
                    <span class="author" [innerHTML]="label | safeHtml"></span>
                    <span class="value" [innerHTML]="_values | safeHtml"></span>
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
                        <span class="top-label" [innerHTML]="label | safeHtml"></span>:
                        <select class="top-select"
                                [(ngModel)]="_tmpSelectModel"
                                (change)="onSelectModelChange()">
                            <option *ngFor="let item of selectData"
                                    [value]="item.id"
                                    [innerHTML]="item.text | safeHtml">
                            </option>
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
                                <span [innerHTML]="item.text | safeHtml"></span>
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
                        <button class="btn btn-primary btn-xs" (click)="save()">保存</button>
                        <button class="btn btn-default btn-xs" (click)="cancel()">取消</button>
                    </div>
                </div>
            </div>
        </ng-template>
    `
})
export class GwSingleSelectComponent implements ControlValueAccessor {

    @Input() label: string;
    @Input() btnSize: 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default' = 'btn-xs';
    @Input() enabled: boolean = true;
    @Input() disabled: boolean = false;
    @Input() closeable: boolean = true;
    @Input() clearSave: boolean = true;

    @Input() showSelect: boolean = false;
    @Input() selectData: { id: any, text: string }[] = [];

    /** 双向绑定 */
    @Input() selectModel: any;
    @Output() selectModelChange: EventEmitter<any> = new EventEmitter();

    _tmpSelectModel: any;
    _selectedModel: { id: any, text: string };
    @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

    @Input() data: { id: any, text: string }[];
    /** @Input() 双向绑定 */
    ngModel: any;
    /** @Output() */
    ngModelChange: any = Function.prototype;

    _filter: string;
    _selectNgModel: { id: any, text: string };

    /** 保存前触发 */
    @Input() onBeforeSave: (ngModel, selectModel) => Observable<boolean>;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    onRemove: Function = Function.prototype;

    @Input() set toolbar(toolbar: GWToolbarComponent) {
        toolbar && toolbar.addFieldComponent(this as any);
    }

    @Input('disabled') set _disabled(disabled: boolean) {
        this.disabled = disabled;
        this.disabled && this.popover && this.popover.hide();
    }

    @Input('data') set _data(data: { id: any, text: string }[]) {
        this.data = data ? data.map(item => Object.assign({checked: false}, item)) : [];
        this._cascadeData();
    }

    @Input('selectModel') set _selectModel(selectModel: any) {
        this.selectModel = selectModel;
        this._tmpSelectModel = selectModel;
        this._cascadeSelectData();
    }

    @Input('selectData') set _selectData(selectData: { id: any, text: string }[]) {
        this.selectData = selectData;
        this._cascadeSelectData();
    }

    writeValue(ngModel: any): void {
        this.ngModel = ngModel;
        this._cascadeData();
    }

    registerOnChange(fn: any): void {
        this.ngModelChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    get _values() {
        let ngModelValue = this._selectNgModel ? this._selectNgModel.text : '';
        if (this.showSelect && this._selectedModel) {
            return `${this._selectedModel.text} ${ngModelValue}`;
        }
        return ngModelValue;
    }

    onSelectModelChange() {
        this.onSelectChange.emit(this._tmpSelectModel);
    }

    onCheckBoxChange(item) {
        this.data.forEach((_item: any) => {
            if (item != _item) {
                _item.checked = false;
            }
        });
    }

    clear() {
        if (this.data) {
            this.data.forEach((item: any) => {
                item.checked = false;
            });
        }
        this._tmpSelectModel = '';

        if (this.clearSave) {
            this.save();
        }
    }

    remove() {
        if (this.disabled) {
            return;
        }
        this.selectModel = '';
        this._tmpSelectModel = '';
        this._selectedModel = null;
        this._selectNgModel = null;
        this.ngModel = '';
        this.ngModelChange(this.ngModel);
        this.selectModelChange.emit(this.selectModel);
        this.enabled = false;
        this.onRemove();
    }

    save() {
        const subscribeFn = (save: boolean) => {
            if (save) {
                if (this.data) {
                    let items = this.data.filter((item: any) => item.checked);
                    if (items.length == 1) {
                        this.ngModel = items[0].id;
                        this._selectNgModel = items[0];
                    } else {
                        this.ngModel = '';
                        this._selectNgModel = null;
                    }
                }

                if (this.selectData) {
                    let items = this.selectData.filter(item => item.id == this._tmpSelectModel);
                    this._selectedModel = items.length > 0 ? items[0] : null;
                    this.selectModel = this._tmpSelectModel;
                }

                this.ngModelChange(this.ngModel);
                this.selectModelChange.emit(this.selectModel);
                this.onSave.emit();
                this.popover.hide();
            }
        };

        let _tmpNgModel = (this.data || []).filter((item: any) => item.checked);
        _tmpNgModel = _tmpNgModel.length > 0 ? _tmpNgModel[0].id : '';
        this.onBeforeSave ? this.onBeforeSave(_tmpNgModel, this._tmpSelectModel).first().subscribe(subscribeFn) : subscribeFn(true);
    }

    cancel() {
        this._tmpSelectModel = this.selectModel;
        this._cascadeData();
        this._cascadeSelectData();
        this.onCancel.emit();
        this.popover.hide();
    }

    private _cascadeData() {
        if (this.data) {
            this.data.forEach((item: any) => item.checked = false);
            let items = this.data.filter(item => item.id == this.ngModel);
            if (items.length > 0) {
                this._selectNgModel = items[0];
                (<any>this._selectNgModel).checked = true;
            } else {
                this._selectNgModel = null;
            }
        } else {
            this._selectNgModel = null;
        }
    }

    private _cascadeSelectData() {
        if (this.selectData) {
            let items = this.selectData.filter((item) => item.id == this.selectModel);
            if (items.length > 0) {
                this._selectedModel = items[0];
            } else {
                this._selectedModel = null;
            }
        } else {
            this._selectedModel = null;
        }
    }

}