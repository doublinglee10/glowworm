import {NgModule} from "@angular/core";
import {GwInputComponent} from "./input.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwCoreModule} from "../core/core.module";

@NgModule({
    declarations: [
        GwInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule.forRoot()
    ],
    exports: [
        GwInputComponent
    ]
})
export class GwInputModule {
}
