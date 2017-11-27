import {Component, OnInit, Input, HostListener, forwardRef, ViewEncapsulation} from "@angular/core"

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms"

@Component({
    selector: 'gw-switch',
    template: `
        <span [ngClass]="_classMap" tabindex="0">
            <span class="gw-switch-inner">
                <ng-template [ngIf]="_checked">
                    <ng-content select="[checked]"></ng-content>
                </ng-template>
                <ng-template [ngIf]="!_checked">
                    <ng-content select="[unchecked]"></ng-content>
                </ng-template>
            </span>
        </span>
    `,
    styleUrls: ['./gw-switch.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => GwSwitchComponent)
        }
    ]
})
export class GwSwitchComponent implements ControlValueAccessor, OnInit {
    _classMap;
    _size: string;
    _checked = false;
    _disabled = false;
    _type: string;


    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;

    @Input()
    set size(value: string) {
        this._size = value;
        this.setClassMap()
    }

    get size(): string {
        return this._size
    }

    @Input()
    set type(value: string) {
        this._type = value;
        this.setClassMap()
    }

    get type(): string {
        return this._type
    }

    @Input()
    set disabled(value: boolean) {
        this._disabled = value;
        this.setClassMap()
    }

    get disabled(): boolean {
        return this._disabled
    }

    @HostListener('click', ['$event'])
    onClick(e) {
        e.preventDefault();
        if (!this._disabled) {
            this.updateValue(!this._checked);
            this.onChange(this._checked)
        }
    }

    setClassMap() {
        this._classMap = {
            ['gw-switch']: true,
            [`gw-switch-checked`]: this._checked,
            [`gw-switch-disabled`]: this._disabled,
            [`gw-switch-lg`]: this._size === 'lg',
            [`gw-switch-warning`]: this._type === 'warning',
            [`gw-switch-danger`]: this._type === 'danger',
            [`gw-switch-info`]: this._type === 'info',
            [`gw-switch-primary`]: this._type === 'primary',
        }
    }

    updateValue(value: any) {
        if (this._checked === value) {
            return
        }
        this._checked = value;
        this.setClassMap()
    }

    writeValue(value: any) {
        this.updateValue(value)
    }

    registerOnChange(fn) {
        this.onChange = fn
    }

    registerOnTouched(fn) {
        this.onTouched = fn
    }

    ngOnInit() {
        this.setClassMap()
    }
}