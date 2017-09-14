import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from "@angular/core";
var ComponentLoaderService = (function () {
    function ComponentLoaderService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    ComponentLoaderService.prototype.appendComponentToBody = function (component) {
        var componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        var domElem = componentRef.hostView
            .rootNodes[0];
        document.body.appendChild(domElem);
        return componentRef;
    };
    ComponentLoaderService.prototype.removeComponentFormBody = function (componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    };
    return ComponentLoaderService;
}());
export { ComponentLoaderService };
ComponentLoaderService.decorators = [
    { type: Injectable },
];
ComponentLoaderService.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
    { type: Injector, },
]; };
//# sourceMappingURL=component-loader.service.js.map