var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Injectable } from "@angular/core";
var PopoverConfig = (function () {
    function PopoverConfig() {
        this._config = {
            placement: 'bottom-right'
        };
    }
    Object.defineProperty(PopoverConfig.prototype, "config", {
        get: function () {
            return __assign({}, this._config);
        },
        set: function (config) {
            this._config = __assign({}, this._config, config);
        },
        enumerable: true,
        configurable: true
    });
    return PopoverConfig;
}());
export { PopoverConfig };
PopoverConfig.decorators = [
    { type: Injectable },
];
PopoverConfig.ctorParameters = function () { return []; };
//# sourceMappingURL=popover.config.js.map