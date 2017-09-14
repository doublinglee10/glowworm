import { NgModule } from "@angular/core";
import { GWPopoverDirective } from "./popover.directive";
import { GWPopoverComponent } from "./popover.component";
import { PopoverConfig } from "./popover.config";
import { CommonModule } from "@angular/common";
import { GWPopoverContainerComponent } from "./popover-container.component";
var GWPopoverModule = (function () {
    function GWPopoverModule() {
    }
    GWPopoverModule.forRoot = function () {
        return {
            ngModule: GWPopoverModule,
            providers: [PopoverConfig]
        };
    };
    return GWPopoverModule;
}());
export { GWPopoverModule };
GWPopoverModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
GWPopoverModule.ctorParameters = function () { return []; };
//# sourceMappingURL=popover.module.js.map