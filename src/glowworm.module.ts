import {NgModule} from "@angular/core";
import {GWButtonModule} from "./button/button.module";
import {GWInputModule} from "./input/input.module";
import {GWToolbarModule} from "./toolbar/toolbar.module";
import {DatepickerModule} from "./datepicker/datepicker.module";
import {GWSingleSelectModule} from "./singleselect/single-select.module";
import {GWMultiSelectModule} from "./multiselect/multi-select.module";
import {GWPopoverModule} from "./popover/popover.module";

@NgModule({
    imports: [
        GWButtonModule,
        GWSingleSelectModule,
        GWMultiSelectModule,
        GWInputModule,
        GWToolbarModule,
        DatepickerModule.forRoot(),
        GWPopoverModule.forRoot()
    ],
    exports: [
        GWButtonModule,
        GWSingleSelectModule,
        GWMultiSelectModule,
        GWInputModule,
        GWToolbarModule,
        DatepickerModule,
        GWPopoverModule
    ]
})
export class GlowwormModule {
}
