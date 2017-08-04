import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {GWButtonModule} from "../../src/button/button.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GWButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
