import { EventEmitter } from "@angular/core";
export declare class GWButtonComponent {
    values: string[];
    label: string;
    onClick: EventEmitter<void>;
    onClear: EventEmitter<void>;
    clear(): void;
    click(): void;
}
