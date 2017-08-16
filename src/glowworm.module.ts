import {NgModule} from "@angular/core";
import {GWInputModule} from "./input/input.module";
import {GWToolbarModule} from "./toolbar/toolbar.module";
import {DatepickerModule} from "./datepicker/datepicker.module";
import {GWSingleSelectModule} from "./singleselect/single-select.module";
import {GWMultiSelectModule} from "./multiselect/multi-select.module";
import {GWPopoverModule} from "./popover/popover.module";

@NgModule({
    imports: [
        GWSingleSelectModule,
        GWMultiSelectModule,
        GWInputModule,
        GWToolbarModule,
        DatepickerModule.forRoot(),
        GWPopoverModule.forRoot()
    ],
    exports: [
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
