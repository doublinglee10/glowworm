import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {GlowwormModule} from "../../src/glowworm.module";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        GlowwormModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
