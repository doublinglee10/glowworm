import {ModuleWithProviders, NgModule} from "@angular/core";
import {GwOverlayDirective} from "./overlay.directive";
import {ComponentLoaderService} from "./component-loader.service";
import {CommonModule} from "@angular/common";
import {WindowResizeService} from "./window-resize.service";

@NgModule({
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
})
export class GwCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GwCoreModule,
            providers: [
                ComponentLoaderService,
                WindowResizeService
            ]
        };
    }
}