import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {ServiceWorkerModule} from "@angular/service-worker";

import {AppRoutingModule} from "./app-routing.module";
import {PopconfirmDemoComponent} from "./components/popconfirm-demo.conponent";
import {ToolbarDemoComponent} from "./components/toolbar-demo.component";
import {PopinputDemoComponent} from "./components/popinput-demo.conponent";
import {GwInputDemoComponent} from "./components/gwinput-demo.component";
import {GwconfirmDemoComponent, GwconfirmDemoXComponent} from "./components/gwconfirm-demo.component";
import {PopselectDemoComponent} from "./components/popselect-demo.conponent";
import {ContextMenuDemoComponent} from "./components/contextmenu-demo.component";
import {GwSwitchDemoComponent} from "./components/gwswitch-demo.component";
import {GwTabsDemoComponent, TestComponent} from "./components/gwtabs-demo.component";
import {GwPanelDemoComponent} from "./components/gwpannel-demo.component";
import {GwSelectDemoComponent} from "./components/gwselect-demo.component";
import {GwSingleSelectDemoComponent} from "./components/gwsingleselect-demo.component";
import {GwInputsDemoComponent} from "./components/gwinputs-demo.component";
import {DatepickerDemoComponent} from "./components/datePicker-demo.component";
import {ImgPreviewDemoComponent} from "./components/imgpreview-demo.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PopSingleSelectDemoComponent} from "./components/popsingleselect-demo.conponent";
import {GlowwormRootModule} from "../../src/glowworm.module";
import {environment} from "../environments/environment";

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
        PopSingleSelectDemoComponent,
        GwInputsDemoComponent,
        DatepickerDemoComponent,
        ImgPreviewDemoComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        GlowwormRootModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
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
