import {Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild} from "@angular/core";
import {GwOverlayDirective} from "../core/overlay.directive";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Placement} from "../core/placement";
import {Observable} from "rxjs/Observable";

export const GW_POPINPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GwPopInputComponent),
    multi: true
};

@Component({
    selector: 'gw-popinput',
    styleUrls: ['../styles/triangle.css', '../styles/glowworm.css'],
    template: `
        <div gw-overlay
             [source]="source"
             [placement]="placement"
             [zIndex]="zIndex">
            <div class="triangle triangle-{{placement}}">
                <div class="gw-popinput">
                    <div class="gw-popinput-title" *ngIf="title" [innerHTML]="title | safeHtml"></div>
                    <div class="gw-popinput-body">
                        <input type="text" [(ngModel)]="_value"/>
                    </div>
                    <div class="gw-popinput-footer">
                        <button class="btn btn-xs btn-primary" (click)="onConfirmEvent($event)">{{confirmText}}</button>
                        <button class="btn btn-xs btn-default" (click)="onCancelEvent($event)">{{cancelText}}</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [GW_POPINPUT_VALUE_ACCESSOR]
})
export class GwPopInputComponent implements ControlValueAccessor {

    @Input() title: string;
    @Input() confirmText: string = '确认';
    @Input() cancelText: string = '取消';
    @Input() placement: Placement = 'bottom-left';
    @Input() zIndex: number;
    @Input() source: ElementRef;

    /** 保存前触发 */
    @Input() onBeforeConfirm: (ngModel) => Observable<boolean>;
    @Output() onConfirm: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() onCancel: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild(GwOverlayDirective) overlay: GwOverlayDirective;

    _value: any;
    private _onchangeFun;
    private _ontouchFun;

    onConfirmEvent(event: Event) {
        const subscribeFn = (save: boolean) => {
            if (save) {
                this._ontouchFun && this._ontouchFun(this._value);
                this._onchangeFun && this._onchangeFun(this._value);
                this.overlay.hide();
                this.onConfirm.emit(event);
            }
        };

        this.onBeforeConfirm ? this.onBeforeConfirm(this._value).first().subscribe(subscribeFn) : subscribeFn(true);
    }

    onCancelEvent(event: Event) {
        this.overlay.hide();
        this.onCancel.emit(event);
    }

    writeValue(obj: any): void {
        this._value = obj;
    }

    registerOnChange(fn: any): void {
        this._onchangeFun = fn;
    }

    registerOnTouched(fn: any): void {
        this._ontouchFun = fn;
    }
}