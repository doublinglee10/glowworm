import { Component, ContentChildren } from "@angular/core";
var GWToolbarComponent = (function () {
    function GWToolbarComponent() {
        this.fields = [];
    }
    GWToolbarComponent.prototype.addFieldComponent = function (component) {
        component.onRemove = this.onRemove.bind(this);
        this.fields.push(component);
    };
    GWToolbarComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.fields = this._fields.toArray().concat(this.fields);
        this.fields.forEach(function (item) {
            var control = item;
            control.onRemove = _this.onRemove.bind(_this);
        });
        this.refreshUI();
    };
    GWToolbarComponent.prototype.refreshUI = function () {
        var _this = this;
        this.data = [];
        this.fields.filter(function (item) {
            var control = item;
            return !control.enabled;
        }).forEach(function (item) {
            var control = item;
            _this.data.push({
                label: control.label,
                component: control
            });
        });
    };
    GWToolbarComponent.prototype.onRemove = function () {
        this.refreshUI();
    };
    GWToolbarComponent.prototype.clear = function () {
        this.data.forEach(function (item) {
            item.__checked__ = false;
        });
    };
    GWToolbarComponent.prototype.save = function () {
        this.data.forEach(function (item) {
            if (item.__checked__) {
                var control = item.component;
                control.enabled = true;
            }
        });
        this.refreshUI();
    };
    GWToolbarComponent.prototype.cancel = function () {
        this.clear();
    };
    return GWToolbarComponent;
}());
export { GWToolbarComponent };
GWToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'gw-toolbar',
                styles: ["button .author { padding-right: 5px; } button .value { color: #797979; } button .arrow { padding: 0 2px; } button /deep/ .popover-content { padding: 9px 0 !important; } .popover-container .popover-top, .popover-container .popover-main, .popover-container .popover-footer { font-size: 12px; padding: 0 10px; } .popover-container .popover-main { padding: 0; margin-top: 10px; } .popover-container .popover-top .top-select { width: 100px; } .popover-container .popover-hr { width: 100%; border-top: 1px solid #aaaaaa; margin: 10px 0; } .popover-container .popover-main .input { padding: 0 10px; width: 100%; } .popover-container .popover-main input[type=text] { border: 1px solid #cccccc; width: 100%; margin-bottom: 5px; padding-left: 5px; padding-top: 3px; } .popover-container .popover-main ul { list-style: none; padding: 0; font-weight: normal; max-height: 220px; overflow: auto; } .popover-container .popover-main ul input[type=checkbox] { height: 11px; } .popover-container .popover-main ul label { font-weight: normal; font-size: 10px; width: 100%; margin: 2px 0; } .popover-container .popover-main ul li { padding: 0 10px; } .popover-container .popover-main ul li:hover { background-color: antiquewhite; } .popover-container .popover-footer { display: inline-block; width: 100%; } .popover-container .popover-footer .left { float: left; } .popover-container .popover-footer .right { float: right; }"],
                template: "<ng-content></ng-content> <button type=\"button\" class=\"btn btn-default btn-xs\" gw-popover #popover=\"gw-popover\" [template]=\"tpl\"> <span class=\"glyphicon glyphicon-plus\"></span> </button> <ng-template #tpl> <div class=\"popover-container\"> <div class=\"popover-main\"> <div class=\"input\"><input type=\"text\" [(ngModel)]=\"_filter\" name=\"value\" placeholder=\"过滤...\"></div> <ul> <li *ngFor=\"let item of (data | gwSelectFilter:_filter)\"> <label> <input type=\"checkbox\" [(ngModel)]=\"item.__checked__\" name=\"checkbox\"> <span>{{item.label}}</span> </label> </li> </ul> </div> <div class=\"popover-hr\"></div> <div class=\"popover-footer\"> <div class=\"left\"> <a class=\"btn btn-xs\" (click)=\"clear()\">清除</a> </div> <div class=\"right\"> <button class=\"btn btn-primary btn-xs\" (click)=\"popover.hide();save()\">保存</button> <button class=\"btn btn-default btn-xs\" (click)=\"popover.hide();cancel()\">取消</button> </div> </div> </div> </ng-template>"
            },] },
];
GWToolbarComponent.ctorParameters = function () { return []; };
GWToolbarComponent.propDecorators = {
    '_fields': [{ type: ContentChildren, args: ['gwcontrol',] },],
};
//# sourceMappingURL=toolbar.component.js.map