import { OnInit } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { GWControl } from "../utils/gw-control";
import { GWPopoverDirective } from "../popover/popover.directive";
import { RangeInputModal } from "../utils/select.modal";
export declare const GW_RANGEINPUT_VALUE_ACCESSOR: any;
export declare class GWRangeInputComponent extends GWControl implements ControlValueAccessor, OnInit {
    popover: GWPopoverDirective;
    _value: RangeInputModal;
    _input_val_s: string;
    _input_val_e: string;
    _select_val: string;
    selectLabel: string;
    valueLabel: string;
    onChange: any;
    onTouched: any;
    value: RangeInputModal;
    ngOnInit(): void;
    clear(): void;
    save(): void;
    cancel(): void;
    remove(): void;
    writeValue(val: RangeInputModal): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
