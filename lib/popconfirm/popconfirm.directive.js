import { Directive, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { GwPopConfirmComponent } from "./popconfirm.component";
import { ComponentLoaderService } from "../core/component-loader.service";
var GwPopConfirmDirective = (function () {
    function GwPopConfirmDirective(componentLoader, el) {
        this.componentLoader = componentLoader;
        this.el = el;
        this.confirmText = '确认';
        this.cancelText = '取消';
        this.placement = 'bottom-left';
        this.zIndex = 100;
        this.onConfirm = new EventEmitter();
        this.onCancel = new EventEmitter();
    }
    GwPopConfirmDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.componentRef = _this.componentLoader.appendComponentToBody(GwPopConfirmComponent);
            var confirm = _this.componentRef.instance;
            confirm.source = _this.el;
            confirm.title = _this.title;
            confirm.confirmText = _this.confirmText;
            confirm.cancelText = _this.cancelText;
            confirm.placement = _this.placement;
            confirm.zIndex = _this.zIndex;
            confirm.onConfirm = _this.onConfirm;
            confirm.onCancel = _this.onCancel;
        });
    };
    GwPopConfirmDirective.prototype.ngOnDestroy = function () {
        this.componentLoader.removeComponentFormBody(this.componentRef);
    };
    return GwPopConfirmDirective;
}());
export { GwPopConfirmDirective };
GwPopConfirmDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gw-popconfirm]'
            },] },
];
GwPopConfirmDirective.ctorParameters = function () { return [
    { type: ComponentLoaderService, },
    { type: ElementRef, },
]; };
GwPopConfirmDirective.propDecorators = {
    'title': [{ type: Input },],
    'confirmText': [{ type: Input },],
    'cancelText': [{ type: Input },],
    'placement': [{ type: Input },],
    'zIndex': [{ type: Input },],
    'onConfirm': [{ type: Output },],
    'onCancel': [{ type: Output },],
};
//# sourceMappingURL=popconfirm.directive.js.map