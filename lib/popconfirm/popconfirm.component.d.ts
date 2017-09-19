import { ElementRef, EventEmitter } from "@angular/core";
import { GwOverlayDirective, Placement } from "../core/overlay.directive";
export declare class GwPopConfirmComponent {
    title: string;
    confirmText: string;
    cancelText: string;
    placement: Placement;
    source: ElementRef;
    zIndex: number;
    onConfirm: EventEmitter<Event>;
    onCancel: EventEmitter<Event>;
    overlay: GwOverlayDirective;
    onConfirmEvent(event: Event): void;
    onCancelEvent(event: Event): void;
}
