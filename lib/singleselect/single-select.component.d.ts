import { EventEmitter } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { GWSelect } from "../utils/select.modal";
import { GWControl } from "../utils/gw-control";
import { PopoverDirective } from "ngx-bootstrap";
export declare const GW_SINGLE_SELECT_VALUE_ACCESSOR: any;
export declare class GWSingleSelectComponent extends GWControl implements ControlValueAccessor {
    popover: PopoverDirective;
    onSelectEvent: EventEmitter<string>;
    _filter: string;
    data: GWSelect[];
    value: any;
    onChange: any;
    onTouched: any;
    selectLabel: string;
    _data: any[];
    clear(): void;
    updateNgModel(): void;
    save(): void;
    cancel(): void;
    remove(): void;
    onSelect(item: any): void;
    writeValue(obj: string): void;
    refreshUI(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
