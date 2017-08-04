import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {GlowwormModule} from "../../src/glowworm.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GlowwormModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
