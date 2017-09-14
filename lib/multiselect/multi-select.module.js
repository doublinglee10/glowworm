import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GWUtilModule } from "../utils/util.module";
import { GWMultiSelectComponent } from "./multi-select.component";
import { GWPopoverModule } from "../popover/popover.module";
var GWMultiSelectModule = (function () {
    function GWMultiSelectModule() {
    }
    return GWMultiSelectModule;
}());
export { GWMultiSelectModule };
GWMultiSelectModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GWMultiSelectComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    GWPopoverModule.forRoot(),
                    GWUtilModule
                ],
                exports: [
                    GWMultiSelectComponent
                ]
            },] },
];
GWMultiSelectModule.ctorParameters = function () { return []; };
//# sourceMappingURL=multi-select.module.js.map