import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from "@angular/core";
import { GwOverlayDirective } from "../core/overlay.directive";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
export var GW_POPINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return GwPopInputComponent; }),
    multi: true
};
var GwPopInputComponent = (function () {
    function GwPopInputComponent() {
        this.confirmText = '确认';
        this.cancelText = '取消';
        this.placement = 'bottom-left';
        this.onConfirm = new EventEmitter();
        this.onCancel = new EventEmitter();
    }
    GwPopInputComponent.prototype.onConfirmEvent = function (event) {
        this.overlay.hide();
        this.onConfirm.emit(event);
        this._ontouchFun && this._ontouchFun(this._value);
        this._onchangeFun && this._onchangeFun(this._value);
    };
    GwPopInputComponent.prototype.onCancelEvent = function (event) {
        this.overlay.hide();
        this.onCancel.emit(event);
    };
    GwPopInputComponent.prototype.writeValue = function (obj) {
        this._value = obj;
    };
    GwPopInputComponent.prototype.registerOnChange = function (fn) {
        this._onchangeFun = fn;
    };
    GwPopInputComponent.prototype.registerOnTouched = function (fn) {
        this._ontouchFun = fn;
    };
    return GwPopInputComponent;
}());
export { GwPopInputComponent };
GwPopInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'gw-popinput',
                styles: ["div.triangle { /*min-width: 50px;*/ /*min-height: 50px;*/ /*padding: 10px;*/ background: #fff; position: relative; border-radius: 5px; color: #000; border: 1px solid #aaa; } div.triangle-top:before { content: \"\"; position: absolute; top: 100%; left: 50%; margin-left: -7px; width: 0; height: 0; border: 7px solid transparent; border-top-color: #aaa; } div.triangle-top:after { content: \"\"; position: absolute; top: 100%; left: 50%; margin-top: -1px; margin-left: -7px; width: 0; height: 0; border: 7px solid transparent; border-top-color: #fff; } div.triangle-top-right:before { content: \"\"; position: absolute; top: 100%; left: 100%; margin-left: -24px; width: 0; height: 0; border: 7px solid transparent; border-top-color: #aaa; } div.triangle-top-right:after { content: \"\"; position: absolute; top: 100%; left: 100%; margin-top: -1px; margin-left: -24px; width: 0; height: 0; border: 7px solid transparent; border-top-color: #fff; } div.triangle-top-left:before { content: \"\"; position: absolute; top: 100%; left: 10px; width: 0; height: 0; border: 7px solid transparent; border-top-color: #aaa; } div.triangle-top-left:after { content: \"\"; position: absolute; top: 100%; left: 10px; width: 0; height: 0; margin-top: -1px; border: 7px solid transparent; border-top-color: #fff; } div.triangle-right:before { content: \"\"; position: absolute; top: 50%; left: 100%; width: 0; height: 0; margin-top: -7px; border: 7px solid transparent; border-left-color: #aaa; } div.triangle-right:after { content: \"\"; position: absolute; top: 50%; left: 100%; width: 0; height: 0; margin-top: -7px; margin-left: -1px; border: 7px solid transparent; border-left-color: #fff; } div.triangle-right-top:before { content: \"\"; position: absolute; top: 10px; left: 100%; width: 0; height: 0; border: 7px solid transparent; border-left-color: #aaa; } div.triangle-right-top:after { content: \"\"; position: absolute; top: 10px; left: 100%; width: 0; height: 0; margin-left: -1px; border: 7px solid transparent; border-left-color: #fff; } div.triangle-right-bottom:before { content: \"\"; position: absolute; top: 100%; left: 100%; width: 0; height: 0; margin-top: -24px; border: 7px solid transparent; border-left-color: #aaa; } div.triangle-right-bottom:after { content: \"\"; position: absolute; top: 100%; left: 100%; width: 0; height: 0; margin-left: -1px; margin-top: -24px; border: 7px solid transparent; border-left-color: #fff; } div.triangle-bottom:before { content: \"\"; position: absolute; top: 0; left: 50%; width: 0px; height: 0px; margin-left: -7px; margin-top: -14px; border: 7px solid transparent; border-bottom-color: #aaa; } div.triangle-bottom:after { content: \"\"; position: absolute; top: 0; left: 50%; width: 0px; height: 0px; margin-left: -7px; margin-top: -13px; border: 7px solid transparent; border-bottom-color: #fff; } div.triangle-bottom-left:before { content: \"\"; position: absolute; top: 0; left: 10px; width: 0px; height: 0px; margin-top: -14px; border: 7px solid transparent; border-bottom-color: #aaa; } div.triangle-bottom-left:after { content: \"\"; position: absolute; top: 0; left: 10px; width: 0px; height: 0px; margin-top: -13px; border: 7px solid transparent; border-bottom-color: #fff; } div.triangle-bottom-right:before { content: \"\"; position: absolute; top: 0; left: 100%; width: 0; height: 0; margin-left: -24px; margin-top: -14px; border: 7px solid transparent; border-bottom-color: #aaa; } div.triangle-bottom-right:after { content: \"\"; position: absolute; top: 0; left: 100%; width: 0; height: 0; margin-left: -24px; margin-top: -13px; border: 7px solid transparent; border-bottom-color: #fff; } div.triangle-left:before { content: \"\"; position: absolute; top: 50%; left: 0; width: 0; height: 0; margin-top: -7px; margin-left: -14px; border: 7px solid transparent; border-right-color: #aaa; } div.triangle-left:after { content: \"\"; position: absolute; top: 50%; left: 0; width: 0; height: 0; margin-top: -7px; margin-left: -13px; border: 7px solid transparent; border-right-color: #fff; } div.triangle-left-top:before { content: \"\"; position: absolute; top: 10px; left: 0; width: 0; height: 0; margin-left: -14px; border: 7px solid transparent; border-right-color: #aaa; } div.triangle-left-top:after { content: \"\"; position: absolute; top: 10px; left: 0; width: 0; height: 0; margin-left: -13px; border: 7px solid transparent; border-right-color: #fff; } div.triangle-left-bottom:before { content: \"\"; position: absolute; top: 100%; left: 0; width: 0; height: 0; margin-left: -14px; margin-top: -24px; border: 7px solid transparent; border-right-color: #ccc; } div.triangle-left-bottom:after { content: \"\"; position: absolute; top: 100%; left: 0; width: 0; height: 0; margin-left: -13px; margin-top: -24px; border: 7px solid transparent; border-right-color: #fff; }",
"/** * 全局css */ .hidden { display: none !important; } /** * overlay css */ .gw-overlay { position: absolute; z-index: 10; } /** * popconfirm css */ .gw-popconfirm { font-size: 12px; border-radius: 4px; min-width: 150px; box-shadow: 0 1px 6px rgba(0, 0, 0, .2); } .gw-popconfirm .gw-popconfirm-title { padding: 6px; border-bottom: 1px solid #aaa; } .gw-popconfirm .gw-popconfirm-footer { padding: 6px; text-align: right; } /** * popinput css */ .gw-popinput { font-size: 12px; border-radius: 4px; min-width: 150px; box-shadow: 0 1px 6px rgba(0, 0, 0, .2); } .gw-popinput .gw-popinput-title, .gw-popinput .gw-popinput-body { padding: 6px; border-bottom: 1px solid #aaa; } .gw-popinput .gw-popinput-body input { width: 100%; } .gw-popinput .gw-popinput-footer { padding: 6px; text-align: right; } /** * confirm css */ .gw-confirm-mask { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #aaaaaa; opacity: 0.3; z-index: 10000; } .gw-confirm { position: fixed; top: 50%; left: 50%; opacity: 1; transform: translate(-50%, -50%); z-index: 10001; background-color: #ffffff; border-radius: 4px; min-width: 200px; padding: 6px; } .gw-confirm .gw-confirm-title { font-weight: bold; } .gw-confirm .gw-confirm-footer { text-align: right; }"],
                template: "\n        <div gw-overlay\n             [source]=\"source\"\n             [placement]=\"placement\"\n             [zIndex]=\"zIndex\">\n            <div class=\"triangle triangle-{{placement}}\">\n                <div class=\"gw-popinput\">\n                    <div class=\"gw-popinput-title\" *ngIf=\"title\">\n                        {{title}}\n                    </div>\n                    <div class=\"gw-popinput-body\">\n                        <input type=\"text\" [(ngModel)]=\"_value\"/>\n                    </div>\n                    <div class=\"gw-popinput-footer\">\n                        <button class=\"btn btn-xs btn-primary\" (click)=\"onConfirmEvent($event)\">{{confirmText}}</button>\n                        <button class=\"btn btn-xs btn-default\" (click)=\"onCancelEvent($event)\">{{cancelText}}</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                providers: [GW_POPINPUT_VALUE_ACCESSOR]
            },] },
];
GwPopInputComponent.ctorParameters = function () { return []; };
GwPopInputComponent.propDecorators = {
    'title': [{ type: Input },],
    'confirmText': [{ type: Input },],
    'cancelText': [{ type: Input },],
    'placement': [{ type: Input },],
    'zIndex': [{ type: Input },],
    'source': [{ type: Input },],
    'onConfirm': [{ type: Output },],
    'onCancel': [{ type: Output },],
    'overlay': [{ type: ViewChild, args: [GwOverlayDirective,] },],
};
//# sourceMappingURL=popinput.component.js.map