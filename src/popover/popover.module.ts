import {ModuleWithProviders, NgModule} from "@angular/core";
import {GWPopoverDirective} from "./popover.directive";
import {GWPopoverComponent} from "./popover.component";
import {PopoverConfig} from "./popover.config";
import {CommonModule} from "@angular/common";
import {GWPopoverContainerComponent} from "./popover-container.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GWPopoverDirective,
        GWPopoverComponent,
        GWPopoverContainerComponent
    ],
    exports: [
        GWPopoverDirective,
        GWPopoverComponent,
        GWPopoverContainerComponent
    ],
    providers: [
        PopoverConfig
    ],
    entryComponents: [
        GWPopoverComponent
    ]
})
export class GwPopoverModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GwPopoverModule,
            providers: [PopoverConfig]
        };
    }

}