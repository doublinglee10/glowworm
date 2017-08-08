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
import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { GWControl } from "../utils/gw-control";
import { PopoverDirective } from "ngx-bootstrap";
export var GW_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return GWMultiSelectComponent; }),
    multi: true
};
var GWMultiSelectComponent = (function (_super) {
    __extends(GWMultiSelectComponent, _super);
    function GWMultiSelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSelectEvent = new EventEmitter();
        _this.values = [];
        return _this;
    }
    Object.defineProperty(GWMultiSelectComponent.prototype, "labels", {
        get: function () {
            return this.values.map(function (value) { return value.text; }).join(',');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GWMultiSelectComponent.prototype, "_data", {
        set: function (data) {
            this.data = data;
            this.refreshUI();
        },
        enumerable: true,
        configurable: true
    });
    GWMultiSelectComponent.prototype.clear = function () {
        this.data.forEach(function (item) {
            item.__checked__ = false;
        });
    };
    GWMultiSelectComponent.prototype.updateNgModel = function () {
        this.onTouched();
        this.onChange(this.values);
    };
    GWMultiSelectComponent.prototype.save = function () {
        this.popover.hide();
        this.values = this.data.filter(function (value) { return value.__checked__; });
        this.updateNgModel();
        this.onSelectEvent.emit(this.values);
    };
    GWMultiSelectComponent.prototype.cancel = function () {
        this.popover.hide();
        this.refreshUI();
        this.updateNgModel();
    };
    GWMultiSelectComponent.prototype.remove = function () {
        this.values = [];
        this.enabled = false;
        this.clear();
        this.updateNgModel();
        this.onRemove();
    };
    GWMultiSelectComponent.prototype.writeValue = function (obj) {
        this.values = obj || [];
        this.refreshUI();
    };
    GWMultiSelectComponent.prototype.refreshUI = function () {
        var _this = this;
        this.data.forEach(function (item) { return item.__checked__ = false; });
        this.values.forEach(function (select) {
            _this.data.forEach(function (item) {
                if (select.id == item.id) {
                    item.__checked__ = true;
                    select.text = item.text;
                }
            });
        });
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
                styles: ["button .author { padding-right: 5px; } button .value { color: #797979; } button .arrow { padding: 0 2px; } button /deep/ .popover-content { padding: 9px 0 !important; } .popover-container .popover-top, .popover-container .popover-main, .popover-container .popover-footer { font-size: 12px; padding: 0 10px; } .popover-container .popover-main { padding: 0; } .popover-container .popover-top .top-select { width: 100px; } .popover-container .popover-hr { width: 100%; border-top: 1px solid #aaaaaa; margin: 10px 0; } .popover-container .popover-main .input { padding: 0 10px; width: 100%; } .popover-container .popover-main input[type=text] { border: 1px solid #cccccc; width: 100%; margin-bottom: 5px; padding-left: 5px; padding-top: 3px; } .popover-container .popover-main ul { list-style: none; padding: 0; font-weight: normal; max-height: 220px; overflow: auto; } .popover-container .popover-main ul input[type=checkbox] { height: 11px; } .popover-container .popover-main ul label { font-weight: normal; font-size: 10px; width: 100%; margin: 2px 0; } .popover-container .popover-main ul li { padding: 0 10px; } .popover-container .popover-main ul li:hover { background-color: antiquewhite; } .popover-container .popover-footer { display: inline-block; width: 100%; } .popover-container .popover-footer .left { float: left; } .popover-container .popover-footer .right { float: right; }"],
                template: "<ng-container *ngIf=\"enabled\"> <button type=\"button\" class=\"btn btn-default {{btnSize}}\"> <span [popover]=\"popTemplate\" placement=\"bottom\" #pop=\"bs-popover\" containerClass=\"popover-input\"> <span class=\"author\">{{label}}</span> <span class=\"value\">{{labels}}</span> <span class=\"arrow\"><span class=\"caret\"></span></span> </span> <ng-container *ngIf=\"closeable\"> <span class=\"glyphicon glyphicon-remove\" (click)=\"remove();\"></span> </ng-container> </button> </ng-container> <ng-template #popTemplate> <div class=\"popover-container\"> <ng-container *ngIf=\"showSelect\"> <div class=\"popover-top\"> <span class=\"top-label\">{{label}}</span>: <select class=\"top-select\" [(ngModel)]=\"selectValue\"> <option *ngFor=\"let item of selectData\" [attr.value]=\"item.id\" [attr.selected]=\"selectValue == item.id\">{{item.text}}</option> </select> </div> <div class=\"popover-hr\"></div> </ng-container> <div class=\"popover-main\"> <div class=\"input\"><input type=\"text\" [(ngModel)]=\"_filter\" name=\"value\" placeholder=\"过滤...\"></div> <ul> <li *ngFor=\"let item of (data | gwSelectFilter:_filter)\"> <label> <input type=\"checkbox\" [(ngModel)]=\"item.__checked__\" name=\"checkbox\"> <span>{{item.text}}</span> </label> </li> </ul> </div> <div class=\"popover-hr\"></div> <div class=\"popover-footer\"> <div class=\"left\"> <a class=\"btn btn-xs\" (click)=\"clear()\">清除</a> </div> <div class=\"right\"> <button class=\"btn btn-primary btn-xs\" (click)=\"save()\">保存</button> <button class=\"btn btn-default btn-xs\" (click)=\"cancel()\">取消</button> </div> </div> </div> </ng-template>",
                providers: [GW_SELECT_VALUE_ACCESSOR]
            },] },
];
GWMultiSelectComponent.ctorParameters = function () { return []; };
GWMultiSelectComponent.propDecorators = {
    'popover': [{ type: ViewChild, args: [PopoverDirective,] },],
    'onSelectEvent': [{ type: Output, args: ['onSelect',] },],
    '_data': [{ type: Input, args: ['data',] },],
};
//# sourceMappingURL=multi-select.component.js.map