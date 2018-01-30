import {ModuleWithProviders, NgModule} from "@angular/core";
import {GWInputModule} from "./input/input.module";
import {GWRangeInputModule} from "./rangeInput/rangeinput.module";
import {GWToolbarModule} from "./toolbar/toolbar.module";
import {DatepickerModule} from "./datepicker/datepicker.module";
import {GWSingleSelectModule} from "./singleselect/single-select.module";
import {GWPopoverModule} from "./popover/popover.module";
import {GwCoreModule} from "./core/core.module";
import {GwPopconfirmModule} from "./popconfirm/popconfirm.module";
import {GwPopinputModule} from "./popinput/popinput.module";
import {GwConfirmModule} from "./confirm/confirm.module";
import {GwPopselectModule} from "./popselect/popselect.module";
import {GwContextMenuModule} from "./context-menu";
import {GwTabsModule} from "./tabs/tabs.module";
import {GwSwitchModule} from "./switch/gw-switch.module";
import {GwPannelModule} from "./panel/panel.module";
import {GwSelectModule} from "./select/select.module";
import {GwInputsModule} from "./inputs/inputs.module";
import {GwImgPreviewModule} from "./imgpreview/imgpreview.module";

let MODULES = [
    GwCoreModule,
    GWSingleSelectModule,
    GWInputModule,
    GWRangeInputModule,
    GWToolbarModule,
    DatepickerModule,
    GWPopoverModule,
    GwPopconfirmModule,
    GwPopinputModule,
    GwConfirmModule,
    GwPopselectModule,
    GwContextMenuModule,
    GwTabsModule,
    GwPannelModule,
    GwSwitchModule,
    GwSelectModule,
    GwInputsModule,
    GwImgPreviewModule
];

@NgModule({
    imports: [
        GwCoreModule.forRoot(),
        GWSingleSelectModule,
        GWInputModule,
        GWRangeInputModule,
        GWToolbarModule,
        DatepickerModule.forRoot(),
        GWPopoverModule.forRoot(),
        GwPopconfirmModule,
        GwPopinputModule,
        GwConfirmModule.forRoot(),
        GwPopselectModule,
        GwContextMenuModule.forRoot(),
        GwTabsModule,
        GwSwitchModule,
        GwPannelModule,
        GwSelectModule,
        GwInputsModule,
        GwImgPreviewModule
    ],
    exports: MODULES
})
export class GlowwormRootModule {
}

@NgModule({
    exports: MODULES
})
export class GlowwormModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: GlowwormRootModule
        };
    }

}