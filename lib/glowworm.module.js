import { NgModule } from "@angular/core";
import { GWButtonModule } from "./button/button.module";
import { GWInputModule } from "./input/input.module";
import { GWSelectModule } from "./select/select.module";
import { GWToolbarModule } from "./toolbar/toolbar.module";
import { DatepickerModule } from "./datepicker/datepicker.module";
var GLOWWORM_MODULES = [
    GWButtonModule,
    GWSelectModule,
    GWInputModule,
    GWToolbarModule,
    DatepickerModule
];
var GlowwormModule = (function () {
    function GlowwormModule() {
    }
    return GlowwormModule;
}());
export { GlowwormModule };
GlowwormModule.decorators = [
    { type: NgModule, args: [{
                imports: GLOWWORM_MODULES,
                exports: GLOWWORM_MODULES
            },] },
];
GlowwormModule.ctorParameters = function () { return []; };
//# sourceMappingURL=glowworm.module.js.map