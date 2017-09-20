import {
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2
} from "@angular/core";
import {WindowResizeService} from "./window-resize.service";
import {Subscription} from "rxjs/Subscription";
import {Placement} from "./placement";

@Directive({
    selector: '[gw-overlay]'
})
export class GwOverlayDirective implements OnInit, OnDestroy {

    @Input() source: ElementRef;
    @Input() placement: Placement;
    @Output() onHide: EventEmitter<void> = new EventEmitter<void>();

    private _clickHandler: Function;
    private _resizeSubscription: Subscription;
    @HostBinding('class.hidden') private _isHidden: boolean = true;
    @HostBinding('class.gw-overlay') private _overlay = true;
    @HostBinding('style.top') private _top: any;
    @HostBinding('style.bottom') private _bottom: any;
    @HostBinding('style.left') private _left: any;
    @HostBinding('style.right') private _right: any;
    @HostBinding('style.transform') private _transform: any;
    @HostBinding('style.margin') private _margin: any;
    @HostBinding('style.zIndex') @Input() public zIndex: number;

    constructor(private el: ElementRef,
                private renderer: Renderer2,
                private ngZone: NgZone,
                private resizeService: WindowResizeService) {
    }

    ngOnInit() {
        this._registerClickEvent();
        this._registerResizeEvent();
    }

    show() {
        this._isHidden = false;
        this._calculatePosition();
    }

    hide() {
        this._isHidden = true;
        this._unregisterResizeEvent();
    }

    ngOnDestroy() {
        this._unregisterClickEvent();
        this._unregisterResizeEvent();
    }

    private _registerResizeEvent() {
        this._resizeSubscription = this.resizeService.onResize$.subscribe(() => {
            if (!this._isHidden) { //如果组件显示的时候
                this.ngZone.run(() => {
                    this._calculatePosition();
                });
            }
        });
    }

    private _unregisterResizeEvent() {
        this._resizeSubscription && this._resizeSubscription.unsubscribe();
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
                left = x;
                bottom = clientHeight - y + margin;
                this._left = left + 'px';
                this._bottom = bottom + 'px';
                this._transform = 'translateX(-50%)';
                this._margin = `0 0 0 ${width / 2}px`;
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
                top = y + height + margin;
                left = x;
                this._top = top + 'px';
                this._left = left + 'px';
                this._transform = 'translateX(-50%)';
                this._margin = `0 0 0 ${width / 2}px`;
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
                left = x + width + margin;
                top = y;
                this._left = left + 'px';
                this._top = top + 'px';
                this._transform = 'translateY(-50%)';
                this._margin = `${height / 2}px 0 0 0`;
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
                right = clientWidth - x + margin;
                top = y;
                this._right = right + 'px';
                this._top = top + 'px';
                this._transform = 'translateY(-50%)';
                this._margin = `${height / 2}px 0 0 0`;
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
        let width = el.offsetWidth;
        let height = el.offsetHeight;
        let _x = 0;
        let _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return {
            x: _x,
            y: _y,
            width: width,
            height: height,
        };
    }

    private _registerClickEvent() {
        if (!this._clickHandler) {
            this.ngZone.runOutsideAngular(() => {
                this._clickHandler = this.renderer.listen(document, 'click', (event) => {
                    if (this.source.nativeElement.contains(event.target)) { //点击触发的toggle按钮
                        this.ngZone.run(() => {
                            if (this._isHidden) {
                                this.show();
                            } else {
                                this.hide();
                                this.onHide.emit();
                            }
                        });
                    } else if (this.el.nativeElement.contains(event.target)) {
                        //点击的是弹出的面板本身不处理
                    } else if (!this._isHidden) {
                        //点击的即不是触发的toggle按钮也不是面板本身
                        this.ngZone.run(() => {
                            this.hide();
                            this.onHide.emit();
                        });
                    }
                });
            });
        }
    }

    private _unregisterClickEvent() {
        if (this._clickHandler) {
            this._clickHandler();
            this._clickHandler = null;
        }
    }
}

