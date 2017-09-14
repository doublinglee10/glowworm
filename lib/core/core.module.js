import { NgModule } from "@angular/core";
import { GwOverlayDirective } from "./overlay.directive";
import { ComponentLoaderService } from "./component-loader.service";
import { CommonModule } from "@angular/common";
import { WindowResizeService } from "./window-resize.service";
var GwCoreModule = (function () {
    function GwCoreModule() {
    }
    GwCoreModule.forRoot = function () {
        return {
            ngModule: GwCoreModule,
            providers: [
                ComponentLoaderService,
                WindowResizeService
            ]
        };
    };
    return GwCoreModule;
}());
export { GwCoreModule };
GwCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    GwOverlayDirective
                ],
                exports: [
                    GwOverlayDirective
                ],
                providers: []
            },] },
];
GwCoreModule.ctorParameters = function () { return []; };
//# sourceMappingURL=core.module.js.map