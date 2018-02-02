import {NgModule} from "@angular/core";
import {GWRangeInputComponent} from "./rangeinput.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwCoreModule} from "../core/core.module";

@NgModule({
    declarations: [
        GWRangeInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwCoreModule.forRoot()
    ],
    exports: [
        GWRangeInputComponent
    ]
})
export class GwRangeInputModule {
}
