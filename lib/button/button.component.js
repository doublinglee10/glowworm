import { Component, EventEmitter, Input, Output } from "@angular/core";
var GWButtonComponent = (function () {
    function GWButtonComponent() {
        this.values = [];
        this.onClick = new EventEmitter();
        this.onClear = new EventEmitter();
    }
    GWButtonComponent.prototype.clear = function () {
        this.values.splice(0, this.values.length);
        this.onClear.emit();
    };
    GWButtonComponent.prototype.click = function () {
        this.onClick.emit();
    };
    return GWButtonComponent;
}());
export { GWButtonComponent };
GWButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'gw-button',
                styles: ["button .author { padding-right: 5px; } button .value { color: #666; } button .arrow { padding: 0px 2px; }"],
                template: "<button type=\"button\" class=\"btn btn-default btn-xs\" (click)=\"click()\"> <span class=\"author\">{{label}}</span> <span class=\"value\">{{values.join(', ')}}</span> <span class=\"arrow\"><span class=\"caret\"></span></span> <span class=\"glyphicon glyphicon-remove\" (click)=\"clear();\"></span> </button>"
            },] },
];
GWButtonComponent.ctorParameters = function () { return []; };
GWButtonComponent.propDecorators = {
    'values': [{ type: Input },],
    'label': [{ type: Input },],
    'onClick': [{ type: Output },],
    'onClear': [{ type: Output },],
};
//# sourceMappingURL=button.component.js.map