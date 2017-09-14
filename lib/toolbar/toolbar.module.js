import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GWToolbarComponent } from "./toolbar.component";
import { GWUtilModule } from "../utils/util.module";
import { GWPopoverModule } from "../popover/popover.module";
var GWToolbarModule = (function () {
    function GWToolbarModule() {
    }
    return GWToolbarModule;
}());
export { GWToolbarModule };
GWToolbarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GWToolbarComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    GWPopoverModule.forRoot(),
                    GWUtilModule
                ],
                exports: [
                    GWToolbarComponent
                ]
            },] },
];
GWToolbarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=toolbar.module.js.map