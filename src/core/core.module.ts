import {ModuleWithProviders, NgModule} from "@angular/core";
import {GwOverlayDirective} from "./overlay.directive";
import {ComponentLoaderService} from "./component-loader.service";
import {CommonModule} from "@angular/common";
import {WindowResizeService} from "./window-resize.service";
import {MultiKeysFilter} from "./multikeys.filter";
import {SafeHtmlFilter} from "./safe-html.filter";
import {ScriptLoaderService} from "./script-loader.service";
import {SafePipe} from "./safe.pipe";
import {TriangleComponent} from "./triangle.component";
import {GwConnectedOverlayComponent} from "./connected-overlay.component";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
    imports: [
        CommonModule,
        OverlayModule
    ],
    declarations: [
        GwOverlayDirective,
        MultiKeysFilter,
        SafeHtmlFilter,
        SafePipe,
        TriangleComponent,
        GwConnectedOverlayComponent
    ],
    exports: [
        GwOverlayDirective,
        MultiKeysFilter,
        SafeHtmlFilter,
        SafePipe,
        TriangleComponent,
        GwConnectedOverlayComponent,
        OverlayModule
    ]
})
export class GwCoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GwCoreModule,
            providers: [
                ComponentLoaderService,
                WindowResizeService,
                ScriptLoaderService
            ]
        };
    }
}