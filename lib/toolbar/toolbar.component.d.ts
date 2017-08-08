import { AfterContentInit, ElementRef, QueryList } from "@angular/core";
export declare class GWToolbarComponent implements AfterContentInit {
    fields: QueryList<ElementRef>;
    _filter: string;
    data: any[];
    ngAfterContentInit(): void;
    refreshUI(): void;
    onRemove(): void;
    clear(): void;
    save(): void;
    cancel(): void;
}
