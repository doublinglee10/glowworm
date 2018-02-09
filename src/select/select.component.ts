import {Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWToolbarComponent} from "../toolbar/toolbar.component";
import {Observable} from "rxjs/Observable";
import {first} from "rxjs/operators";
import {GwConnectedOverlayComponent} from "../core/connected-overlay.component";
import {Placement} from "../core/placement";

@Component({
    selector: 'gw-select',
    styleUrls: ['./select.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GwSelectComponent),
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
                            <span class="top-label" [innerHTML]="label | safeHtml"></span>:
                            <select class="top-select pull-right"
                                    [(ngModel)]="_tmpSelectModel"
                                    (change)="onSelectModelChange()">
                                <option *ngFor="let item of selectData" [value]="item.id"
                                        [innerHTML]="item.text"></option>
                            </select>
                        </div>
                        <div class="popover-hr"></div>
                    </ng-container>
                    <div class="popover-main">
                        <div class="input"><input type="text" [(ngModel)]="_filter" name="value" placeholder="过滤...">
                        </div>
                        <ul>
                            <li *ngFor="let item of data|gwSelectFilter:_filter">
                                <label>
                                    <input type="checkbox" name="checkbox"
                                           [(ngModel)]="item.checked"
                                           [disabled]="item.disabled"
                                           (change)="onCheckBoxChange(item)"/>
                                    <span [innerHTML]="item.text | safeHtml"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div class="popover-hr"></div>
                    <div class="popover-footer">
                        <div class="left">
                            <a class="btn btn-xs" (click)="clear()">清除</a>
                            <ng-template *ngTemplateOutlet="extra || contentExtra"></ng-template>
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
export class GwSelectComponent implements ControlValueAccessor {

    @Input() label: string;
    @Input() gwClass: string;
    @Input() btnSize: 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default' = 'btn-xs';
    @Input() enabled: boolean = true;
    @Input() disabled: boolean = false;
    @Input() closeable: boolean = true;
    @Input() multiple: boolean = false;
    @Input() clearSave: boolean = true;

    @Input() placement: string = Placement.BOTTOM_LEFT;
    @Output() placementChange: EventEmitter<string> = new EventEmitter();

    @Input() extra: TemplateRef<any>;
    @ContentChild('extra') contentExtra: TemplateRef<any>;

    @Input() showSelect: boolean = false;
    @Input() selectData: { id: any, text: string, disabled?: boolean }[] = [];

    /** 双向绑定 */
    @Input() selectModel: any;
    @Output() selectModelChange: EventEmitter<any> = new EventEmitter();

    _tmpSelectModel: any;
    _selectedModel: { id: any, text: string };
    @Output() onSelectChange: EventEmitter<any> = new EventEmitter();

    @Input() data: { id: any, text: string }[];
    /** @Input() 双向绑定 */
    ngModel: { id: any, text: string }[];
    /** @Output() */ // ngModelChange: EventEmitter<{ id: any, text: string }[]> = new EventEmitter();
    ngModelChange: any = Function.prototype;

    _filter: string;

    /** 保存前触发 */
    @Input() onBeforeSave: (ngModel, selectModel) => Observable<boolean>;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    /** value formatter */
    @Input() formatter: () => string;

    @ViewChild(GwConnectedOverlayComponent) overlay: GwConnectedOverlayComponent;

    @Input('disabled') set _disabled(disabled: boolean) {
        this.disabled = disabled;
        this.disabled && this.overlay && this.overlay.hide();
    }

    @Input('data') set _data(data: { id: any, text: string }[]) {
        this.data = data ? data.map(item => Object.assign({checked: false}, item)) : [];
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

    get _values(): string {
        if (this.formatter) {
            return this.formatter();
        } else {
            let ngModelValue = this.ngModel ? this.ngModel.map(item => item.text).join(',') : '';
            if (this.showSelect && this._selectedModel) {
                return `${this._selectedModel.text} ${ngModelValue}`;
            }
            return ngModelValue;
        }
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

        if (this.clearSave) {
            this.save();
        }
    }

    remove(event: Event) {
        event.stopPropagation();

        if (this.disabled) {
            return;
        }
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

                if (this.selectData) {
                    let items = this.selectData.filter(item => item.id == this.selectModel);
                    this._selectedModel = items.length > 0 ? items[0] : null;
                    this.selectModel = this._tmpSelectModel;
                }

                this.ngModelChange(this.ngModel);
                this.selectModelChange.emit(this.selectModel);
                this.onSave.emit();
                this.hide();
            }
        };

        const _tmpNgModel = (this.data || []).filter((item: any) => item.checked);
        this.onBeforeSave ? this.onBeforeSave(_tmpNgModel, this._tmpSelectModel).pipe(first()).subscribe(subscribeFn) : subscribeFn(true);
    }

    cancel() {
        this._tmpSelectModel = this.selectModel;
        this._cascadeData();
        this.onCancel.emit();
        this.hide();
    }

    hide() {
        this.overlay.hide();
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
                this.ngModelChange(this.ngModel);
            }
        }
    }

}