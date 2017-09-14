import { ComponentFactoryResolver, Directive, ElementRef, Input, NgZone, ViewContainerRef } from "@angular/core";
import { GWPopoverComponent } from "./popover.component";
var GWPopoverDirective = (function () {
    function GWPopoverDirective(el, zone, viewContainerRef, componentFactoryResolver) {
        this.el = el;
        this.zone = zone;
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    GWPopoverDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.createComponent();
        this.zone.runOutsideAngular(function () {
            window.document.addEventListener('click', _this.onClickEvent.bind(_this));
        });
    };
    GWPopoverDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            window.document.removeEventListener('click', _this.onClickEvent.bind(_this));
        });
    };
    GWPopoverDirective.prototype.onClickEvent = function (event) {
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
    GWPopoverDirective.prototype.createComponent = function () {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(GWPopoverComponent);
        this.viewContainerRef.clear();
        var componentRef = this.viewContainerRef.createComponent(componentFactory);
        this.popover = componentRef.instance;
        this.popover.template = this.template;
    };
    GWPopoverDirective.prototype.show = function () {
        this.reposition();
        this.popover.show();
    };
    GWPopoverDirective.prototype.hide = function () {
        this.popover.hide();
    };
    GWPopoverDirective.prototype.toggle = function () {
        this.reposition();
        this.popover.toggle();
    };
    GWPopoverDirective.prototype.reposition = function () {
        this.popover.setStyle({
            top: this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight + 'px',
            left: this.el.nativeElement.offsetLeft + 'px'
        });
    };
    return GWPopoverDirective;
}());
export { GWPopoverDirective };
GWPopoverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gw-popover]',
                exportAs: 'gw-popover'
            },] },
];
GWPopoverDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NgZone, },
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
]; };
GWPopoverDirective.propDecorators = {
    'template': [{ type: Input },],
};
//# sourceMappingURL=popover.directive.js.map