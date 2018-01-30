import {NgModule} from "@angular/core";
import {GwInputsComponent} from "./inputs.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {GwPopoverModule} from "../popover/popover.module";

@NgModule({
    declarations: [
        GwInputsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GwPopoverModule.forRoot(),
    ],
    exports: [
        GwInputsComponent
    ]
})
export class GwInputsModule {
}
