import { ElementRef, NgZone, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { WindowResizeService } from "./window-resize.service";
export declare type Placement = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'left-top' | 'left-bottom' | 'right' | 'right-top' | 'right-bottom';
export declare class GwOverlayDirective implements OnInit, OnDestroy {
    private el;
    private renderer;
    private ngZone;
    private resizeService;
    source: ElementRef;
    placement: Placement;
    private _clickHandler;
    private _resizeSubscription;
    private _isHidden;
    private _overlay;
    private _top;
    private _bottom;
    private _left;
    private _right;
    private _transform;
    private _margin;
    zIndex: number;
    constructor(el: ElementRef, renderer: Renderer2, ngZone: NgZone, resizeService: WindowResizeService);
    ngOnInit(): void;
    show(): void;
    hide(): void;
    ngOnDestroy(): void;
    private _registerResizeEvent();
    private _unregisterResizeEvent();
    private _calculatePosition();
    private _getOffset(el);
    private _registerClickEvent();
    private _unregisterClickEvent();
}
