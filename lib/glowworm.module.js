import { NgModule } from "@angular/core";
import { GWInputModule } from "./input/input.module";
import { GWRangeInputModule } from "./rangeInput/rangeinput.module";
import { GWToolbarModule } from "./toolbar/toolbar.module";
import { DatepickerModule } from "./datepicker/datepicker.module";
import { GWSingleSelectModule } from "./singleselect/single-select.module";
import { GWMultiSelectModule } from "./multiselect/multi-select.module";
import { GWPopoverModule } from "./popover/popover.module";
import { GWPopoverConfirmModule } from "./popover-confirm/popover-confirm.module";
import { GwCoreModule } from "./core/core.module";
import { GwPopconfirmModule } from "./popconfirm/popconfirm.module";
import { GwPopinputModule } from "./popinput/popinput.module";
import { GwConfirmModule } from "./confirm/confirm.module";
var MODULES_FOR_ROOT = [
    GwCoreModule.forRoot(),
    GWSingleSelectModule,
    GWMultiSelectModule,
    GWInputModule,
    GWRangeInputModule,
    GWToolbarModule,
    DatepickerModule.forRoot(),
    GWPopoverModule.forRoot(),
    GWPopoverConfirmModule,
    GwPopconfirmModule,
    GwPopinputModule,
    GwConfirmModule
];
var MODULES_FOR_CHILD = [
    GwCoreModule,
    GWSingleSelectModule,
    GWMultiSelectModule,
    GWInputModule,
    GWRangeInputModule,
    GWToolbarModule,
    GWToolbarModule,
    DatepickerModule,
    GWPopoverModule,
    GWPopoverConfirmModule,
    GwPopconfirmModule,
    GwPopinputModule,
    GwConfirmModule
];
var GlowwormRootModule = (function () {
    function GlowwormRootModule() {
    }
    return GlowwormRootModule;
}());
export { GlowwormRootModule };
GlowwormRootModule.decorators = [
    { type: NgModule, args: [{
                imports: MODULES_FOR_ROOT,
                exports: MODULES_FOR_CHILD
            },] },
];
GlowwormRootModule.ctorParameters = function () { return []; };
var GlowwormModule = (function () {
    function GlowwormModule() {
    }
    GlowwormModule.forRoot = function () {
        return {
            ngModule: GlowwormRootModule
        };
    };
    return GlowwormModule;
}());
export { GlowwormModule };
GlowwormModule.decorators = [
    { type: NgModule, args: [{
                exports: MODULES_FOR_CHILD
            },] },
];
GlowwormModule.ctorParameters = function () { return []; };
//# sourceMappingURL=glowworm.module.js.map