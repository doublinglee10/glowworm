import { NgModule } from "@angular/core";
import { GWInputComponent } from "./input.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GWPopoverModule } from "../popover/popover.module";
var GWInputModule = (function () {
    function GWInputModule() {
    }
    return GWInputModule;
}());
export { GWInputModule };
GWInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GWInputComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    GWPopoverModule.forRoot(),
                ],
                exports: [
                    GWInputComponent
                ]
            },] },
];
GWInputModule.ctorParameters = function () { return []; };
//# sourceMappingURL=input.module.js.map