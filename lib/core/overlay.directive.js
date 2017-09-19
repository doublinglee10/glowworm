import { Directive, ElementRef, HostBinding, Input, NgZone, Renderer2 } from "@angular/core";
import { WindowResizeService } from "./window-resize.service";
var GwOverlayDirective = (function () {
    function GwOverlayDirective(el, renderer, ngZone, resizeService) {
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.resizeService = resizeService;
        this._isHidden = true;
        this._overlay = true;
    }
    GwOverlayDirective.prototype.ngOnInit = function () {
        this._registerClickEvent();
        this._registerResizeEvent();
    };
    GwOverlayDirective.prototype.show = function () {
        this._isHidden = false;
        this._calculatePosition();
    };
    GwOverlayDirective.prototype.hide = function () {
        this._isHidden = true;
        this._unregisterResizeEvent();
    };
    GwOverlayDirective.prototype.ngOnDestroy = function () {
        this._unregisterClickEvent();
        this._unregisterResizeEvent();
    };
    GwOverlayDirective.prototype._registerResizeEvent = function () {
        var _this = this;
        this._resizeSubscription = this.resizeService.onResize$.subscribe(function () {
            if (!_this._isHidden) {
                _this.ngZone.run(function () {
                    _this._calculatePosition();
                });
            }
        });
    };
    GwOverlayDirective.prototype._unregisterResizeEvent = function () {
        this._resizeSubscription && this._resizeSubscription.unsubscribe();
    };
    GwOverlayDirective.prototype._calculatePosition = function () {
        if (!this.placement)
            return;
        var clientWidth = document.documentElement.clientWidth;
        var clientHeight = document.documentElement.clientHeight;
        var _a = this._getOffset(this.source.nativeElement), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        var margin = 8;
        var top, bottom, left, right;
        switch (this.placement) {
            case 'top':
                left = x;
                bottom = clientHeight - y + margin;
                this._left = left + 'px';
                this._bottom = bottom + 'px';
                this._transform = 'translateX(-50%)';
                this._margin = "0 0 0 " + width / 2 + "px";
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
                this._margin = "0 0 0 " + width / 2 + "px";
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
                this._margin = height / 2 + "px 0 0 0";
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
                this._margin = height / 2 + "px 0 0 0";
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
    };
    GwOverlayDirective.prototype._getOffset = function (el) {
        var width = el.offsetWidth;
        var height = el.offsetHeight;
        var _x = 0;
        var _y = 0;
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
    };
    GwOverlayDirective.prototype._registerClickEvent = function () {
        var _this = this;
        if (!this._clickHandler) {
            this.ngZone.runOutsideAngular(function () {
                _this._clickHandler = _this.renderer.listen(document, 'click', function (event) {
                    if (_this.source.nativeElement.contains(event.target)) {
                        _this.ngZone.run(function () {
                            if (_this._isHidden) {
                                _this.show();
                            }
                            else {
                                _this.hide();
                            }
                        });
                    }
                    else if (_this.el.nativeElement.contains(event.target)) {
                    }
                    else if (!_this._isHidden) {
                        _this.ngZone.run(function () {
                            _this.hide();
                        });
                    }
                });
            });
        }
    };
    GwOverlayDirective.prototype._unregisterClickEvent = function () {
        if (this._clickHandler) {
            this._clickHandler();
            this._clickHandler = null;
        }
    };
    return GwOverlayDirective;
}());
export { GwOverlayDirective };
GwOverlayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gw-overlay]'
            },] },
];
GwOverlayDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: NgZone, },
    { type: WindowResizeService, },
]; };
GwOverlayDirective.propDecorators = {
    'source': [{ type: Input },],
    'placement': [{ type: Input },],
    '_isHidden': [{ type: HostBinding, args: ['class.hidden',] },],
    '_overlay': [{ type: HostBinding, args: ['class.gw-overlay',] },],
    '_top': [{ type: HostBinding, args: ['style.top',] },],
    '_bottom': [{ type: HostBinding, args: ['style.bottom',] },],
    '_left': [{ type: HostBinding, args: ['style.left',] },],
    '_right': [{ type: HostBinding, args: ['style.right',] },],
    '_transform': [{ type: HostBinding, args: ['style.transform',] },],
    '_margin': [{ type: HostBinding, args: ['style.margin',] },],
};
//# sourceMappingURL=overlay.directive.js.map