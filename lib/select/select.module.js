import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PopoverModule } from "ngx-bootstrap";
import { GWSelectComponent } from "./select.component";
import { GWUtilModule } from "../utils/util.module";
var GWSelectModule = (function () {
    function GWSelectModule() {
    }
    return GWSelectModule;
}());
export { GWSelectModule };
GWSelectModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GWSelectComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    PopoverModule.forRoot(),
                    GWUtilModule
                ],
                exports: [
                    GWSelectComponent
                ]
            },] },
];
GWSelectModule.ctorParameters = function () { return []; };
//# sourceMappingURL=select.module.js.map