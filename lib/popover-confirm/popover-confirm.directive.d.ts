import { ComponentFactoryResolver, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
export declare class GWPopoverConfirmDirective implements OnInit, OnDestroy {
    private el;
    private zone;
    private viewContainerRef;
    private componentFactoryResolver;
    styler: any;
    title: string;
    onConfirm: EventEmitter<void>;
    onCancel: EventEmitter<void>;
    private popover;
    constructor(el: ElementRef, zone: NgZone, viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClickEvent(event: any): void;
    private createComponent();
    show(): void;
    hide(): void;
    toggle(): void;
    reposition(): void;
}
