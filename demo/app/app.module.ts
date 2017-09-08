import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {GlowwormModule} from "../../src/glowworm.module";
import {FormsModule} from "@angular/forms";

import {TestComponent} from "./test.component";


@NgModule({
    declarations: [
        AppComponent,
        TestComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        GlowwormModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {


    }

}
