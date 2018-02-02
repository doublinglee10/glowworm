import {NgModule} from "@angular/core";
import {GwInputsComponent} from "./inputs.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwCoreModule} from "../core/core.module";

@NgModule({
    declarations: [
        GwInputsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule.forRoot()
    ],
    exports: [
        GwInputsComponent
    ]
})
export class GwInputsModule {
}
