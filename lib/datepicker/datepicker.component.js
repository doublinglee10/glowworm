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
import { Component, ElementRef, forwardRef, Input } from "@angular/core";
import { DatepickerConfig } from "./config.server";
import { ScriptLoaderService } from "../utils/script-loader.service";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GWControl } from "../utils/gw-control";
export var GW_DATE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return GWDatepickerComponent; }),
    multi: true
};
var GWDatepickerComponent = (function (_super) {
    __extends(GWDatepickerComponent, _super);
    function GWDatepickerComponent(config, input, loader) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.input = input;
        _this.loader = loader;
        return _this;
    }
    GWDatepickerComponent.prototype.ngOnInit = function () {
        this.datepickerPreInit(this.config);
    };
    GWDatepickerComponent.prototype.datepickerInit = function (config) {
        var options = $.extend(true, {}, config, (typeof this.options === 'string' ? eval('(' + this.options + ')') : this.options));
        options.singleDatePicker && (options.ranges = undefined);
        this.config = options;
        $(this.input.nativeElement).find('#dateHost').daterangepicker(options, this.callback.bind(this));
    };
    GWDatepickerComponent.prototype.callback = function (start, end) {
        start = start.format(this.config.locale.format);
        if (!this.config.singleDatePicker) {
            end = end.format(this.config.locale.format);
            this.value = start + " - " + end;
        }
        else {
            this.value = start;
        }
    };
    GWDatepickerComponent.prototype.datepickerPreInit = function (config) {
        var _this = this;
        if (typeof moment === 'undefined' || typeof $ === 'undefined' || typeof daterangepicker === 'undefined') {
            if (this.JsPath && this.JsPath.split(',').length >= 2) {
                var _path = this.JsPath.split(',');
                var jq$ = this.loader.load({
                    src: _path[0]
                });
                var moment$_1 = this.loader.load({
                    src: _path[1]
                });
                var daterangepicker$_1 = this.loader.load({
                    src: _path[2]
                });
                jq$.subscribe(function (res1) {
                    moment$_1.subscribe(function (res2) {
                        daterangepicker$_1.subscribe(function (res3) {
                            _this.datepickerInit(config);
                        });
                    });
                });
            }
            else {
                console.warn('datepicker 4.x is missing (moment,jquery)');
            }
        }
        else {
            this.datepickerInit(config);
        }
    };
    GWDatepickerComponent.prototype.remove = function () {
        this._value = null;
        this.enabled = false;
        this.selectValue = null;
        this.onRemove();
    };
    Object.defineProperty(GWDatepickerComponent.prototype, "value", {
        set: function (value) {
            this._value = value;
            this.onTouched && this.onTouched();
            this.onChange && this.onChange(this._value);
        },
        enumerable: true,
        configurable: true
    });
    GWDatepickerComponent.prototype.writeValue = function (obj) {
        this.value = obj;
    };
    GWDatepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    GWDatepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return GWDatepickerComponent;
}(GWControl));
export { GWDatepickerComponent };
GWDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'gw-datepicker',
                template: "\n      <button type=\"button\" class=\"btn btn-default btn-xs\" [hidden]=\"!enabled\">\n            <span id=\"dateHost\">\n                <span class=\"author\">{{label}}</span>\n                <span class=\"value\">{{_value}}</span>\n                <span class=\"arrow\"><span class=\"caret\"></span></span>\n            </span>\n          <ng-container *ngIf=\"closeable\">\n              <span class=\"glyphicon glyphicon-remove\" (click)=\"remove();\"></span>\n          </ng-container>\n      </button>\n  ",
                styles: ['[hidden] { display: none !important;}'],
                providers: [GW_DATE_VALUE_ACCESSOR]
            },] },
];
GWDatepickerComponent.ctorParameters = function () { return [
    { type: DatepickerConfig, },
    { type: ElementRef, },
    { type: ScriptLoaderService, },
]; };
GWDatepickerComponent.propDecorators = {
    'options': [{ type: Input },],
    'JsPath': [{ type: Input },],
    'label': [{ type: Input },],
};
//# sourceMappingURL=datepicker.component.js.map