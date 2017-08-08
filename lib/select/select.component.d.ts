import { ControlValueAccessor } from "@angular/forms";
import { GWSelect } from "../utils/select.modal";
import { GWControl } from "../utils/gw-control";
import { PopoverDirective } from "ngx-bootstrap";
export declare const GW_SELECT_VALUE_ACCESSOR: any;
export declare class GWSelectComponent extends GWControl implements ControlValueAccessor {
    popover: PopoverDirective;
    singleSelect: boolean;
    _filter: string;
    data: GWSelect[];
    values: any[];
    onChange: any;
    onTouched: any;
    readonly labels: string;
    _data: any[];
    clear(): void;
    save(): void;
    cancel(): void;
    remove(): void;
    onSelect(item: any): void;
    writeValue(obj: any): void;
    refreshUI(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
