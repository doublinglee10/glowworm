import { NgModule } from "@angular/core";
import { GWRangeInputComponent } from "./rangeinput.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GWPopoverModule } from "../popover/popover.module";
var GWRangeInputModule = (function () {
    function GWRangeInputModule() {
    }
    return GWRangeInputModule;
}());
export { GWRangeInputModule };
GWRangeInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GWRangeInputComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    GWPopoverModule.forRoot(),
                ],
                exports: [
                    GWRangeInputComponent
                ]
            },] },
];
GWRangeInputModule.ctorParameters = function () { return []; };
//# sourceMappingURL=rangeinput.module.js.map