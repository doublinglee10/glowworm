import { ComponentFactoryResolver, ElementRef, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
export declare class GWPopoverDirective implements OnInit, OnDestroy {
    private el;
    private zone;
    private viewContainerRef;
    private componentFactoryResolver;
    template: TemplateRef<any>;
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
