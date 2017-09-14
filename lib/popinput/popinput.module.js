import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GwCoreModule } from "../core/core.module";
import { GwPopInputComponent } from "./popinput.component";
import { GwPopinputDirective } from "./popinput.directive";
import { FormsModule } from "@angular/forms";
var GwPopinputModule = (function () {
    function GwPopinputModule() {
    }
    return GwPopinputModule;
}());
export { GwPopinputModule };
GwPopinputModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    GwCoreModule
                ],
                declarations: [
                    GwPopInputComponent,
                    GwPopinputDirective
                ],
                exports: [
                    GwPopinputDirective
                ],
                entryComponents: [
                    GwPopInputComponent
                ]
            },] },
];
GwPopinputModule.ctorParameters = function () { return []; };
//# sourceMappingURL=popinput.module.js.map