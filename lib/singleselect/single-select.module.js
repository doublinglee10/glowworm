import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PopoverModule } from "ngx-bootstrap";
import { GWUtilModule } from "../utils/util.module";
import { GWSingleSelectComponent } from "./single-select.component";
var GWSingleSelectModule = (function () {
    function GWSingleSelectModule() {
    }
    return GWSingleSelectModule;
}());
export { GWSingleSelectModule };
GWSingleSelectModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    GWSingleSelectComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    PopoverModule.forRoot(),
                    GWUtilModule
                ],
                exports: [
                    GWSingleSelectComponent
                ]
            },] },
];
GWSingleSelectModule.ctorParameters = function () { return []; };
//# sourceMappingURL=single-select.module.js.map