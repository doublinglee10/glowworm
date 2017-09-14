import { AfterContentInit, ElementRef, QueryList } from "@angular/core";
import { GWControl } from "../utils/gw-control";
export declare class GWToolbarComponent implements AfterContentInit {
    _fields: QueryList<ElementRef>;
    fields: any[];
    _filter: string;
    data: any[];
    addFieldComponent(component: GWControl): void;
    ngAfterContentInit(): void;
    refreshUI(): void;
    onRemove(): void;
    clear(): void;
    save(): void;
    cancel(): void;
}
