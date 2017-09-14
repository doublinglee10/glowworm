import { ElementRef, TemplateRef } from "@angular/core";
export declare class GWPopoverComponent {
    el: ElementRef;
    template: TemplateRef<any>;
    hidden: boolean;
    style: any;
    constructor(el: ElementRef);
    setStyle(style: any): void;
    hide(): void;
    show(): void;
    toggle(): void;
}
