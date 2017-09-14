import { ElementRef, EventEmitter } from "@angular/core";
import { GwOverlayDirective, Placement } from "../core/overlay.directive";
import { ControlValueAccessor } from "@angular/forms";
export declare const GW_POPINPUT_VALUE_ACCESSOR: any;
export declare class GwPopInputComponent implements ControlValueAccessor {
    title: string;
    confirmText: string;
    cancelText: string;
    placement: Placement;
    source: ElementRef;
    onConfirm: EventEmitter<Event>;
    onCancel: EventEmitter<Event>;
    overlay: GwOverlayDirective;
    _value: any;
    private _onchangeFun;
    private _ontouchFun;
    onConfirmEvent(event: Event): void;
    onCancelEvent(event: Event): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
