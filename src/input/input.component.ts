import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {Observable} from "rxjs/Observable";
import {first} from "rxjs/operators";
import {GwConnectedOverlayComponent} from "../core/connected-overlay.component";
import {Placement} from "../core/placement";

@Component({
    selector: 'gw-input',
    styleUrls: ['./input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GwInputComponent),
        multi: true
    }],
    template: `
        <div class="btn btn-default {{btnSize}}"
             [ngClass]="gwClass"
             [class.hidden]="!enabled"
             [class.disabled]="disabled"
             cdkOverlayOrigin #overlayOrigin="cdkOverlayOrigin">
            <ng-container *ngIf="formatter">
                <span [innerHTML]="_values | safe"></span>
            </ng-container>
            <ng-container *ngIf="!formatter">
                <span class="author" [innerHTML]="label | safe"></span>
                <span class="value" [innerHTML]="_values | safe"></span>
            </ng-container>
            <span class="arrow"><span class="caret"></span></span>
            <i *ngIf="closeable" class="glyphicon glyphicon-remove" (click)="remove($event);"></i>
        </div>

        <gw-connected-overlay [overlayOrigin]="overlayOrigin"
                              [disabled]="disabled"
                              [(placement)]="placement"
                              (placementChange)="placementChange.emit($event)">
            <gw-triangle [placement]="placement">
                <div class="popover-container">
                    <ng-container *ngIf="showSelect">
                        <div class="popover-top">
                            <span class="top-label">{{label}}</span>:
                            <select class="top-select pull-right"
                                    [(ngModel)]="_tmpSelectModel"
                                    (change)="onSelectModelChange()">
                                <option *ngFor="let item of selectData" [value]="item.id">{{item.text}}</option>
                            </select>
                        </div>
                        <div class="popover-hr"></div>
                    </ng-container>
                    <div class="popover-main">
                        <input type="text" [(ngModel)]="_tmpNgModel" [attr.placeholder]="placeholder"
                               [attr.name]="name">
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
            </gw-triangle>
        </gw-connected-overlay>
    `
})
export class GwInputComponent extends GWControl implements ControlValueAccessor {

    @ViewChild(GwConnectedOverlayComponent) overlay: GwConnectedOverlayComponent;

    @Input() name: string;
    @Input() label: string;
    @Input() gwClass: string;
    @Input() btnSize: 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default' = 'btn-xs';
    @Input() closeable: boolean = true;
    @Input() enabled: boolean = true;
    @Input() disabled: boolean = false;
    @Input() placeholder: string;

    @Input() placement: string = Placement.BOTTOM_LEFT;
    @Output() placementChange: EventEmitter<string> = new EventEmitter();

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

    /** value formatter */
    @Input() formatter: () => string;

    /** @Input() 双向绑定 */
    ngModel: string;
    /** @Output() */
    ngModelChange = Function.prototype;

    _tmpNgModel: string;
    _tmpSelectModel: any;
    _selectedSelectModel: { id: any, text: string };

    @Input('disabled') set _disabled(disabled: boolean) {
        this.disabled = disabled;
        this.disabled && this.overlay && this.overlay.hide();
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

    get _values(): string {
        if (this.formatter) {
            return this.formatter();
        } else {
            if (this.showSelect) {
                let selectText = this._selectedSelectModel ? this._selectedSelectModel.text || '' : '';
                return `${selectText} ${this.ngModel || ''}`;
            } else {
                return this.ngModel || '';
            }
        }
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
                this.overlay.hide();
            }
        };

        this.onBeforeSave ? this.onBeforeSave(this._tmpNgModel, this._tmpSelectModel).pipe(first()).subscribe(subscribeFn) : subscribeFn(true);
    }

    cancel() {
        this._tmpSelectModel = this.selectModel;
        this._tmpNgModel = this.ngModel;
        this.onCancel.emit();
        this.overlay.hide();
    }

    remove(event: Event) {
        event.stopPropagation();

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