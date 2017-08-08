import { Input } from "@angular/core";
var GWControl = (function () {
    function GWControl() {
        this.btnSize = 'btn-xs';
        this.closeable = true;
        this.enabled = true;
        this.showSelect = false;
        this.selectData = [];
        this.onRemove = Function.prototype;
    }
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
    'selectValue': [{ type: Input },],
};
//# sourceMappingURL=gw-control.js.map