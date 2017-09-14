import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GwCoreModule } from "../core/core.module";
import { GwPopConfirmComponent } from "./popconfirm.component";
import { GwPopConfirmDirective } from "./popconfirm.directive";
var GwPopconfirmModule = (function () {
    function GwPopconfirmModule() {
    }
    return GwPopconfirmModule;
}());
export { GwPopconfirmModule };
GwPopconfirmModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    GwCoreModule
                ],
                declarations: [
                    GwPopConfirmComponent,
                    GwPopConfirmDirective
                ],
                exports: [
                    GwPopConfirmDirective
                ],
                entryComponents: [
                    GwPopConfirmComponent
                ]
            },] },
];
GwPopconfirmModule.ctorParameters = function () { return []; };
//# sourceMappingURL=popconfirm.module.js.map