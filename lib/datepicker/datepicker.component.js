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
import { Component, ElementRef, Input, forwardRef } from '@angular/core';
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
    GWDatepickerComponent.prototype.remove = function () {
        this._value = null;
        this.enabled = false;
        this.onRemove();
    };
    GWDatepickerComponent.prototype.ngOnInit = function () {
        this.datepickerPreInit();
    };
    GWDatepickerComponent.prototype.datepickerPreInit = function () {
        var _this = this;
        if (typeof moment === 'undefined' || typeof $ === 'undefined' || typeof daterangepicker === 'undefined') {
            var _a = this.config, jqueryPath = _a.jqueryPath, momentPath = _a.momentPath, datepickerPath = _a.datepickerPath;
            if (jqueryPath || momentPath || datepickerPath) {
                if (typeof $ !== 'undefined') {
                    this.loader.scripts.push({ src: jqueryPath, loaded: true });
                }
                if (typeof moment !== 'undefined') {
                    this.loader.scripts.push({ src: momentPath, loaded: true });
                }
                if (typeof daterangepicker !== 'undefined') {
                    this.loader.scripts.push({ src: datepickerPath, loaded: true });
                }
                var jq$ = this.loader.load({
                    src: jqueryPath
                });
                var moment$_1 = this.loader.load({
                    src: momentPath
                });
                var daterangepicker$_1 = this.loader.load({
                    src: datepickerPath
                });
                jq$.subscribe(function (res1) {
                    moment$_1.subscribe(function (res2) {
                        daterangepicker$_1.subscribe(function (res3) {
                            _this.datepickerInit();
                        });
                    });
                });
            }
            else {
                console.warn('datepicker 4.x is missing (moment||jquery||daterangepicker)');
            }
        }
        else {
            this.datepickerInit();
        }
    };
    GWDatepickerComponent.prototype.datepickerInit = function () {
        var _this = this;
        var options = $.extend(true, {}, this.config, (typeof this.options === 'string' ? eval('(' + this.options + ')') : this.options));
        options.singleDatePicker && (options.ranges = undefined);
        this.config = options;
        var ele = $(this.input.nativeElement).find('#dateHost');
        ele.daterangepicker(options);
        ele.on('cancel.daterangepicker', function (ev, picker) {
            _this.value = null;
        });
        ele.on('apply.daterangepicker', function (ev, picker) {
            _this.value = {
                start: picker.startDate.format(_this.config.locale.format),
                end: picker.endDate.format(_this.config.locale.format),
                range: picker.chosenLabel
            };
        });
    };
    Object.defineProperty(GWDatepickerComponent.prototype, "value", {
        set: function (value) {
            if (value && !!value.range && this.config.ranges[value.range]) {
                this._value = value.range;
                _a = this.config.ranges[value.range], value.start = _a[0], value.end = _a[1];
            }
            else if (value && this.config.singleDatePicker) {
                this._value = value.start;
            }
            else if (value && value.start && value.end) {
                this._value = value.start + ' - ' + value.end;
            }
            else {
                this._value = null;
            }
            this.onTouched && this.onTouched();
            this.onChange && this.onChange(value);
            var ele = $(this.input.nativeElement).find('#dateHost');
            if (ele.data('daterangepicker') && value) {
                var _b = value.start, start = _b === void 0 ? '' : _b, _c = value.end, end = _c === void 0 ? '' : _c;
                if (ele.data('daterangepicker') && start) {
                    ele.data('daterangepicker').setStartDate(start);
                    !end && (end = start);
                }
                if (ele.data('daterangepicker') && end) {
                    ele.data('daterangepicker').setEndDate(end);
                }
            }
            var _a;
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
                template: "\n    <button type=\"button\" class=\"btn btn-default {{btnSize}}\" [hidden]=\"!enabled\">\n      <span id=\"dateHost\">\n        <span class=\"author\">{{label}}</span>\n        <span style=\"color:#797979\">{{_value}}</span>\n        <span class=\"arrow\"><span class=\"caret\"></span></span>\n      </span>\n      <ng-container *ngIf=\"closeable\">\n        <span class=\"glyphicon glyphicon-remove\" (click)=\"remove();\"></span>\n      </ng-container>\n    </button>\n  ",
                styles: ["button .author { padding-right: 5px; } button .value { color: #797979; } button .arrow { padding: 0px 2px; } [hidden] { display: none !important;} "],
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
    'label': [{ type: Input },],
};
//# sourceMappingURL=datepicker.component.js.map