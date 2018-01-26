import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {PopconfirmDemoComponent} from "./components/popconfirm-demo.conponent";
import {ToolbarDemoComponent} from "./components/toolbar-demo.component";
import {PopinputDemoComponent} from "./components/popinput-demo.conponent";
import {GwInputDemoComponent} from "./components/gwinput-demo.component";
import {GwconfirmDemoComponent, GwconfirmDemoXComponent} from "./components/gwconfirm-demo.component";
import {PopselectDemoComponent} from "./components/popselect-demo.conponent";
import {ContextMenuDemoComponent} from "./components/contextmenu-demo.component";
import {GwSwitchDemoComponent} from "./components/gwswitch-demo.component";

import {GwContextMenuModule} from "../../src/context-menu/context-menu.module";
import {GwConfirmModule} from "../../src/confirm/confirm.module";
import {GwPopconfirmModule} from "../../src/popconfirm/popconfirm.module";
import {GwPopinputModule} from "../../src/popinput/popinput.module";
import {GwPopselectModule} from "../../src/popselect/popselect.module";
import {GWInputModule} from "../../src/input/input.module";
import {GWToolbarModule} from "../../src/toolbar/toolbar.module";
import {DatepickerModule} from "../../src/datepicker/datepicker.module";
import {GWSingleSelectModule} from "../../src/singleselect/single-select.module";
import {GWRangeInputModule} from "../../src/rangeInput/rangeinput.module";
import {GwTabsModule} from "../../src/tabs/tabs.module";
import {GwTabsDemoComponent, TestComponent} from "./components/gwtabs-demo.component";
import {GwPanelDemoComponent} from "./components/gwpannel-demo.component";
import {GwPannelModule} from "../../src/panel/panel.module";
import {GwSwitchModule} from "../../src/switch/gw-switch.module";
import {GwSelectModule} from "../../src/select/select.module";
import {GwSelectDemoComponent} from "./components/gwselect-demo.component";
import {GwSingleSelectDemoComponent} from "./components/gwsingleselect-demo.component";
import {GwInputsDemoComponent} from "./components/gwinputs-demo.component";
import {GwInputsModule} from "../../src/inputs/inputs.module";
import {DatepickerDemoComponent} from "./components/datePicker-demo.component";
import {ImgPreviewDemoComponent} from "./components/imgpreview-demo.component";
import {GwImgPreviewModule} from "../../src/imgpreview/imgpreview.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        PopconfirmDemoComponent,
        ToolbarDemoComponent,
        PopinputDemoComponent,
        GwInputDemoComponent,
        GwconfirmDemoComponent,
        GwconfirmDemoXComponent,
        PopselectDemoComponent,
        ContextMenuDemoComponent,
        GwTabsDemoComponent,
        GwPanelDemoComponent,
        GwSwitchDemoComponent,
        GwSelectDemoComponent,
        TestComponent,
        GwSingleSelectDemoComponent,
        GwInputsDemoComponent,
        DatepickerDemoComponent,
        ImgPreviewDemoComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        GWInputModule,
        DatepickerModule.forRoot(),
        GWSingleSelectModule,
        GWRangeInputModule,
        GWToolbarModule,
        GwContextMenuModule.forRoot(),
        GwConfirmModule.forRoot(),
        GwPopconfirmModule,
        GwPopinputModule,
        GwPopselectModule,
        GwTabsModule,
        GwPannelModule,
        GwSwitchModule,
        GwSelectModule,
        GwInputsModule,
        GwImgPreviewModule
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        GwconfirmDemoXComponent,
        TestComponent
    ]
})
export class AppModule {
    constructor() {
    }
}
