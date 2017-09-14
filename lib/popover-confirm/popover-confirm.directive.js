var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, Input, NgZone, Output, ViewContainerRef } from "@angular/core";
import { GWPopoverConfirmComponent } from "./popover-confirm.component";
var GWPopoverConfirmDirective = (function () {
    function GWPopoverConfirmDirective(el, zone, viewContainerRef, componentFactoryResolver) {
        this.el = el;
        this.zone = zone;
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.onConfirm = new EventEmitter();
        this.onCancel = new EventEmitter();
    }
    GWPopoverConfirmDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.createComponent();
        this.zone.runOutsideAngular(function () {
            window.document.addEventListener('click', _this.onClickEvent.bind(_this));
        });
    };
    GWPopoverConfirmDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            window.document.removeEventListener('click', _this.onClickEvent.bind(_this));
        });
    };
    GWPopoverConfirmDirective.prototype.onClickEvent = function (event) {
        var _this = this;
        if (this.el.nativeElement.contains(event.target)) {
            this.reposition();
            this.zone.run(function () {
                _this.popover.toggle();
            });
        }
        else if (this.popover.el.nativeElement.contains(event.target)) {
        }
        else if (!this.popover.hidden) {
            this.zone.run(function () {
                _this.popover.hide();
            });
        }
    };
    GWPopoverConfirmDirective.prototype.createComponent = function () {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(GWPopoverConfirmComponent);
        this.viewContainerRef.clear();
        var componentRef = this.viewContainerRef.createComponent(componentFactory);
        this.popover = componentRef.instance;
        this.popover.title = this.title;
        this.popover.styler = this.styler;
        this.popover.onCancel = this.onCancel;
        this.popover.onConfirm = this.onConfirm;
    };
    GWPopoverConfirmDirective.prototype.show = function () {
        this.reposition();
        this.popover.show();
    };
    GWPopoverConfirmDirective.prototype.hide = function () {
        this.popover.hide();
    };
    GWPopoverConfirmDirective.prototype.toggle = function () {
        this.reposition();
        this.popover.toggle();
    };
    GWPopoverConfirmDirective.prototype.reposition = function () {
        var styler = {
            top: this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight + 'px',
            left: this.el.nativeElement.offsetLeft + 'px'
        };
        this.popover.styler = __assign({}, this.styler, styler);
    };
    return GWPopoverConfirmDirective;
}());
export { GWPopoverConfirmDirective };
GWPopoverConfirmDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gw-popover-confirm]'
            },] },
];
GWPopoverConfirmDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NgZone, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
]; };
GWPopoverConfirmDirective.propDecorators = {
    'styler': [{ type: Input },],
    'title': [{ type: Input },],
    'onConfirm': [{ type: Output },],
    'onCancel': [{ type: Output },],
};
//# sourceMappingURL=popover-confirm.directive.js.map