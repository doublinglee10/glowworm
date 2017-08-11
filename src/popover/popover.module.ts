import {ModuleWithProviders, NgModule} from "@angular/core";
import {GWPopoverDirective} from "./popover.directive";
import {GWPopoverComponent} from "./popover.component";
import {PopoverConfig} from "./popover.config";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GWPopoverDirective,
        GWPopoverComponent
    ],
    exports: [
        GWPopoverDirective,
        GWPopoverComponent
    ],
    providers: [
        PopoverConfig
    ],
    entryComponents: [
        GWPopoverComponent
    ]
})
export class GWPopoverModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GWPopoverModule,
            providers: [PopoverConfig]
        };
    }

}