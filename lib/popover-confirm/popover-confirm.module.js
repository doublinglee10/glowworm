import { NgModule } from "@angular/core";
import { GWPopoverConfirmDirective } from "./popover-confirm.directive";
import { CommonModule } from "@angular/common";
import { GWPopoverConfirmComponent } from "./popover-confirm.component";
import { GWPopoverModule } from "../popover/popover.module";
var GWPopoverConfirmModule = (function () {
    function GWPopoverConfirmModule() {
    }
    return GWPopoverConfirmModule;
}());
export { GWPopoverConfirmModule };
GWPopoverConfirmModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    GWPopoverModule.forRoot()
                ],
                declarations: [
                    GWPopoverConfirmDirective,
                    GWPopoverConfirmComponent
                ],
                exports: [
                    GWPopoverConfirmDirective,
                    GWPopoverConfirmComponent
                ],
                entryComponents: [
                    GWPopoverConfirmComponent
                ]
            },] },
];
GWPopoverConfirmModule.ctorParameters = function () { return []; };
//# sourceMappingURL=popover-confirm.module.js.map