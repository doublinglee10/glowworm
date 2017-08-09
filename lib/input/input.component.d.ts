import { OnInit } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { GWControl } from "../utils/gw-control";
import { PopoverDirective } from "ngx-bootstrap";
export declare const GW_INPUT_VALUE_ACCESSOR: any;
export declare class GWInputComponent extends GWControl implements OnInit, ControlValueAccessor {
    popover: PopoverDirective;
    _value: string;
    _tmp_value: string;
    onChange: any;
    onTouched: any;
    selectLabel: string;
    ngOnInit(): void;
    value: string;
    clear(): void;
    save(): void;
    cancel(): void;
    remove(): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
