import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {GWPopoverDirective} from "../popover/popover.directive";
import {Observable} from "rxjs/Observable";

export const GW_INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GWInputComponent),
    multi: true
};

@Component({
    selector: 'gw-input',
    styleUrls: ['./input.component.css'],
    providers: [GW_INPUT_VALUE_ACCESSOR],
    template: `
        <ng-container *ngIf="enabled">
            <span class="btn btn-default {{btnSize}}" [class.disabled]="disabled">
                <span gw-popover [template]="tpl" [disabled]="disabled">
                    <span class="author">{{label}}</span>
                    <span class="value">{{_values}}</span>
                    <span class="arrow"><span class="caret"></span></span>
                </span>
                <ng-container *ngIf="closeable">
                    <span class="glyphicon glyphicon-remove" (click)="remove();"></span>
                </ng-container>
            </span>
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
                    <input type="text" [(ngModel)]="_tmpNgModel" [attr.placeholder]="placeholder" [attr.name]="name">
                </div>
                <div class="popover-hr"></div>
                <div class="popover-footer">
                    <div class="left">
                        <a class="btn btn-xs" (click)="clear()">清除</a>
                    </div>
                    <div class="right">
                        <button class="btn btn-primary btn-xs" (click)="save()">保存</button>
                        <button class="btn btn-default btn-xs" (click)="popover.hide();cancel()">取消</button>
                    </div>
                </div>
            </div>
        </ng-template>
    `
})
export class GWInputComponent extends GWControl implements ControlValueAccessor {

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    @Input() name: string;
    @Input() label: string;
    @Input() btnSize: 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default' = 'btn-xs';
    @Input() closeable: boolean = true;
    @Input() enabled: boolean = true;
    @Input() disabled: boolean = false;
    @Input() placeholder: string;

    @Input() showSelect: boolean = false;
    @Input() selectData: { id: any, text: string }[] = [];

    /** 清除时立即执行保存 */
    @Input() clearSave: boolean = true;

    /** @Input() 双向绑定 */
    @Input() selectModel: any; // id: any
    @Output() selectModelChange: EventEmitter<{ id: any, text: string }> = new EventEmitter();
    @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

    /** 保存前触发 */
    @Input() onBeforeSave: (ngModel, selectModel) => Observable<boolean>;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    /** @Input() 双向绑定 */
    ngModel: string;
    /** @Output() */
    ngModelChange = Function.prototype;

    _tmpNgModel: string;
    _tmpSelectModel: any;
    _selectedSelectModel: { id: any, text: string };

    @Input('disabled') set _disabled(disabled: boolean) {
        this.disabled = disabled;
        this.disabled && this.popover && this.popover.hide();
    }

    @Input('selectModel') set _selectModel(selectModel: any) {
        this._tmpSelectModel = selectModel;
        this.selectModel = selectModel;
        this._handleSelectData();
    }

    @Input('selectData') set _selectData(selectData: { id: any, text: string }[]) {
        this.selectData = selectData;
        this._handleSelectData();
    }

    get _values() {
        if (this.showSelect) {
            let selectText = this._selectedSelectModel ? this._selectedSelectModel.text || '' : '';
            return `${selectText} ${this.ngModel || ''}`;
        }
        return this.ngModel || '';
    }

    onSelectModelChange() {
        this.onSelectChange.emit(this._tmpSelectModel);
    }

    clear() {
        this._tmpNgModel = '';
        this._tmpSelectModel = '';

        if (this.clearSave) {
            this.save();
        }
    }

    save() {
        const subscribeFn = (save: boolean) => {
            if (save) {
                this._selectModel = this._tmpSelectModel;
                this.ngModel = this._tmpNgModel;
                this.ngModelChange(this._tmpNgModel);
                this.selectModelChange.emit(this.selectModel);
                this.onSave.emit();
                this.popover.hide();
            }
        };

        this.onBeforeSave ? this.onBeforeSave(this._tmpNgModel, this._tmpSelectModel).first().subscribe(subscribeFn) : subscribeFn(true);
    }

    cancel() {
        this._tmpSelectModel = this.selectModel;
        this._tmpNgModel = this.ngModel;
        this.onCancel.emit();
    }

    remove() {
        if (this.disabled) {
            return;
        }

        this.selectModel = '';
        this._tmpSelectModel = '';
        this._selectedSelectModel = null;
        this.ngModel = '';
        this._tmpNgModel = '';
        this.ngModelChange(this.ngModel);
        this.selectModelChange.emit(this.selectModel);
        this.enabled = false;
        this.onRemove();
    }

    writeValue(ngModel: string): void {
        this._tmpNgModel = ngModel;
        this.ngModel = ngModel;
    }

    registerOnChange(fn: any): void {
        this.ngModelChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    private _handleSelectData() {
        if (this.selectData) {
            let items = this.selectData.filter(item => item.id == this.selectModel);
            this._selectedSelectModel = items.length > 0 ? items[0] : null;
        }
    }
}