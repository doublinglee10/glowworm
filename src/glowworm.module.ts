import {ModuleWithProviders, NgModule} from "@angular/core";
import {GWInputModule} from "./input/input.module";
import {GWRangeInputModule} from "./rangeInput/rangeinput.module";
import {GWToolbarModule} from "./toolbar/toolbar.module";
import {DatepickerModule} from "./datepicker/datepicker.module";
import {GWSingleSelectModule} from "./singleselect/single-select.module";
import {GWMultiSelectModule} from "./multiselect/multi-select.module";
import {GWPopoverModule} from "./popover/popover.module";
import {GWPopoverConfirmModule} from "./popover-confirm/popover-confirm.module";

let MODULES_FOR_ROOT = [
    GWSingleSelectModule,
    GWMultiSelectModule,
    GWInputModule,
    GWRangeInputModule,
    GWToolbarModule,
    DatepickerModule.forRoot(),
    GWPopoverModule.forRoot(),
    GWPopoverConfirmModule
];

let MODULES_FOR_CHILD = [
    GWSingleSelectModule,
    GWMultiSelectModule,
    GWInputModule,
    GWRangeInputModule,
    GWToolbarModule,
    GWToolbarModule,
    DatepickerModule,
    GWPopoverModule,
    GWPopoverConfirmModule
];

@NgModule({
    imports: MODULES_FOR_ROOT,
    exports: MODULES_FOR_CHILD
})
export class GlowwormRootModule {
}

@NgModule({
    exports: MODULES_FOR_CHILD
})
export class GlowwormModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GlowwormRootModule
        };
    }

}