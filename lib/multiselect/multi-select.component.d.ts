import { EventEmitter } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { GWSelect } from "../utils/select.modal";
import { GWControl } from "../utils/gw-control";
import { PopoverDirective } from "ngx-bootstrap";
export declare const GW_SELECT_VALUE_ACCESSOR: any;
export declare class GWMultiSelectComponent extends GWControl implements ControlValueAccessor {
    popover: PopoverDirective;
    onSelectEvent: EventEmitter<any[]>;
    _filter: string;
    data: GWSelect[];
    values: any[];
    onChange: any;
    onTouched: any;
    selectLabel: string;
    readonly labels: string;
    _data: any[];
    clear(): void;
    updateNgModel(): void;
    save(): void;
    cancel(): void;
    remove(): void;
    writeValue(obj: any): void;
    refreshUI(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
