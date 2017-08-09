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
import { PopoverDirective } from "ngx-bootstrap";
export var GW_INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return GWInputComponent; }),
    multi: true
};
var GWInputComponent = (function (_super) {
    __extends(GWInputComponent, _super);
    function GWInputComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GWInputComponent.prototype.ngOnInit = function () {
        if (!this.selectValue && this.selectData && this.selectData.length > 0) {
            this.selectValue = this.selectData[0].value;
        }
    };
    Object.defineProperty(GWInputComponent.prototype, "value", {
        set: function (value) {
            this._value = value;
            this.onTouched && this.onTouched();
            this.onChange && this.onChange(this._value);
        },
        enumerable: true,
        configurable: true
    });
    GWInputComponent.prototype.clear = function () {
        this._tmp_value = null;
    };
    GWInputComponent.prototype.save = function () {
        var _this = this;
        this.popover.hide();
        this.value = this._tmp_value;
        this.selectLabel = this.showSelect ? this.selectData.filter(function (item) { return item.id == _this.selectValue; })[0].text : '';
    };
    GWInputComponent.prototype.cancel = function () {
        this.popover.hide();
        this._tmp_value = this.value;
    };
    GWInputComponent.prototype.remove = function () {
        this.value = null;
        this.enabled = false;
        this.clear();
        this.selectValue = null;
        this.onRemove();
    };
    GWInputComponent.prototype.writeValue = function (obj) {
        var _this = this;
        this.value = obj;
        this.selectLabel = this.showSelect ? this.selectData.filter(function (item) { return item.id == _this.selectValue; })[0].text : '';
        this._tmp_value = obj;
    };
    GWInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    GWInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return GWInputComponent;
}(GWControl));
export { GWInputComponent };
GWInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'gw-input',
                styles: ["button .author { padding-right: 5px; } button .value { color: #797979; } button .arrow { padding: 0px 2px; } button /deep/ .popover-content { padding: 9px 0 !important; } .popover-container .popover-top, .popover-container .popover-main, .popover-container .popover-footer { font-size: 12px; padding: 0px 10px; } .popover-container .popover-top .top-select { width: 100px; } .popover-container .popover-hr { width: 100%; border-top: 1px solid #aaaaaa; margin: 10px 0px; } .popover-container .popover-main input { border: 1px solid #cccccc; width: 100%; } .popover-container .popover-footer { display: inline-block; width: 100%; } .popover-container .popover-footer .left { float: left; } .popover-container .popover-footer .right { float: right; }"],
                template: "<ng-container *ngIf=\"enabled\"> <button type=\"button\" class=\"btn btn-default {{btnSize}}\"> <span [popover]=\"popTemplate\" placement=\"bottom\" #pop=\"bs-popover\" containerClass=\"popover-input\"> <span class=\"author\">{{label}}</span> <span class=\"value\">{{selectLabel}} {{_value}}</span> <span class=\"arrow\"><span class=\"caret\"></span></span> </span> <ng-container *ngIf=\"closeable\"> <span class=\"glyphicon glyphicon-remove\" (click)=\"remove();\"></span> </ng-container> </button> </ng-container> <ng-template #popTemplate> <div class=\"popover-container\"> <ng-container *ngIf=\"showSelect\"> <div class=\"popover-top\"> <span class=\"top-label\">{{label}}</span>: <select class=\"top-select\" [(ngModel)]=\"selectValue\"> <option *ngFor=\"let item of selectData\" [attr.value]=\"item.id\" [attr.selected]=\"selectValue == item.id\">{{item.text}}</option> </select> </div> <div class=\"popover-hr\"></div> </ng-container> <div class=\"popover-main\"> <input type=\"text\" [(ngModel)]=\"_tmp_value\" name=\"value\"> </div> <div class=\"popover-hr\"></div> <div class=\"popover-footer\"> <div class=\"left\"> <a class=\"btn btn-xs\" (click)=\"clear()\">清除</a> </div> <div class=\"right\"> <button class=\"btn btn-primary btn-xs\" (click)=\"save(pop)\">保存</button> <button class=\"btn btn-default btn-xs\" (click)=\"cancel()\">取消</button> </div> </div> </div> </ng-template>",
                providers: [GW_INPUT_VALUE_ACCESSOR]
            },] },
];
GWInputComponent.ctorParameters = function () { return []; };
GWInputComponent.propDecorators = {
    'popover': [{ type: ViewChild, args: [PopoverDirective,] },],
};
//# sourceMappingURL=input.component.js.map