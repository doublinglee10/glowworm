import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GwCoreModule} from "../core/core.module";
import {GwPopInputComponent} from "./popinput.component";
import {GwPopInputDirective} from "./popinput.directive";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule.forRoot()
    ],
    declarations: [
        GwPopInputComponent,
        GwPopInputDirective
    ],
    exports: [
        GwPopInputDirective
    ],
    entryComponents: [
        GwPopInputComponent
    ]
})
export class GwPopInputModule {
}