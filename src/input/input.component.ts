import {Component, forwardRef, OnInit, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {PopoverDirective} from "ngx-bootstrap";

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
export class GWInputComponent extends GWControl implements OnInit, ControlValueAccessor {

    @ViewChild(PopoverDirective) popover: PopoverDirective;

    _value: string;
    _tmp_value: string;
    onChange: any;
    onTouched: any;

    ngOnInit(): void {
        if (!this.selectValue && this.selectData && this.selectData.length > 0) {
            this.selectValue = this.selectData[0].value
        }
    }

    set value(value: string) {
        this._value = value;
        this.onTouched && this.onTouched();
        this.onChange && this.onChange(this._value);
    }

    clear() {
        this._tmp_value = null;
    }

    save() {
        this.popover.hide();
        this.value = this._tmp_value;
    }

    cancel() {
        this.popover.hide();
        this._tmp_value = this.value;
    }

    remove() {
        this.value = null;
        this.enabled = false;
        this.clear();
        this.selectValue = null;
        this.onRemove();
    }

    writeValue(obj: any): void {
        this.value = obj;
        this._tmp_value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}