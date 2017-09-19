import { Directive, ElementRef, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ComponentLoaderService } from "../core/component-loader.service";
import { GwPopInputComponent } from "./popinput.component";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
export var GW_POPINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return GwPopinputDirective; }),
    multi: true
};
var GwPopinputDirective = (function () {
    function GwPopinputDirective(componentLoader, el) {
        this.componentLoader = componentLoader;
        this.el = el;
        this.confirmText = '确认';
        this.cancelText = '取消';
        this.zIndex = 100;
        this.placement = 'bottom-left';
        this.onConfirm = new EventEmitter();
        this.onCancel = new EventEmitter();
    }
    GwPopinputDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.componentRef = _this.componentLoader.appendComponentToBody(GwPopInputComponent);
            var input = _this.componentRef.instance;
            input.source = _this.el;
            input.title = _this.title;
            input.confirmText = _this.confirmText;
            input.cancelText = _this.cancelText;
            input.placement = _this.placement;
            input.zIndex = _this.zIndex;
            input.onConfirm = _this.onConfirm;
            input.onCancel = _this.onCancel;
            input.writeValue(_this._value);
            input.registerOnTouched(_this._ontouchFun);
            input.registerOnChange(_this._onchangeFun);
        });
    };
    GwPopinputDirective.prototype.writeValue = function (obj) {
        if (this.componentRef) {
            var input = this.componentRef.instance;
            input.writeValue(obj);
        }
        else {
            this._value = obj;
        }
    };
    GwPopinputDirective.prototype.registerOnChange = function (fn) {
        if (this.componentRef) {
            var input = this.componentRef.instance;
            input.registerOnChange(fn);
        }
        else {
            this._onchangeFun = fn;
        }
    };
    GwPopinputDirective.prototype.registerOnTouched = function (fn) {
        if (this.componentRef) {
            var input = this.componentRef.instance;
            input.registerOnTouched(fn);
        }
        else {
            this._ontouchFun = fn;
        }
    };
    GwPopinputDirective.prototype.ngOnDestroy = function () {
        this.componentLoader.removeComponentFormBody(this.componentRef);
    };
    return GwPopinputDirective;
}());
export { GwPopinputDirective };
GwPopinputDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gw-popinput]',
                providers: [GW_POPINPUT_VALUE_ACCESSOR]
            },] },
];
GwPopinputDirective.ctorParameters = function () { return [
    { type: ComponentLoaderService, },
    { type: ElementRef, },
]; };
GwPopinputDirective.propDecorators = {
    'title': [{ type: Input },],
    'confirmText': [{ type: Input },],
    'cancelText': [{ type: Input },],
    'zIndex': [{ type: Input },],
    'placement': [{ type: Input },],
    'onConfirm': [{ type: Output },],
    'onCancel': [{ type: Output },],
};
//# sourceMappingURL=popinput.directive.js.map