import {Component, forwardRef, OnInit, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {GWPopoverDirective} from "../popover/popover.directive";
import {InputModal} from "../utils/select.modal";

export const GW_INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GWInputComponent),
    multi: true
};

@Component({
    selector: 'gw-input',
    styleUrls: ['./input.component.css'],
    templateUrl: './input.component.html',
    providers: [GW_INPUT_VALUE_ACCESSOR]
})
export class GWInputComponent extends GWControl implements ControlValueAccessor, OnInit {

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    _value: string | InputModal;
    _input_val: string;
    _select_val: string;
    selectLabel: string;
    valueLabel: string;

    onChange: any;
    onTouched: any;

    set value(value: string | InputModal) {
        this._value = value;
        this.onTouched && this.onTouched();
        this.onChange && this.onChange(this._value);
        if (this.showSelect) {
            let data = this.selectData.filter((item: any) => item.id == this._select_val);
            if (data.length > 0) {
                this.selectLabel = data[0].text;
            }
            this.valueLabel = value ? (<InputModal>value).value : '';
        } else {
            this.selectLabel = '';
            this.valueLabel = value as string;
        }
    }

    get value() {
        return this._value;
    }

    ngOnInit(): void {
    }

    clear() {
        this._input_val = '';
    }

    save() {
        if (this.showSelect) {
            this.value = {
                value: this._input_val,
                selectValue: this._select_val
            }
        } else {
            this.value = this._input_val;
        }
    }

    cancel() {
        if (this.value) {
            if (this.showSelect) {
                this._input_val = (<InputModal>this.value).value;
                this._select_val = (<InputModal>this.value).selectValue;
            } else {
                this._input_val = this.value as string;
            }
        }
    }

    remove() {
        this.value = null;
        this._input_val = '';
        this._select_val = '';
        this.valueLabel = '';
        this.selectLabel = '';
        this.enabled = false;
        this.onRemove();
    }

    writeValue(val: string | InputModal): void {
        if (val) {
            if (this.showSelect) {
                this._input_val = (<InputModal>val).value;
                this._select_val = (<InputModal>val).selectValue;
            } else {
                this._input_val = val as string;
            }
        } else {
            this.selectLabel = '';
            this.valueLabel = '';
            this._input_val = '';
            this._select_val = '';
        }
        this.value = val;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}