import {Component, forwardRef, OnInit, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GWControl} from "../utils/gw-control";
import {GWPopoverDirective} from "../popover/popover.directive";
import {RangeInputModal} from "../utils/select.modal";

export const GW_RANGEINPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GWRangeInputComponent),
    multi: true
};

@Component({
    selector: 'gw-rangeinput',
    styleUrls: ['./rangeinput.component.css'],
    templateUrl: './rangeinput.component.html',
    providers: [GW_RANGEINPUT_VALUE_ACCESSOR]
})
export class GWRangeInputComponent extends GWControl implements ControlValueAccessor, OnInit {

    @ViewChild(GWPopoverDirective) popover: GWPopoverDirective;

    _value: RangeInputModal;
    _input_val_s: string;
    _input_val_e: string;

    _select_val: string;
    selectLabel: string;
    valueLabel: string;

    onChange: any;
    onTouched: any;

    set value(value:  RangeInputModal) {
        this._value = value;
        this.onTouched && this.onTouched();
        this.onChange && this.onChange(this._value);
        if (this.showSelect) {
            let data = this.selectData.filter((item: any) => item.id == this._select_val);
            if (data.length > 0) {
                this.selectLabel = data[0].text;
            }
            this.valueLabel = value ? (value.start+' - '+ value.end): '';
        } else {
            this.selectLabel = '';
            this.valueLabel = value ? (value.start+' - '+ value.end): '';
        }
    }

    get value() {
        return this._value;
    }

    ngOnInit(): void {
    }

    clear() {
        this._input_val_s = '';
        this._input_val_e = '';
    }

    save() {
        if (this.showSelect) {
            this.value = {
                start: this._input_val_s,
                end:this._input_val_e,
                selectValue: this._select_val
            }
        } else {
            this.value = {
              start: this._input_val_s,
              end:this._input_val_e
            }
        }
    }

    cancel() {
        if (this.value) {
            if (this.showSelect) {
                this._input_val_s = this.value.start;
                this._input_val_e = this.value.end;
                this._select_val = this.value.selectValue;
            } else {
                this._input_val_s = this.value.start;
                this._input_val_e = this.value.end;
            }
        }
    }

    remove() {
        this.value = null;
        this._input_val_s =  this._input_val_e = '';
        this._select_val = '';
        this.enabled = false;
        this.onRemove();
    }

    writeValue(val: RangeInputModal): void {
        if (val) {
            if (this.showSelect) {
                this._input_val_s = (<RangeInputModal>val).start;
                this._input_val_e = (<RangeInputModal>val).end;
                this._select_val = (<RangeInputModal>val).selectValue;
            } else {
              this._input_val_s = (<RangeInputModal>val).start;
              this._input_val_e = (<RangeInputModal>val).end;
            }
        } else {
            this.selectLabel = '';
            this.valueLabel = '';
            this._input_val_s ='';
            this._input_val_e = '';
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
