var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component, ElementRef } from "@angular/core";
var GWPopoverComponent = (function () {
    function GWPopoverComponent(el) {
        this.el = el;
        this.hidden = true;
        this.style = {};
    }
    GWPopoverComponent.prototype.setStyle = function (style) {
        this.style = __assign({}, this.style, style);
    };
    GWPopoverComponent.prototype.hide = function () {
        this.hidden = true;
    };
    GWPopoverComponent.prototype.show = function () {
        this.hidden = false;
    };
    GWPopoverComponent.prototype.toggle = function () {
        this.hidden = !this.hidden;
    };
    return GWPopoverComponent;
}());
export { GWPopoverComponent };
GWPopoverComponent.decorators = [
    { type: Component, args: [{
                selector: 'md-popover-container',
                styles: [".modal_window { position: absolute; display: block; z-index: 100; min-width: 100px; min-height: 50px; overflow: visible; margin: 0; border: 1px solid rgba(0, 0, 0, .2); border-radius: 6px; background: #fff; background-clip: padding-box; box-shadow: 0 5px 10px rgba(0, 0, 0, .2); } .modal_window > :last-child { margin-bottom: 0; } .mw-right:before { position: absolute; top: 8px; right: auto; left: -7px; display: inline-block; border-top: 7px solid transparent; border-right: 7px solid #CCC; border-bottom: 7px solid transparent; content: ''; border-right-color: rgba(0, 0, 0, .2); } .mw-right:after { position: absolute; top: 9px; right: auto; left: -6px; display: inline-block; border-top: 6px solid transparent; border-right: 6px solid #FFF; border-bottom: 6px solid transparent; content: ''; } .mw-left:before { position: absolute; top: 8px; right: -7px; left: auto; display: inline-block; border-top: 7px solid transparent; border-bottom: 7px solid transparent; border-left: 7px solid #CCC; content: ''; border-left-color: rgba(0, 0, 0, .2); } .mw-left:after { position: absolute; top: 9px; right: -6px; left: auto; display: inline-block; border-top: 6px solid transparent; border-bottom: 6px solid transparent; border-left: 6px solid #FFF; content: ''; } .mw-top:before { top: auto; bottom: 8px; } .mw-top:after { top: auto; bottom: 9px; } .mw-block:before { border-top: 7px solid transparent; border-right: 7px solid transparent; border-bottom: 7px solid #CCC; border-left: 7px solid transparent; } .mw-block:after { border-top: 7px solid transparent; border-right: 7px solid transparent; border-bottom: 7px solid #FFF; border-left: 7px solid transparent; } .mw-right.mw-block:before { top: -14px; left: 8px; } .mw-right.mw-block:after { top: -13px; left: 8px; } .mw-left.mw-block:before { top: -14px; right: 8px; } .mw-left.mw-block:after { top: -13px; right: 8px; } .modal_window.mw-block { margin-top: 8px; }"],
                template: "\n        <div [class.hidden]=\"hidden\" [ngStyle]=\"style\" class=\"modal_window mw-right mw-bottom mw-block\">\n            <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n        </div>\n    "
            },] },
];
GWPopoverComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
//# sourceMappingURL=popover.component.js.map