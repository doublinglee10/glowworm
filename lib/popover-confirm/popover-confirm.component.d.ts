import { ElementRef, EventEmitter } from "@angular/core";
import { BasePopover } from "../utils/popover.class";
export declare class GWPopoverConfirmComponent extends BasePopover {
    el: ElementRef;
    styler: any;
    title: string;
    onConfirm: EventEmitter<void>;
    onCancel: EventEmitter<void>;
    constructor(el: ElementRef);
    doConfirm(): void;
    doCancel(): void;
}
