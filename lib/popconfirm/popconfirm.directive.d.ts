import { ElementRef, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { Placement } from "../core/overlay.directive";
import { ComponentLoaderService } from "../core/component-loader.service";
export declare class GwPopConfirmDirective implements OnInit, OnDestroy {
    private componentLoader;
    private el;
    title: string;
    confirmText: string;
    cancelText: string;
    placement: Placement;
    onConfirm: EventEmitter<Event>;
    onCancel: EventEmitter<Event>;
    private componentRef;
    constructor(componentLoader: ComponentLoaderService, el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
