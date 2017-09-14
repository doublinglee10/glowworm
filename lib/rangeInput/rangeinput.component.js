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
import { Component, forwardRef, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GWControl } from "../utils/gw-control";
import { GWPopoverDirective } from "../popover/popover.directive";
export var GW_RANGEINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return GWRangeInputComponent; }),
    multi: true
};
var GWRangeInputComponent = (function (_super) {
    __extends(GWRangeInputComponent, _super);
    function GWRangeInputComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GWRangeInputComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            var _this = this;
            this._value = value;
            this.onTouched && this.onTouched();
            this.onChange && this.onChange(this._value);
            if (this.showSelect) {
                var data = this.selectData.filter(function (item) { return item.id == _this._select_val; });
                if (data.length > 0) {
                    this.selectLabel = data[0].text;
                }
                this.valueLabel = value ? (value.start + ' - ' + value.end) : '';
            }
            else {
                this.selectLabel = '';
                this.valueLabel = value ? (value.start + ' - ' + value.end) : '';
            }
        },
        enumerable: true,
        configurable: true
    });
    GWRangeInputComponent.prototype.ngOnInit = function () {
    };
    GWRangeInputComponent.prototype.clear = function () {
        this._input_val_s = '';
        this._input_val_e = '';
    };
    GWRangeInputComponent.prototype.save = function () {
        if (this.showSelect) {
            this.value = {
                start: this._input_val_s,
                end: this._input_val_e,
                selectValue: this._select_val
            };
        }
        else {
            this.value = {
                start: this._input_val_s,
                end: this._input_val_e
            };
        }
    };
    GWRangeInputComponent.prototype.cancel = function () {
        if (this.value) {
            if (this.showSelect) {
                this._input_val_s = this.value.start;
                this._input_val_e = this.value.end;
                this._select_val = this.value.selectValue;
            }
            else {
                this._input_val_s = this.value.start;
                this._input_val_e = this.value.end;
            }
        }
    };
    GWRangeInputComponent.prototype.remove = function () {
        this.value = null;
        this._input_val_s = this._input_val_e = '';
        this._select_val = '';
        this.enabled = false;
        this.onRemove();
    };
    GWRangeInputComponent.prototype.writeValue = function (val) {
        if (val) {
            if (this.showSelect) {
                this._input_val_s = val.start;
                this._input_val_e = val.end;
                this._select_val = val.selectValue;
            }
            else {
                this._input_val_s = val.start;
                this._input_val_e = val.end;
            }
        }
        else {
            this.selectLabel = '';
            this.valueLabel = '';
            this._input_val_s = '';
            this._input_val_e = '';
            this._select_val = '';
        }
        this.value = val;
    };
    GWRangeInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    GWRangeInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return GWRangeInputComponent;
}(GWControl));
export { GWRangeInputComponent };
GWRangeInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'gw-rangeinput',
                styles: ["button .author { padding-right: 5px; } button .value { color: #797979; } button .arrow { padding: 0px 2px; } button /deep/ .popover-content { padding: 9px 0 !important; } .popover-container { padding-top: 10px; } .popover-container .popover-top, .popover-container .popover-main, .popover-container .popover-footer { font-size: 12px; padding: 0px 10px; } .popover-container .popover-top .top-select { width: 100px; } .popover-container .popover-hr { width: 100%; border-top: 1px solid #aaaaaa; margin: 10px 0px; } .popover-container .popover-main input { border: 1px solid #cccccc; width: 100%; } .popover-container .popover-footer { display: inline-block; width: 100%; } .popover-container .popover-footer .left { float: left; } .popover-container .popover-footer .right { float: right; } /*.btn{ text-align: left!important; }*/ .popover-main input{ width: 47%!important; } .popover-container{ width: 12.2rem; } "],
                template: "<ng-container *ngIf=\"enabled\"> <button type=\"button\" class=\"btn btn-default {{btnSize}}\"> <span gw-popover [template]=\"tpl\"> <span class=\"author\">{{label}}</span> <span class=\"value\">{{selectLabel}} {{valueLabel}}</span> <span class=\"arrow\"><span class=\"caret\"></span></span> </span> <ng-container *ngIf=\"closeable\"> <span class=\"glyphicon glyphicon-remove\" (click)=\"remove();\"></span> </ng-container> </button> </ng-container> <ng-template #tpl> <div class=\"popover-container\"> <ng-container *ngIf=\"showSelect\"> <div class=\"popover-top\"> <span class=\"top-label\">{{label}}</span>: <select class=\"top-select\" [(ngModel)]=\"_select_val\"> <option *ngFor=\"let item of selectData\" [attr.value]=\"item.id\" [attr.selected]=\"_select_val == item.id\">{{item.text}}</option> </select> </div> <div class=\"popover-hr\"></div> </ng-container> <div class=\"popover-main\"> <input type=\"text\" [(ngModel)]=\"_input_val_s\" name=\"value\"> <span>-</span> <input type=\"text\" [(ngModel)]=\"_input_val_e\" name=\"value\"> </div> <div class=\"popover-hr\"></div> <div class=\"popover-footer\"> <div class=\"left\"> <a class=\"btn btn-xs\" (click)=\"clear()\">清除</a> </div> <div class=\"right\"> <button class=\"btn btn-primary btn-xs\" (click)=\"popover.hide();save()\">保存</button> <button class=\"btn btn-default btn-xs\" (click)=\"popover.hide();cancel()\">取消</button> </div> </div> </div> </ng-template> ",
                providers: [GW_RANGEINPUT_VALUE_ACCESSOR]
            },] },
];
GWRangeInputComponent.ctorParameters = function () { return []; };
GWRangeInputComponent.propDecorators = {
    'popover': [{ type: ViewChild, args: [GWPopoverDirective,] },],
};
//# sourceMappingURL=rangeinput.component.js.map