var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { BasePopover } from "../utils/popover.class";
var GWPopoverConfirmComponent = (function (_super) {
    __extends(GWPopoverConfirmComponent, _super);
    function GWPopoverConfirmComponent(el) {
        var _this = _super.call(this) || this;
        _this.el = el;
        _this.onConfirm = new EventEmitter();
        _this.onCancel = new EventEmitter();
        return _this;
    }
    GWPopoverConfirmComponent.prototype.doConfirm = function () {
        this.onConfirm.emit();
        this.hide();
    };
    GWPopoverConfirmComponent.prototype.doCancel = function () {
        this.onCancel.emit();
        this.hide();
    };
    return GWPopoverConfirmComponent;
}(BasePopover));
export { GWPopoverConfirmComponent };
GWPopoverConfirmComponent.decorators = [
    { type: Component, args: [{
                selector: 'gw-popover-confirm',
                styles: [".title, .footer { font-size: 12px; padding: 10px; min-width: 150px; } .footer { text-align: right; } hr { margin: 0; }"],
                template: "\n        <div [class.hidden]=\"hidden\">\n            <gw-popover-container [styler]=\"styler\">\n                <div class=\"title\">{{title}}</div>\n                <hr>\n                <div class=\"footer\">\n                    <button class=\"btn btn-primary btn-xs\" (click)=\"doConfirm()\">\u786E\u8BA4</button>\n                    <button class=\"btn btn-default btn-xs\" (click)=\"doCancel()\">\u53D6\u6D88</button>\n                </div>\n            </gw-popover-container>\n        </div>\n    "
            },] },
];
GWPopoverConfirmComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
GWPopoverConfirmComponent.propDecorators = {
    'styler': [{ type: Input },],
    'title': [{ type: Input },],
    'onConfirm': [{ type: Output },],
    'onCancel': [{ type: Output },],
};
//# sourceMappingURL=popover-confirm.component.js.map