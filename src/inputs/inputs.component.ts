import {Component, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {Observable} from "rxjs/Observable";
import {first} from "rxjs/operators";
import {GwConnectedOverlayComponent} from "../core/connected-overlay.component";

@Component({
    selector: 'gw-inputs',
    styleUrls: ['./inputs.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GwInputsComponent),
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

        <gw-connected-overlay [overlayOrigin]="overlayOrigin" [disabled]="disabled">
            <gw-triangle>
                <div class="popover-container">
                    <div class="popover-main">
                        <div *ngFor="let item of _tmpNgModel; let i = index; trackBy: customTrackBy" class="item">
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
                            <button class="btn btn-default btn-xs" (click)="cancel()">取消</button>
                        </div>
                    </div>
                </div>
            </gw-triangle>
        </gw-connected-overlay>
    `
})
export class GwInputsComponent extends GWControl implements ControlValueAccessor {

    @ViewChild(GwConnectedOverlayComponent) overlay: GwConnectedOverlayComponent;

    @Input() name: string;
    @Input() label: string;
    @Input() gwClass: string;
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

    /** value formatter */
    @Input() formatter: () => string;

    /** @Input() 双向绑定 */
    ngModel: any[] = [];
    /** @Output() */
    ngModelChange = Function.prototype;

    _tmpNgModel: any[] = [];

    @Input('disabled') set _disabled(disabled: boolean) {
        this.disabled = disabled;
        this.disabled && this.overlay && this.overlay.hide();
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    get _values(): string {
        if (this.formatter) {
            return this.formatter();
        } else {
            return this.ngModel.join(',');
        }
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
                this.overlay.hide();
            }
        };
        this.onBeforeSave ? this.onBeforeSave(this._tmpNgModel).pipe(first()).subscribe(subscribeFn) : subscribeFn(true);
    }

    cancel() {
        this._tmpNgModel = [...this.ngModel];
        this.onCancel.emit();
        this.overlay.hide();
    }

    removeItem(index) {
        this._tmpNgModel.splice(index, 1);
    }

    remove(event: Event) {
        event.stopPropagation();

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