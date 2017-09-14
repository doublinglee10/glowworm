import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector } from "@angular/core";
export declare class ComponentLoaderService {
    private componentFactoryResolver;
    private appRef;
    private injector;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    appendComponentToBody(component: any): ComponentRef<any>;
    removeComponentFormBody(componentRef: ComponentRef<any>): void;
}
