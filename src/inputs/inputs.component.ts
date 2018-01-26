import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {GWPopoverDirective} from "../popover/popover.directive";
import {Observable} from "rxjs/Observable";
import {first} from "rxjs/operators";

export const GW_INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GwInputsComponent),
    multi: true
};

@Component({
    selector: 'gw-inputs',
    styleUrls: ['./inputs.component.css'],
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
                <div class="popover-main">
                    <div *ngFor="let item of _tmpNgModel; let i = index; trackBy:customTrackBy" class="item">
                        <input [(ngModel)]="_tmpNgModel[i]" [attr.placeholder]="placeholder">
                        <i class="fa fa-minus-square" (click)="removeItem(i)"></i>
                    </div>
                    <div class="plus">
                        <button (click)="_tmpNgModel.push('')"
                                class="btn btn-default btn-xs btn-block">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
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
export class GwInputsComponent extends GWControl implements ControlValueAccessor {

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    @Input() name: string;
    @Input() label: string;
    @Input() btnSize: 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default' = 'btn-xs';
    @Input() closeable: boolean = true;
    @Input() enabled: boolean = true;
    @Input() placeholder: string;
    @Input() disabled: boolean = false;

    /** 清除时立即执行保存 */
    @Input() clearSave: boolean = true;

    /** 保存前触发 */
    @Input() onBeforeSave: (ngModel) => Observable<boolean>;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    /** @Input() 双向绑定 */
    ngModel: any[] = [];
    /** @Output() */
    ngModelChange = Function.prototype;

    _tmpNgModel: any[] = [];

    @Input('disabled') set _disabled(disabled: boolean) {
        this.disabled = disabled;
        this.disabled && this.popover && this.popover.hide();
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    get _values() {
        return this.ngModel.join(',');
    }

    clear() {
        this._tmpNgModel = [];

        if (this.clearSave) {
            this.save();
        }
    }

    save() {
        const subscribeFn = (save: boolean) => {
            if (save) {
                this.ngModel = [...this._tmpNgModel];
                this.ngModelChange(this.ngModel);
                this.onSave.emit();
                this.popover.hide();
            }
        };
        this.onBeforeSave ? this.onBeforeSave(this._tmpNgModel).pipe(first()).subscribe(subscribeFn) : subscribeFn(true);
    }

    cancel() {
        this._tmpNgModel = [...this.ngModel];
        this.onCancel.emit();
    }

    removeItem(index) {
        this._tmpNgModel.splice(index, 1);
    }

    remove() {
        if (this.disabled) {
            return;
        }
        this.ngModel = [];
        this._tmpNgModel = [];
        this.ngModelChange(this.ngModel);
        this.enabled = false;
        this.onRemove();
    }

    writeValue(ngModel: string[]): void {
        let values = (ngModel || []);
        this._tmpNgModel = [...values];
        this.ngModel = [...values];
    }

    registerOnChange(fn: any): void {
        this.ngModelChange = fn;
    }

    registerOnTouched(fn: any): void {
    }
}