import {NgModule} from "@angular/core";
import {GWButtonModule} from "./button/button.module";
import {GWInputModule} from "./input/input.module";
import {GWSelectModule} from "./select/select.module";
import {GWToolbarModule} from "./toolbar/toolbar.module";
import {DatepickerModule} from  "./datepicker/datepicker.module";

let GLOWWORM_MODULES = [
    GWButtonModule,
    GWSelectModule,
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
