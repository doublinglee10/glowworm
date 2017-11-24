import {ModuleWithProviders, NgModule} from "@angular/core";
import {GWInputModule} from "./input/input.module";
import {GWRangeInputModule} from "./rangeInput/rangeinput.module";
import {GWToolbarModule} from "./toolbar/toolbar.module";
import {DatepickerModule} from "./datepicker/datepicker.module";
import {GWSingleSelectModule} from "./singleselect/single-select.module";
import {GWMultiSelectModule} from "./multiselect/multi-select.module";
import {GWPopoverModule} from "./popover/popover.module";
import {GWPopoverConfirmModule} from "./popover-confirm/popover-confirm.module";
import {GwCoreModule} from "./core/core.module";
import {GwPopconfirmModule} from "./popconfirm/popconfirm.module";
import {GwPopinputModule} from "./popinput/popinput.module";
import {GwConfirmModule} from "./confirm/confirm.module";
import {GwPopselectModule} from "./popselect/popselect.module";
import {GwContextMenuModule} from "./context-menu";
import {GwTabsModule} from "./tabs/tabs.module";
import {GwSwitchModule} from "./switch/gw-switch.module"
import {GwPannelModule} from "./panel/panel.module";

let MODULES_FOR_ROOT = [
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
    GwConfirmModule.forRoot(),
    GwPopselectModule,
    GwContextMenuModule.forRoot(),
    GwTabsModule,
    GwSwitchModule,
    GwPannelModule
];

let MODULES_FOR_CHILD = [
    GwCoreModule,
    GWSingleSelectModule,
    GWMultiSelectModule,
    GWInputModule,
    GWRangeInputModule,
    GWToolbarModule,
    DatepickerModule,
    GWPopoverModule,
    GWPopoverConfirmModule,
    GwPopconfirmModule,
    GwPopinputModule,
    GwConfirmModule,
    GwPopselectModule,
    GwContextMenuModule,
    GwTabsModule,
    GwPannelModule,
    GwSwitchModule
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