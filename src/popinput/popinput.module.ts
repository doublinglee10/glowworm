import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GwCoreModule} from "../core/core.module";
import {GwPopInputComponent} from "./popinput.component";
import {GwPopinputDirective} from "./popinput.directive";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule
    ],
    declarations: [
        GwPopInputComponent,
        GwPopinputDirective
    ],
    exports: [
        GwPopinputDirective
    ],
    entryComponents: [
        GwPopInputComponent
    ]
})
export class GwPopinputModule {
}