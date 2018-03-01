import {ModuleWithProviders, NgModule} from "@angular/core";
import {GwInputModule} from "./input/input.module";
import {GwRangeInputModule} from "./rangeInput/rangeinput.module";
import {GwToolbarModule} from "./toolbar/toolbar.module";
import {GwDatepickerModule} from "./datepicker/datepicker.module";
import {GwSingleSelectModule} from "./singleselect/single-select.module";
import {GwPopoverModule} from "./popover/popover.module";
import {GwCoreModule} from "./core/core.module";
import {GwPopConfirmModule} from "./popconfirm/popconfirm.module";
import {GwPopInputModule} from "./popinput/popinput.module";
import {GwConfirmModule} from "./confirm/confirm.module";
import {GwPopSelectModule} from "./popselect/popselect.module";
import {GwContextMenuModule} from "./context-menu/context-menu.module";
import {GwTabsModule} from "./tabs/tabs.module";
import {GwSwitchModule} from "./switch/gw-switch.module";
import {GwPannelModule} from "./panel/panel.module";
import {GwSelectModule} from "./select/select.module";
import {GwInputsModule} from "./inputs/inputs.module";
import {GwImgPreviewModule} from "./imgpreview/imgpreview.module";
import {GwPopSingleSelectModule} from "./popsingleselect/pop-singleselect.module";

let MODULES = [
    GwCoreModule,
    GwSingleSelectModule,
    GwInputModule,
    GwRangeInputModule,
    GwToolbarModule,
    GwDatepickerModule,
    GwPopoverModule,
    GwPopConfirmModule,
    GwPopInputModule,
    GwConfirmModule,
    GwPopSelectModule,
    GwPopSingleSelectModule,
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
        GwSingleSelectModule,
        GwInputModule,
        GwRangeInputModule,
        GwToolbarModule,
        GwDatepickerModule.forRoot(),
        GwPopoverModule.forRoot(),
        GwPopConfirmModule,
        GwPopInputModule,
        GwConfirmModule.forRoot(),
        GwPopSelectModule,
        GwPopSingleSelectModule,
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