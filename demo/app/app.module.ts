import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {GlowwormModule} from "../../src/glowworm.module";
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {PopconfirmDemoComponent} from "./components/popconfirm-demo.conponent";
import {ToolbarDemoComponent} from "./components/toolbar-demo.component";

@NgModule({
    declarations: [
        AppComponent,
        PopconfirmDemoComponent,
        ToolbarDemoComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        GlowwormModule.forRoot()
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    constructor() {
    }
}
