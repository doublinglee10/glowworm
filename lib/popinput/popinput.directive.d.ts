import { ElementRef, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { Placement } from "../core/overlay.directive";
import { ComponentLoaderService } from "../core/component-loader.service";
import { ControlValueAccessor } from "@angular/forms";
export declare const GW_POPINPUT_VALUE_ACCESSOR: any;
export declare class GwPopinputDirective implements OnInit, OnDestroy, ControlValueAccessor {
    private componentLoader;
    private el;
    title: string;
    confirmText: string;
    cancelText: string;
    placement: Placement;
    onConfirm: EventEmitter<Event>;
    onCancel: EventEmitter<Event>;
    private componentRef;
    private _value;
    private _onchangeFun;
    private _ontouchFun;
    constructor(componentLoader: ComponentLoaderService, el: ElementRef);
    ngOnInit(): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    ngOnDestroy(): void;
}
