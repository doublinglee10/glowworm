import { Input } from "@angular/core";
var GWControl = (function () {
    function GWControl() {
        this.btnSize = 'btn-xs';
        this.closeable = true;
        this.enabled = true;
        this.showSelect = false;
        this.selectData = [];
        this.linkAge = false;
        this.onRemove = Function.prototype;
    }
    Object.defineProperty(GWControl.prototype, "toolbar", {
        set: function (toolbar) {
            toolbar && toolbar.addFieldComponent(this);
        },
        enumerable: true,
        configurable: true
    });
    return GWControl;
}());
export { GWControl };
GWControl.propDecorators = {
    'btnSize': [{ type: Input },],
    'closeable': [{ type: Input },],
    'enabled': [{ type: Input },],
    'label': [{ type: Input },],
    'showSelect': [{ type: Input },],
    'selectData': [{ type: Input },],
    'linkAge': [{ type: Input },],
    'toolbar': [{ type: Input },],
};
//# sourceMappingURL=gw-control.js.map