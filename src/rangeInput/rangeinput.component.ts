import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {GWControl} from "../utils/gw-control";
import {GWPopoverDirective} from "../popover/popover.directive";

@Component({
    selector: 'gw-rangeinput',
    styleUrls: ['./rangeinput.component.css'],
    template: `
        <ng-container *ngIf="enabled">
            <span class="btn btn-default {{btnSize}}">
                <span gw-popover [template]="tpl">
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
                        <select class="top-select" [(ngModel)]="_tmpSelectModel" (change)="onSelectModelChange()">
                            <option *ngFor="let item of selectData" [attr.value]="item.id">{{item.text}}</option>
                        </select>
                    </div>
                    <div class="popover-hr"></div>
                </ng-container>
                <div class="popover-main">
                    <input type="number" [(ngModel)]="_tmpMinModel" [attr.min]="min" [attr.max]="_tmpMaxModel"
                           [attr.step]="step">
                    <span>-</span>
                    <input type="number" [(ngModel)]="_tmpMaxModel" [attr.max]="max" [attr.min]="_tmpMinModel"
                           [attr.step]="step">
                </div>
                <div class="popover-hr"></div>
                <div class="popover-footer">
                    <div class="left">
                        <a class="btn btn-xs" (click)="clear()">清除</a>
                    </div>
                    <div class="right">
                        <button class="btn btn-primary btn-xs" (click)="popover.hide();save()">保存</button>
                        <button class="btn btn-default btn-xs" (click)="popover.hide();cancel()">取消</button>
                    </div>
                </div>
            </div>
        </ng-template>

    `
})
export class GWRangeInputComponent extends GWControl {

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    @Input() label: string;
    @Input() btnSize: 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default' = 'btn-xs';
    @Input() closeable: boolean = true;
    @Input() enabled: boolean = true;

    @Input() min: number = null;
    @Input() max: number = null;
    @Input() step: number = 1;

    /** @Input() 双向绑定 */
    @Input() minModel: number;
    @Output() minModelChange: EventEmitter<number> = new EventEmitter();

    /** @Input() 双向绑定 */
    @Input() maxModel: number;
    @Output() maxModelChange: EventEmitter<number> = new EventEmitter();

    @Input() showSelect: boolean = false;
    @Input() selectData: { id: any, text: string }[] = [];
    @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

    /** @Input() 双向绑定 */
    @Input() selectModel: any; // id: any
    @Output() selectModelChange: EventEmitter<{ id: any, text: string }> = new EventEmitter();

    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    _tmpMinModel: number;
    _tmpMaxModel: number;
    _tmpSelectModel: any;
    _selectedSelectModel: { id: any, text: string };

    @Input('minModel') set _minModel(minModel: number) {
        this._tmpMinModel = minModel;
        this.minModel = minModel;
    }

    @Input('maxModel') set _maxModel(maxModel: number) {
        this._tmpMaxModel = maxModel;
        this.maxModel = maxModel;
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
            return `${selectText} ${this.minModel || ''} - ${this.maxModel || ''}`;
        }
        return `${this.minModel || ''} - ${this.maxModel || ''}`;
    }

    onSelectModelChange() {
        this.onSelectChange.emit(this._tmpSelectModel);
    }

    clear() {
        this._tmpMinModel = null;
        this._tmpMaxModel = null;
        this._tmpSelectModel = '';
    }

    save() {
        this.minModel = this._tmpMinModel;
        this.minModelChange.emit(Number(this.minModel));
        this.maxModel = this._tmpMaxModel;
        this.maxModelChange.emit(Number(this.maxModel));
        this._selectModel = this._tmpSelectModel;
        this.selectModelChange.emit(this.selectModel);
        this.onSave.emit();
    }

    cancel() {
        this._tmpMinModel = this.minModel;
        this._tmpMaxModel = this.maxModel;
        this._tmpSelectModel = this.selectModel;
        this.onCancel.emit();
    }

    remove() {
        this._tmpSelectModel = this.selectModel = '';
        this._tmpMinModel = this.minModel = null;
        this._tmpMaxModel = this.maxModel = null;
        this.selectModelChange.emit(this.selectModel);
        this.minModelChange.emit(this.minModel);
        this.maxModelChange.emit(this.maxModel);
        this.enabled = false;
        this.onRemove();
    }

    private _handleSelectData() {
        if (this.selectData) {
            let items = this.selectData.filter(item => item.id == this.selectModel);
            this._selectedSelectModel = items.length > 0 ? items[0] : null;
        }
    }
}
