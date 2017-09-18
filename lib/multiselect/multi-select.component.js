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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GWControl } from "../utils/gw-control";
import { GWPopoverDirective } from "../popover/popover.directive";
export var GW_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return GWMultiSelectComponent; }),
    multi: true
};
var GWMultiSelectComponent = (function (_super) {
    __extends(GWMultiSelectComponent, _super);
    function GWMultiSelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSave = new EventEmitter();
        return _this;
    }
    Object.defineProperty(GWMultiSelectComponent.prototype, "labels", {
        get: function () {
            if (this.values) {
                if (this.showSelect) {
                    return this.values.value.map(function (item) { return item.text; }).join(',');
                }
                else {
                    return this.values.map(function (item) { return item.text; }).join(',');
                }
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GWMultiSelectComponent.prototype, "_data", {
        set: function (data) {
            data = data || [];
            var _data = [];
            data.forEach(function (item) {
                _data.push(__assign({}, item));
            });
            this.data = _data;
            this.writeValue(this._val);
        },
        enumerable: true,
        configurable: true
    });
    GWMultiSelectComponent.prototype.clear = function () {
        this.data.forEach(function (item) {
            item.__checked__ = false;
        });
        this._select_modal = '';
    };
    GWMultiSelectComponent.prototype.updateNgModel = function () {
        if (this.showSelect) {
            this.values = {
                value: this._multi_select_value.slice(),
                selectValue: this._select_modal
            };
        }
        else {
            this.values = this._multi_select_value.slice();
        }
        this.onTouched();
        this.onChange(this.values);
    };
    GWMultiSelectComponent.prototype.save = function () {
        var _this = this;
        this._multi_select_value = this.data.filter(function (value) { return value.__checked__; });
        if (this.showSelect) {
            var select_data = this.selectData.filter(function (item) { return item.id == _this._select_modal; });
            this._select_value = select_data.length > 0 ? select_data[0] : {};
        }
        this.updateNgModel();
        this.onSave.emit(this.values);
    };
    GWMultiSelectComponent.prototype.cancel = function () {
        this.refreshUI();
        this.updateNgModel();
    };
    GWMultiSelectComponent.prototype.remove = function () {
        this._select_value = {};
        this._select_modal = '';
        this._multi_select_value = [];
        this.enabled = false;
        this.updateNgModel();
        this.refreshUI();
        this.onRemove();
        this.onSave.emit(this.values);
    };
    GWMultiSelectComponent.prototype.writeValue = function (val) {
        var _this = this;
        this._val = val;
        if (val) {
            if (this.showSelect) {
                if (this.selectData) {
                    var select_data = this.selectData.filter(function (item) { return item.id == val.selectValue; });
                    this._select_value = select_data.length > 0 ? select_data[0] : {};
                }
                if (this.data) {
                    var array_1 = [];
                    var values = val.value;
                    values.forEach(function (select) {
                        _this.data.forEach(function (item) {
                            if (select.id == item.id) {
                                array_1.push(item);
                            }
                        });
                    });
                    this._multi_select_value = array_1;
                }
            }
            else {
                if (this.data) {
                    var array_2 = [];
                    var values = val;
                    values.forEach(function (select) {
                        _this.data.forEach(function (item) {
                            if (select.id == item.id) {
                                array_2.push(item);
                            }
                        });
                    });
                    this._multi_select_value = array_2;
                }
            }
        }
        else {
            this._multi_select_value = [];
            this._select_value = null;
            this._select_modal = '';
            this.values = null;
        }
        this.refreshUI();
    };
    GWMultiSelectComponent.prototype.refreshUI = function () {
        var _this = this;
        if (this.data && this._multi_select_value) {
            this.data.forEach(function (item) { return item.__checked__ = false; });
            this._multi_select_value.forEach(function (select) {
                _this.data.forEach(function (item) {
                    if (select.id == item.id) {
                        item.__checked__ = true;
                    }
                });
            });
            if (this.showSelect && this.values) {
                this._select_modal = this.values.selectValue;
            }
        }
    };
    GWMultiSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    GWMultiSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return GWMultiSelectComponent;
}(GWControl));
export { GWMultiSelectComponent };
GWMultiSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'gw-multi-select',
                styles: ["button .author { padding-right: 5px; } button .value { color: #797979; } button .arrow { padding: 0 2px; } button /deep/ .popover-content { padding: 9px 0 !important; } .popover-container .popover-top, .popover-container .popover-main, .popover-container .popover-footer { font-size: 12px; padding: 0 10px; } .popover-container .popover-main { padding: 0; } .popover-container { padding-top: 10px; } .popover-container .popover-top .top-select { width: 100px; } .popover-container .popover-hr { width: 100%; border-top: 1px solid #aaaaaa; margin: 10px 0; } .popover-container .popover-main .input { padding: 0 10px; width: 100%; } .popover-container .popover-main input[type=text] { border: 1px solid #cccccc; width: 100%; margin-bottom: 5px; padding-left: 5px; padding-top: 3px; } .popover-container .popover-main ul { list-style: none; padding: 0; font-weight: normal; max-height: 220px; overflow: auto; } .popover-container .popover-main ul input[type=checkbox] { height: 11px; } .popover-container .popover-main ul label { font-weight: normal; font-size: 10px; width: 100%; margin: 2px 0; text-align: left; } .popover-container .popover-main ul li { padding: 0 10px; } .popover-container .popover-main ul li:hover { background-color: antiquewhite; } .popover-container .popover-footer { display: inline-block; width: 100%; } .popover-container .popover-footer .left { float: left; } .popover-container .popover-footer .right { float: right; }"],
                template: "<ng-container *ngIf=\"enabled\"> <button type=\"button\" class=\"btn btn-default {{btnSize}}\"> <span gw-popover [template]=\"tpl\"> <span class=\"author\">{{label}}</span> <span class=\"value\">{{_select_value?.text}} {{labels}}</span> <span class=\"arrow\"><span class=\"caret\"></span></span> </span> <ng-container *ngIf=\"closeable\"> <span class=\"glyphicon glyphicon-remove\" (click)=\"remove();\"></span> </ng-container> </button> </ng-container> <ng-template #tpl> <div class=\"popover-container\"> <ng-container *ngIf=\"showSelect\"> <div class=\"popover-top\"> <span class=\"top-label\">{{label}}</span>: <select class=\"top-select\" [(ngModel)]=\"_select_modal\"> <option *ngFor=\"let item of selectData\" [attr.value]=\"item.id\" [attr.selected]=\"_select_modal == item.id\">{{item.text}}</option> </select> </div> <div class=\"popover-hr\"></div> </ng-container> <div class=\"popover-main\"> <div class=\"input\"><input type=\"text\" [(ngModel)]=\"_filter\" name=\"value\" placeholder=\"过滤...\"></div> <ul> <li *ngFor=\"let item of (data | gwSelectFilter:_filter)\"> <label> <input type=\"checkbox\" [(ngModel)]=\"item.__checked__\" name=\"checkbox\"> <span>{{item.text}}</span> </label> </li> </ul> </div> <div class=\"popover-hr\"></div> <div class=\"popover-footer\"> <div class=\"left\"> <a class=\"btn btn-xs\" (click)=\"clear()\">清除</a> </div> <div class=\"right\"> <button class=\"btn btn-primary btn-xs\" (click)=\"save();popover.hide();\">保存</button> <button class=\"btn btn-default btn-xs\" (click)=\"cancel();popover.hide();\">取消</button> </div> </div> </div> </ng-template>",
                providers: [GW_SELECT_VALUE_ACCESSOR]
            },] },
];
GWMultiSelectComponent.ctorParameters = function () { return []; };
GWMultiSelectComponent.propDecorators = {
    'onSave': [{ type: Output },],
    'popover': [{ type: ViewChild, args: [GWPopoverDirective,] },],
    '_data': [{ type: Input, args: ['data',] },],
};
//# sourceMappingURL=multi-select.component.js.map