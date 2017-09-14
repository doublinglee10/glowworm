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
export var GW_SINGLE_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return GWSingleSelectComponent; }),
    multi: true
};
var GWSingleSelectComponent = (function (_super) {
    __extends(GWSingleSelectComponent, _super);
    function GWSingleSelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSave = new EventEmitter();
        _this.onDataselect = new EventEmitter();
        return _this;
    }
    Object.defineProperty(GWSingleSelectComponent.prototype, "_data", {
        set: function (data) {
            data = data || [];
            var _data = [];
            data.forEach(function (item) {
                _data.push(__assign({}, item));
            });
            this.data = _data;
            this.writeValue(this.value);
        },
        enumerable: true,
        configurable: true
    });
    GWSingleSelectComponent.prototype.clear = function () {
        if (this.data) {
            this.data.forEach(function (item) {
                item.__checked__ = false;
            });
        }
    };
    GWSingleSelectComponent.prototype.updateNgModel = function () {
        this.onTouched();
        this.onChange(this.value);
    };
    GWSingleSelectComponent.prototype.save = function () {
        var _this = this;
        var single_data = this.data.filter(function (item) { return item.__checked__; });
        var select_data = this.selectData.filter(function (item) { return item.id == _this._select_modal; });
        this._single_select_value = single_data.length > 0 ? single_data[0] : {};
        if (this.showSelect) {
            this._select_value = select_data.length > 0 ? select_data[0] : {};
            this.value = {
                value: this._single_select_value.id,
                selectValue: this._select_value.id
            };
        }
        else {
            this.value = this._single_select_value.id;
        }
        this.updateNgModel();
        this.onSave.emit(this.value);
    };
    GWSingleSelectComponent.prototype.cancel = function () {
        this.refreshUI();
        this.updateNgModel();
    };
    GWSingleSelectComponent.prototype.remove = function () {
        this._single_select_value = {};
        this._select_value = {};
        this.value = this.showSelect ? { value: '', selectValue: '' } : '';
        this.enabled = false;
        this.updateNgModel();
        this.refreshUI();
        this.onRemove();
    };
    GWSingleSelectComponent.prototype.onSelect = function (item) {
        if (item.__checked__) {
            this.data.forEach(function (item) {
                item.__checked__ = false;
            });
            item.__checked__ = true;
        }
    };
    GWSingleSelectComponent.prototype.writeValue = function (val) {
        var _this = this;
        if (val) {
            if (this.showSelect) {
                if (this.data) {
                    this.data.forEach(function (item) {
                        if (item.id == val.value) {
                            _this._single_select_value = item;
                        }
                    });
                }
                if (this.selectData) {
                    var data = this.selectData.filter(function (item) {
                        return item.id == val.selectValue;
                    });
                    if (data.length > 0) {
                        this._select_value = data[0];
                    }
                }
            }
            else {
                if (this.data) {
                    this.data.forEach(function (item) {
                        if (item.id == val) {
                            _this._single_select_value = item;
                        }
                    });
                }
            }
        }
        else {
            this._single_select_value = null;
            this._select_value = null;
            this._select_modal = '';
        }
        this.value = val;
        this.refreshUI();
    };
    GWSingleSelectComponent.prototype.refreshUI = function () {
        var _this = this;
        this.data.forEach(function (item) { return item.__checked__ = false; });
        this.data.forEach(function (item) {
            if (_this._single_select_value && _this._single_select_value.id == item.id) {
                item.__checked__ = true;
            }
        });
        if (this.showSelect && this.value) {
            this._select_modal = this.value.selectValue;
        }
    };
    GWSingleSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    GWSingleSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return GWSingleSelectComponent;
}(GWControl));
export { GWSingleSelectComponent };
GWSingleSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'gw-single-select',
                styles: ["button .author { padding-right: 5px; } button .value { color: #797979; } button .arrow { padding: 0 2px; } button /deep/ .popover-content { padding: 9px 0 !important; } .popover-container .popover-top, .popover-container .popover-main, .popover-container .popover-footer { font-size: 12px; padding: 0 10px; } .popover-container .popover-main { padding: 0; } .popover-container { padding-top: 10px; } .popover-container .popover-top .top-select { width: 100px; } .popover-container .popover-hr { width: 100%; border-top: 1px solid #aaaaaa; margin: 10px 0; } .popover-container .popover-main .input { padding: 0 10px; width: 100%; } .popover-container .popover-main input[type=text] { border: 1px solid #cccccc; width: 100%; margin-bottom: 5px; padding-left: 5px; padding-top: 3px; } .popover-container .popover-main ul { list-style: none; padding: 0; font-weight: normal; max-height: 220px; overflow: auto; } .popover-container .popover-main ul input[type=checkbox] { height: 11px; } .popover-container .popover-main ul label { font-weight: normal; font-size: 10px; width: 100%; margin: 2px 0; text-align: left; } .popover-container .popover-main ul li { padding: 0 10px; } .popover-container .popover-main ul li:hover { background-color: antiquewhite; } .popover-container .popover-footer { display: inline-block; width: 100%; } .popover-container .popover-footer .left { float: left; } .popover-container .popover-footer .right { float: right; }"],
                template: "<ng-container *ngIf=\"enabled\"> <button type=\"button\" class=\"btn btn-default {{btnSize}}\"> <span gw-popover [template]=\"tpl\"> <span class=\"author\">{{label}}</span> <span class=\"value\">{{_select_value?.text}} {{_single_select_value?.text}}</span> <span class=\"arrow\"><span class=\"caret\"></span></span> </span> <ng-container *ngIf=\"closeable\"> <span class=\"glyphicon glyphicon-remove\" (click)=\"remove();\"></span> </ng-container> </button> </ng-container> <ng-template #tpl> <div class=\"popover-container\"> <ng-container *ngIf=\"showSelect\"> <div class=\"popover-top\"> <span class=\"top-label\">{{label}}</span>: <select class=\"top-select\" [(ngModel)]=\"_select_modal\" (change)=\"onDataselect.emit(_select_modal)\"> <option *ngFor=\"let item of selectData\" [attr.value]=\"item.id\" [attr.selected]=\"_select_modal == item.id\"  >{{item.text}}</option> </select> </div> <div class=\"popover-hr\"></div> </ng-container> <div class=\"popover-main\"> <div class=\"input\"><input type=\"text\" [(ngModel)]=\"_filter\" name=\"value\" placeholder=\"过滤...\"></div> <ul *ngIf=\"!linkAge\"> <li *ngFor=\"let item of (data | gwSelectFilter:_filter)\"> <label> <input type=\"checkbox\" [(ngModel)]=\"item.__checked__\" name=\"checkbox\" (change)=\"onSelect(item)\"> <span>{{item.text}}</span> </label> </li> </ul> <ul *ngIf=\"linkAge\"> <li *ngFor=\"let item of (data |gwlinkAgeFilter:_select_modal| gwSelectFilter:_filter)\"> <label> <input type=\"checkbox\" [(ngModel)]=\"item.__checked__\" name=\"checkbox\" (change)=\"onSelect(item)\"> <span>{{item.text}}</span> </label> </li> </ul> </div> <div class=\"popover-hr\"></div> <div class=\"popover-footer\"> <div class=\"left\"> <a class=\"btn btn-xs\" (click)=\"clear()\">清除</a> </div> <div class=\"right\"> <button class=\"btn btn-primary btn-xs\" (click)=\"save();popover.hide();\">保存</button> <button class=\"btn btn-default btn-xs\" (click)=\"cancel();popover.hide();\">取消</button> </div> </div> </div> </ng-template> ",
                providers: [GW_SINGLE_SELECT_VALUE_ACCESSOR]
            },] },
];
GWSingleSelectComponent.ctorParameters = function () { return []; };
GWSingleSelectComponent.propDecorators = {
    'onSave': [{ type: Output },],
    'onDataselect': [{ type: Output },],
    'popover': [{ type: ViewChild, args: [GWPopoverDirective,] },],
    '_data': [{ type: Input, args: ['data',] },],
};
//# sourceMappingURL=single-select.component.js.map