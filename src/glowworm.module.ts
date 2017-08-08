import {NgModule} from "@angular/core";
import {GWButtonModule} from "./button/button.module";
import {GWInputModule} from "./input/input.module";
import {GWToolbarModule} from "./toolbar/toolbar.module";
import {DatepickerModule} from "./datepicker/datepicker.module";
import {GWSingleSelectModule} from "./singleselect/single-select.module";
import {GWMultiSelectModule} from "./multiselect/multi-select.module";

let GLOWWORM_MODULES = [
    GWButtonModule,
    GWSingleSelectModule,
    GWMultiSelectModule,
    GWInputModule,
    GWToolbarModule,
    DatepickerModule
];

@NgModule({
    imports: GLOWWORM_MODULES,
    exports: GLOWWORM_MODULES
})
export class GlowwormModule {
}
