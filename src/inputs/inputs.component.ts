import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {GWPopoverDirective} from "../popover/popover.directive";
import {Observable} from "rxjs/Observable";

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
            {{ngModel | json}}
            {{_tmpNgModel | json}}

            <button type="button" class="btn btn-default {{btnSize}}">
                <span gw-popover [template]="tpl">
                    <span class="author">{{label}}</span>
                    <span class="value">{{_values}}</span>
                    <span class="arrow"><span class="caret"></span></span>
                </span>
                <ng-container *ngIf="closeable">
                    <span class="glyphicon glyphicon-remove" (click)="remove();"></span>
                </ng-container>
            </button>
        </ng-container>

        <ng-template #tpl>
            <div class="popover-container">
                <div class="popover-main">
                    <div *ngFor="let item of _tmpNgModel; let i = index;" class="item">
                        <input [(ngModel)]="item.value" [attr.placeholder]="placeholder">
                        <i class="fa fa-minus-square" (click)="removeItem(i)"></i>
                    </div>
                    <div class="plus">
                        <button (click)="_tmpNgModel.push({value: ''})"
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
export class GwInputsComponent extends GWControl implements ControlValueAccessor, OnInit {

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    @Input() name: string;
    @Input() label: string;
    @Input() btnSize: 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default' = 'btn-xs';
    @Input() closeable: boolean = true;
    @Input() enabled: boolean = true;
    @Input() placeholder: string;

    /** 清除时立即执行保存 */
    @Input() clearSave: boolean = true;

    /** 保存前触发 */
    @Input() onBeforeSave: (ngModel) => Observable<boolean>;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

    /** @Input() 双向绑定 */
    ngModel: { value: any }[] = [];
    /** @Output() */
    ngModelChange = Function.prototype;

    _tmpNgModel: { value: any }[] = [];

    ngOnInit(): void {
    }

    get _values() {
        return this.ngModel.map(item => item.value).join(',');
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
                this.ngModel = [...this._tmpNgModel.map(item => Object.assign(item))];
                this.ngModelChange(this.ngModel.map(item => item.value));
                this.onSave.emit();
                this.popover.hide();
            }
        };

        let ngModel = this._tmpNgModel.map(item => item.value);
        this.onBeforeSave ? this.onBeforeSave(ngModel).first().subscribe(subscribeFn) : subscribeFn(true);
    }

    cancel() {
        this._tmpNgModel = [...this.ngModel.map(item => Object.assign(item))];
        this.onCancel.emit();
    }

    removeItem(index) {
        this._tmpNgModel.splice(index, 1);
    }

    remove() {
        this.ngModel = [];
        this._tmpNgModel = [];
        this.ngModelChange(this.ngModel);
        this.enabled = false;
        this.onRemove();
    }

    writeValue(ngModel: string[]): void {
        let values = (ngModel || []).map(item => Object.assign({value: item}));
        this._tmpNgModel = [...values.map(item => Object.assign(item))];
        this.ngModel = [...values.map(item => Object.assign(item))];
    }

    registerOnChange(fn: any): void {
        this.ngModelChange = fn;
    }

    registerOnTouched(fn: any): void {
    }
}