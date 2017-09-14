import {Directive, ElementRef, HostBinding, Input, NgZone, OnDestroy, OnInit, Renderer2} from "@angular/core";

export type Placement =
    'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'left-top'
    | 'left-bottom'
    | 'right'
    | 'right-top'
    | 'right-bottom'
    ;

@Directive({
    selector: '[gw-overlay]'
})
export class GwOverlayDirective implements OnInit, OnDestroy {

    @Input() source: ElementRef;
    @Input() placement: Placement;

    private _clickHandler: Function;
    @HostBinding('class.hidden') private _isHidden: boolean = true;
    @HostBinding('class.gw-overlay') private _overlay = true;
    @HostBinding('style.top') private _top: any;
    @HostBinding('style.bottom') private _bottom: any;
    @HostBinding('style.left') private _left: any;
    @HostBinding('style.right') private _right: any;

    constructor(private el: ElementRef,
                private renderer: Renderer2,
                private ngZone: NgZone) {
    }

    ngOnInit() {
        this.registerClickEvent();
    }

    registerClickEvent() {
        if (!this._clickHandler) {
            this._clickHandler = this.renderer.listen(document, 'click', (event) => {
                if (this.source.nativeElement.contains(event.target)) { //toggle
                    if (this._isHidden) {
                        this.show();
                    } else {
                        this.hide();
                    }
                } else if (this.el.nativeElement.contains(event.target)) {

                } else {
                    this.hide();
                }
            });
        }
    }

    unregisterClickEvent() {
        if (this._clickHandler) {
            this._clickHandler();
            this._clickHandler = null;
        }
    }

    show() {
        this._isHidden = false;
        this._calculatePosition();
    }

    hide() {
        this._isHidden = true;
    }

    ngOnDestroy() {
        this.unregisterClickEvent();
    }

    private _calculatePosition() {
        if (!this.placement) return;

        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        let {x, y, width, height} = this._getOffset(this.source.nativeElement);
        let margin = 8;

        let top, bottom, left, right;
        switch (this.placement) {
            case 'top':
                break;
            case 'top-left':
                left = x;
                bottom = clientHeight - y + margin;
                this._left = left + 'px';
                this._bottom = bottom + 'px';
                break;
            case 'top-right':
                right = clientWidth - x - width;
                bottom = clientHeight - y + margin;
                this._right = right + 'px';
                this._bottom = bottom + 'px';
                break;
            case 'bottom':
                break;
            case 'bottom-left':
                top = y + height + margin;
                left = x;
                this._top = top + 'px';
                this._left = left + 'px';
                break;
            case 'bottom-right':
                top = y + height + margin;
                right = clientWidth - x - width;
                this._top = top + 'px';
                this._right = right + 'px';
                break;
            case 'left':
                break;
            case 'left-top':
                left = x + width + margin;
                top = y;
                this._left = left + 'px';
                this._top = top + 'px';
                break;
            case 'left-bottom':
                left = x + width + margin;
                bottom = clientHeight - y - height;
                this._left = left + 'px';
                this._bottom = bottom + 'px';
                break;
            case 'right':
                break;
            case 'right-top':
                right = clientWidth - x + margin;
                top = y;
                this._right = right + 'px';
                this._top = top + 'px';
                break;
            case 'right-bottom':
                right = clientWidth - x + margin;
                bottom = clientHeight - y - height;
                this._right = right + 'px';
                this._bottom = bottom + 'px';
                break;
        }
    }

    private _getOffset(el: any) {
        return {
            x: el.offsetLeft,
            y: el.offsetTop,
            width: el.offsetWidth,
            height: el.offsetHeight,
        };
    }
}

