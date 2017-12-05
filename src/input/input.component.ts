import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {GWPopoverDirective} from "../popover/popover.directive";

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
            <button type="button" class="btn btn-default {{btnSize}}">
                <span gw-popover [template]="tpl">
                    <span class="author">{{label}}</span>
                    <span class="value">{{selectLabel}} {{valueLabel}}</span>
                    <span class="arrow"><span class="caret"></span></span>
                </span>
                <ng-container *ngIf="closeable">
                    <span class="glyphicon glyphicon-remove" (click)="remove();"></span>
                </ng-container>
            </button>
        </ng-container>

        <ng-template #tpl>
            <div class="popover-container">
                <ng-container *ngIf="showSelect">
                    <div class="popover-top">
                        <span class="top-label">{{label}}</span>:
                        <select class="top-select" [(ngModel)]="_select_val">
                            <option *ngFor="let item of selectData" [value]="item.id">{{item.text}}</option>
                        </select>
                    </div>
                    <div class="popover-hr"></div>
                </ng-container>
                <div class="popover-main">
                    <input type="text" [(ngModel)]="_input_val" name="value">
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
export class GWInputComponent extends GWControl implements ControlValueAccessor, OnInit {

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    @Input() label: string;
    @Input() btnSize: 'btn-lg' | 'btn-sm' | 'btn-xs' | 'btn-flat' | 'disabled' | 'default' = 'btn-xs';
    @Input() closeable: boolean = true;
    @Input() enabled: boolean = true;

    @Input() showSelect: boolean = false;
    @Input() selectData: { id: any, text: string }[] = [];

    /** @Input() 双向绑定 */
    @Input() selectModel: any; // id: any
    @Output() selectModelChange: EventEmitter<{ id: any, text: string }> = new EventEmitter();

    _value: string;
    _input_val: string;
    _select_val: string;
    selectLabel: string;
    valueLabel: string;

    /** @Input() 双向绑定 */
    ngModel: string;
    /** @Output() */
    ngModelChange = Function.prototype;

    ngOnInit(): void {
    }

    clear() {
        this._input_val = '';
    }

    save() {

    }

    cancel() {

    }

    remove() {


        this.enabled = false;
        this.onRemove();
    }

    writeValue(ngModel: string): void {

    }

    registerOnChange(fn: any): void {
        this.ngModelChange = fn;
    }

    registerOnTouched(fn: any): void {
    }
}