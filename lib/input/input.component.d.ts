import { OnInit } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { GWControl } from "../utils/gw-control";
import { GWPopoverDirective } from "../popover/popover.directive";
import { InputModal } from "../utils/select.modal";
export declare const GW_INPUT_VALUE_ACCESSOR: any;
export declare class GWInputComponent extends GWControl implements ControlValueAccessor, OnInit {
    popover: GWPopoverDirective;
    _value: string | InputModal;
    _input_val: string;
    _select_val: string;
    selectLabel: string;
    valueLabel: string;
    onChange: any;
    onTouched: any;
    value: string | InputModal;
    ngOnInit(): void;
    clear(): void;
    save(): void;
    cancel(): void;
    remove(): void;
    writeValue(val: string | InputModal): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
