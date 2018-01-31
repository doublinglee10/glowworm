import {ModuleWithProviders, NgModule} from "@angular/core";
import {GwContextMenuContainerComponent} from "./context-menu.component";
import {GwContextMenuDirective} from "./context-menu.directive";
import {CommonModule} from "@angular/common";
import {ContextMenuService} from "./context-menu.service";
import {GwCoreModule} from "../core/core.module";

@NgModule({
    imports: [
        CommonModule,
        GwCoreModule.forRoot()
    ],
    declarations: [
        GwContextMenuContainerComponent,
        GwContextMenuDirective
    ],
    exports: [
        GwContextMenuDirective
    ],
    entryComponents: [
        GwContextMenuContainerComponent
    ]
})
export class GwContextMenuModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GwContextMenuModule,
            providers: [ContextMenuService]
        };
    }

}